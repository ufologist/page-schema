var fs = require('fs');
var path = require('path');

var glob = require('glob');
const babel = require("@babel/core");

function transformCode(string) {
    var code = '(' + string + ')';
    try {
        code = babel.transformSync(code, {
            // not in strict mode
            // https://babeljs.io/docs/en/options#sourcetype
            sourceType: 'script',
        }).code;
    } catch (error) {
        console.warn('babel.transformSync error', error);
    }
    // 剥离首尾的括号
    code = code.substring(1, code.length - 2);

    return code;
}

function getSchemaFileContents() {
    return new Promise(function(resolve, reject) {
        glob('./src/**/*.{json,js}', {}, function(error, files) {
            if (!error) {
                var fileContents = files.map(function(item) {
                    var urlPath = path.posix.relative('./src', item);

                    var schemaTitle = item;
                    try {
                        var fileContent = fs.readFileSync(path.resolve(process.cwd(), item));
                        // 放弃使用正则匹配出 schema 文件字符串内容中的 title 的内容, 因为太难搞了
                        // 改用开销较大的实际转义代码, 再获取真实对象的方式
                        var code = transformCode(fileContent);

                        var schema = eval(`(${code})`);
                        schemaTitle = schema.title;
                    } catch (error) {
                        console.warn('eval code error', error);
                    }

                    return {
                        file: item,
                        urlPath: urlPath,
                        title: schemaTitle
                    };
                });
                resolve(fileContents);
            } else {
                reject(error);
            }
        });
    });
}

function createPageHtml(fileContents) {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>配页坊页面配置文件列表</title>
    <link rel="stylesheet" href="//cdn.bootcss.com/twitter-bootstrap/4.4.1/css/bootstrap.min.css">
    <link href="//cdn.bootcss.com/balloon-css/1.0.4/balloon.min.css" rel="stylesheet">
</head>
<body>
    <h1>配页坊页面配置文件列表(共计: <span class="badge badge-dark js-list-length"></span> 个)</h1>
    <ul class="js-schema-list"></ul>
    <script>
    (function() {
        var fileContents = ${JSON.stringify(fileContents)};

        function getSegment(urlPath) {
            var indexOfPosition = 0;
            var slashIndex = 0;
            var segment = [];
            // 分解文件的路径
            while ((slashIndex = urlPath.indexOf('/', indexOfPosition)) !== -1) {
                segment.push(urlPath.substring(0, slashIndex));
                indexOfPosition = slashIndex + 1;
            }
            // 最后一节是文件
            segment.push(urlPath);

            return segment;
        }

        function createPlayerLink(item) {
            var playerUrl = 'https://ufologist.github.io/page-schema-player/index.html';
            var schemaUrl = 'http://localhost:8000/' + item.urlPath;
            var playSchemaUrl = playerUrl + '?_schema=' + schemaUrl + '&_mode=dev';

            return '<a target="_blank" data-balloon-pos="right" aria-label="' + item.file + '" href="' + playSchemaUrl + '" >' + item.title + '</a>';
        }

        function initList(path, index, item) {
            var element = document.querySelector('[data-path="' + path + '"]');
            // 最后一节是文件
            var isFile = index === item.segment.length - 1;

            var lastSlashIndex = path.lastIndexOf('/');
            var hasParent = lastSlashIndex !== -1;

            if (!element) {
                element = document.createElement('li');
                element.setAttribute('data-path', path);

                if (hasParent) {
                    // 文件夹的名称
                    var dirName = path.substring(lastSlashIndex + 1);
                    // 上一级路径
                    var parentPath = path.substring(0, lastSlashIndex);

                    if (isFile) {
                        element.innerHTML = '<div>' + createPlayerLink(item) + '</div>';
                    } else {
                        element.innerHTML = '<div>' + dirName + '</div><ul></ul>';
                    }

                    // 找到上一层
                    document.querySelector('[data-path="' + parentPath + '"] ul').appendChild(element);
                } else {
                    if (isFile) {
                        element.innerHTML = '<div>' + createPlayerLink(item) + '</div>';
                    } else {
                        element.innerHTML = '<div>' + path + '</div><ul></ul>';
                    }
                    schemaListUlEl.appendChild(element);
                }
            }
        }

        document.querySelector('.js-list-length').textContent = fileContents.length;
        var schemaListUlEl = document.querySelector('.js-schema-list');
        fileContents.forEach(function(item) {
            item.segment = getSegment(item.urlPath);
            item.segment.forEach(function(path, index) {
                initList(path, index, item);
            });
        });
    })();
    </script>
</body>
    `;
}

module.exports = {
    hooks: {
        async onCreate(context) {
            const {
                route
            } = context.router;

            route(({ get }) => {
                get('/_ls').to.handle(async (ctx, next) => {
                    var fileContents = await getSchemaFileContents();
                    await next();

                    ctx.type = 'html';
                    ctx.body = createPageHtml(fileContents);
                });
            });
        }
    }
};
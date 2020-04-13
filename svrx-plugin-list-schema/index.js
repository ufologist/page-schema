var path = require('path');

var glob = require('glob');

function getSchemaFiles() {
    return new Promise(function(resolve, reject) {
        glob('./src/**/*.{json,js}', {}, function(error, files) {
            if (!error) {
                var schemaFiles = files.map(function(item) {
                    var urlPath = path.posix.relative('./src', item);
                    // {
                    //     file: './src/_demo/advanced.js',
                    //     urlPath: '_demo/advanced.js',
                    //     title: '_demo/advanced.js'
                    // }
                    return {
                        file: item,
                        urlPath: urlPath,
                        title: urlPath
                    };
                });
                resolve(schemaFiles);
            } else {
                reject(error);
            }
        });
    });
}

function createPageHtml(schemaFiles) {
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
        var schemaFiles = ${JSON.stringify(schemaFiles)};

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
            var schemaUrl = window.location.protocol + '//localhost:' + window.location.port + '/' + item.urlPath;
            var playSchemaUrl = playerUrl + '?_schema=' + schemaUrl + '&_mode=dev';

            return '<a class="js-schema" data-url-path="' + item.urlPath + '" data-file="' + item.file + '" target="_blank" data-balloon-pos="right" aria-label="' + item.file + '" href="' + playSchemaUrl + '">' + item.title + '</a>';
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

        document.querySelector('.js-list-length').textContent = schemaFiles.length;
        var schemaListUlEl = document.querySelector('.js-schema-list');
        schemaFiles.forEach(function(item) {
            item.segment = getSegment(item.urlPath);
            item.segment.forEach(function(path, index) {
                initList(path, index, item);
            });
        });

        // 加载一次 schema 文件的内容来获取标题
        document.querySelectorAll('.js-schema').forEach(function(el) {
            var dataset = el.dataset || {};
            fetch('/' + dataset.urlPath + '?_=' + Date.now()).then(function(response) {
                return response.text();
            }).then(function(text) {
                return eval('(' + text + ')');
            }).then(function(schema) {
                if (typeof schema.title !== 'undefined' && String(schema.title).trim()) {
                    el.textContent = schema.title;
                }
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
                    var schemaFiles = await getSchemaFiles();
                    await next();

                    ctx.type = 'html';
                    ctx.body = createPageHtml(schemaFiles);
                });
            });
        }
    }
};
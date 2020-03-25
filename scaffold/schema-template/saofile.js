var path = require('path');
var fs = require('fs');

var open = require('open');

module.exports = {
    prompts: function() {
        return [{
            name: 'pageFileName',
            message: '请输入你要创建的页面配置文件名(英文), 需要包含文件夹路径(不需要带后缀), 例如: test/list',
            validate: (input) => {
                var isValid = false;

                if (input) {
                    if (/^[a-zA-Z0-9\/\-]+$/.test(input)) {
                        var pageDirName = input.substring(0, input.lastIndexOf('/'));
                        var pageOutDir = path.resolve(this.outDir, pageDirName);
                        var pageOutFile = path.resolve(this.outDir, `${input}.json`);

                        if (fs.existsSync(pageOutFile)) {
                            console.info(this.chalk.red('\n这个页面已经存在了, 请另外想一个名字'));
                        } else {
                            // 覆盖原来的属性 this.outDir 和 this.outFolder
                            Object.defineProperty(this, 'outDir', {
                                value: pageOutDir
                            });
                            Object.defineProperty(this, 'outFolder', {
                                value: pageDirName
                            });
                            isValid = true;
                        }
                    } else {
                        console.info(this.chalk.red('\n页面名称只允许英文字母, 数字和连字符(-)和斜杠(/)'));
                    }
                }

                return isValid;
            }
        }, {
            name: 'pageTitle',
            message: '请输入页面标题-title',
            default: '页面标题'
        }, {
            name: 'pageDefinitionsEnvApi',
            message: '请输入接口的根路径-definitions.env.api',
            default: 'https://www.fastmock.site/mock/b9e4b4bc8121846e696221f4105cec52/test'
        }, {
            name: 'pageBodyApiUrl',
            message: '请输入列表接口路径-body.api.url',
            default: '/amis-list'
        }, {
            name: 'pageBodyColumns',
            message: '请输入表格字段(多个以空格隔开)-body.columns',
            default: 'id:ID title:标题'
        }, {
            name: 'pageBodyColumnOperationView',
            message: '表格是否需要查看的操作按钮-body.columns operation',
            type: 'confirm',
            default: true
        }, {
            name: 'pageBodyColumnOperationUpdate',
            message: '表格是否需要修改的操作按钮-body.columns operation',
            type: 'confirm',
            default: true
        }, {
            name: 'pageBodyColumnOperationDelete',
            message: '表格是否需要删除的操作按钮-body.columns operation',
            type: 'confirm',
            default: true
        }, {
            name: 'pageBodyBulkActions',
            message: '表格是否需要批量操作功能-body.bulkActions',
            type: 'confirm',
            default: false
        }, {
            name: 'pageBodyFilter',
            message: '页面是否需要查询条件面板-body.filter',
            type: 'confirm',
            default: true
        }, {
            name: 'pageToolbar',
            message: '页面是否需要"新增"按钮-toolbar',
            type: 'confirm',
            default: true
        }]
    },
    actions: function() {
        var lastSlashIndex = this.answers.pageFileName.lastIndexOf('/');
        var pageFileName = this.answers.pageFileName.substring(lastSlashIndex + 1);

        return [{
            type: 'add',
            files: '**'
        }, {
            type: 'move',
            patterns: {
                '_schema.json': `${pageFileName}.json`
            }
        }]
    },
    completed: function() {
        this.showProjectTips();

        var url = `https://ufologist.github.io/page-schema-player/index.html?_schema=http://localhost:8000/${this.answers.pageFileName}.json&_mode=dev`;

        console.info('----------------------------------------------------------------');
        console.info('（*＾-＾*）: 恭喜你创建页面成功');
        console.info('（*＾-＾*）: b(￣▽￣*)=====b');
        console.info('（*＾-＾*）: 主人~将为你打开浏览器');
        console.info(this.chalk.blue(url));
        console.info('----------------------------------------------------------------');

        open(url);
    }
}
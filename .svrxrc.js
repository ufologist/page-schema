var path = require('path');

module.exports = {
    root: './src',
    open: 'external',
    plugins: [{
        name: 'babel'
    }, {
        name: 'list-schema',
        path: path.posix.resolve('./svrx-plugin-list-schema')
    }]
};
var gulp = require('gulp');
var babel = require('gulp-babel');
var tap = require('gulp-tap');
var del = require('del');

async function clean() {
    return del(['dist'], {
        force: true
    });
}

function build() {
    return gulp.src('src/**/*.{js,json}')
               .pipe(tap(function(file) {
                    // 经过 babel 之后, 文件都会变成 .js 后缀
                    // 因此在这里冗余一下原来的文件后缀, 在后面还原回来
                    file.extname = `${file.extname}.`;
                    file.contents = Buffer.concat([new Buffer('('), file.contents, new Buffer(')')]);
                }))
               .pipe(babel({
                   sourceType: 'script'
                }))
               .pipe(tap(function(file) {
                    // 还原文件的后缀
                    file.extname = '';
                    var fileContentsString = file.contents.toString();
                    file.contents = Buffer.from(fileContentsString.substring(1, fileContentsString.length - 2));
                }))
               .pipe(gulp.dest('dist'));
}

function copy() {
    return gulp.src('src/**/*.html')
               .pipe(gulp.dest('dist'));
}

exports.default = gulp.series(clean, build, copy);
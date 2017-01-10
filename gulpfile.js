var gulp = require('gulp');
var concatCss = require('gulp-concat-css');
var cleanCSS = require('gulp-clean-css');
var includer = require('gulp-htmlincluder');
var connect = require('gulp-connect');
var livereload = require('gulp-livereload');
var replace = require('gulp-html-replace');
var spritecreator = require("gulp-spritesmith");

gulp.task('css', function () {
    return gulp.src('assets/dev/css/**/*.css')
        .pipe(concatCss("style.css"))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('assets/build/css/'))
        .pipe(connect.reload());
});
gulp.task('html', function() {
    gulp.src('assets/dev/**/*.html')
        .pipe(includer())
        .pipe(replace({
            css: 'css/style.css'
        }))
        .pipe(gulp.dest('assets/build/'))
        .pipe(connect.reload());
});
gulp.task('connect', function() {
    connect.server({
        root: 'assets/build',
        livereload: true
    });
});
gulp.task('default', function (){
    gulp.start('connect', 'html', 'css');
    gulp.watch(['assets/dev/**/*.html'], function(event){
       gulp.start('html');
    });
    gulp.watch(['assets/dev/css/**/*.css'], function(event){
        gulp.start('css');
    });
});
gulp.task('sprite', function(){
    var spriteData = gulp.src('assets/dev/icons/*.png')
        .pipe(spritecreator({
            imgName:'sprite.png',
            cssName:'sprite.css',
            algorithm:'binary-tree'
    }));
    spriteData.img.pipe(gulp.dest('assets/build/icons/'));
    spriteData.css.pipe(gulp.dest('assets/build/css/'));
});
gulp.task('server', function(){

});


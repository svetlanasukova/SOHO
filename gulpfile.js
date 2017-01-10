var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var includer = require('gulp-htmlincluder');
var connect = require('gulp-connect');
var livereload = require('gulp-livereload');
var replace = require('gulp-html-replace');
var spritecreator = require('gulp-spritesmith');
var less = require('gulp-less');

gulp.task('less', function(){
    return gulp.src('assets/dev/less/general.less')
        .pipe(less())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('assets/build/css/'))
        .pipe(connect.reload());
});
gulp.task('html', function(){
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
    gulp.start('connect', 'html', 'less');
    gulp.watch(['assets/dev/**/*.html'], function(event){
       gulp.start('html');
    });
    gulp.watch(['assets/dev/less/**/*.less'], function(event){
        gulp.start('less');
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




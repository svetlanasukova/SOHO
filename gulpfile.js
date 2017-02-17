var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var includer = require('gulp-htmlincluder');
var connect = require('gulp-connect');
var livereload = require('gulp-livereload');
var replace = require('gulp-html-replace');
var spritesmith = require('gulp.spritesmith');
var less = require('gulp-less');
var rename = require('rename');
var concat = require('gulp-concat');

gulp.task('cssCreator', function(){
    return gulp.src('assets/dev/less/general.less')
        .pipe(less())
        // .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('assets/build/css/'))
        .pipe(connect.reload());
});
gulp.task('html', function(){
    gulp.src('assets/dev/**/*.html')
        .pipe(includer())
        .pipe(replace({
            css: 'css/general.css'
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
    gulp.start('connect', 'html', 'cssCreator', 'scripts');
    gulp.watch(['assets/dev/**/*.html'], function(event){
       gulp.start('html');
    });
    gulp.watch(['assets/dev/less/**/*.less'], function(event){
        gulp.start('cssCreator');
    });
    gulp.watch(['assets/dev/js/*.js'], function(event){
        gulp.start('scripts');
    });
});
gulp.task('sprite', function(){
    var sprite = gulp.src('assets/dev/icons/**/*.png')
        .pipe(spritesmith({
            imgName:'sprite.png',
            cssName:'sprite.less',
            cssFormat: 'less',
            algorithm:'binary-tree',
            padding: 10
    }));
    sprite.img.pipe(rename('sprite.png')).pipe(gulp.dest('assets/build/img/'));
    sprite.css.pipe(gulp.dest('assets/dev/less/import/'));
});

gulp.task('scripts', function() {
    return gulp.src('assets/dev/js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('assets/build/'));
});



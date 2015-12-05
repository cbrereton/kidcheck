"use strict";
let gulp = require('gulp'),
    jade = require('gulp-jade'),
    sass = require('gulp-ruby-sass'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    minifyCss = require('gulp-minify-css'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;

gulp.task('sass', () => {
    return sass('content/styles/**/*.scss', { style: 'expanded' })
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('www/styles'));
});

gulp.task('js', () => {
    return gulp.src('content/scripts/**/*.js')
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('www/scripts'));
});

gulp.task('jade', () => {
    return gulp.src(['content/views/**/*.jade', '!content/views/includes/**'])
        .pipe(jade())
        .pipe(gulp.dest('www'));
});

gulp.task('sass.min', () => {
    return sass('content/styles/**/*.scss', { style: 'expanded' })
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifyCss())
        .pipe(gulp.dest('www/styles'));
});

gulp.task('js.min', () => {
    return gulp.src('content/scripts/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest('www/scripts'));
});

gulp.task('minify', ['sass.min', 'js.min', 'jade']);
gulp.task('serve', ['sass', 'js', 'jade'], () => {
    browserSync({
        server: {
            baseDir: 'www'
        }
    });

    gulp.watch(['styles/**/*.css', 'scripts/**/*.js'], { cwd: 'www' }, reload);
    gulp.watch('content/**', ['sass', 'js', 'jade']);
});

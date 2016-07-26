'use strict';

/**
 * Package Dependencies
 */
var gulp   = require('gulp'),
    eslint = require('gulp-eslint');

gulp.task('eslint', () => {

    return gulp.src([ '*.js', 'actions/*', '!node_modules/*', '!gulpfile.js' ])
                .pipe(eslint())
                .pipe(eslint.format())
                .pipe(eslint.failAfterError());

});

gulp.task('test', ['eslint'], function () {

});

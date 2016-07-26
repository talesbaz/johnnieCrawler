/**
 * Package Dependencies
 */
var gulp   = require('gulp'),
    eslint = require('gulp-eslint');

gulp.task('test', function () {

  return gulp.src([ '*.js', 'actions/*', '!node_modules/', '!gulpfile.js' ])
              .pipe(eslint())
              .pipe(eslint.format())
              .pipe(eslint.failAfterError());
});

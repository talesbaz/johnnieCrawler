/**
 * Package Dependencies
 */
var gulp        = require('gulp'),
    eslint      = require('gulp-eslint');

/**
 * Test
 */
gulp.task('eslint', funtion() {

  return  gulp.src([ '*.js', 'actions/*','!node_modules/*', '!gulpfile.js' ])
                  .pipe(eslint())
                  .pipe(eslint.format());

});

gulp.task('test', ['eslint']);

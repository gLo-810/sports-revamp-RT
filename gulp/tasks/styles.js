const gulp = require('gulp'),
postcss = require('gulp-postcss'),
autoprefixer = require('autoprefixer'),
cssvars = require('postcss-simple-vars'),
nested = require('postcss-nested'),
cssImport = require('postcss-import'),
colorFunction = require("postcss-color-function");


gulp.task('styles', () => {
  return gulp.src('./app/assets/styles/main.css')
    .pipe(postcss([cssImport, cssvars, nested, colorFunction, autoprefixer]))
    .on('error', function(errorInfo){
      console.log(errorInfo.toString());
      this.emit('end');
    })
    .pipe(gulp.dest('./app/temp/styles/'));
});

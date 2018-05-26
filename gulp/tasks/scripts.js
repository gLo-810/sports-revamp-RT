const gulp = require('gulp'),
webpack = require('webpack'),
gls = require('gulp-live-server');

gulp.task('scripts', (callback) => {
  webpack(require('../../webpack.config.js'), (err, stats) => {
    if (err){
      console.log(err.toString());
    }
    console.log(stats.toString());
    callback();
  });
});

gulp.task('serve', function () {
    var server = gls.new('./app/assets/scripts/Server.js');
    server.start();

    gulp.watch('./app/assets/scripts/Server.js', function (file) {
        server.start();
        server.notify(file);
    });
});

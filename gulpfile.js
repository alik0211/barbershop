const gulp           = require('gulp'),
      del            = require('del'),
      sass           = require('gulp-sass'),
      notify         = require("gulp-notify"),
      cleanCSS       = require('gulp-clean-css'),
      browserSync    = require('browser-sync'),
      autoprefixer   = require('gulp-autoprefixer');

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: 'app'
    },
    port: 7779,
    notify: false
  });
});

gulp.task('sass', function() {
  return gulp.src('app/sass/*.sass')
           .pipe(sass()).on('error', notify.onError())
           .pipe(autoprefixer(['last 10 versions']))
          //  .pipe(cleanCSS())
           .pipe(gulp.dest('app/css'));
});

gulp.task('watch', ['browser-sync', 'sass'], function() {
  gulp.watch('app/sass/**/*.sass', ['sass', browserSync.reload]);
  gulp.watch('app/js/*.js', browserSync.reload);
  gulp.watch('app/*.html', browserSync.reload);
});

gulp.task('default', ['watch']);

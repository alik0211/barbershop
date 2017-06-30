const del          = require('del'),
      gulp         = require('gulp'),
      sass         = require('gulp-sass'),
      babel        = require('gulp-babel'),
      rename       = require('gulp-rename'),
      notify       = require('gulp-notify'),
      uglify       = require('gulp-uglify'),
      useref       = require('gulp-useref'),
      htmlmin      = require('gulp-htmlmin'),
      cleanCSS     = require('gulp-clean-css'),
      browserSync  = require('browser-sync'),
      autoprefixer = require('gulp-autoprefixer');

const reload = browserSync.reload;

gulp.task('serve', function() {
  browserSync({
    server: {
      baseDir: 'app'
    },
    port: 7779,
    notify: false
  });
});

gulp.task('serve:dist', ['build'], function() {
  browserSync({
    server: {
      baseDir: 'dist'
    },
    port: 7780,
    notify: false
  });
});

gulp.task('sass', function() {
  return gulp.src('app/sass/*.sass')
    .pipe(sass()).on('error', notify.onError())
    .pipe(autoprefixer(['last 10 versions']))
    .pipe(gulp.dest('app/css'));
});

gulp.task('clean', function() {
  return del.sync('dist');
});

gulp.task('build', ['clean', 'sass'], function() {
  gulp.src('app/*.html')
    .pipe(useref())
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist'));

  gulp.src('app/img/**/*').pipe(gulp.dest('dist/img'));

  gulp.src('app/css/*.css')
    .pipe(cleanCSS({ level: { 1: {
      specialComments: 0
    }}}))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/css'));

  gulp.src('app/js/main.js')
    .pipe(babel({ presets: ['es2015'] }))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('watch', ['sass', 'serve'], function() {
  gulp.watch('app/*.html', reload);
  gulp.watch('app/js/**/*.js', reload);
  gulp.watch('app/sass/**/*.sass', ['sass', reload]);
});

gulp.task('default', ['watch']);

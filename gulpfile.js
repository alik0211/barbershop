const del          = require('del'),
      gulp         = require('gulp'),
      sass         = require('gulp-sass'),
      babel        = require('gulp-babel'),
      notify       = require('gulp-notify'),
      rename       = require('gulp-rename'),
      uglify       = require('gulp-uglify'),
      htmlmin      = require('gulp-htmlmin'),
      cleanCSS     = require('gulp-clean-css'),
      htmlreplace  = require('gulp-html-replace'),
      browserSync  = require('browser-sync'),
      autoprefixer = require('gulp-autoprefixer');

gulp.task('reload', function(cb) {
  browserSync.reload();

  cb();
});

gulp.task('serve', function(cb) {
  browserSync({
    server: {
      baseDir: 'app'
    },
    port: 7779,
    notify: false
  });

  cb();
});

gulp.task('sass', function() {
  return gulp.src('app/sass/*.sass')
    .pipe(sass()).on('error', notify.onError())
    .pipe(autoprefixer(['last 10 versions']))
    .pipe(gulp.dest('app/css'));
});

gulp.task('clean', function(cb) {
  del.sync('dist');

  cb();
});

gulp.task('prebuild', function(cb) {
  gulp.src('app/*.html')
    .pipe(htmlreplace({
      css: 'css/main.min.css',
      js: 'js/main.min.js'
    }))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist'));

  gulp.src('app/css/*.css')
    .pipe(cleanCSS({ level: { 1: { specialComments: 0 }}}))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/css'));

  gulp.src('app/js/*.js')
    .pipe(babel({ presets: ['@babel/env'] }))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/js'));

  gulp.src('app/img/**/*').pipe(gulp.dest('dist/img'));

  cb();
});

gulp.task('watch', function(cb) {
  gulp.watch('app/*.html', gulp.series('reload'));
  gulp.watch('app/js/**/*.js', gulp.series('reload'));
  gulp.watch('app/sass/**/*.sass', gulp.series('sass', 'reload'));

  cb();
});

gulp.task('build', gulp.series('clean', 'sass', 'prebuild'));

gulp.task('default', gulp.series('sass', 'serve', 'watch'));

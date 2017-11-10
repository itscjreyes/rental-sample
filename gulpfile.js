var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var babel = require('gulp-babel');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

gulp.task('styles', function () {
  return gulp.src('./dev/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('last 5 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
    .pipe(concat('redesign.css'))
    .pipe(gulp.dest('./dist/'))
    .pipe(reload({stream: true}));
});

gulp.task('scripts', function() {
  return gulp.src('./dev/*.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('./dist/'))
    .pipe(reload({stream: true}));
});

gulp.task('watch', function() {
  gulp.watch('./dev/**/*.scss', ['styles']);
  gulp.watch('./dev/*.js', ['scripts']);
  gulp.watch('./*.html', reload);
});

gulp.task('browser-sync', function() {
  browserSync.init({
    proxy: 'http://localhost:3000'
  })
});

gulp.task('default', ['browser-sync','styles','scripts','watch']);
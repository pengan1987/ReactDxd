var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

gulp.task('sass', function () {
    return gulp.src('./client/css/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./client/css'))
        .pipe(browserSync.stream());
});

gulp.task('serve', function () {
    browserSync.init({
        proxy: "localhost:8080"
    });
    gulp.watch('./client/css/*.scss', ['sass']);
    gulp.watch('./client/index.html').on('change', browserSync.reload);
});

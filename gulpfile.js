var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var server = require('gulp-server-livereload');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('default', ['sass', 'html', 'scripts', 'watch', 'webserver']);

gulp.task('watch', function () {
    return gulp
        .watch('src/**/*', ['sass', 'html', 'scripts'])
        .on('change', function (event) {
            console.log('File ' + event.path + ' was ' + event.type + ', rebuilding...');
        });
});

gulp.task('sass', function () {
    return gulp
        .src('src/scss/main.scss')
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('html', function () {
    return gulp
        .src('src/index.html')
        .pipe(gulp.dest('dist'));
});

gulp.task('scripts', function () {
    return gulp.src('src/js/**/*.js')
        .pipe(concat('main.js'))
        .pipe(gulp.dest('dist/js'));
});


gulp.task('webserver', function () {
    gulp.src('dist')
        .pipe(server({
            livereload: true,
            directoryListing: false,
            open: true
        }));
});

var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var server = require('gulp-server-livereload');
var autoprefixer = require('gulp-autoprefixer');
var browserify = require('browserify');
var babelify = require('babelify');
var vinylSource = require('vinyl-source-stream');
var reactPreset = require('babel-preset-react');
var es2015Preset = require('babel-preset-es2015');

gulp.task('default', ['sass', 'html', 'scripts', 'watch', 'webserver']);

gulp.task('watch', function () {
    return gulp
        .watch('./src/**/*', ['sass', 'html', 'scripts'])
        .on('change', function (event) {
            console.log('File ' + event.path + ' was ' + event.type + ', rebuilding...');
        });
});

gulp.task('sass', function () {
    return gulp
        .src('./src/styles/main.scss')
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(gulp.dest('./dist/resources/css'));
});

gulp.task('html', function () {
    return gulp
        .src('./src/html/index.html')
        .pipe(gulp.dest('./dist'));
});

gulp.task('scripts', function () {
    return browserify({
        entries: './src/scripts/main.js',
        extensions: ['.js'],
        debug: true,
        transform: [babelify.configure({'presets': [reactPreset, es2015Preset]})]
    })
        .transform(babelify)
        .bundle()
        .pipe(vinylSource('main.js'))
        .pipe(gulp.dest('./dist/resources/js/'));
});

gulp.task('webserver', function () {
    return gulp.src('dist')
        .pipe(server({
            livereload: true,
            directoryListing: false,
            open: true
        }));
});

const gulp = require('gulp');
const webpackStream = require('webpack-stream');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync');

const webpack = (mode, watch = false, done = undefined) => 
    mode == 'production' ?
        webpackStream(Object.assign(require('./webpack.config'), { 
            mode: mode, 
            watch: watch, 
            output: { filename: 'scripts.min.js' }, 
            devtool: 'source-map' 
        }), require('webpack'), done) :
        webpackStream(Object.assign(require('./webpack.config'), { 
            mode: mode, 
            watch: watch 
        }), require('webpack'), done);

// gulp.task('webpack', () => 
//     gulp.src('./src/calculator.js')
//         .pipe(webpack('development', true))
//         .pipe(gulp.dest('./dist/js/'))
// );

gulp.task('webpack', (callback) => {
    let buildReady = false;

    return gulp.src('./src/calculator.js')
        .pipe(webpack('production', true, () => { buildReady = true }))
        .pipe(gulp.dest('./dist/js/'))
        .on('data', () => {
            if (buildReady && !callback.called) {
                callback();
                callback.called = true;
            }
        });
});

gulp.task('sass', () =>
    gulp.src('./src/scss/**/*.scss')
        .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
        //.pipe(cleanCSS())
        .pipe(gulp.dest('./dist/css/'))
        .pipe(browserSync.reload({ stream: true }))
);

gulp.task('browser-sync', () => {
    browserSync({
        server: { baseDir: './dist' },
        notify: false
    })
});

gulp.task('watch', ['webpack', 'sass', 'browser-sync'], () => {
    //gulp.watch(['./src/js/*.js'], ['webpack']);
    gulp.watch(['./src/scss/**/*.scss'], ['sass']);
    gulp.watch(['./dist/*.html', './dist/js/*.js'], browserSync.reload);
});

gulp.task('default', ['watch']);
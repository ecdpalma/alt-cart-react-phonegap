var argv = require('yargs').argv;
var path = require('path');
var gulp = require('gulp');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig = require('./webpack.config.js');
var runSequence = require('run-sequence');
var shell = require('gulp-shell');
var del = require('del');

gulp.task('default', function(){
    gulp.watch([
        './js/**/*.jsx',
        './js/**/*.js',
        './img/**/*',
        './css/**/*'
    ], ['build-app']);
});

gulp.task('clean', function() {
    if (argv.phonegap) {
        del(['../www/**/*'], { force: true });
    }
    else {
        del(['dist/**/*']);
    }
});

gulp.task('build-app', function(cb) {
    runSequence('clean',
        'webpackify',
        'copy-index',
        'copy-img',
        'copy-css',
        'copy-dist',
        cb
    );
});

gulp.task('webpackify', function(cb) {
    webpack(webpackConfig, function(err, stats) {
        if (err) {
            throw new gutil.PluginError("webpack", err);
        }
        console.log("[webpack]", stats.toString());
        cb();
    });
});

gulp.task('copy-index', function() {
    return gulp.src('./index.html')
        .pipe(gulp.dest('./../www/'))
});

gulp.task('serve', function () {
    var server = new WebpackDevServer(webpack(webpackConfig), {
        publicPath: '/js/',
        hot: true,

        // The rest is terminal configurations
        quiet: false,
        stats: {
            colors: true
        }
    });

    // We fire up the development server and give notice in the terminal
    // that we are starting the initial bundle
    server.listen(8080, 'localhost', function () {
        console.log('Bundling project, please wait...');
    });

});

gulp.task('copy-img', function() {
    return gulp.src('./img/**/*')
        .pipe(gulp.dest('./../www/img/'))
});

gulp.task('copy-css', function() {
    return gulp.src('./css/**/*')
        .pipe(gulp.dest('./../www/css'))
});

gulp.task('copy-dist', function() {
    return gulp.src('./dist/**', {base: './dist'})
        .pipe(gulp.dest('./../www/js/'));
});

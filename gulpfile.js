"use strict";

var gulp = require('gulp'),
    jscs = require('gulp-jscs'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    mocha = require('gulp-mocha');

var sourceFiles = ['./index.js', './src/**/*.js'],
    buildFiles = ['./gulpfile.js'],
    testFiles = ['./tests/**/*.js'];

gulp.task('lint', function () {
    return gulp
        .src([].concat(sourceFiles, buildFiles))
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter(stylish));
});

gulp.task('codestyle', function () {
    return gulp
        .src([].concat(sourceFiles, buildFiles, testFiles))
        .pipe(jscs());
});

gulp.task('test', function () {
    return gulp
        .src(testFiles)
        .pipe(mocha({
            reporter: 'spec'
        }));
});

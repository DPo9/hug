'use strict';

const $ = require('shelljs');
const babel = require('gulp-babel');
const changed = require('gulp-changed');
const eslint = require('gulp-eslint');
const fs = require('fs');
const gulp = require('gulp');

gulp.task('lint', function () {
  return gulp.src(['src/*.js', './*.js', './bin/*.js'])
    .pipe(eslint())
    .pipe(eslint.format());
});
gulp.task('babel', function () {
  const bab = babel();
  gulp.src('src/**/*.js')
    .pipe(changed('dist'))
    .pipe(bab)
    .pipe(gulp.dest('dist'));
  return;
});

gulp.task('build', function () {
});

gulp.task('watch', function () {
  gulp.watch('src/**/*.js', ['babel', 'build']);
  gulp.watch('commands.json', ['babel', 'build']);
  gulp.watch('test/**/*.js', ['babel', 'build']);
});

gulp.task('default', ['babel', 'watch', 'build']);
gulp.task('builder', ['babel', 'build']);

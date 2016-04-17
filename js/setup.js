'use strict';

var config = require('../config');
var gulp = require('gulp');
var download = require('gulp-download');
var unzip = require('gulp-unzip');

function Setup() {}

Setup.prototype = {
  flash: function() {
    download(config.firmware)
      .pipe(unzip())
      .pipe(gulp.dest('firmware/'));
  }
};

module.exports = new Setup();

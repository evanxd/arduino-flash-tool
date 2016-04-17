'use strict';

var config = require('../config');
var gulp = require('gulp');
var clean = require('gulp-clean');
var download = require('gulp-download');
var ejs = require('gulp-ejs');
var shell = require('gulp-shell');
var unzip = require('gulp-unzip');
var runSequence = require('run-sequence');

function Setup() {
  gulp.task('download', () => {
    return download(config.firmware)
      .pipe(unzip())
      .pipe(gulp.dest('./firmware/'));
  });

  gulp.task('sensorweb-config', () => {
    return gulp.src('./templates/SensorWebConfig.h')
      .pipe(ejs({
        sensorId: this._sensorId || 'sensorId',
        apiKey: this._apiKey || 'apiKey',
        serverAddress: '127.0.0.1',
        serverPort: '3000',
        samplingRate: '5000'
      }, { ext: '.h' }))
      .pipe(gulp.dest('./firmware/arduino-station-master/station/' +
                      'particle-photon'));
  });

  gulp.task('flash', shell.task([
    './node_modules/.bin/particle flash sensorweb-station ' +
    './firmware/arduino-station-master/station/particle-photon/'
  ]));

  gulp.task('remove-firmware', function () {
    return gulp.src('./firmware/', { read: false })
      .pipe(clean());
  });
}

Setup.prototype = {
  _sensorId: null,
  _apiKey: null,

  flash: function(sensorwebConfig) {
    this._sensorId = sensorwebConfig.sensorId;
    this._apiKey = sensorwebConfig.apiKey;
    runSequence('download', 'sensorweb-config', 'flash', 'remove-firmware');
  }
};

module.exports = new Setup();

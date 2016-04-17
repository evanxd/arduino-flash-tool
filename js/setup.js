'use strict';

var config = require('../config');
var gulp = require('gulp');
var runSequence = require('run-sequence');
var download = require('gulp-download');
var ejs = require('gulp-ejs');
var unzip = require('gulp-unzip');

function Setup() {
  gulp.task('download', function() {
    return download(config.firmware)
      .pipe(unzip())
      .pipe(gulp.dest('./firmware/'));
  });

  gulp.task('sensorweb-config', function() {
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
  }.bind(this));
}

Setup.prototype = {
  _sensorId: null,
  _apiKey: null,

  flash: function(sensorwebConfig) {
    this._sensorId = sensorwebConfig.sensorId;
    this._apiKey = sensorwebConfig.apiKey;
    runSequence('download', 'sensorweb-config');
  }
};

module.exports = new Setup();

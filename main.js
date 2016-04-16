'use strict';

var electron = require('electron');
var Tray = electron.Tray;
var BrowserWindow = electron.BrowserWindow;

var app = electron.app;
var tray = null;
var win = null;

app.dock.hide();
app.on('ready', function(){
  tray = new Tray(__dirname + '/images/sensorweb-icon.png');
  tray.setToolTip('SensorWeb');
  tray.on('click', function(event, bounds) {
    win.setPosition(bounds.x, bounds.y);
    win.isVisible() ? win.hide() : win.show();
  });

  win = new BrowserWindow({
    width: 270,
    height: 190,
    resizable: false,
    show: false,
    frame: false
  });
  win.loadURL('file://' + __dirname + '/index.html');

  win.on('blur', function() {
    win.hide();
  });

  win.on('closed', function() {
    win = null;
  });
});

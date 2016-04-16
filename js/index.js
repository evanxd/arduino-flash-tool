'use strict';

(function(){
  var wifiScanner = require('wifiscanner');
  var scanner = wifiScanner();

  scanner.scan(function(error, networks) {
    if (error) {
      console.error(error);
    } else {
      var wifiSsid = document.querySelector('#wifi-ssid');
      networks.forEach(function(network) {
        var option = document.createElement('option');
        var text = document.createTextNode(network.ssid);
        option.appendChild(text);
        option.setAttribute('value', network.ssid);
        wifiSsid.appendChild(option);
      });
    }
  });
})();

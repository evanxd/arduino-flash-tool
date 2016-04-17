#ifndef __SENSOR_WEB_CONFIG_H_
#define __SENSOR_WEB_CONFIG_H_

String SENSOR_ID = "<%= sensorId %>";
String API_KEY = "<%= apiKey %>";
String SERVER_ADDRESS = "<%= serverAddress %>";
int SERVER_PORT = <%= serverPort %>;
int SAMPLING_RATE = <%= samplingRate %>; // `5000` means do sampling once per 5 secs.

#endif /* __SENSOR_WEB_CONFIG_H_ */

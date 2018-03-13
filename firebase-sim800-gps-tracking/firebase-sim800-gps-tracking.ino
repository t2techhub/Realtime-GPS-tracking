#include <math.h>
// Select your modem
// SSL/TLS is currently supported only with SIM8xx series
#define TINY_GSM_MODEM_SIM800
//#define TINY_GSM_MODEM_SIM808

#define PWR_MODEM_SIM800 PA8//2(Mega)

// Increase RX buffer
#define TINY_GSM_RX_BUFFER 256

// or Software Serial on Uno, Nano
#include <Adafruit_GPS.h>

// what's the name of the hardware serial port?
#define GPSSerial Serial2

// Connect to the GPS on the hardware port
Adafruit_GPS GPS(&GPSSerial);

// Set GPSECHO to 'false' to turn off echoing the GPS data to the Serial console
// Set to 'true' if you want to debug and listen to the raw GPS sentences
#define GPSECHO false

uint32_t timer = millis();
// Use Hardware Serial on Mega, Leonardo, Micro
#define SerialAT Serial1

//#include <SoftwareSerial.h>
//SoftwareSerial SerialAT(2, 3); // RX, TX

//#define DUMP_AT_COMMANDS
//#define TINY_GSM_DEBUG Serial
// Your GPRS credentials
// Leave empty, if missing user or pass
const char apn[]  = "m3-world";//"internet"
const char user[] = "mms";
const char pass[] = "mms";
const char server[] = "gps-tracking-arduino.firebaseio.com";//this url of server
const int  ssl_port     = 443;

#define DEVICE_ID "voS9PB4fqo"//your device id
#define USER_TOKEN "pXhXIQzT2yQvn6T4e8t8EtRquiA3"//User token

#define BITS_PER_BASE32_CHAR 5
#define DEFAULT_PRECISION  10
#define MAX_PRECISION 22

#include <TinyGsmClient.h>
#include <ArduinoHttpClient.h>
#ifdef DUMP_AT_COMMANDS
#include <StreamDebugger.h>
StreamDebugger debugger(SerialAT, Serial);
TinyGsm modem(debugger);
#else
TinyGsm modem(SerialAT);
#endif

TinyGsmClientSecure client_no_auth(modem, 0);
HttpClient http_no_auth = HttpClient(client_no_auth, server, ssl_port);

const String UPDATE_PATH = "geo_devices/"+ String(DEVICE_ID);

boolean toggle = false;
int retry = 0;

// converts lat/long from Adafruit
// degree-minute format to decimal-degrees
double convertDegMinToDecDeg (float degMin) {
  double min = 0.0;
  double decDeg = 0.0;

  //get the minutes, fmod() requires double
  min = fmod((double)degMin, 100.0);

  //rebuild coordinates in decimal degrees
  degMin = (int) ( degMin / 100 );
  decDeg = degMin + ( min / 60 );
  return decDeg;
}
void httpPostNoAuth(const char* method, const String & path , const String & data, HttpClient* http) {
  String response;
  int statusCode = 0;
  http->connectionKeepAlive(); // Currently, this is needed for HTTPS
  String url;
  if (path[0] != '/') {
    url = "/";
  }
  url += path + ".json";
  url += "?print=silent";
  url += "&x-http-method-override=";
  url += String(method);
  Serial.print("POST:");
  Serial.println(url);
  String contentType = "application/json";
  http->post(url, contentType, data);
  // read the status code and body of the response
  statusCode = http->responseStatusCode();
  Serial.print("Status code: ");
  Serial.println(statusCode);
  response = http->responseBody();
  Serial.print("Response: ");
  Serial.println(response);
  if (!http->connected()) {
    Serial.println();
    http->stop();// Shutdown
    Serial.println("HTTP POST disconnected");
  }
}
void check_sim_on()
{
  pinMode(PWR_MODEM_SIM800, OUTPUT );
  Serial.println("Check power on modem...");
  while (modem.testAT() == false)
  {
    digitalWrite(PWR_MODEM_SIM800, LOW);
    Serial.print(".");
    delay(3000);
  }
}
void gps_loop()
{
  char c = GPS.read();
  if (GPSECHO)
    if (c) Serial.print(c);
  if (GPS.newNMEAreceived()) {
    if (GPSECHO)Serial.println(GPS.lastNMEA());
    if (!GPS.parse(GPS.lastNMEA()))
      return;
  }

  if (timer > millis()) timer = millis();
  if (millis() - timer > 30000) {
    timer = millis(); // reset the timer
    Serial.print("\nTime: ");
    Serial.print(GPS.hour, DEC); Serial.print(':');
    Serial.print(GPS.minute, DEC); Serial.print(':');
    Serial.print(GPS.seconds, DEC); Serial.print('.');
    Serial.println(GPS.milliseconds);
    Serial.print("Date: ");
    Serial.print(GPS.day, DEC); Serial.print('/');
    Serial.print(GPS.month, DEC); Serial.print("/20");
    Serial.println(GPS.year, DEC);
    Serial.print("Fix: "); Serial.print((int)GPS.fix);
    Serial.print(" quality: "); Serial.println((int)GPS.fixquality);
    if (GPS.fix) {
      Serial.print("Location: ");
      Serial.print(GPS.latitude, 4); Serial.print(GPS.lat);
      Serial.print(", ");
      Serial.print(GPS.longitude, 4); Serial.println(GPS.lon);
      Serial.print("Speed (knots): "); Serial.println(GPS.speed);
      Serial.print("Angle: "); Serial.println(GPS.angle);
      Serial.print("Altitude: "); Serial.println(GPS.altitude);
      Serial.print("Satellites: "); Serial.println((int)GPS.satellites);
      double lat_rec = convertDegMinToDecDeg(GPS.latitude);
      double lon_rec = convertDegMinToDecDeg(GPS.longitude);
      char* geoHash;
      geoHash = (char*) malloc(DEFAULT_PRECISION + 1);
      memset(geoHash, 0, sizeof(*geoHash) * (DEFAULT_PRECISION + 1));
      makeHash(geoHash, lat_rec, lon_rec, DEFAULT_PRECISION);

      String gpsDoc;
      gpsDoc += "{";
      gpsDoc += "\"accuracy\":10,";
      gpsDoc += "\"bearing\":" + String(GPS.angle) + ",";
      gpsDoc += "\"g\":\"" + String(geoHash) + "\",";
      gpsDoc += "\"l\":[" + String(lat_rec, 4) + "," + String(lon_rec, 4) + "],";
      gpsDoc += "\"speed\":" + String(GPS.speed) + ",";
      gpsDoc += "\"user\":\"" + String(USER_TOKEN) + "\",";
      gpsDoc += "\"timestamp\":{\".sv\": \"timestamp\"},";
      gpsDoc += "\"timegps\":\"" + String(GPS.day, DEC) + "/" + String(GPS.month, DEC) + "/" + String(GPS.year, DEC) + "-" + String(GPS.hour, DEC) + ":" + String(GPS.minute, DEC) + ":" + String(GPS.seconds, DEC) + "\"";
      gpsDoc += "}";
      Serial.println(gpsDoc);
      httpPostNoAuth("PATCH", UPDATE_PATH, gpsDoc, &http_no_auth);
      free(geoHash);
      toggle = !toggle;
      digitalWrite(PC13, toggle);
    }
  }
}
void setup() {
  // Set console baud rate
  Serial.begin(115200);
  pinMode(PC13, OUTPUT);
  delay(1000);
  Serial.println("Uart start!");
  delay(10);
  // Set GSM module baud rate
  SerialAT.begin(9600);
  delay(3000);
  // Restart takes quite some time
  // To skip it, call init() instead of restart()
  check_sim_on();
  Serial.println("Initializing modem...");
  modem.restart();
  String modemInfo = modem.getModemInfo();
  Serial.print("Modem: ");
  Serial.println(modemInfo);

  // Unlock your SIM card with a PIN
  //modem.simUnlock("1234");

  GPS.begin(9600);
  GPS.sendCommand(PMTK_SET_NMEA_OUTPUT_RMCGGA);
  GPS.sendCommand(PMTK_SET_NMEA_UPDATE_1HZ); // 1 Hz update rate
  GPS.sendCommand(PGCMD_ANTENNA);
  delay(1000);
  // Ask for firmware version
  GPSSerial.println(PMTK_Q_RELEASE);
  http_no_auth.setHttpResponseTimeout(90 * 1000); //^0 secs timeout
}

void loop() {
  if (retry >= 2)
  {
    check_sim_on();
    Serial.println("Initializing modem...");
    modem.restart();
    String modemInfo = modem.getModemInfo();
    Serial.print("Modem: ");
    Serial.println(modemInfo);
  }
  if (!modem.hasSSL()) {
    Serial.println("SSL is not supported by this modem");
    retry++;
    delay(5000);
    return;
  }
  Serial.print(F("Waiting for network..."));
  if (!modem.waitForNetwork()) {
    Serial.println(" fail");
    delay(10000);
    return;
  }
  Serial.println(" OK");
  Serial.print(F("Connecting to "));
  Serial.print(apn);
  if (!modem.gprsConnect(apn, user, pass)) {
    Serial.println(" fail");
    delay(10000);
    return;
  }
  http_no_auth.connect(server, ssl_port);
  while (true) {
    if (!http_no_auth.connected()) {
      Serial.println();
      http_no_auth.stop();// Shutdown
      Serial.println("HTTP  not connect");
      break;
    }
    else
    {
      gps_loop();
    }

  }
}






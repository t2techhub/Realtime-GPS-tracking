package xyz.vidieukhien.gpsrealtimelocation;

import android.location.Location;

import com.firebase.geofire.GeoLocation;
import com.firebase.geofire.core.GeoHash;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseException;
import com.google.firebase.database.Exclude;
import com.google.firebase.database.GenericTypeIndicator;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Son Bui on 02/05/2016.
 */
public class GeoDevice {

    private float accuracy = 0.0f;
    private float bearing = 0.0f;
    public String g;
    private List<Double> l = new ArrayList<Double>();
    private float speed = 0.0f;
    private float power = 0.0f;
    private Object timestamp;
    @Exclude
    private double latitude;
    @Exclude
    private double longitude;
    @Exclude
    private Map<String, Object> geoObject = new HashMap<String, Object>();
    @Exclude
    private GeoLocation geoLocation;
    @Exclude
    private Location location;

    public GeoDevice() {
    }

    public GeoDevice(Location location) {
        this.location = location;
        this.geoLocation = new GeoLocation(location.getLatitude(), location.getLongitude());
        GeoHash geoHash = new GeoHash(geoLocation);
        g = geoHash.getGeoHashString();
        l.add(location.getLatitude());
        l.add(location.getLongitude());
        //  timestamp = ServerValue.TIMESTAMP;
        accuracy = location.getAccuracy();
        bearing = location.getBearing();
        speed = location.getSpeed();
        timestamp = location.getTime();
        power=0.0f;

    }
    public GeoDevice(Location location, float batteryLevel) {
        this.location = location;
        this.geoLocation = new GeoLocation(location.getLatitude(), location.getLongitude());
        GeoHash geoHash = new GeoHash(geoLocation);
        g = geoHash.getGeoHashString();
        l.add(location.getLatitude());
        l.add(location.getLongitude());
        //  timestamp = ServerValue.TIMESTAMP;
        accuracy = location.getAccuracy();
        bearing = location.getBearing();
        speed = location.getSpeed();
        timestamp = location.getTime();
        power=batteryLevel;

    }

    public GeoDevice(GeoLocation geoLocation) {
        this.geoLocation = geoLocation;

    }

    public GeoDevice(double latitude, double longitude) {
        this.geoLocation = new GeoLocation(latitude, longitude);
    }

    @Exclude
    public Boolean Decode(DataSnapshot dataSnapshot) {
        try {
            GenericTypeIndicator<Map<String, Object>> typeIndicator = new GenericTypeIndicator<Map<String, Object>>() {
            };
            Map<String, Object> data = dataSnapshot.getValue(typeIndicator);
            List<?> location = (List<?>) data.get("l");
            Number latitudeObj = (Number) location.get(0);
            Number longitudeObj = (Number) location.get(1);
            latitude = latitudeObj.doubleValue();
            longitude = longitudeObj.doubleValue();
            if (location.size() == 2 && GeoLocation.coordinatesValid(latitude, longitude)) {
                geoLocation = new GeoLocation(latitude, longitude);
            }
            Number speedObj = (Number) data.get("speed");
            if (speedObj != null) speed = speedObj.floatValue();
            Number accuracyObj = (Number) data.get("accuracy");
            if (accuracyObj != null) accuracy = accuracyObj.floatValue();
            Number bearingObj = (Number) data.get("bearing");
            if (bearingObj != null) bearing = bearingObj.floatValue();
            Number timestampObj = (Number) data.get("timestamp");
            timestamp = timestampObj.longValue();
            return true;
        } catch (DatabaseException e) {
            e.printStackTrace();
            return false;
        } catch (NullPointerException e) {
            e.printStackTrace();
            return false;
        } catch (ClassCastException e) {
            e.printStackTrace();
            return false;
        }
    }

    @Exclude
    public Map<String, Object> toMap() {
        geoObject.put("accuracy", accuracy);
        geoObject.put("bearing", bearing);
        geoObject.put("speed", speed);
        geoObject.put("power", power);
        GeoHash geoHash = new GeoHash(geoLocation);
        geoObject.put("g", geoHash.getGeoHashString());
        List<Double> latlang = new ArrayList<Double>();
        latlang.add(geoLocation.latitude);
        latlang.add(geoLocation.longitude);
        geoObject.put("l", latlang);
        // geoObject.put("timestamp", ServerValue.TIMESTAMP);
        geoObject.put("timestamp", location.getTime());
        return geoObject;
    }

    @Exclude
    public GeoLocation getGeoLocation() {
        return geoLocation;
    }

    @Exclude
    public void setGeoLocation(GeoLocation geoLocation) {
        this.geoLocation = geoLocation;
    }

    @Exclude
    public Location getLocation() {
        return location;
    }

    @Exclude
    public void setLocation(Location location) {
        this.location = location;
    }

    public float getSpeed() {
        return speed;
    }

    public void setSpeed(float speed) {
        this.speed = speed;
    }

    public float getAccuracy() {
        return accuracy;
    }

    public void setAccuracy(float accuracy) {
        this.accuracy = accuracy;
    }

    public float getBearing() {
        return bearing;
    }

    public void setBearing(float bearing) {
        this.bearing = bearing;
    }

    public List<Double> getL() {
        return l;
    }

    public void setL(List<Double> l) {
        this.l = l;
    }

    public String getG() {
        return g;
    }

    public void setG(String g) {
        this.g = g;
    }

    public Object getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Object timestamp) {
        this.timestamp = timestamp;
    }

    @Exclude
    public double getLatitude() {
        return latitude;
    }

    @Exclude
    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    @Exclude
    public double getLongitude() {
        return longitude;
    }

    @Exclude
    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }
}

package xyz.vidieukhien.gpsrealtimelocation;

import android.app.Application;
import android.os.Bundle;

import com.google.firebase.analytics.FirebaseAnalytics;

public class AnalyticsApplication extends Application {

    private boolean backgroundRunning = false;
    private FirebaseAnalytics firebaseAnalytics;

    synchronized public boolean isBackgroundRunning() {
        return backgroundRunning;
    }

    synchronized public void setBackgroundRunning(boolean backgroundRunning) {
        this.backgroundRunning = backgroundRunning;
    }

    public AnalyticsApplication() {
        super();
    }

    public FirebaseAnalytics getFirebaseAnalytics() {
        return firebaseAnalytics;
    }

    public void setFirebaseAnalytics(FirebaseAnalytics firebaseAnalytics) {
        this.firebaseAnalytics = firebaseAnalytics;
    }

    @Override
    public void onCreate() {
        super.onCreate();
    }

    synchronized public FirebaseAnalytics getTracker() {
        firebaseAnalytics = FirebaseAnalytics.getInstance(this);
        return firebaseAnalytics;
    }


    public void sendEvent(String id, String name) {
        Bundle bundle = new Bundle();
        bundle.putString(FirebaseAnalytics.Param.ITEM_ID, id);
        bundle.putString(FirebaseAnalytics.Param.ITEM_NAME, name);
        bundle.putString(FirebaseAnalytics.Param.CONTENT_TYPE, "image");
        firebaseAnalytics.logEvent(FirebaseAnalytics.Event.SELECT_CONTENT, bundle);
    }
    public void setUserProperty(String id, String name) {
        firebaseAnalytics.setUserProperty(id, name);

    }


}

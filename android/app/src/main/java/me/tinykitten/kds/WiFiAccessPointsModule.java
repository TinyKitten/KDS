package me.tinykitten.kds;
import android.content.Context;
import android.net.wifi.ScanResult;
import android.net.wifi.WifiManager;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;

public class WiFiAccessPointsModule extends ReactContextBaseJavaModule {
    WiFiAccessPointsModule(ReactApplicationContext context) {
        super(context);
    }

    @NonNull
    @Override
    public String getName() {
        return "WiFiAccessPointsModule";
    }

    @ReactMethod
    public void getNearbyAccessPoints(Promise promise) {
        try {
            WifiManager wifiManager = (WifiManager) this
                    .getReactApplicationContext().getApplicationContext()
                    .getSystemService(Context.WIFI_SERVICE);

            WritableNativeArray mapList = new WritableNativeArray();
            wifiManager.startScan();
            for (ScanResult result : wifiManager.getScanResults()) {
                final WritableNativeMap map = new WritableNativeMap();
                map.putString("macAddress", result.BSSID);
                map.putInt("signalStrength", result.level);
                map.putInt("age", 0); // 測れなそう
                map.putInt("channel", result.frequency);
                map.putInt("signalToNoiseRatio", 0); // こっちも測れなそう
                mapList.pushMap(map);
            }
            promise.resolve(mapList);
        } catch (Exception e) {
            promise.reject(e);
        }
    }
}


package com.imbit;

import android.app.Application;

import com.facebook.react.ReactApplication;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.crypho.scrypt.RNScryptPackage;
import com.bitgo.randombytes.RandomBytesPackage;
// import com.bitgo.randombytes.RandomBytesPackage;
import com.reactnative.photoview.PhotoViewPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import org.reactnative.camera.RNCameraPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;


//import com.facebook.react.ReactApplication;
//import com.reactnative.photoview.PhotoViewPackage;
//import com.BV.LinearGradient.LinearGradientPackage;
//import com.oblador.vectoricons.VectorIconsPackage;
//import com.facebook.react.ReactNativeHost;
//import com.facebook.react.ReactPackage;
//import com.facebook.react.shell.MainReactPackage;
//import com.facebook.soloader.SoLoader;

// reactnativenavigation new ++ 
import com.reactnativenavigation.NavigationApplication;
import com.reactnativenavigation.react.NavigationReactNativeHost;
import com.reactnativenavigation.react.ReactGateway;
// reactnativenavigation new end

import java.util.Arrays;
import java.util.List;


public class MainApplication extends NavigationApplication {
    
    @Override
    protected ReactGateway createReactGateway() {
        ReactNativeHost host = new NavigationReactNativeHost(this, isDebug(), createAdditionalReactPackages()) {
            @Override
           protected String getJSMainModuleName() {
                return "index";
            }
        };
        return new ReactGateway(this, isDebug(), host);
    }

    @Override
    public boolean isDebug() {
        return BuildConfig.DEBUG;
    }

    protected List<ReactPackage> getPackages() {
        // Add additional packages you require here
        // No need to add RnnPackage and MainReactPackage
        return Arrays.<ReactPackage>asList(
            // eg. new VectorIconsPackage()
                new RandomBytesPackage(),
                new RNCameraPackage(),
                new RNScryptPackage(),
                new SplashScreenReactPackage()  //启动图
        );
    }
  
    @Override
    public List<ReactPackage> createAdditionalReactPackages() {
        return getPackages();
    }
}
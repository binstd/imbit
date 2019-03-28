package com.imbit;

// import com.facebook.react.ReactActivity;
// new reactnativenavigation start
import com.reactnativenavigation.NavigationActivity;
import android.os.Bundle;  //add 
import org.devio.rn.splashscreen.SplashScreen; //add

public class MainActivity extends NavigationActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this);  // 添加这一句
        super.onCreate(savedInstanceState);
    }
}
// new reactnativenavigation end

// public class MainActivity extends ReactActivity {

//     /**
//      * Returns the name of the main component registered from JavaScript.
//      * This is used to schedule rendering of the component.
//      */
//     @Override
//     protected String getMainComponentName() {
//         return "imbit";
//     }
// }

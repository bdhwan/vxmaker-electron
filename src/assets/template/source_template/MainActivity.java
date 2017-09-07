
package !!!packageName!!!;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.*;
import android.util.Log;
import android.content.Intent;
import android.animation.Animator;
import android.animation.ObjectAnimator;
import android.animation.ValueAnimator;
import android.animation.AnimatorSet;
import com.samsung.android.view.animation.*;
import android.content.Context;
import android.util.DisplayMetrics;
import com.airbnb.lottie.LottieAnimationView;
import io.fotoapparat.Fotoapparat;
import io.fotoapparat.parameter.LensPosition;
import io.fotoapparat.parameter.selector.SelectorFunction;
import io.fotoapparat.view.CameraView;
import com.bartoszlipinski.viewpropertyobjectanimator.ViewPropertyObjectAnimator;

import static io.fotoapparat.parameter.selector.AspectRatioSelectors.standardRatio;
import static io.fotoapparat.parameter.selector.FocusModeSelectors.autoFocus;
import static io.fotoapparat.parameter.selector.FocusModeSelectors.continuousFocus;
import static io.fotoapparat.parameter.selector.FocusModeSelectors.fixed;
import static io.fotoapparat.parameter.selector.LensPositionSelectors.back;
import static io.fotoapparat.parameter.selector.LensPositionSelectors.front;
import static io.fotoapparat.parameter.selector.Selectors.firstAvailable;
import static io.fotoapparat.parameter.selector.SizeSelectors.biggestSize;




public class !!!activityName!!! extends AppCompatActivity {

    String currentStage;

    !!!variableList!!!
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        context = this;
        setContentView(R.layout.!!!layoutName!!!);

        !!!variableFindList!!!
        !!!eventList!!!



        int width = findViewById(R.id.root).getLayoutParams().width;
        int height = findViewById(R.id.root).getLayoutParams().height;


        if(getWindowWidth()<width || getWindowHeight()<height){

                FrameLayout.LayoutParams param = (FrameLayout.LayoutParams)findViewById(R.id.windowRoot).getLayoutParams();
                param.width = width;
                param.height = height;
                findViewById(R.id.windowRoot).setLayoutParams(param);

                float windowRatio =(float)getWindowHeight()/(float)getWindowWidth();
                float viewRatio =  (float)height/(float)width;

                if(windowRatio>viewRatio){
                        float scale = (float)getWindowWidth()/(float)width;
                        findViewById(R.id.root).setScaleX(scale);
                        findViewById(R.id.root).setScaleY(scale);
                }
                else{
                        float scale = (float)getWindowHeight()/(float)height;
                        findViewById(R.id.root).setScaleX(scale);
                        findViewById(R.id.root).setScaleY(scale);
                }
        }
}




public int getWindowWidth() {
    DisplayMetrics metrics = context.getResources().getDisplayMetrics();
    return metrics.widthPixels;
}

public int getWindowHeight() {
    DisplayMetrics metrics = context.getResources().getDisplayMetrics();
    return metrics.heightPixels;
}



boolean haveOnResumeEvent = false;
@Override
protected void onResume() {
        super.onResume();
        if(!haveOnResumeEvent){
                haveOnResumeEvent = true;
                !!!onCreateEvent!!!
        }
}



@Override
public void onBackPressed() {
        !!!onBackPressedEvent!!!
    
}

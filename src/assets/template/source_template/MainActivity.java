
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
import android.content.Context;
import android.util.DisplayMetrics;
import com.airbnb.lottie.LottieAnimationView;
import io.fotoapparat.Fotoapparat;
import io.fotoapparat.parameter.LensPosition;
import io.fotoapparat.parameter.selector.SelectorFunction;
import io.fotoapparat.view.CameraView;
import com.bartoszlipinski.viewpropertyobjectanimator.ViewPropertyObjectAnimator;
import android.support.v4.view.animation.PathInterpolatorCompat;


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

}
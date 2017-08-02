

/**
 * stage change animation set
 */
private AnimatorSet getStageChangeAnimation(AnimatorSet... animators){
        AnimatorSet stageAnimator = new AnimatorSet();
        stageAnimator.playTogether(animators);
        return stageAnimator;
        }


/**
 * state change animation set
 */
private AnimatorSet getStateAnimation(final View view, long duration, long delay, float translationX, float translationY,double scaleX, double scaleY, double alpha, float rotation, float rotationX, float rotationY,final String tag) {


        ObjectAnimator animX = ObjectAnimator.ofFloat(view, "translationX", translationX);
        animX.setInterpolator(new Elastic60());

        ObjectAnimator animY = ObjectAnimator.ofFloat(view, "translationY", translationY);
        animY.setInterpolator(new Elastic60());

        ObjectAnimator animSX = ObjectAnimator.ofFloat(view, "scaleX", (float) scaleX);
        animSX.setInterpolator(new Elastic60());


        ObjectAnimator animSY = ObjectAnimator.ofFloat(view, "scaleY", (float) scaleY);
        animSY.setInterpolator(new Elastic60());

        ObjectAnimator animA = ObjectAnimator.ofFloat(view, "alpha", (float) alpha);

        ObjectAnimator animR = ObjectAnimator.ofFloat(view, "rotation", rotation);
        animR.setInterpolator(new Elastic60());

        ObjectAnimator animRX = ObjectAnimator.ofFloat(view, "rotationX", rotationX);
        animRX.setInterpolator(new Elastic60());

        ObjectAnimator animRY = ObjectAnimator.ofFloat(view, "rotationY", rotationY);
        animRY.setInterpolator(new Elastic60());


        AnimatorSet set = new AnimatorSet();
        set.playTogether(animX, animY, animSX, animSY, animA, animR, animRX, animRY);
        set.setDuration(duration);
        set.addListener(new Animator.AnimatorListener() {
@Override
public void onAnimationStart(Animator animator) {
        view.setTag(tag+"animating");
        }

@Override
public void onAnimationEnd(Animator animator) {
        view.setTag(tag);
        }

@Override
public void onAnimationCancel(Animator animator) {

        }

@Override
public void onAnimationRepeat(Animator animator) {

        }
        });

        set.setStartDelay(delay);

        return set;
        }
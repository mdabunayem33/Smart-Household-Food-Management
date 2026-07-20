package com.freshkeep.app.views

import android.content.Context
import android.util.AttributeSet
import android.util.TypedValue
import android.view.Gravity
import android.view.View
import android.view.animation.AnimationUtils
import android.widget.FrameLayout
import androidx.core.content.ContextCompat
import com.freshkeep.app.R
import kotlin.math.cos
import kotlin.math.sin
import kotlin.random.Random

/**
 * Port of SuccessCelebration.jsx — green check circle pops in (bounce, 380ms)
 * while 14 confetti dots burst outward and fade (900ms, ease-out-soft).
 */
class CelebrationView @JvmOverloads constructor(
    context: Context,
    attrs: AttributeSet? = null,
) : FrameLayout(context, attrs) {

    private fun dp(v: Float): Int =
        TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, v, resources.displayMetrics).toInt()

    fun play() {
        removeAllViews()
        val size = dp(140f)
        val colors = intArrayOf(
            ContextCompat.getColor(context, R.color.green_500),
            ContextCompat.getColor(context, R.color.orange_500),
            ContextCompat.getColor(context, R.color.blue_500),
        )
        val softOut = AnimationUtils.loadInterpolator(context, R.interpolator.ease_out_soft)
        val bounce = AnimationUtils.loadInterpolator(context, R.interpolator.ease_bounce)

        // burst particles
        for (i in 0 until 14) {
            val angle = (i / 14.0) * Math.PI * 2
            val dist = dp(70f) + Random.nextInt(dp(40f))
            val dot = View(context).apply {
                setBackgroundResource(R.drawable.circle_primary)
                background.setTint(colors[i % 3])
                layoutParams = LayoutParams(dp(8f), dp(8f), Gravity.CENTER)
                alpha = 0f
            }
            addView(dot)
            dot.animate()
                .translationX((cos(angle) * dist).toFloat())
                .translationY((sin(angle) * dist).toFloat())
                .setStartDelay(Random.nextLong(120))
                .setDuration(900)
                .setInterpolator(softOut)
                .withStartAction { dot.alpha = 1f }
                .alpha(0f)
                .start()
        }

        // check circle
        val circle = FrameLayout(context).apply {
            setBackgroundResource(R.drawable.circle_primary)
            layoutParams = LayoutParams(size, size, Gravity.CENTER)
            elevation = dp(8f).toFloat()
            scaleX = 0.4f; scaleY = 0.4f; alpha = 0f
        }
        val check = IconView(context).apply {
            setIcon("check")
            setTextSize(TypedValue.COMPLEX_UNIT_DIP, 56f)
            setTextColor(0xFFFFFFFF.toInt())
            gravity = Gravity.CENTER
            layoutParams = LayoutParams(LayoutParams.WRAP_CONTENT, LayoutParams.WRAP_CONTENT, Gravity.CENTER)
        }
        circle.addView(check)
        addView(circle)
        circle.animate().scaleX(1f).scaleY(1f).alpha(1f)
            .setDuration(380).setInterpolator(bounce).start()
    }
}

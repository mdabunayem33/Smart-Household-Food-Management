package com.freshkeep.app.views

import android.annotation.SuppressLint
import android.view.MotionEvent
import android.view.View
import android.view.animation.AnimationUtils
import com.freshkeep.app.R

/**
 * Press feedback used across the design system:
 * scale to 0.96 (bounce ease, 120ms) on press, back to 1 on release —
 * the onPointerDown/Up transform from Button.jsx / CategoryCard.jsx etc.
 */
object Press {

    @SuppressLint("ClickableViewAccessibility")
    fun apply(view: View, scale: Float = 0.96f) {
        val bounce = AnimationUtils.loadInterpolator(view.context, R.interpolator.ease_bounce)
        view.setOnTouchListener { v, event ->
            when (event.actionMasked) {
                MotionEvent.ACTION_DOWN ->
                    v.animate().scaleX(scale).scaleY(scale).setDuration(120).setInterpolator(bounce).start()
                MotionEvent.ACTION_UP, MotionEvent.ACTION_CANCEL ->
                    v.animate().scaleX(1f).scaleY(1f).setDuration(120).setInterpolator(bounce).start()
            }
            false
        }
    }
}

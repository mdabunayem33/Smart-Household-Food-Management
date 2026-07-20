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

/**
 * Toggle.jsx — 52×32 pill, 26dp white thumb, green when on / gray-300 off,
 * thumb slides with bounce ease (220ms).
 */
class ToggleView @JvmOverloads constructor(
    context: Context,
    attrs: AttributeSet? = null,
) : FrameLayout(context, attrs) {

    private fun dp(v: Float): Int =
        TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, v, resources.displayMetrics).toInt()

    var checked: Boolean = false
        private set

    var onChange: ((Boolean) -> Unit)? = null

    private val thumb: View

    init {
        layoutParams = LayoutParams(dp(52f), dp(32f))
        setBackgroundResource(R.drawable.bg_pill_section)
        isClickable = true
        isFocusable = true

        thumb = View(context).apply {
            setBackgroundResource(R.drawable.circle_primary)
            background.mutate().setTint(0xFFFFFFFF.toInt())
            layoutParams = LayoutParams(dp(26f), dp(26f), Gravity.START or Gravity.CENTER_VERTICAL)
                .apply { marginStart = dp(3f) }
            elevation = dp(2f).toFloat()
        }
        addView(thumb)

        setOnClickListener { setChecked(!checked, animate = true, notify = true) }
        applyTrack()
    }

    override fun onMeasure(widthMeasureSpec: Int, heightMeasureSpec: Int) {
        super.onMeasure(
            MeasureSpec.makeMeasureSpec(dp(52f), MeasureSpec.EXACTLY),
            MeasureSpec.makeMeasureSpec(dp(32f), MeasureSpec.EXACTLY),
        )
    }

    fun setChecked(value: Boolean, animate: Boolean = false, notify: Boolean = false) {
        checked = value
        applyTrack()
        val target = if (checked) dp(20f).toFloat() else 0f
        if (animate) {
            thumb.animate().translationX(target).setDuration(220)
                .setInterpolator(AnimationUtils.loadInterpolator(context, R.interpolator.ease_bounce))
                .start()
        } else {
            thumb.translationX = target
        }
        if (notify) onChange?.invoke(checked)
    }

    private fun applyTrack() {
        background.mutate().setTint(
            ContextCompat.getColor(context, if (checked) R.color.color_primary else R.color.gray_300)
        )
    }
}

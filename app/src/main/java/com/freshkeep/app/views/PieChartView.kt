package com.freshkeep.app.views

import android.animation.ValueAnimator
import android.content.Context
import android.graphics.Canvas
import android.graphics.Paint
import android.graphics.RectF
import android.util.AttributeSet
import android.view.View
import android.view.animation.AnimationUtils
import androidx.core.content.ContextCompat
import com.freshkeep.app.R

/**
 * Analytics PieChart — conic donut (inner hole 60%), slices sweep in over
 * 900ms ease-out-soft, matching the web's animated conic-gradient.
 */
class PieChartView @JvmOverloads constructor(
    context: Context,
    attrs: AttributeSet? = null,
) : View(context, attrs) {

    data class Slice(val pct: Float, val colorRes: Int)

    private var slices = listOf<Slice>()
    private var progress = 0f
    private var animator: ValueAnimator? = null

    private val paint = Paint(Paint.ANTI_ALIAS_FLAG)
    private val holePaint = Paint(Paint.ANTI_ALIAS_FLAG).apply {
        color = ContextCompat.getColor(context, R.color.color_bg_elevated)
    }
    private val rect = RectF()

    fun setData(data: List<Slice>) {
        slices = data
        animator?.cancel()
        progress = 0f
        animator = ValueAnimator.ofFloat(0f, 1f).apply {
            duration = 900
            interpolator = AnimationUtils.loadInterpolator(context, R.interpolator.ease_out_soft)
            addUpdateListener {
                progress = it.animatedValue as Float
                invalidate()
            }
            start()
        }
    }

    override fun onDraw(canvas: Canvas) {
        if (slices.isEmpty()) return
        val size = minOf(width, height).toFloat()
        val cx = width / 2f
        val cy = height / 2f
        rect.set(cx - size / 2, cy - size / 2, cx + size / 2, cy + size / 2)

        // conic-gradient starts at 12 o'clock
        var start = -90f
        for (s in slices) {
            val sweep = 360f * (s.pct / 100f) * progress
            paint.color = ContextCompat.getColor(context, s.colorRes)
            canvas.drawArc(rect, start, sweep, true, paint)
            start += 360f * (s.pct / 100f)
        }

        // inner hole (60%)
        canvas.drawCircle(cx, cy, size * 0.3f, holePaint)
    }

    override fun onDetachedFromWindow() {
        super.onDetachedFromWindow()
        animator?.cancel()
    }
}

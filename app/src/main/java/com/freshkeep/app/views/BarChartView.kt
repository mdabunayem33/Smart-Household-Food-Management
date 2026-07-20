package com.freshkeep.app.views

import android.animation.ValueAnimator
import android.content.Context
import android.graphics.Canvas
import android.graphics.Paint
import android.graphics.RectF
import android.util.AttributeSet
import android.util.TypedValue
import android.view.View
import android.view.animation.AnimationUtils
import androidx.core.content.ContextCompat
import androidx.core.content.res.ResourcesCompat
import com.freshkeep.app.R

/**
 * Analytics BarChart — 4 weekly bars grow in (600ms ease-out-soft);
 * the highest week is orange with orange-700 value label, others green.
 * Value label above each bar, "Week n" caption below.
 */
class BarChartView @JvmOverloads constructor(
    context: Context,
    attrs: AttributeSet? = null,
) : View(context, attrs) {

    private var values = listOf<Double>()
    private var maxVal = 1.0
    private var progress = 0f
    private var animator: ValueAnimator? = null

    private val barPaint = Paint(Paint.ANTI_ALIAS_FLAG)
    private val textPaint = Paint(Paint.ANTI_ALIAS_FLAG).apply { textAlign = Paint.Align.CENTER }
    private val rect = RectF()

    private val fontLabel = ResourcesCompat.getFont(context, R.font.baloo2_bold)
    private val fontCaption = ResourcesCompat.getFont(context, R.font.nunito_semibold)

    private fun dp(v: Float): Float =
        TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, v, resources.displayMetrics)

    fun setData(values: List<Double>, maxVal: Double) {
        this.values = values
        this.maxVal = maxVal
        animator?.cancel()
        progress = 0f
        animator = ValueAnimator.ofFloat(0f, 1f).apply {
            duration = 600
            startDelay = 30
            interpolator = AnimationUtils.loadInterpolator(context, R.interpolator.ease_out_soft)
            addUpdateListener {
                progress = it.animatedValue as Float
                invalidate()
            }
            start()
        }
    }

    private fun fmt(v: Double): String =
        if (v == v.toLong().toDouble()) v.toLong().toString()
        else String.format(java.util.Locale.US, "%.1f", v)

    override fun onDraw(canvas: Canvas) {
        if (values.isEmpty()) return
        val highest = values.max()
        val n = values.size
        val gap = dp(16f)
        val cellW = (width - gap * (n - 1)) / n
        val maxBarW = dp(44f)
        val barW = minOf(cellW, maxBarW)
        val captionH = dp(20f)
        val labelH = dp(22f)
        val barMaxH = dp(110f)
        val baseline = height - captionH

        val colorGreen = ContextCompat.getColor(context, R.color.color_primary)
        val colorOrange = ContextCompat.getColor(context, R.color.orange_600)
        val colorLabelHi = ContextCompat.getColor(context, R.color.orange_700)
        val colorLabel = ContextCompat.getColor(context, R.color.color_text_secondary)
        val colorCaption = ContextCompat.getColor(context, R.color.color_text_tertiary)

        for (i in values.indices) {
            val v = values[i]
            val isHighest = v == highest
            val cx = cellW * i + gap * i + cellW / 2f
            val h = (v / maxVal * barMaxH).toFloat() * progress

            // value label
            textPaint.typeface = fontLabel
            textPaint.textSize = dp(13f)
            textPaint.color = if (isHighest) colorLabelHi else colorLabel
            canvas.drawText("${fmt(v)} kg", cx, baseline - h - dp(8f), textPaint)

            // bar
            barPaint.color = if (isHighest) colorOrange else colorGreen
            rect.set(cx - barW / 2f, baseline - h, cx + barW / 2f, baseline)
            canvas.drawRoundRect(rect, dp(12f), dp(12f), barPaint)

            // caption
            textPaint.typeface = fontCaption
            textPaint.textSize = dp(12f)
            textPaint.color = colorCaption
            canvas.drawText("Week ${i + 1}", cx, height - dp(4f), textPaint)
        }
        // reserve label height (suppress unused warning usage)
        if (labelH < 0) return
    }

    override fun onDetachedFromWindow() {
        super.onDetachedFromWindow()
        animator?.cancel()
    }
}

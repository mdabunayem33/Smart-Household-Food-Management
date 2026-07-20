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
import kotlin.math.max
import kotlin.math.min

/**
 * Port of FreshnessBar.jsx — 6dp pill track (gray-100) with a colored fill.
 *   >7d green ~95% · 4–7d yellow 60–80% · 2–3d orange 35–48% · 1d red ~15% · 0d red ~8%
 * Expired items fill from the RIGHT edge, growing with days expired.
 * Width animates 380ms ease-out-soft (--duration-slow).
 */
class FreshnessBarView @JvmOverloads constructor(
    context: Context,
    attrs: AttributeSet? = null,
) : View(context, attrs) {

    private val trackPaint = Paint(Paint.ANTI_ALIAS_FLAG).apply {
        color = ContextCompat.getColor(context, R.color.gray_100)
    }
    private val fillPaint = Paint(Paint.ANTI_ALIAS_FLAG)
    private val rect = RectF()

    private var fillPct = 0f
    private var fromRight = false
    private var animator: ValueAnimator? = null

    /** FreshnessBar levelMap fallback (used when daysLeft unknown). */
    fun setLevel(level: String) {
        val (pct, color) = when (level) {
            "fresh" -> 100f to R.color.color_fresh
            "aging" -> 70f to R.color.color_aging
            "soon" -> 40f to R.color.color_soon
            else -> 12f to R.color.color_expired
        }
        fromRight = false
        fillPaint.color = ContextCompat.getColor(context, color)
        animateTo(pct)
    }

    /** freshnessFromDaysLeft(d) — precise day-based fill. */
    fun setDaysLeft(daysLeft: Int) {
        val d = daysLeft
        val pct: Float
        val color: Int
        when {
            d > 7 -> { pct = 95f; color = R.color.color_fresh }
            d >= 4 -> { pct = 60f + ((d - 4) / 3f) * 20f; color = R.color.color_aging }
            d >= 2 -> { pct = 35f + (d - 2) * 13f; color = R.color.color_soon }
            d == 1 -> { pct = 15f; color = R.color.color_expired }
            else -> { pct = 8f; color = R.color.color_expired }
        }
        fromRight = false
        fillPaint.color = ContextCompat.getColor(context, color)
        animateTo(pct)
    }

    /** Expired: right-anchored red fill, 15% + 14%/day. */
    fun setExpired(expiredDays: Int) {
        fromRight = true
        fillPaint.color = ContextCompat.getColor(context, R.color.color_expired)
        animateTo(min(100f, 15f + max(0, expiredDays) * 14f))
    }

    /** One-call binding used by cards. */
    fun bind(level: String, daysLeft: Int?, expiredDays: Int) {
        when {
            level == "expired" -> setExpired(expiredDays)
            daysLeft != null -> setDaysLeft(daysLeft)
            else -> setLevel(level)
        }
    }

    /** Direct percentage + token color (Inventory expiry progress variant). */
    fun setProgress(pct: Float, colorToken: String, expired: Boolean) {
        fromRight = expired
        val color = when (colorToken) {
            "fresh" -> R.color.color_fresh
            "aging" -> R.color.color_aging
            "soon" -> R.color.color_soon
            else -> R.color.color_expired
        }
        fillPaint.color = ContextCompat.getColor(context, color)
        animateTo(pct)
    }

    private fun animateTo(target: Float) {
        animator?.cancel()
        animator = ValueAnimator.ofFloat(fillPct, target).apply {
            duration = 380
            interpolator = AnimationUtils.loadInterpolator(context, R.interpolator.ease_out_soft)
            addUpdateListener {
                fillPct = it.animatedValue as Float
                invalidate()
            }
            start()
        }
    }

    override fun onDraw(canvas: Canvas) {
        val h = height.toFloat()
        val w = width.toFloat()
        val r = h / 2f

        rect.set(0f, 0f, w, h)
        canvas.drawRoundRect(rect, r, r, trackPaint)

        if (fillPct <= 0f) return
        val fillW = w * (fillPct / 100f)
        if (fromRight) rect.set(w - fillW, 0f, w, h) else rect.set(0f, 0f, fillW, h)
        canvas.drawRoundRect(rect, r, r, fillPaint)
    }

    override fun onDetachedFromWindow() {
        super.onDetachedFromWindow()
        animator?.cancel()
    }
}

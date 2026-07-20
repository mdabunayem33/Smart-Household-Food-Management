package com.freshkeep.app.views

import android.annotation.SuppressLint
import android.content.Context
import android.graphics.Canvas
import android.graphics.LinearGradient
import android.graphics.Paint
import android.graphics.RectF
import android.graphics.Shader
import android.os.Build
import android.util.AttributeSet
import android.util.TypedValue
import android.view.HapticFeedbackConstants
import android.view.MotionEvent
import android.view.VelocityTracker
import android.view.View
import android.view.animation.AnimationUtils
import androidx.core.content.ContextCompat
import androidx.core.content.res.ResourcesCompat
import com.freshkeep.app.R
import kotlin.math.abs
import kotlin.math.max
import kotlin.math.pow
import kotlin.math.roundToInt

/**
 * Port of the infinite horizontal quantity wheel (AdjustQuantity.jsx /
 * AddFood.jsx): 56dp ticks, momentum with friction 0.94/16.7ms, snap-to-center
 * (180ms cubic ease-out), haptic tick per index, center highlight pill,
 * edge fade, Baloo 2 numerals (center 22 bold, others 16 medium).
 */
class QuantityWheelView @JvmOverloads constructor(
    context: Context,
    attrs: AttributeSet? = null,
) : View(context, attrs) {

    private fun dp(v: Float): Float =
        TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, v, resources.displayMetrics)

    private val tickW = dp(56f)
    private val friction = 0.94
    private val minVelocity = 0.01 // index per ms

    var step: Double = 1.0
        set(value) {
            field = value
            pos = (this.value / value)
            invalidate()
        }

    var value: Double = 1.0
        private set

    var onChange: ((Double) -> Unit)? = null

    /** position in index units (value = round(pos) * step) */
    private var pos = 1.0
    private var lastHapticIdx = 1

    private val centerPaint = Paint(Paint.ANTI_ALIAS_FLAG).apply {
        color = ContextCompat.getColor(context, R.color.color_primary_surface)
    }
    private val textPaint = Paint(Paint.ANTI_ALIAS_FLAG).apply {
        textAlign = Paint.Align.CENTER
    }
    private val fadePaint = Paint()
    private val rect = RectF()

    private val fontBold = ResourcesCompat.getFont(context, R.font.baloo2_bold)
    private val fontMedium = ResourcesCompat.getFont(context, R.font.baloo2_medium)
    private val colorPrimaryText = ContextCompat.getColor(context, R.color.color_text_primary)
    private val colorTertiary = ContextCompat.getColor(context, R.color.color_text_tertiary)
    private val colorSection = ContextCompat.getColor(context, R.color.color_bg_section)

    private var velocityTracker: VelocityTracker? = null
    private var lastX = 0f
    private var momentumRunning = false
    private var snapAnimator: android.animation.ValueAnimator? = null

    init {
        setBackgroundResource(R.drawable.bg_section_lg)
        isClickable = true
    }

    fun setInitial(value: Double, step: Double) {
        this.step = step
        this.value = value
        pos = value / step
        lastHapticIdx = pos.roundToInt()
        invalidate()
    }

    private fun commit(p: Double) {
        val clamped = max(0.0, p)
        pos = clamped
        val idx = clamped.roundToInt()
        if (idx != lastHapticIdx) {
            lastHapticIdx = idx
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O_MR1) {
                performHapticFeedback(HapticFeedbackConstants.TEXT_HANDLE_MOVE)
            } else {
                performHapticFeedback(HapticFeedbackConstants.CLOCK_TICK)
            }
        }
        val newValue = idx * step
        if (newValue != value) {
            value = newValue
            onChange?.invoke(newValue)
        }
        invalidate()
    }

    private fun stopAll() {
        momentumRunning = false
        snapAnimator?.cancel()
        snapAnimator = null
    }

    private fun snapTo(target: Double) {
        val start = pos
        snapAnimator = android.animation.ValueAnimator.ofFloat(0f, 1f).apply {
            duration = 180
            addUpdateListener {
                val t = it.animatedValue as Float
                val eased = 1 - (1 - t).toDouble().pow(3.0)
                commit(start + (target - start) * eased)
            }
            start()
        }
    }

    private fun runMomentum(initialVelocity: Double) {
        var velocity = initialVelocity
        var lastT = System.nanoTime()
        momentumRunning = true
        val frame = object : Runnable {
            override fun run() {
                if (!momentumRunning) return
                val now = System.nanoTime()
                val dt = ((now - lastT) / 1_000_000.0).coerceAtMost(48.0)
                lastT = now
                velocity *= friction.pow(dt / 16.67)
                val next = pos + velocity * dt
                if (abs(velocity) < minVelocity) {
                    momentumRunning = false
                    snapTo(max(0.0, next.roundToInt().toDouble()))
                    return
                }
                commit(next)
                postOnAnimation(this)
            }
        }
        postOnAnimation(frame)
    }

    @SuppressLint("ClickableViewAccessibility")
    override fun onTouchEvent(event: MotionEvent): Boolean {
        when (event.actionMasked) {
            MotionEvent.ACTION_DOWN -> {
                stopAll()
                parent.requestDisallowInterceptTouchEvent(true)
                velocityTracker = VelocityTracker.obtain().also { it.addMovement(event) }
                lastX = event.x
            }
            MotionEvent.ACTION_MOVE -> {
                velocityTracker?.addMovement(event)
                val dx = event.x - lastX
                lastX = event.x
                commit(pos + (-dx / tickW))
            }
            MotionEvent.ACTION_UP, MotionEvent.ACTION_CANCEL -> {
                parent.requestDisallowInterceptTouchEvent(false)
                val vt = velocityTracker
                var velocityIdxPerMs = 0.0
                if (vt != null) {
                    vt.computeCurrentVelocity(1) // px per ms
                    velocityIdxPerMs = (-vt.xVelocity / tickW).toDouble()
                    vt.recycle()
                    velocityTracker = null
                }
                if (abs(velocityIdxPerMs) > minVelocity) runMomentum(velocityIdxPerMs)
                else snapTo(pos.roundToInt().toDouble())
            }
        }
        return true
    }

    private fun formatValue(v: Double): String =
        if (v == v.toLong().toDouble()) v.toLong().toString()
        else String.format(java.util.Locale.US, "%.1f", v).removeSuffix(".0")

    override fun onDraw(canvas: Canvas) {
        super.onDraw(canvas)
        val w = width.toFloat()
        val h = height.toFloat()
        val cx = w / 2f

        // center highlight pill (56dp wide, 14dp inset top/bottom)
        rect.set(cx - tickW / 2f, dp(14f), cx + tickW / 2f, h - dp(14f))
        canvas.drawRoundRect(rect, dp(18f), dp(18f), centerPaint)

        // ticks
        val centerIdx = pos.roundToInt()
        val range = 10
        val startIdx = max(0, centerIdx - range)
        for (i in startIdx..centerIdx + range) {
            val x = cx + (i - pos).toFloat() * tickW
            if (x < -tickW || x > w + tickW) continue
            val isCenter = i == centerIdx
            val dist = abs(i - pos).toFloat()
            textPaint.typeface = if (isCenter) fontBold else fontMedium
            textPaint.textSize = dp(if (isCenter) 22f else 16f)
            textPaint.color = if (isCenter) colorPrimaryText else colorTertiary
            textPaint.alpha = (255 * max(0.25f, 1 - dist * 0.18f)).toInt()
            val baseline = h / 2f - (textPaint.ascent() + textPaint.descent()) / 2f
            canvas.drawText(formatValue(i * step), x, baseline, textPaint)
        }

        // edge fades (linear-gradient section → transparent 20% / 80%)
        val edge = colorSection
        val transparent = edge and 0x00FFFFFF
        fadePaint.shader = LinearGradient(0f, 0f, w, 0f,
            intArrayOf(edge, transparent, transparent, edge),
            floatArrayOf(0f, 0.2f, 0.8f, 1f), Shader.TileMode.CLAMP)
        canvas.drawRect(0f, 0f, w, h, fadePaint)
    }

    override fun onDetachedFromWindow() {
        super.onDetachedFromWindow()
        stopAll()
    }
}

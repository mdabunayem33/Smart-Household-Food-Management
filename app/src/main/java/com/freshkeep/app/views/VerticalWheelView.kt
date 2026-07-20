package com.freshkeep.app.views

import android.annotation.SuppressLint
import android.content.Context
import android.graphics.Canvas
import android.graphics.Paint
import android.graphics.RectF
import android.util.AttributeSet
import android.util.TypedValue
import android.view.MotionEvent
import android.view.VelocityTracker
import android.view.View
import androidx.core.content.ContextCompat
import androidx.core.content.res.ResourcesCompat
import com.freshkeep.app.R
import kotlin.math.abs
import kotlin.math.max
import kotlin.math.min
import kotlin.math.pow
import kotlin.math.roundToInt

/**
 * Vertical snap wheel (ReminderPreferences WheelPicker) — 44dp rows,
 * 5 visible, center highlight pill behind, snap-to-row, tap-to-select.
 */
class VerticalWheelView @JvmOverloads constructor(
    context: Context,
    attrs: AttributeSet? = null,
) : View(context, attrs) {

    private fun dp(v: Float): Float =
        TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, v, resources.displayMetrics)

    private val itemH = dp(44f)

    var items: List<String> = emptyList()
        set(value) {
            field = value
            pos = pos.coerceIn(0.0, (value.size - 1).coerceAtLeast(0).toDouble())
            invalidate()
        }

    var index: Int = 0
        private set

    var onChange: ((Int) -> Unit)? = null

    private var pos = 0.0
    private val pillPaint = Paint(Paint.ANTI_ALIAS_FLAG).apply {
        color = ContextCompat.getColor(context, R.color.color_primary_surface)
    }
    private val textPaint = Paint(Paint.ANTI_ALIAS_FLAG).apply { textAlign = Paint.Align.CENTER }
    private val rect = RectF()
    private val fontDisplay = ResourcesCompat.getFont(context, R.font.baloo2_bold)
    private val fontBody = ResourcesCompat.getFont(context, R.font.nunito_medium)
    private val colorActive = ContextCompat.getColor(context, R.color.color_primary_press)
    private val colorInactive = ContextCompat.getColor(context, R.color.color_text_tertiary)

    private var velocityTracker: VelocityTracker? = null
    private var lastY = 0f
    private var momentumRunning = false
    private var snapAnimator: android.animation.ValueAnimator? = null
    private var downY = 0f
    private var dragged = false

    fun setSelected(i: Int) {
        index = i.coerceIn(0, (items.size - 1).coerceAtLeast(0))
        pos = index.toDouble()
        invalidate()
    }

    private fun commit(p: Double) {
        pos = p.coerceIn(0.0, (items.size - 1).toDouble())
        val i = pos.roundToInt()
        if (i != index) {
            index = i
            onChange?.invoke(i)
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
                velocity *= 0.94.pow(dt / 16.67)
                val next = pos + velocity * dt
                if (abs(velocity) < 0.01 || next <= 0 || next >= items.size - 1) {
                    momentumRunning = false
                    snapTo(next.roundToInt().coerceIn(0, items.size - 1).toDouble())
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
                lastY = event.y
                downY = event.y
                dragged = false
            }
            MotionEvent.ACTION_MOVE -> {
                velocityTracker?.addMovement(event)
                val dy = event.y - lastY
                lastY = event.y
                if (abs(event.y - downY) > dp(6f)) dragged = true
                commit(pos + (-dy / itemH))
            }
            MotionEvent.ACTION_UP, MotionEvent.ACTION_CANCEL -> {
                parent.requestDisallowInterceptTouchEvent(false)
                val vt = velocityTracker
                var velocityIdxPerMs = 0.0
                if (vt != null) {
                    vt.computeCurrentVelocity(1)
                    velocityIdxPerMs = (-vt.yVelocity / itemH).toDouble()
                    vt.recycle()
                    velocityTracker = null
                }
                if (!dragged && event.actionMasked == MotionEvent.ACTION_UP) {
                    // tap: select the row under the finger
                    val offset = (event.y - height / 2f) / itemH
                    snapTo((pos + offset).roundToInt().coerceIn(0, items.size - 1).toDouble())
                } else if (abs(velocityIdxPerMs) > 0.01) {
                    runMomentum(velocityIdxPerMs)
                } else {
                    snapTo(pos.roundToInt().toDouble())
                }
            }
        }
        return true
    }

    override fun onMeasure(widthMeasureSpec: Int, heightMeasureSpec: Int) {
        super.onMeasure(
            widthMeasureSpec,
            MeasureSpec.makeMeasureSpec((itemH * 5).toInt(), MeasureSpec.EXACTLY),
        )
    }

    override fun onDraw(canvas: Canvas) {
        val w = width.toFloat()
        val h = height.toFloat()
        val cy = h / 2f

        rect.set(0f, cy - itemH / 2f, w, cy + itemH / 2f)
        canvas.drawRoundRect(rect, dp(18f), dp(18f), pillPaint)

        val center = pos.roundToInt()
        for (i in max(0, center - 3)..min(items.size - 1, center + 3)) {
            val y = cy + ((i - pos) * itemH).toFloat()
            if (y < -itemH || y > h + itemH) continue
            val dist = abs(i - pos).toFloat()
            val isCenter = i == center
            textPaint.typeface = if (isCenter) fontDisplay else fontBody
            textPaint.textSize = dp(if (isCenter) 18f else 15f)
            textPaint.color = if (isCenter) colorActive else colorInactive
            textPaint.alpha = (255 * max(0.3f, 1 - dist * 0.32f)).toInt()
            val baseline = y - (textPaint.ascent() + textPaint.descent()) / 2f
            canvas.drawText(items[i], w / 2f, baseline, textPaint)
        }
    }

    override fun onDetachedFromWindow() {
        super.onDetachedFromWindow()
        stopAll()
    }
}

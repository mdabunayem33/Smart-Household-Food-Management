package com.freshkeep.app.views

import android.content.Context
import android.util.AttributeSet
import android.util.TypedValue
import android.view.View
import android.view.ViewGroup

/** Minimal flex-wrap container — 10dp gaps, mirrors the web chip rows. */
class FlowLayout @JvmOverloads constructor(
    context: Context,
    attrs: AttributeSet? = null,
) : ViewGroup(context, attrs) {

    private val gap = TypedValue.applyDimension(
        TypedValue.COMPLEX_UNIT_DIP, 10f, resources.displayMetrics
    ).toInt()

    override fun onMeasure(widthMeasureSpec: Int, heightMeasureSpec: Int) {
        val maxWidth = MeasureSpec.getSize(widthMeasureSpec) - paddingLeft - paddingRight
        var x = 0
        var y = 0
        var rowHeight = 0

        for (i in 0 until childCount) {
            val child = getChildAt(i)
            if (child.visibility == GONE) continue
            child.measure(
                MeasureSpec.makeMeasureSpec(maxWidth, MeasureSpec.AT_MOST),
                MeasureSpec.makeMeasureSpec(0, MeasureSpec.UNSPECIFIED),
            )
            if (x + child.measuredWidth > maxWidth && x > 0) {
                x = 0
                y += rowHeight + gap
                rowHeight = 0
            }
            x += child.measuredWidth + gap
            rowHeight = maxOf(rowHeight, child.measuredHeight)
        }
        setMeasuredDimension(
            MeasureSpec.getSize(widthMeasureSpec),
            y + rowHeight + paddingTop + paddingBottom,
        )
    }

    override fun onLayout(changed: Boolean, l: Int, t: Int, r: Int, b: Int) {
        val maxWidth = r - l - paddingLeft - paddingRight
        var x = 0
        var y = 0
        var rowHeight = 0

        for (i in 0 until childCount) {
            val child = getChildAt(i)
            if (child.visibility == GONE) continue
            if (x + child.measuredWidth > maxWidth && x > 0) {
                x = 0
                y += rowHeight + gap
                rowHeight = 0
            }
            child.layout(
                paddingLeft + x,
                paddingTop + y,
                paddingLeft + x + child.measuredWidth,
                paddingTop + y + child.measuredHeight,
            )
            x += child.measuredWidth + gap
            rowHeight = maxOf(rowHeight, child.measuredHeight)
        }
    }
}

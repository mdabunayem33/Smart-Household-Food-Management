package com.freshkeep.app.views

import android.content.Context
import android.util.AttributeSet
import android.widget.FrameLayout

/** aspect-ratio 1/1 container (CategoryCard tiles). */
class SquareFrameLayout @JvmOverloads constructor(
    context: Context,
    attrs: AttributeSet? = null,
) : FrameLayout(context, attrs) {

    override fun onMeasure(widthMeasureSpec: Int, heightMeasureSpec: Int) {
        super.onMeasure(widthMeasureSpec, widthMeasureSpec)
    }
}

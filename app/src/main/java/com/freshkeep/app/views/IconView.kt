package com.freshkeep.app.views

import android.content.Context
import android.os.Build
import android.util.AttributeSet
import androidx.appcompat.widget.AppCompatTextView
import androidx.core.content.res.ResourcesCompat
import com.freshkeep.app.R

/**
 * Material Symbols Rounded icon rendered from the variable icon font via
 * ligature names — the exact mechanism the web app uses.
 * Default variation matches base.css: 'FILL' 1, 'wght' 500, 'GRAD' 0, 'opsz' 24.
 */
class IconView @JvmOverloads constructor(
    context: Context,
    attrs: AttributeSet? = null,
    defStyleAttr: Int = 0,
) : AppCompatTextView(context, attrs, defStyleAttr) {

    private var filled = true

    init {
        typeface = ResourcesCompat.getFont(context, R.font.material_symbols_rounded)
        includeFontPadding = false
        maxLines = 1

        context.obtainStyledAttributes(attrs, R.styleable.IconView).use { a ->
            filled = a.getBoolean(R.styleable.IconView_iconFill, true)
            a.getString(R.styleable.IconView_iconText)?.let { text = it }
        }
        applyVariation()
    }

    fun setIcon(name: String) {
        text = name
    }

    fun setFilled(fill: Boolean) {
        if (filled != fill) {
            filled = fill
            applyVariation()
        }
    }

    private fun applyVariation() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            fontVariationSettings = "'FILL' ${if (filled) 1 else 0}, 'wght' 500, 'GRAD' 0, 'opsz' 24"
        }
    }
}

private inline fun android.content.res.TypedArray.use(block: (android.content.res.TypedArray) -> Unit) {
    try { block(this) } finally { recycle() }
}

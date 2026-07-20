package com.freshkeep.app.views

import android.content.Context
import android.util.AttributeSet
import android.util.TypedValue
import android.view.Gravity
import android.widget.LinearLayout
import android.widget.TextView
import androidx.core.content.ContextCompat
import androidx.core.content.res.ResourcesCompat
import com.freshkeep.app.R

/**
 * Port of BottomNav.jsx — 72dp bar, 5 items (icon 26 + 11sp Nunito caption),
 * active = primary green with FILL 1 icon, inactive = text-tertiary FILL 0.
 */
class BottomNavView @JvmOverloads constructor(
    context: Context,
    attrs: AttributeSet? = null,
) : LinearLayout(context, attrs) {

    data class Item(val key: String, val label: String, val icon: String)

    private val items = listOf(
        Item("home", context.getString(com.freshkeep.app.R.string.nav_home), "home"),
        Item("inventory", context.getString(com.freshkeep.app.R.string.nav_inventory), "kitchen"),
        Item("shopping", context.getString(com.freshkeep.app.R.string.nav_shopping), "shopping_cart"),
        Item("analytics", context.getString(com.freshkeep.app.R.string.nav_analytics), "donut_large"),
        Item("profile", context.getString(com.freshkeep.app.R.string.nav_profile), "person"),
    )

    private val icons = mutableMapOf<String, IconView>()
    private val labels = mutableMapOf<String, TextView>()
    private var activeKey = "home"

    var onChange: ((String) -> Unit)? = null

    private fun dp(v: Float): Int =
        TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, v, resources.displayMetrics).toInt()

    init {
        orientation = HORIZONTAL
        setBackgroundResource(R.drawable.bg_bottom_nav)

        for (item in items) {
            val cell = LinearLayout(context).apply {
                orientation = VERTICAL
                gravity = Gravity.CENTER
                layoutParams = LayoutParams(0, LayoutParams.MATCH_PARENT, 1f)
                isClickable = true
                isFocusable = true
                setOnClickListener {
                    if (activeKey != item.key) onChange?.invoke(item.key)
                }
            }
            val icon = IconView(context).apply {
                setIcon(item.icon)
                setTextSize(TypedValue.COMPLEX_UNIT_DIP, 26f)
                gravity = Gravity.CENTER
            }
            val label = TextView(context).apply {
                text = item.label
                setTextSize(TypedValue.COMPLEX_UNIT_SP, 11f)
                typeface = ResourcesCompat.getFont(context, R.font.nunito_semibold)
                gravity = Gravity.CENTER
            }
            cell.addView(icon)
            cell.addView(label, LayoutParams(LayoutParams.WRAP_CONTENT, LayoutParams.WRAP_CONTENT).apply { topMargin = dp(4f) })
            addView(cell)
            icons[item.key] = icon
            labels[item.key] = label
        }
        applyColors()
    }

    fun setActive(key: String) {
        activeKey = key
        applyColors()
    }

    private fun applyColors() {
        val active = ContextCompat.getColor(context, R.color.color_primary)
        val inactive = ContextCompat.getColor(context, R.color.color_text_tertiary)
        for (item in items) {
            val isActive = item.key == activeKey
            icons[item.key]?.apply {
                setTextColor(if (isActive) active else inactive)
                setFilled(isActive)
            }
            labels[item.key]?.setTextColor(if (isActive) active else inactive)
        }
    }
}

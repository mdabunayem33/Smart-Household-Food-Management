package com.freshkeep.app.views

import androidx.core.content.ContextCompat
import com.freshkeep.app.R
import com.freshkeep.app.databinding.ItemChipBinding

/** Chip.jsx selection states — selected = solid green + white text. */
object ChipHelper {

    fun bind(chip: ItemChipBinding, label: String, selected: Boolean, icon: String? = null) {
        val ctx = chip.root.context
        chip.chipLabel.text = label
        if (icon != null) {
            chip.chipIcon.visibility = android.view.View.VISIBLE
            chip.chipIcon.setIcon(icon)
        } else {
            chip.chipIcon.visibility = android.view.View.GONE
        }
        val fg = ContextCompat.getColor(
            ctx,
            if (selected) R.color.color_text_inverse else R.color.color_primary_press,
        )
        chip.root.setBackgroundResource(
            if (selected) R.drawable.bg_pill_primary else R.drawable.bg_pill_primary_surface
        )
        chip.chipLabel.setTextColor(fg)
        chip.chipIcon.setTextColor(fg)
        Press.apply(chip.root)
    }
}

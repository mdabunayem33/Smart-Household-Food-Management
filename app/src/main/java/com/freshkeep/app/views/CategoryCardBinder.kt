package com.freshkeep.app.views

import android.graphics.drawable.GradientDrawable
import android.view.View
import androidx.core.content.ContextCompat
import com.freshkeep.app.R
import com.freshkeep.app.databinding.ItemCategoryCardBinding

/** CategoryCard.jsx tone palette + binding. */
object CategoryCardBinder {

    data class Tone(val bg: Int, val fg: Int)

    fun tone(name: String): Tone = when (name) {
        "orange" -> Tone(R.color.color_accent_orange_surface, R.color.orange_700)
        "red" -> Tone(R.color.color_accent_red_surface, R.color.red_700)
        "blue" -> Tone(R.color.color_accent_blue_surface, R.color.blue_700)
        else -> Tone(R.color.color_primary_surface, R.color.green_700)
    }

    fun bind(
        card: ItemCategoryCardBinding,
        label: String,
        icon: String?,
        illustration: String?,
        toneName: String,
        onClick: () -> Unit,
    ) {
        val ctx = card.root.context
        val t = tone(toneName)

        (card.catCardRoot.background.mutate() as GradientDrawable)
            .setColor(ContextCompat.getColor(ctx, t.bg))

        val illRes = Illustrations.res(illustration)
        if (illRes != null) {
            card.catIllustration.visibility = View.VISIBLE
            card.catIcon.visibility = View.GONE
            card.catIllustration.setImageResource(illRes)
        } else {
            card.catIllustration.visibility = View.GONE
            card.catIcon.visibility = View.VISIBLE
            card.catIcon.setIcon(icon ?: "category")
            card.catIcon.setTextColor(ContextCompat.getColor(ctx, t.fg))
        }

        card.catLabel.text = label
        card.catRemove.visibility = View.GONE
        card.catOutline.visibility = View.GONE
        Press.apply(card.root)
        card.root.setOnClickListener { onClick() }
    }
}

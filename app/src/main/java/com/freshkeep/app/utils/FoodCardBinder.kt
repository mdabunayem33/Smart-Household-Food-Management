package com.freshkeep.app.utils

import android.graphics.drawable.GradientDrawable
import android.view.View
import androidx.core.content.ContextCompat
import com.freshkeep.app.R
import com.freshkeep.app.databinding.ItemFoodCardBinding
import com.freshkeep.app.models.FoodItem
import com.freshkeep.app.views.Illustrations

/** Shared FoodCard.jsx binding — tone tile, name, EXPIRED badge, qty, bar, label. */
object FoodCardBinder {

    fun surfaceColorFor(level: String): Int = when (level) {
        "fresh" -> R.color.color_fresh_surface
        "aging" -> R.color.color_aging_surface
        "soon" -> R.color.color_soon_surface
        "expired" -> R.color.color_expired_surface
        else -> R.color.color_primary_surface
    }

    fun bind(binding: ItemFoodCardBinding, item: FoodItem, onClick: (() -> Unit)? = null) {
        val ctx = binding.root.context
        val fresh = item.freshness

        (binding.foodTile.background.mutate() as GradientDrawable)
            .setColor(ContextCompat.getColor(ctx, surfaceColorFor(fresh.level)))

        val illRes = Illustrations.res(item.illustration)
        if (illRes != null) {
            binding.foodIllustration.visibility = View.VISIBLE
            binding.foodIcon.visibility = View.GONE
            binding.foodIllustration.setImageResource(illRes)
        } else {
            binding.foodIllustration.visibility = View.GONE
            binding.foodIcon.visibility = View.VISIBLE
            binding.foodIcon.setIcon(item.icon)
        }

        binding.foodName.text = item.name
        binding.foodQty.text = item.quantity
        binding.expiredBadge.visibility = if (fresh.level == "expired") View.VISIBLE else View.GONE

        binding.freshnessBar.bind(fresh.level, fresh.daysLeft, fresh.expiredDays)
        binding.expiryLabel.text = ExpiryUtils.localizedLabel(binding.root.context, item.expiryDate)
        binding.expiryLabel.setTextColor(
            ContextCompat.getColor(ctx, if (fresh.level == "expired") R.color.red_700 else R.color.color_text_tertiary)
        )

        onClick?.let { cb -> binding.root.setOnClickListener { cb() } }
    }
}

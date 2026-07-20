package com.freshkeep.app.views

import android.view.View
import android.view.animation.AnimationUtils
import com.freshkeep.app.R
import com.freshkeep.app.databinding.ItemAccordionBinding

/** Accordion expand/collapse with rotating chevron (200ms ease-out-soft). */
object Accordion {

    fun setup(binding: ItemAccordionBinding, onToggle: ((Boolean) -> Unit)? = null) {
        binding.accHeader.setOnClickListener {
            val open = binding.accContent.visibility != View.VISIBLE
            binding.accContent.visibility = if (open) View.VISIBLE else View.GONE
            binding.accChevron.animate().rotation(if (open) 180f else 0f).setDuration(200)
                .setInterpolator(
                    AnimationUtils.loadInterpolator(binding.root.context, R.interpolator.ease_out_soft)
                )
                .start()
            onToggle?.invoke(open)
        }
    }
}

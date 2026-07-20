package com.freshkeep.app.adapters

import android.graphics.drawable.GradientDrawable
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.core.content.ContextCompat
import androidx.recyclerview.widget.RecyclerView
import com.freshkeep.app.R
import com.freshkeep.app.databinding.ItemInventoryCardBinding
import com.freshkeep.app.models.FoodItem
import com.freshkeep.app.utils.ExpiryUtils
import com.freshkeep.app.utils.FoodCardBinder
import com.freshkeep.app.views.Illustrations

/** Inventory list — InventoryItemCard with expiry progress + edit/delete. */
class InventoryAdapter(
    private val onOpen: (FoodItem) -> Unit,
    private val onEdit: (FoodItem) -> Unit,
    private val onDelete: (FoodItem) -> Unit,
) : RecyclerView.Adapter<InventoryAdapter.Holder>() {

    private val items = mutableListOf<FoodItem>()

    fun submit(list: List<FoodItem>) {
        items.clear()
        items.addAll(list)
        notifyDataSetChanged()
    }

    class Holder(val binding: ItemInventoryCardBinding) : RecyclerView.ViewHolder(binding.root)

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): Holder {
        val binding = ItemInventoryCardBinding.inflate(LayoutInflater.from(parent.context), parent, false)
        val lp = RecyclerView.LayoutParams(
            RecyclerView.LayoutParams.MATCH_PARENT, RecyclerView.LayoutParams.WRAP_CONTENT
        )
        lp.bottomMargin = (parent.resources.displayMetrics.density * 10).toInt()
        binding.root.layoutParams = lp
        return Holder(binding)
    }

    override fun getItemCount(): Int = items.size

    override fun onBindViewHolder(holder: Holder, position: Int) {
        val item = items[position]
        val b = holder.binding
        val ctx = b.root.context
        val fresh = item.freshness

        (b.invTile.background.mutate() as GradientDrawable)
            .setColor(ContextCompat.getColor(ctx, FoodCardBinder.surfaceColorFor(fresh.level)))

        val illRes = Illustrations.res(item.illustration)
        if (illRes != null) {
            b.invIllustration.visibility = View.VISIBLE
            b.invIcon.visibility = View.GONE
            b.invIllustration.setImageResource(illRes)
        } else {
            b.invIllustration.visibility = View.GONE
            b.invIcon.visibility = View.VISIBLE
            b.invIcon.setIcon(item.icon)
        }

        b.invName.text = item.name
        b.invQty.text = item.quantity

        // fkExpiryProgress — day-band fill, expired fills right-to-left
        val progress = ExpiryUtils.expiryProgress(item.expiryDate)
        b.invProgressBar.setProgress(progress.fillPct, progress.colorAttr, progress.expired)
        b.invProgressLabel.text = ExpiryUtils.localizedLabel(ctx, item.expiryDate)
        b.invProgressLabel.setTextColor(
            ContextCompat.getColor(ctx, if (progress.expired) R.color.red_700 else R.color.color_text_tertiary)
        )

        b.invCardBody.setOnClickListener { onOpen(item) }
        b.btnEdit.setOnClickListener { onEdit(item) }
        b.btnDelete.setOnClickListener { onDelete(item) }
    }
}

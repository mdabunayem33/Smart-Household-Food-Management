package com.freshkeep.app.adapters

import android.graphics.Paint
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.core.content.ContextCompat
import androidx.recyclerview.widget.RecyclerView
import com.freshkeep.app.R
import com.freshkeep.app.databinding.ItemShoppingCardBinding
import com.freshkeep.app.models.ShoppingItem
import com.freshkeep.app.views.Illustrations

/**
 * Shopping list cards (Shopping.jsx ShoppingItemCard) — purchase circle,
 * illustration/icon tile, name + qty + reason pill, edit qty, remove.
 * `purchased` switches the card to its checked-off appearance.
 */
class ShoppingAdapter(
    private val purchased: Boolean,
    private val onTogglePurchase: (ShoppingItem) -> Unit,
    private val onEditQty: (ShoppingItem) -> Unit,
    private val onRemove: (ShoppingItem) -> Unit,
) : RecyclerView.Adapter<ShoppingAdapter.Holder>() {

    private val items = mutableListOf<ShoppingItem>()

    fun submit(list: List<ShoppingItem>) {
        items.clear()
        items.addAll(list)
        notifyDataSetChanged()
    }

    class Holder(val binding: ItemShoppingCardBinding) : RecyclerView.ViewHolder(binding.root)

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): Holder {
        val binding = ItemShoppingCardBinding.inflate(LayoutInflater.from(parent.context), parent, false)
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
        val card = holder.binding
        val ctx = card.root.context

        card.root.alpha = if (purchased) 0.55f else 1f

        // purchase circle
        if (purchased) {
            card.btnPurchase.setBackgroundResource(R.drawable.circle_primary)
            card.purchaseCheck.visibility = View.VISIBLE
        } else {
            card.btnPurchase.setBackgroundResource(R.drawable.circle_radio)
            card.purchaseCheck.visibility = View.GONE
        }
        card.btnPurchase.setOnClickListener { onTogglePurchase(item) }

        val illRes = Illustrations.res(item.illustration)
        if (illRes != null) {
            card.shopIllustration.visibility = View.VISIBLE
            card.shopIcon.visibility = View.GONE
            card.shopIllustration.setImageResource(illRes)
        } else {
            card.shopIllustration.visibility = View.GONE
            card.shopIcon.visibility = View.VISIBLE
            card.shopIcon.setIcon(item.icon)
        }

        card.shopName.text = item.name
        card.shopName.setTextColor(
            ContextCompat.getColor(ctx, if (purchased) R.color.color_text_tertiary else R.color.color_text_primary)
        )
        card.shopName.paintFlags =
            if (purchased) card.shopName.paintFlags or Paint.STRIKE_THRU_TEXT_FLAG
            else card.shopName.paintFlags and Paint.STRIKE_THRU_TEXT_FLAG.inv()

        card.shopQty.text = item.quantity
        card.shopReason.visibility =
            if (item.reason.isNotEmpty() && !purchased) View.VISIBLE else View.GONE
        card.shopReason.text = item.reason

        card.btnEditQty.setOnClickListener { onEditQty(item) }
        card.btnRemove.setOnClickListener { onRemove(item) }
    }
}

package com.freshkeep.app.adapters

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.view.animation.AnimationUtils
import androidx.recyclerview.widget.RecyclerView
import com.freshkeep.app.R
import com.freshkeep.app.databinding.ItemAddTileBinding
import com.freshkeep.app.databinding.ItemCategoryCardBinding
import com.freshkeep.app.views.CategoryCardBinder
import com.freshkeep.app.views.Press

/**
 * AddFood grids — CategoryCards with remove/edit badges (RemovableCard) plus
 * the dashed "Custom Category" / "Add Custom Product" tile.
 */
class AddFoodGridAdapter(
    private val onSelect: (Entry) -> Unit,
    private val onRemove: (Entry) -> Unit,
    private val onEdit: (Entry) -> Unit,
    private val onAdd: () -> Unit,
) : RecyclerView.Adapter<RecyclerView.ViewHolder>() {

    data class Entry(
        val key: String,
        val label: String,
        val icon: String?,
        val illustration: String?,
        val tone: String,
        val editable: Boolean = false,
        val popIn: Boolean = false,
        val payload: Any? = null,
    )

    private val entries = mutableListOf<Entry>()
    var addTileLabel: String = "Custom Category"

    fun submit(list: List<Entry>) {
        entries.clear()
        entries.addAll(list)
        notifyDataSetChanged()
    }

    override fun getItemCount(): Int = entries.size + 1

    override fun getItemViewType(position: Int): Int =
        if (position == entries.size) 1 else 0

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): RecyclerView.ViewHolder {
        val inflater = LayoutInflater.from(parent.context)
        val margin = (parent.resources.displayMetrics.density * 7).toInt()
        return if (viewType == 1) {
            val binding = ItemAddTileBinding.inflate(inflater, parent, false)
            binding.root.layoutParams = RecyclerView.LayoutParams(
                RecyclerView.LayoutParams.MATCH_PARENT, RecyclerView.LayoutParams.WRAP_CONTENT
            ).apply { setMargins(margin, margin, margin, margin) }
            object : RecyclerView.ViewHolder(binding.root) {}
        } else {
            val binding = ItemCategoryCardBinding.inflate(inflater, parent, false)
            binding.root.layoutParams = RecyclerView.LayoutParams(
                RecyclerView.LayoutParams.MATCH_PARENT, RecyclerView.LayoutParams.WRAP_CONTENT
            ).apply { setMargins(margin, margin, margin, margin) }
            CardHolder(binding)
        }
    }

    class CardHolder(val binding: ItemCategoryCardBinding) : RecyclerView.ViewHolder(binding.root)

    override fun onBindViewHolder(holder: RecyclerView.ViewHolder, position: Int) {
        if (holder is CardHolder) {
            val entry = entries[position]
            CategoryCardBinder.bind(
                holder.binding, entry.label, entry.icon, entry.illustration, entry.tone
            ) { onSelect(entry) }
            holder.binding.catRemove.visibility = View.VISIBLE
            holder.binding.catRemove.setOnClickListener { onRemove(entry) }
            holder.binding.catEdit.visibility = if (entry.editable) View.VISIBLE else View.GONE
            holder.binding.catEdit.setOnClickListener { onEdit(entry) }
            if (entry.popIn) {
                holder.binding.root.startAnimation(
                    AnimationUtils.loadAnimation(holder.binding.root.context, R.anim.cat_pop)
                )
            }
        } else {
            val label = holder.itemView.findViewById<android.widget.TextView>(R.id.addTileLabel)
            label.text = addTileLabel
            Press.apply(holder.itemView)
            holder.itemView.setOnClickListener { onAdd() }
        }
    }
}

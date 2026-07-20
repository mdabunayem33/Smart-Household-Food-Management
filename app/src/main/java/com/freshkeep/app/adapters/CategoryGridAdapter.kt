package com.freshkeep.app.adapters

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.freshkeep.app.databinding.ItemCategoryCardBinding
import com.freshkeep.app.views.CategoryCardBinder

/** Grid of CategoryCards (categories or products). */
class CategoryGridAdapter(
    private val onClick: (Entry) -> Unit,
) : RecyclerView.Adapter<CategoryGridAdapter.Holder>() {

    data class Entry(
        val key: String,
        val label: String,
        val icon: String?,
        val illustration: String?,
        val tone: String,
        val payload: Any? = null,
    )

    private val entries = mutableListOf<Entry>()

    fun submit(list: List<Entry>) {
        entries.clear()
        entries.addAll(list)
        notifyDataSetChanged()
    }

    class Holder(val binding: ItemCategoryCardBinding) : RecyclerView.ViewHolder(binding.root)

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): Holder {
        val binding = ItemCategoryCardBinding.inflate(LayoutInflater.from(parent.context), parent, false)
        val margin = (parent.resources.displayMetrics.density * 7).toInt()
        val lp = RecyclerView.LayoutParams(
            RecyclerView.LayoutParams.MATCH_PARENT, RecyclerView.LayoutParams.WRAP_CONTENT
        )
        lp.setMargins(margin, margin, margin, margin)
        binding.root.layoutParams = lp
        return Holder(binding)
    }

    override fun getItemCount(): Int = entries.size

    override fun onBindViewHolder(holder: Holder, position: Int) {
        val entry = entries[position]
        CategoryCardBinder.bind(
            holder.binding, entry.label, entry.icon, entry.illustration, entry.tone
        ) { onClick(entry) }
    }
}

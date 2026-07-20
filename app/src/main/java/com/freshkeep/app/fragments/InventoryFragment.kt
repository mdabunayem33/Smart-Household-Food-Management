package com.freshkeep.app.fragments

import android.content.Intent
import android.os.Bundle
import android.text.Editable
import android.text.TextWatcher
import android.util.TypedValue
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.view.animation.AnimationUtils
import android.widget.LinearLayout
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.LinearLayoutManager
import com.freshkeep.app.R
import com.freshkeep.app.activities.EditProductActivity
import com.freshkeep.app.adapters.InventoryAdapter
import com.freshkeep.app.databinding.FragmentInventoryBinding
import com.freshkeep.app.databinding.ItemChipBinding
import com.freshkeep.app.db.InventoryDao
import com.freshkeep.app.models.FoodItem
import com.freshkeep.app.sheets.FoodDetailSheet
import com.freshkeep.app.views.ChipHelper
import com.freshkeep.app.views.ConfirmDialog

/** Inventory.jsx — search, category chips, item cards, delete + snackbar. */
class InventoryFragment : Fragment() {

    private var _binding: FragmentInventoryBinding? = null
    private val binding get() = _binding!!

    private lateinit var adapter: InventoryAdapter
    private var filter = "all"
    private var query = ""
    private val filters = listOf("all", "vegetables", "fruits", "milk", "frozen")
    private val chips = mutableMapOf<String, ItemChipBinding>()

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View {
        _binding = FragmentInventoryBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        adapter = InventoryAdapter(
            onOpen = { item ->
                FoodDetailSheet.newInstance(item.id) { refresh() }
                    .show(childFragmentManager, "food_detail")
            },
            onEdit = { item ->
                startActivity(
                    Intent(requireContext(), EditProductActivity::class.java)
                        .putExtra(EditProductActivity.EXTRA_ITEM_ID, item.id)
                )
                requireActivity().overridePendingTransition(R.anim.screen_fade_up, R.anim.fade_out)
            },
            onDelete = { item -> confirmDelete(item) },
        )
        binding.inventoryList.layoutManager = LinearLayoutManager(requireContext())
        binding.inventoryList.adapter = adapter

        // filter chips
        filters.forEachIndexed { i, f ->
            val chip = ItemChipBinding.inflate(layoutInflater, binding.chipContainer, false)
            if (i > 0) (chip.root.layoutParams as LinearLayout.LayoutParams).marginStart = dp(8)
            chip.root.setOnClickListener {
                filter = f
                renderChips()
                refresh()
            }
            binding.chipContainer.addView(chip.root)
            chips[f] = chip
        }
        renderChips()

        binding.searchInput.addTextChangedListener(object : TextWatcher {
            override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {}
            override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {}
            override fun afterTextChanged(s: Editable?) {
                query = s?.toString() ?: ""
                binding.btnClearSearch.visibility = if (query.isEmpty()) View.GONE else View.VISIBLE
                refresh()
            }
        })
        binding.btnClearSearch.setOnClickListener { binding.searchInput.setText("") }
    }

    override fun onResume() {
        super.onResume()
        refresh()
    }

    private fun renderChips() {
        for (f in filters) {
            val label = if (f == "all") "All" else f.replaceFirstChar { it.uppercase() }
            chips[f]?.let { ChipHelper.bind(it, label, selected = filter == f) }
        }
    }

    private fun refresh() {
        val shown = InventoryDao(requireContext()).getAll()
            .filter { filter == "all" || it.category == filter }
            .filter { it.name.lowercase().contains(query.lowercase()) }
        adapter.submit(shown)
        binding.emptyState.visibility = if (shown.isEmpty()) View.VISIBLE else View.GONE
    }

    private fun confirmDelete(item: FoodItem) {
        ConfirmDialog.show(
            requireContext(),
            title = getString(R.string.delete_product_title),
            message = getString(R.string.delete_product_message, item.name),
            confirmText = getString(R.string.action_delete),
        ) {
            InventoryDao(requireContext()).delete(item.id)
            refresh()
            showSnackbar("Product deleted successfully.")
        }
    }

    private fun showSnackbar(message: String) {
        binding.snackbarText.text = message
        binding.snackbar.visibility = View.VISIBLE
        binding.snackbar.startAnimation(AnimationUtils.loadAnimation(requireContext(), R.anim.screen_fade_up))
        binding.snackbar.postDelayed({ _binding?.snackbar?.visibility = View.GONE }, 3000)
    }

    private fun dp(v: Int): Int =
        TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, v.toFloat(), resources.displayMetrics).toInt()

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}

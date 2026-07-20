package com.freshkeep.app.fragments

import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.LinearLayoutManager
import com.freshkeep.app.R
import com.freshkeep.app.activities.AdjustQuantityActivity
import com.freshkeep.app.activities.ManualAddShoppingActivity
import com.freshkeep.app.adapters.ShoppingAdapter
import com.freshkeep.app.databinding.FragmentShoppingBinding
import com.freshkeep.app.databinding.SheetFrequencyBinding
import com.freshkeep.app.db.InventoryDao
import com.freshkeep.app.db.SettingsDao
import com.freshkeep.app.db.ShoppingDao
import com.freshkeep.app.models.ShoppingItem
import com.freshkeep.app.views.ConfirmDialog
import com.freshkeep.app.views.Press
import com.google.android.material.bottomsheet.BottomSheetDialog
import kotlin.math.roundToInt

/**
 * Shopping.jsx — auto list from inventory + manual adds, purchase check-off,
 * qty edit, remove, frequency sheet, next-shopping-date banner, cycle reset.
 */
class ShoppingFragment : Fragment() {

    private var _binding: FragmentShoppingBinding? = null
    private val binding get() = _binding!!

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View {
        _binding = FragmentShoppingBinding.inflate(inflater, container, false)
        return binding.root
    }

    private lateinit var pendingAdapter: ShoppingAdapter
    private lateinit var purchasedAdapter: ShoppingAdapter

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        binding.btnFreq.setOnClickListener { showFrequencySheet() }
        binding.btnSettings.setOnClickListener { showFrequencySheet() }
        binding.btnAddItem.setOnClickListener { openManualAdd() }
        Press.apply(binding.btnEmptyAdd)
        binding.btnEmptyAdd.setOnClickListener { openManualAdd() }

        pendingAdapter = ShoppingAdapter(
            purchased = false,
            onTogglePurchase = { togglePurchase(it) },
            onEditQty = { openEditQty(it) },
            onRemove = { confirmRemove(it) },
        )
        purchasedAdapter = ShoppingAdapter(
            purchased = true,
            onTogglePurchase = { togglePurchase(it) },
            onEditQty = { openEditQty(it) },
            onRemove = { confirmRemove(it) },
        )
        binding.pendingContainer.layoutManager = LinearLayoutManager(requireContext())
        binding.pendingContainer.adapter = pendingAdapter
        binding.purchasedContainer.layoutManager = LinearLayoutManager(requireContext())
        binding.purchasedContainer.adapter = purchasedAdapter
    }

    override fun onResume() {
        super.onResume()
        render()
    }

    private fun openManualAdd() {
        startActivity(Intent(requireContext(), ManualAddShoppingActivity::class.java))
        requireActivity().overridePendingTransition(R.anim.screen_fade_up, R.anim.fade_out)
    }

    private fun render() {
        val ctx = requireContext()
        val settings = SettingsDao(ctx)
        val dao = ShoppingDao(ctx)
        val inventory = InventoryDao(ctx).getAll()
        val frequency = settings.shopFrequency

        binding.freqLabel.text = ShoppingDao.freqLabel(ctx, frequency)
        binding.nextDate.text = com.freshkeep.app.utils.ExpiryUtils.formatFullDate(dao.nextDate(frequency))
        binding.nextFreqCaption.text =
            getString(R.string.shopping_schedule, ShoppingDao.freqLabel(ctx, frequency))
        binding.footerNote.text =
            getString(R.string.shopping_footer, ShoppingDao.freqLabel(ctx, frequency).lowercase())

        val allItems = dao.allItems(inventory, frequency)
        val purchasedKeys = dao.purchasedKeys()
        val pending = allItems.filter { it.key !in purchasedKeys }
        val purchased = allItems.filter { it.key in purchasedKeys }
        val total = allItems.size

        binding.emptyState.visibility = if (total == 0) View.VISIBLE else View.GONE
        binding.listContent.visibility = if (total == 0) View.GONE else View.VISIBLE
        if (total == 0) return

        // progress
        val pct = if (total > 0) (purchased.size.toFloat() / total) * 100f else 0f
        binding.progressCount.text =
            getString(R.string.shopping_purchased_count, purchased.size, total)
        binding.progressPct.text = "${pct.roundToInt()}%"
        binding.progressBar.setProgress(pct, "fresh", expired = false)

        // lists
        pendingAdapter.submit(pending)
        binding.allPurchased.visibility = if (pending.isEmpty()) View.VISIBLE else View.GONE

        purchasedAdapter.submit(purchased)
        binding.purchasedHeader.visibility = if (purchased.isEmpty()) View.GONE else View.VISIBLE
        binding.purchasedContainer.visibility = if (purchased.isEmpty()) View.GONE else View.VISIBLE

        // Cycle completion — all purchased ⇒ record date + reset after 900ms
        if (total > 0 && purchased.size == total) {
            binding.root.postDelayed({
                if (_binding == null) return@postDelayed
                dao.completeCycle()
                render()
            }, 900)
        }
    }

    /** Check off / un-check an item, then re-render (progress + section move). */
    private fun togglePurchase(item: ShoppingItem) {
        ShoppingDao(requireContext()).togglePurchased(item.key)
        render()
    }

    private fun openEditQty(item: ShoppingItem) {
        startActivity(
            Intent(requireContext(), AdjustQuantityActivity::class.java)
                .putExtra(AdjustQuantityActivity.EXTRA_MODE, AdjustQuantityActivity.MODE_SHOPPING)
                .putExtra(AdjustQuantityActivity.EXTRA_SHOPPING_KEY, item.key)
                .putExtra(AdjustQuantityActivity.EXTRA_NAME, item.name)
                .putExtra(AdjustQuantityActivity.EXTRA_QTY, item.quantity)
                .putExtra(AdjustQuantityActivity.EXTRA_ICON, item.icon)
                .putExtra(AdjustQuantityActivity.EXTRA_ILLUSTRATION, item.illustration)
        )
        requireActivity().overridePendingTransition(R.anim.screen_fade_up, R.anim.fade_out)
    }

    private fun confirmRemove(item: ShoppingItem) {
        ConfirmDialog.show(
            requireContext(),
            title = "Remove item?",
            message = "Are you sure you want to remove ${item.name} from your shopping list?",
            confirmText = "Remove",
        ) {
            ShoppingDao(requireContext()).removeItem(item.key)
            render()
        }
    }

    private fun showFrequencySheet() {
        val ctx = requireContext()
        val settings = SettingsDao(ctx)
        val sheet = BottomSheetDialog(ctx, R.style.Theme_FreshKeep_BottomSheetDialog)
        val sb = SheetFrequencyBinding.inflate(layoutInflater)

        val options = listOf(
            sb.freqWeekly to "weekly",
            sb.freqBiweekly to "biweekly",
            sb.freqMonthly to "monthly",
        )
        for ((row, key) in options) {
            row.setBackgroundResource(
                if (settings.shopFrequency == key) R.drawable.bg_option_card_selected
                else R.drawable.bg_option_card
            )
            row.setOnClickListener {
                settings.shopFrequency = key
                sheet.dismiss()
                render()
            }
        }
        sheet.setContentView(sb.root)
        sheet.show()
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}

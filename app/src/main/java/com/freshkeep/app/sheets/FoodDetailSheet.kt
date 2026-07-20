package com.freshkeep.app.sheets

import android.content.DialogInterface
import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.freshkeep.app.R
import com.freshkeep.app.activities.AdjustQuantityActivity
import com.freshkeep.app.databinding.SheetFoodDetailBinding
import com.freshkeep.app.db.InventoryDao
import com.freshkeep.app.utils.ExpiryUtils
import com.freshkeep.app.views.ConfirmDialog
import com.freshkeep.app.views.Illustrations
import com.freshkeep.app.views.Press
import com.google.android.material.bottomsheet.BottomSheetDialogFragment

/**
 * FoodDetail.jsx — bottom sheet with Mark as consumed / Adjust quantity /
 * Discard (with confirm dialog).
 */
class FoodDetailSheet : BottomSheetDialogFragment() {

    companion object {
        private const val ARG_ID = "item_id"

        fun newInstance(itemId: Long, onChanged: (() -> Unit)? = null): FoodDetailSheet {
            return FoodDetailSheet().apply {
                arguments = Bundle().apply { putLong(ARG_ID, itemId) }
                this.onChanged = onChanged
            }
        }
    }

    private var _binding: SheetFoodDetailBinding? = null
    private val binding get() = _binding!!
    var onChanged: (() -> Unit)? = null

    override fun getTheme(): Int = R.style.Theme_FreshKeep_BottomSheetDialog

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View {
        _binding = SheetFoodDetailBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onStart() {
        super.onStart()
        // Open fully expanded — at the default peek height the third action
        // button sits below the fold and the user has to drag to reach it.
        val sheet = (dialog as? com.google.android.material.bottomsheet.BottomSheetDialog)
            ?.findViewById<View>(com.google.android.material.R.id.design_bottom_sheet)
        sheet?.let {
            val behavior = com.google.android.material.bottomsheet.BottomSheetBehavior.from(it)
            behavior.state = com.google.android.material.bottomsheet.BottomSheetBehavior.STATE_EXPANDED
            behavior.skipCollapsed = true
        }
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        val itemId = requireArguments().getLong(ARG_ID)
        val dao = InventoryDao(requireContext())
        val item = dao.getById(itemId) ?: run { dismiss(); return }
        val fresh = item.freshness

        val illRes = Illustrations.res(item.illustration)
        if (illRes != null) {
            binding.detailIllustration.visibility = View.VISIBLE
            binding.detailIcon.visibility = View.GONE
            binding.detailIllustration.setImageResource(illRes)
        } else {
            binding.detailIllustration.visibility = View.GONE
            binding.detailIcon.visibility = View.VISIBLE
            binding.detailIcon.setIcon(item.icon)
        }

        binding.detailName.text = item.name
        binding.detailQty.text = item.quantity
        binding.detailBar.bind(fresh.level, fresh.daysLeft, fresh.expiredDays)
        binding.detailExpiryLabel.text = ExpiryUtils.localizedLabel(requireContext(), item.expiryDate)
        binding.detailExpiryLabel.setTextColor(
            androidx.core.content.ContextCompat.getColor(
                requireContext(),
                if (fresh.level == "expired") R.color.red_700 else R.color.color_text_tertiary,
            )
        )

        binding.btnClose.setOnClickListener { dismiss() }
        // press: 100% → 97% → 100% over 120ms (ripple is the MaterialButton's own)
        listOf(binding.btnConsume, binding.btnAdjust, binding.btnDiscard)
            .forEach { Press.apply(it, 0.97f) }

        binding.btnConsume.setOnClickListener {
            ConfirmDialog.show(
                requireContext(),
                title = getString(R.string.consume_title),
                message = getString(R.string.consume_message),
                confirmText = getString(R.string.action_confirm),
            ) {
                dao.consume(itemId)
                dismiss()
            }
        }
        binding.btnAdjust.setOnClickListener {
            startActivity(
                Intent(requireContext(), AdjustQuantityActivity::class.java)
                    .putExtra(AdjustQuantityActivity.EXTRA_MODE, AdjustQuantityActivity.MODE_INVENTORY)
                    .putExtra(AdjustQuantityActivity.EXTRA_ITEM_ID, itemId)
            )
            requireActivity().overridePendingTransition(R.anim.screen_fade_up, R.anim.fade_out)
            dismiss()
        }
        binding.btnDiscard.setOnClickListener {
            // Still-edible food gets an extra warning line (waste awareness)
            val message = if (fresh.level == "expired") {
                getString(R.string.discard_message)
            } else {
                getString(R.string.discard_message_edible, item.name)
            }
            ConfirmDialog.show(
                requireContext(),
                title = getString(R.string.discard_title),
                message = message,
                confirmText = getString(R.string.action_discard),
            ) {
                dao.discard(itemId)
                dismiss()
            }
        }
    }

    override fun onDismiss(dialog: DialogInterface) {
        super.onDismiss(dialog)
        onChanged?.invoke()
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}

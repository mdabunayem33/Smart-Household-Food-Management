package com.freshkeep.app.activities

import android.os.Bundle
import android.view.View
import android.widget.LinearLayout
import androidx.appcompat.app.AppCompatActivity
import com.freshkeep.app.R
import com.freshkeep.app.databinding.ActivityAdjustQuantityBinding
import com.freshkeep.app.databinding.ItemChipBinding
import com.freshkeep.app.db.InventoryDao
import com.freshkeep.app.db.ShoppingDao
import com.freshkeep.app.utils.QuantityFormat
import com.freshkeep.app.views.ChipHelper
import com.freshkeep.app.views.Illustrations
import com.freshkeep.app.views.Press

/**
 * AdjustQuantity.jsx — infinite wheel + unit chips.
 * Modes: inventory item edit · shopping qty override · manual shopping add.
 */
class AdjustQuantityActivity : AppCompatActivity() {

    companion object {
        const val EXTRA_MODE = "mode"
        const val MODE_INVENTORY = "inventory"
        const val MODE_SHOPPING = "shopping"
        const val MODE_MANUAL_ADD = "manual_add"

        const val EXTRA_ITEM_ID = "item_id"
        const val EXTRA_SHOPPING_KEY = "shopping_key"
        const val EXTRA_NAME = "name"
        const val EXTRA_QTY = "qty"
        const val EXTRA_ICON = "icon"
        const val EXTRA_ILLUSTRATION = "illustration"
        const val EXTRA_CATEGORY = "category"
    }

    private lateinit var binding: ActivityAdjustQuantityBinding
    private var unit = "Piece"
    private var qty = 1.0
    private val chips = mutableMapOf<String, ItemChipBinding>()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityAdjustQuantityBinding.inflate(layoutInflater)
        setContentView(binding.root)

        val mode = intent.getStringExtra(EXTRA_MODE) ?: MODE_INVENTORY
        binding.topBar.topBarTitle.text = getString(R.string.add_quantity_title)
        binding.topBar.btnBack.setOnClickListener { finish() }
        binding.btnCancel.setOnClickListener { finish() }
        Press.apply(binding.btnSave)

        // resolve item display data per mode
        val name: String
        val currentQty: String
        val icon: String
        val illustration: String?

        if (mode == MODE_INVENTORY) {
            val item = InventoryDao(this).getById(intent.getLongExtra(EXTRA_ITEM_ID, -1)) ?: run { finish(); return }
            name = item.name; currentQty = item.quantity; icon = item.icon; illustration = item.illustration
        } else {
            name = intent.getStringExtra(EXTRA_NAME) ?: ""
            currentQty = intent.getStringExtra(EXTRA_QTY) ?: "1 Piece"
            icon = intent.getStringExtra(EXTRA_ICON) ?: "category"
            illustration = intent.getStringExtra(EXTRA_ILLUSTRATION)
        }

        val illRes = Illustrations.res(illustration)
        if (illRes != null) {
            binding.aqIllustration.visibility = View.VISIBLE
            binding.aqIcon.visibility = View.GONE
            binding.aqIllustration.setImageResource(illRes)
        } else {
            binding.aqIllustration.visibility = View.GONE
            binding.aqIcon.visibility = View.VISIBLE
            binding.aqIcon.setIcon(icon)
        }
        binding.aqName.text = name
        binding.aqCurrent.text = getString(R.string.add_current_quantity, currentQty)

        val parsed = QuantityFormat.parse(currentQty)
        qty = parsed.num
        unit = parsed.unit

        // unit chips
        for (u in QuantityFormat.UNITS) {
            val chip = ItemChipBinding.inflate(layoutInflater, binding.aqUnitChips, false)
            chip.root.setOnClickListener {
                unit = u
                binding.aqWheel.setInitial(qty, QuantityFormat.stepFor(unit))
                renderChips()
                renderValue()
            }
            binding.aqUnitChips.addView(chip.root)
            chips[u] = chip
        }
        renderChips()

        binding.aqWheel.setInitial(qty, QuantityFormat.stepFor(unit))
        binding.aqWheel.onChange = { v ->
            qty = v
            renderValue()
        }
        renderValue()

        binding.btnSave.setOnClickListener {
            val quantity = "${QuantityFormat.format(qty)} $unit"
            when (mode) {
                MODE_INVENTORY -> {
                    val itemId = intent.getLongExtra(EXTRA_ITEM_ID, -1)
                    if (qty <= 0.0) {
                        // Nothing left — offer to close the item out as consumed
                        com.freshkeep.app.views.ConfirmDialog.show(
                            this,
                            title = getString(R.string.qty_zero_title),
                            message = getString(R.string.qty_zero_message),
                            confirmText = getString(R.string.detail_mark_consumed),
                        ) {
                            InventoryDao(this).consume(itemId)
                            finish()
                        }
                        return@setOnClickListener
                    }
                    InventoryDao(this).updateQuantity(itemId, quantity)
                }
                MODE_SHOPPING ->
                    ShoppingDao(this).saveQtyOverride(intent.getStringExtra(EXTRA_SHOPPING_KEY) ?: "", quantity)
                MODE_MANUAL_ADD ->
                    ShoppingDao(this).addManual(
                        name = intent.getStringExtra(EXTRA_NAME) ?: "",
                        category = intent.getStringExtra(EXTRA_CATEGORY) ?: "others",
                        quantity = quantity,
                        inventory = InventoryDao(this).getAll(),
                    )
            }
            finish()
        }
    }

    private fun renderChips() {
        for (u in QuantityFormat.UNITS) {
            chips[u]?.let { ChipHelper.bind(it, u, selected = unit == u) }
        }
    }

    private fun renderValue() {
        binding.aqValue.text = "${QuantityFormat.format(qty)} $unit"
    }
}

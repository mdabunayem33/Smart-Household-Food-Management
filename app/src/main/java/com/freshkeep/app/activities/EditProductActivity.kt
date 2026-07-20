package com.freshkeep.app.activities

import android.os.Bundle
import android.util.TypedValue
import android.view.View
import android.widget.LinearLayout
import androidx.appcompat.app.AppCompatActivity
import com.freshkeep.app.R
import com.freshkeep.app.databinding.ActivityEditProductBinding
import com.freshkeep.app.databinding.ItemChipBinding
import com.freshkeep.app.db.FreshKeepDbHelper
import com.freshkeep.app.db.InventoryDao
import com.freshkeep.app.utils.ExpiryUtils
import com.freshkeep.app.utils.QuantityFormat
import com.freshkeep.app.views.ChipHelper
import com.freshkeep.app.views.Illustrations
import com.freshkeep.app.views.Press
import java.util.Calendar
import kotlin.math.ceil
import kotlin.math.max

/** EditProduct.jsx — edit name / category / quantity / expiry duration. */
class EditProductActivity : AppCompatActivity() {

    companion object {
        const val EXTRA_ITEM_ID = "item_id"
    }

    private lateinit var binding: ActivityEditProductBinding
    private var category = "others"
    private var unit = "Piece"
    private var qty = 1.0
    private var durationDays = 15.0
    private val categoryChips = mutableMapOf<String, ItemChipBinding>()
    private val unitChips = mutableMapOf<String, ItemChipBinding>()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityEditProductBinding.inflate(layoutInflater)
        setContentView(binding.root)

        val itemId = intent.getLongExtra(EXTRA_ITEM_ID, -1)
        val dao = InventoryDao(this)
        val item = dao.getById(itemId) ?: run { finish(); return }

        binding.topBar.topBarTitle.text = getString(R.string.title_edit_product)
        binding.topBar.btnBack.setOnClickListener { finish() }
        binding.btnCancel.setOnClickListener { finish() }
        Press.apply(binding.btnSave)

        val illRes = Illustrations.res(item.illustration)
        if (illRes != null) {
            binding.epIllustration.visibility = View.VISIBLE
            binding.epIcon.visibility = View.GONE
            binding.epIllustration.setImageResource(illRes)
        } else {
            binding.epIllustration.visibility = View.GONE
            binding.epIcon.visibility = View.VISIBLE
            binding.epIcon.setIcon(item.icon)
        }
        binding.epName.setText(item.name)

        // category chips (EP_CATEGORIES — built-in 11 with icons)
        category = item.category
        FreshKeepDbHelper.BUILTIN_CATEGORIES.forEachIndexed { i, c ->
            val chip = ItemChipBinding.inflate(layoutInflater, binding.epCategoryChips, false)
            if (i > 0) (chip.root.layoutParams as LinearLayout.LayoutParams).marginStart = dp(10)
            chip.root.setOnClickListener {
                category = c[0]
                renderCategoryChips()
            }
            binding.epCategoryChips.addView(chip.root)
            categoryChips[c[0]] = chip
        }
        renderCategoryChips()

        // quantity
        val parsed = QuantityFormat.parse(item.quantity)
        qty = parsed.num
        unit = parsed.unit
        for (u in QuantityFormat.UNITS) {
            val chip = ItemChipBinding.inflate(layoutInflater, binding.epUnitChips, false)
            chip.root.setOnClickListener {
                unit = u
                binding.epQtyWheel.setInitial(qty, QuantityFormat.stepFor(unit))
                renderUnitChips()
                renderQty()
            }
            binding.epUnitChips.addView(chip.root)
            unitChips[u] = chip
        }
        renderUnitChips()
        binding.epQtyWheel.setInitial(qty, QuantityFormat.stepFor(unit))
        binding.epQtyWheel.onChange = { v -> qty = v; renderQty() }
        renderQty()

        // expiry duration — initialDays = ceil((expiry - now) / day), min 0
        val diff = ExpiryUtils.parseIso(item.expiryDate).time - System.currentTimeMillis()
        durationDays = max(0.0, ceil(diff.toDouble() / 86_400_000.0))
        binding.epDaysWheel.setInitial(durationDays, 1.0)
        binding.epDaysWheel.onChange = { v -> durationDays = v; renderDays() }
        renderDays()

        binding.btnSave.setOnClickListener {
            val cal = Calendar.getInstance()
            cal.add(Calendar.DAY_OF_YEAR, durationDays.toInt())
            val newName = binding.epName.text.toString().trim().ifEmpty { item.name }
            val cat = FreshKeepDbHelper.BUILTIN_CATEGORIES.firstOrNull { it[0] == category }
            dao.update(
                item.copy(
                    name = newName,
                    category = category,
                    icon = cat?.get(2) ?: item.icon,
                    quantity = "${QuantityFormat.format(qty)} $unit",
                    expiryDate = ExpiryUtils.isoDaysFromNow(durationDays.toInt()),
                )
            )
            finish()
        }
    }

    private fun renderCategoryChips() {
        for (c in FreshKeepDbHelper.BUILTIN_CATEGORIES) {
            categoryChips[c[0]]?.let { ChipHelper.bind(it, c[1], selected = category == c[0], icon = c[2]) }
        }
    }

    private fun renderUnitChips() {
        for (u in QuantityFormat.UNITS) {
            unitChips[u]?.let { ChipHelper.bind(it, u, selected = unit == u) }
        }
    }

    private fun renderQty() {
        binding.epQtyValue.text = "${QuantityFormat.format(qty)} $unit"
    }

    private fun renderDays() {
        val d = durationDays.toInt()
        binding.epDaysValue.text = resources.getQuantityString(R.plurals.days, d, d)
        val cal = Calendar.getInstance()
        cal.add(Calendar.DAY_OF_YEAR, d)
        binding.epExpiryDate.text = ExpiryUtils.formatLongDate(cal.time)
    }

    private fun dp(v: Int): Int =
        TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, v.toFloat(), resources.displayMetrics).toInt()
}

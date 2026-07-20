package com.freshkeep.app.activities

import android.os.Bundle
import android.text.Editable
import android.text.TextWatcher
import android.util.TypedValue
import android.view.Gravity
import android.view.View
import android.widget.FrameLayout
import android.widget.LinearLayout
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat
import androidx.core.content.res.ResourcesCompat
import androidx.recyclerview.widget.GridLayoutManager
import com.freshkeep.app.R
import com.freshkeep.app.adapters.AddFoodGridAdapter
import com.freshkeep.app.databinding.ActivityAddFoodBinding
import com.freshkeep.app.databinding.ItemChipBinding
import com.freshkeep.app.databinding.SheetCustomCategoryBinding
import com.freshkeep.app.databinding.SheetCustomProductBinding
import com.freshkeep.app.databinding.SheetDateWheelBinding
import com.freshkeep.app.db.CatalogDao
import com.freshkeep.app.db.FreshKeepDbHelper
import com.freshkeep.app.db.InventoryDao
import com.freshkeep.app.models.Category
import com.freshkeep.app.models.FoodItem
import com.freshkeep.app.models.Product
import com.freshkeep.app.utils.ExpiryUtils
import com.freshkeep.app.utils.ProductIllustrations
import com.freshkeep.app.utils.QuantityFormat
import com.freshkeep.app.views.ChipHelper
import com.freshkeep.app.views.ConfirmDialog
import com.freshkeep.app.views.IconView
import com.freshkeep.app.views.Press
import com.google.android.material.bottomsheet.BottomSheetDialog
import java.util.Calendar
import java.util.Date

/**
 * AddFood.jsx — 5-step wizard:
 * 1 category grid (+custom categories) → 2 product grid / manual name
 * → 3 quantity wheel + units → 4 expiry duration or exact date → 5 celebration.
 */
class AddFoodActivity : AppCompatActivity() {

    private lateinit var binding: ActivityAddFoodBinding
    private lateinit var catalog: CatalogDao

    private var step = 1
    private var category: Category? = null
    private var product: String? = null
    private var qty = 1.0
    private var unit = "Kg"
    private var durationType = "days"
    private var daysVal = 15
    private var monthsVal = 6
    private var yearsVal = 4
    private var expiryMode = "duration" // duration | date
    private var selectedDate: Date? = null
    private var justAddedCategoryKey: String? = null
    private var justAddedProductName: String? = null

    private val customIconChoices = listOf(
        "category", "star", "bakery_dining", "icecream", "liquor",
        "egg", "grass", "ramen_dining", "cake", "coffee",
    )
    private val customColorChoices = listOf(
        "green" to R.color.green_500, "orange" to R.color.orange_500,
        "red" to R.color.red_500, "blue" to R.color.blue_500,
    )

    private lateinit var step1Adapter: AddFoodGridAdapter
    private lateinit var step2Adapter: AddFoodGridAdapter
    private val unitChips = mutableMapOf<String, ItemChipBinding>()
    private val durationChips = mutableMapOf<String, ItemChipBinding>()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityAddFoodBinding.inflate(layoutInflater)
        setContentView(binding.root)
        catalog = CatalogDao(this)

        binding.btnBack.setOnClickListener { if (step == 1) finish() else goToStep(step - 1) }
        binding.btnSkip.setOnClickListener {
            category = null
            product = null
            goToStep(2)
        }

        setupStep1()
        setupStep2()
        setupStep3()
        setupStep4()

        Press.apply(binding.btnContinue)
        binding.btnContinue.setOnClickListener {
            if (step == 4) saveAndCelebrate() else goToStep(step + 1)
        }

        goToStep(1)
    }

    // ---------------- step switching ----------------

    private fun goToStep(n: Int) {
        step = n
        val titles = mapOf(1 to "Choose a category", 2 to "Choose a product", 3 to "How much?", 4 to "Expiry date")
        binding.wizardTitle.text = titles[n]
        binding.btnSkip.visibility = if (n == 1) View.VISIBLE else View.GONE

        listOf(binding.seg1, binding.seg2, binding.seg3, binding.seg4).forEachIndexed { i, seg ->
            seg.setBackgroundResource(if (i < n) R.drawable.dot_active else R.drawable.dot_inactive)
        }

        binding.step1Grid.visibility = if (n == 1) View.VISIBLE else View.GONE
        val cat = category
        binding.step2Preset.visibility = if (n == 2 && cat != null && !cat.isCustom) View.VISIBLE else View.GONE
        binding.step2Manual.visibility = if (n == 2 && (cat == null || cat.isCustom)) View.VISIBLE else View.GONE
        binding.step3.visibility = if (n == 3) View.VISIBLE else View.GONE
        binding.step4.visibility = if (n == 4) View.VISIBLE else View.GONE
        binding.bottomBar.visibility = if (n == 3 || n == 4) View.VISIBLE else View.GONE
        binding.btnContinue.text = if (n == 4) "Save" else "Continue"

        when (n) {
            1 -> renderStep1()
            2 -> renderStep2()
            3 -> renderStep3()
            4 -> renderStep4()
        }
    }

    // ---------------- step 1: category ----------------

    private fun setupStep1() {
        step1Adapter = AddFoodGridAdapter(
            onSelect = { entry ->
                category = entry.payload as Category
                product = null
                goToStep(2)
            },
            onRemove = { entry ->
                ConfirmDialog.show(this, "Remove Category?", "Are you sure you want to remove this category?", "Remove") {
                    val c = entry.payload as Category
                    catalog.removeCategory(c.key, c.isCustom)
                    renderStep1()
                }
            },
            onEdit = { entry -> showCategorySheet(entry.payload as Category) },
            onAdd = { showCategorySheet(null) },
        )
        step1Adapter.addTileLabel = "Custom Category"
        binding.step1Grid.layoutManager = GridLayoutManager(this, 3)
        binding.step1Grid.adapter = step1Adapter
    }

    private fun renderStep1() {
        step1Adapter.submit(
            catalog.getCategories().map { c ->
                AddFoodGridAdapter.Entry(
                    key = c.key, label = c.label, icon = c.icon,
                    illustration = if (c.isCustom) null else FreshKeepDbHelper.CATEGORY_ILLUSTRATION[c.key],
                    tone = c.tone, editable = c.isCustom,
                    popIn = c.key == justAddedCategoryKey,
                    payload = c,
                )
            }
        )
        justAddedCategoryKey = null
    }

    // ---------------- step 2: product ----------------

    private fun setupStep2() {
        step2Adapter = AddFoodGridAdapter(
            onSelect = { entry ->
                val p = entry.payload as Product
                selectProduct(p.name, p.defaultExpiryDays, if (p.isCustom) p.defaultUnit else null)
            },
            onRemove = { entry ->
                ConfirmDialog.show(this, "Remove Product?", "Are you sure you want to remove this product?", "Remove") {
                    val p = entry.payload as Product
                    catalog.removeProduct(p.categoryKey, p.name, p.isCustom)
                    renderStep2()
                }
            },
            onEdit = { entry -> showProductSheet(entry.payload as Product) },
            onAdd = { showProductSheet(null) },
        )
        step2Adapter.addTileLabel = "Add Custom Product"
        binding.step2Grid.layoutManager = object : GridLayoutManager(this, 2) {
            override fun canScrollVertically(): Boolean = false
        }
        binding.step2Grid.adapter = step2Adapter

        binding.manualNameInline.addTextChangedListener(watcher {
            val ok = binding.manualNameInline.text.toString().isNotBlank()
            binding.btnUseManual.isEnabled = ok
            binding.btnUseManual.alpha = if (ok) 1f else 0.45f
        })
        Press.apply(binding.btnUseManual)
        binding.btnUseManual.setOnClickListener {
            selectProduct(binding.manualNameInline.text.toString().trim(), 14, null)
        }

        binding.manualNameField.addTextChangedListener(watcher {
            val ok = binding.manualNameField.text.toString().isNotBlank()
            binding.btnManualContinue.isEnabled = ok
            binding.btnManualContinue.alpha = if (ok) 1f else 0.45f
        })
        Press.apply(binding.btnManualContinue)
        binding.btnManualContinue.setOnClickListener {
            val days = if (category?.isCustom == true) 7 else 14
            selectProduct(binding.manualNameField.text.toString().trim(), days, null)
        }
        binding.btnChooseCategoryInstead.setOnClickListener { goToStep(1) }
    }

    private fun renderStep2() {
        val cat = category
        if (cat != null && !cat.isCustom) {
            step2Adapter.submit(
                catalog.getProducts(cat.key).map { p ->
                    AddFoodGridAdapter.Entry(
                        key = p.name, label = p.name, icon = cat.icon,
                        illustration = ProductIllustrations.forProduct(p.name, cat.key),
                        tone = cat.tone, editable = p.isCustom,
                        popIn = p.name == justAddedProductName,
                        payload = p,
                    )
                }
            )
            justAddedProductName = null
            binding.manualNameInline.setText("")
        } else {
            // manual variants
            if (cat == null) {
                binding.manualHint.text = getString(R.string.add_manual_hint)
                binding.manualFieldLabel.text = getString(R.string.add_food_name)
                binding.manualNameField.hint = "e.g. Tomato, Milk, Hilsa…"
                binding.manualFieldIcon.setIcon("restaurant")
                binding.btnChooseCategoryInstead.visibility = View.VISIBLE
            } else {
                binding.manualHint.text = getString(R.string.add_manual_hint_category, cat.label)
                binding.manualFieldLabel.text = getString(R.string.add_item_name)
                binding.manualNameField.hint = "e.g. Homemade pickle"
                binding.manualFieldIcon.setIcon(cat.icon)
                binding.btnChooseCategoryInstead.visibility = View.GONE
            }
            binding.manualNameField.setText("")
        }
    }

    /** selectProduct(name, defDays, forcedUnit) — resets step 3/4 state. */
    private fun selectProduct(name: String, defDays: Int, forcedUnit: String?) {
        if (category == null) {
            category = catalog.detectCategory(name)
        }
        val resolvedUnit = forcedUnit ?: FreshKeepDbHelper.defaultUnitFor(name)
        product = name
        durationType = "days"
        daysVal = 15
        monthsVal = 6
        yearsVal = 4
        unit = resolvedUnit
        qty = QuantityFormat.UNIT_DEFAULT_QTY[resolvedUnit] ?: 1.0
        expiryMode = "duration"
        selectedDate = null
        goToStep(3)
    }

    // ---------------- step 3: quantity ----------------

    private fun setupStep3() {
        for (u in QuantityFormat.UNITS) {
            val chip = ItemChipBinding.inflate(layoutInflater, binding.unitChips, false)
            chip.root.setOnClickListener {
                unit = u
                binding.qtyWheel.setInitial(qty, QuantityFormat.stepFor(unit))
                renderUnitChips()
                renderQtyValue()
            }
            binding.unitChips.addView(chip.root)
            unitChips[u] = chip
        }
        binding.qtyWheel.onChange = { v ->
            qty = v
            renderQtyValue()
        }
        binding.btnChangeCategory.setOnClickListener { goToStep(1) }
    }

    private fun renderStep3() {
        val cat = category
        if (cat != null) {
            binding.categoryCaption.visibility = View.VISIBLE
            binding.btnChangeCategory.visibility = View.VISIBLE
            binding.categoryCaption.text = getString(R.string.add_category_caption, cat.label)
        } else {
            binding.categoryCaption.visibility = View.GONE
            binding.btnChangeCategory.visibility = View.GONE
        }
        binding.qtyWheel.setInitial(qty, QuantityFormat.stepFor(unit))
        renderUnitChips()
        renderQtyValue()
    }

    private fun renderUnitChips() {
        for (u in QuantityFormat.UNITS) {
            unitChips[u]?.let { ChipHelper.bind(it, u, selected = unit == u) }
        }
    }

    private fun renderQtyValue() {
        binding.qtyValue.text = "${QuantityFormat.format(qty)} $unit"
    }

    // ---------------- step 4: expiry ----------------

    private fun setupStep4() {
        val types = listOf("days" to "Days", "months" to "Months", "years" to "Years")
        types.forEachIndexed { i, (key, label) ->
            val chip = ItemChipBinding.inflate(layoutInflater, binding.durationTypeChips, false)
            if (i > 0) (chip.root.layoutParams as LinearLayout.LayoutParams).marginStart = dp(10)
            chip.root.setOnClickListener {
                durationType = key
                binding.durationWheel.setInitial(durationVal().toDouble(), 1.0)
                renderStep4()
            }
            binding.durationTypeChips.addView(chip.root)
            durationChips[key] = chip
        }
        binding.durationWheel.onChange = { v ->
            setDurationVal(v.toInt())
            renderExpiryTexts()
        }
        Press.apply(binding.btnAddDate)
        binding.btnAddDate.setOnClickListener { showDateWheelSheet() }
        binding.btnUseDuration.setOnClickListener {
            expiryMode = "duration"
            renderStep4()
        }
    }

    private fun durationVal(): Int = when (durationType) {
        "months" -> monthsVal
        "years" -> yearsVal
        else -> daysVal
    }

    private fun setDurationVal(v: Int) {
        when (durationType) {
            "months" -> monthsVal = v
            "years" -> yearsVal = v
            else -> daysVal = v
        }
    }

    private fun durationTypeLabel(): String {
        val v = durationVal()
        return when (durationType) {
            "months" -> if (v == 1) "Month" else "Months"
            "years" -> if (v == 1) "Year" else "Years"
            else -> if (v == 1) "Day" else "Days"
        }
    }

    /** friendlyDurationText — e.g. 400 days → "1 Year 1 Month 5 Days". */
    private fun friendlyDuration(): String {
        val v = durationVal()
        return when (durationType) {
            "years" -> "$v Year${if (v == 1) "" else "s"}"
            "months" -> {
                val years = v / 12
                val months = v % 12
                val parts = mutableListOf<String>()
                if (years > 0) parts.add("$years Year${if (years == 1) "" else "s"}")
                if (months > 0 || parts.isEmpty()) parts.add("$months Month${if (months == 1) "" else "s"}")
                parts.joinToString(" ")
            }
            else -> {
                val years = v / 365
                val rem = v - years * 365
                val months = rem / 30
                val days = rem - months * 30
                val parts = mutableListOf<String>()
                if (years > 0) parts.add("$years Year${if (years == 1) "" else "s"}")
                if (months > 0) parts.add("$months Month${if (months == 1) "" else "s"}")
                if (days > 0 || parts.isEmpty()) parts.add("$days Day${if (days == 1) "" else "s"}")
                parts.joinToString(" ")
            }
        }
    }

    private fun estimatedExpiryDate(): Date {
        val cal = Calendar.getInstance()
        when (durationType) {
            "months" -> cal.add(Calendar.MONTH, durationVal())
            "years" -> cal.add(Calendar.YEAR, durationVal())
            else -> cal.add(Calendar.DAY_OF_YEAR, durationVal())
        }
        return cal.time
    }

    private fun renderStep4() {
        val isDuration = expiryMode == "duration"
        binding.durationSection.visibility = if (isDuration) View.VISIBLE else View.GONE
        binding.dateSection.visibility = if (isDuration) View.GONE else View.VISIBLE

        for ((key, chip) in durationChips) {
            val label = when (key) { "months" -> "Months"; "years" -> "Years"; else -> "Days" }
            ChipHelper.bind(chip, label, selected = durationType == key)
        }
        binding.durationWheel.setInitial(durationVal().toDouble(), 1.0)
        renderExpiryTexts()
    }

    private fun renderExpiryTexts() {
        val isDuration = expiryMode == "duration"
        binding.expiryHeadline.text = if (isDuration) {
            friendlyDuration()
        } else {
            selectedDate?.let { ExpiryUtils.formatLongDate(it) } ?: ""
        }
        binding.durationValue.text = "${durationVal()} ${durationTypeLabel()}"
        binding.todayDate.text = ExpiryUtils.formatLongDate(Date())
        binding.selectedDuration.text = "${durationVal()} ${durationTypeLabel()}"
        binding.estimatedDate.text = ExpiryUtils.formatLongDate(estimatedExpiryDate())
        binding.addDateLabel.text = selectedDate?.let { ExpiryUtils.formatLongDate(it) } ?: "Add Date"

        selectedDate?.let { d ->
            val today = Calendar.getInstance().apply {
                set(Calendar.HOUR_OF_DAY, 0); set(Calendar.MINUTE, 0)
                set(Calendar.SECOND, 0); set(Calendar.MILLISECOND, 0)
            }
            val days = ((d.time - today.timeInMillis) / 86_400_000.0).let { kotlin.math.ceil(it).toInt() }
            binding.dateExpiresIn.text = getString(R.string.add_expires_in, maxOf(0, days))
        }
    }

    // ---------------- date wheel sheet ----------------

    private fun showDateWheelSheet() {
        val sheet = BottomSheetDialog(this, R.style.Theme_FreshKeep_BottomSheetDialog)
        val sb = SheetDateWheelBinding.inflate(layoutInflater)

        val months = listOf(
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December",
        )
        val days = (1..31).map { it.toString() }
        val thisYear = Calendar.getInstance().get(Calendar.YEAR)
        val years = (0..10).map { (thisYear + it).toString() }

        val initial = Calendar.getInstance().apply {
            time = selectedDate ?: Date(System.currentTimeMillis() + daysVal * 86_400_000L)
        }
        sb.dwDay.items = days
        sb.dwMonth.items = months
        sb.dwYear.items = years
        sb.dwDay.setSelected(initial.get(Calendar.DAY_OF_MONTH) - 1)
        sb.dwMonth.setSelected(initial.get(Calendar.MONTH))
        sb.dwYear.setSelected(maxOf(0, years.indexOf(initial.get(Calendar.YEAR).toString())))

        sb.dwCancel.setOnClickListener { sheet.dismiss() }
        sb.dwDone.setOnClickListener {
            val cal = Calendar.getInstance()
            cal.set(years[sb.dwYear.index].toInt(), sb.dwMonth.index, sb.dwDay.index + 1, 0, 0, 0)
            cal.set(Calendar.MILLISECOND, 0)
            selectedDate = cal.time
            expiryMode = "date"
            sheet.dismiss()
            renderStep4()
        }
        sheet.setContentView(sb.root)
        sheet.show()
    }

    // ---------------- custom category sheet ----------------

    private fun showCategorySheet(editing: Category?) {
        val sheet = BottomSheetDialog(this, R.style.Theme_FreshKeep_BottomSheetDialog)
        val sb = SheetCustomCategoryBinding.inflate(layoutInflater)
        var draftIcon = editing?.icon ?: customIconChoices[0]
        var draftTone = editing?.tone ?: "green"

        sb.ccTitle.text = if (editing != null) "Edit category" else "Create custom category"
        sb.ccSave.text = if (editing != null) "Save" else "Create Category"
        sb.ccName.setText(editing?.label ?: "")

        // icon choices — 44dp tiles, selected = 2dp green border
        val iconTiles = mutableMapOf<String, FrameLayout>()
        fun renderIcons() {
            for ((ic, tile) in iconTiles) {
                tile.setBackgroundResource(
                    if (ic == draftIcon) R.drawable.bg_icon_choice_selected else R.drawable.bg_section_md
                )
            }
        }
        for (ic in customIconChoices) {
            val tile = FrameLayout(this).apply {
                layoutParams = android.view.ViewGroup.LayoutParams(dp(44), dp(44))
                isClickable = true
                isFocusable = true
                addView(IconView(context).apply {
                    setIcon(ic)
                    setTextSize(TypedValue.COMPLEX_UNIT_DIP, 22f)
                    setTextColor(ContextCompat.getColor(context, R.color.color_text_primary))
                    layoutParams = FrameLayout.LayoutParams(
                        FrameLayout.LayoutParams.WRAP_CONTENT, FrameLayout.LayoutParams.WRAP_CONTENT, Gravity.CENTER
                    )
                })
                setOnClickListener {
                    draftIcon = ic
                    renderIcons()
                }
            }
            sb.ccIcons.addView(tile)
            iconTiles[ic] = tile
        }
        renderIcons()

        // color swatches — 40dp circles, selected = 3dp dark border
        val colorTiles = mutableMapOf<String, FrameLayout>()
        fun renderColors() {
            for ((tone, tile) in colorTiles) {
                (tile.getChildAt(0) as View).visibility = if (tone == draftTone) View.VISIBLE else View.GONE
            }
        }
        for ((tone, colorRes) in customColorChoices) {
            val wrap = FrameLayout(this).apply {
                layoutParams = LinearLayout.LayoutParams(dp(40), dp(40)).apply { marginEnd = dp(12) }
                background = ContextCompat.getDrawable(context, R.drawable.circle_primary)?.mutate()?.also {
                    it.setTint(ContextCompat.getColor(context, colorRes))
                }
                isClickable = true
                isFocusable = true
            }
            val ring = View(this).apply {
                setBackgroundResource(R.drawable.circle_selection_ring)
                layoutParams = FrameLayout.LayoutParams(
                    FrameLayout.LayoutParams.MATCH_PARENT, FrameLayout.LayoutParams.MATCH_PARENT
                )
                visibility = View.GONE
            }
            wrap.addView(ring)
            wrap.setOnClickListener {
                draftTone = tone
                renderColors()
            }
            sb.ccColors.addView(wrap)
            colorTiles[tone] = wrap
        }
        renderColors()

        sb.ccCancel.setOnClickListener { sheet.dismiss() }
        Press.apply(sb.ccSave)
        sb.ccSave.setOnClickListener {
            val name = sb.ccName.text.toString().trim()
            if (name.isEmpty()) return@setOnClickListener
            if (editing != null) {
                catalog.updateCustomCategory(editing.key, name, draftIcon, draftTone)
                toast(getString(R.string.toast_category_updated))
            } else {
                val key = "custom-${System.currentTimeMillis()}"
                catalog.addCustomCategory(Category(key, name, draftIcon, draftTone, null, isCustom = true))
                justAddedCategoryKey = key
                toast(getString(R.string.toast_category_created))
            }
            sheet.dismiss()
            renderStep1()
        }
        if (editing != null) {
            sb.ccDelete.visibility = View.VISIBLE
            Press.apply(sb.ccDelete)
            sb.ccDelete.setOnClickListener {
                catalog.removeCategory(editing.key, isCustom = true)
                sheet.dismiss()
                toast(getString(R.string.toast_category_deleted))
                renderStep1()
            }
        }
        sheet.setContentView(sb.root)
        sheet.show()
    }

    // ---------------- custom product sheet ----------------

    private fun showProductSheet(editing: Product?) {
        val cat = category ?: return
        val sheet = BottomSheetDialog(this, R.style.Theme_FreshKeep_BottomSheetDialog)
        val sb = SheetCustomProductBinding.inflate(layoutInflater)
        var draftUnit = editing?.defaultUnit ?: "Kg"
        var draftImageMode = "icon"

        sb.cpTitle.text = if (editing != null) "Edit product" else "Add New Product"
        sb.cpCategory.text = getString(R.string.add_category_caption, cat.label)
        sb.cpName.setText(editing?.name ?: "")
        sb.cpExpiry.setText(editing?.defaultExpiryDays?.toString() ?: "")

        // image mode pills
        val modes = listOf(
            Triple("icon", "category", "Default Icon"),
            Triple("camera", "photo_camera", "Take Photo"),
            Triple("gallery", "photo_library", "Gallery"),
        )
        val modeViews = mutableMapOf<String, Pair<LinearLayout, List<TextView>>>()
        fun renderModes() {
            for ((mode, pair) in modeViews) {
                val selected = mode == draftImageMode
                pair.first.setBackgroundResource(
                    if (selected) R.drawable.bg_pill_primary_surface else R.drawable.bg_pill_section
                )
                val color = ContextCompat.getColor(
                    this, if (selected) R.color.color_primary_press else R.color.color_text_secondary
                )
                pair.second.forEach { it.setTextColor(color) }
            }
        }
        for ((mode, ic, label) in modes) {
            val pill = LinearLayout(this).apply {
                orientation = LinearLayout.HORIZONTAL
                gravity = Gravity.CENTER_VERTICAL
                setPadding(dp(14), dp(10), dp(14), dp(10))
                isClickable = true
                isFocusable = true
            }
            val icon = IconView(this).apply {
                setIcon(ic)
                setTextSize(TypedValue.COMPLEX_UNIT_DIP, 18f)
            }
            val text = TextView(this).apply {
                text = label
                typeface = ResourcesCompat.getFont(context, R.font.nunito_bold)
                setTextSize(TypedValue.COMPLEX_UNIT_SP, 13f)
                setPadding(dp(6), 0, 0, 0)
            }
            pill.addView(icon)
            pill.addView(text)
            pill.setOnClickListener {
                draftImageMode = mode
                renderModes()
            }
            sb.cpImageModes.addView(pill)
            modeViews[mode] = pill to listOf(icon, text)
        }
        renderModes()

        // unit chips
        val cpUnitChips = mutableMapOf<String, ItemChipBinding>()
        fun renderCpUnits() {
            for (u in QuantityFormat.UNITS) {
                cpUnitChips[u]?.let { ChipHelper.bind(it, u, selected = draftUnit == u) }
            }
        }
        for (u in QuantityFormat.UNITS) {
            val chip = ItemChipBinding.inflate(layoutInflater, sb.cpUnits, false)
            chip.root.setOnClickListener {
                draftUnit = u
                renderCpUnits()
            }
            sb.cpUnits.addView(chip.root)
            cpUnitChips[u] = chip
        }
        renderCpUnits()

        sb.cpCancel.setOnClickListener { sheet.dismiss() }
        Press.apply(sb.cpSave)
        sb.cpSave.setOnClickListener {
            val name = sb.cpName.text.toString().trim()
            if (name.isEmpty()) return@setOnClickListener
            val expiryDays = sb.cpExpiry.text.toString().toIntOrNull() ?: 14
            if (editing != null) {
                catalog.removeProduct(cat.key, editing.name, isCustom = true)
            }
            catalog.addCustomProduct(Product(cat.key, name, expiryDays, draftUnit, isCustom = true))
            sheet.dismiss()
            if (editing == null) {
                justAddedProductName = name
                showProductCelebration()
            }
            renderStep2()
        }
        if (editing != null) {
            sb.cpDelete.visibility = View.VISIBLE
            Press.apply(sb.cpDelete)
            sb.cpDelete.setOnClickListener {
                catalog.removeProduct(cat.key, editing.name, isCustom = true)
                sheet.dismiss()
                renderStep2()
            }
        }
        sheet.setContentView(sb.root)
        sheet.show()
    }

    /** "Custom product added successfully." full-screen celebration (1.6s). */
    private fun showProductCelebration() {
        binding.celebrationOverlay.visibility = View.VISIBLE
        binding.celebrationTitle.text = getString(R.string.add_custom_added)
        binding.celebrationSub.text = ""
        binding.celebrationView.play()
        binding.celebrationOverlay.postDelayed({
            binding.celebrationOverlay.visibility = View.GONE
        }, 1600)
    }

    // ---------------- step 5: save + celebration ----------------

    private fun saveAndCelebrate() {
        val name = product ?: "Item"
        val cat = category
        val expiryIso = if (expiryMode == "date" && selectedDate != null) {
            val cal = Calendar.getInstance().apply { time = selectedDate!! }
            ExpiryUtils.isoDaysFromNow(0).let {
                java.text.SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", java.util.Locale.US)
                    .apply { timeZone = java.util.TimeZone.getTimeZone("UTC") }
                    .format(cal.time)
            }
        } else {
            val cal = Calendar.getInstance()
            when (durationType) {
                "months" -> cal.add(Calendar.MONTH, durationVal())
                "years" -> cal.add(Calendar.YEAR, durationVal())
                else -> cal.add(Calendar.DAY_OF_YEAR, durationVal())
            }
            java.text.SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", java.util.Locale.US)
                .apply { timeZone = java.util.TimeZone.getTimeZone("UTC") }
                .format(cal.time)
        }

        InventoryDao(this).insert(
            FoodItem(
                name = name,
                category = cat?.key ?: "others",
                icon = cat?.icon ?: "category",
                illustration = ProductIllustrations.forProduct(name, cat?.key),
                quantity = "${QuantityFormat.format(qty)} $unit",
                addedDate = ExpiryUtils.nowIso(),
                expiryDate = expiryIso,
            )
        )

        binding.celebrationOverlay.visibility = View.VISIBLE
        binding.celebrationTitle.text = getString(R.string.add_food_added)
        binding.celebrationSub.text = getString(R.string.add_food_remind, name)
        binding.celebrationView.play()
        binding.celebrationOverlay.postDelayed({ finish() }, 1600)
    }

    // ---------------- helpers ----------------

    private fun watcher(onChanged: () -> Unit) = object : TextWatcher {
        override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {}
        override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {}
        override fun afterTextChanged(s: Editable?) = onChanged()
    }

    private fun toast(msg: String) {
        Toast.makeText(this, msg, Toast.LENGTH_SHORT).show()
    }

    private fun dp(v: Int): Int =
        TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, v.toFloat(), resources.displayMetrics).toInt()
}

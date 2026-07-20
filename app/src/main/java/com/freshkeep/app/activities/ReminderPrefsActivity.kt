package com.freshkeep.app.activities

import android.os.Bundle
import android.util.TypedValue
import android.view.Gravity
import android.view.View
import android.view.animation.AnimationUtils
import android.widget.LinearLayout
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat
import androidx.core.content.res.ResourcesCompat
import com.freshkeep.app.R
import com.freshkeep.app.databinding.ActivitySimpleListBinding
import com.freshkeep.app.databinding.ItemReminderCategoryBinding
import com.freshkeep.app.databinding.SheetCustomReminderBinding
import com.freshkeep.app.db.CatalogDao
import com.freshkeep.app.db.ReminderDao
import com.freshkeep.app.views.IconView
import com.freshkeep.app.views.Press
import com.freshkeep.app.views.ToggleView
import com.google.android.material.bottomsheet.BottomSheetDialog
import kotlin.math.max

/**
 * ReminderPreferences.jsx — per-category reminder schedules with preset wheel,
 * custom reminder sheet, selected chips, notification preview, toggles.
 */
class ReminderPrefsActivity : AppCompatActivity() {

    private data class Preset(val label: String, val days: Int)

    /** Built in onCreate so the labels follow the selected app language. */
    private lateinit var presets: List<Preset>

    private lateinit var binding: ActivitySimpleListBinding
    private lateinit var dao: ReminderDao
    private var expandedKey: String? = null
    private val cards = mutableMapOf<String, ItemReminderCategoryBinding>()
    private val wheelIdx = mutableMapOf<String, Int>()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivitySimpleListBinding.inflate(layoutInflater)
        setContentView(binding.root)
        dao = ReminderDao(this)
        presets = listOf(0, 1, 2, 3, 5, 7, 10, 14, 21, 30).map { Preset(dayLabelBefore(it), it) }
        binding.topBar.topBarTitle.text = getString(R.string.profile_reminder_prefs)
        binding.topBar.btnBack.setOnClickListener { finish() }

        binding.listContainer.addView(TextView(this).apply {
            text = getString(R.string.reminder_intro)
            typeface = ResourcesCompat.getFont(context, R.font.nunito_medium)
            setTextSize(TypedValue.COMPLEX_UNIT_SP, 13f)
            setTextColor(ContextCompat.getColor(context, R.color.color_text_secondary))
            setPadding(0, 0, 0, dp(16))
        })

        // default reminder categories + user custom food categories
        val all = ReminderDao.CATEGORIES.toMutableList()
        for (c in CatalogDao(this).getCategories().filter { it.isCustom }) {
            all.add(Triple(c.key, c.label, c.icon))
        }

        for ((key, label, icon) in all) {
            val card = ItemReminderCategoryBinding.inflate(layoutInflater, binding.listContainer, false)
            card.rcIcon.setIcon(icon)
            card.rcLabel.text = label
            card.rcWheel.items = presets.map { it.label }
            card.rcWheel.onChange = { idx -> wheelIdx[key] = idx }
            wheelIdx[key] = 0

            card.rcHeader.setOnClickListener {
                expandedKey = if (expandedKey == key) null else key
                renderExpansion()
            }
            Press.apply(card.rcAddReminder)
            card.rcAddReminder.setOnClickListener {
                val days = presets[wheelIdx[key] ?: 0].days
                val selected = dao.get(key)
                if (days !in selected) dao.set(key, selected + days)
                renderCard(key)
                toast(getString(R.string.toast_reminder_updated))
            }
            Press.apply(card.rcAddCustom)
            card.rcAddCustom.setOnClickListener { showCustomSheet(key) }

            // toggles: Enable / Push / Sound / Vibration (in-memory, as in prototype)
            val toggles = listOf(
                getString(R.string.reminder_enable) to true,
                getString(R.string.reminder_push) to true,
                getString(R.string.reminder_sound) to true,
                getString(R.string.reminder_vibration) to false,
            )
            for ((tLabel, def) in toggles) {
                val row = LinearLayout(this).apply {
                    orientation = LinearLayout.HORIZONTAL
                    gravity = Gravity.CENTER_VERTICAL
                    setPadding(0, dp(8), 0, dp(8))
                }
                row.addView(TextView(this).apply {
                    text = tLabel
                    typeface = ResourcesCompat.getFont(context, R.font.nunito_medium)
                    setTextSize(TypedValue.COMPLEX_UNIT_SP, 15f)
                    setTextColor(ContextCompat.getColor(context, R.color.color_text_primary))
                    layoutParams = LinearLayout.LayoutParams(0, LinearLayout.LayoutParams.WRAP_CONTENT, 1f)
                })
                row.addView(ToggleView(this).apply { setChecked(def) })
                card.rcToggles.addView(row)
            }

            binding.listContainer.addView(card.root, LinearLayout.LayoutParams(
                LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT
            ).apply { bottomMargin = dp(14) })
            cards[key] = card
            renderCard(key)
        }
        renderExpansion()
    }

    /** Chip / summary label: "Today" or "N Days". */
    private fun dayLabel(d: Int): String =
        if (d == 0) getString(R.string.reminder_today)
        else resources.getQuantityString(R.plurals.days, d, d)

    /** Wheel preset label: "Today" or "N Days Before". */
    private fun dayLabelBefore(d: Int): String =
        if (d == 0) getString(R.string.reminder_today)
        else resources.getQuantityString(R.plurals.days_before, d, d)

    private fun renderCard(key: String) {
        val card = cards[key] ?: return
        // Kotlin's sortedDescending, NOT SortedSet.reversed() — the latter is
        // JDK SequencedCollection#reversed(), API 35+, and crashes below Android 15
        val selected = dao.get(key).distinct().sortedDescending()

        card.rcSummary.text = selected.joinToString(", ") { dayLabel(it) }

        card.rcSelectedChips.removeAllViews()
        for (d in selected) {
            val chip = LinearLayout(this).apply {
                orientation = LinearLayout.HORIZONTAL
                gravity = Gravity.CENTER_VERTICAL
                setBackgroundResource(R.drawable.bg_pill_primary_surface)
                setPadding(dp(14), dp(6), dp(6), dp(6))
            }
            chip.addView(TextView(this).apply {
                text = dayLabel(d)
                typeface = ResourcesCompat.getFont(context, R.font.nunito_bold)
                setTextSize(TypedValue.COMPLEX_UNIT_SP, 13f)
                setTextColor(ContextCompat.getColor(context, R.color.color_primary_press))
            })
            chip.addView(android.widget.FrameLayout(this).apply {
                layoutParams = LinearLayout.LayoutParams(dp(20), dp(20)).apply { marginStart = dp(6) }
                setBackgroundResource(R.drawable.circle_section)
                background.mutate().setTint(0x14000000)
                addView(IconView(context).apply {
                    setIcon("close")
                    setTextSize(TypedValue.COMPLEX_UNIT_DIP, 13f)
                    setTextColor(ContextCompat.getColor(context, R.color.color_primary_press))
                    layoutParams = android.widget.FrameLayout.LayoutParams(
                        android.widget.FrameLayout.LayoutParams.WRAP_CONTENT,
                        android.widget.FrameLayout.LayoutParams.WRAP_CONTENT,
                        Gravity.CENTER,
                    )
                })
                setOnClickListener {
                    val next = dao.get(key).filter { it != d }
                    dao.set(key, if (next.isEmpty()) listOf(d) else next)
                    renderCard(key)
                }
            })
            card.rcSelectedChips.addView(chip)
        }

        card.rcPreview.text = selected.joinToString("\n") { d ->
            "• ${dayLabel(d).lowercase()}${if (d == 0) "" else " before expiry"}"
        }
    }

    private fun renderExpansion() {
        for ((key, card) in cards) {
            val open = key == expandedKey
            card.rcContent.visibility = if (open) View.VISIBLE else View.GONE
            card.rcChevron.animate().rotation(if (open) 180f else 0f).setDuration(200)
                .setInterpolator(AnimationUtils.loadInterpolator(this, R.interpolator.ease_out_soft))
                .start()
        }
    }

    private fun showCustomSheet(key: String) {
        val sheet = BottomSheetDialog(this, R.style.Theme_FreshKeep_BottomSheetDialog)
        val sb = SheetCustomReminderBinding.inflate(layoutInflater)
        var num = 1.0
        sb.customWheel.setInitial(1.0, 1.0)
        sb.customWheel.onChange = { v ->
            num = max(1.0, v)
            sb.customValue.text = dayLabelBefore(num.toInt())
        }
        sb.btnCancel.setOnClickListener { sheet.dismiss() }
        Press.apply(sb.btnSaveReminder)
        sb.btnSaveReminder.setOnClickListener {
            val days = max(1, num.toInt())
            val selected = dao.get(key)
            if (days !in selected) dao.set(key, selected + days)
            sheet.dismiss()
            renderCard(key)
            toast("Reminder updated successfully.")
        }
        sheet.setContentView(sb.root)
        sheet.show()
    }

    private fun toast(message: String) {
        android.widget.Toast.makeText(this, message, android.widget.Toast.LENGTH_SHORT).show()
    }

    private fun dp(v: Int): Int =
        TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, v.toFloat(), resources.displayMetrics).toInt()
}

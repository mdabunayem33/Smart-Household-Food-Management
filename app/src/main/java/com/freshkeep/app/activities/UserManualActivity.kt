package com.freshkeep.app.activities

import android.os.Bundle
import android.util.TypedValue
import android.widget.LinearLayout
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat
import androidx.core.content.res.ResourcesCompat
import com.freshkeep.app.R
import com.freshkeep.app.databinding.ActivitySimpleListBinding
import com.freshkeep.app.databinding.ItemAccordionBinding
import com.freshkeep.app.views.Accordion
import com.freshkeep.app.views.IconView

/** UserManual.jsx — accordion help sections + FAQ + contact. */
class UserManualActivity : AppCompatActivity() {

    private data class Section(
        val icon: String,
        val label: String,
        val body: String? = null,
        val faqs: List<Pair<String, String>>? = null,
        val contact: List<Triple<String, String, String>>? = null,
    )

    private val sections = listOf(
        Section("inventory_2", "Add Inventory",
            "Learn how to add food items, choose categories, set quantity, and set expiry dates from the green Add food button on Home or Inventory."),
        Section("notifications", "Expiry Reminders",
            "Understand how reminders work per category and how to customize reminder timing from Reminder Preferences."),
        Section("shopping_cart", "Grocery Planning",
            "Learn how grocery planning and shopping recommendations work based on what is running low in your inventory."),
        Section("donut_large", "Analytics",
            "View monthly food waste, food saved, and money saved reports from the Analytics tab."),
        Section("notifications_active", "Notifications",
            "Manage reminder notifications and alerts from the Notifications toggle at the top of Profile."),
        Section("diversity_3", "Family Sharing",
            "Learn how to share food management with family members so everyone stays in sync."),
        Section("quiz", "Frequently Asked Questions", faqs = listOf(
            "How do I add food?" to "Tap the green Add food button on Home or Inventory and follow the quick steps.",
            "How do reminders work?" to "Each category has its own reminder days, set in Profile → Reminder Preferences.",
            "How do I change the language?" to "Profile → Language, then tap any language in the list.",
            "How do I delete my account?" to "Contact Support to request account deletion.",
            "Can I use the app without Wi-Fi?" to "Yes, core tracking works offline; sync happens when you're back online.",
        )),
        Section("support_agent", "Contact Support", contact = listOf(
            Triple("mail", "Email Support", "support@freshkeep.app"),
            Triple("info", "App Version", "1.2.0 (Build 108)"),
        )),
    )

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val binding = ActivitySimpleListBinding.inflate(layoutInflater)
        setContentView(binding.root)
        binding.topBar.topBarTitle.text = getString(R.string.title_user_manual)
        binding.topBar.btnBack.setOnClickListener { finish() }

        for (s in sections) {
            val acc = ItemAccordionBinding.inflate(layoutInflater, binding.listContainer, false)
            acc.accIcon.setIcon(s.icon)
            acc.accTitle.text = s.label
            Accordion.setup(acc)

            s.body?.let { acc.accContent.addView(bodyText(it)) }
            s.faqs?.forEach { (q, a) ->
                acc.accContent.addView(TextView(this).apply {
                    text = q
                    typeface = ResourcesCompat.getFont(context, R.font.nunito_semibold)
                    setTextSize(TypedValue.COMPLEX_UNIT_SP, 15f)
                    setTextColor(ContextCompat.getColor(context, R.color.color_text_primary))
                    setPadding(0, dp(6), 0, 0)
                })
                acc.accContent.addView(bodyText(a))
            }
            s.contact?.forEach { (icon, label, value) ->
                val row = LinearLayout(this).apply {
                    orientation = LinearLayout.HORIZONTAL
                    gravity = android.view.Gravity.CENTER_VERTICAL
                    setPadding(0, dp(5), 0, dp(5))
                }
                row.addView(IconView(this).apply {
                    setIcon(icon)
                    setTextSize(TypedValue.COMPLEX_UNIT_DIP, 18f)
                    setTextColor(ContextCompat.getColor(context, R.color.color_text_secondary))
                })
                val col = LinearLayout(this).apply {
                    orientation = LinearLayout.VERTICAL
                    setPadding(dp(10), 0, 0, 0)
                }
                col.addView(TextView(this).apply {
                    text = label
                    typeface = ResourcesCompat.getFont(context, R.font.nunito_medium)
                    setTextSize(TypedValue.COMPLEX_UNIT_SP, 13f)
                    setTextColor(ContextCompat.getColor(context, R.color.color_text_primary))
                })
                col.addView(TextView(this).apply {
                    text = value
                    typeface = ResourcesCompat.getFont(context, R.font.nunito_semibold)
                    setTextSize(TypedValue.COMPLEX_UNIT_SP, 12f)
                    setTextColor(ContextCompat.getColor(context, R.color.color_text_tertiary))
                })
                row.addView(col)
                acc.accContent.addView(row)
            }

            binding.listContainer.addView(acc.root, LinearLayout.LayoutParams(
                LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT
            ).apply { bottomMargin = dp(10) })
        }
    }

    private fun bodyText(text: String): TextView = TextView(this).apply {
        this.text = text
        typeface = ResourcesCompat.getFont(context, R.font.nunito_medium)
        setTextSize(TypedValue.COMPLEX_UNIT_SP, 13f)
        setTextColor(ContextCompat.getColor(context, R.color.color_text_secondary))
        setLineSpacing(0f, 1.45f)
        setPadding(0, dp(2), 0, dp(4))
    }

    private fun dp(v: Int): Int =
        TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, v.toFloat(), resources.displayMetrics).toInt()
}

package com.freshkeep.app.activities

import android.os.Bundle
import android.util.TypedValue
import android.view.Gravity
import android.view.View
import android.widget.FrameLayout
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
import com.freshkeep.app.views.Press

/**
 * Shared base for PrivacyPolicy.jsx / TermsConditions.jsx — dated header,
 * legal accordions (no icon tile), acknowledgment checkbox, Back button.
 */
abstract class LegalActivity : AppCompatActivity() {

    abstract val pageTitle: String
    abstract val dateLine: String
    abstract val ackText: String
    abstract val sections: List<Pair<String, String>>

    private var acked = false

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val binding = ActivitySimpleListBinding.inflate(layoutInflater)
        setContentView(binding.root)
        binding.topBar.topBarTitle.text = pageTitle
        binding.topBar.btnBack.setOnClickListener { finish() }
        binding.bottomAction.visibility = View.VISIBLE
        Press.apply(binding.btnBottomBack)
        binding.btnBottomBack.setOnClickListener { finish() }

        binding.listContainer.addView(TextView(this).apply {
            text = dateLine
            typeface = ResourcesCompat.getFont(context, R.font.nunito_semibold)
            setTextSize(TypedValue.COMPLEX_UNIT_SP, 12f)
            setTextColor(ContextCompat.getColor(context, R.color.color_text_tertiary))
            setPadding(0, 0, 0, dp(16))
        })

        for ((title, body) in sections) {
            val acc = ItemAccordionBinding.inflate(layoutInflater, binding.listContainer, false)
            acc.accIconTile.visibility = View.GONE
            acc.accTitle.text = title
            Accordion.setup(acc)
            acc.accContent.addView(TextView(this).apply {
                text = body
                typeface = ResourcesCompat.getFont(context, R.font.nunito_medium)
                setTextSize(TypedValue.COMPLEX_UNIT_SP, 13f)
                setTextColor(ContextCompat.getColor(context, R.color.color_text_secondary))
                setLineSpacing(0f, 1.45f)
            })
            binding.listContainer.addView(acc.root, LinearLayout.LayoutParams(
                LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT
            ).apply { bottomMargin = dp(8) })
        }

        // acknowledgment checkbox
        val ackRow = LinearLayout(this).apply {
            orientation = LinearLayout.HORIZONTAL
            gravity = Gravity.CENTER_VERTICAL
            setPadding(0, dp(20), 0, 0)
            isClickable = true
            isFocusable = true
        }
        val box = FrameLayout(this).apply {
            layoutParams = LinearLayout.LayoutParams(dp(24), dp(24))
            setBackgroundResource(R.drawable.bg_checkbox)
        }
        val check = IconView(this).apply {
            setIcon("check")
            setTextSize(TypedValue.COMPLEX_UNIT_DIP, 16f)
            setTextColor(0xFFFFFFFF.toInt())
            visibility = View.GONE
            layoutParams = FrameLayout.LayoutParams(
                FrameLayout.LayoutParams.WRAP_CONTENT, FrameLayout.LayoutParams.WRAP_CONTENT, Gravity.CENTER
            )
        }
        box.addView(check)
        ackRow.addView(box)
        ackRow.addView(TextView(this).apply {
            text = ackText
            typeface = ResourcesCompat.getFont(context, R.font.nunito_medium)
            setTextSize(TypedValue.COMPLEX_UNIT_SP, 15f)
            setTextColor(ContextCompat.getColor(context, R.color.color_text_primary))
            setPadding(dp(10), 0, 0, 0)
        })
        ackRow.setOnClickListener {
            acked = !acked
            box.setBackgroundResource(if (acked) R.drawable.bg_checkbox_checked else R.drawable.bg_checkbox)
            check.visibility = if (acked) View.VISIBLE else View.GONE
        }
        binding.listContainer.addView(ackRow)
    }

    private fun dp(v: Int): Int =
        TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, v.toFloat(), resources.displayMetrics).toInt()
}

/** PrivacyPolicy.jsx */
class PrivacyPolicyActivity : LegalActivity() {
    override val pageTitle = "Privacy Policy"
    override val dateLine = "Last Updated: July 1, 2026"
    override val ackText = "I have read the Privacy Policy"
    override val sections = listOf(
        "Introduction" to "FreshKeep helps your household track food and reduce waste. This policy explains what data we collect and how we use it.",
        "Information We Collect" to "Account details (name, email, profile photo), the food data you enter, and basic device/notification settings.",
        "How We Use Your Information" to "To run core features — inventory tracking, reminders, analytics — and to improve the app experience.",
        "Food Inventory Data" to "Item names, quantities, categories, and expiry dates you add are stored to power reminders and freshness tracking.",
        "Donation Data" to "If you post a food donation, its description, quantity, and pickup details are shared with prospective recipients.",
        "Notification Permissions" to "Used solely to deliver expiry reminders you've opted into.",
        "Camera Permission" to "Used only when you choose Take Photo for your profile picture or a custom item image.",
        "Photo Permission" to "Used only when you choose Choose from Gallery to select an existing image.",
        "Location Permission" to "Requested only for donation pickup coordination — never for tracking outside that feature.",
        "Data Security" to "Data is encrypted in transit and at rest, with access limited to what each feature needs.",
        "Data Sharing Policy" to "We do not sell your data. Limited data is shared with household members you invite or donation recipients you choose to contact.",
        "User Rights" to "You can access, export, or correct your data at any time from Profile settings.",
        "Delete Account & Data" to "Contact Support to permanently delete your account and all associated data.",
        "Contact Information" to "Reach us at privacy@freshkeep.app with any questions about this policy.",
    )
}

/** TermsConditions.jsx */
class TermsActivity : LegalActivity() {
    override val pageTitle = "Terms & Conditions"
    override val dateLine = "Effective Date: July 1, 2026"
    override val ackText = "I agree to the Terms & Conditions"
    override val sections = listOf(
        "Acceptance of Terms" to "By using FreshKeep, you agree to these Terms & Conditions and our Privacy Policy.",
        "User Responsibilities" to "Keep your account credentials secure and provide accurate information about your food inventory.",
        "Acceptable Use" to "Use FreshKeep only for personal household food management and community food donation — not for commercial resale.",
        "Inventory Management Rules" to "Freshness indicators and reminders are estimates; always use your own judgment about food safety.",
        "Food Donation Guidelines" to "Only donate food that is safely stored, within its safe-use window, and accurately described to recipients.",
        "Community Rules" to "Be respectful and honest with other household members and donation recipients using the app.",
        "Prohibited Activities" to "No fraudulent listings, harassment, or attempts to disrupt the service.",
        "Privacy & Data Usage" to "Your use of the app is also governed by our Privacy Policy, which explains what data we collect and how.",
        "Account Suspension" to "Accounts that violate these terms may be suspended or terminated.",
        "Disclaimer" to "FreshKeep is provided \"as is\" — we do our best to keep reminders and data accurate but cannot guarantee zero errors.",
        "Limitation of Liability" to "FreshKeep is not liable for food spoilage, donation outcomes, or losses arising from app use.",
        "Changes to Terms" to "We may update these terms occasionally; continued use after changes means you accept the updated terms.",
        "Contact Information" to "Questions about these terms can be sent to legal@freshkeep.app.",
    )
}

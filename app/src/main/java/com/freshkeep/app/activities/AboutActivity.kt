package com.freshkeep.app.activities

import android.content.Intent
import android.os.Bundle
import android.util.TypedValue
import android.view.Gravity
import android.widget.ImageView
import android.widget.LinearLayout
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat
import androidx.core.content.res.ResourcesCompat
import com.freshkeep.app.R
import com.freshkeep.app.databinding.ActivitySimpleListBinding
import com.freshkeep.app.views.IconView

/** AboutApp.jsx — logo, version, What's New, Features, Privacy/Terms links. */
class AboutActivity : AppCompatActivity() {

    private val whatsNew = listOf(
        "Improved expiry reminders",
        "Faster inventory loading",
        "Bug fixes and performance improvements",
    )

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val binding = ActivitySimpleListBinding.inflate(layoutInflater)
        setContentView(binding.root)
        binding.topBar.topBarTitle.text = getString(R.string.title_about)
        binding.topBar.btnBack.setOnClickListener { finish() }
        val c = binding.listContainer

        // header: logo + name + version
        val header = LinearLayout(this).apply {
            orientation = LinearLayout.VERTICAL
            gravity = Gravity.CENTER_HORIZONTAL
            setPadding(0, 0, 0, dp(28))
        }
        header.addView(ImageView(this).apply {
            setImageResource(R.drawable.freshkeep_logo)
            layoutParams = LinearLayout.LayoutParams(dp(72), dp(72))
        })
        header.addView(text("FreshKeep", R.font.baloo2_bold, 22f, R.color.color_text_primary, dp(10)))
        header.addView(text("Version 1.2.0 (Build 108)", R.font.nunito_medium, 13f, R.color.color_text_secondary, dp(10)))
        header.addView(text("Released July 1, 2026", R.font.nunito_semibold, 12f, R.color.color_text_tertiary, dp(10)))
        c.addView(header)

        // What's New card
        val newsCard = card()
        newsCard.addView(text("What's New", R.font.baloo2_bold, 18f, R.color.color_text_primary, 0))
        for (w in whatsNew) {
            val row = LinearLayout(this).apply {
                orientation = LinearLayout.HORIZONTAL
                setPadding(0, dp(8), 0, 0)
            }
            row.addView(IconView(this).apply {
                setIcon("check_circle")
                setTextSize(TypedValue.COMPLEX_UNIT_DIP, 16f)
                setTextColor(ContextCompat.getColor(context, R.color.color_primary))
                setPadding(0, dp(2), 0, 0)
            })
            row.addView(text(w, R.font.nunito_medium, 13f, R.color.color_text_secondary, 0).apply {
                setPadding(dp(8), 0, 0, 0)
            })
            newsCard.addView(row)
        }
        c.addView(newsCard, cardLp())

        // Features card
        val featCard = card()
        featCard.addView(text("Features Overview", R.font.baloo2_bold, 18f, R.color.color_text_primary, 0))
        featCard.addView(text(
            "Track your kitchen inventory, get smart expiry reminders, and reduce food waste — all in one simple app.",
            R.font.nunito_medium, 13f, R.color.color_text_secondary, dp(10),
        ))
        c.addView(featCard, cardLp())

        // legal links
        addLink(c, "privacy_tip", "Privacy Policy") {
            startActivity(Intent(this, PrivacyPolicyActivity::class.java))
            overridePendingTransition(R.anim.screen_fade_up, R.anim.fade_out)
        }
        addLink(c, "gavel", "Terms & Conditions") {
            startActivity(Intent(this, TermsActivity::class.java))
            overridePendingTransition(R.anim.screen_fade_up, R.anim.fade_out)
        }
    }

    private fun addLink(parent: LinearLayout, icon: String, label: String, onClick: () -> Unit) {
        val row = LinearLayout(this).apply {
            orientation = LinearLayout.HORIZONTAL
            gravity = Gravity.CENTER_VERTICAL
            setBackgroundResource(R.drawable.bg_card_lg)
            elevation = dp(1).toFloat()
            setPadding(dp(16), dp(14), dp(16), dp(14))
            isClickable = true
            isFocusable = true
            setOnClickListener { onClick() }
        }
        row.addView(IconView(this).apply {
            setIcon(icon)
            setTextSize(TypedValue.COMPLEX_UNIT_DIP, 20f)
            setTextColor(ContextCompat.getColor(context, R.color.color_text_secondary))
        })
        row.addView(text(label, R.font.nunito_medium, 15f, R.color.color_text_primary, 0).apply {
            setPadding(dp(14), 0, 0, 0)
            layoutParams = LinearLayout.LayoutParams(0, LinearLayout.LayoutParams.WRAP_CONTENT, 1f)
        })
        row.addView(IconView(this).apply {
            setIcon("chevron_right")
            setTextSize(TypedValue.COMPLEX_UNIT_DIP, 18f)
            setTextColor(ContextCompat.getColor(context, R.color.color_text_tertiary))
        })
        parent.addView(row, LinearLayout.LayoutParams(
            LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT
        ).apply { bottomMargin = dp(2) })
    }

    private fun card(): LinearLayout = LinearLayout(this).apply {
        orientation = LinearLayout.VERTICAL
        setBackgroundResource(R.drawable.bg_card_lg)
        elevation = dp(1).toFloat()
        setPadding(dp(18), dp(18), dp(18), dp(18))
    }

    private fun cardLp(): LinearLayout.LayoutParams = LinearLayout.LayoutParams(
        LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT
    ).apply { bottomMargin = dp(20) }

    private fun text(value: String, font: Int, sizeSp: Float, color: Int, topPad: Int): TextView =
        TextView(this).apply {
            text = value
            typeface = ResourcesCompat.getFont(context, font)
            setTextSize(TypedValue.COMPLEX_UNIT_SP, sizeSp)
            setTextColor(ContextCompat.getColor(context, color))
            setLineSpacing(0f, 1.4f)
            setPadding(0, topPad, 0, 0)
        }

    private fun dp(v: Int): Int =
        TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, v.toFloat(), resources.displayMetrics).toInt()
}

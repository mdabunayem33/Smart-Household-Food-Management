package com.freshkeep.app.activities

import android.os.Bundle
import android.util.TypedValue
import android.view.Gravity
import android.widget.LinearLayout
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat
import androidx.core.content.res.ResourcesCompat
import com.freshkeep.app.R
import com.freshkeep.app.databinding.ActivitySimpleListBinding
import com.freshkeep.app.db.SettingsDao
import com.freshkeep.app.views.IconView

/** LanguagePage.jsx — selectable language list. */
class LanguageActivity : AppCompatActivity() {

    private val languages = com.freshkeep.app.utils.LocaleHelper.languageNames

    private lateinit var binding: ActivitySimpleListBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivitySimpleListBinding.inflate(layoutInflater)
        setContentView(binding.root)
        binding.topBar.topBarTitle.text = getString(R.string.profile_language)
        binding.topBar.btnBack.setOnClickListener { finish() }
        render()
    }

    private fun render() {
        val settings = SettingsDao(this)
        val selected = settings.language
        binding.listContainer.removeAllViews()

        for (lang in languages) {
            val isSel = lang == selected
            val row = LinearLayout(this).apply {
                orientation = LinearLayout.HORIZONTAL
                gravity = Gravity.CENTER_VERTICAL
                setPadding(dp(16), dp(14), dp(16), dp(14))
                setBackgroundResource(if (isSel) R.drawable.bg_primary_surface_lg else R.drawable.bg_card_lg)
                if (!isSel) elevation = dp(1).toFloat()
                isClickable = true
                isFocusable = true
                setOnClickListener {
                    if (lang == selected) return@setOnClickListener
                    confirmChange(lang)
                }
            }
            row.addView(TextView(this).apply {
                text = lang
                typeface = ResourcesCompat.getFont(context, R.font.nunito_semibold)
                setTextSize(TypedValue.COMPLEX_UNIT_SP, 17f)
                setTextColor(
                    ContextCompat.getColor(
                        context,
                        if (isSel) R.color.color_primary_press else R.color.color_text_primary,
                    )
                )
            }, LinearLayout.LayoutParams(0, LinearLayout.LayoutParams.WRAP_CONTENT, 1f))
            if (isSel) {
                row.addView(IconView(this).apply {
                    setIcon("check")
                    setTextSize(TypedValue.COMPLEX_UNIT_DIP, 20f)
                    setTextColor(ContextCompat.getColor(context, R.color.color_primary_press))
                })
            }
            binding.listContainer.addView(row, LinearLayout.LayoutParams(
                LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT
            ).apply { bottomMargin = dp(8) })
        }
    }

    /** Confirm first — the language only changes when the user taps Change. */
    private fun confirmChange(language: String) {
        com.freshkeep.app.views.ConfirmDialog.show(
            this,
            title = getString(R.string.language_change_title),
            message = getString(R.string.language_change_message, language),
            confirmText = getString(R.string.action_change),
        ) {
            // Applies app-wide and recreates the running activities in place:
            // no new task, no second splash, session and data untouched.
            com.freshkeep.app.utils.LocaleHelper.apply(this, language)
        }
    }

    private fun dp(v: Int): Int =
        TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, v.toFloat(), resources.displayMetrics).toInt()
}

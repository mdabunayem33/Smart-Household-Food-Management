package com.freshkeep.app.activities

import android.content.Intent
import android.os.Bundle
import android.util.TypedValue
import android.view.LayoutInflater
import android.view.View
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat
import com.freshkeep.app.R
import com.freshkeep.app.databinding.ActivityShoppingSetupBinding
import com.freshkeep.app.databinding.ItemFreqOptionBinding
import com.freshkeep.app.db.SettingsDao
import com.freshkeep.app.db.ShoppingDao
import com.freshkeep.app.views.Press

/**
 * ShoppingSetup (Shopping.jsx) — one-time shopping frequency picker.
 * Reached as onboarding screen 4, or as a fallback for a returning user
 * who never chose a frequency.
 */
class ShoppingSetupActivity : AppCompatActivity() {

    companion object {
        const val EXTRA_FROM_ONBOARDING = "from_onboarding"
    }

    private lateinit var binding: ActivityShoppingSetupBinding
    private var choice: String? = null
    private val rows = mutableListOf<Pair<String, ItemFreqOptionBinding>>()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityShoppingSetupBinding.inflate(layoutInflater)
        setContentView(binding.root)

        val inflater = LayoutInflater.from(this)
        ShoppingDao.FREQ_OPTIONS.forEachIndexed { index, opt ->
            val row = ItemFreqOptionBinding.inflate(inflater, binding.optionsContainer, false)
            row.optEmoji.text = opt.emoji
            row.optLabel.text = getString(ShoppingDao.freqLabelRes(opt.key))
            row.optDesc.text = getString(ShoppingDao.freqDescRes(opt.key))
            if (index > 0) {
                (row.root.layoutParams as android.widget.LinearLayout.LayoutParams).topMargin = dp(12f)
            }
            row.root.setOnClickListener {
                choice = opt.key
                renderSelection()
            }
            binding.optionsContainer.addView(row.root)
            rows.add(opt.key to row)
        }

        Press.apply(binding.btnContinue)
        binding.btnContinue.setOnClickListener {
            val key = choice ?: return@setOnClickListener
            val settings = SettingsDao(this)

            if (intent.getBooleanExtra(EXTRA_FROM_ONBOARDING, false)) {
                // Pre-login: no user profile exists yet. Park the choice at
                // device scope; SettingsDao.login copies it into the profile.
                settings.put(SettingsDao.KEY_ONBOARDING_FREQUENCY, key)
                settings.onboardingDone = true
                startActivity(Intent(this, LoginActivity::class.java))
            } else {
                // Post-login fallback — store directly on the user's profile.
                settings.shopFrequency = key
                startActivity(
                    Intent(this, MainActivity::class.java)
                        .addFlags(Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK)
                )
            }
            overridePendingTransition(R.anim.fade_in, R.anim.fade_out)
            finish()
        }
    }

    private fun renderSelection() {
        for ((key, row) in rows) {
            val active = key == choice
            row.root.setBackgroundResource(
                if (active) R.drawable.bg_option_card_selected else R.drawable.bg_option_card
            )
            if (active) {
                row.optRadio.setBackgroundResource(R.drawable.circle_primary)
                row.optCheck.visibility = View.VISIBLE
            } else {
                row.optRadio.setBackgroundResource(R.drawable.circle_radio)
                row.optCheck.visibility = View.GONE
            }
        }
        binding.btnContinue.isEnabled = choice != null
        binding.btnContinue.alpha = if (choice != null) 1f else 0.45f
    }

    private fun dp(v: Float): Int =
        TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, v, resources.displayMetrics).toInt()
}

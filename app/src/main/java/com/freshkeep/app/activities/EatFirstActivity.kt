package com.freshkeep.app.activities

import android.graphics.drawable.GradientDrawable
import android.os.Bundle
import android.util.TypedValue
import android.view.Gravity
import android.view.View
import android.widget.LinearLayout
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat
import androidx.core.content.res.ResourcesCompat
import com.freshkeep.app.R
import com.freshkeep.app.databinding.ActivityEatFirstBinding
import com.freshkeep.app.databinding.ItemEatFirstCardBinding
import com.freshkeep.app.db.InventoryDao
import com.freshkeep.app.models.FoodItem
import com.freshkeep.app.sheets.FoodDetailSheet
import com.freshkeep.app.views.IconView
import com.freshkeep.app.views.Illustrations
import com.freshkeep.app.views.Press

/** EatFirst.jsx — items ≤7 days grouped by urgency, one-tap consume. */
class EatFirstActivity : AppCompatActivity() {

    private lateinit var binding: ActivityEatFirstBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityEatFirstBinding.inflate(layoutInflater)
        setContentView(binding.root)
        binding.topBar.topBarTitle.text = getString(R.string.title_eat_first)
        binding.topBar.btnBack.setOnClickListener { finish() }
    }

    override fun onResume() {
        super.onResume()
        render()
    }

    private fun bucketFor(daysLeft: Int): String = when {
        daysLeft <= 0 -> "Expiring Today"
        daysLeft == 1 -> "Tomorrow"
        daysLeft <= 3 -> "Within 3 Days"
        else -> "Within 7 Days"
    }

    private fun render() {
        val dao = InventoryDao(this)
        val urgent = dao.getAll()
            .filter { it.daysLeft <= 7 }
            .sortedBy { it.daysLeft }

        binding.groupsContainer.removeAllViews()

        val order = listOf("Expiring Today", "Tomorrow", "Within 3 Days", "Within 7 Days")
        val groups = order
            .map { label -> label to urgent.filter { bucketFor(it.daysLeft) == label } }
            .filter { it.second.isNotEmpty() }

        if (groups.isEmpty()) {
            val empty = TextView(this).apply {
                text = "Nothing urgent — you're all caught up 🎉"
                gravity = Gravity.CENTER
                setPadding(dp(40), dp(40), dp(40), dp(40))
                setTextColor(ContextCompat.getColor(context, R.color.color_text_tertiary))
                typeface = ResourcesCompat.getFont(context, R.font.nunito_medium)
                setTextSize(TypedValue.COMPLEX_UNIT_SP, 15f)
            }
            binding.groupsContainer.addView(empty)
            return
        }

        for ((label, items) in groups) {
            val isUrgent = label == "Expiring Today" || label == "Tomorrow"

            // group badge pill
            val pill = LinearLayout(this).apply {
                orientation = LinearLayout.HORIZONTAL
                gravity = Gravity.CENTER_VERTICAL
                setPadding(dp(12), dp(4), dp(12), dp(4))
                background = ContextCompat.getDrawable(context, R.drawable.bg_pill_section)?.mutate()?.also {
                    (it as GradientDrawable).setColor(
                        ContextCompat.getColor(
                            context,
                            if (isUrgent) R.color.color_accent_red_surface else R.color.color_accent_orange_surface,
                        )
                    )
                }
            }
            val fg = ContextCompat.getColor(this, if (isUrgent) R.color.red_700 else R.color.orange_700)
            pill.addView(IconView(this).apply {
                setIcon(if (isUrgent) "warning" else "schedule")
                setTextSize(TypedValue.COMPLEX_UNIT_DIP, 16f)
                setTextColor(fg)
            })
            pill.addView(TextView(this).apply {
                text = label
                typeface = ResourcesCompat.getFont(context, R.font.nunito_bold)
                setTextSize(TypedValue.COMPLEX_UNIT_SP, 13f)
                setTextColor(fg)
                setPadding(dp(6), 0, 0, 0)
            })
            val pillWrap = LinearLayout(this).apply {
                orientation = LinearLayout.HORIZONTAL
                addView(pill)
            }
            binding.groupsContainer.addView(pillWrap, LinearLayout.LayoutParams(
                LinearLayout.LayoutParams.WRAP_CONTENT, LinearLayout.LayoutParams.WRAP_CONTENT
            ).apply { bottomMargin = dp(12) })

            // cards
            items.forEach { item ->
                val card = ItemEatFirstCardBinding.inflate(layoutInflater, binding.groupsContainer, false)
                bindCard(card, item, isUrgent)
                binding.groupsContainer.addView(card.root, LinearLayout.LayoutParams(
                    LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT
                ).apply { bottomMargin = dp(10) })
            }

            // group spacing (24 total: 10 already from last card)
            binding.groupsContainer.addView(View(this), LinearLayout.LayoutParams(0, dp(14)))
        }
    }

    private fun bindCard(card: ItemEatFirstCardBinding, item: FoodItem, isUrgent: Boolean) {
        val fresh = item.freshness

        (card.efStripe.background.mutate() as GradientDrawable).setColor(
            ContextCompat.getColor(
                this,
                if (isUrgent) R.color.color_accent_red else R.color.color_accent_orange,
            )
        )

        val illRes = Illustrations.res(item.illustration)
        if (illRes != null) {
            card.efIllustration.visibility = View.VISIBLE
            card.efIcon.visibility = View.GONE
            card.efIllustration.setImageResource(illRes)
        } else {
            card.efIllustration.visibility = View.GONE
            card.efIcon.visibility = View.VISIBLE
            card.efIcon.setIcon(item.icon)
        }

        card.efName.text = item.name
        card.efQty.text = item.quantity
        card.efBar.bind(fresh.level, fresh.daysLeft, fresh.expiredDays)
        card.efLabel.text = fresh.expiryLabel
        card.efLabel.setTextColor(
            ContextCompat.getColor(this, if (fresh.level == "expired") R.color.red_700 else R.color.color_text_tertiary)
        )

        card.efBody.setOnClickListener {
            FoodDetailSheet.newInstance(item.id) { render() }
                .show(supportFragmentManager, "food_detail")
        }
        Press.apply(card.btnConsume)
        card.btnConsume.setOnClickListener {
            InventoryDao(this).consume(item.id)
            render()
        }
    }

    private fun dp(v: Int): Int =
        TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, v.toFloat(), resources.displayMetrics).toInt()
}

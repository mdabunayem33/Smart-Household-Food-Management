package com.freshkeep.app.fragments

import android.content.Intent
import android.graphics.drawable.GradientDrawable
import android.os.Bundle
import android.util.TypedValue
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.LinearLayout
import android.widget.TextView
import androidx.core.content.ContextCompat
import androidx.core.graphics.drawable.DrawableCompat
import androidx.fragment.app.Fragment
import com.freshkeep.app.R
import com.freshkeep.app.activities.EatFirstActivity
import com.freshkeep.app.activities.MainActivity
import com.freshkeep.app.databinding.FragmentHomeBinding
import com.freshkeep.app.databinding.ItemFoodCardBinding
import com.freshkeep.app.databinding.ItemRecentRowBinding
import com.freshkeep.app.db.InventoryDao
import com.freshkeep.app.db.SettingsDao
import com.freshkeep.app.db.ShoppingDao
import com.freshkeep.app.models.FoodItem
import com.freshkeep.app.sheets.FoodDetailSheet
import com.freshkeep.app.utils.FoodCardBinder
import com.freshkeep.app.views.Illustrations
import com.freshkeep.app.views.Press

/** Home.jsx — hero stats, smart insight, expiring soon, recently added. */
class HomeFragment : Fragment() {

    private var _binding: FragmentHomeBinding? = null
    private val binding get() = _binding!!

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View {
        _binding = FragmentHomeBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onResume() {
        super.onResume()
        render()
    }

    private fun main(): MainActivity = requireActivity() as MainActivity

    private fun render() {
        val ctx = requireContext()
        val inventory = InventoryDao(ctx).getAll()
        val settings = SettingsDao(ctx)
        val shopping = ShoppingDao(ctx)

        // ----- greeting — time of day only, no user name -----
        binding.greetingText.text = greeting()

        // ----- insight card — dynamic message from the user's SQLite data -----
        val analytics = com.freshkeep.app.db.AnalyticsDao(ctx)
        val monthly = analytics.monthlyInsight()
        val expiredCount = inventory.count { it.freshnessLevel == "expired" }
        val expiringCount = inventory.count { it.freshnessLevel == "soon" } // within 3 days

        data class Variant(val icon: String, val title: String, val subtitle: String, val fg: Int, val dot: Int)
        // Subtitles stay short — this pill is ~50dp wide inside, so full
        // sentences wrapped into a tall block and forced the card wide.
        val v = when {
            inventory.isEmpty() -> Variant(
                "insights", getString(R.string.insight_get_started),
                getString(R.string.insight_add_first_item), R.color.blue_700, R.color.blue_500,
            )
            expiredCount > 0 -> Variant(
                "warning", getString(R.string.insight_reminder),
                getString(R.string.insight_expired_items), R.color.orange_700, R.color.orange_500,
            )
            expiringCount > 0 -> Variant(
                "warning", getString(R.string.insight_reminder),
                getString(R.string.insight_expiring_soon), R.color.orange_700, R.color.orange_500,
            )
            monthly.type == "success" -> Variant(
                "eco", getString(R.string.insight_great_job),
                getString(R.string.insight_waste_down, monthly.pct), R.color.green_700, R.color.color_primary,
            )
            analytics.actionsToday() >= 3 -> Variant(
                "eco", getString(R.string.insight_great_job),
                getString(R.string.insight_keep_going), R.color.green_700, R.color.color_primary,
            )
            else -> Variant(
                "eco", getString(R.string.insight_looking_good),
                getString(R.string.insight_all_fresh), R.color.green_700, R.color.color_primary,
            )
        }
        binding.insightIcon.setIcon(v.icon)
        binding.insightTitle.text = v.title
        binding.insightTitle.setTextColor(ContextCompat.getColor(ctx, v.fg))
        binding.insightSubtitle.text = v.subtitle
        val dotBg = DrawableCompat.wrap(binding.insightDot.background.mutate())
        DrawableCompat.setTint(dotBg, ContextCompat.getColor(ctx, v.dot))
        binding.insightDot.background = dotBg
        binding.insightCard.setOnClickListener { main().switchTab("analytics") }
        // entrance: opacity/scale 0.9 → 1 (320ms soft-out)
        binding.insightCard.alpha = 0f
        binding.insightCard.scaleX = 0.9f
        binding.insightCard.scaleY = 0.9f
        binding.insightCard.animate().alpha(1f).scaleX(1f).scaleY(1f)
            .setStartDelay(60).setDuration(320)
            .setInterpolator(android.view.animation.AnimationUtils.loadInterpolator(ctx, R.interpolator.ease_out_soft))
            .start()

        // ----- hero stats -----
        val eatFirstCount = inventory.count { it.daysLeft <= 7 }
        val toBuy = shopping.activeItems(inventory, settings.shopFrequency)

        bindStat(
            binding.statStock.root, "inventory_2",
            getString(R.string.home_items, inventory.size), getString(R.string.home_in_stock),
        ) { main().switchTab("inventory") }
        bindStat(
            binding.statEatFirst.root, "restaurant",
            getString(R.string.home_items, eatFirstCount), getString(R.string.home_eat_first),
        ) {
            startActivity(Intent(ctx, EatFirstActivity::class.java))
            requireActivity().overridePendingTransition(R.anim.screen_fade_up, R.anim.fade_out)
        }
        bindStat(
            binding.statToBuy.root, "shopping_cart",
            getString(R.string.home_items, toBuy.size), getString(R.string.home_to_buy),
        ) { main().switchTab("shopping") }

        // ----- expiring soon (soon|expired, expired first, top 3) -----
        val expiringSoon = inventory
            .filter { it.freshnessLevel == "soon" || it.freshnessLevel == "expired" }
            .sortedBy { if (it.freshnessLevel == "expired") 0 else 1 }
            .take(3)

        binding.expiringContainer.removeAllViews()
        if (expiringSoon.isEmpty()) {
            val empty = TextView(ctx).apply {
                text = getString(R.string.home_nothing_expiring)
                setPadding(dp(20), dp(20), dp(20), dp(20))
                setBackgroundResource(R.drawable.bg_primary_surface_lg)
                setTextColor(ContextCompat.getColor(ctx, R.color.color_primary_press))
                typeface = androidx.core.content.res.ResourcesCompat.getFont(ctx, R.font.nunito_medium)
                setTextSize(TypedValue.COMPLEX_UNIT_SP, 15f)
            }
            binding.expiringContainer.addView(empty)
        } else {
            expiringSoon.forEachIndexed { i, item ->
                val card = ItemFoodCardBinding.inflate(layoutInflater, binding.expiringContainer, false)
                FoodCardBinder.bind(card, item) { openDetail(item) }
                if (i > 0) (card.root.layoutParams as LinearLayout.LayoutParams).topMargin = dp(10)
                binding.expiringContainer.addView(card.root)
            }
        }
        binding.seeAllExpiring.setOnClickListener { main().switchTab("inventory") }

        // ----- recently added (top 3 by addedDate) -----
        val recent = inventory.sortedByDescending { it.addedDate }.take(3)
        binding.recentContainer.removeAllViews()
        if (recent.isEmpty()) {
            val empty = layoutInflater.inflate(R.layout.view_recent_empty, binding.recentContainer, false)
            binding.recentContainer.addView(empty)
        } else {
            recent.forEachIndexed { i, item ->
                val row = ItemRecentRowBinding.inflate(layoutInflater, binding.recentContainer, false)
                val illRes = Illustrations.res(item.illustration)
                if (illRes != null) {
                    row.recentIllustration.visibility = View.VISIBLE
                    row.recentIcon.visibility = View.GONE
                    row.recentIllustration.setImageResource(illRes)
                } else {
                    row.recentIllustration.visibility = View.GONE
                    row.recentIcon.visibility = View.VISIBLE
                    row.recentIcon.setIcon(item.icon)
                }
                row.recentName.text = item.name
                row.root.setOnClickListener { openDetail(item) }
                if (i > 0) (row.root.layoutParams as LinearLayout.LayoutParams).topMargin = dp(8)
                binding.recentContainer.addView(row.root)
            }
        }
        binding.seeAllRecent.setOnClickListener { main().switchTab("inventory") }
    }

    /**
     * Time-of-day greeting from the device clock (5–11 / 12–16 / 17–20 / else).
     * Icon leads the text and renders 20% larger than the words via a span.
     */
    private fun greeting(): CharSequence {
        val (icon, text) = when (java.util.Calendar.getInstance().get(java.util.Calendar.HOUR_OF_DAY)) {
            in 5..11 -> "☀️" to getString(R.string.greet_morning)
            in 12..16 -> "🌤️" to getString(R.string.greet_afternoon)
            in 17..20 -> "🌇" to getString(R.string.greet_evening)
            else -> "🌙" to getString(R.string.greet_night)
        }
        return android.text.SpannableString("$icon $text").apply {
            setSpan(
                android.text.style.RelativeSizeSpan(1.2f),
                0, icon.length,
                android.text.Spanned.SPAN_EXCLUSIVE_EXCLUSIVE,
            )
        }
    }

    private fun bindStat(root: View, icon: String, value: String, label: String, onClick: () -> Unit) {
        root.findViewById<com.freshkeep.app.views.IconView>(R.id.statIcon).setIcon(icon)
        root.findViewById<TextView>(R.id.statValue).text = value
        root.findViewById<TextView>(R.id.statLabel).text = label
        Press.apply(root)
        root.setOnClickListener { onClick() }
    }

    private fun openDetail(item: FoodItem) {
        FoodDetailSheet.newInstance(item.id) { render() }
            .show(childFragmentManager, "food_detail")
    }

    private fun dp(v: Int): Int =
        TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, v.toFloat(), resources.displayMetrics).toInt()

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}

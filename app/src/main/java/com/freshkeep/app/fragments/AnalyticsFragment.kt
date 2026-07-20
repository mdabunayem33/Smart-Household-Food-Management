package com.freshkeep.app.fragments

import android.graphics.drawable.GradientDrawable
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.PopupWindow
import android.widget.TextView
import android.widget.Toast
import androidx.core.content.ContextCompat
import androidx.fragment.app.Fragment
import com.freshkeep.app.R
import com.freshkeep.app.databinding.FragmentAnalyticsBinding
import com.freshkeep.app.databinding.ItemLegendRowBinding
import com.freshkeep.app.db.AnalyticsDao
import com.freshkeep.app.utils.AnalyticsData
import com.freshkeep.app.views.Press

/** Analytics.jsx — filter dropdown, waste bar chart, dashboard pie + legend. */
class AnalyticsFragment : Fragment() {

    private var _binding: FragmentAnalyticsBinding? = null
    private val binding get() = _binding!!
    private var filter = "This Month"

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View {
        _binding = FragmentAnalyticsBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        binding.btnFilter.setOnClickListener { showFilterDropdown() }
        Press.apply(binding.insightBadge)
    }

    override fun onResume() {
        super.onResume()
        // Everything recomputes from the user's SQLite rows on every resume,
        // so the page refreshes automatically after any data change.
        // One DAO for the whole pass — it reads the waste history once.
        val dao = AnalyticsDao(requireContext())
        renderInsightBadge(dao)
        render(dao)
    }

    private fun renderInsightBadge(dao: AnalyticsDao) {
        val monthly = dao.monthlyInsight()
        val (bgRes, fg) = when (monthly.type) {
            "success" -> R.drawable.bg_pill_primary_surface to R.color.green_700
            "warning" -> R.drawable.bg_pill_reason to R.color.orange_700
            else -> R.drawable.bg_pill_section to R.color.blue_700
        }
        binding.insightBadge.setBackgroundResource(bgRes)
        if (monthly.type == "neutral") {
            (binding.insightBadge.background.mutate() as? GradientDrawable)
                ?.setColor(ContextCompat.getColor(requireContext(), R.color.color_accent_blue_surface))
        }
        binding.insightBadgeIcon.setIcon(monthly.icon)
        binding.insightBadgeIcon.setTextColor(ContextCompat.getColor(requireContext(), fg))
        binding.insightBadgeText.text = "${monthly.sign}${monthly.pct}%"
        binding.insightBadgeText.setTextColor(ContextCompat.getColor(requireContext(), fg))
        binding.insightBadge.setOnClickListener {
            Toast.makeText(requireContext(), monthly.tooltip, Toast.LENGTH_LONG).show()
        }
    }

    private fun colorFor(key: String): Int = when (key) {
        "primary" -> R.color.color_primary
        "blue" -> R.color.blue_500
        "orange" -> R.color.orange_500
        "aging" -> R.color.color_aging
        else -> R.color.red_500
    }

    private fun render(dao: AnalyticsDao = AnalyticsDao(requireContext())) {
        binding.filterLabel.text = getString(AnalyticsData.filterLabelRes(filter))
        val dashboard = dao.dashboard(filter)
        val waste = dao.waste(filter)
        val maxVal = dao.maxWaste()
        val totalWaste = waste.sum()
        val avgWaste = totalWaste / waste.size

        binding.barChart.setData(waste, maxVal)
        binding.totalWaste.text = String.format(java.util.Locale.US, "%.1f kg", totalWaste)
        binding.avgWaste.text = String.format(java.util.Locale.US, "%.1f kg", avgWaste)

        binding.pieChart.setData(dashboard.map { PieChartSlice(it) })

        binding.legendContainer.removeAllViews()
        for (d in dashboard) {
            val row = ItemLegendRowBinding.inflate(layoutInflater, binding.legendContainer, false)
            (row.legendDot.background.mutate() as GradientDrawable)
                .setColor(ContextCompat.getColor(requireContext(), colorFor(d.colorKey)))
            row.legendIcon.setIcon(d.icon)
            row.legendLabel.text = getString(AnalyticsData.sliceLabelRes(d.key))
            row.legendCount.text = getString(R.string.analytics_items, d.count)
            row.legendPct.text = "${d.pct}%"
            binding.legendContainer.addView(row.root)
        }
    }

    @Suppress("FunctionName")
    private fun PieChartSlice(s: AnalyticsDao.SliceValue) =
        com.freshkeep.app.views.PieChartView.Slice(s.pct.toFloat(), colorFor(s.colorKey))

    /** Filter dropdown card (elevated, radius-lg, right-aligned). */
    private fun showFilterDropdown() {
        val ctx = requireContext()
        val container = android.widget.LinearLayout(ctx).apply {
            orientation = android.widget.LinearLayout.VERTICAL
            setBackgroundResource(R.drawable.bg_card_lg)
            elevation = 16f
            setPadding(dp(8), dp(8), dp(8), dp(8))
            minimumWidth = dp(170)
        }
        val popup = PopupWindow(container, ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT, true)
        popup.elevation = dp(16).toFloat()

        for (f in AnalyticsData.FILTERS) {
            val selected = f == filter
            val row = TextView(ctx).apply {
                text = getString(AnalyticsData.filterLabelRes(f))
                typeface = androidx.core.content.res.ResourcesCompat.getFont(ctx, R.font.nunito_medium)
                textSize = 15f
                setPadding(dp(12), dp(10), dp(12), dp(10))
                setTextColor(
                    ContextCompat.getColor(ctx, if (selected) R.color.color_primary_press else R.color.color_text_primary)
                )
                if (selected) setBackgroundResource(R.drawable.bg_primary_surface_md)
                setOnClickListener {
                    filter = f
                    popup.dismiss()
                    render()
                }
            }
            container.addView(
                row,
                android.widget.LinearLayout.LayoutParams(
                    android.widget.LinearLayout.LayoutParams.MATCH_PARENT,
                    android.widget.LinearLayout.LayoutParams.WRAP_CONTENT,
                )
            )
        }
        popup.showAsDropDown(binding.btnFilter, 0, dp(4), android.view.Gravity.END)
    }

    private fun dp(v: Int): Int =
        (v * resources.displayMetrics.density).toInt()

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}

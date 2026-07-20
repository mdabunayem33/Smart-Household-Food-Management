package com.freshkeep.app.utils

/**
 * Static Analytics screen metadata from Analytics.jsx — filter labels and the
 * five dashboard slices (label / icon / color order). All VALUES are computed
 * live per user from SQLite by AnalyticsDao; nothing here is data.
 */
object AnalyticsData {

    /** Stable keys — also used to select date ranges; never shown raw to the user. */
    val FILTERS = listOf("This Month", "Last Month", "Last 3 Months", "Last 6 Months", "This Year")

    /** Localized label for a filter key. */
    fun filterLabelRes(key: String): Int = when (key) {
        "Last Month" -> com.freshkeep.app.R.string.filter_last_month
        "Last 3 Months" -> com.freshkeep.app.R.string.filter_3_months
        "Last 6 Months" -> com.freshkeep.app.R.string.filter_6_months
        "This Year" -> com.freshkeep.app.R.string.filter_this_year
        else -> com.freshkeep.app.R.string.filter_this_month
    }

    /** Localized label for a dashboard slice key. */
    fun sliceLabelRes(key: String): Int = when (key) {
        "frozen" -> com.freshkeep.app.R.string.slice_frozen
        "pantry" -> com.freshkeep.app.R.string.slice_pantry
        "expiring" -> com.freshkeep.app.R.string.slice_expiring
        "wasted" -> com.freshkeep.app.R.string.slice_wasted
        else -> com.freshkeep.app.R.string.slice_fresh
    }

    data class SliceMeta(val key: String, val label: String, val icon: String, val colorKey: String)

    /** DASHBOARD_DATA slice order/colors from Analytics.jsx. */
    val SLICES = listOf(
        SliceMeta("fresh", "Fresh Food", "nutrition", "primary"),
        SliceMeta("frozen", "Frozen Food", "ac_unit", "blue"),
        SliceMeta("pantry", "Pantry Items", "inventory_2", "orange"),
        SliceMeta("expiring", "Expiring Soon", "schedule", "aging"),
        SliceMeta("wasted", "Wasted", "delete", "red"),
    )
}

package com.freshkeep.app.db

import android.content.Context
import com.freshkeep.app.utils.AnalyticsData
import com.freshkeep.app.utils.ExpiryUtils
import com.freshkeep.app.utils.QuantityFormat
import java.util.Calendar
import java.util.Date
import kotlin.math.abs
import kotlin.math.roundToInt

/**
 * Real per-user analytics computed live from SQLite (no demo data).
 * Every query filters by the logged-in Firebase UID; a fresh profile has no
 * rows, so every chart and count renders as zero.
 */
class AnalyticsDao(context: Context) {

    private val appContext = context.applicationContext
    private val helper = FreshKeepDbHelper.get(context)
    private val settings = SettingsDao(context)
    private val uid: String get() = settings.currentUid

    /** Categories counted as "Pantry Items" in the dashboard pie. */
    private val pantryCategories = setOf("rice", "spices", "snacks", "drinks", "others")

    /** Estimated kg for one quantity string ("1 kg", "500 g", "6 pcs", …). */
    private fun kgOf(quantity: String?): Double {
        val p = QuantityFormat.parse(quantity)
        return when (p.unit) {
            "Kg" -> p.num
            "Gram" -> p.num / 1000.0
            "Liter" -> p.num           // ~1 kg per liter
            "Bottle" -> p.num * 1.0    // ~1 kg per bottle
            else -> p.num * 0.5        // Piece / Packet estimate
        }
    }

    data class SliceValue(
        val key: String, val label: String, val icon: String, val colorKey: String,
        val count: Int, val pct: Int,
    )

    data class MonthlyInsight(val type: String, val icon: String, val sign: String, val pct: Int, val tooltip: String)

    // ---------- period ranges ----------

    private fun startOfMonth(offsetMonths: Int): Calendar =
        Calendar.getInstance().apply {
            add(Calendar.MONTH, offsetMonths)
            set(Calendar.DAY_OF_MONTH, 1)
            set(Calendar.HOUR_OF_DAY, 0); set(Calendar.MINUTE, 0)
            set(Calendar.SECOND, 0); set(Calendar.MILLISECOND, 0)
        }

    /** [start, end) date range for a filter label. */
    private fun range(filter: String): Pair<Date, Date> = when (filter) {
        "Last Month" -> startOfMonth(-1).time to startOfMonth(0).time
        "Last 3 Months" -> startOfMonth(-2).time to startOfMonth(1).time
        "Last 6 Months" -> startOfMonth(-5).time to startOfMonth(1).time
        "This Year" -> {
            val jan1 = Calendar.getInstance().apply {
                set(Calendar.MONTH, Calendar.JANUARY); set(Calendar.DAY_OF_MONTH, 1)
                set(Calendar.HOUR_OF_DAY, 0); set(Calendar.MINUTE, 0)
                set(Calendar.SECOND, 0); set(Calendar.MILLISECOND, 0)
            }
            val nextJan1 = (jan1.clone() as Calendar).apply { add(Calendar.YEAR, 1) }
            jan1.time to nextJan1.time
        }
        else -> startOfMonth(0).time to startOfMonth(1).time // This Month
    }

    // ---------- source rows ----------

    private data class HistoryRow(val quantity: String, val statusDate: Date)

    /**
     * Discarded rows for this user (waste history), always UID-filtered.
     *
     * Read once per DAO instance: a single Analytics render asks for the
     * dashboard, the waste series, the all-filter maximum and the monthly
     * insight, which previously issued the same query nine times. Callers
     * create a short-lived DAO per render, so this stays fresh.
     */
    private val discarded: List<HistoryRow> by lazy {
        val list = mutableListOf<HistoryRow>()
        helper.readableDatabase.rawQuery(
            "SELECT quantity, status_date FROM inventory WHERE user_uid = ? AND status = 'discarded' AND status_date IS NOT NULL",
            arrayOf(uid),
        ).use { c ->
            while (c.moveToNext()) {
                list.add(HistoryRow(c.getString(0), ExpiryUtils.parseIso(c.getString(1))))
            }
        }
        list
    }

    private fun discardedIn(start: Date, end: Date): List<HistoryRow> =
        discarded.filter { it.statusDate >= start && it.statusDate < end }

    // ---------- dashboard pie ----------

    /**
     * Partition of the user's food into the design's five buckets:
     * active items → expired counts as wasted, then expiring / frozen /
     * pantry / fresh; plus items discarded within the filter period.
     */
    fun dashboard(filter: String): List<SliceValue> {
        val counts = linkedMapOf("fresh" to 0, "frozen" to 0, "pantry" to 0, "expiring" to 0, "wasted" to 0)

        activeRows().forEach { (category, expiryIso) ->
            val level = ExpiryUtils.deriveFreshness(expiryIso).level
            val bucket = when {
                level == "expired" -> "wasted"
                level == "soon" -> "expiring"
                category == "frozen" -> "frozen"
                category in pantryCategories -> "pantry"
                else -> "fresh"
            }
            counts[bucket] = counts[bucket]!! + 1
        }

        val (start, end) = range(filter)
        counts["wasted"] = counts["wasted"]!! + discardedIn(start, end).size

        val total = counts.values.sum()
        val pcts = percentages(counts.values.toList(), total)

        return AnalyticsData.SLICES.mapIndexed { i, meta ->
            SliceValue(meta.key, meta.label, meta.icon, meta.colorKey, counts[meta.key]!!, pcts[i])
        }
    }

    /** UID-scoped (category, expiry) pairs of active inventory rows. */
    private fun activeRows(): List<Pair<String, String>> {
        val list = mutableListOf<Pair<String, String>>()
        helper.readableDatabase.rawQuery(
            "SELECT category_key, expiry_date FROM inventory WHERE user_uid = ? AND status = 'active'",
            arrayOf(uid),
        ).use { c ->
            while (c.moveToNext()) list.add(c.getString(0) to c.getString(1))
        }
        return list
    }

    /** Largest-remainder rounding so shown percentages sum to exactly 100. */
    private fun percentages(counts: List<Int>, total: Int): List<Int> {
        if (total == 0) return counts.map { 0 }
        val exact = counts.map { it * 100.0 / total }
        val floors = exact.map { it.toInt() }.toMutableList()
        var remainder = 100 - floors.sum()
        exact.mapIndexed { i, v -> i to (v - floors[i]) }
            .sortedByDescending { it.second }
            .take(remainder.coerceAtLeast(0))
            .forEach { floors[it.first] = floors[it.first] + 1 }
        return floors
    }

    // ---------- waste bar chart ----------

    /** Four equal time buckets across the filter period, in estimated kg. */
    fun waste(filter: String): List<Double> {
        val (start, end) = range(filter)
        val span = end.time - start.time
        val bucketMs = span / 4
        val sums = DoubleArray(4)
        for (row in discardedIn(start, end)) {
            val idx = (((row.statusDate.time - start.time) / bucketMs).toInt()).coerceIn(0, 3)
            sums[idx] += kgOf(row.quantity)
        }
        return sums.map { (it * 10).roundToInt() / 10.0 }
    }

    /** Global max across all filters (web scales all bar charts alike); ≥ a small floor to avoid div-by-zero. */
    fun maxWaste(): Double =
        AnalyticsData.FILTERS.maxOf { waste(it).max() }.coerceAtLeast(1.0)

    /**
     * How many inventory actions the user did today (items added, consumed,
     * or discarded on the local calendar day). UID-scoped like everything else.
     */
    fun actionsToday(): Int {
        val today = Calendar.getInstance()
        fun isToday(iso: String?): Boolean {
            if (iso == null) return false
            val cal = Calendar.getInstance().apply { time = ExpiryUtils.parseIso(iso) }
            return cal.get(Calendar.YEAR) == today.get(Calendar.YEAR) &&
                cal.get(Calendar.DAY_OF_YEAR) == today.get(Calendar.DAY_OF_YEAR)
        }

        var count = 0
        helper.readableDatabase.rawQuery(
            "SELECT added_date, status_date FROM inventory WHERE user_uid = ?",
            arrayOf(uid),
        ).use { c ->
            while (c.moveToNext()) {
                if (isToday(c.getString(0))) count++
                if (isToday(if (c.isNull(1)) null else c.getString(1))) count++
            }
        }
        return count
    }

    // ---------- monthly insight badge ----------

    /** computeMonthlyInsight() — real This Month vs Last Month waste totals. */
    fun monthlyInsight(): MonthlyInsight {
        val current = waste("This Month").sum()
        val previous = waste("Last Month").sum()
        val rawPct = if (previous == 0.0) 0.0 else ((current - previous) / previous) * 100
        val pct = rawPct.roundToInt()

        return when {
            abs(pct) < 3 -> MonthlyInsight(
                "neutral", "info", "≈", 0,
                appContext.getString(com.freshkeep.app.R.string.insight_same),
            )
            pct < 0 -> MonthlyInsight(
                "success", "check_circle", "-", abs(pct),
                appContext.getString(com.freshkeep.app.R.string.insight_decreased, abs(pct)),
            )
            else -> MonthlyInsight(
                "warning", "warning", "+", pct,
                appContext.getString(com.freshkeep.app.R.string.insight_increased, pct),
            )
        }
    }
}

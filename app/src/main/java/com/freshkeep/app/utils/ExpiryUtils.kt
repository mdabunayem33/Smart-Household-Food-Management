package com.freshkeep.app.utils

import java.text.SimpleDateFormat
import java.util.Calendar
import java.util.Date
import java.util.Locale
import java.util.TimeZone
import kotlin.math.ceil
import kotlin.math.floor
import kotlin.math.max
import kotlin.math.min

/**
 * Port of ui_kits/freshkeep-app/expiry-utils.js + App.jsx deriveFreshness().
 * All date strings are ISO-8601 UTC ("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"), exactly
 * like JavaScript's Date.toISOString().
 */
object ExpiryUtils {

    private const val MS_PER_DAY = 86_400_000L

    data class Freshness(
        val level: String,      // fresh | aging | soon | expired
        val daysLeft: Int,
        val expiredDays: Int,
        val expiryLabel: String,
    )

    data class Progress(
        val expired: Boolean,
        val fillPct: Float,
        val colorAttr: String,  // fresh | aging | soon | expired (token name)
        val label: String,
    )

    private fun isoFormat(): SimpleDateFormat =
        SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", Locale.US).apply {
            timeZone = TimeZone.getTimeZone("UTC")
        }

    fun nowIso(): String = isoFormat().format(Date())

    fun isoDaysFromNow(days: Int): String {
        val cal = Calendar.getInstance()
        cal.add(Calendar.DAY_OF_YEAR, days)
        return isoFormat().format(cal.time)
    }

    fun parseIso(iso: String): Date = try {
        isoFormat().parse(iso) ?: Date()
    } catch (e: Exception) {
        // tolerate "yyyy-MM-dd" and other partial forms
        try {
            SimpleDateFormat("yyyy-MM-dd", Locale.US).parse(iso.take(10)) ?: Date()
        } catch (e2: Exception) {
            Date()
        }
    }

    /** Math.ceil((expiry - now) / 86400000) — same as the web app. */
    fun daysUntil(expiryIso: String): Int {
        val diff = parseIso(expiryIso).time - System.currentTimeMillis()
        return ceil(diff.toDouble() / MS_PER_DAY).toInt()
    }

    /**
     * Localized version of the freshness label — the strings inside
     * [deriveFreshness] stay English so existing logic/tests keep working;
     * anything user-visible should use this.
     */
    fun localizedLabel(context: android.content.Context, expiryIso: String): String {
        val remain = daysUntil(expiryIso)
        return when {
            remain < 0 -> {
                val past = -remain
                if (past == 1) context.getString(com.freshkeep.app.R.string.expiry_yesterday)
                else context.getString(com.freshkeep.app.R.string.expiry_days_ago, past)
            }
            remain == 0 -> context.getString(com.freshkeep.app.R.string.expiry_today)
            remain == 1 -> context.getString(com.freshkeep.app.R.string.expiry_tomorrow)
            remain <= 7 -> context.getString(com.freshkeep.app.R.string.expiry_in_days, remain)
            else -> context.getString(com.freshkeep.app.R.string.expiry_fresh_days, remain)
        }
    }

    /** Port of App.jsx deriveFreshness(expiryDateStr). */
    fun deriveFreshness(expiryIso: String): Freshness {
        val remain = daysUntil(expiryIso)
        if (remain < 0) {
            val past = -remain
            val label = if (past == 1) "Expired yesterday" else "Expired $past days ago"
            return Freshness("expired", remain, past, label)
        }
        return when {
            remain == 0 -> Freshness("soon", 0, 0, "Expires today")
            remain == 1 -> Freshness("soon", 1, 0, "Expires tomorrow")
            remain <= 3 -> Freshness("soon", remain, 0, "Expires in $remain days")
            remain <= 7 -> Freshness("aging", remain, 0, "Expires in $remain days")
            else -> Freshness("fresh", remain, 0, "Fresh for $remain+ days")
        }
    }

    /**
     * Port of fkExpiryProgress(addedDate, expiryDate) — day-band based fill:
     * >7d green ~95%, 4–7d yellow 60–80%, 2–3d orange 35–48%, 1d red ~15%,
     * today red ~8%; expired items fill right-to-left in red.
     */
    fun expiryProgress(expiryIso: String): Progress {
        val now = System.currentTimeMillis()
        val expiry = parseIso(expiryIso).time
        val remainingDays = ceil((expiry - now).toDouble() / MS_PER_DAY).toInt()

        if (remainingDays < 0) {
            val daysExpired = max(1.0, floor((now - expiry).toDouble() / MS_PER_DAY)).toInt()
            val capDays = min(daysExpired, 14)
            val fillPct = min(100f, 15f + (capDays / 14f) * 85f)
            val label = if (daysExpired == 1) "Expired yesterday" else "Expired $daysExpired days ago"
            return Progress(true, fillPct, "expired", label)
        }

        val fillPct: Float
        val color: String
        when {
            remainingDays > 7 -> { fillPct = 95f; color = "fresh" }
            remainingDays >= 4 -> { fillPct = 60f + ((remainingDays - 4) / 3f) * 20f; color = "aging" }
            remainingDays >= 2 -> { fillPct = 35f + (remainingDays - 2) * 13f; color = "soon" }
            remainingDays == 1 -> { fillPct = 15f; color = "expired" }
            else -> { fillPct = 8f; color = "expired" }
        }
        val label = when (remainingDays) {
            0 -> "Expires today"
            1 -> "Expires tomorrow"
            else -> "Expires in $remainingDays days"
        }
        return Progress(false, fillPct, color, label)
    }

    /** "1 January 2026" style (EditProduct expiry summary). */
    fun formatLongDate(date: Date): String =
        SimpleDateFormat("d MMMM yyyy", Locale.US).format(date)

    /** "Monday, 05 January 2026" (Shopping next-date banner, en-GB style). */
    fun formatFullDate(date: Date): String =
        SimpleDateFormat("EEEE, dd MMMM yyyy", Locale.UK).format(date)
}

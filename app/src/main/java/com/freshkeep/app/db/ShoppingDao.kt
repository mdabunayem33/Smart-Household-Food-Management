package com.freshkeep.app.db

import android.content.ContentValues
import android.content.Context
import com.freshkeep.app.models.FoodItem
import com.freshkeep.app.models.ShoppingItem
import com.freshkeep.app.utils.ExpiryUtils
import org.json.JSONArray
import org.json.JSONObject
import java.util.Calendar
import java.util.Date

/**
 * Smart Shopping List — port of Shopping.jsx.
 * Auto entries derive from inventory (low / expired / expiring before next trip);
 * manual entries live in the shopping_items table; purchased / removed / qty
 * override state mirrors the web localStorage keys inside the settings table.
 */
class ShoppingDao(context: Context) {

    private val appContext = context.applicationContext
    private val helper = FreshKeepDbHelper.get(context)
    private val settings = SettingsDao(context)
    private val uid: String get() = settings.currentUid

    companion object {
        const val KEY_PURCHASED = "shop_purchased"
        const val KEY_REMOVED = "shop_removed"
        const val KEY_QTY = "shop_qty"

        data class FreqOption(val key: String, val label: String, val days: Int, val emoji: String, val desc: String)

        val FREQ_OPTIONS = listOf(
            FreqOption("weekly", "Weekly", 7, "📅", "I usually shop once every week."),
            FreqOption("biweekly", "Every 15 Days", 15, "🗓", "I usually shop every two weeks."),
            FreqOption("monthly", "Monthly", 30, "📆", "I usually shop once every month."),
        )

        fun freqDays(key: String?): Int = FREQ_OPTIONS.firstOrNull { it.key == key }?.days ?: 7

        /** Localized label — string resources, not the English defaults above. */
        fun freqLabel(context: android.content.Context, key: String?): String =
            context.getString(freqLabelRes(key))

        fun freqLabelRes(key: String?): Int = when (key) {
            "biweekly" -> com.freshkeep.app.R.string.freq_biweekly
            "monthly" -> com.freshkeep.app.R.string.freq_monthly
            else -> com.freshkeep.app.R.string.freq_weekly
        }

        fun freqDescRes(key: String?): Int = when (key) {
            "biweekly" -> com.freshkeep.app.R.string.freq_biweekly_desc
            "monthly" -> com.freshkeep.app.R.string.freq_monthly_desc
            else -> com.freshkeep.app.R.string.freq_weekly_desc
        }
    }

    // ---------- persisted key sets (mirrors localStorage JSON) ----------

    private fun getKeySet(settingKey: String): MutableSet<String> {
        val raw = settings.get(settingKey) ?: return mutableSetOf()
        return try {
            val arr = JSONArray(raw)
            (0 until arr.length()).mapTo(mutableSetOf()) { arr.getString(it) }
        } catch (e: Exception) {
            mutableSetOf()
        }
    }

    private fun putKeySet(settingKey: String, set: Set<String>) {
        settings.put(settingKey, JSONArray(set.toList()).toString())
    }

    fun purchasedKeys(): MutableSet<String> = getKeySet(KEY_PURCHASED)
    fun removedKeys(): MutableSet<String> = getKeySet(KEY_REMOVED)

    fun togglePurchased(key: String) {
        val set = purchasedKeys()
        if (!set.remove(key)) set.add(key)
        putKeySet(KEY_PURCHASED, set)
    }

    fun removeItem(key: String) {
        val set = removedKeys()
        set.add(key)
        putKeySet(KEY_REMOVED, set)
    }

    private fun qtyOverrides(): MutableMap<String, String> {
        val raw = settings.get(KEY_QTY) ?: return mutableMapOf()
        return try {
            val obj = JSONObject(raw)
            obj.keys().asSequence().associateWithTo(mutableMapOf()) { obj.getString(it) }
        } catch (e: Exception) {
            mutableMapOf()
        }
    }

    fun saveQtyOverride(key: String, quantity: String) {
        val map = qtyOverrides()
        map[key] = quantity
        settings.put(KEY_QTY, JSONObject(map as Map<String, String>).toString())
    }

    // ---------- manual items ----------

    private fun manualItems(): List<ShoppingItem> {
        val list = mutableListOf<ShoppingItem>()
        helper.readableDatabase.rawQuery(
            "SELECT id, name, category_key, quantity FROM shopping_items WHERE user_uid = ? ORDER BY id", arrayOf(uid),
        ).use { c ->
            while (c.moveToNext()) {
                val cat = c.getString(2)
                list.add(
                    ShoppingItem(
                        key = "manual-${c.getLong(0)}",
                        name = c.getString(1),
                        category = cat,
                        icon = iconForCategory(cat),
                        illustration = FreshKeepDbHelper.CATEGORY_ILLUSTRATION[cat],
                        quantity = c.getString(3),
                        reason = "",
                        source = "manual",
                    )
                )
            }
        }
        return list
    }

    private fun iconForCategory(key: String): String =
        FreshKeepDbHelper.BUILTIN_CATEGORIES.firstOrNull { it[0] == key }?.get(2) ?: "category"

    /** Add manual entry — skipped when name already present (web behavior). */
    fun addManual(name: String, category: String, quantity: String, inventory: List<FoodItem>) {
        if (manualItems().any { it.name == name } || inventory.any { it.name == name }) return
        val cv = ContentValues().apply {
            put("user_uid", uid)
            put("name", name)
            put("category_key", category)
            put("quantity", quantity)
            put("source", "manual")
            put("created_at", ExpiryUtils.nowIso())
        }
        helper.writableDatabase.insert("shopping_items", null, cv)
    }

    private fun clearManual() {
        helper.writableDatabase.delete("shopping_items", "user_uid = ?", arrayOf(uid))
    }

    // ---------- auto list (buildAutoShoppingList) ----------

    fun buildAutoList(inventory: List<FoodItem>, freqKey: String?): List<ShoppingItem> {
        val horizon = freqDays(freqKey)
        return inventory
            .filter { it.low || it.freshnessLevel == "expired" || it.daysLeft <= horizon }
            .map { i ->
                val reason = when {
                    i.freshnessLevel == "expired" -> appContext.getString(com.freshkeep.app.R.string.shopping_reason_out)
                    i.daysLeft <= horizon && !i.low -> appContext.getString(com.freshkeep.app.R.string.shopping_reason_expiring)
                    else -> appContext.getString(com.freshkeep.app.R.string.shopping_reason_low)
                }
                ShoppingItem(
                    key = "auto-${i.id}",
                    name = i.name,
                    category = i.category,
                    icon = i.icon,
                    illustration = i.illustration,
                    quantity = i.quantity,
                    reason = reason,
                    source = "auto",
                )
            }
    }

    /** Auto + manual, minus removed, with qty overrides applied. */
    fun allItems(inventory: List<FoodItem>, freqKey: String?): List<ShoppingItem> {
        val removed = removedKeys()
        val qty = qtyOverrides()
        return (buildAutoList(inventory, freqKey) + manualItems())
            .filter { it.key !in removed }
            .map { if (qty.containsKey(it.key)) it.copy(quantity = qty[it.key]!!) else it }
    }

    /** Active = not purchased, not removed — Home "To Buy" stat. */
    fun activeItems(inventory: List<FoodItem>, freqKey: String?): List<ShoppingItem> {
        val purchased = purchasedKeys()
        return allItems(inventory, freqKey).filter { it.key !in purchased }
    }

    // ---------- cycle completion ----------

    /**
     * When every item is purchased: record today as last shopping date and
     * clear the cycle (purchased / removed / qty / manual) — Shopping.jsx effect.
     */
    fun completeCycle() {
        val today = Calendar.getInstance().apply {
            set(Calendar.HOUR_OF_DAY, 0); set(Calendar.MINUTE, 0)
            set(Calendar.SECOND, 0); set(Calendar.MILLISECOND, 0)
        }
        settings.put(SettingsDao.KEY_LAST_SHOPPING_DATE, ExpiryUtils.run {
            java.text.SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", java.util.Locale.US)
                .apply { timeZone = java.util.TimeZone.getTimeZone("UTC") }
                .format(today.time)
        })
        putKeySet(KEY_PURCHASED, emptySet())
        putKeySet(KEY_REMOVED, emptySet())
        settings.put(KEY_QTY, "{}")
        clearManual()
    }

    /** Next shopping date = last shopping date (or today) + frequency days. */
    fun nextDate(freqKey: String?): Date {
        val lastIso = settings.get(SettingsDao.KEY_LAST_SHOPPING_DATE)
        val base = if (lastIso != null) ExpiryUtils.parseIso(lastIso) else Date()
        val cal = Calendar.getInstance().apply {
            time = base
            add(Calendar.DAY_OF_YEAR, freqDays(freqKey))
            set(Calendar.HOUR_OF_DAY, 0); set(Calendar.MINUTE, 0)
            set(Calendar.SECOND, 0); set(Calendar.MILLISECOND, 0)
        }
        return cal.time
    }
}

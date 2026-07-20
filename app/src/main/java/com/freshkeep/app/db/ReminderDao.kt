package com.freshkeep.app.db

import android.content.ContentValues
import android.content.Context
import android.database.sqlite.SQLiteDatabase
import org.json.JSONArray

/** Per-category reminder day preferences — port of App.jsx reminderPrefs state. */
class ReminderDao(context: Context) {

    private val helper = FreshKeepDbHelper.get(context)
    private val settings = SettingsDao(context)
    private val uid: String get() = settings.currentUid

    companion object {
        /** REMINDER_OPTIONS from Profile.jsx. */
        val OPTIONS = listOf(
            0 to "On Expiry Day",
            1 to "1 Day Before",
            2 to "2 Days Before",
            3 to "3 Days Before",
            5 to "5 Days Before",
            7 to "7 Days Before",
        )

        /** REMINDER_CATEGORIES from Profile.jsx — key, label, icon. */
        val CATEGORIES = listOf(
            Triple("vegetables", "Vegetables", "nutrition"),
            Triple("fruits", "Fruits", "eco"),
            Triple("dairy", "Dairy", "water_drop"),
            Triple("meatFish", "Meat & Fish", "set_meal"),
            Triple("packaged", "Packaged Foods", "inventory_2"),
            Triple("frozen", "Frozen Foods", "ac_unit"),
            Triple("beverages", "Beverages", "local_bar"),
        )

        fun labelFor(days: Int): String =
            OPTIONS.firstOrNull { it.first == days }?.second ?: "$days Days Before"
    }

    fun getAll(): Map<String, List<Int>> {
        val map = mutableMapOf<String, List<Int>>()
        helper.readableDatabase.rawQuery(
            "SELECT category_key, days_json FROM reminder_prefs WHERE user_uid = ?", arrayOf(uid),
        ).use { c ->
            while (c.moveToNext()) {
                val arr = try { JSONArray(c.getString(1)) } catch (e: Exception) { JSONArray("[1,3,7]") }
                map[c.getString(0)] = (0 until arr.length()).map { arr.getInt(it) }
            }
        }
        return map
    }

    fun get(categoryKey: String): List<Int> = getAll()[categoryKey] ?: listOf(1, 3, 7)

    fun set(categoryKey: String, days: List<Int>) {
        val cv = ContentValues().apply {
            put("user_uid", uid)
            put("category_key", categoryKey)
            put("days_json", JSONArray(days.sorted()).toString())
        }
        helper.writableDatabase.insertWithOnConflict("reminder_prefs", null, cv, SQLiteDatabase.CONFLICT_REPLACE)
    }
}

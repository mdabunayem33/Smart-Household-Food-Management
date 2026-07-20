package com.freshkeep.app.db

import android.content.ContentValues
import android.content.Context
import com.freshkeep.app.models.FoodItem
import com.freshkeep.app.utils.ExpiryUtils
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale

/**
 * Action log for the logged-in user — every consume / discard / quantity
 * change is recorded here. Scoped by Firebase UID like every other table.
 */
class HistoryDao(context: Context) {

    private val helper = FreshKeepDbHelper.get(context)
    private val settings = SettingsDao(context)
    private val uid: String get() = settings.currentUid

    companion object {
        const val ACTION_CONSUMED = "CONSUMED"
        const val ACTION_DISCARDED = "DISCARDED"
        const val ACTION_QUANTITY_ADJUSTED = "QUANTITY_ADJUSTED"
    }

    data class Entry(
        val id: Long,
        val productName: String,
        val category: String,
        val quantity: String,
        val action: String,
        val date: String,
        val time: String,
    )

    /** Log an action against a food item. */
    fun log(item: FoodItem, action: String, quantity: String = item.quantity) {
        log(item.name, item.category, quantity, action)
    }

    fun log(productName: String, category: String, quantity: String, action: String) {
        val now = Date()
        val cv = ContentValues().apply {
            put("user_uid", uid)
            put("product_name", productName)
            put("category", category)
            put("quantity", quantity)
            put("action", action)
            put("date", SimpleDateFormat("yyyy-MM-dd", Locale.US).format(now))
            put("time", SimpleDateFormat("HH:mm", Locale.US).format(now))
            put("created_at", ExpiryUtils.nowIso())
        }
        helper.writableDatabase.insert("history", null, cv)
    }

    /** Full history for this user, newest first. */
    fun getAll(): List<Entry> = query(null)

    /** History filtered to one action type (CONSUMED / DISCARDED / …). */
    fun getByAction(action: String): List<Entry> = query(action)

    private fun query(action: String?): List<Entry> {
        val list = mutableListOf<Entry>()
        val sql = StringBuilder(
            "SELECT id, product_name, category, quantity, action, date, time FROM history WHERE user_uid = ?"
        )
        val args = mutableListOf(uid)
        if (action != null) {
            sql.append(" AND action = ?")
            args.add(action)
        }
        sql.append(" ORDER BY id DESC")

        helper.readableDatabase.rawQuery(sql.toString(), args.toTypedArray()).use { c ->
            while (c.moveToNext()) {
                list.add(
                    Entry(
                        id = c.getLong(0), productName = c.getString(1), category = c.getString(2),
                        quantity = c.getString(3), action = c.getString(4),
                        date = c.getString(5), time = c.getString(6),
                    )
                )
            }
        }
        return list
    }

    fun countByAction(action: String): Int {
        helper.readableDatabase.rawQuery(
            "SELECT COUNT(*) FROM history WHERE user_uid = ? AND action = ?", arrayOf(uid, action)
        ).use { c ->
            return if (c.moveToFirst()) c.getInt(0) else 0
        }
    }
}

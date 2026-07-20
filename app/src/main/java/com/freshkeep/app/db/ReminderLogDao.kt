package com.freshkeep.app.db

import android.content.ContentValues
import android.content.Context
import android.database.sqlite.SQLiteDatabase
import com.freshkeep.app.utils.ExpiryUtils
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale

/**
 * Record of reminders actually delivered, so the worker can run often without
 * ever notifying twice for the same item on the same day, and can stop nagging
 * about an expired item after 3 reminders. Scoped by Firebase UID.
 */
class ReminderLogDao(context: Context) {

    private val helper = FreshKeepDbHelper.get(context)
    private val settings = SettingsDao(context)
    private val uid: String get() = settings.currentUid

    companion object {
        const val KIND_BEFORE = "BEFORE"   // N days before expiry
        const val KIND_EXPIRY = "EXPIRY"   // on the expiry date
        const val KIND_EXPIRED = "EXPIRED" // after expiry (max 3)

        const val MAX_EXPIRED_REMINDERS = 3

        fun today(): String = SimpleDateFormat("yyyy-MM-dd", Locale.US).format(Date())
    }

    /** True when this item already got a reminder today. */
    fun alreadySentToday(itemId: Long): Boolean {
        helper.readableDatabase.rawQuery(
            "SELECT 1 FROM reminder_log WHERE user_uid = ? AND item_id = ? AND day_key = ?",
            arrayOf(uid, itemId.toString(), today()),
        ).use { c -> return c.moveToFirst() }
    }

    /** How many post-expiry reminders this item has already received. */
    fun expiredReminderCount(itemId: Long): Int {
        helper.readableDatabase.rawQuery(
            "SELECT COUNT(*) FROM reminder_log WHERE user_uid = ? AND item_id = ? AND kind = ?",
            arrayOf(uid, itemId.toString(), KIND_EXPIRED),
        ).use { c -> return if (c.moveToFirst()) c.getInt(0) else 0 }
    }

    fun record(itemId: Long, kind: String) {
        val cv = ContentValues().apply {
            put("user_uid", uid)
            put("item_id", itemId)
            put("day_key", today())
            put("kind", kind)
            put("created_at", ExpiryUtils.nowIso())
        }
        helper.writableDatabase.insertWithOnConflict(
            "reminder_log", null, cv, SQLiteDatabase.CONFLICT_IGNORE
        )
    }
}

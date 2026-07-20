package com.freshkeep.app.db

import android.content.ContentValues
import android.content.Context
import com.freshkeep.app.utils.ExpiryUtils

/**
 * Per-user notification store (expiry reminders etc.), scoped by user_uid.
 * Data layer only — the visible design has no notification-center screen, so
 * nothing here renders UI.
 */
class NotificationDao(context: Context) {

    private val helper = FreshKeepDbHelper.get(context)
    private val settings = SettingsDao(context)
    private val uid: String get() = settings.currentUid

    data class Notification(
        val id: Long,
        val title: String,
        val message: String,
        val isRead: Boolean,
        val createdAt: String,
    )

    fun add(title: String, message: String): Long {
        val cv = ContentValues().apply {
            put("user_uid", uid)
            put("title", title)
            put("message", message)
            put("is_read", 0)
            put("created_at", ExpiryUtils.nowIso())
        }
        return helper.writableDatabase.insert("notifications", null, cv)
    }

    fun getAll(): List<Notification> {
        val list = mutableListOf<Notification>()
        helper.readableDatabase.rawQuery(
            "SELECT id, title, message, is_read, created_at FROM notifications WHERE user_uid = ? ORDER BY id DESC",
            arrayOf(uid),
        ).use { c ->
            while (c.moveToNext()) {
                list.add(
                    Notification(
                        id = c.getLong(0), title = c.getString(1), message = c.getString(2),
                        isRead = c.getInt(3) == 1, createdAt = c.getString(4),
                    )
                )
            }
        }
        return list
    }

    fun markRead(id: Long) {
        val cv = ContentValues().apply { put("is_read", 1) }
        helper.writableDatabase.update("notifications", cv, "id = ? AND user_uid = ?", arrayOf(id.toString(), uid))
    }

    fun delete(id: Long) {
        helper.writableDatabase.delete("notifications", "id = ? AND user_uid = ?", arrayOf(id.toString(), uid))
    }
}

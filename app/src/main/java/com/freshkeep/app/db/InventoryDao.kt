package com.freshkeep.app.db

import android.content.ContentValues
import android.content.Context
import com.freshkeep.app.models.FoodItem
import com.freshkeep.app.utils.ExpiryUtils

/**
 * CRUD for the inventory table. Only 'active' rows are the visible inventory.
 * Every operation is scoped to the logged-in user's UID.
 */
class InventoryDao(context: Context) {

    private val helper = FreshKeepDbHelper.get(context)
    private val settings = SettingsDao(context)
    private val history = HistoryDao(context)
    private val uid: String get() = settings.currentUid

    fun getAll(): List<FoodItem> {
        val list = mutableListOf<FoodItem>()
        helper.readableDatabase.rawQuery(
            "SELECT id, name, category_key, icon, illustration, quantity, added_date, expiry_date, low_stock FROM inventory WHERE user_uid = ? AND status = 'active' ORDER BY id DESC",
            arrayOf(uid),
        ).use { c ->
            while (c.moveToNext()) {
                list.add(
                    FoodItem(
                        id = c.getLong(0),
                        name = c.getString(1),
                        category = c.getString(2),
                        icon = c.getString(3),
                        illustration = c.getString(4),
                        quantity = c.getString(5),
                        addedDate = c.getString(6),
                        expiryDate = c.getString(7),
                        low = c.getInt(8) == 1,
                    )
                )
            }
        }
        return list
    }

    fun getById(id: Long): FoodItem? =
        getAll().firstOrNull { it.id == id }

    fun insert(item: FoodItem): Long {
        val cv = ContentValues().apply {
            put("user_uid", uid)
            put("name", item.name)
            put("category_key", item.category)
            put("icon", item.icon)
            put("illustration", item.illustration)
            put("quantity", item.quantity)
            put("added_date", item.addedDate)
            put("expiry_date", item.expiryDate)
            put("low_stock", if (item.low) 1 else 0)
            put("status", "active")
        }
        return helper.writableDatabase.insert("inventory", null, cv)
    }

    fun updateQuantity(id: Long, quantity: String) {
        val item = getById(id)
        val cv = ContentValues().apply { put("quantity", quantity) }
        helper.writableDatabase.update("inventory", cv, "id = ? AND user_uid = ?", arrayOf(id.toString(), uid))
        item?.let { history.log(it, HistoryDao.ACTION_QUANTITY_ADJUSTED, quantity) }
    }

    fun update(item: FoodItem) {
        val cv = ContentValues().apply {
            put("name", item.name)
            put("category_key", item.category)
            put("icon", item.icon)
            put("illustration", item.illustration)
            put("quantity", item.quantity)
            put("expiry_date", item.expiryDate)
            put("low_stock", if (item.low) 1 else 0)
        }
        helper.writableDatabase.update("inventory", cv, "id = ? AND user_uid = ?", arrayOf(item.id.toString(), uid))
    }

    /** Mark consumed — removed from active inventory, kept for history. */
    fun consume(id: Long) = setStatus(id, "consumed")

    /** Discard — removed from active inventory, kept for history. */
    fun discard(id: Long) = setStatus(id, "discarded")

    /** Hard delete (Inventory screen delete button). */
    fun delete(id: Long) {
        helper.writableDatabase.delete("inventory", "id = ? AND user_uid = ?", arrayOf(id.toString(), uid))
    }

    private fun setStatus(id: Long, status: String) {
        val item = getById(id)
        val cv = ContentValues().apply {
            put("status", status)
            put("status_date", ExpiryUtils.nowIso())
        }
        helper.writableDatabase.update("inventory", cv, "id = ? AND user_uid = ?", arrayOf(id.toString(), uid))
        item?.let {
            history.log(
                it,
                if (status == "consumed") HistoryDao.ACTION_CONSUMED else HistoryDao.ACTION_DISCARDED,
            )
        }
    }
}

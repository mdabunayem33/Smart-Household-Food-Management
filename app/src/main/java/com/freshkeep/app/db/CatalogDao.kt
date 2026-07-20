package com.freshkeep.app.db

import android.content.ContentValues
import android.content.Context
import com.freshkeep.app.models.Category
import com.freshkeep.app.models.Product

/**
 * Categories + products catalog (built-in seeded rows and user customs).
 * Each user profile owns a private copy of the catalog, scoped by user_uid.
 */
class CatalogDao(context: Context) {

    private val helper = FreshKeepDbHelper.get(context)
    private val settings = SettingsDao(context)
    private val uid: String get() = settings.currentUid

    fun getCategories(includeHidden: Boolean = false): List<Category> {
        val list = mutableListOf<Category>()
        val where = StringBuilder("user_uid = ?")
        if (!includeHidden) where.append(" AND is_hidden = 0")
        helper.readableDatabase.rawQuery(
            "SELECT key, label, icon, tone, illustration, is_custom, is_hidden FROM categories WHERE $where ORDER BY id",
            arrayOf(uid),
        ).use { c ->
            while (c.moveToNext()) {
                list.add(
                    Category(
                        key = c.getString(0), label = c.getString(1), icon = c.getString(2),
                        tone = c.getString(3), illustration = c.getString(4),
                        isCustom = c.getInt(5) == 1, isHidden = c.getInt(6) == 1,
                    )
                )
            }
        }
        return list
    }

    fun getCategory(key: String): Category? = getCategories(includeHidden = true).firstOrNull { it.key == key }

    fun addCustomCategory(cat: Category) {
        val cv = ContentValues().apply {
            put("user_uid", uid)
            put("key", cat.key)
            put("label", cat.label)
            put("icon", cat.icon)
            put("tone", cat.tone)
            put("illustration", cat.illustration)
            put("is_custom", 1)
        }
        helper.writableDatabase.insertWithOnConflict("categories", null, cv, android.database.sqlite.SQLiteDatabase.CONFLICT_REPLACE)
    }

    fun updateCustomCategory(key: String, label: String, icon: String, tone: String) {
        val cv = ContentValues().apply {
            put("label", label)
            put("icon", icon)
            put("tone", tone)
        }
        helper.writableDatabase.update("categories", cv, "key = ? AND user_uid = ?", arrayOf(key, uid))
    }

    /** Hide a built-in / remove a custom (web hides both the same way). */
    fun removeCategory(key: String, isCustom: Boolean) {
        if (isCustom) {
            helper.writableDatabase.delete("categories", "key = ? AND user_uid = ?", arrayOf(key, uid))
            helper.writableDatabase.delete("products", "category_key = ? AND is_custom = 1 AND user_uid = ?", arrayOf(key, uid))
        } else {
            val cv = ContentValues().apply { put("is_hidden", 1) }
            helper.writableDatabase.update("categories", cv, "key = ? AND user_uid = ?", arrayOf(key, uid))
        }
    }

    fun getProducts(categoryKey: String, includeHidden: Boolean = false): List<Product> {
        val list = mutableListOf<Product>()
        val where = StringBuilder("user_uid = ? AND category_key = ?")
        if (!includeHidden) where.append(" AND is_hidden = 0")
        helper.readableDatabase.rawQuery(
            "SELECT category_key, name, default_expiry_days, default_unit, is_custom, is_hidden FROM products WHERE $where ORDER BY id",
            arrayOf(uid, categoryKey),
        ).use { c ->
            while (c.moveToNext()) {
                list.add(
                    Product(
                        categoryKey = c.getString(0), name = c.getString(1),
                        defaultExpiryDays = c.getInt(2), defaultUnit = c.getString(3),
                        isCustom = c.getInt(4) == 1, isHidden = c.getInt(5) == 1,
                    )
                )
            }
        }
        return list
    }

    fun getAllProducts(): List<Product> {
        val list = mutableListOf<Product>()
        helper.readableDatabase.rawQuery(
            "SELECT category_key, name, default_expiry_days, default_unit, is_custom, is_hidden FROM products WHERE user_uid = ? AND is_hidden = 0 ORDER BY id",
            arrayOf(uid),
        ).use { c ->
            while (c.moveToNext()) {
                list.add(
                    Product(
                        categoryKey = c.getString(0), name = c.getString(1),
                        defaultExpiryDays = c.getInt(2), defaultUnit = c.getString(3),
                        isCustom = c.getInt(4) == 1, isHidden = c.getInt(5) == 1,
                    )
                )
            }
        }
        return list
    }

    fun addCustomProduct(p: Product) {
        val cv = ContentValues().apply {
            put("user_uid", uid)
            put("category_key", p.categoryKey)
            put("name", p.name)
            put("default_expiry_days", p.defaultExpiryDays)
            put("default_unit", p.defaultUnit)
            put("is_custom", 1)
        }
        helper.writableDatabase.insert("products", null, cv)
    }

    fun removeProduct(categoryKey: String, name: String, isCustom: Boolean) {
        if (isCustom) {
            helper.writableDatabase.delete(
                "products", "category_key = ? AND name = ? AND is_custom = 1 AND user_uid = ?", arrayOf(categoryKey, name, uid)
            )
        } else {
            val cv = ContentValues().apply { put("is_hidden", 1) }
            helper.writableDatabase.update("products", cv, "category_key = ? AND name = ? AND user_uid = ?", arrayOf(categoryKey, name, uid))
        }
    }

    /** detectCategory(name) — find the category owning a product with this name. */
    fun detectCategory(name: String): Category? {
        val norm = name.trim().lowercase()
        if (norm.isEmpty()) return null
        val product = getAllProducts().firstOrNull { it.name.lowercase() == norm } ?: return null
        return getCategory(product.categoryKey)
    }
}

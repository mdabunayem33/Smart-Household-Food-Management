package com.freshkeep.app.models

/**
 * Shopping list entry. Auto entries are derived from inventory at read time
 * (key = "auto-<inventoryId>"); manual entries are stored in SQLite.
 */
data class ShoppingItem(
    val key: String,
    val name: String,
    val category: String,
    val icon: String,
    val illustration: String? = null,
    val quantity: String,
    val reason: String,
    val source: String, // "auto" | "manual"
)

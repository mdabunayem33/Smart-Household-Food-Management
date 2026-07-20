package com.freshkeep.app.models

import com.freshkeep.app.utils.ExpiryUtils

/**
 * One inventory row. Mirrors the web prototype's item shape:
 * { id, name, category, icon, illustration, quantity, addedDate, expiryDate, low }
 * Freshness fields (freshness / daysLeft / expiredDays / expiryLabel) are always
 * derived from [expiryDate] — never stored.
 */
data class FoodItem(
    val id: Long = 0,
    var name: String,
    var category: String,
    var icon: String,
    var illustration: String? = null,
    var quantity: String,
    var addedDate: String,
    var expiryDate: String,
    var low: Boolean = false,
) {
    val freshness: ExpiryUtils.Freshness get() = ExpiryUtils.deriveFreshness(expiryDate)
    val daysLeft: Int get() = freshness.daysLeft
    val expiredDays: Int get() = freshness.expiredDays
    val expiryLabel: String get() = freshness.expiryLabel
    val freshnessLevel: String get() = freshness.level
}

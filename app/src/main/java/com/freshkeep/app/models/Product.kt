package com.freshkeep.app.models

/** Catalog product (preset or custom) with default shelf-life and unit. */
data class Product(
    val categoryKey: String,
    val name: String,
    val defaultExpiryDays: Int,
    val defaultUnit: String,
    val isCustom: Boolean = false,
    val isHidden: Boolean = false,
)

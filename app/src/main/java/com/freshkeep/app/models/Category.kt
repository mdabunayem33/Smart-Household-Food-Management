package com.freshkeep.app.models

/** Food category — built-in (seeded) or user-created custom. */
data class Category(
    val key: String,
    val label: String,
    val icon: String,
    val tone: String = "green",
    val illustration: String? = null,
    val isCustom: Boolean = false,
    val isHidden: Boolean = false,
)

package com.freshkeep.app.utils

import com.freshkeep.app.db.FreshKeepDbHelper

/** Port of food-illustrations.js — product name → illustration key. */
object ProductIllustrations {

    private val map = mapOf(
        "Tomato" to "tomato",
        "Potato" to "vegetables", "Onion" to "vegetables", "Carrot" to "vegetables",
        "Broccoli" to "vegetables", "Cucumber" to "vegetables",
        "Apple" to "fruits", "Banana" to "fruits", "Orange" to "fruits", "Grapes" to "fruits",
        "Frozen Chicken" to "frozen", "Frozen Peas" to "frozen", "Ice Cream" to "frozen",
        "Chicken Breast" to "meat", "Ground Beef" to "meat", "Bacon" to "meat",
        "Salmon" to "fish", "Shrimp" to "fish", "Tuna" to "fish",
        "Milk" to "milk", "Yogurt" to "milk", "Cheese" to "milk",
        "Chips" to "snacks", "Cookies" to "snacks", "Crackers" to "snacks",
        "Orange Juice" to "drinks", "Soda" to "drinks", "Sparkling Water" to "drinks",
        "White Rice" to "rice", "Basmati Rice" to "rice",
        "Cumin" to "spices", "Paprika" to "spices", "Black Pepper" to "spices",
        "Bread" to "others", "Eggs" to "others",
    )

    fun forProduct(name: String, categoryKey: String? = null): String =
        map[name] ?: FreshKeepDbHelper.CATEGORY_ILLUSTRATION[categoryKey] ?: "others"
}

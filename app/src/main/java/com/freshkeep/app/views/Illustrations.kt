package com.freshkeep.app.views

import com.freshkeep.app.R

/** FoodIllustration type → vector drawable (port of FoodIllustration.jsx). */
object Illustrations {

    private val map = mapOf(
        "tomato" to R.drawable.ill_tomato,
        "vegetables" to R.drawable.ill_vegetables,
        "fruits" to R.drawable.ill_fruits,
        "frozen" to R.drawable.ill_frozen,
        "meat" to R.drawable.ill_meat,
        "fish" to R.drawable.ill_fish,
        "milk" to R.drawable.ill_milk,
        "snacks" to R.drawable.ill_snacks,
        "drinks" to R.drawable.ill_drinks,
        "rice" to R.drawable.ill_rice,
        "spices" to R.drawable.ill_spices,
        "others" to R.drawable.ill_others,
    )

    fun res(type: String?): Int? = type?.let { map[it] }

    fun resOrDefault(type: String?): Int = res(type) ?: R.drawable.ill_others
}

package com.freshkeep.app.utils

/**
 * Quantity string helpers — port of aqFormat() + the parse/alias logic in
 * AdjustQuantity.jsx ("6 pcs" → 6 Piece, "1 L" → 1 Liter, "500 g" → 500 Gram).
 */
object QuantityFormat {

    val UNITS = listOf("Kg", "Gram", "Piece", "Bottle", "Packet", "Liter")

    val UNIT_STEP: Map<String, Double> = mapOf(
        "Kg" to 0.5, "Gram" to 50.0, "Piece" to 1.0, "Bottle" to 1.0, "Packet" to 1.0, "Liter" to 0.5,
    )

    val UNIT_DEFAULT_QTY: Map<String, Double> = mapOf(
        "Kg" to 1.0, "Gram" to 500.0, "Piece" to 1.0, "Bottle" to 1.0, "Packet" to 1.0, "Liter" to 1.0,
    )

    private val ALIASES = mapOf(
        "pcs" to "Piece", "kg" to "Kg", "g" to "Gram", "L" to "Liter", "l" to "Liter",
        "ml" to "Gram", "pack" to "Packet", "pc" to "Piece", "pieces" to "Piece",
    )

    /** aqFormat — integers plain, else one decimal without trailing .0 */
    fun format(v: Double): String =
        if (v == v.toLong().toDouble()) v.toLong().toString()
        else String.format(java.util.Locale.US, "%.1f", v).removeSuffix(".0")

    data class Parsed(val num: Double, val unit: String)

    fun parse(quantity: String?): Parsed {
        val m = Regex("^(\\d+(?:\\.\\d+)?)\\s*(.*)$").find((quantity ?: "1 Piece").trim())
        if (m != null) {
            val num = m.groupValues[1].toDoubleOrNull() ?: 1.0
            val rawUnit = m.groupValues[2].ifEmpty { "Piece" }
            val unit = ALIASES[rawUnit] ?: if (UNIT_STEP.containsKey(rawUnit)) rawUnit else "Piece"
            return Parsed(num, unit)
        }
        return Parsed(1.0, "Piece")
    }

    fun stepFor(unit: String): Double = UNIT_STEP[unit] ?: 1.0
}

package com.freshkeep.app.db

import android.content.Context
import android.database.sqlite.SQLiteDatabase
import android.database.sqlite.SQLiteOpenHelper

/**
 * Raw SQLiteOpenHelper (no Room, per project constraints).
 *
 * Multi-user model: Firebase Authentication is the identity provider; every
 * table carries a user_uid column (the Firebase UID, or "guest" for guest
 * sessions) and every query filters on it. Each profile gets its own copy of
 * the built-in catalog (categories/products/reminder defaults) seeded on first
 * login, and starts with an EMPTY inventory and shopping list.
 */
class FreshKeepDbHelper(context: Context) :
    SQLiteOpenHelper(context.applicationContext, DB_NAME, null, DB_VERSION) {

    companion object {
        const val DB_NAME = "freshkeep.db"
        const val DB_VERSION = 4

        /** Scope value for device-level settings rows (session, dark mode…). */
        const val DEVICE_UID = ""

        /** UID used for "Continue as Guest" sessions (no Firebase account). */
        const val GUEST_UID = "guest"

        @Volatile
        private var instance: FreshKeepDbHelper? = null

        fun get(context: Context): FreshKeepDbHelper =
            instance ?: synchronized(this) {
                instance ?: FreshKeepDbHelper(context).also { instance = it }
            }

        /** FK_CATEGORIES from AddFood.jsx — key, label, icon, tone. */
        val BUILTIN_CATEGORIES = listOf(
            arrayOf("vegetables", "Vegetables", "nutrition", "green"),
            arrayOf("fruits", "Fruits", "eco", "green"),
            arrayOf("frozen", "Frozen", "ac_unit", "blue"),
            arrayOf("meat", "Meat", "kebab_dining", "red"),
            arrayOf("fish", "Fish", "set_meal", "blue"),
            arrayOf("milk", "Milk", "water_drop", "blue"),
            arrayOf("snacks", "Snacks", "cookie", "orange"),
            arrayOf("drinks", "Drinks", "local_bar", "orange"),
            arrayOf("rice", "Rice", "rice_bowl", "orange"),
            arrayOf("spices", "Spices", "spa", "red"),
            arrayOf("others", "Others", "category", "green"),
        )

        /** FK_PRODUCTS — name to default shelf-life days, per category. */
        val BUILTIN_PRODUCTS: Map<String, List<Pair<String, Int>>> = mapOf(
            "vegetables" to listOf("Tomato" to 7, "Potato" to 30, "Onion" to 30, "Carrot" to 21, "Broccoli" to 7, "Cucumber" to 10),
            "fruits" to listOf("Apple" to 21, "Banana" to 6, "Orange" to 14, "Grapes" to 7),
            "frozen" to listOf("Frozen Chicken" to 90, "Frozen Peas" to 180, "Ice Cream" to 120),
            "meat" to listOf("Chicken Breast" to 3, "Ground Beef" to 3, "Bacon" to 7),
            "fish" to listOf("Salmon" to 2, "Shrimp" to 2, "Tuna" to 3),
            "milk" to listOf("Milk" to 5, "Yogurt" to 14, "Cheese" to 21),
            "snacks" to listOf("Chips" to 60, "Cookies" to 45, "Crackers" to 90),
            "drinks" to listOf("Orange Juice" to 10, "Soda" to 180, "Sparkling Water" to 270),
            "rice" to listOf("White Rice" to 365, "Basmati Rice" to 365),
            "spices" to listOf("Cumin" to 730, "Paprika" to 730, "Black Pepper" to 730),
            "others" to listOf("Bread" to 5, "Eggs" to 21),
        )

        /** FK_DEFAULT_UNIT — per product; anything unlisted defaults to Kg. */
        val DEFAULT_UNITS: Map<String, String> = mapOf(
            "Tomato" to "Kg", "Potato" to "Kg", "Onion" to "Kg", "Carrot" to "Kg", "Broccoli" to "Kg", "Cucumber" to "Piece",
            "Apple" to "Piece", "Banana" to "Piece", "Orange" to "Piece", "Grapes" to "Kg",
            "Frozen Chicken" to "Kg", "Frozen Peas" to "Packet", "Ice Cream" to "Packet",
            "Chicken Breast" to "Kg", "Ground Beef" to "Kg", "Bacon" to "Packet",
            "Salmon" to "Kg", "Shrimp" to "Kg", "Tuna" to "Kg",
            "Milk" to "Liter", "Yogurt" to "Packet", "Cheese" to "Packet",
            "Chips" to "Packet", "Cookies" to "Packet", "Crackers" to "Packet",
            "Orange Juice" to "Bottle", "Soda" to "Bottle", "Sparkling Water" to "Bottle",
            "White Rice" to "Kg", "Basmati Rice" to "Kg",
            "Cumin" to "Packet", "Paprika" to "Packet", "Black Pepper" to "Packet",
            "Bread" to "Packet", "Eggs" to "Piece",
        )

        /** FK_CATEGORY_ILLUSTRATION — category key to illustration key. */
        val CATEGORY_ILLUSTRATION: Map<String, String> = mapOf(
            "vegetables" to "vegetables", "fruits" to "fruits", "frozen" to "frozen",
            "meat" to "meat", "fish" to "fish", "milk" to "milk", "snacks" to "snacks",
            "drinks" to "drinks", "rice" to "rice", "spices" to "spices", "others" to "others",
        )

        fun defaultUnitFor(name: String): String = DEFAULT_UNITS[name] ?: "Kg"

        /** Action log — one row per consume / discard / quantity change. */
        const val HISTORY_TABLE = """CREATE TABLE history (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_uid TEXT NOT NULL,
                product_name TEXT NOT NULL,
                category TEXT NOT NULL,
                quantity TEXT NOT NULL,
                action TEXT NOT NULL,
                date TEXT NOT NULL,
                time TEXT NOT NULL,
                created_at TEXT NOT NULL
            )"""

        /**
         * One row per reminder actually delivered. Keeps reminders to at most
         * one per item per day and caps post-expiry nagging at 3.
         */
        const val REMINDER_LOG_TABLE = """CREATE TABLE reminder_log (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_uid TEXT NOT NULL,
                item_id INTEGER NOT NULL,
                day_key TEXT NOT NULL,
                kind TEXT NOT NULL,
                created_at TEXT NOT NULL,
                UNIQUE(user_uid, item_id, day_key)
            )"""
    }

    override fun onCreate(db: SQLiteDatabase) {
        db.execSQL(
            """CREATE TABLE users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_uid TEXT UNIQUE NOT NULL,
                name TEXT,
                email TEXT,
                photo_url TEXT,
                auth_type TEXT NOT NULL,
                created_at TEXT NOT NULL
            )"""
        )
        db.execSQL(
            """CREATE TABLE categories (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_uid TEXT NOT NULL,
                key TEXT NOT NULL,
                label TEXT NOT NULL,
                icon TEXT NOT NULL,
                tone TEXT NOT NULL DEFAULT 'green',
                illustration TEXT,
                is_custom INTEGER NOT NULL DEFAULT 0,
                is_hidden INTEGER NOT NULL DEFAULT 0,
                UNIQUE(user_uid, key)
            )"""
        )
        db.execSQL(
            """CREATE TABLE products (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_uid TEXT NOT NULL,
                category_key TEXT NOT NULL,
                name TEXT NOT NULL,
                default_expiry_days INTEGER NOT NULL,
                default_unit TEXT NOT NULL,
                is_custom INTEGER NOT NULL DEFAULT 0,
                is_hidden INTEGER NOT NULL DEFAULT 0
            )"""
        )
        db.execSQL(
            """CREATE TABLE inventory (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_uid TEXT NOT NULL,
                name TEXT NOT NULL,
                category_key TEXT NOT NULL,
                icon TEXT NOT NULL,
                illustration TEXT,
                quantity TEXT NOT NULL,
                added_date TEXT NOT NULL,
                expiry_date TEXT NOT NULL,
                low_stock INTEGER NOT NULL DEFAULT 0,
                status TEXT NOT NULL DEFAULT 'active',
                status_date TEXT
            )"""
        )
        db.execSQL(
            """CREATE TABLE shopping_items (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_uid TEXT NOT NULL,
                name TEXT NOT NULL,
                category_key TEXT NOT NULL,
                quantity TEXT NOT NULL,
                source TEXT NOT NULL DEFAULT 'manual',
                purchased INTEGER NOT NULL DEFAULT 0,
                created_at TEXT NOT NULL
            )"""
        )
        db.execSQL(
            """CREATE TABLE reminder_prefs (
                user_uid TEXT NOT NULL,
                category_key TEXT NOT NULL,
                days_json TEXT NOT NULL,
                PRIMARY KEY (user_uid, category_key)
            )"""
        )
        db.execSQL(
            """CREATE TABLE notifications (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_uid TEXT NOT NULL,
                title TEXT NOT NULL,
                message TEXT NOT NULL,
                is_read INTEGER NOT NULL DEFAULT 0,
                created_at TEXT NOT NULL
            )"""
        )
        db.execSQL(
            """CREATE TABLE settings (
                user_uid TEXT NOT NULL,
                key TEXT NOT NULL,
                value TEXT,
                PRIMARY KEY (user_uid, key)
            )"""
        )

        db.execSQL(HISTORY_TABLE)
        db.execSQL(REMINDER_LOG_TABLE)

        db.execSQL("CREATE INDEX idx_inventory_uid ON inventory(user_uid)")
        db.execSQL("CREATE INDEX idx_history_uid ON history(user_uid)")
        db.execSQL("CREATE INDEX idx_shopping_uid ON shopping_items(user_uid)")
        db.execSQL("CREATE INDEX idx_notifications_uid ON notifications(user_uid)")
    }

    override fun onUpgrade(db: SQLiteDatabase, oldVersion: Int, newVersion: Int) {
        if (oldVersion < 2) {
            // v1 → v2: per-user schema. v1 held only single-profile demo/test
            // data, so recreate from scratch; profiles re-seed on login.
            for (t in listOf(
                "users", "categories", "products", "inventory",
                "shopping_items", "reminder_prefs", "notifications", "settings",
            )) {
                db.execSQL("DROP TABLE IF EXISTS $t")
            }
            db.execSQL("DROP TABLE IF EXISTS history")
            onCreate(db)
            return
        }
        if (oldVersion < 3) {
            // v2 → v3: additive only — existing user data is preserved.
            db.execSQL(HISTORY_TABLE)
            db.execSQL("CREATE INDEX IF NOT EXISTS idx_history_uid ON history(user_uid)")
        }
        if (oldVersion < 4) {
            // v3 → v4: reminder delivery log. Additive.
            db.execSQL(REMINDER_LOG_TABLE)
        }
    }

    /**
     * Seed a NEW profile: built-in catalog + default reminder prefs.
     * Inventory and shopping list intentionally start empty — a first sign-in
     * must show 0 items everywhere.
     */
    fun seedProfile(db: SQLiteDatabase, uid: String) {
        for (c in BUILTIN_CATEGORIES) {
            db.execSQL(
                "INSERT OR IGNORE INTO categories (user_uid, key, label, icon, tone, illustration, is_custom) VALUES (?,?,?,?,?,?,0)",
                arrayOf(uid, c[0], c[1], c[2], c[3], CATEGORY_ILLUSTRATION[c[0]]),
            )
        }
        for ((catKey, products) in BUILTIN_PRODUCTS) {
            for ((name, days) in products) {
                db.execSQL(
                    "INSERT INTO products (user_uid, category_key, name, default_expiry_days, default_unit, is_custom) VALUES (?,?,?,?,?,0)",
                    arrayOf(uid, catKey, name, days, defaultUnitFor(name)),
                )
            }
        }
        // Default reminder prefs — [1, 3, 7] for every reminder category (App.jsx)
        for (key in listOf("vegetables", "fruits", "dairy", "meatFish", "packaged", "frozen", "beverages")) {
            db.execSQL(
                "INSERT OR IGNORE INTO reminder_prefs (user_uid, category_key, days_json) VALUES (?, ?, ?)",
                arrayOf(uid, key, "[1,3,7]"),
            )
        }
    }
}

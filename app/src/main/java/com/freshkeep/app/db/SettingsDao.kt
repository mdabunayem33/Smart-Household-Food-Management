package com.freshkeep.app.db

import android.content.ContentValues
import android.content.Context
import android.database.sqlite.SQLiteDatabase
import com.freshkeep.app.utils.ExpiryUtils

/**
 * Key–value settings (the SQLite equivalent of the web app's localStorage)
 * plus the login session and per-user profile management.
 *
 * Scoping: session + device preferences live under user_uid = '' (device
 * scope); everything else (shopping frequency, shopping cycle state, …) is
 * stored under the logged-in Firebase UID so each account keeps its own state.
 */
class SettingsDao(context: Context) {

    private val helper = FreshKeepDbHelper.get(context)

    companion object {
        const val KEY_SHOP_FREQUENCY = "shop_frequency"
        const val KEY_LAST_SHOPPING_DATE = "last_shopping_date"
        const val KEY_LANGUAGE = "language"
        const val KEY_DARK_MODE = "dark_mode"
        const val KEY_NOTIFICATIONS = "notifications"
        const val KEY_ONBOARDING_DONE = "onboarding_done"
        const val KEY_ONBOARDING_FREQUENCY = "onboarding_frequency"
        const val KEY_SESSION_UID = "session_uid"
        const val KEY_SESSION_EMAIL = "session_email"
        const val KEY_SESSION_AUTH_TYPE = "session_auth_type"
        const val KEY_SESSION_NAME = "session_name"

        /** Keys stored once per device (user_uid = ''); all others are per-user. */
        private val DEVICE_KEYS = setOf(
            KEY_SESSION_UID, KEY_SESSION_EMAIL, KEY_SESSION_AUTH_TYPE, KEY_SESSION_NAME,
            KEY_ONBOARDING_DONE, KEY_ONBOARDING_FREQUENCY,
            KEY_DARK_MODE, KEY_LANGUAGE, KEY_NOTIFICATIONS,
        )
    }

    /** The logged-in Firebase UID ("guest" for guest sessions). */
    val currentUid: String
        get() = getScoped(KEY_SESSION_UID, FreshKeepDbHelper.DEVICE_UID) ?: FreshKeepDbHelper.GUEST_UID

    private fun scopeFor(key: String): String =
        if (key in DEVICE_KEYS) FreshKeepDbHelper.DEVICE_UID else currentUid

    fun get(key: String): String? = getScoped(key, scopeFor(key))

    fun put(key: String, value: String?) = putScoped(key, value, scopeFor(key))

    fun remove(key: String) {
        helper.writableDatabase.delete(
            "settings", "user_uid = ? AND key = ?", arrayOf(scopeFor(key), key)
        )
    }

    private fun getScoped(key: String, uid: String): String? {
        helper.readableDatabase.rawQuery(
            "SELECT value FROM settings WHERE user_uid = ? AND key = ?", arrayOf(uid, key)
        ).use { c ->
            if (c.moveToFirst() && !c.isNull(0)) return c.getString(0)
        }
        return null
    }

    private fun putScoped(key: String, value: String?, uid: String) {
        val cv = ContentValues().apply {
            put("user_uid", uid)
            put("key", key)
            put("value", value)
        }
        helper.writableDatabase.insertWithOnConflict("settings", null, cv, SQLiteDatabase.CONFLICT_REPLACE)
    }

    var shopFrequency: String?
        get() = get(KEY_SHOP_FREQUENCY)
        set(v) = put(KEY_SHOP_FREQUENCY, v)

    var language: String
        get() = get(KEY_LANGUAGE) ?: "English"
        set(v) = put(KEY_LANGUAGE, v)

    var darkMode: Boolean
        get() = get(KEY_DARK_MODE) == "1"
        set(v) = put(KEY_DARK_MODE, if (v) "1" else "0")

    var notifications: Boolean
        get() = get(KEY_NOTIFICATIONS) != "0" // default on
        set(v) = put(KEY_NOTIFICATIONS, if (v) "1" else "0")

    var onboardingDone: Boolean
        get() = get(KEY_ONBOARDING_DONE) == "1"
        set(v) = put(KEY_ONBOARDING_DONE, if (v) "1" else "0")

    val isLoggedIn: Boolean get() = getScoped(KEY_SESSION_UID, FreshKeepDbHelper.DEVICE_UID) != null

    val sessionEmail: String get() = get(KEY_SESSION_EMAIL) ?: "Guest"

    /** Display name for the signed-in account (null for guests). */
    val sessionName: String? get() = get(KEY_SESSION_NAME)?.takeIf { it.isNotBlank() }

    /** "google" or "guest". */
    val sessionAuthType: String get() = get(KEY_SESSION_AUTH_TYPE) ?: "guest"

    /** Google profile photo URL recorded at sign-in, if any. */
    val sessionPhotoUrl: String?
        get() {
            helper.readableDatabase.rawQuery(
                "SELECT photo_url FROM users WHERE user_uid = ?", arrayOf(currentUid)
            ).use { c ->
                if (c.moveToFirst() && !c.isNull(0)) return c.getString(0).takeIf { it.isNotBlank() }
            }
            return null
        }

    /** Rename the local profile — the Google account itself is untouched. */
    fun updateDisplayName(name: String) {
        val uid = currentUid
        putScoped(KEY_SESSION_NAME, name, FreshKeepDbHelper.DEVICE_UID)
        val cv = ContentValues().apply { put("name", name) }
        helper.writableDatabase.update("users", cv, "user_uid = ?", arrayOf(uid))
    }

    /**
     * Start a session for a Firebase user (or "guest"). Creates the local
     * SQLite profile on first sign-in — seeded catalog, EMPTY inventory and
     * shopping list — and reuses the existing profile on any later sign-in.
     */
    fun login(uid: String, email: String?, authType: String, displayName: String?, photoUrl: String?) {
        putScoped(KEY_SESSION_UID, uid, FreshKeepDbHelper.DEVICE_UID)
        putScoped(KEY_SESSION_EMAIL, email, FreshKeepDbHelper.DEVICE_UID)
        putScoped(KEY_SESSION_AUTH_TYPE, authType, FreshKeepDbHelper.DEVICE_UID)
        putScoped(KEY_SESSION_NAME, displayName, FreshKeepDbHelper.DEVICE_UID)
        ensureProfile(uid, email, authType, displayName, photoUrl)
    }

    private fun ensureProfile(uid: String, email: String?, authType: String, displayName: String?, photoUrl: String?) {
        val db = helper.writableDatabase
        val exists = db.rawQuery(
            "SELECT id FROM users WHERE user_uid = ?", arrayOf(uid)
        ).use { it.moveToFirst() }

        if (!exists) {
            val cv = ContentValues().apply {
                put("user_uid", uid)
                put("name", displayName ?: email?.substringBefore('@'))
                put("email", email)
                put("photo_url", photoUrl)
                put("auth_type", authType)
                put("created_at", ExpiryUtils.nowIso())
            }
            db.insert("users", null, cv)
            helper.seedProfile(db, uid)
        } else {
            // refresh profile fields that may have changed on the Google account
            val cv = ContentValues().apply {
                put("name", displayName ?: email?.substringBefore('@'))
                put("email", email)
                put("photo_url", photoUrl)
            }
            db.update("users", cv, "user_uid = ?", arrayOf(uid))
        }

        // Inherit the frequency chosen during onboarding (pre-login) so the
        // user is not asked twice — App.jsx keeps asking only if never set.
        if (getScoped(KEY_SHOP_FREQUENCY, uid) == null) {
            getScoped(KEY_ONBOARDING_FREQUENCY, FreshKeepDbHelper.DEVICE_UID)?.let {
                putScoped(KEY_SHOP_FREQUENCY, it, uid)
            }
        }
    }

    /** End the session only — every user's SQLite data stays untouched. */
    fun logout() {
        remove(KEY_SESSION_UID)
        remove(KEY_SESSION_EMAIL)
        remove(KEY_SESSION_AUTH_TYPE)
        remove(KEY_SESSION_NAME)
    }
}

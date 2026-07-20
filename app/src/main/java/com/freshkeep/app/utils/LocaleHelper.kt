package com.freshkeep.app.utils

import android.content.Context
import androidx.appcompat.app.AppCompatDelegate
import androidx.core.os.LocaleListCompat
import com.freshkeep.app.db.SettingsDao

/**
 * Per-app language switching built on AppCompatDelegate.setApplicationLocales
 * (Android's official per-app locales API; AppCompat back-ports it below
 * Android 13). The chosen language is also mirrored into the SQLite settings
 * table so the Profile row and the notification worker can read it.
 *
 * Changing the language only swaps string resources — it never touches the
 * Firebase session, the SQLite data, or anything else.
 */
object LocaleHelper {

    /** Display name (as shown on the Language screen) → BCP-47 tag. */
    private val TAGS = linkedMapOf(
        "English" to "en",
        "বাংলা (Bengali)" to "bn",
        "हिन्दी (Hindi)" to "hi",
        "العربية (Arabic)" to "ar",
        "Español (Spanish)" to "es",
        "Français (French)" to "fr",
        "Deutsch (German)" to "de",
        "Italiano (Italian)" to "it",
        "Português (Portuguese)" to "pt",
        "中文 (Chinese)" to "zh",
        "日本語 (Japanese)" to "ja",
        "한국어 (Korean)" to "ko",
        "Русский (Russian)" to "ru",
        "Türkçe (Turkish)" to "tr",
    )

    val languageNames: List<String> get() = TAGS.keys.toList()

    fun tagFor(languageName: String): String = TAGS[languageName] ?: "en"

    fun nameForTag(tag: String): String =
        TAGS.entries.firstOrNull { it.value == tag }?.key ?: "English"

    /**
     * Apply a language app-wide. AppCompat persists the choice itself and
     * recreates running activities, so the whole UI re-renders in place —
     * no new task, no second splash, no return to Login.
     */
    fun apply(context: Context, languageName: String) {
        SettingsDao(context).language = languageName
        AppCompatDelegate.setApplicationLocales(
            LocaleListCompat.forLanguageTags(tagFor(languageName))
        )
    }

    /**
     * Re-assert the stored language at startup. AppCompat restores it on its
     * own, but on a cold start before any activity exists (e.g. the reminder
     * worker building notification text) this makes the choice explicit.
     */
    fun restore(context: Context) {
        val stored = SettingsDao(context).language
        val tag = tagFor(stored)
        val current = AppCompatDelegate.getApplicationLocales()
        if (current.isEmpty || current.toLanguageTags().substringBefore('-') != tag) {
            AppCompatDelegate.setApplicationLocales(LocaleListCompat.forLanguageTags(tag))
        }
    }

    /**
     * A Context forced to the user's language — used by background work
     * (notifications) which has no activity to inherit the locale from.
     */
    fun localizedContext(context: Context): Context {
        val tag = tagFor(SettingsDao(context).language)
        val config = android.content.res.Configuration(context.resources.configuration)
        config.setLocale(java.util.Locale.forLanguageTag(tag))
        return context.createConfigurationContext(config)
    }
}

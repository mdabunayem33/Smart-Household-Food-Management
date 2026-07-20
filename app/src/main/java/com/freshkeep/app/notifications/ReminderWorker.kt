package com.freshkeep.app.notifications

import android.content.Context
import androidx.work.Worker
import androidx.work.WorkerParameters
import com.freshkeep.app.R
import com.freshkeep.app.db.InventoryDao
import com.freshkeep.app.db.ReminderDao
import com.freshkeep.app.db.ReminderLogDao
import com.freshkeep.app.db.SettingsDao
import com.freshkeep.app.models.FoodItem

/**
 * Daily sweep over the logged-in user's inventory. An item is notified only on
 * the days its category's Reminder Preferences ask for — "3 Days Before" fires
 * once, three days out, and not again until expiry rules apply.
 *
 * Expired items get at most 3 follow-up reminders, one per day.
 */
class ReminderWorker(context: Context, params: WorkerParameters) : Worker(context, params) {

    override fun doWork(): Result {
        val settings = SettingsDao(applicationContext)

        // No session ⇒ nobody to notify; respect the global notifications toggle
        if (!settings.isLoggedIn || !settings.notifications) return Result.success()

        // Notification text must follow the user's chosen app language
        val ctx = com.freshkeep.app.utils.LocaleHelper.localizedContext(applicationContext)

        val log = ReminderLogDao(ctx)
        val prefs = ReminderDao(ctx)

        // InventoryDao is already scoped to the logged-in Firebase UID
        for (item in InventoryDao(ctx).getAll()) {
            if (log.alreadySentToday(item.id)) continue

            val daysLeft = item.daysLeft
            when {
                daysLeft < 0 -> notifyExpired(ctx, log, item, daysLeft)
                daysLeft == 0 -> {
                    // "On Expiry Day" must be selected for this category
                    if (0 in prefs.get(reminderCategoryFor(item.category))) {
                        NotificationHelper.showExpiryReminder(
                            ctx, item.id, ctx.getString(R.string.notif_title),
                            ctx.getString(R.string.notif_expires_today, item.name),
                            openDetail = true, // expiry date → opens the detail sheet
                        )
                        log.record(item.id, ReminderLogDao.KIND_EXPIRY)
                    }
                }
                else -> {
                    if (daysLeft in prefs.get(reminderCategoryFor(item.category))) {
                        val message = if (daysLeft == 1) {
                            ctx.getString(R.string.notif_expires_tomorrow, item.name)
                        } else {
                            ctx.getString(R.string.notif_expires_in_days, item.name, daysLeft)
                        }
                        NotificationHelper.showExpiryReminder(
                            ctx, item.id, ctx.getString(R.string.notif_title), message,
                            openDetail = false, // before expiry → just a reminder
                        )
                        log.record(item.id, ReminderLogDao.KIND_BEFORE)
                    }
                }
            }
        }
        return Result.success()
    }

    private fun notifyExpired(ctx: Context, log: ReminderLogDao, item: FoodItem, daysLeft: Int) {
        if (log.expiredReminderCount(item.id) >= ReminderLogDao.MAX_EXPIRED_REMINDERS) return

        val past = -daysLeft
        val message = if (past == 1) {
            ctx.getString(R.string.notif_expired_yesterday, item.name)
        } else {
            ctx.getString(R.string.notif_expired_days_ago, item.name, past)
        }
        NotificationHelper.showExpiryReminder(
            ctx, item.id, ctx.getString(R.string.notif_title), message, openDetail = false
        )
        log.record(item.id, ReminderLogDao.KIND_EXPIRED)
    }

    companion object {
        private const val TITLE = "Food Expiry Reminder"

        /** Inventory categories → the 7 Reminder Preference groups (Profile.jsx). */
        fun reminderCategoryFor(categoryKey: String): String = when (categoryKey) {
            "vegetables" -> "vegetables"
            "fruits" -> "fruits"
            "milk" -> "dairy"
            "meat", "fish" -> "meatFish"
            "frozen" -> "frozen"
            "drinks" -> "beverages"
            else -> "packaged" // snacks, rice, spices, others + custom categories
        }
    }
}

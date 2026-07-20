package com.freshkeep.app.notifications

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent

/**
 * Re-arms the reminder sweep after a reboot or an app update, so reminders keep
 * arriving even if the user never reopens the app.
 */
class BootReceiver : BroadcastReceiver() {

    override fun onReceive(context: Context, intent: Intent) {
        when (intent.action) {
            Intent.ACTION_BOOT_COMPLETED,
            Intent.ACTION_LOCKED_BOOT_COMPLETED,
            Intent.ACTION_MY_PACKAGE_REPLACED -> {
                NotificationHelper.ensureChannel(context)
                ReminderScheduler.schedule(context)
            }
        }
    }
}

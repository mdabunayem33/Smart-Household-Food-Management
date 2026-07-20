package com.freshkeep.app

import android.app.Application
import com.freshkeep.app.notifications.NotificationHelper
import com.freshkeep.app.notifications.ReminderScheduler

/** Creates the notification channel and arms the reminder sweep on launch. */
class FreshKeepApp : Application() {

    override fun onCreate() {
        super.onCreate()
        // Restore the saved language before any UI or notification text is built
        com.freshkeep.app.utils.LocaleHelper.restore(this)
        NotificationHelper.ensureChannel(this)
        ReminderScheduler.schedule(this)
    }
}

package com.freshkeep.app.notifications

import android.content.Context
import androidx.work.ExistingPeriodicWorkPolicy
import androidx.work.PeriodicWorkRequestBuilder
import androidx.work.WorkManager
import java.util.concurrent.TimeUnit

/**
 * Single entry point for scheduling the reminder sweep. WorkManager persists
 * the request across process death and reboots; the worker itself de-duplicates
 * per item per day, so running several times a day is safe and just makes
 * delivery more reliable.
 */
object ReminderScheduler {

    private const val WORK_NAME = "freshkeep_expiry_reminders"

    fun schedule(context: Context) {
        val request = PeriodicWorkRequestBuilder<ReminderWorker>(6, TimeUnit.HOURS)
            .build()

        WorkManager.getInstance(context).enqueueUniquePeriodicWork(
            WORK_NAME,
            ExistingPeriodicWorkPolicy.KEEP,
            request,
        )
    }
}

package com.freshkeep.app.notifications

import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.content.Context
import android.content.Intent
import android.os.Build
import androidx.core.app.NotificationCompat
import androidx.core.app.NotificationManagerCompat
import com.freshkeep.app.R
import com.freshkeep.app.activities.MainActivity
import com.freshkeep.app.activities.SplashActivity

/**
 * Builds and posts expiry reminders. No UI of its own — tapping a reminder on
 * the expiry date opens the app's existing food-detail bottom sheet.
 */
object NotificationHelper {

    const val CHANNEL_ID = "freshkeep_expiry"

    fun ensureChannel(context: Context) {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O) return
        val channel = NotificationChannel(
            CHANNEL_ID,
            context.getString(R.string.notif_channel_name),
            NotificationManager.IMPORTANCE_DEFAULT,
        ).apply {
            description = context.getString(R.string.notif_channel_desc)
        }
        context.getSystemService(NotificationManager::class.java)
            ?.createNotificationChannel(channel)
    }

    /**
     * @param openDetail true only on the actual expiry date — the tap then
     *        opens the existing product bottom sheet for [itemId].
     */
    fun showExpiryReminder(
        context: Context,
        itemId: Long,
        title: String,
        message: String,
        openDetail: Boolean,
    ) {
        ensureChannel(context)

        val intent = if (openDetail) {
            // Route through Splash so session/dark-mode setup still runs, and
            // carry the item id through to MainActivity.
            Intent(context, SplashActivity::class.java).apply {
                flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
                putExtra(MainActivity.EXTRA_OPEN_ITEM_ID, itemId)
            }
        } else {
            Intent(context, SplashActivity::class.java).apply {
                flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
            }
        }

        val pending = PendingIntent.getActivity(
            context,
            itemId.toInt(),
            intent,
            PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE,
        )

        val notification = NotificationCompat.Builder(context, CHANNEL_ID)
            .setSmallIcon(R.mipmap.ic_launcher)
            .setContentTitle(title)
            .setContentText(message)
            .setStyle(NotificationCompat.BigTextStyle().bigText(message))
            .setPriority(NotificationCompat.PRIORITY_DEFAULT)
            .setAutoCancel(true)
            .setContentIntent(pending)
            .build()

        try {
            NotificationManagerCompat.from(context).notify(itemId.toInt(), notification)
        } catch (_: SecurityException) {
            // POST_NOTIFICATIONS not granted — nothing to show, skip silently
        }
    }
}

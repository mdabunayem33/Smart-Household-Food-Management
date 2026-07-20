package com.freshkeep.app.activities

import android.animation.ObjectAnimator
import android.animation.ValueAnimator
import android.content.Intent
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.util.TypedValue
import android.view.animation.AccelerateDecelerateInterpolator
import android.view.animation.AnimationUtils
import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.app.AppCompatDelegate
import com.freshkeep.app.R
import com.freshkeep.app.databinding.ActivitySplashBinding
import com.freshkeep.app.db.SettingsDao

/**
 * Splash.jsx — 2.2s branded splash: content fades up (900ms ease-out-soft),
 * logo floats (2.6s ease-in-out loop), then advances:
 * session → Main · onboarding done → Login · else → Onboarding.
 */
class SplashActivity : AppCompatActivity() {

    private lateinit var binding: ActivitySplashBinding
    private val handler = Handler(Looper.getMainLooper())

    /** Guards against the startup route running more than once. */
    private var navigated = false

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        // If the app is already running and the launcher fires a fresh Splash
        // into the existing task (installer/launcher quirk), drop the duplicate
        // instead of restarting the whole navigation flow.
        if (!isTaskRoot) {
            finish()
            return
        }
        // Apply persisted dark-mode preference before any UI shows
        val settings = SettingsDao(this)
        AppCompatDelegate.setDefaultNightMode(
            if (settings.darkMode) AppCompatDelegate.MODE_NIGHT_YES else AppCompatDelegate.MODE_NIGHT_NO
        )
        binding = ActivitySplashBinding.inflate(layoutInflater)
        setContentView(binding.root)

        positionDecos()

        // splash-fade: opacity 0→1, translateY 14px→0, 900ms ease-out-soft
        binding.splashContent.alpha = 0f
        binding.splashContent.translationY = dp(14f)
        binding.splashContent.animate()
            .alpha(1f).translationY(0f)
            .setDuration(900)
            .setInterpolator(AnimationUtils.loadInterpolator(this, R.interpolator.ease_out_soft))
            .start()

        // splash-float: translateY 0 → -8px → 0, 2.6s infinite
        ObjectAnimator.ofFloat(binding.splashLogo, "translationY", 0f, -dp(8f), 0f).apply {
            duration = 2600
            repeatCount = ValueAnimator.INFINITE
            interpolator = AccelerateDecelerateInterpolator()
            start()
        }

        handler.postDelayed({ advance(settings) }, 2200)
    }

    /**
     * Startup routing — runs exactly once.
     *
     * Firebase Authentication is the source of truth for signed-in users: its
     * session survives restarts on its own, so the local SQLite session is
     * reconciled against it here (re-created if missing, dropped if stale).
     * Guest sessions have no Firebase user, so they fall back to the local
     * session — otherwise "Continue as Guest" could never stay signed in.
     */
    private fun advance(settings: SettingsDao) {
        if (navigated) return
        navigated = true

        val firebaseUser = try {
            if (com.google.firebase.FirebaseApp.getApps(this).isNotEmpty()) {
                com.google.firebase.auth.FirebaseAuth.getInstance().currentUser
            } else null
        } catch (_: Exception) {
            null
        }

        val loggedIn = when {
            firebaseUser != null -> {
                // Firebase says signed in — make sure the local session matches,
                // so every UID-scoped query reads this user's data.
                if (!settings.isLoggedIn || settings.currentUid != firebaseUser.uid) {
                    settings.login(
                        firebaseUser.uid,
                        firebaseUser.email,
                        "google",
                        firebaseUser.displayName,
                        firebaseUser.photoUrl?.toString(),
                    )
                }
                true
            }
            // No Firebase user: only a guest session is still valid
            settings.isLoggedIn && settings.sessionAuthType == "guest" -> true
            else -> {
                // Stale Google session with no Firebase user — clear it
                if (settings.isLoggedIn) settings.logout()
                false
            }
        }

        val next = when {
            loggedIn -> Intent(this, MainActivity::class.java).also { main ->
                // Carry a reminder tap through to the food detail sheet
                val itemId = intent.getLongExtra(MainActivity.EXTRA_OPEN_ITEM_ID, -1L)
                if (itemId > 0L) main.putExtra(MainActivity.EXTRA_OPEN_ITEM_ID, itemId)
            }
            settings.onboardingDone -> Intent(this, LoginActivity::class.java)
            else -> Intent(this, OnboardingActivity::class.java)
        }
        next.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP or Intent.FLAG_ACTIVITY_SINGLE_TOP)
        startActivity(next)
        overridePendingTransition(R.anim.fade_in, R.anim.fade_out)
        finish()
    }

    /** Deco positions from Splash.jsx (percent of screen). */
    private fun positionDecos() {
        binding.root.post {
            val w = binding.root.width
            val h = binding.root.height
            binding.decoVegetables.apply { x = w * 0.10f; y = h * 0.08f }
            binding.decoFruits.apply { x = w * 0.76f; y = h * 0.14f }
            binding.decoTomato.apply { x = w * 0.78f; y = h * 0.72f }
            binding.decoOthers.apply { x = w * 0.12f; y = h * 0.70f }
        }
    }

    private fun dp(v: Float): Float =
        TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, v, resources.displayMetrics)

    override fun onDestroy() {
        super.onDestroy()
        handler.removeCallbacksAndMessages(null)
    }
}

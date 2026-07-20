package com.freshkeep.app.activities

import android.content.Intent
import android.os.Bundle
import android.view.View
import androidx.appcompat.app.AppCompatActivity
import androidx.fragment.app.Fragment
import com.freshkeep.app.R
import com.freshkeep.app.databinding.ActivityMainBinding
import com.freshkeep.app.fragments.AnalyticsFragment
import com.freshkeep.app.fragments.HomeFragment
import com.freshkeep.app.fragments.InventoryFragment
import com.freshkeep.app.fragments.ProfileFragment
import com.freshkeep.app.fragments.ShoppingFragment
import com.freshkeep.app.views.Press

/**
 * App.jsx tab shell — 5 tabs behind a custom 72dp BottomNav, with the
 * "Add food" FAB visible on Home & Inventory (as in the prototype).
 */
class MainActivity : AppCompatActivity() {

    companion object {
        /** Set by an expiry-day reminder — opens that item's detail sheet. */
        const val EXTRA_OPEN_ITEM_ID = "open_item_id"
        private const val REQ_POST_NOTIFICATIONS = 101
    }

    lateinit var binding: ActivityMainBinding
    private var currentTab = "home"

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        requestNotificationPermissionIfNeeded()

        Press.apply(binding.fab, 0.94f)
        binding.fab.setOnClickListener {
            startActivity(Intent(this, AddFoodActivity::class.java))
            overridePendingTransition(R.anim.fd_slide_up, R.anim.fade_out)
        }

        binding.bottomNav.onChange = { key -> switchTab(key) }

        if (savedInstanceState == null) {
            switchTab(intent.getStringExtra("tab") ?: "home")
            openItemFromNotification(intent)
        }
    }

    override fun onNewIntent(intent: Intent) {
        super.onNewIntent(intent)
        setIntent(intent)
        openItemFromNotification(intent)
    }

    /** Expiry-day reminder tap — show the existing food detail bottom sheet. */
    private fun openItemFromNotification(intent: Intent?) {
        val itemId = intent?.getLongExtra(EXTRA_OPEN_ITEM_ID, -1L) ?: -1L
        if (itemId <= 0L) return
        intent?.removeExtra(EXTRA_OPEN_ITEM_ID)

        binding.root.post {
            if (isFinishing || supportFragmentManager.isStateSaved) return@post
            if (com.freshkeep.app.db.InventoryDao(this).getById(itemId) == null) return@post
            com.freshkeep.app.sheets.FoodDetailSheet
                .newInstance(itemId) { switchTab(currentTab) }
                .show(supportFragmentManager, "food_detail")
        }
    }

    private fun requestNotificationPermissionIfNeeded() {
        if (android.os.Build.VERSION.SDK_INT < android.os.Build.VERSION_CODES.TIRAMISU) return
        val granted = androidx.core.content.ContextCompat.checkSelfPermission(
            this, android.Manifest.permission.POST_NOTIFICATIONS
        ) == android.content.pm.PackageManager.PERMISSION_GRANTED
        if (!granted) {
            androidx.core.app.ActivityCompat.requestPermissions(
                this, arrayOf(android.Manifest.permission.POST_NOTIFICATIONS), REQ_POST_NOTIFICATIONS
            )
        }
    }

    fun switchTab(key: String) {
        currentTab = key
        val fragment: Fragment = when (key) {
            "inventory" -> InventoryFragment()
            "shopping" -> ShoppingFragment()
            "analytics" -> AnalyticsFragment()
            "profile" -> ProfileFragment()
            else -> HomeFragment()
        }
        supportFragmentManager.beginTransaction()
            .setCustomAnimations(R.anim.fade_in, R.anim.fade_out)
            .replace(R.id.fragmentContainer, fragment)
            .commit()
        binding.bottomNav.setActive(key)
        binding.fab.visibility = if (key == "home" || key == "inventory") View.VISIBLE else View.GONE
    }
}

package com.freshkeep.app.fragments

import android.content.Intent
import android.graphics.drawable.GradientDrawable
import android.os.Bundle
import android.util.TypedValue
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.appcompat.app.AppCompatDelegate
import androidx.core.content.ContextCompat
import androidx.fragment.app.Fragment
import androidx.lifecycle.lifecycleScope
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import com.freshkeep.app.R
import com.freshkeep.app.activities.AboutActivity
import com.freshkeep.app.activities.LanguageActivity
import com.freshkeep.app.activities.OnboardingActivity
import com.freshkeep.app.activities.ReminderPrefsActivity
import com.freshkeep.app.activities.UserManualActivity
import com.freshkeep.app.databinding.FragmentProfileBinding
import com.freshkeep.app.databinding.ItemProfileRowBinding
import com.freshkeep.app.db.SettingsDao
import com.freshkeep.app.views.IconView
import com.freshkeep.app.views.Press

/** Profile.jsx — avatar, toggles, reminder prefs, rows, log out. */
class ProfileFragment : Fragment() {

    private var _binding: FragmentProfileBinding? = null
    private val binding get() = _binding!!

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View {
        _binding = FragmentProfileBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        val ctx = requireContext()
        val settings = SettingsDao(ctx)

        // ----- user / Google account information -----
        val email = settings.sessionEmail
        val displayName = settings.sessionName
            ?: email.substringBefore('@').takeIf { it != "Guest" }
            ?: "Guest"

        // EmailAvatar — first letter, palette by char code (green/blue/orange)
        val letter = (displayName.trim().firstOrNull() ?: email.trim().firstOrNull() ?: '?')
            .uppercaseChar()
        binding.avatarLetter.text = letter.toString()
        data class AvatarTone(val bg: Int, val fg: Int)
        val palette = listOf(
            AvatarTone(R.color.color_primary_surface, R.color.color_primary_press),
            AvatarTone(R.color.color_accent_blue_surface, R.color.blue_700),
            AvatarTone(R.color.color_accent_orange_surface, R.color.orange_700),
        )
        val tone = palette[letter.code % palette.size]
        (binding.avatar.background.mutate() as GradientDrawable)
            .setColor(ContextCompat.getColor(ctx, tone.bg))
        binding.avatarLetter.setTextColor(ContextCompat.getColor(ctx, tone.fg))

        binding.profileName.text = displayName
        binding.profileEmail.text = email
        loadGooglePhoto(settings.sessionPhotoUrl)

        // toggles
        binding.toggleNotif.setChecked(settings.notifications)
        binding.toggleNotif.onChange = { settings.notifications = it }
        binding.toggleDark.setChecked(settings.darkMode)
        binding.toggleDark.onChange = { dark ->
            settings.darkMode = dark
            AppCompatDelegate.setDefaultNightMode(
                if (dark) AppCompatDelegate.MODE_NIGHT_YES else AppCompatDelegate.MODE_NIGHT_NO
            )
        }

        Press.apply(binding.btnReminderPrefs)
        binding.btnReminderPrefs.setOnClickListener { open(ReminderPrefsActivity::class.java) }

        // rows
        binding.rowsContainer.removeAllViews()
        addRow("person", "Edit Profile", null) { showEditProfileDialog(settings) }
        addRow("language", "Language", settings.language) { open(LanguageActivity::class.java) }
        addRow("menu_book", "User Manual", null) { open(UserManualActivity::class.java) }
        addRow("info", "About", null) { open(AboutActivity::class.java) }

        // logout (red icon + red label, ghost button)
        val logoutIcon = IconView(ctx).apply {
            setIcon("logout")
            setTextSize(TypedValue.COMPLEX_UNIT_DIP, 20f)
            setTextColor(ContextCompat.getColor(ctx, R.color.color_accent_red))
        }
        binding.btnLogout.setCompoundDrawables(null, null, null, null)
        Press.apply(binding.btnLogout)
        binding.btnLogout.setOnClickListener {
            // 1. Clear the local session FIRST so it is gone even if any of the
            //    Google/Firebase cleanup below fails. SQLite data is kept.
            settings.logout()

            // 2. Onboarding is shown again after an explicit logout
            settings.onboardingDone = false

            // 3. Sign out of Firebase (FirebaseApp only exists once
            //    google-services.json is configured; guests have no Firebase user)
            if (com.google.firebase.FirebaseApp.getApps(ctx).isNotEmpty()) {
                com.google.firebase.auth.FirebaseAuth.getInstance().signOut()
            }

            // 4. Clear Credential Manager state so the account picker shows next
            //    time — fire and forget on the app scope, never blocking logout.
            val appCtx = ctx.applicationContext
            kotlinx.coroutines.CoroutineScope(kotlinx.coroutines.Dispatchers.Main).launch {
                try {
                    androidx.credentials.CredentialManager.create(appCtx)
                        .clearCredentialState(androidx.credentials.ClearCredentialStateRequest())
                } catch (_: Exception) {
                    // nothing to clear — fine
                }
            }

            // 5. Onboarding → Login → Home, with the whole back stack cleared so
            //    Back can never return to Home.
            startActivity(
                Intent(ctx, OnboardingActivity::class.java)
                    .addFlags(Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK)
            )
            requireActivity().finish()
        }
        // keep reference so the icon view is retained (mirrors web icon+label layout)
        logoutIcon.visibility = View.GONE
    }

    override fun onResume() {
        super.onResume()
        // refresh the language value row when returning from LanguageActivity
        // (row 0 is Edit Profile, row 1 is Language)
        _binding?.let { b ->
            val settings = SettingsDao(requireContext())
            (b.rowsContainer.getChildAt(1)?.findViewById<android.widget.TextView>(R.id.rowValue))?.text =
                settings.language
        }
    }

    /** Edit Profile — renames the local profile; the Google account is untouched. */
    private fun showEditProfileDialog(settings: SettingsDao) {
        val ctx = requireContext()
        val dialogBinding = com.freshkeep.app.databinding.DialogEditProfileBinding
            .inflate(android.view.LayoutInflater.from(ctx))

        dialogBinding.inputName.setText(settings.sessionName ?: "")
        dialogBinding.inputName.setSelection(dialogBinding.inputName.text.length)
        dialogBinding.accountNote.text = if (settings.sessionAuthType == "google") {
            "Signed in with Google · ${settings.sessionEmail}"
        } else {
            "Signed in as Guest"
        }

        val dialog = android.app.Dialog(ctx)
        dialog.setContentView(dialogBinding.root)
        dialog.window?.apply {
            setBackgroundDrawable(android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT))
            setLayout(
                (ctx.resources.displayMetrics.widthPixels * 0.82).toInt(),
                android.view.WindowManager.LayoutParams.WRAP_CONTENT,
            )
            setDimAmount(0.45f)
        }
        dialogBinding.root.startAnimation(
            android.view.animation.AnimationUtils.loadAnimation(ctx, R.anim.dialog_scale_in)
        )
        dialogBinding.btnCancel.setOnClickListener { dialog.dismiss() }
        dialogBinding.btnSave.setOnClickListener {
            val name = dialogBinding.inputName.text.toString().trim()
            if (name.isEmpty()) {
                dialogBinding.inputName.error = "Enter a name"
                return@setOnClickListener
            }
            settings.updateDisplayName(name)
            dialog.dismiss()
            _binding?.let { b ->
                b.profileName.text = name
                b.avatarLetter.text = name.first().uppercaseChar().toString()
            }
        }
        dialog.show()
    }

    /** Google profile photo → circular avatar; letter avatar stays as fallback. */
    private fun loadGooglePhoto(url: String?) {
        if (url.isNullOrBlank()) return
        viewLifecycleOwner.lifecycleScope.launch {
            val bitmap = withContext(kotlinx.coroutines.Dispatchers.IO) {
                try {
                    (java.net.URL(url).openConnection() as java.net.HttpURLConnection).run {
                        connectTimeout = 8000
                        readTimeout = 8000
                        doInput = true
                        connect()
                        inputStream.use { android.graphics.BitmapFactory.decodeStream(it) }
                    }
                } catch (_: Exception) {
                    null
                }
            } ?: return@launch

            val b = _binding ?: return@launch
            val rounded = androidx.core.graphics.drawable.RoundedBitmapDrawableFactory
                .create(resources, bitmap)
                .apply { isCircular = true }
            b.avatarPhoto.setImageDrawable(rounded)
            b.avatarPhoto.visibility = View.VISIBLE
            b.avatarLetter.visibility = View.GONE
        }
    }

    private fun addRow(icon: String, label: String, value: String?, onClick: () -> Unit) {
        val row = ItemProfileRowBinding.inflate(layoutInflater, binding.rowsContainer, false)
        row.rowIcon.setIcon(icon)
        row.rowLabel.text = label
        if (value != null) {
            row.rowValue.visibility = View.VISIBLE
            row.rowValue.text = value
        }
        row.root.setOnClickListener { onClick() }
        if (binding.rowsContainer.childCount > 0) {
            (row.root.layoutParams as? ViewGroup.MarginLayoutParams)?.topMargin = dp(2)
        }
        binding.rowsContainer.addView(row.root)
    }

    private fun open(cls: Class<*>) {
        startActivity(Intent(requireContext(), cls))
        requireActivity().overridePendingTransition(R.anim.screen_fade_up, R.anim.fade_out)
    }

    private fun dp(v: Int): Int =
        TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, v.toFloat(), resources.displayMetrics).toInt()

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}

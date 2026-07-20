package com.freshkeep.app.views

import android.app.Dialog
import android.content.Context
import android.graphics.Color
import android.graphics.drawable.ColorDrawable
import android.view.LayoutInflater
import android.view.WindowManager
import com.freshkeep.app.R
import com.freshkeep.app.databinding.DialogConfirmBinding

/**
 * Shared confirm dialog — 82% width card, scale-in animation, scrim,
 * ghost Cancel + red confirm (DeleteConfirmDialog / discard / remove flows).
 */
object ConfirmDialog {

    fun show(
        context: Context,
        title: String,
        message: String,
        confirmText: String = "Delete",
        onConfirm: () -> Unit,
    ) {
        val binding = DialogConfirmBinding.inflate(LayoutInflater.from(context))
        binding.confirmTitle.text = title
        binding.confirmMessage.text = message
        binding.btnConfirm.text = confirmText

        val dialog = Dialog(context)
        dialog.setContentView(binding.root)
        dialog.window?.apply {
            setBackgroundDrawable(ColorDrawable(Color.TRANSPARENT))
            setLayout(
                (context.resources.displayMetrics.widthPixels * 0.82).toInt(),
                WindowManager.LayoutParams.WRAP_CONTENT,
            )
            setDimAmount(0.45f)
        }

        binding.root.startAnimation(
            android.view.animation.AnimationUtils.loadAnimation(context, R.anim.dialog_scale_in)
        )
        binding.btnCancel.setOnClickListener { dialog.dismiss() }
        binding.btnConfirm.setOnClickListener {
            dialog.dismiss()
            onConfirm()
        }
        dialog.show()
    }
}

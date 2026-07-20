package com.freshkeep.app.activities

import android.content.Intent
import android.graphics.drawable.GradientDrawable
import android.os.Bundle
import android.util.TypedValue
import android.view.ViewGroup
import android.view.animation.AnimationUtils
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat
import com.freshkeep.app.R
import com.freshkeep.app.databinding.ActivityOnboardingBinding
import com.freshkeep.app.views.Press

/**
 * Onboarding.jsx — 3 slides (track / reminders / shopping), Skip, animated
 * dots (active pill 24dp wide), then the shopping-frequency setup screen.
 */
class OnboardingActivity : AppCompatActivity() {

    private lateinit var binding: ActivityOnboardingBinding
    private var step = 0

    private data class Slide(val sceneRes: Int, val toneColor: Int, val title: String, val body: String)

    private val slides = listOf(
        Slide(R.drawable.scene_track, R.color.green_50, "Track Your Food", "Keep every food item organized in one place."),
        Slide(R.drawable.scene_reminders, R.color.orange_100, "Waste Less Food", "Smart reminders help you use food before it expires."),
        Slide(R.drawable.scene_shopping, R.color.blue_100, "Shop Smart", "Buy only what you need and save money every week."),
    )

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityOnboardingBinding.inflate(layoutInflater)
        setContentView(binding.root)

        Press.apply(binding.btnNext)
        binding.btnNext.setOnClickListener {
            if (step < slides.size - 1) {
                step++
                render(animate = true)
            } else {
                goToSetup()
            }
        }
        binding.btnSkip.setOnClickListener { goToSetup() }
        render(animate = false)
    }

    private fun goToSetup() {
        startActivity(
            Intent(this, ShoppingSetupActivity::class.java)
                .putExtra(ShoppingSetupActivity.EXTRA_FROM_ONBOARDING, true)
        )
        overridePendingTransition(R.anim.fade_in, R.anim.fade_out)
        finish()
    }

    private fun render(animate: Boolean) {
        val s = slides[step]
        binding.sceneImage.setImageResource(s.sceneRes)
        (binding.sceneTile.background.mutate() as GradientDrawable)
            .setColor(ContextCompat.getColor(this, s.toneColor))
        binding.obTitle.text = s.title
        binding.obBody.text = s.body
        binding.btnNext.text = if (step == slides.size - 1) "Get Started" else "Next"

        if (animate) {
            binding.sceneTile.startAnimation(AnimationUtils.loadAnimation(this, R.anim.ob_scale_in))
        }

        val dots = listOf(binding.dot0, binding.dot1, binding.dot2)
        dots.forEachIndexed { i, dot ->
            val active = i == step
            dot.setBackgroundResource(if (active) R.drawable.dot_active else R.drawable.dot_inactive)
            val target = dp(if (active) 24f else 8f)
            if (animate) {
                val start = dot.width
                if (start != target) {
                    android.animation.ValueAnimator.ofInt(start, target).apply {
                        duration = 220
                        interpolator = AnimationUtils.loadInterpolator(
                            this@OnboardingActivity, R.interpolator.ease_out_soft
                        )
                        addUpdateListener {
                            dot.layoutParams = (dot.layoutParams as ViewGroup.MarginLayoutParams)
                                .apply { width = it.animatedValue as Int }
                            dot.requestLayout()
                        }
                        start()
                    }
                }
            } else {
                dot.layoutParams = dot.layoutParams.apply { width = target }
            }
        }
    }

    private fun dp(v: Float): Int =
        TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, v, resources.displayMetrics).toInt()
}

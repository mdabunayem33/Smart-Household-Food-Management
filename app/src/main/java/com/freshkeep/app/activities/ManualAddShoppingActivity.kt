package com.freshkeep.app.activities

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.GridLayoutManager
import com.freshkeep.app.R
import com.freshkeep.app.adapters.CategoryGridAdapter
import com.freshkeep.app.databinding.ActivityManualAddBinding
import com.freshkeep.app.db.CatalogDao
import com.freshkeep.app.db.FreshKeepDbHelper
import com.freshkeep.app.models.Category

/**
 * ManualAddShopping (Shopping.jsx) — pick category (3-col) → product (2-col)
 * → AdjustQuantity (manual_add mode) which stores the entry.
 */
class ManualAddShoppingActivity : AppCompatActivity() {

    private lateinit var binding: ActivityManualAddBinding
    private lateinit var adapter: CategoryGridAdapter
    private var category: Category? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityManualAddBinding.inflate(layoutInflater)
        setContentView(binding.root)

        adapter = CategoryGridAdapter { entry ->
            val cat = category
            if (cat == null) {
                category = entry.payload as Category
                render()
            } else {
                // product chosen → adjust quantity, then activity stores the entry
                startActivity(
                    Intent(this, AdjustQuantityActivity::class.java)
                        .putExtra(AdjustQuantityActivity.EXTRA_MODE, AdjustQuantityActivity.MODE_MANUAL_ADD)
                        .putExtra(AdjustQuantityActivity.EXTRA_NAME, entry.label)
                        .putExtra(AdjustQuantityActivity.EXTRA_CATEGORY, cat.key)
                        .putExtra(AdjustQuantityActivity.EXTRA_ICON, cat.icon)
                        .putExtra(AdjustQuantityActivity.EXTRA_ILLUSTRATION, entry.illustration)
                        .putExtra(
                            AdjustQuantityActivity.EXTRA_QTY,
                            "1 ${FreshKeepDbHelper.defaultUnitFor(entry.label)}"
                        )
                )
                overridePendingTransition(R.anim.screen_fade_up, R.anim.fade_out)
                finish()
            }
        }
        binding.grid.adapter = adapter
        binding.topBar.btnBack.setOnClickListener {
            if (category != null) {
                category = null
                render()
            } else {
                finish()
            }
        }
        render()
    }

    private fun render() {
        val catalog = CatalogDao(this)
        val cat = category
        if (cat == null) {
            binding.topBar.topBarTitle.text = getString(R.string.add_choose_category)
            binding.grid.layoutManager = GridLayoutManager(this, 3)
            adapter.submit(
                catalog.getCategories().map {
                    CategoryGridAdapter.Entry(
                        key = it.key, label = it.label, icon = it.icon,
                        illustration = FreshKeepDbHelper.CATEGORY_ILLUSTRATION[it.key],
                        tone = it.tone, payload = it,
                    )
                }
            )
        } else {
            binding.topBar.topBarTitle.text = getString(R.string.add_choose_product)
            binding.grid.layoutManager = GridLayoutManager(this, 2)
            adapter.submit(
                catalog.getProducts(cat.key).map {
                    CategoryGridAdapter.Entry(
                        key = it.name, label = it.name, icon = cat.icon,
                        illustration = FreshKeepDbHelper.CATEGORY_ILLUSTRATION[cat.key],
                        tone = cat.tone, payload = it,
                    )
                }
            )
        }
    }
}

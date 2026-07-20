function App() {
  const { useState } = React;
  const { AndroidDevice } = window;

  function isoDaysFromNow(n) { const d = new Date(); d.setDate(d.getDate() + n); return d.toISOString(); }

  const [stage, setStage] = useState('splash'); // splash -> onboarding -> login -> app
  const [tab, setTab] = useState('home');
  const [addFoodOpen, setAddFoodOpen] = useState(false);
  const [detailItem, setDetailItem] = useState(null);
  const [adjustQtyItem, setAdjustQtyItem] = useState(null);
  const [editProductItem, setEditProductItem] = useState(null);

  const [inventory, setInventory] = useState([
    { id: 1, name: 'Tomato', category: 'vegetables', icon: 'nutrition', illustration: 'tomato', quantity: '6 pcs', freshness: 'soon', expiryLabel: 'Expires in 2 days', low: false, daysLeft: 2, addedDate: isoDaysFromNow(-5), expiryDate: isoDaysFromNow(2) },
    { id: 2, name: 'Milk', category: 'milk', icon: 'water_drop', illustration: 'milk', quantity: '1 L', freshness: 'expired', expiryLabel: 'Expired yesterday', low: true, daysLeft: -1, expiredDays: 1, addedDate: isoDaysFromNow(-6), expiryDate: isoDaysFromNow(-1) },
    { id: 3, name: 'Rice', category: 'rice', icon: 'rice_bowl', illustration: 'rice', quantity: '500 g', freshness: 'fresh', expiryLabel: 'Fresh for 300+ days', low: true, daysLeft: 300, addedDate: isoDaysFromNow(-65), expiryDate: isoDaysFromNow(300) },
    { id: 4, name: 'Frozen Chicken', category: 'frozen', icon: 'ac_unit', illustration: 'frozen', quantity: '1 kg', freshness: 'fresh', expiryLabel: 'Fresh for 88 days', low: false, daysLeft: 88, addedDate: isoDaysFromNow(-2), expiryDate: isoDaysFromNow(88) },
    { id: 5, name: 'Apple', category: 'fruits', icon: 'eco', illustration: 'fruits', quantity: '4 pcs', freshness: 'aging', expiryLabel: 'Expires in 6 days', low: false, daysLeft: 6, addedDate: isoDaysFromNow(-15), expiryDate: isoDaysFromNow(6) },
    { id: 6, name: 'Broccoli', category: 'vegetables', icon: 'nutrition', illustration: 'vegetables', quantity: '1 pc', freshness: 'soon', expiryLabel: 'Expires tomorrow', low: false, daysLeft: 1, addedDate: isoDaysFromNow(-6), expiryDate: isoDaysFromNow(1) },
  ]);
  const [nextId, setNextId] = useState(7);
  const [eatFirstOpen, setEatFirstOpen] = useState(false);
  const [reminderPrefsOpen, setReminderPrefsOpen] = useState(false);
  const [shoppingFrequency, setShoppingFrequency] = useState(() => {
    try { return localStorage.getItem('fk-shop-frequency') || null; } catch (e) { return null; }
  });
  const [manualAddOpen, setManualAddOpen] = useState(false);
  function changeShoppingFrequency(key) {
    setShoppingFrequency(key);
    try { localStorage.setItem('fk-shop-frequency', key); } catch (e) {}
  }
  const [customFoodCategories, setCustomFoodCategories] = useState([]);
  const [language, setLanguage] = useState('English');
  const [languageOpen, setLanguageOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [reminderPrefs, setReminderPrefs] = useState({
    vegetables: [1, 3, 7], fruits: [1, 3, 7], dairy: [1, 3, 7], meatFish: [1, 3, 7], packaged: [1, 3, 7], frozen: [1, 3, 7], beverages: [1, 3, 7],
  });
  function setReminderPref(key, daysArray) {
    setReminderPrefs((prev) => ({ ...prev, [key]: daysArray }));
  }

  function addInventoryItem() {
    setInventory([{ id: nextId, name: 'Cucumber', category: 'vegetables', icon: 'nutrition', illustration: 'vegetables', quantity: '2 pcs', freshness: 'fresh', expiryLabel: 'Expires in 10 days', low: false, addedDate: isoDaysFromNow(0), expiryDate: isoDaysFromNow(10) }, ...inventory]);
    setNextId(nextId + 1);
  }
  function updateInventoryQuantity(id, quantity) {
    setInventory((prev) => prev.map((i) => (i.id === id ? { ...i, quantity } : i)));
  }
  function deriveFreshness(expiryDateStr) {
    const remain = Math.ceil((new Date(expiryDateStr) - new Date()) / 86400000);
    if (remain < 0) {
      const past = -remain;
      return { freshness: 'expired', daysLeft: remain, expiredDays: past, expiryLabel: past === 1 ? 'Expired yesterday' : `Expired ${past} days ago` };
    }
    if (remain === 0) return { freshness: 'soon', daysLeft: 0, expiredDays: 0, expiryLabel: 'Expires today' };
    if (remain === 1) return { freshness: 'soon', daysLeft: 1, expiredDays: 0, expiryLabel: 'Expires tomorrow' };
    if (remain <= 3) return { freshness: 'soon', daysLeft: remain, expiredDays: 0, expiryLabel: `Expires in ${remain} days` };
    if (remain <= 7) return { freshness: 'aging', daysLeft: remain, expiredDays: 0, expiryLabel: `Expires in ${remain} days` };
    return { freshness: 'fresh', daysLeft: remain, expiredDays: 0, expiryLabel: `Fresh for ${remain}+ days` };
  }
  function updateInventoryItem(id, patch) {
    setInventory((prev) => prev.map((i) => {
      if (i.id !== id) return i;
      const merged = { ...i, ...patch };
      if (patch.expiryDate) Object.assign(merged, deriveFreshness(patch.expiryDate));
      return merged;
    }));
  }

  function deleteItem(id) { setInventory(inventory.filter((i) => i.id !== id)); }
  function consumeItem(id) { setInventory(inventory.filter((i) => i.id !== id)); setDetailItem(null); }

  let screen;
  if (stage === 'splash') screen = <window.Splash onDone={() => setStage('onboarding')} />;
  else if (stage === 'onboarding') screen = <window.Onboarding onDone={() => setStage('login')} onSetFrequency={changeShoppingFrequency} />;
  else if (stage === 'login') screen = <window.Login onDone={() => setStage('app')} />;
  else if (stage === 'app' && !shoppingFrequency) {
    // Fallback: if frequency was never set during onboarding (e.g. returning guest), ask once.
    screen = <window.ShoppingSetup onSave={(key) => { changeShoppingFrequency(key); setTab('home'); }} />;
  } else {
    screen = (
      <React.Fragment>
        {tab === 'home' && <window.Home inventory={inventory} onOpenAddFood={() => setAddFoodOpen(true)} onOpenFood={setDetailItem} goTab={setTab} onOpenEatFirst={() => setEatFirstOpen(true)} shoppingFrequency={shoppingFrequency} />}
        {tab === 'inventory' && <window.Inventory inventory={inventory} onOpenFood={setDetailItem} onDelete={deleteItem} goTab={setTab} onOpenAddFood={() => setAddFoodOpen(true)} onEditProduct={setEditProductItem} />}
        {tab === 'shopping' && (
          <window.Shopping
            inventory={inventory}
            goTab={setTab}
            frequency={shoppingFrequency}
            onChangeFrequency={changeShoppingFrequency}
            onOpenManualAdd={() => setManualAddOpen(true)}
          />
        )}
        {tab === 'analytics' && <window.Analytics goTab={setTab} />}
        {tab === 'profile' && (
          <window.Profile
            goTab={setTab}
            onLogout={() => setStage('login')}
            reminderPrefs={reminderPrefs}
            onOpenReminderPrefs={() => setReminderPrefsOpen(true)}
            language={language}
            onOpenLanguage={() => setLanguageOpen(true)}
            onOpenHelp={() => setHelpOpen(true)}
            onOpenAbout={() => setAboutOpen(true)}
            email="rohim@example.com"
          />
        )}

        {detailItem && (
          <window.FoodDetail
            item={detailItem}
            onClose={() => setDetailItem(null)}
            onConsume={() => consumeItem(detailItem.id)}
            onAdjust={() => { setAdjustQtyItem(detailItem); setDetailItem(null); }}
            onDiscard={() => consumeItem(detailItem.id)}
          />
        )}

        {addFoodOpen && (
          <div style={{ position: 'absolute', inset: 0, zIndex: 20 }}>
            <window.AddFood
              onCancel={() => setAddFoodOpen(false)}
              onFinish={() => { addInventoryItem(); setAddFoodOpen(false); }}
              customCategories={customFoodCategories}
              onCustomCategoriesChange={setCustomFoodCategories}
            />
          </div>
        )}

        {eatFirstOpen && (
          <div style={{ position: 'absolute', inset: 0, zIndex: 20 }}>
            <window.EatFirst inventory={inventory} onBack={() => setEatFirstOpen(false)} onConsume={consumeItem} onOpenFood={(item) => { setEatFirstOpen(false); setDetailItem(item); }} />
          </div>
        )}

        {reminderPrefsOpen && (
          <div style={{ position: 'absolute', inset: 0, zIndex: 20 }}>
            <window.ReminderPreferences onBack={() => setReminderPrefsOpen(false)} reminderPrefs={reminderPrefs} onChangeReminderPref={setReminderPref} customCategories={customFoodCategories} />
          </div>
        )}

        {languageOpen && (
          <div style={{ position: 'absolute', inset: 0, zIndex: 20 }}>
            <window.LanguagePage onBack={() => setLanguageOpen(false)} language={language} onChangeLanguage={setLanguage} />
          </div>
        )}

        {helpOpen && (
          <div style={{ position: 'absolute', inset: 0, zIndex: 20 }}>
            <window.UserManual onBack={() => setHelpOpen(false)} />
          </div>
        )}

        {aboutOpen && (
          <div style={{ position: 'absolute', inset: 0, zIndex: 20 }}>
            <window.AboutApp onBack={() => setAboutOpen(false)} />
          </div>
        )}

        {adjustQtyItem && (
          <div style={{ position: 'absolute', inset: 0, zIndex: 20 }}>
            <window.AdjustQuantity
              item={adjustQtyItem}
              onCancel={() => setAdjustQtyItem(null)}
              onSave={(quantity) => { updateInventoryQuantity(adjustQtyItem.id, quantity); setAdjustQtyItem(null); }}
            />
          </div>
        )}

        {editProductItem && (
          <div style={{ position: 'absolute', inset: 0, zIndex: 20 }}>
            <window.EditProduct
              item={editProductItem}
              onCancel={() => setEditProductItem(null)}
              onSave={(patch) => { updateInventoryItem(editProductItem.id, patch); setEditProductItem(null); }}
            />
          </div>
        )}

        {manualAddOpen && (
          <div style={{ position: 'absolute', inset: 0, zIndex: 25 }}>
            <window.ManualAddShopping
              inventory={inventory}
              customCategories={customFoodCategories}
              onClose={() => setManualAddOpen(false)}
              onAdd={(entry) => { if (window.__fkShoppingAddManual) window.__fkShoppingAddManual(entry); }}
            />
          </div>
        )}
      </React.Fragment>
    );
  }

  return (
    <AndroidDevice>
      <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>{screen}</div>
    </AndroidDevice>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);

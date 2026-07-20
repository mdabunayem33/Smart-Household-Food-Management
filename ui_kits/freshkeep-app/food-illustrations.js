// Product name -> FoodIllustration type key. Unmapped names fall back to their
// category's illustration key so the whole app reads as one consistent flat
// vector illustration set instead of per-photo assets.

const FK_PRODUCT_ILLUSTRATION = {
  'Tomato': 'tomato',
  'Potato': 'vegetables',
  'Onion': 'vegetables',
  'Carrot': 'vegetables',
  'Broccoli': 'vegetables',
  'Cucumber': 'vegetables',
  'Apple': 'fruits',
  'Banana': 'fruits',
  'Orange': 'fruits',
  'Grapes': 'fruits',
  'Frozen Chicken': 'frozen',
  'Frozen Peas': 'frozen',
  'Ice Cream': 'frozen',
  'Chicken Breast': 'meat',
  'Ground Beef': 'meat',
  'Bacon': 'meat',
  'Salmon': 'fish',
  'Shrimp': 'fish',
  'Tuna': 'fish',
  'Milk': 'milk',
  'Yogurt': 'milk',
  'Cheese': 'milk',
  'Chips': 'snacks',
  'Cookies': 'snacks',
  'Crackers': 'snacks',
  'Orange Juice': 'drinks',
  'Soda': 'drinks',
  'Sparkling Water': 'drinks',
  'White Rice': 'rice',
  'Basmati Rice': 'rice',
  'Cumin': 'spices',
  'Paprika': 'spices',
  'Black Pepper': 'spices',
  'Bread': 'others',
  'Eggs': 'others',
};

function fkIllustration(name) { return FK_PRODUCT_ILLUSTRATION[name] || 'others'; }
window.fkIllustration = fkIllustration;

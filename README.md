# Smart-Lizt — Smart Shopping Checklist

A smart, responsive checklist web application designed to organize shopping for every space in your home and office.

## 🖼️ How to Insert Images (`img src`) & Links (`href`)

Every section and item has explicit `<img src="...">` and `<a href="...">` support with locked, uniform 1:1 aspect ratios.

### 1. In `js/data.js`

Open `js/data.js` to customize any section or item:

#### Sections / Categories:
```javascript
kitchen: {
  name: 'Kitchen',
  icon: '🍳',
  slug: 'kitchen',
  desc: '...',
  link: 'category/kitchen.html',           // <--- Insert custom link
  image: 'images/categories/kitchen.jpg'  // <--- Insert category image path / URL
}
```

#### Items (Toothpaste, Rice, Cooking Oil, Soap, etc.):
```javascript
{
  name: 'Toothpaste',
  emoji: '🦷',
  desc: 'Fluoride toothpaste.',
  tags: 'essentials',
  defaultQty: 2,
  unit: '',
  link: 'https://example.com/toothpaste',      // <--- Paste product link here
  image: 'images/items/toothpaste.jpg'         // <--- Paste image path or URL here
}
```

### 2. Live in the Web Interface:
- **On Category Pages**: Every item card has an **`Insert Image ▾`** button. Click it to paste any image URL or local path (`img src`) with instant real-time live preview.
- **On the Checklist Page (`checklist.html`)**: When adding or editing an item, you can type/paste both the **Item Link** and **Image Source (`img src`)**.

---

## 🎨 Uniform 1:1 Image Ratio
- All item and category images are styled with `aspect-ratio: 1 / 1` and `object-fit: cover` to guarantee clean, identical proportions.
- If an image path is empty or loading fails, an aesthetic emoji illustration fallback is automatically displayed.
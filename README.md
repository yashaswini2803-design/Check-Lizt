# Smart-Lizt — Smart Shopping Checklist

A smart, responsive checklist web application designed to organize shopping for every space in your home and office.

## 🔗 How to Insert Your Links & Images

All sections (categories) and items now support custom `href` links and image URLs with locked, uniform 1:1 aspect ratios.

### 1. In `js/data.js`

Open `js/data.js` to customize any section or item:

#### Sections / Categories:
```javascript
kitchen: {
  name: 'Kitchen',
  icon: '🍳',
  slug: 'kitchen',
  desc: '...',
  link: 'category/kitchen.html', // Insert custom URL here
  image: 'images/categories/kitchen.jpg' // Optional custom image
}
```

#### Items (Toothpaste, Rice, Cooking Oil, etc.):
```javascript
{
  name: 'Toothpaste',
  emoji: '🦷',
  desc: 'Fluoride toothpaste.',
  tags: 'essentials',
  defaultQty: 2,
  unit: '',
  link: 'https://www.your-link-here.com/toothpaste', // <--- Paste your link here
  image: 'https://example.com/toothpaste.jpg'         // <--- Paste your image URL here
}
```

### 2. In the App UI (Checklist Page)
When adding or editing an item on the **My Checklist** page (`checklist.html`), you can directly enter an **Item Link / URL** in the modal form.

---

## 🎨 Consistent Image Ratios
- All item and category cards are styled with `aspect-ratio: 1 / 1` and `object-fit: cover` to guarantee uniform sizing across all devices and browsers.
- If no image is provided, an aesthetic emoji illustration fallback is automatically displayed.
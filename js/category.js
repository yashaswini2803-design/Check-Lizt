/* ============================================================
   SMART LIZT — CATEGORY JS
   Shared logic for all 10 category pages
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  // Get the category slug from body attribute
  const slug = document.body.dataset.category;
  if (!slug || !CATEGORIES[slug]) {
    console.error('[SmartLizt] Unknown category slug:', slug);
    return;
  }

  const meta  = CATEGORIES[slug];
  const items = ITEMS[slug] || [];
  const brands= BRANDS[slug] || ['Any Brand', 'Other'];

  // Render nav + footer
  renderNavbar('categories', '../');
  renderFooter('../');

  // Render breadcrumb + page header
  renderCategoryHeader(slug, meta);

  // Render filter bar
  renderFilterBar();

  // Render items grid
  renderItemsGrid(items, brands, slug, meta.name);

  // Render smart suggestions strip (initial — show popular items)
  renderSuggestionStrip([], meta.name);
});

/* ────────────────────────────────────────────────────────────
   PAGE HEADER
   ──────────────────────────────────────────────────────────── */
function renderCategoryHeader(slug, meta) {
  const header = document.getElementById('category-header');
  if (!header) return;

  header.innerHTML = `
    <nav class="breadcrumb" aria-label="Breadcrumb">
      <a href="../index.html">Home</a>
      <span class="breadcrumb-sep" aria-hidden="true">›</span>
      <a href="../categories.html">Categories</a>
      <span class="breadcrumb-sep" aria-hidden="true">›</span>
      <span class="breadcrumb-current">${meta.name}</span>
    </nav>
    <div class="category-page-hero">
      <div class="category-page-icon" aria-hidden="true">${meta.icon}</div>
      <div>
        <h1 class="category-page-title">${meta.name} Essentials</h1>
        <p class="category-page-desc">${meta.desc}</p>
      </div>
    </div>
  `;
}

/* ────────────────────────────────────────────────────────────
   FILTER BAR
   ──────────────────────────────────────────────────────────── */
let activeFilter = 'all';
let activeSort   = 'popular';
let searchQuery  = '';

function renderFilterBar() {
  const bar = document.getElementById('filter-bar');
  if (!bar) return;

  bar.innerHTML = `
    <div class="filter-bar">
      <div class="search-input-wrap">
        <span class="search-icon" aria-hidden="true">🔍</span>
        <input
          type="search"
          id="cat-search"
          placeholder="Search items..."
          aria-label="Search items in this category"
        />
      </div>
      <div class="filter-tabs" role="group" aria-label="Filter by type">
        ${['All','Essentials','Cleaning','Consumables','Equipment','Optional'].map(f => `
          <button class="filter-tab ${activeFilter === f.toLowerCase() ? 'active' : ''}"
                  data-filter="${f.toLowerCase()}"
                  aria-pressed="${activeFilter === f.toLowerCase()}">
            ${f}
          </button>
        `).join('')}
      </div>
      <select class="form-select" id="sort-select" aria-label="Sort items" style="width:auto; padding-right:36px;">
        <option value="popular">Popular</option>
        <option value="az">A–Z</option>
      </select>
    </div>
  `;

  // Bind filter tabs
  bar.querySelectorAll('.filter-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      activeFilter = btn.dataset.filter;
      bar.querySelectorAll('.filter-tab').forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
      applyFilters();
    });
  });

  // Bind search
  bar.querySelector('#cat-search').addEventListener('input', (e) => {
    searchQuery = e.target.value.toLowerCase().trim();
    applyFilters();
  });

  // Bind sort
  bar.querySelector('#sort-select').addEventListener('change', (e) => {
    activeSort = e.target.value;
    applyFilters();
  });
}

function applyFilters() {
  const slug  = document.body.dataset.category;
  const items = ITEMS[slug] || [];
  const brands= BRANDS[slug] || ['Any Brand', 'Other'];
  const meta  = CATEGORIES[slug];

  let filtered = items.filter(item => {
    const matchSearch = !searchQuery || item.name.toLowerCase().includes(searchQuery) || item.desc.toLowerCase().includes(searchQuery);
    const matchFilter = activeFilter === 'all' || item.tags === activeFilter;
    return matchSearch && matchFilter;
  });

  if (activeSort === 'az') {
    filtered = filtered.slice().sort((a, b) => a.name.localeCompare(b.name));
  }

  renderItemsGrid(filtered, brands, slug, meta.name, true);
}

/* ────────────────────────────────────────────────────────────
   ITEMS GRID
   ──────────────────────────────────────────────────────────── */
function renderItemsGrid(items, brands, slug, categoryName, isFiltered = false) {
  const grid = document.getElementById('items-grid');
  if (!grid) return;

  if (!items.length) {
    grid.innerHTML = `
      <div class="empty-state fade-in">
        <div class="empty-state-icon" aria-hidden="true">🔍</div>
        <h3>No items found</h3>
        <p>Try a different filter or search term.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = items.map((item, index) => buildItemCard(item, brands, categoryName, index)).join('');

  // Bind all item card events
  items.forEach(item => bindItemCardEvents(item, brands, categoryName));
}

/* ────────────────────────────────────────────────────────────
   ITEM CARD BUILDER
   ──────────────────────────────────────────────────────────── */
function buildItemCard(item, brands, categoryName, index) {
  const cardId = `card-${item.name.replace(/\s+/g, '-').toLowerCase()}`;
  const itemLink = item.link || '#';
  const targetAttr = (itemLink && itemLink !== '#') ? 'target="_blank" rel="noopener noreferrer"' : '';

  return `
    <div class="item-card fade-in stagger-item" id="${cardId}" data-item-name="${item.name}">

      <!-- Image with locked 1:1 Aspect Ratio and href link -->
      <div class="item-card-image">
        <a href="${itemLink}" class="item-card-image-link" ${targetAttr} aria-label="${item.name} link">
          ${item.image ? `<img src="${item.image}" alt="${item.name}" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />` : ''}
          <div class="img-fallback" aria-label="${item.name} illustration" style="${item.image ? 'display:none;' : ''}">
            <span style="font-size:60px">${item.emoji}</span>
          </div>
        </a>
      </div>

      <div class="item-card-body">

        <!-- Name (with href link) + desc -->
        <div>
          <div class="item-card-name-row">
            <a href="${itemLink}" class="item-name-link" ${targetAttr} title="Open link for ${item.name}">
              <span class="item-card-name">${item.name}</span>
              <span class="external-link-badge" aria-hidden="true">🔗</span>
            </a>
          </div>
          <div class="item-card-desc">${item.desc}</div>
          <div class="item-link-container">
            <a href="${itemLink}" class="item-product-link" ${targetAttr}>
              <span>🔗</span> ${itemLink !== '#' ? 'Visit Product Link' : 'Product Link (Insert URL)'}
            </a>
          </div>
        </div>

        <!-- Quantity -->
        <div>
          <div class="form-label" style="margin-bottom:6px">Quantity</div>
          <div style="display:flex; align-items:center; gap:var(--space-3);">
            <div class="qty-stepper" role="group" aria-label="Quantity for ${item.name}">
              <button class="qty-btn qty-minus" aria-label="Decrease quantity" data-name="${item.name}">−</button>
              <span class="qty-value" id="qty-${cardId}" aria-live="polite">${item.defaultQty}</span>
              <button class="qty-btn qty-plus" aria-label="Increase quantity" data-name="${item.name}">+</button>
            </div>
            ${item.unit ? `<span class="qty-unit">${item.unit}</span>` : ''}
          </div>
        </div>

        <!-- Brand -->
        <div class="form-group">
          <label class="form-label" for="brand-${cardId}">Brand</label>
          <select class="form-select" id="brand-${cardId}" aria-label="Select brand for ${item.name}">
            ${brands.map(b => `<option value="${b}">${b}</option>`).join('')}
          </select>
          <input
            type="text"
            class="form-input custom-brand-input"
            id="custom-brand-${cardId}"
            placeholder="Enter brand name"
            aria-label="Custom brand name"
            style="display:none; margin-top:6px"
          />
        </div>

        <!-- Priority -->
        <div class="form-group">
          <span class="form-label">Priority</span>
          <div class="priority-selector" role="group" aria-label="Priority for ${item.name}">
            ${['Low','Medium','High'].map(p => `
              <button class="priority-btn ${p === 'Medium' ? 'active' : ''}"
                      data-priority="${p}"
                      aria-pressed="${p === 'Medium'}"
                      id="pri-${p.toLowerCase()}-${cardId}">
                ${p}
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Reminder -->
        <div class="form-group">
          <label class="form-label" for="reminder-${cardId}">Reminder</label>
          <select class="form-select" id="reminder-${cardId}" aria-label="Set reminder for ${item.name}">
            <option value="">No Reminder</option>
            <option value="1">Tomorrow</option>
            <option value="3">3 Days</option>
            <option value="7">1 Week</option>
            <option value="30">1 Month</option>
            <option value="custom">Custom Date</option>
          </select>
          <input
            type="date"
            class="form-input"
            id="custom-reminder-${cardId}"
            aria-label="Custom reminder date"
            style="display:none; margin-top:6px"
          />
        </div>

        <!-- Price (optional) -->
        <div class="form-group">
          <label class="form-label" for="price-${cardId}">Price ($) — optional</label>
          <input
            type="number"
            class="form-input"
            id="price-${cardId}"
            placeholder="e.g. 5.99"
            min="0"
            step="0.01"
            aria-label="Price for ${item.name}"
          />
        </div>

        <!-- Add button -->
        <button
          class="btn-add-checklist"
          data-card-id="${cardId}"
          data-item="${item.name}"
          data-category="${categoryName}"
          data-unit="${item.unit || ''}"
          aria-label="Add ${item.name} to Smart Lizt">
          + Add to Smart Lizt
        </button>

      </div>
    </div>
  `;
}

/* ────────────────────────────────────────────────────────────
   ITEM CARD EVENT BINDINGS
   ──────────────────────────────────────────────────────────── */
function bindItemCardEvents(item, brands, categoryName) {
  const cardId = `card-${item.name.replace(/\s+/g, '-').toLowerCase()}`;
  const card   = document.getElementById(cardId);
  if (!card) return;

  // Quantity stepper
  const qtyEl  = card.querySelector(`#qty-${cardId}`);
  const minusBtn = card.querySelector('.qty-minus');
  const plusBtn  = card.querySelector('.qty-plus');

  let qty = item.defaultQty || 1;

  minusBtn?.addEventListener('click', () => {
    if (qty > 1) { qty--; qtyEl.textContent = qty; }
  });

  plusBtn?.addEventListener('click', () => {
    if (qty < 99) { qty++; qtyEl.textContent = qty; }
  });

  // Brand selector (show custom input when "Other" selected)
  const brandSelect = card.querySelector(`#brand-${cardId}`);
  const customBrand = card.querySelector(`#custom-brand-${cardId}`);

  brandSelect?.addEventListener('change', () => {
    if (brandSelect.value === 'Other') {
      customBrand.style.display = 'block';
      customBrand.focus();
    } else {
      customBrand.style.display = 'none';
    }
  });

  // Priority selector
  card.querySelectorAll('.priority-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      card.querySelectorAll('.priority-btn').forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
    });
  });

  // Reminder selector
  const reminderSelect = card.querySelector(`#reminder-${cardId}`);
  const customReminder = card.querySelector(`#custom-reminder-${cardId}`);

  reminderSelect?.addEventListener('change', () => {
    if (reminderSelect.value === 'custom') {
      customReminder.style.display = 'block';
      customReminder.focus();
    } else {
      customReminder.style.display = 'none';
    }
  });

  // Add to checklist button
  const addBtn = card.querySelector('.btn-add-checklist');
  addBtn?.addEventListener('click', () => {
    // Validate
    const name = item.name;
    const qty2 = parseInt(qtyEl?.textContent || '1');

    // Get brand
    let brand = brandSelect?.value || 'Any Brand';
    if (brand === 'Other') {
      brand = customBrand?.value.trim() || 'Other';
    }

    // Get priority
    const activePriBtn = card.querySelector('.priority-btn.active');
    const priority = activePriBtn?.dataset.priority || 'Medium';

    // Get reminder date
    let reminderDate = null;
    const rv = reminderSelect?.value;
    if (rv && rv !== '' && rv !== 'custom') {
      const d = new Date();
      d.setDate(d.getDate() + parseInt(rv));
      reminderDate = d.toISOString().split('T')[0];
    } else if (rv === 'custom') {
      reminderDate = customReminder?.value || null;
    }

    // Get price
    const priceInput = card.querySelector(`#price-${cardId}`);
    const price = priceInput?.value ? parseFloat(priceInput.value) : null;

    // Add to checklist (preserves item link and image)
    const result = addChecklistItem({
      name,
      category: categoryName,
      quantity: qty2,
      unit:     item.unit || '',
      brand,
      priority,
      reminderDate,
      price,
      link:     item.link || '#',
      image:    item.image || '',
    });

    // Show toast
    if (result.added) {
      showToast(`✓ ${name} added to your Smart Lizt`, 'success');
    } else if (result.updated) {
      showToast(`📦 ${name} quantity updated to ${result.item.quantity}${item.unit ? ' ' + item.unit : ''}`, 'info');
    }

    // Show reminder toast if set
    if (reminderDate) {
      showToast(`🔔 Reminder set for ${name}`, 'info', 2500);
    }

    // Update suggestion strip
    renderSuggestionStrip(getSmartSuggestions(name), name);

    // Animate button
    addBtn.textContent = '✓ Added!';
    addBtn.style.background = 'linear-gradient(135deg, var(--success), #4db870)';
    setTimeout(() => {
      addBtn.textContent = '+ Add to Smart Lizt';
      addBtn.style.background = '';
    }, 1800);
  });
}

/* ────────────────────────────────────────────────────────────
   SMART SUGGESTION STRIP
   ──────────────────────────────────────────────────────────── */
function renderSuggestionStrip(suggestions, lastAdded) {
  const strip = document.getElementById('suggestion-strip');
  if (!strip) return;

  if (!suggestions.length) {
    strip.style.display = 'none';
    return;
  }

  strip.style.display = 'block';

  strip.innerHTML = `
    <div class="suggestion-strip">
      <h4>
        <span>💡</span>
        You may also need — because you added <span>${lastAdded}</span>
      </h4>
      <div class="suggestion-pills">
        ${suggestions.map(name => `
          <button class="suggestion-pill" data-suggest="${name}" aria-label="Add ${name} to checklist">
            + ${name}
          </button>
        `).join('')}
      </div>
    </div>
  `;

  // Bind suggestion pill clicks — quick-add with defaults
  strip.querySelectorAll('.suggestion-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      const name = pill.dataset.suggest;
      // Find item in data
      let foundItem = null;
      let foundCat  = 'Uncategorized';
      for (const [slug, items] of Object.entries(ITEMS)) {
        const match = items.find(i => i.name.toLowerCase() === name.toLowerCase());
        if (match) {
          foundItem = match;
          foundCat  = CATEGORIES[slug]?.name || slug;
          break;
        }
      }

      if (foundItem) {
        const result = addChecklistItem({
          name:     foundItem.name,
          category: foundCat,
          quantity: foundItem.defaultQty || 1,
          unit:     foundItem.unit || '',
          brand:    'Any Brand',
          priority: 'Medium',
          link:     foundItem.link || '#',
          image:    foundItem.image || '',
        });

        if (result.added) {
          showToast(`✓ ${name} added to Smart Lizt`, 'success');
        } else if (result.updated) {
          showToast(`📦 ${name} quantity updated`, 'info');
        }

        // Remove pill
        pill.style.opacity = '0.4';
        pill.style.pointerEvents = 'none';
        pill.textContent = '✓ ' + name;
      }
    });
  });
}

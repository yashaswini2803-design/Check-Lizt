/* ============================================================
   SMART LIZT — COMPONENTS JS
   Shared UI renderers: navbar, footer, toast, modal
   ============================================================ */

/* ────────────────────────────────────────────────────────────
   TOAST NOTIFICATIONS
   ──────────────────────────────────────────────────────────── */

let toastContainer = null;

function ensureToastContainer() {
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    toastContainer.setAttribute('aria-live', 'polite');
    toastContainer.setAttribute('aria-label', 'Notifications');
    document.body.appendChild(toastContainer);
  }
  return toastContainer;
}

/**
 * Show a floating toast notification
 * @param {string} message
 * @param {'success'|'error'|'info'|'warning'} type
 * @param {number} duration ms
 */
function showToast(message, type = 'success', duration = 3200) {
  const container = ensureToastContainer();

  const icons = {
    success: '✓',
    error:   '✕',
    info:    '🔔',
    warning: '⚠',
  };

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.setAttribute('role', 'alert');
  toast.innerHTML = `
    <span class="toast-icon">${icons[type] || '✓'}</span>
    <span class="toast-message">${message}</span>
  `;

  container.appendChild(toast);

  // Auto-remove
  setTimeout(() => {
    toast.classList.add('removing');
    setTimeout(() => toast.remove(), 320);
  }, duration);
}

/* ────────────────────────────────────────────────────────────
   MODAL SYSTEM
   ──────────────────────────────────────────────────────────── */

let activeModal = null;

/**
 * Open a modal with given content HTML
 * @param {string} contentHTML
 * @param {string} sizeClass — 'modal-sm' | '' | 'modal-lg'
 * @param {Function|null} onOpen — called after modal is inserted
 */
function openModal(contentHTML, sizeClass = '', onOpen = null) {
  closeModal(); // close any existing modal

  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.innerHTML = `
    <div class="modal-box ${sizeClass}">
      <button class="modal-close" aria-label="Close modal">✕</button>
      ${contentHTML}
    </div>
  `;

  // Close on overlay click
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  // Close button
  overlay.querySelector('.modal-close').addEventListener('click', closeModal);

  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';
  activeModal = overlay;

  if (onOpen) onOpen(overlay);

  // Trap focus
  const firstFocusable = overlay.querySelector('input, button, select, textarea, [tabindex]');
  if (firstFocusable) firstFocusable.focus();
}

/**
 * Close the active modal
 */
function closeModal() {
  if (activeModal) {
    activeModal.remove();
    activeModal = null;
    document.body.style.overflow = '';
  }
}

// Close on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

/* ────────────────────────────────────────────────────────────
   NAVBAR RENDERER
   ──────────────────────────────────────────────────────────── */

/**
 * Inject navbar into the page
 * @param {string} activePage — 'home'|'categories'|'checklist'|'reminders'|'history'|'profile'
 * @param {string} basePath — relative path prefix (e.g. '../' for category pages)
 */
function renderNavbar(activePage = 'home', basePath = '') {
  const navLinks = [
    { id: 'home',       label: 'Home',         icon: '⌂',  href: `${basePath}index.html` },
    { id: 'categories', label: 'Categories',   icon: '⊞',  href: `${basePath}categories.html` },
    { id: 'checklist',  label: 'My Checklist', icon: '☑',  href: `${basePath}checklist.html` },
    { id: 'reminders',  label: 'Reminders',    icon: '🔔', href: `${basePath}reminders.html` },
    { id: 'history',    label: 'History',      icon: '🕐', href: `${basePath}history.html` },
  ];

  const html = `
    <nav class="navbar" role="navigation" aria-label="Main navigation">
      <div class="container navbar-inner">

        <!-- Logo -->
        <a href="${basePath}index.html" class="nav-logo" aria-label="Smart Lizt Home">
          <div class="nav-logo-icon" aria-hidden="true">✓</div>
          <span class="nav-logo-text">Smart <span>Lizt</span></span>
        </a>

        <!-- Desktop nav links -->
        <div class="nav-links">
          ${navLinks.map(link => `
            <a href="${link.href}"
               class="nav-link ${activePage === link.id ? 'active' : ''}"
               aria-current="${activePage === link.id ? 'page' : 'false'}">
              <span class="nav-icon" aria-hidden="true">${link.icon}</span>
              ${link.label}
            </a>
          `).join('')}
        </div>

        <!-- Nav actions -->
        <div class="nav-actions">
          <button class="nav-action-btn" id="nav-search-btn" aria-label="Search items">🔍</button>
          <button class="nav-action-btn has-badge" id="nav-reminder-btn" aria-label="View reminders">
            🔔
            <span class="badge-dot" aria-hidden="true"></span>
          </button>
          <a href="${basePath}profile.html" class="nav-profile-avatar" aria-label="Profile">S</a>
        </div>

      </div>
    </nav>

    <!-- Mobile bottom nav -->
    <nav class="mobile-nav" role="navigation" aria-label="Mobile navigation">
      <div class="mobile-nav-inner">
        ${[
          { id: 'home',       label: 'Home',      icon: '⌂',  href: `${basePath}index.html` },
          { id: 'categories', label: 'Categories',icon: '⊞',  href: `${basePath}categories.html` },
          { id: 'checklist',  label: 'Checklist', icon: '☑',  href: `${basePath}checklist.html` },
          { id: 'reminders',  label: 'Reminders', icon: '🔔', href: `${basePath}reminders.html` },
          { id: 'profile',    label: 'Profile',   icon: '👤', href: `${basePath}profile.html` },
        ].map(link => `
          <a href="${link.href}"
             class="mobile-nav-item ${activePage === link.id ? 'active' : ''}"
             aria-label="${link.label}"
             aria-current="${activePage === link.id ? 'page' : 'false'}">
            <span class="nav-icon" aria-hidden="true">${link.icon}</span>
            ${link.label}
          </a>
        `).join('')}
      </div>
    </nav>
  `;

  const placeholder = document.getElementById('navbar-placeholder');
  if (placeholder) placeholder.outerHTML = html;

  // Bind search button
  const searchBtn = document.getElementById('nav-search-btn');
  if (searchBtn) {
    searchBtn.addEventListener('click', openSearchModal);
  }

  // Bind reminder badge — update dot visibility
  updateReminderBadge(basePath);
}

/**
 * Show or hide the reminder notification dot
 * @param {string} basePath
 */
function updateReminderBadge(basePath) {
  const dot = document.querySelector('.nav-action-btn .badge-dot');
  if (!dot) return;
  const reminders = loadReminders();
  const today = new Date().toISOString().split('T')[0];
  const hasDue = reminders.some(r => r.reminderDate <= today);
  dot.style.display = hasDue ? 'block' : 'none';

  // Make reminder bell a link
  const btn = document.getElementById('nav-reminder-btn');
  if (btn) {
    btn.addEventListener('click', () => {
      window.location.href = `${basePath}reminders.html`;
    });
    btn.style.cursor = 'pointer';
  }
}

/* ────────────────────────────────────────────────────────────
   FOOTER RENDERER
   ──────────────────────────────────────────────────────────── */

/**
 * Inject footer into the page
 * @param {string} basePath
 */
function renderFooter(basePath = '') {
  const year = new Date().getFullYear();
  const html = `
    <footer class="footer" role="contentinfo">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <div class="footer-logo-text">Smart <span>Lizt</span></div>
            <p class="footer-tagline">Never Forget What You Need.</p>
            <p style="font-size:13px; color:var(--text-muted);">Smart shopping checklists organized for every space in your life.</p>
          </div>
          <div>
            <div class="footer-col-title">Pages</div>
            <div class="footer-links">
              <a href="${basePath}index.html">Home</a>
              <a href="${basePath}categories.html">Categories</a>
              <a href="${basePath}checklist.html">Checklist</a>
              <a href="${basePath}reminders.html">Reminders</a>
              <a href="${basePath}history.html">History</a>
            </div>
          </div>
          <div>
            <div class="footer-col-title">Info</div>
            <div class="footer-links">
              <a href="${basePath}profile.html">Profile</a>
              <a href="#" onclick="return false;">Privacy</a>
              <a href="#" onclick="return false;">About</a>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© ${year} Smart Lizt. All rights reserved.</span>
          <span>Built with ♥ for smart shoppers</span>
        </div>
      </div>
    </footer>
  `;

  const placeholder = document.getElementById('footer-placeholder');
  if (placeholder) placeholder.outerHTML = html;
}

/* ────────────────────────────────────────────────────────────
   EMPTY STATE
   ──────────────────────────────────────────────────────────── */

/**
 * Render an empty state block
 * @param {string} type — 'checklist'|'reminders'|'history'|'search'
 * @param {string} basePath
 * @returns {string} HTML string
 */
function renderEmptyState(type, basePath = '') {
  const states = {
    checklist: {
      icon: '🛒',
      title: 'Your Smart Lizt is empty',
      desc: 'Start exploring categories and add everything you need.',
      btnLabel: 'Explore Categories',
      btnHref: `${basePath}categories.html`,
    },
    reminders: {
      icon: '🔔',
      title: 'No reminders yet',
      desc: 'Set reminders so Smart Lizt can remember for you.',
      btnLabel: 'Go to Checklist',
      btnHref: `${basePath}checklist.html`,
    },
    history: {
      icon: '🕐',
      title: 'No purchase history',
      desc: 'Your completed purchases will appear here.',
      btnLabel: 'View Checklist',
      btnHref: `${basePath}checklist.html`,
    },
    search: {
      icon: '🔍',
      title: 'No results found',
      desc: 'Try a different search term.',
      btnLabel: null,
      btnHref: null,
    },
  };

  const s = states[type] || states.checklist;
  return `
    <div class="empty-state fade-in">
      <div class="empty-state-icon" aria-hidden="true">${s.icon}</div>
      <h3>${s.title}</h3>
      <p>${s.desc}</p>
      ${s.btnLabel ? `<a href="${s.btnHref}" class="btn btn-primary">${s.btnLabel}</a>` : ''}
    </div>
  `;
}

/* ────────────────────────────────────────────────────────────
   GLOBAL SEARCH MODAL
   ──────────────────────────────────────────────────────────── */

function openSearchModal() {
  openModal(`
    <div class="modal-title">🔍 Search Smart Lizt</div>
    <div class="modal-subtitle">Search items, categories and brands</div>
    <div class="search-input-wrap">
      <span class="search-icon" aria-hidden="true">🔍</span>
      <input
        type="search"
        id="global-search-input"
        placeholder="e.g. soap, rice, curtains..."
        class="form-input"
        autocomplete="off"
        aria-label="Search items"
      />
    </div>
    <div class="search-results" id="global-search-results">
      <p style="color:var(--text-muted); font-size:14px; text-align:center; padding: 32px 0;">
        Start typing to see results...
      </p>
    </div>
  `, 'modal-lg', (overlay) => {
    const input  = overlay.querySelector('#global-search-input');
    const results= overlay.querySelector('#global-search-results');

    input.addEventListener('input', () => {
      const q = input.value.trim();
      if (q.length < 2) {
        results.innerHTML = `<p style="color:var(--text-muted);font-size:14px;text-align:center;padding:32px 0">Start typing to see results...</p>`;
        return;
      }

      const hits = searchAllItems(q);

      if (!hits.length) {
        results.innerHTML = renderEmptyState('search');
        return;
      }

      results.innerHTML = hits.slice(0, 20).map(({ item, category, categorySlug }) => `
        <a href="${categorySlug}.html"
           class="search-result-item"
           onclick="closeModal()"
           aria-label="${item.name} in ${category.name}">
          <div class="search-result-icon" aria-hidden="true">${item.emoji}</div>
          <div>
            <div class="search-result-label">${highlightMatch(item.name, q)}</div>
            <div class="search-result-sub">${category.icon} ${category.name}</div>
          </div>
        </a>
      `).join('');
    });

    input.focus();
  });
}

/**
 * Wrap matched text in a highlight span
 * @param {string} text
 * @param {string} query
 * @returns {string}
 */
function highlightMatch(text, query) {
  const re = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return text.replace(re, `<mark style="background:rgba(212,175,55,0.28);color:#7a5800;border-radius:3px;padding:0 2px;">$1</mark>`);
}

/* ────────────────────────────────────────────────────────────
   CATEGORY CARD HTML GENERATOR
   ──────────────────────────────────────────────────────────── */

/**
 * Create a category card element
 * @param {string} slug
 * @param {Object} meta — { name, icon, slug }
 * @param {string} href
 * @returns {string}
 */
function renderCategoryCard(slug, meta, href) {
  const itemCount = (ITEMS[slug] || []).length;
  const bgClass = `cat-bg-${slug}`;
  const targetHref = href || meta.link || `category/${slug}.html`;

  return `
    <a href="${targetHref}" class="category-card fade-in stagger-item" aria-label="${meta.name} — ${itemCount} items" role="listitem">
      <div class="category-card-image ${bgClass}">
        ${meta.image ? `<img src="${meta.image}" alt="${meta.name}" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />` : ''}
        <div class="cat-image-fallback" style="${meta.image ? 'display:none;' : ''}">
          <span style="font-size:60px;filter:drop-shadow(2px 4px 6px rgba(181,18,43,0.2));">${meta.icon}</span>
        </div>
        <div class="cat-icon-overlay" aria-hidden="true" style="background:rgba(255,255,255,0.9);">
          <span style="font-size:14px;">✦</span>
        </div>
      </div>
      <div class="category-card-body">
        <div class="category-card-name">${meta.name} <span class="cat-card-arrow" aria-hidden="true">→</span></div>
        <div class="category-card-count">${itemCount} essentials</div>
      </div>
    </a>
  `;
}

/* ────────────────────────────────────────────────────────────
   REMINDER DATE FORMATTER
   ──────────────────────────────────────────────────────────── */

/**
 * Format a date string to a human-readable label
 * @param {string} dateStr — YYYY-MM-DD
 * @returns {string}
 */
function formatDate(dateStr) {
  if (!dateStr) return '—';
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
}

/**
 * Get reminder status for a given date
 * @param {string} reminderDate — YYYY-MM-DD
 * @returns {'overdue'|'today'|'upcoming'}
 */
function getReminderStatus(reminderDate) {
  if (!reminderDate) return 'upcoming';
  const today = new Date().toISOString().split('T')[0];
  if (reminderDate < today)  return 'overdue';
  if (reminderDate === today) return 'today';
  return 'upcoming';
}

/**
 * Get a human-readable reminder label with status badge HTML
 * @param {string} reminderDate
 * @returns {string}
 */
function reminderBadgeHTML(reminderDate) {
  const status = getReminderStatus(reminderDate);
  const labelMap = { overdue: 'Overdue', today: 'Due Today', upcoming: 'Upcoming' };
  return `<span class="badge badge-${status}">${labelMap[status]}</span>`;
}

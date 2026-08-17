/* ============================================================
   SMART LIZT — APP JS (Home Page + Wizard)
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  // Seed demo data if fresh install
  initDemoData();

  // Render shared nav + footer
  renderNavbar('home', '');
  renderFooter('');

  // Render stats
  renderStats();

  // Render category preview grid
  renderCategoryPreview();

  // Bind hero buttons
  bindHeroButtons();

  // Bind wizard button
  document.getElementById('wizard-btn')?.addEventListener('click', openWizard);
});

/* ────────────────────────────────────────────────────────────
   STATS CARDS
   ──────────────────────────────────────────────────────────── */
function renderStats() {
  const stats = getChecklistStats();

  const el = id => document.getElementById(id);

  if (el('stat-remaining')) el('stat-remaining').textContent = stats.remaining;
  if (el('stat-completed')) el('stat-completed').textContent = stats.completed;
  if (el('stat-reminders')) el('stat-reminders').textContent = stats.reminders;
  if (el('stat-categories'))el('stat-categories').textContent = stats.categories;
}

/* ────────────────────────────────────────────────────────────
   CATEGORY PREVIEW GRID
   ──────────────────────────────────────────────────────────── */
function renderCategoryPreview() {
  const grid = document.getElementById('category-preview-grid');
  if (!grid) return;

  const html = Object.entries(CATEGORIES)
    .map(([slug, meta]) => renderCategoryCard(slug, meta, `category/${slug}.html`))
    .join('');

  grid.innerHTML = html;
}

/* ────────────────────────────────────────────────────────────
   HERO BUTTON BINDINGS
   ──────────────────────────────────────────────────────────── */
function bindHeroButtons() {
  const createBtn = document.getElementById('hero-create-btn');
  if (createBtn) {
    createBtn.addEventListener('click', () => {
      window.location.href = 'checklist.html';
    });
  }

  const exploreBtn = document.getElementById('hero-explore-btn');
  if (exploreBtn) {
    exploreBtn.addEventListener('click', () => {
      document.getElementById('categories-section')?.scrollIntoView({ behavior: 'smooth' });
    });
  }
}

/* ────────────────────────────────────────────────────────────
   WIZARD — "Help Me Build a Lizt"
   Steps: 1 = select area, 2 = select type, 3 = suggestions
   ──────────────────────────────────────────────────────────── */

let wizardState = { area: null, type: null, step: 1 };

const WIZARD_AREAS = [
  { id: 'kitchen',    label: 'Kitchen',    icon: '🍳' },
  { id: 'bathroom',   label: 'Bathroom',   icon: '🚿' },
  { id: 'bedroom',    label: 'Bedroom',    icon: '🛏️' },
  { id: 'office',     label: 'Office',     icon: '💼' },
  { id: 'study-room', label: 'Study Room', icon: '📚' },
  { id: 'whole house',label: 'Whole House',icon: '🏠' },
];

const WIZARD_TYPES = [
  { id: 'regular restocking', label: 'Regular Restocking', icon: '🔄' },
  { id: 'moving in',          label: 'Moving In',          icon: '📦' },
  { id: 'cleaning',           label: 'Cleaning',           icon: '🧹' },
  { id: 'party',              label: 'Party',              icon: '🎉' },
  { id: 'monthly shopping',   label: 'Monthly Shopping',   icon: '🗓️' },
  { id: 'emergency',          label: 'Emergency',          icon: '🚨' },
];

function openWizard() {
  wizardState = { area: null, type: null, step: 1 };
  renderWizardStep();
}

function renderWizardStep() {
  const step = wizardState.step;

  let contentHTML = '';

  if (step === 1) {
    contentHTML = `
      <div class="wizard-step-indicator">
        <div class="wizard-step-dot active"></div>
        <div class="wizard-step-dot"></div>
        <div class="wizard-step-dot"></div>
      </div>
      <div class="modal-title">🛒 Help Me Build a Lizt</div>
      <div class="modal-subtitle">Step 1 of 3 — Where are you shopping for?</div>
      <div class="wizard-options">
        ${WIZARD_AREAS.map(a => `
          <button class="wizard-option ${wizardState.area === a.id ? 'selected' : ''}"
                  data-area="${a.id}"
                  aria-pressed="${wizardState.area === a.id}">
            <span class="wizard-option-icon" aria-hidden="true">${a.icon}</span>
            <span class="wizard-option-label">${a.label}</span>
          </button>
        `).join('')}
      </div>
      <div class="modal-footer">
        <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
        <button class="btn btn-primary" id="wizard-next-1" ${!wizardState.area ? 'disabled' : ''}>Next →</button>
      </div>
    `;
  }

  else if (step === 2) {
    contentHTML = `
      <div class="wizard-step-indicator">
        <div class="wizard-step-dot done"></div>
        <div class="wizard-step-dot active"></div>
        <div class="wizard-step-dot"></div>
      </div>
      <div class="modal-title">🛒 Help Me Build a Lizt</div>
      <div class="modal-subtitle">Step 2 of 3 — What type of shopping?</div>
      <div class="wizard-options">
        ${WIZARD_TYPES.map(t => `
          <button class="wizard-option ${wizardState.type === t.id ? 'selected' : ''}"
                  data-type="${t.id}"
                  aria-pressed="${wizardState.type === t.id}">
            <span class="wizard-option-icon" aria-hidden="true">${t.icon}</span>
            <span class="wizard-option-label">${t.label}</span>
          </button>
        `).join('')}
      </div>
      <div class="modal-footer">
        <button class="btn btn-ghost" id="wizard-back-2">← Back</button>
        <button class="btn btn-primary" id="wizard-next-2" ${!wizardState.type ? 'disabled' : ''}>Next →</button>
      </div>
    `;
  }

  else if (step === 3) {
    const suggestions = getWizardSuggestions(wizardState.area, wizardState.type);
    const areaLabel = WIZARD_AREAS.find(a => a.id === wizardState.area)?.label || wizardState.area;
    const typeLabel = WIZARD_TYPES.find(t => t.id === wizardState.type)?.label || wizardState.type;

    contentHTML = `
      <div class="wizard-step-indicator">
        <div class="wizard-step-dot done"></div>
        <div class="wizard-step-dot done"></div>
        <div class="wizard-step-dot active"></div>
      </div>
      <div class="modal-title">✨ Smart Suggestions</div>
      <div class="modal-subtitle">
        Based on: <strong style="color:var(--gold)">${areaLabel}</strong> ·
        <strong style="color:var(--gold)">${typeLabel}</strong>
      </div>
      ${suggestions.length > 0 ? `
        <div class="wizard-suggestion-list">
          ${suggestions.map(name => `
            <div class="wizard-suggestion-item">
              <span class="check-icon" aria-hidden="true">✓</span>
              <span>${name}</span>
            </div>
          `).join('')}
        </div>
        <div class="modal-footer" style="flex-direction:column; gap: var(--space-3);">
          <button class="btn btn-primary" id="wizard-add-all" style="width:100%;">
            🛒 Add All to Smart Lizt
          </button>
          <div style="display:flex; gap:var(--space-3); width:100%;">
            <button class="btn btn-ghost" id="wizard-back-3" style="flex:1">← Back</button>
            <button class="btn btn-outline" id="wizard-go-cat" style="flex:1">Explore Category</button>
          </div>
        </div>
      ` : `
        <p style="color:var(--text-muted); font-size:14px; margin: var(--space-5) 0;">
          No preset suggestions for this combination. Try a different area or shopping type.
        </p>
        <div class="modal-footer">
          <button class="btn btn-ghost" id="wizard-back-3">← Back</button>
          <button class="btn btn-outline" id="wizard-go-cat">Explore Category</button>
        </div>
      `}
    `;
  }

  openModal(contentHTML, '', (overlay) => bindWizardEvents(overlay));
}

function bindWizardEvents(overlay) {
  const step = wizardState.step;

  if (step === 1) {
    // Select area
    overlay.querySelectorAll('[data-area]').forEach(btn => {
      btn.addEventListener('click', () => {
        overlay.querySelectorAll('[data-area]').forEach(b => {
          b.classList.remove('selected');
          b.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('selected');
        btn.setAttribute('aria-pressed', 'true');
        wizardState.area = btn.dataset.area;
        overlay.querySelector('#wizard-next-1')?.removeAttribute('disabled');
      });
    });

    overlay.querySelector('#wizard-next-1')?.addEventListener('click', () => {
      if (!wizardState.area) return;
      wizardState.step = 2;
      renderWizardStep();
    });
  }

  else if (step === 2) {
    // Select type
    overlay.querySelectorAll('[data-type]').forEach(btn => {
      btn.addEventListener('click', () => {
        overlay.querySelectorAll('[data-type]').forEach(b => {
          b.classList.remove('selected');
          b.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('selected');
        btn.setAttribute('aria-pressed', 'true');
        wizardState.type = btn.dataset.type;
        overlay.querySelector('#wizard-next-2')?.removeAttribute('disabled');
      });
    });

    overlay.querySelector('#wizard-back-2')?.addEventListener('click', () => {
      wizardState.step = 1;
      renderWizardStep();
    });

    overlay.querySelector('#wizard-next-2')?.addEventListener('click', () => {
      if (!wizardState.type) return;
      wizardState.step = 3;
      renderWizardStep();
    });
  }

  else if (step === 3) {
    overlay.querySelector('#wizard-back-3')?.addEventListener('click', () => {
      wizardState.step = 2;
      renderWizardStep();
    });

    overlay.querySelector('#wizard-add-all')?.addEventListener('click', () => {
      const suggestions = getWizardSuggestions(wizardState.area, wizardState.type);
      let addedCount = 0;

      suggestions.forEach(name => {
        // Find item in ITEMS data to get category
        let foundCat = null;
        for (const [slug, items] of Object.entries(ITEMS)) {
          const match = items.find(i => i.name.toLowerCase() === name.toLowerCase());
          if (match) {
            foundCat = CATEGORIES[slug]?.name || slug;
            addChecklistItem({
              name:     match.name,
              category: foundCat,
              quantity: match.defaultQty || 1,
              unit:     match.unit || '',
              brand:    'Any Brand',
              priority: 'Medium',
            });
            addedCount++;
            break;
          }
        }
      });

      closeModal();
      showToast(`✓ ${addedCount} items added to your Smart Lizt!`, 'success');
      renderStats();
    });

    overlay.querySelector('#wizard-go-cat')?.addEventListener('click', () => {
      closeModal();
      const slug = wizardState.area === 'whole house' ? 'categories' : wizardState.area;
      window.location.href = slug === 'categories'
        ? 'categories.html'
        : `category/${slug}.html`;
    });
  }
}

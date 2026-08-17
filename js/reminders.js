/* ============================================================
   SMART LIZT — REMINDERS JS
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initDemoData();
  renderNavbar('reminders', '');
  renderFooter('');
  renderRemindersPage();
});

/* ────────────────────────────────────────────────────────────
   MAIN RENDER
   ──────────────────────────────────────────────────────────── */
function renderRemindersPage() {
  const reminders = loadReminders();
  const today     = new Date().toISOString().split('T')[0];

  const overdue  = reminders.filter(r => r.reminderDate < today);
  const dueToday = reminders.filter(r => r.reminderDate === today);
  const upcoming = reminders.filter(r => r.reminderDate > today);

  // Update page subtitle counts
  const subtitle = document.getElementById('reminders-subtitle');
  if (subtitle) {
    subtitle.textContent = `${reminders.length} active reminder${reminders.length !== 1 ? 's' : ''} · ${overdue.length} overdue · ${dueToday.length} due today`;
  }

  renderReminderSection('overdue-section',  'overdue-grid',  overdue,  '🔴 Overdue',      'overdue');
  renderReminderSection('today-section',    'today-grid',    dueToday, '🟡 Due Today',    'today');
  renderReminderSection('upcoming-section', 'upcoming-grid', upcoming, '🟢 Upcoming',     'upcoming');

  // If nothing
  const grid = document.getElementById('all-reminders-grid');
  if (grid && !reminders.length) {
    grid.innerHTML = renderEmptyState('reminders', '');
  }
}

/* ────────────────────────────────────────────────────────────
   SECTION RENDERER
   ──────────────────────────────────────────────────────────── */
function renderReminderSection(sectionId, gridId, items, title, status) {
  const section = document.getElementById(sectionId);
  if (!section) return;

  if (!items.length) {
    section.style.display = 'none';
    return;
  }

  section.style.display = 'block';
  const titleEl = section.querySelector('.reminder-section-title');
  if (titleEl) titleEl.textContent = title;

  const grid = section.querySelector('.reminders-grid');
  if (!grid) return;

  grid.innerHTML = items.map(item => renderReminderCard(item, status)).join('');

  // Bind events
  items.forEach(item => bindReminderCardEvents(item));
}

/* ────────────────────────────────────────────────────────────
   REMINDER CARD HTML
   ──────────────────────────────────────────────────────────── */
function renderReminderCard(item, status) {
  const statusBadge = {
    overdue:  `<span class="badge badge-overdue">Overdue</span>`,
    today:    `<span class="badge badge-today">Due Today</span>`,
    upcoming: `<span class="badge badge-upcoming">Upcoming</span>`,
  }[status] || '';

  const prioClasses = { High: 'badge-high', Medium: 'badge-medium', Low: 'badge-low' };

  return `
    <div class="reminder-card ${status}" id="reminder-${item.id}" data-id="${item.id}">
      <div class="reminder-card-header">
        <div style="display:flex; align-items:center; gap: 12px; flex:1; min-width:0">
          <div class="reminder-icon" aria-hidden="true">🔔</div>
          <div>
            <div style="font-size:17px; font-weight:700; color:var(--white)">${item.name}</div>
            <div style="margin-top:4px; display:flex; gap:6px; flex-wrap:wrap">
              ${statusBadge}
              <span class="badge ${prioClasses[item.priority] || 'badge-medium'}">${item.priority}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="reminder-card-meta">
        <div class="reminder-meta-item">
          <label>Category</label>
          <span>${item.category}</span>
        </div>
        <div class="reminder-meta-item">
          <label>Quantity</label>
          <span>${item.quantity}${item.unit ? ' ' + item.unit : ''}</span>
        </div>
        <div class="reminder-meta-item">
          <label>Brand</label>
          <span>${item.brand && item.brand !== 'Any Brand' ? item.brand : '—'}</span>
        </div>
        <div class="reminder-meta-item">
          <label>Reminder Date</label>
          <span>${formatDate(item.reminderDate)}</span>
        </div>
        ${item.price ? `
          <div class="reminder-meta-item">
            <label>Est. Cost</label>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ` : ''}
      </div>

      <div class="reminder-actions">
        <button class="btn btn-success btn-sm" data-mark-purchased="${item.id}">✓ Mark Purchased</button>
        <button class="btn btn-ghost btn-sm" data-snooze="${item.id}">⏰ Snooze 3 Days</button>
        <button class="btn btn-outline btn-sm" data-edit-reminder="${item.id}">✏️ Edit</button>
      </div>
    </div>
  `;
}

/* ────────────────────────────────────────────────────────────
   REMINDER CARD EVENT BINDINGS
   ──────────────────────────────────────────────────────────── */
function bindReminderCardEvents(item) {
  const card = document.getElementById(`reminder-${item.id}`);
  if (!card) return;

  // Mark purchased
  card.querySelector(`[data-mark-purchased="${item.id}"]`)?.addEventListener('click', () => {
    completeChecklistItem(item.id);
    showToast(`✓ ${item.name} marked as purchased`, 'success');
    renderRemindersPage();
  });

  // Snooze 3 days
  card.querySelector(`[data-snooze="${item.id}"]`)?.addEventListener('click', () => {
    snoozeReminder(item.id, 3);
    showToast(`⏰ Reminder snoozed for 3 days`, 'info');
    renderRemindersPage();
  });

  // Edit reminder date
  card.querySelector(`[data-edit-reminder="${item.id}"]`)?.addEventListener('click', () => {
    openEditReminderModal(item);
  });
}

/* ────────────────────────────────────────────────────────────
   EDIT REMINDER MODAL
   ──────────────────────────────────────────────────────────── */
function openEditReminderModal(item) {
  openModal(`
    <div class="modal-title">🔔 Edit Reminder</div>
    <div class="modal-subtitle">Update reminder for <strong>${item.name}</strong></div>
    <div class="modal-form">
      <div class="form-group">
        <label class="form-label" for="er-date">New Reminder Date</label>
        <input type="date" class="form-input" id="er-date" value="${item.reminderDate || ''}" />
      </div>
      <div class="form-group">
        <span class="form-label">Or choose a preset</span>
        <div style="display:flex; flex-wrap:wrap; gap:8px; margin-top:6px;">
          ${[['Tomorrow','1'],['3 Days','3'],['1 Week','7'],['2 Weeks','14'],['1 Month','30']].map(([label, days]) => `
            <button class="btn btn-ghost btn-sm" data-preset="${days}">${label}</button>
          `).join('')}
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-danger btn-sm" id="er-remove">Remove Reminder</button>
        <div style="display:flex; gap:8px;">
          <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
          <button class="btn btn-primary" id="er-save">Save</button>
        </div>
      </div>
    </div>
  `, 'modal-sm', (overlay) => {
    const dateInput = overlay.querySelector('#er-date');

    // Preset buttons
    overlay.querySelectorAll('[data-preset]').forEach(btn => {
      btn.addEventListener('click', () => {
        const d = new Date();
        d.setDate(d.getDate() + parseInt(btn.dataset.preset));
        dateInput.value = d.toISOString().split('T')[0];
      });
    });

    // Save
    overlay.querySelector('#er-save').addEventListener('click', () => {
      const date = dateInput.value;
      if (!date) { showToast('Please select a date', 'error'); return; }
      saveReminder(item.id, date);
      closeModal();
      showToast('🔔 Reminder updated', 'success');
      renderRemindersPage();
    });

    // Remove
    overlay.querySelector('#er-remove').addEventListener('click', () => {
      updateChecklistItem(item.id, { reminderDate: null });
      closeModal();
      showToast('✓ Reminder removed', 'info');
      renderRemindersPage();
    });
  });
}

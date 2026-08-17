/* ============================================================
   SMART LIZT — PROFILE JS
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initDemoData();
  renderNavbar('profile', '');
  renderFooter('');
  renderProfilePage();
});

function renderProfilePage() {
  const profile = loadProfile();
  const stats   = getChecklistStats();

  // Bind preference fields
  bindToggle('pref-notifications',  'notifications',  profile);
  bindToggle('pref-suggestions',    'autoSuggestions', profile);

  // Default reminder select
  const defRem = document.getElementById('pref-default-reminder');
  if (defRem) {
    defRem.value = profile.defaultReminder || 'none';
    defRem.addEventListener('change', () => {
      const p = loadProfile();
      p.defaultReminder = defRem.value;
      saveProfile(p);
      showToast('✓ Preference saved', 'success');
    });
  }

  // Default quantity
  const defQty = document.getElementById('pref-default-qty');
  if (defQty) {
    defQty.value = profile.defaultQuantity || 1;
    defQty.addEventListener('change', () => {
      const p = loadProfile();
      p.defaultQuantity = parseInt(defQty.value) || 1;
      saveProfile(p);
      showToast('✓ Preference saved', 'success');
    });
  }

  // Render live stats
  renderProfileStats(stats);

  // Clear data
  document.getElementById('clear-data-btn')?.addEventListener('click', () => {
    openConfirmModal(
      'Clear All Data?',
      'This will permanently delete your checklist, history, and all settings.',
      () => {
        clearAllData();
        showToast('✓ All data cleared', 'success');
        setTimeout(() => window.location.reload(), 1200);
      }
    );
  });
}

function bindToggle(elementId, profileKey, profile) {
  const toggle = document.getElementById(elementId);
  if (!toggle) return;

  toggle.checked = !!profile[profileKey];

  toggle.addEventListener('change', () => {
    const p = loadProfile();
    p[profileKey] = toggle.checked;
    saveProfile(p);
    showToast(`✓ ${profileKey === 'notifications' ? 'Notifications' : 'Auto-suggestions'} ${toggle.checked ? 'enabled' : 'disabled'}`, 'success');
  });
}

function renderProfileStats(stats) {
  const el = id => document.getElementById(id);
  if (el('ps-remaining'))  el('ps-remaining').textContent  = stats.remaining;
  if (el('ps-completed'))  el('ps-completed').textContent  = stats.completed;
  if (el('ps-reminders'))  el('ps-reminders').textContent  = stats.reminders;
  if (el('ps-highpri'))    el('ps-highpri').textContent    = stats.highPriority;
}

function openConfirmModal(title, desc, onConfirm) {
  openModal(`
    <div class="modal-title" style="font-size:20px">⚠️ ${title}</div>
    <p style="color:var(--text-muted); margin:12px 0 24px; font-size:14px">${desc}</p>
    <div class="modal-footer">
      <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
      <button class="btn btn-danger" id="confirm-yes-btn">Confirm</button>
    </div>
  `, 'modal-sm', (overlay) => {
    overlay.querySelector('#confirm-yes-btn').addEventListener('click', () => {
      closeModal();
      onConfirm();
    });
  });
}

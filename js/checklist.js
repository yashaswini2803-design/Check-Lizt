/* ============================================================
   SMART LIZT — CHECKLIST JS
   My Smart Lizt page logic
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initDemoData();
  renderNavbar('checklist', '');
  renderFooter('');
  renderChecklist();
  bindChecklistActions();
});

/* ────────────────────────────────────────────────────────────
   RENDER FULL CHECKLIST
   ──────────────────────────────────────────────────────────── */
function renderChecklist() {
  const list   = loadChecklist();
  const active = list.filter(i => !i.completed);
  const done   = list.filter(i => i.completed);

  // Summary pills
  renderSummaryPills(active, done, list);

  // Progress bar
  renderProgressBar(active.length, done.length);

  // Sidebar budget
  renderBudgetSidebar(active);

  // Main checklist groups
  renderChecklistGroups(active, done);
}

/* ────────────────────────────────────────────────────────────
   SUMMARY PILLS
   ──────────────────────────────────────────────────────────── */
function renderSummaryPills(active, done, all) {
  const container = document.getElementById('summary-pills');
  if (!container) return;

  const highPri = active.filter(i => i.priority === 'High').length;
  const cats    = new Set(active.map(i => i.category)).size;

  container.innerHTML = `
    <div class="checklist-summary-pill">
      📋 <span class="pill-value">${all.length}</span> Total
    </div>
    <div class="checklist-summary-pill">
      ⏳ <span class="pill-value">${active.length}</span> Remaining
    </div>
    <div class="checklist-summary-pill">
      ✓ <span class="pill-value">${done.length}</span> Done
    </div>
    <div class="checklist-summary-pill">
      🔴 <span class="pill-value">${highPri}</span> High Priority
    </div>
    <div class="checklist-summary-pill">
      📁 <span class="pill-value">${cats}</span> Categories
    </div>
  `;
}

/* ────────────────────────────────────────────────────────────
   PROGRESS BAR
   ──────────────────────────────────────────────────────────── */
function renderProgressBar(remaining, done) {
  const section = document.getElementById('progress-section');
  if (!section) return;

  const total = remaining + done;
  const pct   = total > 0 ? Math.round((done / total) * 100) : 0;

  section.innerHTML = `
    <div class="progress-section">
      <div class="progress-header">
        <span class="progress-label">Shopping Progress</span>
        <span class="progress-pct">${pct}% complete</span>
      </div>
      <div class="progress-bar-track" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100">
        <div class="progress-bar-fill" style="width:${pct}%"></div>
      </div>
      <p style="font-size:12px; color:var(--text-muted); margin-top:8px">
        ${done} of ${total} items purchased
      </p>
    </div>
  `;
}

/* ────────────────────────────────────────────────────────────
   BUDGET SIDEBAR
   ──────────────────────────────────────────────────────────── */
function renderBudgetSidebar(active) {
  const sidebar = document.getElementById('budget-sidebar');
  if (!sidebar) return;

  const priced = active.filter(i => i.price !== null && i.price !== undefined);
  const total  = priced.reduce((s, i) => s + (i.price * (i.quantity || 1)), 0);

  sidebar.innerHTML = `
    <div class="sidebar-card">
      <div class="sidebar-card-title">💰 Estimated Budget</div>
      ${priced.length > 0 ? `
        <div class="budget-display">
          <div class="budget-amount">$${total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
          <div class="budget-label">for ${priced.length} priced items</div>
        </div>
      ` : `
        <p style="color:var(--text-muted); font-size:13px; margin-top:8px; line-height:1.6">
          Add prices to items from category pages to see your estimated total here.
        </p>
      `}
    </div>

    <div class="sidebar-card">
      <div class="sidebar-card-title">⚡ Quick Actions</div>
      <div style="display:flex; flex-direction:column; gap:8px; margin-top:8px;">
        <button class="btn btn-outline btn-sm" id="sidebar-add-btn" style="width:100%">+ Add Item</button>
        <a href="categories.html" class="btn btn-ghost btn-sm" style="width:100%; text-align:center;">Explore Categories</a>
      </div>
    </div>
  `;

  document.getElementById('sidebar-add-btn')?.addEventListener('click', openAddItemModal);
}

/* ────────────────────────────────────────────────────────────
   CHECKLIST GROUPS
   ──────────────────────────────────────────────────────────── */
function renderChecklistGroups(active, done) {
  const container = document.getElementById('checklist-groups');
  if (!container) return;

  if (!active.length && !done.length) {
    container.innerHTML = renderEmptyState('checklist', '');
    return;
  }

  // Group active items by category
  const grouped = {};
  active.forEach(item => {
    if (!grouped[item.category]) grouped[item.category] = [];
    grouped[item.category].push(item);
  });

  let html = '';

  // Active items grouped
  if (active.length) {
    html += Object.entries(grouped).map(([cat, items]) => `
      <div class="checklist-group">
        <div class="checklist-group-header">
          <span class="checklist-group-title">${cat}</span>
          <div class="checklist-group-line" aria-hidden="true"></div>
          <span class="checklist-group-badge">${items.length}</span>
        </div>
        ${items.map(item => renderChecklistItem(item)).join('')}
      </div>
    `).join('');
  }

  // Completed section
  if (done.length) {
    html += `
      <div class="checklist-group" id="completed-group">
        <div class="checklist-group-header">
          <span class="checklist-group-title" style="color:var(--success)">✓ Completed</span>
          <div class="checklist-group-line" aria-hidden="true"></div>
          <span class="checklist-group-badge">${done.length}</span>
        </div>
        ${done.map(item => renderChecklistItem(item)).join('')}
      </div>
    `;
  }

  container.innerHTML = html;

  // Bind item events
  loadChecklist().forEach(item => bindChecklistItemEvents(item));
}

/* ────────────────────────────────────────────────────────────
   CHECKLIST ITEM CARD HTML
   ──────────────────────────────────────────────────────────── */
function renderChecklistItem(item) {
  const prioClasses = { High: 'badge-high', Medium: 'badge-medium', Low: 'badge-low' };
  const itemLink = item.link || '#';
  const hasCustomLink = itemLink && itemLink !== '#';

  return `
    <div class="checklist-item ${item.completed ? 'completed' : ''}" id="item-${item.id}" data-id="${item.id}">
      <div class="item-checkbox-wrap">
        <input
          type="checkbox"
          class="item-checkbox"
          id="check-${item.id}"
          ${item.completed ? 'checked' : ''}
          aria-label="${item.completed ? 'Mark as not purchased' : 'Mark as purchased'}: ${item.name}"
        />
      </div>
      <div class="checklist-item-content">
        <div class="checklist-item-name">
          <a href="${itemLink}" class="checklist-item-link" ${hasCustomLink ? 'target="_blank" rel="noopener noreferrer"' : ''} title="${hasCustomLink ? 'Open product link' : 'Item link'}">
            ${item.name}
          </a>
          <a href="${itemLink}" class="checklist-item-ext-link ${hasCustomLink ? 'active-link' : ''}" ${hasCustomLink ? 'target="_blank" rel="noopener noreferrer"' : ''} title="${hasCustomLink ? 'Open product link: ' + itemLink : 'No custom link inserted (Click to open #)'}">
            🔗
          </a>
        </div>
        <div class="checklist-item-meta">
          <span class="checklist-item-meta-tag">📁 ${item.category}</span>
          <span class="checklist-item-meta-tag">📦 ${item.quantity}${item.unit ? ' ' + item.unit : ''}</span>
          ${item.brand && item.brand !== 'Any Brand' ? `<span class="checklist-item-meta-tag">🏷 ${item.brand}</span>` : ''}
          <span class="badge ${prioClasses[item.priority] || 'badge-medium'}">${item.priority}</span>
          ${item.reminderDate ? `<span class="checklist-item-meta-tag">🔔 ${formatDate(item.reminderDate)}</span>` : ''}
          ${item.price ? `<span class="checklist-item-meta-tag">$${(item.price * item.quantity).toFixed(2)}</span>` : ''}
          ${hasCustomLink ? `<a href="${itemLink}" target="_blank" rel="noopener noreferrer" class="checklist-item-meta-tag link-tag">🌐 Product Link</a>` : ''}
          ${item.notes ? `<span class="checklist-item-meta-tag" title="${item.notes}">📝 Note</span>` : ''}
        </div>
      </div>
      <div class="checklist-item-actions">
        <button class="item-action-btn edit" aria-label="Edit ${item.name}" data-edit="${item.id}">✏️</button>
        <button class="item-action-btn delete" aria-label="Delete ${item.name}" data-delete="${item.id}">🗑</button>
      </div>
    </div>
  `;
}

/* ────────────────────────────────────────────────────────────
   CHECKLIST ITEM EVENT BINDINGS
   ──────────────────────────────────────────────────────────── */
function bindChecklistItemEvents(item) {
  const itemEl  = document.getElementById(`item-${item.id}`);
  if (!itemEl) return;

  // Checkbox
  const checkbox = itemEl.querySelector(`#check-${item.id}`);
  checkbox?.addEventListener('change', () => {
    if (checkbox.checked) {
      completeChecklistItem(item.id);
      showToast(`✓ ${item.name} marked as purchased`, 'success');
    } else {
      uncompleteChecklistItem(item.id);
      showToast(`↩ ${item.name} moved back to active`, 'info');
    }
    renderChecklist();
  });

  // Edit button
  itemEl.querySelector(`[data-edit="${item.id}"]`)?.addEventListener('click', () => {
    openEditItemModal(item);
  });

  // Delete button
  itemEl.querySelector(`[data-delete="${item.id}"]`)?.addEventListener('click', () => {
    openConfirmModal(
      `Delete "${item.name}"?`,
      'This item will be removed from your Smart Lizt.',
      () => {
        deleteChecklistItem(item.id);
        showToast(`✓ ${item.name} removed`, 'success');
        renderChecklist();
      }
    );
  });
}

/* ────────────────────────────────────────────────────────────
   CHECKLIST TOP-LEVEL ACTIONS
   ──────────────────────────────────────────────────────────── */
function bindChecklistActions() {
  document.getElementById('add-item-btn')?.addEventListener('click', openAddItemModal);

  document.getElementById('clear-completed-btn')?.addEventListener('click', () => {
    const done = loadChecklist().filter(i => i.completed);
    if (!done.length) { showToast('No completed items to clear', 'info'); return; }
    openConfirmModal(
      `Clear ${done.length} completed items?`,
      'This cannot be undone.',
      () => {
        clearCompletedItems();
        showToast('✓ Completed items cleared', 'success');
        renderChecklist();
      }
    );
  });

  document.getElementById('delete-all-btn')?.addEventListener('click', () => {
    const all = loadChecklist();
    if (!all.length) { showToast('Your checklist is already empty', 'info'); return; }
    openConfirmModal(
      'Delete ALL items?',
      'This will permanently remove your entire Smart Lizt.',
      () => {
        deleteAllItems();
        showToast('✓ All items deleted', 'success');
        renderChecklist();
      }
    );
  });

  document.getElementById('share-btn')?.addEventListener('click', shareChecklist);
  document.getElementById('export-btn')?.addEventListener('click', exportChecklist);
}

/* ────────────────────────────────────────────────────────────
   ADD CUSTOM ITEM MODAL
   ──────────────────────────────────────────────────────────── */
function openAddItemModal() {
  openModal(`
    <div class="modal-title">+ Add Item</div>
    <div class="modal-subtitle">Add a custom item to your Smart Lizt</div>
    <form class="modal-form" id="add-item-form" novalidate>
      <div class="form-group">
        <label class="form-label" for="ai-name">Item Name *</label>
        <input type="text" class="form-input" id="ai-name" placeholder="e.g. Coconut Oil" required aria-required="true" />
      </div>
      <div class="form-group">
        <label class="form-label" for="ai-category">Category *</label>
        <select class="form-select" id="ai-category" required aria-required="true">
          ${Object.values(CATEGORIES).map(c => `<option value="${c.name}">${c.icon} ${c.name}</option>`).join('')}
          <option value="Other">Other</option>
        </select>
      </div>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px">
        <div class="form-group">
          <label class="form-label" for="ai-qty">Quantity</label>
          <input type="number" class="form-input" id="ai-qty" value="1" min="1" max="99" />
        </div>
        <div class="form-group">
          <label class="form-label" for="ai-unit">Unit</label>
          <input type="text" class="form-input" id="ai-unit" placeholder="kg, L, pcs..." />
        </div>
      </div>
      <div class="form-group">
        <label class="form-label" for="ai-brand">Brand</label>
        <input type="text" class="form-input" id="ai-brand" placeholder="e.g. Tata, Any Brand" />
      </div>
      <div class="form-group">
        <span class="form-label">Priority</span>
        <div class="priority-selector" role="group" aria-label="Priority">
          <button type="button" class="priority-btn" data-priority="Low">Low</button>
          <button type="button" class="priority-btn active" data-priority="Medium">Medium</button>
          <button type="button" class="priority-btn" data-priority="High">High</button>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label" for="ai-reminder">Reminder</label>
        <select class="form-select" id="ai-reminder">
          <option value="">No Reminder</option>
          <option value="1">Tomorrow</option>
          <option value="3">3 Days</option>
          <option value="7">1 Week</option>
          <option value="30">1 Month</option>
          <option value="custom">Custom Date</option>
        </select>
        <input type="date" class="form-input" id="ai-custom-reminder" style="display:none; margin-top:6px" />
      </div>
      <div class="form-group">
        <label class="form-label" for="ai-link">Item Link / URL (optional)</label>
        <input type="url" class="form-input" id="ai-link" placeholder="https://example.com/product (or #)" />
      </div>
      <div class="form-group">
        <label class="form-label" for="ai-price">Price per unit ($) — optional</label>
        <input type="number" class="form-input" id="ai-price" placeholder="e.g. 5.99" min="0" step="0.01" />
      </div>
      <div class="form-group">
        <label class="form-label" for="ai-notes">Notes</label>
        <textarea class="form-textarea" id="ai-notes" placeholder="Optional notes..."></textarea>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-ghost" onclick="closeModal()">Cancel</button>
        <button type="submit" class="btn btn-primary">Add to Smart Lizt</button>
      </div>
    </form>
  `, 'modal-lg', (overlay) => {
    // Priority bindings
    overlay.querySelectorAll('.priority-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        overlay.querySelectorAll('.priority-btn').forEach(b => {
          b.classList.remove('active'); b.setAttribute('aria-pressed','false');
        });
        btn.classList.add('active'); btn.setAttribute('aria-pressed','true');
      });
    });

    // Reminder select
    const reminderSel = overlay.querySelector('#ai-reminder');
    const customRem   = overlay.querySelector('#ai-custom-reminder');
    reminderSel?.addEventListener('change', () => {
      customRem.style.display = reminderSel.value === 'custom' ? 'block' : 'none';
    });

    // Form submit
    overlay.querySelector('#add-item-form').addEventListener('submit', (e) => {
      e.preventDefault();

      const name = overlay.querySelector('#ai-name').value.trim();
      if (!name) { showToast('Please enter an item name', 'error'); return; }

      const qty = parseInt(overlay.querySelector('#ai-qty').value) || 1;
      if (qty < 1 || qty > 99) { showToast('Quantity must be between 1–99', 'error'); return; }

      // Reminder
      let reminderDate = null;
      const rv = reminderSel?.value;
      if (rv && rv !== '' && rv !== 'custom') {
        const d = new Date(); d.setDate(d.getDate() + parseInt(rv));
        reminderDate = d.toISOString().split('T')[0];
      } else if (rv === 'custom') {
        reminderDate = customRem?.value || null;
      }

      const linkVal = overlay.querySelector('#ai-link').value.trim() || '#';

      const result = addChecklistItem({
        name,
        category: overlay.querySelector('#ai-category').value,
        quantity: qty,
        unit:     overlay.querySelector('#ai-unit').value.trim(),
        brand:    overlay.querySelector('#ai-brand').value.trim() || 'Any Brand',
        priority: overlay.querySelector('.priority-btn.active')?.dataset.priority || 'Medium',
        reminderDate,
        link:     linkVal,
        price:    overlay.querySelector('#ai-price').value ? parseFloat(overlay.querySelector('#ai-price').value) : null,
        notes:    overlay.querySelector('#ai-notes').value.trim(),
      });

      closeModal();

      if (result.added) {
        showToast(`✓ ${name} added to your Smart Lizt`, 'success');
      } else if (result.updated) {
        showToast(`📦 ${name} quantity updated`, 'info');
      }

      renderChecklist();
    });
  });
}

/* ────────────────────────────────────────────────────────────
   EDIT ITEM MODAL
   ──────────────────────────────────────────────────────────── */
function openEditItemModal(item) {
  openModal(`
    <div class="modal-title">✏️ Edit Item</div>
    <div class="modal-subtitle">Update details for <strong>${item.name}</strong></div>
    <form class="modal-form" id="edit-item-form" novalidate>
      <div class="form-group">
        <label class="form-label" for="ei-name">Item Name</label>
        <input type="text" class="form-input" id="ei-name" value="${item.name}" required />
      </div>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px">
        <div class="form-group">
          <label class="form-label" for="ei-qty">Quantity</label>
          <input type="number" class="form-input" id="ei-qty" value="${item.quantity}" min="1" max="99" />
        </div>
        <div class="form-group">
          <label class="form-label" for="ei-unit">Unit</label>
          <input type="text" class="form-input" id="ei-unit" value="${item.unit || ''}" />
        </div>
      </div>
      <div class="form-group">
        <label class="form-label" for="ei-brand">Brand</label>
        <input type="text" class="form-input" id="ei-brand" value="${item.brand || ''}" />
      </div>
      <div class="form-group">
        <span class="form-label">Priority</span>
        <div class="priority-selector" role="group">
          ${['Low','Medium','High'].map(p => `
            <button type="button" class="priority-btn ${item.priority === p ? 'active' : ''}"
                    data-priority="${p}" aria-pressed="${item.priority === p}">${p}</button>
          `).join('')}
        </div>
      </div>
      <div class="form-group">
        <label class="form-label" for="ei-reminder">Reminder Date</label>
        <input type="date" class="form-input" id="ei-reminder" value="${item.reminderDate || ''}" />
      </div>
      <div class="form-group">
        <label class="form-label" for="ei-link">Item Link / URL</label>
        <input type="url" class="form-input" id="ei-link" value="${item.link || ''}" placeholder="https://example.com/product (or #)" />
      </div>
      <div class="form-group">
        <label class="form-label" for="ei-price">Price per unit ($)</label>
        <input type="number" class="form-input" id="ei-price" value="${item.price || ''}" min="0" step="0.01" />
      </div>
      <div class="form-group">
        <label class="form-label" for="ei-notes">Notes</label>
        <textarea class="form-textarea" id="ei-notes">${item.notes || ''}</textarea>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-ghost" onclick="closeModal()">Cancel</button>
        <button type="submit" class="btn btn-primary">Save Changes</button>
      </div>
    </form>
  `, 'modal-lg', (overlay) => {
    // Priority bindings
    overlay.querySelectorAll('.priority-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        overlay.querySelectorAll('.priority-btn').forEach(b => {
          b.classList.remove('active'); b.setAttribute('aria-pressed','false');
        });
        btn.classList.add('active'); btn.setAttribute('aria-pressed','true');
      });
    });

    // Form submit
    overlay.querySelector('#edit-item-form').addEventListener('submit', (e) => {
      e.preventDefault();

      const name = overlay.querySelector('#ei-name').value.trim();
      if (!name) { showToast('Item name cannot be empty', 'error'); return; }

      const qty = parseInt(overlay.querySelector('#ei-qty').value) || 1;

      updateChecklistItem(item.id, {
        name,
        quantity:     Math.max(1, qty),
        unit:         overlay.querySelector('#ei-unit').value.trim(),
        brand:        overlay.querySelector('#ei-brand').value.trim() || 'Any Brand',
        priority:     overlay.querySelector('.priority-btn.active')?.dataset.priority || 'Medium',
        reminderDate: overlay.querySelector('#ei-reminder').value || null,
        link:         overlay.querySelector('#ei-link').value.trim() || '#',
        price:        overlay.querySelector('#ei-price').value ? parseFloat(overlay.querySelector('#ei-price').value) : null,
        notes:        overlay.querySelector('#ei-notes').value.trim(),
      });

      closeModal();
      showToast(`✓ ${name} updated`, 'success');
      renderChecklist();
    });
  });
}

/* ────────────────────────────────────────────────────────────
   CONFIRM MODAL
   ──────────────────────────────────────────────────────────── */
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

/* ────────────────────────────────────────────────────────────
   SHARE CHECKLIST
   ──────────────────────────────────────────────────────────── */
function shareChecklist() {
  const list = loadChecklist();
  const active = list.filter(i => !i.completed);

  if (!active.length) { showToast('No active items to share', 'info'); return; }

  const text = buildChecklistText(active);

  if (navigator.share) {
    navigator.share({ title: 'My Smart Lizt', text }).catch(() => copyToClipboard(text));
  } else {
    copyToClipboard(text);
  }
}

function copyToClipboard(text) {
  navigator.clipboard?.writeText(text).then(() => {
    showToast('📋 Checklist copied to clipboard!', 'success');
  }).catch(() => {
    showToast('Could not copy to clipboard', 'error');
  });
}

/* ────────────────────────────────────────────────────────────
   EXPORT CHECKLIST
   ──────────────────────────────────────────────────────────── */
function exportChecklist() {
  const list = loadChecklist();
  if (!list.length) { showToast('Nothing to export', 'info'); return; }

  const text  = buildChecklistText(list, true);
  const blob  = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const url   = URL.createObjectURL(blob);
  const link  = document.createElement('a');
  link.href     = url;
  link.download = `smart-lizt-${new Date().toISOString().split('T')[0]}.txt`;
  link.click();
  URL.revokeObjectURL(url);

  showToast('📥 Checklist exported!', 'success');
}

/**
 * Build a plain-text representation of checklist items
 */
function buildChecklistText(items, includeCompleted = false) {
  const date  = new Date().toLocaleDateString('en-US');
  const lines = ['SMART LIZT', `Generated: ${date}`, '─'.repeat(32), ''];

  const groups = {};
  items.forEach(i => {
    if (!groups[i.category]) groups[i.category] = [];
    groups[i.category].push(i);
  });

  for (const [cat, catItems] of Object.entries(groups)) {
    lines.push(cat.toUpperCase());
    lines.push('─'.repeat(20));
    catItems.forEach(i => {
      const check = i.completed ? '[✓]' : '[ ]';
      const brand = i.brand && i.brand !== 'Any Brand' ? ` · ${i.brand}` : '';
      const price = i.price ? ` · $${i.price}` : '';
      lines.push(`${check} ${i.name} — ${i.quantity}${i.unit ? ' ' + i.unit : ''}${brand}${price}`);
    });
    lines.push('');
  }

  return lines.join('\n');
}

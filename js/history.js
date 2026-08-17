/* ============================================================
   SMART LIZT — HISTORY JS
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initDemoData();
  renderNavbar('history', '');
  renderFooter('');
  renderHistoryPage();
});

function renderHistoryPage() {
  const history = loadHistory();
  const container = document.getElementById('history-container');
  if (!container) return;

  const subtitle = document.getElementById('history-subtitle');
  if (subtitle) {
    subtitle.textContent = `${history.length} purchase${history.length !== 1 ? 's' : ''} recorded`;
  }

  if (!history.length) {
    container.innerHTML = renderEmptyState('history', '');
    return;
  }

  // Group by date (purchasedAt or completedAt)
  const grouped = {};
  history.forEach(item => {
    const raw  = item.purchasedAt || item.completedAt || item.createdAt;
    const date = raw ? new Date(raw).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Unknown Date';
    if (!grouped[date]) grouped[date] = [];
    grouped[date].push(item);
  });

  container.innerHTML = Object.entries(grouped).map(([date, items]) => `
    <div class="history-date-group">
      <div class="history-date-label">📅 ${date}</div>
      <div class="history-list">
        ${items.map(item => renderHistoryCard(item)).join('')}
      </div>
    </div>
  `).join('');

  // Bind add-again buttons
  history.forEach(item => {
    document.getElementById(`add-again-${item.id}`)?.addEventListener('click', () => {
      const result = addAgainFromHistory(item.id);
      if (result?.added) {
        showToast(`✓ ${item.name} added back to Smart Lizt`, 'success');
      } else if (result?.updated) {
        showToast(`📦 ${item.name} quantity updated`, 'info');
      }
    });
  });
}

function renderHistoryCard(item) {
  const prioClasses = { High: 'badge-high', Medium: 'badge-medium', Low: 'badge-low' };

  return `
    <div class="history-card stagger-item" id="history-card-${item.id}">
      <div class="history-card-icon" aria-hidden="true">✓</div>
      <div class="history-card-content">
        <div class="history-card-name">${item.name}</div>
        <div class="history-card-meta">
          <span>📁 ${item.category}</span>
          <span>📦 ${item.quantity}${item.unit ? ' ' + item.unit : ''}</span>
          ${item.brand && item.brand !== 'Any Brand' ? `<span>🏷 ${item.brand}</span>` : ''}
          <span class="badge ${prioClasses[item.priority] || 'badge-medium'}">${item.priority}</span>
        </div>
      </div>
      <button class="btn btn-outline btn-sm" id="add-again-${item.id}" aria-label="Add ${item.name} again">
        + Add Again
      </button>
    </div>
  `;
}

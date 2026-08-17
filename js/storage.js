/* ============================================================
   SMART LIZT — STORAGE MODULE
   All localStorage read/write operations
   ============================================================ */

const KEYS = {
  CHECKLIST: 'sl_checklist',
  HISTORY:   'sl_history',
  PROFILE:   'sl_profile',
  INITIALIZED: 'sl_initialized',
};

/* ────────────────────────────────────────────────────────────
   HELPERS
   ──────────────────────────────────────────────────────────── */

/**
 * Generate a unique ID
 * @returns {string}
 */
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

/**
 * Safe JSON parse — returns fallback on error
 * @param {string} key
 * @param {*} fallback
 * @returns {*}
 */
function safeGet(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw);
  } catch (e) {
    console.warn('[SmartLizt] Storage read error:', key, e);
    return fallback;
  }
}

/**
 * Safe JSON stringify save
 * @param {string} key
 * @param {*} value
 */
function safeSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn('[SmartLizt] Storage write error:', key, e);
  }
}

/* ────────────────────────────────────────────────────────────
   CHECKLIST
   ──────────────────────────────────────────────────────────── */

/**
 * Load the full checklist array
 * @returns {Array}
 */
function loadChecklist() {
  return safeGet(KEYS.CHECKLIST, []);
}

/**
 * Save the full checklist array
 * @param {Array} items
 */
function saveChecklist(items) {
  safeSet(KEYS.CHECKLIST, items);
}

/**
 * Add a new item or increase quantity if duplicate (same name + category)
 * @param {Object} item
 * @returns {{ added: boolean, updated: boolean, item: Object }}
 */
function addChecklistItem(item) {
  const list = loadChecklist();
  const key = (item.name + '|' + item.category).toLowerCase().trim();

  const existing = list.find(
    i => (i.name + '|' + i.category).toLowerCase().trim() === key
  );

  if (existing) {
    existing.quantity = (existing.quantity || 1) + (item.quantity || 1);
    if (item.brand && item.brand !== 'Any Brand') existing.brand = item.brand;
    if (item.priority) existing.priority = item.priority;
    if (item.reminderDate) existing.reminderDate = item.reminderDate;
    if (item.price) existing.price = item.price;
    if (item.notes) existing.notes = item.notes;
    saveChecklist(list);
    return { added: false, updated: true, item: existing };
  }

  const newItem = {
    id:           generateId(),
    name:         item.name || '',
    category:     item.category || 'Uncategorized',
    quantity:     Math.max(1, parseInt(item.quantity) || 1),
    unit:         item.unit || '',
    brand:        item.brand || 'Any Brand',
    priority:     item.priority || 'Medium',
    reminderDate: item.reminderDate || null,
    price:        item.price ? parseFloat(item.price) : null,
    notes:        item.notes || '',
    completed:    false,
    createdAt:    new Date().toISOString(),
  };

  list.unshift(newItem);
  saveChecklist(list);
  return { added: true, updated: false, item: newItem };
}

/**
 * Update an existing checklist item by id
 * @param {string} id
 * @param {Object} updates
 * @returns {boolean}
 */
function updateChecklistItem(id, updates) {
  const list = loadChecklist();
  const index = list.findIndex(i => i.id === id);
  if (index === -1) return false;
  list[index] = { ...list[index], ...updates };
  saveChecklist(list);
  return true;
}

/**
 * Delete a checklist item by id
 * @param {string} id
 * @returns {boolean}
 */
function deleteChecklistItem(id) {
  const list = loadChecklist();
  const index = list.findIndex(i => i.id === id);
  if (index === -1) return false;
  list.splice(index, 1);
  saveChecklist(list);
  return true;
}

/**
 * Mark item as completed — moves to history
 * @param {string} id
 */
function completeChecklistItem(id) {
  const list = loadChecklist();
  const index = list.findIndex(i => i.id === id);
  if (index === -1) return;

  const item = { ...list[index], completed: true, completedAt: new Date().toISOString() };
  list[index] = item;
  saveChecklist(list);

  // Add to history
  const history = loadHistory();
  const existing = history.find(h => h.id === id);
  if (!existing) {
    history.unshift({ ...item, purchasedAt: new Date().toISOString() });
    saveHistory(history);
  }
}

/**
 * Unmark completed
 * @param {string} id
 */
function uncompleteChecklistItem(id) {
  const list = loadChecklist();
  const index = list.findIndex(i => i.id === id);
  if (index === -1) return;
  list[index].completed = false;
  delete list[index].completedAt;
  saveChecklist(list);
}

/**
 * Clear all completed items
 */
function clearCompletedItems() {
  const list = loadChecklist();
  saveChecklist(list.filter(i => !i.completed));
}

/**
 * Delete all checklist items
 */
function deleteAllItems() {
  saveChecklist([]);
}

/* ────────────────────────────────────────────────────────────
   REMINDERS (derived from checklist — items with reminderDate)
   ──────────────────────────────────────────────────────────── */

/**
 * Load all items that have a reminder date set
 * @returns {Array}
 */
function loadReminders() {
  return loadChecklist().filter(i => i.reminderDate && !i.completed);
}

/**
 * Set or update a reminder on a checklist item
 * @param {string} id
 * @param {string} reminderDate  — ISO date string YYYY-MM-DD
 */
function saveReminder(id, reminderDate) {
  updateChecklistItem(id, { reminderDate });
}

/**
 * Snooze a reminder by N days
 * @param {string} id
 * @param {number} days
 */
function snoozeReminder(id, days) {
  const list = loadChecklist();
  const item = list.find(i => i.id === id);
  if (!item || !item.reminderDate) return;

  const d = new Date(item.reminderDate);
  d.setDate(d.getDate() + days);
  updateChecklistItem(id, { reminderDate: d.toISOString().split('T')[0] });
}

/* ────────────────────────────────────────────────────────────
   HISTORY
   ──────────────────────────────────────────────────────────── */

/**
 * Load history array
 * @returns {Array}
 */
function loadHistory() {
  return safeGet(KEYS.HISTORY, []);
}

/**
 * Save history array
 * @param {Array} items
 */
function saveHistory(items) {
  safeSet(KEYS.HISTORY, items);
}

/**
 * Add item back to checklist from history (re-purchase)
 * @param {string} historyId
 * @returns {{ added: boolean, updated: boolean }}
 */
function addAgainFromHistory(historyId) {
  const history = loadHistory();
  const item = history.find(h => h.id === historyId);
  if (!item) return;

  return addChecklistItem({
    ...item,
    completed:    false,
    reminderDate: null,
    createdAt:    new Date().toISOString(),
  });
}

/**
 * Clear all history
 */
function clearHistory() {
  saveHistory([]);
}

/* ────────────────────────────────────────────────────────────
   PROFILE
   ──────────────────────────────────────────────────────────── */

const DEFAULT_PROFILE = {
  name:              'Smart Lizt User',
  defaultReminder:   'none',
  defaultQuantity:   1,
  notifications:     true,
  autoSuggestions:   true,
};

/**
 * Load profile preferences
 * @returns {Object}
 */
function loadProfile() {
  return { ...DEFAULT_PROFILE, ...safeGet(KEYS.PROFILE, {}) };
}

/**
 * Save profile preferences
 * @param {Object} profile
 */
function saveProfile(profile) {
  safeSet(KEYS.PROFILE, profile);
}

/**
 * Clear ALL app data
 */
function clearAllData() {
  Object.values(KEYS).forEach(k => localStorage.removeItem(k));
}

/* ────────────────────────────────────────────────────────────
   DEMO DATA — seed only when app is fresh
   ──────────────────────────────────────────────────────────── */

function initDemoData() {
  if (safeGet(KEYS.INITIALIZED, false)) return;

  const demo = [
    {
      id: generateId(),
      name: 'Rice',
      category: 'Kitchen',
      quantity: 5,
      unit: 'kg',
      brand: 'Aashirvaad',
      priority: 'High',
      reminderDate: null,
      price: null,
      notes: '',
      completed: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: generateId(),
      name: 'Cooking Oil',
      category: 'Kitchen',
      quantity: 2,
      unit: 'L',
      brand: 'Fortune',
      priority: 'High',
      reminderDate: null,
      price: null,
      notes: '',
      completed: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: generateId(),
      name: 'Toothpaste',
      category: 'Bathroom',
      quantity: 2,
      unit: '',
      brand: 'Colgate',
      priority: 'Medium',
      reminderDate: (() => {
        const d = new Date();
        d.setDate(d.getDate() + 7);
        return d.toISOString().split('T')[0];
      })(),
      price: null,
      notes: '',
      completed: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: generateId(),
      name: 'Hand Wash',
      category: 'Bathroom',
      quantity: 1,
      unit: '',
      brand: 'Dettol',
      priority: 'Medium',
      reminderDate: null,
      price: null,
      notes: '',
      completed: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: generateId(),
      name: 'A4 Paper',
      category: 'Office',
      quantity: 2,
      unit: 'ream',
      brand: 'Any Brand',
      priority: 'Low',
      reminderDate: null,
      price: null,
      notes: '',
      completed: true,
      completedAt: new Date().toISOString(),
      createdAt: new Date(Date.now() - 86400000).toISOString(),
    },
  ];

  saveChecklist(demo);

  // Seed history with the completed item
  const historyItem = demo.find(i => i.completed);
  if (historyItem) {
    saveHistory([{ ...historyItem, purchasedAt: new Date().toISOString() }]);
  }

  safeSet(KEYS.INITIALIZED, true);
}

/* ────────────────────────────────────────────────────────────
   CHECKLIST STATS
   ──────────────────────────────────────────────────────────── */

/**
 * Compute summary statistics for the dashboard
 * @returns {{ total, completed, remaining, reminders, categories, highPriority, estimatedTotal }}
 */
function getChecklistStats() {
  const list = loadChecklist();
  const active = list.filter(i => !i.completed);
  const done   = list.filter(i => i.completed);

  const reminders = active.filter(i => i.reminderDate).length;

  const categories = new Set(active.map(i => i.category)).size;

  const highPriority = active.filter(i => i.priority === 'High').length;

  const estimatedTotal = active
    .filter(i => i.price !== null && i.price !== undefined)
    .reduce((sum, i) => sum + (i.price * (i.quantity || 1)), 0);

  return {
    total:          list.length,
    completed:      done.length,
    remaining:      active.length,
    reminders,
    categories:     10, // static for display purposes
    highPriority,
    estimatedTotal,
  };
}

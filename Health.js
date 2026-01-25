const STORAGE_KEY = 'jbundis_batches_v1';

function loadBatches() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
}

function saveBatches(batches) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(batches));
}

function populateBatchSelect() {
  const select = document.getElementById('batchSelect');
  select.innerHTML = '';

  const batches = loadBatches();
  if (batches.length === 0) {
    select.innerHTML = '<option value="">No batches found</option>';
    return;
  }

  batches.forEach(b => {
    const opt = document.createElement('option');
    opt.value = b.id;
    opt.textContent = b.name;
    select.appendChild(opt);
  });
}

function getSelectedBatch() {
  const id = parseInt(document.getElementById('batchSelect').value, 10);
  return loadBatches().find(b => b.id === id);
}

function saveHealth() {
  const batch = getSelectedBatch();
  if (!batch) return alert('Select a batch');

  const type = document.getElementById('healthType').value;
  const date = document.getElementById('healthDate').value;
  const notes = document.getElementById('healthNotes').value.trim();

  if (!date || !notes) return alert('Fill date and notes');

  batch.health.push({
    id: Date.now(),
    type,
    date,
    notes
  });

  const batches = loadBatches();
  const idx = batches.findIndex(b => b.id === batch.id);
  batches[idx] = batch;

  saveBatches(batches);
  renderHealth();
}

function renderHealth() {
  const list = document.getElementById('healthList');
  list.innerHTML = '';

  const batch = getSelectedBatch();
  if (!batch) return;

  if (!batch.health || batch.health.length === 0) {
    list.innerHTML = '<li>No records yet</li>';
    return;
  }

  batch.health.forEach(h => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${h.type.toUpperCase()}</strong> - ${h.date}<br/>${h.notes}`;
    list.appendChild(li);
  });
}

window.addEventListener('DOMContentLoaded', () => {
  populateBatchSelect();
  renderHealth();
  document.getElementById('batchSelect').addEventListener('change', renderHealth);
});

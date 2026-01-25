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

function saveExpense() {
  const batch = getSelectedBatch();
  if (!batch) return alert('Select a batch');

  const desc = document.getElementById('expenseDesc').value.trim();
  const amount = parseFloat(document.getElementById('expenseAmount').value);

  if (!desc || !amount) return alert('Fill expense fields');

  batch.expenses.push({
    id: Date.now(),
    desc,
    amount
  });

  const batches = loadBatches();
  const idx = batches.findIndex(b => b.id === batch.id);
  batches[idx] = batch;
  saveBatches(batches);

  renderExpenses();
  renderCharts();
}

function renderExpenses() {
  const list = document.getElementById('expenseList');
  list.innerHTML = '';

  const batch = getSelectedBatch();
  if (!batch) return;

  if (!batch.expenses || batch.expenses.length === 0) {
    list.innerHTML = '<li>No expenses yet</li>';
    return;
  }

  batch.expenses.forEach(e => {
    const li = document.createElement('li');
    li.innerHTML = `${e.desc} - KES ${e.amount.toFixed(2)}`;
    list.appendChild(li);
  });
}

function renderCharts() {
  const batch = getSelectedBatch();
  if (!batch) return;

  const pieCanvas = document.getElementById('pieChart');
  const barCanvas = document.getElementById('barChart');

  const labels = batch.expenses.map(e => e.desc);
  const data = batch.expenses.map(e => e.amount);

  if (window.pieChartInstance) window.pieChartInstance.destroy();
  if (window.barChartInstance) window.barChartInstance.destroy();

  window.pieChartInstance = new Chart(pieCanvas, {
    type: 'pie',
    data: { labels, datasets: [{ data }] }
  });

  window.barChartInstance = new Chart(barCanvas, {
    type: 'bar',
    data: { labels, datasets: [{ data }] }
  });
}

window.addEventListener('DOMContentLoaded', () => {
  populateBatchSelect();
  renderExpenses();
  renderCharts();

  document.getElementById('batchSelect').addEventListener('change', () => {
    renderExpenses();
    renderCharts();
  });
});

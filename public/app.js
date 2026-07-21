// ---- Configuração dos hábitos (fácil de editar/expandir) ----
const HABITS = [
  { key: 'biblia', emoji: '📖', title: 'Li a Bíblia', field: 'text', placeholder: 'O que li hoje...' },
  { key: 'jejum', emoji: '⏳', title: 'Jejum', field: 'hours' },
  { key: 'livro', emoji: '📚', title: 'Li 1 capítulo de livro', field: 'text', placeholder: 'Livro / capítulo...' },
  { key: 'oracao', emoji: '🙏', title: 'Momento de oração', field: null },
];

const MONTHS = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];

// ---- Estado ----
let data = {};              // { "2026-07-08": { biblia:{done,text}, ... } }
let view = new Date();      // mês exibido
let openDateKey = null;     // dia aberto no painel

const $ = (id) => document.getElementById(id);

function keyOf(y, m, d) {
  return `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
}
function todayKey() {
  const t = new Date();
  return keyOf(t.getFullYear(), t.getMonth(), t.getDate());
}

// Status do dia: 'complete' (todos), 'partial' (algum), null (nenhum)
function dayStatus(entry) {
  if (!entry) return null;
  const done = HABITS.filter((h) => entry[h.key]?.done).length;
  if (done === 0) return null;
  return done === HABITS.length ? 'complete' : 'partial';
}

// ---- Armazenamento (localStorage é a fonte primária; servidor é backup/sync) ----
const LS_ENTRIES = 'santidade_entries';
const LS_BOOKS = 'santidade_books';

function loadLocal(key, fallback) {
  try {
    const v = JSON.parse(localStorage.getItem(key));
    return v == null ? fallback : v;
  } catch { return fallback; }
}
function saveLocal(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
}

async function loadData() {
  // 1) sempre carrega o que está salvo no aparelho (garantido, offline)
  const local = loadLocal(LS_ENTRIES, {});
  data = { ...local };
  // 2) tenta buscar do servidor e mesclar (servidor prevalece em conflitos)
  try {
    const server = await (await fetch('/api/entries')).json();
    if (server && typeof server === 'object') {
      for (const k in server) {
        if (k === '_books') continue;
        data[k] = server[k];
      }
    }
  } catch { /* servidor fora do ar: seguimos só com o local */ }
  // 3) grava o resultado mesclado de volta no aparelho
  saveLocal(LS_ENTRIES, data);
}

async function saveEntry(dateKey, entry) {
  // grava no aparelho ANTES de tudo (nunca se perde, mesmo com servidor fora)
  saveLocal(LS_ENTRIES, data);
  // tenta espelhar no servidor (best-effort)
  try {
    await fetch('/api/entries', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date: dateKey, entry }),
    });
  } catch (e) { console.warn('Servidor indisponível; salvo apenas no aparelho.', e); }
}

// ---- Streak (dias consecutivos até hoje com algo registrado) ----
function computeStreak() {
  let streak = 0;
  const d = new Date();
  for (;;) {
    const k = keyOf(d.getFullYear(), d.getMonth(), d.getDate());
    if (dayStatus(data[k])) { streak++; d.setDate(d.getDate() - 1); }
    else break;
  }
  return streak;
}

// ---- Renderização do calendário ----
function render() {
  const y = view.getFullYear();
  const m = view.getMonth();
  $('monthLabel').textContent = `${MONTHS[m]} ${y}`;

  const firstDay = new Date(y, m, 1).getDay();     // 0=domingo
  const daysInMonth = new Date(y, m + 1, 0).getDate();
  const cal = $('calendar');
  cal.innerHTML = '';

  for (let i = 0; i < firstDay; i++) {
    const e = document.createElement('div');
    e.className = 'day empty';
    cal.appendChild(e);
  }

  const tk = todayKey();
  for (let d = 1; d <= daysInMonth; d++) {
    const k = keyOf(y, m, d);
    const el = document.createElement('button');
    el.className = 'day';
    el.textContent = d;
    const status = dayStatus(data[k]);
    if (status === 'complete') el.classList.add('complete');
    else if (status === 'partial') {
      el.classList.add('partial');
      const dot = document.createElement('span');
      dot.className = 'dot';
      el.appendChild(dot);
    }
    if (k === tk) el.classList.add('today');
    el.addEventListener('click', () => openDay(k));
    cal.appendChild(el);
  }

  const s = computeStreak();
  $('streakInfo').textContent = s > 0 ? `🔥 ${s} dia${s > 1 ? 's' : ''} seguido${s > 1 ? 's' : ''}` : 'Comece hoje ✨';
}

// ---- Painel do dia ----
function formatDatePt(k) {
  const [y, m, d] = k.split('-').map(Number);
  const dt = new Date(y, m - 1, d);
  const wd = ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'][dt.getDay()];
  return `${wd}, ${d} de ${MONTHS[m - 1]}`;
}

function openDay(k) {
  openDateKey = k;
  $('sheetDate').textContent = formatDatePt(k);
  const entry = data[k] || {};
  const list = $('habitsList');
  list.innerHTML = '';

  for (const h of HABITS) {
    const state = entry[h.key] || {};
    const card = document.createElement('div');
    card.className = 'habit' + (state.done ? ' on' : '');
    card.dataset.key = h.key;

    const row = document.createElement('div');
    row.className = 'habit-row';
    row.innerHTML = `
      <span class="habit-emoji">${h.emoji}</span>
      <span class="habit-title">${h.title}</span>
      <span class="check">✓</span>`;
    card.appendChild(row);

    let input = null;
    if (h.field === 'text') {
      input = document.createElement('textarea');
      input.placeholder = h.placeholder || '';
      input.value = state.text || '';
      input.hidden = !state.done;
      card.appendChild(input);
    } else if (h.field === 'hours') {
      const wrap = document.createElement('label');
      wrap.className = 'hours-field';
      wrap.hidden = !state.done;
      input = document.createElement('input');
      input.type = 'number';
      input.min = '0';
      input.step = '0.5';
      input.inputMode = 'decimal';
      input.placeholder = '0';
      input.value = state.hours != null ? state.hours : '';
      wrap.appendChild(input);
      const suffix = document.createElement('span');
      suffix.textContent = 'horas de jejum';
      wrap.appendChild(suffix);
      card.appendChild(wrap);
    }

    row.addEventListener('click', () => {
      const on = card.classList.toggle('on');
      const field = card.querySelector('textarea, .hours-field');
      if (field) field.hidden = !on;
    });

    list.appendChild(card);
  }

  $('sheetBackdrop').hidden = false;
}

function collectEntry() {
  const entry = {};
  document.querySelectorAll('#habitsList .habit').forEach((card) => {
    const key = card.dataset.key;
    const on = card.classList.contains('on');
    if (!on) return;
    const ta = card.querySelector('textarea');
    const num = card.querySelector('.hours-field input');
    if (num) entry[key] = { done: true, hours: num.value === '' ? null : Number(num.value) };
    else entry[key] = { done: true, text: ta ? ta.value.trim() : '' };
  });
  return entry;
}

function closeSheet() {
  $('sheetBackdrop').hidden = true;
  openDateKey = null;
}

function toast(msg) {
  const t = $('toast');
  t.textContent = msg;
  t.hidden = false;
  clearTimeout(toast._t);
  toast._t = setTimeout(() => (t.hidden = true), 1800);
}

async function saveDay() {
  if (!openDateKey) return;
  const entry = collectEntry();
  if (Object.keys(entry).length) data[openDateKey] = entry;
  else delete data[openDateKey];
  await saveEntry(openDateKey, entry);
  render();
  closeSheet();
  toast('Salvo ✓');
}

async function clearDay() {
  if (!openDateKey) return;
  delete data[openDateKey];
  await saveEntry(openDateKey, {});
  render();
  closeSheet();
  toast('Dia limpo');
}

// ---- Eventos ----
$('prevMonth').addEventListener('click', () => { view.setMonth(view.getMonth() - 1); render(); });
$('nextMonth').addEventListener('click', () => { view.setMonth(view.getMonth() + 1); render(); });
$('closeSheet').addEventListener('click', closeSheet);
$('saveDay').addEventListener('click', saveDay);
$('clearDay').addEventListener('click', clearDay);
$('sheetBackdrop').addEventListener('click', (e) => { if (e.target.id === 'sheetBackdrop') closeSheet(); });

// ---- Livros terminados ----
let books = [];

async function loadBooks() {
  const local = loadLocal(LS_BOOKS, []);
  books = Array.isArray(local) ? local : [];
  try {
    const server = await (await fetch('/api/books')).json();
    if (Array.isArray(server) && server.length) {
      // união: mantém os locais e adiciona os do servidor que faltarem
      const seen = new Set(books.map((b) => b.title + '|' + b.date));
      for (const b of server) {
        const id = b.title + '|' + b.date;
        if (!seen.has(id)) { books.push(b); seen.add(id); }
      }
    }
  } catch { /* servidor fora do ar: usa só o local */ }
  saveLocal(LS_BOOKS, books);
}
async function persistBooks() {
  saveLocal(LS_BOOKS, books);
  try {
    await fetch('/api/books', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ books }),
    });
  } catch (e) { console.warn('Servidor indisponível; livros salvos apenas no aparelho.', e); }
}

function renderBooks() {
  const list = $('booksList');
  $('booksCount').textContent = books.length;
  list.innerHTML = '';
  if (!books.length) {
    const li = document.createElement('li');
    li.className = 'book-empty';
    li.textContent = 'Nenhum livro registrado ainda.';
    list.appendChild(li);
    return;
  }
  books.forEach((b, i) => {
    const li = document.createElement('li');
    li.className = 'book-item';
    const info = document.createElement('div');
    info.innerHTML = `<span class="book-title">${escapeHtml(b.title)}</span>` +
      (b.date ? `<span class="book-date">${formatShort(b.date)}</span>` : '');
    const del = document.createElement('button');
    del.className = 'book-del';
    del.textContent = '✕';
    del.setAttribute('aria-label', 'Remover');
    del.addEventListener('click', async () => {
      books.splice(i, 1);
      await persistBooks();
      renderBooks();
    });
    li.appendChild(info);
    li.appendChild(del);
    list.appendChild(li);
  });
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
function formatShort(k) {
  const [y, m, d] = k.split('-').map(Number);
  return `${String(d).padStart(2, '0')}/${String(m).padStart(2, '0')}/${y}`;
}

async function addBook() {
  const inp = $('bookInput');
  const title = inp.value.trim();
  if (!title) return;
  books.unshift({ title, date: todayKey() });
  inp.value = '';
  await persistBooks();
  renderBooks();
  toast('Livro adicionado ✓');
}

$('bookAdd').addEventListener('click', addBook);
$('bookInput').addEventListener('keydown', (e) => { if (e.key === 'Enter') addBook(); });

// ---- Backup: exportar / importar ----
function exportBackup() {
  const payload = { app: 'santidade', exportedAt: new Date().toISOString(), entries: data, books };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `santidade-backup-${todayKey()}.json`;
  a.click();
  URL.revokeObjectURL(a.href);
  toast('Backup exportado ✓');
}

async function importBackup(file) {
  try {
    const payload = JSON.parse(await file.text());
    if (!payload || payload.app !== 'santidade') { toast('Arquivo inválido'); return; }
    // mescla: o backup complementa o que já existe no aparelho
    if (payload.entries && typeof payload.entries === 'object') {
      for (const k in payload.entries) if (!data[k]) data[k] = payload.entries[k];
    }
    if (Array.isArray(payload.books)) {
      const seen = new Set(books.map((b) => b.title + '|' + b.date));
      for (const b of payload.books) {
        const id = b.title + '|' + b.date;
        if (!seen.has(id)) { books.push(b); seen.add(id); }
      }
    }
    saveLocal(LS_ENTRIES, data);
    saveLocal(LS_BOOKS, books);
    // espelha no servidor se estiver acessível (best-effort)
    persistBooks();
    try {
      for (const k in data) await saveEntry(k, data[k]);
    } catch {}
    render();
    renderBooks();
    toast('Backup importado ✓');
  } catch {
    toast('Não consegui ler o arquivo');
  }
}

$('exportBtn').addEventListener('click', exportBackup);
$('importBtn').addEventListener('click', () => $('importFile').click());
$('importFile').addEventListener('change', (e) => {
  const f = e.target.files[0];
  if (f) importBackup(f);
  e.target.value = '';
});

// ---- Init ----
(async () => {
  await Promise.all([loadData(), loadBooks()]);
  render();
  renderBooks();
})();

// ---- PWA ----
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').catch(() => {});
}

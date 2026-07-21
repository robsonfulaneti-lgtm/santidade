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

// Servidor é opcional: no GitHub Pages não existe /api, e tudo bem.
// Estas funções nunca lançam erro — devolvem null quando não há servidor.
async function apiGet(path) {
  try {
    const r = await fetch(path, { cache: 'no-store' });
    if (!r.ok) return null;
    return await r.json();
  } catch { return null; }
}
async function apiPut(path, body) {
  try {
    const r = await fetch(path, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    return r.ok;
  } catch { return false; }
}

async function loadData() {
  // 1) sempre carrega o que está salvo no aparelho (garantido, offline)
  const local = loadLocal(LS_ENTRIES, {});
  data = { ...local };
  // 2) tenta buscar do servidor e mesclar (servidor prevalece em conflitos)
  const server = await apiGet('./api/entries');
  if (server && typeof server === 'object') {
    for (const k in server) {
      if (k === '_books' || k === '_studies' || k === '_paulo') continue;
      data[k] = server[k];
    }
  }
  // 3) grava o resultado mesclado de volta no aparelho
  saveLocal(LS_ENTRIES, data);
}

async function saveEntry(dateKey, entry) {
  // grava no aparelho ANTES de tudo (nunca se perde, mesmo sem servidor)
  saveLocal(LS_ENTRIES, data);
  // espelha no servidor quando ele existir (best-effort)
  await apiPut('./api/entries', { date: dateKey, entry });
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
  const server = await apiGet('./api/books');
  if (Array.isArray(server) && server.length) {
    // união: mantém os locais e adiciona os do servidor que faltarem
    const seen = new Set(books.map((b) => b.title + '|' + b.date));
    for (const b of server) {
      const id = b.title + '|' + b.date;
      if (!seen.has(id)) { books.push(b); seen.add(id); }
    }
  }
  saveLocal(LS_BOOKS, books);
}
async function persistBooks() {
  saveLocal(LS_BOOKS, books);
  await apiPut('./api/books', { books });
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

// ---- Estudos (vários por dia) ----
const LS_STUDIES = 'santidade_studies';
let studies = [];

async function loadStudies() {
  const local = loadLocal(LS_STUDIES, []);
  studies = Array.isArray(local) ? local : [];
  const server = await apiGet('./api/studies');
  if (Array.isArray(server) && server.length) {
    const seen = new Set(studies.map((s) => s.id));
    for (const s of server) if (s.id && !seen.has(s.id)) { studies.push(s); seen.add(s.id); }
  }
  saveLocal(LS_STUDIES, studies);
}

async function persistStudies() {
  saveLocal(LS_STUDIES, studies);
  await apiPut('./api/studies', { studies });
}

function renderStudies() {
  const list = $('studiesList');
  $('studiesCount').textContent = studies.length;
  list.innerHTML = '';

  if (!studies.length) {
    const p = document.createElement('p');
    p.className = 'study-empty';
    p.textContent = 'Nenhum estudo registrado ainda.\nUse o formulário acima quantas vezes quiser por dia.';
    list.appendChild(p);
    return;
  }

  // mais recentes primeiro, agrupados por dia
  const ordered = [...studies].sort((a, b) => (b.date + (b.time || '')).localeCompare(a.date + (a.time || '')));
  const groups = new Map();
  for (const s of ordered) {
    if (!groups.has(s.date)) groups.set(s.date, []);
    groups.get(s.date).push(s);
  }

  for (const [date, items] of groups) {
    const wrap = document.createElement('div');
    const label = document.createElement('div');
    label.className = 'study-day-label';
    label.textContent = `${formatDatePt(date)} · ${items.length} estudo${items.length > 1 ? 's' : ''}`;
    wrap.appendChild(label);

    const group = document.createElement('div');
    group.className = 'study-group';
    for (const s of items) {
      const card = document.createElement('div');
      card.className = 'study-item';

      const head = document.createElement('div');
      head.className = 'study-item-head';
      const ref = document.createElement('span');
      ref.className = 'study-ref';
      ref.textContent = s.capitulo ? `${s.livro} ${s.capitulo}` : s.livro;
      head.appendChild(ref);
      if (s.time) {
        const t = document.createElement('span');
        t.className = 'study-time';
        t.textContent = s.time;
        head.appendChild(t);
      }
      card.appendChild(head);

      if (s.texto) {
        const p = document.createElement('p');
        p.className = 'study-text';
        p.textContent = s.texto;
        card.appendChild(p);
      }

      const del = document.createElement('button');
      del.className = 'study-del';
      del.textContent = '✕ remover';
      del.addEventListener('click', async () => {
        studies = studies.filter((x) => x.id !== s.id);
        await persistStudies();
        renderStudies();
        toast('Estudo removido');
      });
      card.appendChild(del);

      group.appendChild(card);
    }
    wrap.appendChild(group);
    list.appendChild(wrap);
  }
}

async function addStudy() {
  const livro = $('studyLivro').value.trim();
  const capitulo = $('studyCapitulo').value.trim();
  const texto = $('studyTexto').value.trim();

  if (!livro && !texto) { toast('Preencha ao menos o livro'); return; }

  const now = new Date();
  studies.push({
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    date: todayKey(),
    time: `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`,
    livro, capitulo, texto,
  });

  $('studyCapitulo').value = '';
  $('studyTexto').value = '';
  await persistStudies();
  renderStudies();
  toast('Estudo salvo ✓');
}

$('studyAdd').addEventListener('click', addStudy);

// ---- Guia de estudo: a vida de Paulo ----
// Cronologia cruzando Atos com as cartas.
const PAULO_ETAPAS = [
  {
    id: 'e0',
    numero: 'Etapa 0',
    titulo: 'Conversão e período silencioso',
    contexto: ['Período na Arábia e em Tarso (sem cartas conhecidas deste período)'],
    itens: [
      { id: 'e0-at9', tipo: 'leitura', ref: 'Atos 9', desc: 'Conversão de Paulo a caminho de Damasco' },
    ],
  },
  {
    id: 'e1',
    numero: 'Etapa 1',
    titulo: 'Primeira viagem missionária',
    contexto: [
      'Antioquia da Síria → Chipre → Galácia (Antioquia da Pisídia, Icônio, Listra, Derbe)',
      'Volta para Antioquia da Síria',
    ],
    itens: [
      { id: 'e1-at13-14', tipo: 'leitura', ref: 'Atos 13–14', desc: 'A primeira viagem' },
      { id: 'e1-gl', tipo: 'carta', ref: 'Gálatas', desc: '~48–49 d.C.' },
    ],
  },
  {
    id: 'e2',
    numero: 'Etapa 2',
    titulo: 'Concílio de Jerusalém',
    contexto: [
      'Debate sobre gentios e a lei judaica',
      'Contexto importante para entender Gálatas',
    ],
    itens: [
      { id: 'e2-at15', tipo: 'leitura', ref: 'Atos 15', desc: 'O concílio' },
    ],
  },
  {
    id: 'e3',
    numero: 'Etapa 3',
    titulo: 'Segunda viagem missionária',
    contexto: [
      'Revisita igrejas da Galácia',
      'Macedônia: Filipos, Tessalônica, Bereia',
      'Acaia: Atenas e Corinto (fica 18 meses)',
    ],
    itens: [
      { id: 'e3-at15-18', tipo: 'leitura', ref: 'Atos 15:36 – 18:22', desc: 'A segunda viagem' },
      { id: 'e3-1ts', tipo: 'carta', ref: '1 Tessalonicenses', desc: '~50–51 d.C. · de Corinto' },
      { id: 'e3-2ts', tipo: 'carta', ref: '2 Tessalonicenses', desc: '~50–51 d.C. · de Corinto' },
    ],
  },
  {
    id: 'e4',
    numero: 'Etapa 4',
    titulo: 'Terceira viagem missionária',
    contexto: [
      'Éfeso (cerca de 3 anos, ministério mais longo em uma cidade)',
      'Depois: Macedônia novamente',
      'Depois: Corinto novamente (3 meses)',
    ],
    itens: [
      { id: 'e4-at18-21', tipo: 'leitura', ref: 'Atos 18:23 – 21:16', desc: 'A terceira viagem' },
      { id: 'e4-1co', tipo: 'carta', ref: '1 Coríntios', desc: '~53–54 d.C. · de Éfeso' },
      { id: 'e4-2co', tipo: 'carta', ref: '2 Coríntios', desc: '~55–56 d.C. · da Macedônia' },
      { id: 'e4-rm', tipo: 'carta', ref: 'Romanos', desc: '~56–57 d.C. · de Corinto' },
    ],
  },
  {
    id: 'e5',
    numero: 'Etapa 5',
    titulo: 'Prisão e viagem a Roma',
    contexto: [
      'Prisão em Jerusalém',
      'Prisão em Cesareia (2 anos)',
      'Apelação a César, naufrágio em Malta',
      'Chegada a Roma, prisão domiciliar (2 anos) — fim de Atos',
    ],
    itens: [
      { id: 'e5-at21-28', tipo: 'leitura', ref: 'Atos 21–28', desc: 'Prisão e viagem a Roma' },
      { id: 'e5-ef', tipo: 'carta', ref: 'Efésios', desc: '~60–62 d.C. · da prisão' },
      { id: 'e5-fp', tipo: 'carta', ref: 'Filipenses', desc: '~60–62 d.C. · da prisão' },
      { id: 'e5-cl', tipo: 'carta', ref: 'Colossenses', desc: '~60–62 d.C. · da prisão' },
      { id: 'e5-fm', tipo: 'carta', ref: 'Filemom', desc: '~60–62 d.C. · da prisão' },
    ],
  },
  {
    id: 'e6',
    numero: 'Etapa 6',
    titulo: 'Depois de Atos',
    nota: 'tradição, não narrado no livro',
    contexto: [
      'Possível soltura e novas viagens (talvez até a Espanha)',
      'Nova prisão em Roma',
    ],
    itens: [
      { id: 'e6-1tm', tipo: 'carta', ref: '1 Timóteo', desc: '~62–64 d.C. · período de liberdade' },
      { id: 'e6-tt', tipo: 'carta', ref: 'Tito', desc: '~62–64 d.C. · período de liberdade' },
      { id: 'e6-2tm', tipo: 'carta', ref: '2 Timóteo', desc: '~64–67 d.C. · última carta, segunda prisão' },
    ],
  },
];

const LS_PAULO = 'santidade_paulo';
let paulo = {};              // { 'e1-gl': { done: true, nota: '...' } }
let pauloAbertas = new Set(); // etapas expandidas

async function loadPaulo() {
  const local = loadLocal(LS_PAULO, {});
  paulo = local && typeof local === 'object' ? local : {};
  const server = await apiGet('./api/paulo');
  if (server && typeof server === 'object') {
    for (const k in server) if (!paulo[k]) paulo[k] = server[k];
  }
  saveLocal(LS_PAULO, paulo);
}

async function persistPaulo() {
  saveLocal(LS_PAULO, paulo);
  await apiPut('./api/paulo', { paulo });
}

const totalPauloItens = () => PAULO_ETAPAS.reduce((n, e) => n + e.itens.length, 0);
const feitosNaEtapa = (etapa) => etapa.itens.filter((i) => paulo[i.id]?.done).length;

function updatePauloProgress() {
  const total = totalPauloItens();
  const feitos = PAULO_ETAPAS.reduce((n, e) => n + feitosNaEtapa(e), 0);
  $('pauloProgress').textContent = `${feitos} de ${total}`;
  $('pauloBarFill').style.width = total ? `${(feitos / total) * 100}%` : '0%';
}

function renderPaulo() {
  const wrap = $('pauloEtapas');
  wrap.innerHTML = '';

  for (const etapa of PAULO_ETAPAS) {
    const feitos = feitosNaEtapa(etapa);
    const total = etapa.itens.length;
    const completa = feitos === total;
    const aberta = pauloAbertas.has(etapa.id);

    const card = document.createElement('section');
    card.className = 'etapa' + (completa ? ' completa' : '');

    // cabeçalho clicável (abre/fecha)
    const head = document.createElement('button');
    head.className = 'etapa-head';
    head.setAttribute('aria-expanded', String(aberta));
    head.innerHTML = `
      <div class="etapa-info">
        <span class="etapa-num">${etapa.numero}${etapa.nota ? ` · <em>${etapa.nota}</em>` : ''}</span>
        <span class="etapa-titulo">${etapa.titulo}</span>
      </div>
      <span class="etapa-badge">${feitos}/${total}</span>
      <span class="etapa-seta">${aberta ? '▾' : '▸'}</span>`;
    head.addEventListener('click', () => {
      if (pauloAbertas.has(etapa.id)) pauloAbertas.delete(etapa.id);
      else pauloAbertas.add(etapa.id);
      renderPaulo();
    });
    card.appendChild(head);

    const corpo = document.createElement('div');
    corpo.className = 'etapa-corpo';
    corpo.hidden = !aberta;

    if (etapa.contexto?.length) {
      const ul = document.createElement('ul');
      ul.className = 'etapa-contexto';
      for (const c of etapa.contexto) {
        const li = document.createElement('li');
        li.textContent = c;
        ul.appendChild(li);
      }
      corpo.appendChild(ul);
    }

    for (const item of etapa.itens) {
      const estado = paulo[item.id] || {};
      const el = document.createElement('div');
      el.className = 'paulo-item' + (estado.done ? ' on' : '');

      const row = document.createElement('div');
      row.className = 'paulo-row';

      const check = document.createElement('button');
      check.className = 'check';
      check.textContent = '✓';
      check.setAttribute('aria-label', estado.done ? 'Desmarcar' : 'Marcar como lido');
      check.addEventListener('click', async (ev) => {
        ev.stopPropagation();
        const atual = paulo[item.id] || {};
        paulo[item.id] = { ...atual, done: !atual.done };
        if (!paulo[item.id].done && !paulo[item.id].nota) delete paulo[item.id];
        await persistPaulo();
        renderPaulo();
      });

      const info = document.createElement('div');
      info.className = 'paulo-info';
      info.innerHTML = `
        <span class="paulo-ref">${item.ref}</span>
        <span class="paulo-desc">${item.desc}</span>`;

      const tag = document.createElement('span');
      tag.className = 'paulo-tag ' + item.tipo;
      tag.textContent = item.tipo === 'carta' ? 'Carta' : 'Leitura';

      const lapis = document.createElement('button');
      lapis.className = 'paulo-lapis' + (estado.nota ? ' tem-nota' : '');
      lapis.textContent = '✎';
      lapis.setAttribute('aria-label', 'Comentário');

      row.append(check, info, tag, lapis);
      el.appendChild(row);

      const ta = document.createElement('textarea');
      ta.className = 'paulo-nota';
      ta.placeholder = 'Meu comentário sobre esta leitura...';
      ta.value = estado.nota || '';
      ta.hidden = !estado.nota;
      let timer;
      const salvar = async () => {
        const texto = ta.value.trim();
        const atual = paulo[item.id] || {};
        if (texto) paulo[item.id] = { ...atual, nota: texto };
        else if (atual.done) paulo[item.id] = { done: true };
        else delete paulo[item.id];
        await persistPaulo();
        lapis.classList.toggle('tem-nota', !!texto);
      };
      ta.addEventListener('input', () => { clearTimeout(timer); timer = setTimeout(salvar, 600); });
      ta.addEventListener('blur', () => { clearTimeout(timer); salvar(); });
      el.appendChild(ta);

      lapis.addEventListener('click', (ev) => {
        ev.stopPropagation();
        ta.hidden = !ta.hidden;
        if (!ta.hidden) ta.focus();
      });

      corpo.appendChild(el);
    }

    card.appendChild(corpo);
    wrap.appendChild(card);
  }

  updatePauloProgress();
}

// ---- Abas ----
function switchView(view) {
  document.querySelectorAll('.tab').forEach((t) => t.classList.toggle('active', t.dataset.view === view));
  $('viewCalendario').hidden = view !== 'calendario';
  $('viewEstudos').hidden = view !== 'estudos';
  $('viewPaulo').hidden = view !== 'paulo';
  window.scrollTo(0, 0);
}
document.querySelectorAll('.tab').forEach((t) => {
  t.addEventListener('click', () => switchView(t.dataset.view));
});

// ---- Backup: exportar / importar ----
function exportBackup() {
  const payload = { app: 'santidade', exportedAt: new Date().toISOString(), entries: data, books, studies, paulo };
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
    if (Array.isArray(payload.studies)) {
      const seenS = new Set(studies.map((s) => s.id));
      for (const s of payload.studies) {
        if (s.id && !seenS.has(s.id)) { studies.push(s); seenS.add(s.id); }
      }
    }
    if (payload.paulo && typeof payload.paulo === 'object') {
      for (const k in payload.paulo) if (!paulo[k]) paulo[k] = payload.paulo[k];
    }
    saveLocal(LS_ENTRIES, data);
    saveLocal(LS_BOOKS, books);
    saveLocal(LS_STUDIES, studies);
    saveLocal(LS_PAULO, paulo);
    // espelha no servidor se estiver acessível (best-effort)
    persistBooks();
    persistStudies();
    persistPaulo();
    try {
      for (const k in data) await saveEntry(k, data[k]);
    } catch {}
    render();
    renderBooks();
    renderStudies();
    renderPaulo();
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
  await Promise.all([loadData(), loadBooks(), loadStudies(), loadPaulo()]);
  render();
  renderBooks();
  renderStudies();
  renderPaulo();
})();

// ---- PWA ----
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js').catch(() => {});
}

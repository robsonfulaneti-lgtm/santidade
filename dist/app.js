/* ============================================================
   LUMEN — estudo bíblico. App estático, local-first.
   Dados no localStorage; sem servidor. Importa o backup do
   app anterior ("santidade") para não perder nada.
   ============================================================ */

const $ = (id) => document.getElementById(id);
const el = (tag, cls) => { const e = document.createElement(tag); if (cls) e.className = cls; return e; };
const LS = 'lumen_store';

// ---------- Estado ----------
let store = { guides: {}, studies: [], legacyEntries: {}, legacyBooks: [] };
let currentView = 'inicio';

function emptyGuide() { return { items: {}, answers: {} }; }
function guideStore(id) {
  if (!store.guides[id]) store.guides[id] = emptyGuide();
  return store.guides[id];
}

function load() {
  try {
    const raw = JSON.parse(localStorage.getItem(LS));
    if (raw && typeof raw === 'object') store = Object.assign(store, raw);
  } catch {}
  if (!store.guides) store.guides = {};
  if (!Array.isArray(store.studies)) store.studies = [];
  if (!store.legacyEntries) store.legacyEntries = {};
  if (!Array.isArray(store.legacyBooks)) store.legacyBooks = [];
}
function save() { try { localStorage.setItem(LS, JSON.stringify(store)); } catch {} }

// ---------- Progresso ----------
function guideTotals(guia) {
  let total = 0, feitos = 0;
  const gs = store.guides[guia.id] || emptyGuide();
  for (const et of guia.etapas) {
    for (const l of et.leituras) { total++; if (gs.items[l.id]?.done) feitos++; }
    for (const q of et.perguntas) { total++; if ((gs.answers[q.id] || '').trim()) feitos++; }
  }
  return { total, feitos, pct: total ? feitos / total : 0 };
}
function etapaCompleta(guia, et) {
  const gs = store.guides[guia.id] || emptyGuide();
  return et.leituras.every((l) => gs.items[l.id]?.done) && et.perguntas.every((q) => (gs.answers[q.id] || '').trim());
}
function overallPct() {
  let t = 0, f = 0;
  for (const g of GUIAS) { const r = guideTotals(g); t += r.total; f += r.feitos; }
  return t ? f / t : 0;
}
function contarLeituras() {
  let n = 0;
  for (const g of GUIAS) { const gs = store.guides[g.id]; if (gs) for (const k in gs.items) if (gs.items[k].done) n++; }
  return n;
}
function guiasConcluidos() { return GUIAS.filter((g) => guideTotals(g).pct >= 1).length; }

// ---------- SVG anel de progresso ----------
function ringSVG(pct, size, stroke, id) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const off = c * (1 - pct);
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
    <defs><linearGradient id="grad-${id}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#8f7bff"/><stop offset="1" stop-color="#34d9a8"/>
    </linearGradient></defs>
    <circle class="track" cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="rgba(255,255,255,.1)" stroke-width="${stroke}"/>
    <circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="url(#grad-${id})" stroke-width="${stroke}"
      stroke-linecap="round" stroke-dasharray="${c.toFixed(1)}" stroke-dashoffset="${off.toFixed(1)}" transform="rotate(-90 ${size/2} ${size/2})"/>
  </svg>`;
}

// ---------- Router ----------
function setView(view, arg) {
  currentView = view;
  document.querySelectorAll('.tabbtn').forEach((b) => b.classList.toggle('active', b.dataset.view === view));
  const app = $('app');
  app.classList.remove('view-enter'); void app.offsetWidth; app.classList.add('view-enter');
  if (view === 'inicio') renderInicio();
  else if (view === 'guias') renderGuias();
  else if (view === 'guia') renderGuiaDetalhe(arg);
  else if (view === 'metodos') renderMetodos();
  else if (view === 'metodo') renderMetodoPratica(arg);
  else if (view === 'diario') renderDiario();
}

// ---------- Início / Dashboard ----------
function renderInicio() {
  const app = $('app'); app.className = 'app';
  const pct = overallPct();
  const hora = new Date().getHours();
  const saud = hora < 12 ? 'Bom dia' : hora < 18 ? 'Boa tarde' : 'Boa noite';

  // próximo guia a continuar
  let alvo = GUIAS.find((g) => { const p = guideTotals(g).pct; return p > 0 && p < 1; })
          || GUIAS.find((g) => guideTotals(g).pct === 0) || GUIAS[0];
  const rt = guideTotals(alvo);

  app.innerHTML = `
    <section class="hero glass">
      <div class="hero-text">
        <h1>${saud} 🙏</h1>
        <p>Sua jornada pela Palavra continua aqui.</p>
      </div>
      <div class="hero-ring ring">
        ${ringSVG(pct, 84, 9, 'hero')}
        <span class="pct">${Math.round(pct * 100)}%</span>
      </div>
    </section>

    <div class="stats-row">
      <div class="stat glass"><span class="n">${guiasConcluidos()}</span><span class="l">Guias<br>concluídos</span></div>
      <div class="stat glass"><span class="n">${contarLeituras()}</span><span class="l">Leituras<br>feitas</span></div>
      <div class="stat glass"><span class="n">${store.studies.length}</span><span class="l">Estudos<br>no diário</span></div>
    </div>

    <p class="section-title">Continuar de onde parou</p>
    <div class="continue-card glass c-${alvo.cor}" id="continueCard">
      <span class="continue-emoji">${alvo.emoji}</span>
      <div class="continue-info">
        <div class="k">${Math.round(rt.pct * 100)}% concluído</div>
        <div class="t">${alvo.titulo}</div>
        <div class="s">${rt.feitos} de ${rt.total} passos</div>
      </div>
      <span class="continue-go">→</span>
    </div>

    <p class="section-title">Método sugerido para hoje</p>
    <div class="metodo-card glass" id="metodoHoje">
      <div class="m-top"><span class="m-emoji">${METODOS[0].emoji}</span><span class="m-nome">${METODOS[0].nome}</span></div>
      <div class="m-resumo">${METODOS[0].resumo}</div>
    </div>
  `;
  $('continueCard').onclick = () => setView('guia', alvo.id);
  $('metodoHoje').onclick = () => setView('metodo', METODOS[0].id);

  // anima o anel
  requestAnimationFrame(() => animateRing(app.querySelector('.hero-ring'), pct));
}

function animateRing(wrap, pct) {
  const circle = wrap && wrap.querySelectorAll('circle')[1];
  if (!circle) return;
  const c = parseFloat(circle.getAttribute('stroke-dasharray'));
  circle.style.strokeDashoffset = c;
  requestAnimationFrame(() => { circle.style.strokeDashoffset = (c * (1 - pct)).toFixed(1); });
}

// ---------- Lista de guias ----------
function renderGuias() {
  const app = $('app'); app.className = 'app';
  app.innerHTML = `<p class="section-title">Guias de estudo</p><div class="guias-grid" id="guiasGrid"></div>`;
  const grid = $('guiasGrid');
  for (const g of GUIAS) {
    const r = guideTotals(g);
    const card = el('div', `guia-card glass c-${g.cor}` + (r.pct >= 1 ? ' done' : ''));
    card.innerHTML = `
      <div class="guia-top">
        <span class="guia-emoji">${g.emoji}</span>
        <div class="guia-h"><div class="t">${g.titulo}</div><div class="r">${g.resumo}</div></div>
        <div class="guia-mini-ring ring" style="width:52px;height:52px">${ringSVG(r.pct, 52, 6, 'g' + g.id)}<span class="pct" style="font-size:12px">${Math.round(r.pct*100)}%</span></div>
      </div>
      <div class="guia-bar"><span style="width:${r.pct*100}%"></span></div>
      <div class="guia-meta"><span>${g.etapas.length} etapas</span><span>${r.feitos}/${r.total} passos</span></div>`;
    card.onclick = () => setView('guia', g.id);
    grid.appendChild(card);
  }
}

// ---------- Detalhe do guia ----------
let etapasAbertas = {};
function renderGuiaDetalhe(guiaId) {
  const guia = GUIAS.find((g) => g.id === guiaId);
  if (!guia) return setView('guias');
  const app = $('app');
  app.className = 'app c-' + guia.cor;
  const r = guideTotals(guia);

  app.innerHTML = `
    <div class="detail-head">
      <button class="back-btn" id="backBtn">←</button>
      <div><div class="detail-title">${guia.emoji} ${guia.titulo}</div></div>
    </div>
    <p class="detail-sub">${guia.resumo}</p>
    <div class="detail-progress">
      <div class="progress-track"><span class="progress-fill" id="gFill"></span></div>
      <span class="progress-label" id="gLabel">${r.feitos}/${r.total}</span>
    </div>
    <div id="etapasWrap"></div>`;
  $('backBtn').onclick = () => { app.className = 'app'; setView('guias'); };
  requestAnimationFrame(() => { $('gFill').style.width = (r.pct * 100) + '%'; });

  const wrap = $('etapasWrap');
  guia.etapas.forEach((et) => wrap.appendChild(renderEtapa(guia, et)));
}

function renderEtapa(guia, et) {
  const gs = guideStore(guia.id);
  const completa = etapaCompleta(guia, et);
  const aberta = !!etapasAbertas[et.id];
  const feitosNaEtapa = et.leituras.filter((l) => gs.items[l.id]?.done).length + et.perguntas.filter((q) => (gs.answers[q.id]||'').trim()).length;
  const totalEtapa = et.leituras.length + et.perguntas.length;
  const pctEt = totalEtapa ? feitosNaEtapa / totalEtapa : 0;

  const card = el('section', 'etapa' + (completa ? ' completa' : '') + (aberta ? ' open' : ''));

  const head = el('button', 'etapa-head');
  head.innerHTML = `
    <div class="mini-ring-wrap ring" style="width:38px;height:38px">${ringSVG(pctEt, 38, 4, 'e'+et.id)}<span class="txt">${feitosNaEtapa}/${totalEtapa}</span></div>
    <div class="etapa-info">
      <span class="etapa-num">${et.numero || ''}${et.nota ? ` · <em>${et.nota}</em>` : ''}</span>
      <span class="etapa-titulo">${et.titulo}</span>
    </div>
    <span class="etapa-seta">▸</span>`;
  head.onclick = () => { etapasAbertas[et.id] = !etapasAbertas[et.id]; refreshEtapa(guia, et, card); };
  card.appendChild(head);

  const body = el('div', 'etapa-body');
  body.hidden = !aberta;
  if (aberta) fillEtapaBody(guia, et, body);
  card.appendChild(body);
  return card;
}

function refreshEtapa(guia, et, oldCard) {
  const novo = renderEtapa(guia, et);
  oldCard.replaceWith(novo);
}

function fillEtapaBody(guia, et, body) {
  const gs = guideStore(guia.id);
  body.innerHTML = '';

  if (et.contexto?.length) {
    const ctx = el('ul', 'contexto');
    et.contexto.forEach((c) => { const li = el('li'); li.textContent = c; ctx.appendChild(li); });
    body.appendChild(ctx);
  }

  // Leituras
  const lblL = el('div', 'bloco-label'); lblL.innerHTML = '📖 Leituras';
  body.appendChild(lblL);
  et.leituras.forEach((l) => {
    const item = el('div', 'leitura' + (gs.items[l.id]?.done ? ' on' : ''));
    const tagCls = l.tag === 'carta' ? 'carta' : l.tag === 'salmo' ? 'salmo' : 'leitura-t';
    const tagTxt = l.tag === 'carta' ? 'Carta' : l.tag === 'salmo' ? 'Salmo' : 'Leitura';
    item.innerHTML = `
      <button class="check">✓</button>
      <div class="leitura-info"><div class="leitura-ref">${l.ref}</div><div class="leitura-desc">${l.desc || ''}</div></div>
      <span class="tag ${tagCls}">${tagTxt}</span>`;
    item.querySelector('.check').onclick = () => {
      const cur = gs.items[l.id] || {};
      gs.items[l.id] = { done: !cur.done };
      if (!gs.items[l.id].done) delete gs.items[l.id];
      save();
      item.classList.toggle('on');
      const chk = item.querySelector('.check'); chk.classList.remove('pop'); void chk.offsetWidth; chk.classList.add('pop');
      afterProgressChange(guia, et, body);
    };
    body.appendChild(item);
  });

  // Método sugerido
  if (et.metodo) {
    const m = METODOS.find((x) => x.id === et.metodo);
    if (m) {
      const chip = el('div', 'metodo-chip');
      chip.innerHTML = `${m.emoji} Método sugerido: <b>${m.nome}</b> ›`;
      chip.onclick = () => setView('metodo', m.id);
      body.appendChild(chip);
    }
  }

  // Perguntas
  const lblP = el('div', 'bloco-label'); lblP.innerHTML = '✍️ Perguntas de fixação';
  body.appendChild(lblP);
  et.perguntas.forEach((q) => {
    const tp = TIPOS_PERGUNTA[q.tipo] || { label: q.tipo };
    const resp = (gs.answers[q.id] || '').trim();
    const pg = el('div', 'pergunta' + (resp ? ' resp' : ''));
    pg.innerHTML = `
      <div class="perg-head">
        <span class="perg-tipo">${tp.label}</span>
        <span class="perg-texto">${q.texto}</span>
      </div>
      <textarea placeholder="Sua resposta...">${gs.answers[q.id] ? escapeHtml(gs.answers[q.id]) : ''}</textarea>`;
    const ta = pg.querySelector('textarea');
    let timer;
    const salvar = () => {
      const v = ta.value.trim();
      if (v) gs.answers[q.id] = ta.value; else delete gs.answers[q.id];
      save();
      pg.classList.toggle('resp', !!v);
      afterProgressChange(guia, et, body);
    };
    ta.addEventListener('input', () => { clearTimeout(timer); timer = setTimeout(salvar, 500); });
    ta.addEventListener('blur', () => { clearTimeout(timer); salvar(); });
    body.appendChild(pg);
  });
}

let etapasCompletas = {}; // memória para disparar confete só ao concluir
function afterProgressChange(guia, et, body) {
  // atualiza barra e label do guia sem recriar tudo
  const r = guideTotals(guia);
  const fill = $('gFill'), label = $('gLabel');
  if (fill) fill.style.width = (r.pct * 100) + '%';
  if (label) label.textContent = `${r.feitos}/${r.total}`;

  // atualiza anel/estado da etapa (via re-render do card pai)
  const card = body.closest('.etapa');
  const completaAgora = etapaCompleta(guia, et);
  if (card) {
    card.classList.toggle('completa', completaAgora);
    const wrap = card.querySelector('.mini-ring-wrap');
    if (wrap) {
      const gs = guideStore(guia.id);
      const f = et.leituras.filter((l)=>gs.items[l.id]?.done).length + et.perguntas.filter((q)=>(gs.answers[q.id]||'').trim()).length;
      const t = et.leituras.length + et.perguntas.length;
      wrap.innerHTML = ringSVG(t?f/t:0, 38, 4, 'e'+et.id) + `<span class="txt">${f}/${t}</span>`;
    }
  }

  const chave = guia.id + '-' + et.id;
  if (completaAgora && !etapasCompletas[chave]) {
    etapasCompletas[chave] = true;
    celebrar();
    toast('Etapa concluída! 🎉');
  } else if (!completaAgora) {
    etapasCompletas[chave] = false;
  }
}

// ---------- Métodos ----------
function renderMetodos() {
  const app = $('app'); app.className = 'app';
  app.innerHTML = `<p class="section-title">Métodos de estudo bíblico</p>
    <p class="muted small" style="margin:0 4px 14px">Escolha um método, aplique a um texto e salve no seu diário.</p>
    <div id="metodosList"></div>`;
  const list = $('metodosList');
  METODOS.forEach((m) => {
    const c = el('div', 'metodo-card glass');
    c.innerHTML = `<div class="m-top"><span class="m-emoji">${m.emoji}</span><span class="m-nome">${m.nome}</span></div>
      <div class="m-resumo">${m.resumo}</div>`;
    c.onclick = () => setView('metodo', m.id);
    list.appendChild(c);
  });
}

function renderMetodoPratica(metodoId) {
  const m = METODOS.find((x) => x.id === metodoId);
  if (!m) return setView('metodos');
  const app = $('app'); app.className = 'app';
  app.innerHTML = `
    <div class="detail-head">
      <button class="back-btn" id="backBtn">←</button>
      <div><div class="detail-title">${m.emoji} ${m.nome}</div></div>
    </div>
    <p class="detail-sub">${m.resumo}</p>
    <div class="ref-field">
      <label>Texto / passagem</label>
      <input class="field-inp" id="mRef" placeholder="Ex.: João 3, Salmo 23..." autocomplete="off" />
    </div>
    <div id="mPassos"></div>
    <button class="btn primary full" id="mSalvar" style="margin-top:6px">Salvar no diário</button>`;
  $('backBtn').onclick = () => setView('metodos');

  const passos = $('mPassos');
  m.passos.forEach((p) => {
    const wrap = el('div', 'metodo-passo');
    wrap.innerHTML = `<label>${p.label}${p.dica ? `<span class="hint">${p.dica}</span>` : ''}</label>
      <textarea data-passo="${p.id}" placeholder="${p.placeholder || ''}"></textarea>`;
    passos.appendChild(wrap);
  });

  $('mSalvar').onclick = () => {
    const ref = $('mRef').value.trim();
    const campos = {};
    let algum = false;
    passos.querySelectorAll('textarea').forEach((ta) => {
      const p = m.passos.find((x) => x.id === ta.dataset.passo);
      if (ta.value.trim()) { campos[p.label] = ta.value.trim(); algum = true; }
    });
    if (!ref && !algum) { toast('Preencha ao menos um campo'); return; }
    const now = new Date();
    store.studies.unshift({
      id: `${Date.now()}-${Math.random().toString(36).slice(2,7)}`,
      date: keyOf(now), time: `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`,
      metodo: m.nome, ref: ref || '(sem referência)', campos,
    });
    save();
    celebrar();
    toast('Estudo salvo no diário ✓');
    setView('diario');
  };
}

// ---------- Diário ----------
function renderDiario() {
  const app = $('app'); app.className = 'app';
  app.innerHTML = `<p class="section-title">Meu diário de estudos</p><div id="diarioList"></div>`;
  const list = $('diarioList');

  if (!store.studies.length) {
    list.innerHTML = `<p class="diario-empty">Nenhum estudo salvo ainda.<br>Aplique um <b>método</b> a um texto e ele aparece aqui.</p>`;
    renderLegacyBooks(list);
    return;
  }

  const ordered = [...store.studies].sort((a,b) => (b.date + (b.time||'')).localeCompare(a.date + (a.time||'')));
  const groups = new Map();
  for (const s of ordered) { if (!groups.has(s.date)) groups.set(s.date, []); groups.get(s.date).push(s); }

  for (const [date, items] of groups) {
    const lbl = el('div', 'diario-group-label'); lbl.textContent = formatDatePt(date);
    list.appendChild(lbl);
    for (const s of items) {
      const card = el('div', 'estudo-item');
      let camposHtml = '';
      for (const k in (s.campos || {})) camposHtml += `<div class="estudo-campo"><div class="ck">${escapeHtml(k)}</div><div class="cv">${escapeHtml(s.campos[k])}</div></div>`;
      card.innerHTML = `
        <div class="estudo-head"><span class="estudo-ref">${escapeHtml(s.ref)}</span><span class="estudo-time">${s.time || ''}</span></div>
        <div class="estudo-metodo">${escapeHtml(s.metodo || '')}</div>
        <div class="estudo-campos">${camposHtml}</div>
        <button class="estudo-del">✕ remover</button>`;
      card.querySelector('.estudo-del').onclick = () => {
        store.studies = store.studies.filter((x) => x.id !== s.id);
        save(); renderDiario(); toast('Estudo removido');
      };
      list.appendChild(card);
    }
  }
  renderLegacyBooks(list);
}

function renderLegacyBooks(list) {
  if (!store.legacyBooks?.length) return;
  const lbl = el('div', 'section-title'); lbl.textContent = '📕 Livros lidos';
  list.appendChild(lbl);
  store.legacyBooks.forEach((b) => {
    const c = el('div', 'estudo-item');
    c.innerHTML = `<div class="estudo-head"><span class="estudo-ref">${escapeHtml(b.title || '')}</span><span class="estudo-time">${b.date ? formatShort(b.date) : ''}</span></div>`;
    list.appendChild(c);
  });
}

// ---------- Backup ----------
function openBackup() {
  $('backupSheet').hidden = false;
  const s = $('backupStats');
  s.innerHTML = `
    <div class="bs"><b>${guiasConcluidos()}/${GUIAS.length}</b><small>Guias</small></div>
    <div class="bs"><b>${contarLeituras()}</b><small>Leituras</small></div>
    <div class="bs"><b>${store.studies.length}</b><small>Estudos</small></div>`;
  $('importInfo').hidden = true;
}
function closeBackup() { $('backupSheet').hidden = true; }

function exportBackup() {
  const payload = { app: 'lumen', version: 2, exportedAt: new Date().toISOString(),
    guides: store.guides, studies: store.studies, legacyEntries: store.legacyEntries, legacyBooks: store.legacyBooks };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const a = el('a'); a.href = URL.createObjectURL(blob);
  a.download = `lumen-backup-${keyOf(new Date())}.json`; a.click();
  URL.revokeObjectURL(a.href);
  toast('Backup exportado ✓');
}

async function importBackup(file) {
  let p;
  try { p = JSON.parse(await file.text()); } catch { toast('Arquivo inválido'); return; }
  const info = { guias: 0, estudos: 0, respostas: 0 };

  // Formato NOVO (lumen)
  if (p.guides || p.version === 2) {
    if (p.guides) for (const gid in p.guides) {
      const src = p.guides[gid], dst = guideStore(gid);
      for (const k in (src.items||{})) if (!dst.items[k]) dst.items[k] = src.items[k];
      for (const k in (src.answers||{})) if (!dst.answers[k]) { dst.answers[k] = src.answers[k]; info.respostas++; }
    }
    if (Array.isArray(p.studies)) mesclarStudies(p.studies, info);
    if (p.legacyEntries) store.legacyEntries = Object.assign(store.legacyEntries, p.legacyEntries);
    if (Array.isArray(p.legacyBooks)) mesclarBooks(p.legacyBooks);
  }

  // Formato ANTIGO (santidade): entries, books, studies, paulo
  if (p.app === 'santidade' || p.paulo || p.entries) {
    if (p.paulo && typeof p.paulo === 'object') {
      const dst = guideStore('paulo');
      for (const k in p.paulo) {
        const v = p.paulo[k];
        if (v && v.done && !dst.items[k]) { dst.items[k] = { done: true }; }
        if (v && v.nota) {
          // nota antiga do Paulo vira uma resposta livre no diário para não perder
          store.studies.unshift({ id: `mig-${k}`, date: keyOf(new Date()), time: '',
            metodo: 'Nota (migrada)', ref: 'Paulo · ' + k, campos: { 'Comentário': v.nota } });
          info.estudos++;
        }
      }
      info.guias++;
    }
    if (Array.isArray(p.studies)) {
      const conv = p.studies.map((s) => ({
        id: s.id || `leg-${Math.random().toString(36).slice(2,8)}`,
        date: s.date || keyOf(new Date()), time: s.time || '',
        metodo: 'Estudo livre', ref: [s.livro, s.capitulo].filter(Boolean).join(' ') || '(estudo)',
        campos: s.texto ? { 'O que entendi': s.texto } : {},
      }));
      mesclarStudies(conv, info);
    }
    if (Array.isArray(p.books)) mesclarBooks(p.books);
    if (p.entries && typeof p.entries === 'object') {
      for (const k in p.entries) if (k !== '_books' && k !== '_studies' && k !== '_paulo') store.legacyEntries[k] = p.entries[k];
    }
  }

  save();
  const el2 = $('importInfo');
  el2.hidden = false;
  el2.textContent = `Importado ✓  ${info.estudos} estudos, ${info.respostas} respostas restauradas.`;
  openBackup();
  toast('Backup importado ✓');
  if (currentView === 'inicio') renderInicio();
}

function mesclarStudies(arr, info) {
  const ids = new Set(store.studies.map((s) => s.id));
  for (const s of arr) if (!ids.has(s.id)) { store.studies.push(s); ids.add(s.id); if (info) info.estudos++; }
}
function mesclarBooks(arr) {
  const seen = new Set(store.legacyBooks.map((b) => (b.title||'') + '|' + (b.date||'')));
  for (const b of arr) { const id = (b.title||'')+'|'+(b.date||''); if (!seen.has(id)) { store.legacyBooks.push(b); seen.add(id); } }
}

// ---------- Utilidades ----------
function keyOf(d) { return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; }
function formatShort(k) { const [y,m,d] = k.split('-'); return `${d}/${m}/${y}`; }
const MESES = ['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'];
const DIAS = ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'];
function formatDatePt(k) {
  const [y,m,d] = k.split('-').map(Number); const dt = new Date(y, m-1, d);
  return `${DIAS[dt.getDay()]}, ${d} de ${MESES[m-1]}`;
}
function escapeHtml(s){ return String(s).replace(/[&<>"']/g,(c)=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

let toastT;
function toast(msg) { const t = $('toast'); t.textContent = msg; t.hidden = false; clearTimeout(toastT); toastT = setTimeout(()=> t.hidden = true, 2000); }

// ---------- Confete ----------
function celebrar() {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const cv = $('confetti'); const ctx = cv.getContext('2d');
  cv.width = innerWidth; cv.height = innerHeight;
  const cores = ['#8f7bff','#34d9a8','#e8c46a','#4aa8ff','#ff6b9d','#4ad07f'];
  const parts = Array.from({length: 90}, () => ({
    x: innerWidth/2, y: innerHeight*0.35,
    vx: (Math.random()-.5)*10, vy: Math.random()*-11-4,
    r: Math.random()*6+3, c: cores[Math.floor(Math.random()*cores.length)],
    rot: Math.random()*6, vr: (Math.random()-.5)*.4, life: 0,
  }));
  let raf;
  const tick = () => {
    ctx.clearRect(0,0,cv.width,cv.height);
    let vivos = 0;
    for (const p of parts) {
      p.life++; p.vy += 0.35; p.x += p.vx; p.y += p.vy; p.rot += p.vr;
      if (p.y < cv.height + 20) vivos++;
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot);
      ctx.fillStyle = p.c; ctx.globalAlpha = Math.max(0, 1 - p.life/90);
      ctx.fillRect(-p.r/2, -p.r/2, p.r, p.r*1.6); ctx.restore();
    }
    if (vivos > 0) raf = requestAnimationFrame(tick); else ctx.clearRect(0,0,cv.width,cv.height);
  };
  cancelAnimationFrame(raf); tick();
}

// ---------- Eventos globais ----------
document.querySelectorAll('.tabbtn').forEach((b) => b.addEventListener('click', () => { $('app').className = 'app'; setView(b.dataset.view); }));
$('backupBtn').onclick = openBackup;
$('closeBackup').onclick = closeBackup;
$('backupSheet').addEventListener('click', (e) => { if (e.target.id === 'backupSheet') closeBackup(); });
$('exportBtn').onclick = exportBackup;
$('importBtn').onclick = () => $('importFile').click();
$('importFile').addEventListener('change', (e) => { const f = e.target.files[0]; if (f) importBackup(f); e.target.value = ''; });

// ---------- Init ----------
load();
// marca etapas já completas para não disparar confete ao abrir
for (const g of GUIAS) for (const et of g.etapas) if (etapaCompleta(g, et)) etapasCompletas[g.id + '-' + et.id] = true;
setView('inicio');

// PWA
if ('serviceWorker' in navigator) navigator.serviceWorker.register('./sw.js').catch(()=>{});

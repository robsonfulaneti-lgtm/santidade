/* ============================================================
   LUMEN — estudo da Bíblia inteira. App estático, local-first.
   Núcleo: panorama dos 66 livros. Guias: Paulo (progresso
   preservado) e os Doze Discípulos. Aprender: a grande história
   e como estudar. Diário: reflexões. Sem servidor.
   ============================================================ */

const $ = (id) => document.getElementById(id);
const el = (t, c) => { const e = document.createElement(t); if (c) e.className = c; return e; };
const LS = 'lumen_store';

// ---------- Estado (mesma chave de antes: preserva Paulo) ----------
let store = { books: {}, guides: {}, studies: [], legacyEntries: {}, legacyBooks: [] };

function load() {
  try { const raw = JSON.parse(localStorage.getItem(LS)); if (raw && typeof raw === 'object') store = Object.assign(store, raw); } catch {}
  if (!store.books) store.books = {};
  if (!store.guides) store.guides = {};
  if (!Array.isArray(store.studies)) store.studies = [];
  if (!store.legacyEntries) store.legacyEntries = {};
  if (!Array.isArray(store.legacyBooks)) store.legacyBooks = [];
}
function save() { try { localStorage.setItem(LS, JSON.stringify(store)); } catch {} }

function guideStore(id) { if (!store.guides[id]) store.guides[id] = { items: {}, answers: {} }; return store.guides[id]; }
function bookStore(id) { if (!store.books[id]) store.books[id] = { lido: false, respostas: {} }; return store.books[id]; }

// ---------- Utilidades da Bíblia ----------
function todosLivros() { return BIBLIA.flatMap((d) => d.livros); }
function bookPerguntas(b) {
  return [{ id: b.id + '-q1', tipo: 'observacao', texto: b.pergunta },
    ...PERGUNTAS_PADRAO.map((p) => ({ id: b.id + '-' + p.sufixo, tipo: p.tipo, texto: p.texto }))];
}
function livrosLidos() { return todosLivros().filter((b) => store.books[b.id]?.lido).length; }
function livroConcluido(b) {
  const st = store.books[b.id]; if (!st || !st.lido) return false;
  return bookPerguntas(b).every((q) => (st.respostas?.[q.id] || '').trim());
}
function livrosConcluidos() { return todosLivros().filter(livroConcluido).length; }

// ---------- Progresso dos guias ----------
function guideById(id) { return (window.GUIAS || []).find((g) => g.id === id); }
function guideTotals(guia) {
  let total = 0, feitos = 0; const gs = store.guides[guia.id] || { items: {}, answers: {} };
  for (const et of guia.etapas) {
    for (const l of et.leituras) { total++; if (gs.items[l.id]?.done) feitos++; }
    for (const q of et.perguntas) { total++; if ((gs.answers[q.id] || '').trim()) feitos++; }
  }
  return { total, feitos, pct: total ? feitos / total : 0 };
}
function etapaCompleta(guia, et) {
  const gs = store.guides[guia.id] || { items: {}, answers: {} };
  return et.leituras.every((l) => gs.items[l.id]?.done) && et.perguntas.every((q) => (gs.answers[q.id] || '').trim());
}

// ---------- Anel SVG ----------
function ringSVG(pct, size, stroke, id) {
  const r = (size - stroke) / 2, c = 2 * Math.PI * r, off = c * (1 - pct);
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
    <defs><linearGradient id="grad-${id}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#8f7bff"/><stop offset="1" stop-color="#34d9a8"/></linearGradient></defs>
    <circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="rgba(255,255,255,.1)" stroke-width="${stroke}"/>
    <circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="url(#grad-${id})" stroke-width="${stroke}"
      stroke-linecap="round" stroke-dasharray="${c.toFixed(1)}" stroke-dashoffset="${off.toFixed(1)}"
      transform="rotate(-90 ${size/2} ${size/2})"/></svg>`;
}

// ---------- Router ----------
function setView(view, arg) {
  document.querySelectorAll('.tabbtn').forEach((b) => b.classList.toggle('active', b.dataset.view === view));
  const app = $('app'); app.className = 'app';
  app.classList.remove('view-enter'); void app.offsetWidth; app.classList.add('view-enter');
  window.scrollTo(0, 0);
  ({ inicio: renderInicio, biblia: renderBiblia, livro: renderLivro, guias: renderGuias, guia: renderGuia,
     rotina: renderRotina, diario: renderDiario, historia: renderHistoria, metodo: renderMetodo }[view] || renderInicio)(arg);
}

// ---------- Início ----------
function renderInicio() {
  const app = $('app');
  const lidos = livrosLidos(), pct = lidos / 66;
  const hora = new Date().getHours();
  const saud = hora < 12 ? 'Bom dia' : hora < 18 ? 'Boa tarde' : 'Boa noite';
  const proximo = todosLivros().find((b) => !store.books[b.id]?.lido) || todosLivros()[0];
  const gTot = (window.GUIAS || []).reduce((a, g) => { const r = guideTotals(g); return { t: a.t + r.total, f: a.f + r.feitos }; }, { t: 0, f: 0 });
  const gPct = gTot.t ? Math.round((gTot.f / gTot.t) * 100) : 0;

  app.innerHTML = `
    <section class="hero glass">
      <div class="hero-text"><h1>${saud} 🙏</h1><p>Sua jornada pela Bíblia inteira, um livro de cada vez.</p></div>
      <div class="hero-ring ring">${ringSVG(pct, 84, 9, 'hero')}<span class="pct">${lidos}<small>/66</small></span></div>
    </section>

    <div class="stats-row">
      <div class="stat glass"><span class="n">${lidos}</span><span class="l">Livros<br>lidos</span></div>
      <div class="stat glass"><span class="n">${livrosConcluidos()}</span><span class="l">Livros<br>concluídos</span></div>
      <div class="stat glass"><span class="n">${gPct}%</span><span class="l">Guias<br>temáticos</span></div>
    </div>

    <p class="section-title">Continuar lendo</p>
    <div class="continue-card glass c-${proximo.testamento === 'Antigo Testamento' ? 'ambar' : 'azul'}" id="continua">
      <span class="continue-emoji">${proximo.testamento === 'Antigo Testamento' ? '📜' : '✝️'}</span>
      <div class="continue-info"><div class="k">${proximo.divisao}</div><div class="t">${proximo.nome}</div><div class="s">${proximo.tema}</div></div>
      <span class="continue-go">→</span>
    </div>

    <p class="section-title">Aprender</p>
    <div class="aprender-grid">
      <div class="aprender-card glass" id="cardHistoria">
        <span class="ac-emoji">🌌</span><div class="ac-t">A grande história</div>
        <div class="ac-s">Como os 66 livros contam uma só história.</div>
      </div>
      <div class="aprender-card glass" id="cardMetodo">
        <span class="ac-emoji">🧭</span><div class="ac-t">Como estudar</div>
        <div class="ac-s">4 passos para ler qualquer texto bíblico.</div>
      </div>
    </div>`;
  $('continua').onclick = () => setView('livro', proximo.id);
  $('cardHistoria').onclick = () => setView('historia');
  $('cardMetodo').onclick = () => setView('metodo');
  requestAnimationFrame(() => animRing(app.querySelector('.hero-ring'), pct));
}
function animRing(wrap, pct) {
  const c = wrap && wrap.querySelectorAll('circle')[1]; if (!c) return;
  const dash = parseFloat(c.getAttribute('stroke-dasharray'));
  c.style.strokeDashoffset = dash; requestAnimationFrame(() => { c.style.transition = 'stroke-dashoffset 1s cubic-bezier(.2,.8,.2,1)'; c.style.strokeDashoffset = (dash * (1 - pct)).toFixed(1); });
}

// ---------- A Bíblia (panorama) ----------
function renderBiblia() {
  const app = $('app');
  app.innerHTML = `<p class="section-title">A Bíblia · ${livrosLidos()} de 66 livros</p><div id="divisoes"></div>`;
  const wrap = $('divisoes');
  let testAtual = '';
  for (const div of BIBLIA) {
    if (div.testamento !== testAtual) { testAtual = div.testamento;
      const t = el('div', 'testamento-label'); t.textContent = testAtual; wrap.appendChild(t); }
    const sec = el('section', 'divisao');
    const cor = div.testamento === 'Antigo Testamento' ? 'ambar' : 'azul';
    const lidosDiv = div.livros.filter((b) => store.books[b.id]?.lido).length;
    sec.innerHTML = `<div class="divisao-head c-${cor}"><span class="divisao-nome">${div.divisao}</span><span class="divisao-cont">${lidosDiv}/${div.livros.length}</span></div>`;
    const grid = el('div', 'livros-grid');
    for (const b of div.livros) {
      const st = store.books[b.id]; const concl = livroConcluido(b);
      const card = el('button', 'livro-card glass c-' + cor + (st?.lido ? ' lido' : '') + (concl ? ' concl' : ''));
      card.innerHTML = `<span class="livro-nome">${b.nome}</span><span class="livro-caps">${b.caps} cap.</span>
        ${concl ? '<span class="livro-badge">✓</span>' : st?.lido ? '<span class="livro-dot"></span>' : ''}`;
      card.onclick = () => setView('livro', b.id);
      grid.appendChild(card);
    }
    sec.appendChild(grid); wrap.appendChild(sec);
  }
}

// ---------- Detalhe do livro ----------
function renderLivro(bookId) {
  const b = todosLivros().find((x) => x.id === bookId);
  if (!b) return setView('biblia');
  const app = $('app'); const cor = b.testamento === 'Antigo Testamento' ? 'ambar' : 'azul';
  app.className = 'app c-' + cor;
  const st = bookStore(b.id);

  app.innerHTML = `
    <div class="detail-head">
      <button class="back-btn" id="back">←</button>
      <div><div class="detail-title">${b.nome}</div><div class="detail-kicker">${b.divisao} · ${b.testamento}</div></div>
    </div>

    <div class="meta-chips">
      <span class="chip">✍️ ${b.autor}</span><span class="chip">🗓️ ${b.data}</span><span class="chip">📖 ${b.caps} capítulos</span>
    </div>

    <div class="tema-box glass"><div class="box-label">Tema central</div><p>${b.tema}</p></div>
    <div class="chave-box"><div class="box-label">Versículo-chave</div><p>${b.chave}</p></div>
    <div class="panorama-box glass"><div class="box-label">Panorama</div><p>${b.panorama}</p></div>
    <div class="cristo-box"><div class="box-label">✝️ Cristo neste livro</div><p>${b.cristo}</p></div>

    <button class="btn ${st.lido ? 'ghost' : 'accent'} full lido-btn" id="lidoBtn">
      ${st.lido ? '✓ Livro lido' : 'Marcar como lido'}</button>

    <p class="bloco-label" style="margin-top:22px">✍️ Perguntas de reflexão</p>
    <div id="perguntas"></div>`;
  $('back').onclick = () => { app.className = 'app'; setView('biblia'); };
  $('lidoBtn').onclick = () => {
    st.lido = !st.lido; if (!st.lido && !(Object.keys(st.respostas || {}).length)) {} save();
    const btn = $('lidoBtn'); btn.className = `btn ${st.lido ? 'ghost' : 'accent'} full lido-btn`;
    btn.textContent = st.lido ? '✓ Livro lido' : 'Marcar como lido';
    if (st.lido && livroConcluido(b)) { celebrar(); toast('Livro concluído! 🎉'); }
    else if (st.lido) toast('Marcado como lido ✓');
  };

  const pw = $('perguntas');
  bookPerguntas(b).forEach((q) => pw.appendChild(perguntaEl(q, st.respostas, (val) => {
    if (val) st.respostas[q.id] = val; else delete st.respostas[q.id]; save();
    if (st.lido && livroConcluido(b)) { celebrar(); toast('Livro concluído! 🎉'); }
  })));
}

// elemento de pergunta reutilizável (livros e guias)
function perguntaEl(q, respMap, onSave) {
  const tipoLabel = TIPOS_PERGUNTA[q.tipo] || q.tipo;
  const resp = (respMap[q.id] || '').trim();
  const pg = el('div', 'pergunta' + (resp ? ' resp' : ''));
  pg.innerHTML = `<div class="perg-head"><span class="perg-tipo">${tipoLabel}</span><span class="perg-texto">${q.texto}</span></div>
    <textarea placeholder="Escreva sua resposta...">${respMap[q.id] ? escapeHtml(respMap[q.id]) : ''}</textarea>`;
  const ta = pg.querySelector('textarea'); let timer;
  const doSave = () => { const v = ta.value.trim(); pg.classList.toggle('resp', !!v); onSave(v ? ta.value : ''); };
  ta.addEventListener('input', () => { clearTimeout(timer); timer = setTimeout(doSave, 500); });
  ta.addEventListener('blur', () => { clearTimeout(timer); doSave(); });
  return pg;
}

// ---------- Guias temáticos ----------
function renderGuias() {
  const app = $('app');
  app.innerHTML = `<p class="section-title">Guias temáticos</p>
    <p class="muted small" style="margin:0 4px 14px">Estudos aprofundados por tema, com leituras e perguntas.</p>
    <div class="guias-grid" id="grid"></div>`;
  const grid = $('grid');
  (window.GUIAS || []).forEach((g) => {
    const r = guideTotals(g);
    const card = el('div', `guia-card glass c-${g.cor}` + (r.pct >= 1 ? ' done' : ''));
    card.innerHTML = `<div class="guia-top"><span class="guia-emoji">${g.emoji}</span>
      <div class="guia-h"><div class="t">${g.titulo}</div><div class="r">${g.resumo}</div></div>
      <div class="guia-mini-ring ring" style="width:52px;height:52px">${ringSVG(r.pct,52,6,'g'+g.id)}<span class="pct" style="font-size:12px">${Math.round(r.pct*100)}%</span></div></div>
      <div class="guia-bar"><span style="width:${r.pct*100}%"></span></div>
      <div class="guia-meta"><span>${g.etapas.length} etapas</span><span>${r.feitos}/${r.total} passos</span></div>`;
    card.onclick = () => setView('guia', g.id);
    grid.appendChild(card);
  });
}

let etapasAbertas = {}, etapasCompletas = {};
function renderGuia(guiaId) {
  const guia = guideById(guiaId); if (!guia) return setView('guias');
  const app = $('app'); app.className = 'app c-' + guia.cor;
  const r = guideTotals(guia);
  app.innerHTML = `
    <div class="detail-head"><button class="back-btn" id="back">←</button>
      <div><div class="detail-title">${guia.emoji} ${guia.titulo}</div></div></div>
    <p class="detail-sub">${guia.resumo}</p>
    <div class="detail-progress"><div class="progress-track"><span class="progress-fill" id="gFill"></span></div>
      <span class="progress-label" id="gLabel">${r.feitos}/${r.total}</span></div>
    <div id="etapas"></div>`;
  $('back').onclick = () => { app.className = 'app'; setView('guias'); };
  requestAnimationFrame(() => { $('gFill').style.width = (r.pct * 100) + '%'; });
  const wrap = $('etapas');
  guia.etapas.forEach((et) => wrap.appendChild(renderEtapa(guia, et)));
}

function renderEtapa(guia, et) {
  const gs = guideStore(guia.id);
  const aberta = !!etapasAbertas[et.id];
  const f = et.leituras.filter((l) => gs.items[l.id]?.done).length + et.perguntas.filter((q) => (gs.answers[q.id] || '').trim()).length;
  const t = et.leituras.length + et.perguntas.length;
  const card = el('section', 'etapa' + (etapaCompleta(guia, et) ? ' completa' : '') + (aberta ? ' open' : ''));
  const head = el('button', 'etapa-head');
  head.innerHTML = `<div class="mini-ring-wrap ring" style="width:38px;height:38px">${ringSVG(t?f/t:0,38,4,'e'+et.id)}<span class="txt">${f}/${t}</span></div>
    <div class="etapa-info"><span class="etapa-num">${et.numero||''}${et.nota?` · <em>${et.nota}</em>`:''}</span><span class="etapa-titulo">${et.titulo}</span></div>
    <span class="etapa-seta">▸</span>`;
  head.onclick = () => { etapasAbertas[et.id] = !etapasAbertas[et.id]; card.replaceWith(renderEtapa(guia, et)); };
  card.appendChild(head);
  const body = el('div', 'etapa-body'); body.hidden = !aberta;
  if (aberta) fillEtapa(guia, et, body);
  card.appendChild(body);
  return card;
}

function fillEtapa(guia, et, body) {
  const gs = guideStore(guia.id); body.innerHTML = '';
  if (et.contexto?.length) { const ul = el('ul', 'contexto'); et.contexto.forEach((c) => { const li = el('li'); li.textContent = c; ul.appendChild(li); }); body.appendChild(ul); }
  const lblL = el('div', 'bloco-label'); lblL.innerHTML = '📖 Leituras'; body.appendChild(lblL);
  et.leituras.forEach((l) => {
    const item = el('div', 'leitura' + (gs.items[l.id]?.done ? ' on' : ''));
    const tagCls = l.tag === 'carta' ? 'carta' : l.tag === 'salmo' ? 'salmo' : 'leitura-t';
    const tagTxt = l.tag === 'carta' ? 'Carta' : l.tag === 'salmo' ? 'Salmo' : 'Leitura';
    item.innerHTML = `<button class="check">✓</button><div class="leitura-info"><div class="leitura-ref">${l.ref}</div><div class="leitura-desc">${l.desc||''}</div></div><span class="tag ${tagCls}">${tagTxt}</span>`;
    item.querySelector('.check').onclick = () => {
      const cur = gs.items[l.id] || {}; gs.items[l.id] = { done: !cur.done }; if (!gs.items[l.id].done) delete gs.items[l.id]; save();
      item.classList.toggle('on'); const ck = item.querySelector('.check'); ck.classList.remove('pop'); void ck.offsetWidth; ck.classList.add('pop');
      guiaProgresso(guia, et, body);
    };
    body.appendChild(item);
  });
  const lblP = el('div', 'bloco-label'); lblP.innerHTML = '✍️ Perguntas de fixação'; body.appendChild(lblP);
  et.perguntas.forEach((q) => body.appendChild(perguntaEl(q, gs.answers, (val) => {
    if (val) gs.answers[q.id] = val; else delete gs.answers[q.id]; save(); guiaProgresso(guia, et, body);
  })));
}

function guiaProgresso(guia, et, body) {
  const r = guideTotals(guia);
  if ($('gFill')) $('gFill').style.width = (r.pct * 100) + '%';
  if ($('gLabel')) $('gLabel').textContent = `${r.feitos}/${r.total}`;
  const card = body.closest('.etapa'); const done = etapaCompleta(guia, et);
  if (card) { card.classList.toggle('completa', done);
    const w = card.querySelector('.mini-ring-wrap'); const gs = guideStore(guia.id);
    const f = et.leituras.filter((l)=>gs.items[l.id]?.done).length + et.perguntas.filter((q)=>(gs.answers[q.id]||'').trim()).length;
    const t = et.leituras.length + et.perguntas.length;
    if (w) w.innerHTML = ringSVG(t?f/t:0,38,4,'e'+et.id) + `<span class="txt">${f}/${t}</span>`; }
  const k = guia.id + '-' + et.id;
  if (done && !etapasCompletas[k]) { etapasCompletas[k] = true; celebrar(); toast('Etapa concluída! 🎉'); }
  else if (!done) etapasCompletas[k] = false;
}

// ---------- Aprender: a grande história ----------
function renderHistoria() {
  const app = $('app');
  app.innerHTML = `<div class="detail-head"><button class="back-btn" id="back">←</button>
      <div><div class="detail-title">🌌 ${HISTORIA.titulo}</div></div></div>
    <p class="detail-sub">${HISTORIA.intro}</p><div id="atos"></div>`;
  $('back').onclick = () => setView('inicio');
  const w = $('atos');
  HISTORIA.atos.forEach((a) => {
    const c = el('div', 'ato-card glass');
    c.innerHTML = `<div class="ato-top"><span class="ato-nome">${a.nome}</span><span class="ato-ref">${a.ref}</span></div>
      <p class="ato-ideia">${a.ideia}</p><p class="ato-texto">${a.texto}</p>`;
    w.appendChild(c);
  });
}

// ---------- Aprender: como estudar ----------
function renderMetodo() {
  const app = $('app');
  app.innerHTML = `<div class="detail-head"><button class="back-btn" id="back">←</button>
      <div><div class="detail-title">🧭 ${METODO.titulo}</div></div></div>
    <p class="detail-sub">${METODO.intro}</p><div id="passos"></div>
    <p class="bloco-label" style="margin-top:20px">💡 Dicas</p><ul class="dicas">${METODO.dicas.map((d)=>`<li>${d}</li>`).join('')}</ul>`;
  $('back').onclick = () => setView('inicio');
  const w = $('passos');
  METODO.passos.forEach((p) => {
    const c = el('div', 'passo-card glass c-' + p.cor);
    c.innerHTML = `<span class="passo-n">${p.n}</span><div class="passo-info"><div class="passo-nome">${p.nome}</div><p>${p.texto}</p></div>`;
    w.appendChild(c);
  });
}

// ---------- Diário ----------
function renderDiario() {
  const app = $('app');
  app.innerHTML = `<p class="section-title">Meu diário</p>
    <p class="muted small" style="margin:0 4px 14px">Suas respostas e reflexões guardadas.</p><div id="lista"></div>`;
  const list = $('lista');
  // reflexões escritas nos livros
  const refl = [];
  for (const b of todosLivros()) { const st = store.books[b.id]; if (st?.respostas) for (const q of bookPerguntas(b)) { const v = st.respostas[q.id]; if ((v||'').trim()) refl.push({ ref: b.nome, texto: v }); } }
  if (!store.studies.length && !refl.length && !store.legacyBooks.length) {
    list.innerHTML = `<p class="diario-empty">Nada por aqui ainda.<br>Responda as perguntas de um livro ou guia e suas reflexões aparecem aqui.</p>`;
    return;
  }
  if (refl.length) {
    const lbl = el('div', 'diario-group-label'); lbl.textContent = 'Reflexões dos livros'; list.appendChild(lbl);
    refl.slice(0, 60).forEach((r) => { const c = el('div', 'estudo-item');
      c.innerHTML = `<div class="estudo-head"><span class="estudo-ref">${escapeHtml(r.ref)}</span></div><div class="estudo-campos"><div class="estudo-campo"><div class="cv">${escapeHtml(r.texto)}</div></div></div>`;
      list.appendChild(c); });
  }
  if (store.studies.length) {
    const ordered = [...store.studies].sort((a,b)=>(b.date+(b.time||'')).localeCompare(a.date+(a.time||'')));
    const lbl = el('div', 'diario-group-label'); lbl.textContent = 'Estudos e notas'; list.appendChild(lbl);
    ordered.forEach((s) => { const c = el('div', 'estudo-item'); let campos = '';
      for (const k in (s.campos||{})) campos += `<div class="estudo-campo"><div class="ck">${escapeHtml(k)}</div><div class="cv">${escapeHtml(s.campos[k])}</div></div>`;
      c.innerHTML = `<div class="estudo-head"><span class="estudo-ref">${escapeHtml(s.ref||'')}</span><span class="estudo-time">${s.time||''}</span></div>
        <div class="estudo-metodo">${escapeHtml(s.metodo||'')}</div><div class="estudo-campos">${campos}</div><button class="estudo-del">✕ remover</button>`;
      c.querySelector('.estudo-del').onclick = () => { store.studies = store.studies.filter((x)=>x.id!==s.id); save(); renderDiario(); toast('Removido'); };
      list.appendChild(c); });
  }
  if (store.legacyBooks.length) {
    const lbl = el('div', 'diario-group-label'); lbl.textContent = '📕 Livros lidos'; list.appendChild(lbl);
    store.legacyBooks.forEach((b) => { const c = el('div', 'estudo-item');
      c.innerHTML = `<div class="estudo-head"><span class="estudo-ref">${escapeHtml(b.title||'')}</span><span class="estudo-time">${b.date?formatShort(b.date):''}</span></div>`; list.appendChild(c); });
  }
}

// ---------- Rotina (calendário de disciplinas) ----------
const HABITOS = [
  { key: 'biblia', emoji: '📖', nome: 'Li a Bíblia', campo: 'text', ph: 'O que li hoje...' },
  { key: 'jejum', emoji: '⏳', nome: 'Jejum', campo: 'hours' },
  { key: 'oracao', emoji: '🙏', nome: 'Orei', campo: null },
];
const MESES = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
const DIAS = ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'];
let rotinaView = new Date();
let openDayKey = null;

function entradas() { return store.legacyEntries; }
function dayStatus(e) { if (!e) return null; const n = HABITOS.filter((h) => e[h.key]?.done).length; if (!n) return null; return n === HABITOS.length ? 'complete' : 'partial'; }
function keyYMD(y, m, d) { return `${y}-${String(m+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`; }
function calcStreak() { let s = 0; const d = new Date(); for (;;) { const k = keyYMD(d.getFullYear(), d.getMonth(), d.getDate()); if (dayStatus(entradas()[k])) { s++; d.setDate(d.getDate()-1); } else break; } return s; }

function renderRotina() {
  const app = $('app');
  const s = calcStreak();
  app.innerHTML = `
    <p class="section-title">Rotina espiritual</p>
    <div class="rotina-top">
      <div class="month-nav glass"><button class="nav-btn" id="prevM">‹</button><span id="monthLabel" class="month-label"></span><button class="nav-btn" id="nextM">›</button></div>
      <div class="streak-badge glass">${s > 0 ? `🔥 ${s} dia${s>1?'s':''}` : '✨ Comece hoje'}</div>
    </div>
    <div class="weekdays">${['D','S','T','Q','Q','S','S'].map((d)=>`<span>${d}</span>`).join('')}</div>
    <div class="calendar" id="cal"></div>
    <p class="rotina-hint">Toque num dia para marcar. <b>Verde</b> = tudo feito · <b>ponto</b> = parcial.</p>`;
  $('prevM').onclick = () => { rotinaView.setMonth(rotinaView.getMonth()-1); renderRotina(); };
  $('nextM').onclick = () => { rotinaView.setMonth(rotinaView.getMonth()+1); renderRotina(); };
  buildCalendar();
}

function buildCalendar() {
  const y = rotinaView.getFullYear(), m = rotinaView.getMonth();
  $('monthLabel').textContent = `${MESES[m]} ${y}`;
  const primeiro = new Date(y, m, 1).getDay(), dias = new Date(y, m+1, 0).getDate();
  const hoje = keyYMD(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
  const cal = $('cal'); cal.innerHTML = '';
  for (let i = 0; i < primeiro; i++) cal.appendChild(el('div', 'day empty'));
  for (let d = 1; d <= dias; d++) {
    const k = keyYMD(y, m, d);
    const st = dayStatus(entradas()[k]);
    const cell = el('button', 'day' + (st === 'complete' ? ' complete' : st === 'partial' ? ' partial' : '') + (k === hoje ? ' today' : ''));
    cell.innerHTML = `${d}${st === 'partial' ? '<span class="ddot"></span>' : ''}`;
    cell.onclick = () => openDay(k);
    cal.appendChild(cell);
  }
}

function dayTitlePt(k) { const [y,m,d] = k.split('-').map(Number); const dt = new Date(y, m-1, d); return `${DIAS[dt.getDay()]}, ${d} de ${MESES[m-1]}`; }

function openDay(k) {
  openDayKey = k;
  $('dayTitle').textContent = dayTitlePt(k);
  const e = entradas()[k] || {};
  const wrap = $('dayHabits'); wrap.innerHTML = '';
  for (const h of HABITOS) {
    const st = e[h.key] || {};
    const card = el('div', 'habit' + (st.done ? ' on' : '')); card.dataset.key = h.key;
    card.innerHTML = `<div class="habit-row"><span class="habit-emoji">${h.emoji}</span><span class="habit-nome">${h.nome}</span><span class="hcheck">✓</span></div>`;
    let field = null;
    if (h.campo === 'text') { field = el('textarea', 'habit-field'); field.placeholder = h.ph || ''; field.value = st.text || ''; field.hidden = !st.done; card.appendChild(field); }
    else if (h.campo === 'hours') { field = el('label', 'hours-field'); field.hidden = !st.done;
      field.innerHTML = `<input type="number" min="0" step="0.5" inputmode="decimal" placeholder="0" value="${st.hours != null ? st.hours : ''}"><span>horas de jejum</span>`; card.appendChild(field); }
    card.querySelector('.habit-row').onclick = () => { const on = card.classList.toggle('on'); const f = card.querySelector('.habit-field, .hours-field'); if (f) f.hidden = !on; };
    wrap.appendChild(card);
  }
  $('daySheet').hidden = false;
}

function collectDay() {
  const e = {};
  document.querySelectorAll('#dayHabits .habit').forEach((card) => {
    if (!card.classList.contains('on')) return;
    const key = card.dataset.key;
    const ta = card.querySelector('.habit-field'), num = card.querySelector('.hours-field input');
    if (num) e[key] = { done: true, hours: num.value === '' ? null : Number(num.value) };
    else if (ta) e[key] = { done: true, text: ta.value.trim() };
    else e[key] = { done: true };
  });
  return e;
}

function saveDay() {
  if (!openDayKey) return;
  const e = collectDay();
  const completa = HABITOS.every((h) => e[h.key]?.done);
  if (Object.keys(e).length) store.legacyEntries[openDayKey] = e; else delete store.legacyEntries[openDayKey];
  save(); $('daySheet').hidden = true; openDayKey = null;
  renderRotina();
  if (completa) { celebrar(); toast('Dia completo! 🎉'); } else toast('Salvo ✓');
}
function clearDay() { if (!openDayKey) return; delete store.legacyEntries[openDayKey]; save(); $('daySheet').hidden = true; openDayKey = null; renderRotina(); toast('Dia limpo'); }

// ---------- Backup ----------
function openBackup() {
  $('backupSheet').hidden = false;
  $('backupStats').innerHTML = `<div class="bs"><b>${livrosLidos()}/66</b><small>Livros</small></div>
    <div class="bs"><b>${(window.GUIAS||[]).length}</b><small>Guias</small></div>
    <div class="bs"><b>${store.studies.length}</b><small>Notas</small></div>`;
  $('importInfo').hidden = true;
}
function exportBackup() {
  const payload = { app: 'lumen', version: 3, exportedAt: new Date().toISOString(),
    books: store.books, guides: store.guides, studies: store.studies, legacyEntries: store.legacyEntries, legacyBooks: store.legacyBooks };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const a = el('a'); a.href = URL.createObjectURL(blob); a.download = `lumen-backup-${keyOf(new Date())}.json`; a.click(); URL.revokeObjectURL(a.href);
  toast('Backup exportado ✓');
}
async function importBackup(file) {
  let p; try { p = JSON.parse(await file.text()); } catch { toast('Arquivo inválido'); return; }
  const info = { livros: 0, respostas: 0, notas: 0 };
  // Detecção exclusiva: santidade (antigo) vs lumen (novo)
  const ehAntigo = p.app === 'santidade' || p.paulo || p.entries || (Array.isArray(p.books) && !p.guides);

  // Formato novo (lumen: v2 ou v3) — books/guides são objetos (mapas), não arrays
  if (!ehAntigo) {
    if (p.books && !Array.isArray(p.books)) for (const bid in p.books) { const s = p.books[bid], d = bookStore(bid);
      if (s.lido) d.lido = true; for (const k in (s.respostas||{})) if (!d.respostas[k]) { d.respostas[k] = s.respostas[k]; info.respostas++; } info.livros++; }
    if (p.guides) for (const gid in p.guides) { const s = p.guides[gid], d = guideStore(gid);
      for (const k in (s.items||{})) if (!d.items[k]) d.items[k] = s.items[k];
      for (const k in (s.answers||{})) if (!d.answers[k]) { d.answers[k] = s.answers[k]; info.respostas++; } }
    if (Array.isArray(p.studies)) mesclarStudies(p.studies, info);
    if (p.legacyEntries) store.legacyEntries = Object.assign(store.legacyEntries, p.legacyEntries);
    if (Array.isArray(p.legacyBooks)) mesclarBooks(p.legacyBooks);
  }

  // Formato antigo (santidade)
  if (ehAntigo) {
    if (p.paulo && typeof p.paulo === 'object') { const d = guideStore('paulo');
      for (const k in p.paulo) { const v = p.paulo[k];
        if (v && v.done && !d.items[k]) d.items[k] = { done: true };
        if (v && v.nota) { store.studies.unshift({ id:'mig-'+k, date: keyOf(new Date()), time:'', metodo:'Nota (migrada)', ref:'Paulo · '+k, campos:{ 'Comentário': v.nota } }); info.notas++; } } }
    if (Array.isArray(p.studies)) mesclarStudies(p.studies.map((s)=>({ id: s.id||'leg-'+Math.random().toString(36).slice(2,8), date: s.date||keyOf(new Date()), time: s.time||'', metodo:'Estudo livre', ref:[s.livro,s.capitulo].filter(Boolean).join(' ')||'(estudo)', campos: s.texto?{ 'O que entendi': s.texto }:{} })), info);
    if (Array.isArray(p.books)) mesclarBooks(p.books);
    if (p.entries) for (const k in p.entries) if (!/^_/.test(k)) store.legacyEntries[k] = p.entries[k];
  }

  save();
  $('importInfo').hidden = false;
  $('importInfo').textContent = `Importado ✓  ${info.respostas} respostas e ${info.notas} notas restauradas.`;
  openBackup();
  toast('Backup importado ✓');
}
function mesclarStudies(arr, info) { const ids = new Set(store.studies.map((s)=>s.id)); for (const s of arr) if (!ids.has(s.id)) { store.studies.push(s); ids.add(s.id); if (info) info.notas++; } }
function mesclarBooks(arr) { const seen = new Set(store.legacyBooks.map((b)=>(b.title||'')+'|'+(b.date||''))); for (const b of arr) { const id=(b.title||'')+'|'+(b.date||''); if (!seen.has(id)) { store.legacyBooks.push(b); seen.add(id); } } }

// ---------- Utilidades ----------
function keyOf(d){ return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; }
function formatShort(k){ const [y,m,d]=k.split('-'); return `${d}/${m}/${y}`; }
function escapeHtml(s){ return String(s).replace(/[&<>"']/g,(c)=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
let toastT; function toast(m){ const t=$('toast'); t.textContent=m; t.hidden=false; clearTimeout(toastT); toastT=setTimeout(()=>t.hidden=true,2000); }

// ---------- Confete ----------
function celebrar() {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const cv = $('confetti'), ctx = cv.getContext('2d'); cv.width = innerWidth; cv.height = innerHeight;
  const cores = ['#8f7bff','#34d9a8','#e8c46a','#4aa8ff','#ff6b9d','#4ad07f'];
  const parts = Array.from({length:90}, () => ({ x: innerWidth/2, y: innerHeight*0.35, vx:(Math.random()-.5)*10, vy:Math.random()*-11-4, r:Math.random()*6+3, c:cores[Math.floor(Math.random()*cores.length)], rot:Math.random()*6, vr:(Math.random()-.5)*.4, life:0 }));
  let raf; const tick = () => { ctx.clearRect(0,0,cv.width,cv.height); let vivos=0;
    for (const p of parts){ p.life++; p.vy+=0.35; p.x+=p.vx; p.y+=p.vy; p.rot+=p.vr; if (p.y<cv.height+20) vivos++;
      ctx.save(); ctx.translate(p.x,p.y); ctx.rotate(p.rot); ctx.fillStyle=p.c; ctx.globalAlpha=Math.max(0,1-p.life/90); ctx.fillRect(-p.r/2,-p.r/2,p.r,p.r*1.6); ctx.restore(); }
    if (vivos>0) raf=requestAnimationFrame(tick); else ctx.clearRect(0,0,cv.width,cv.height); };
  cancelAnimationFrame(raf); tick();
}

// ---------- Eventos ----------
document.querySelectorAll('.tabbtn').forEach((b)=> b.addEventListener('click', ()=> setView(b.dataset.view)));
$('backupBtn').onclick = openBackup;
$('closeBackup').onclick = () => $('backupSheet').hidden = true;
$('backupSheet').addEventListener('click', (e)=>{ if (e.target.id==='backupSheet') $('backupSheet').hidden=true; });
$('exportBtn').onclick = exportBackup;
$('importBtn').onclick = () => $('importFile').click();
$('importFile').addEventListener('change', (e)=>{ const f=e.target.files[0]; if (f) importBackup(f); e.target.value=''; });
$('closeDay').onclick = () => { $('daySheet').hidden = true; openDayKey = null; };
$('saveDay').onclick = saveDay;
$('clearDay').onclick = clearDay;
$('daySheet').addEventListener('click', (e)=>{ if (e.target.id==='daySheet') { $('daySheet').hidden = true; openDayKey = null; } });

// ---------- Init ----------
load();
for (const g of (window.GUIAS||[])) for (const et of g.etapas) if (etapaCompleta(g, et)) etapasCompletas[g.id+'-'+et.id] = true;
setView('inicio');
if ('serviceWorker' in navigator) navigator.serviceWorker.register('./sw.js').catch(()=>{});

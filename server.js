// Servidor estático + API de persistência, sem dependências externas.
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 5173;
const PUBLIC_DIR = path.join(__dirname, 'public');
const DATA_FILE = path.join(__dirname, 'data.json');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
};

function readData() {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  } catch {
    return {};
  }
}

function writeData(obj) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(obj, null, 2));
}

function sendJson(res, code, obj) {
  const body = JSON.stringify(obj);
  res.writeHead(code, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
  });
  res.end(body);
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  // ---- API: guia de Paulo ----
  if (url.pathname === '/api/paulo') {
    if (req.method === 'GET') {
      return sendJson(res, 200, readData()._paulo || {});
    }
    if (req.method === 'PUT' || req.method === 'POST') {
      let raw = '';
      req.on('data', (c) => (raw += c));
      req.on('end', () => {
        try {
          const payload = JSON.parse(raw || '{}');
          const dataObj = readData();
          dataObj._paulo = payload.paulo && typeof payload.paulo === 'object' ? payload.paulo : {};
          writeData(dataObj);
          sendJson(res, 200, { ok: true });
        } catch (e) {
          sendJson(res, 400, { ok: false, error: String(e) });
        }
      });
      return;
    }
    return sendJson(res, 405, { error: 'method not allowed' });
  }

  // ---- API: estudos ----
  if (url.pathname === '/api/studies') {
    if (req.method === 'GET') {
      return sendJson(res, 200, readData()._studies || []);
    }
    if (req.method === 'PUT' || req.method === 'POST') {
      let raw = '';
      req.on('data', (c) => (raw += c));
      req.on('end', () => {
        try {
          const payload = JSON.parse(raw || '{}');
          const dataObj = readData();
          dataObj._studies = Array.isArray(payload.studies) ? payload.studies : [];
          writeData(dataObj);
          sendJson(res, 200, { ok: true });
        } catch (e) {
          sendJson(res, 400, { ok: false, error: String(e) });
        }
      });
      return;
    }
    return sendJson(res, 405, { error: 'method not allowed' });
  }

  // ---- API: livros terminados ----
  if (url.pathname === '/api/books') {
    if (req.method === 'GET') {
      return sendJson(res, 200, readData()._books || []);
    }
    if (req.method === 'PUT' || req.method === 'POST') {
      let raw = '';
      req.on('data', (c) => (raw += c));
      req.on('end', () => {
        try {
          const payload = JSON.parse(raw || '{}');
          const dataObj = readData();
          dataObj._books = Array.isArray(payload.books) ? payload.books : [];
          writeData(dataObj);
          sendJson(res, 200, { ok: true });
        } catch (e) {
          sendJson(res, 400, { ok: false, error: String(e) });
        }
      });
      return;
    }
    return sendJson(res, 405, { error: 'method not allowed' });
  }

  // ---- API ----
  if (url.pathname === '/api/entries') {
    if (req.method === 'GET') {
      return sendJson(res, 200, readData());
    }
    if (req.method === 'PUT' || req.method === 'POST') {
      let raw = '';
      req.on('data', (c) => (raw += c));
      req.on('end', () => {
        try {
          const payload = JSON.parse(raw || '{}');
          const data = readData();
          if (payload.date) {
            if (payload.entry && Object.keys(payload.entry).length) {
              data[payload.date] = payload.entry;
            } else {
              delete data[payload.date];
            }
          }
          writeData(data);
          sendJson(res, 200, { ok: true });
        } catch (e) {
          sendJson(res, 400, { ok: false, error: String(e) });
        }
      });
      return;
    }
    return sendJson(res, 405, { error: 'method not allowed' });
  }

  // ---- Arquivos estáticos ----
  let pathname = decodeURIComponent(url.pathname);
  if (pathname === '/') pathname = '/index.html';
  const filePath = path.join(PUBLIC_DIR, path.normalize(pathname));

  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403);
    return res.end('Forbidden');
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      return res.end('Não encontrado');
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(content);
  });
});

server.listen(PORT, () => {
  console.log(`\n  Santidade rodando em: http://localhost:${PORT}\n`);
});

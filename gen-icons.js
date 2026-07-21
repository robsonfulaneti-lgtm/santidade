// Gera icon-192.png e icon-512.png (cruz dourada sobre fundo indigo) sem dependências.
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

function makePng(size, file) {
  const W = size, H = size;
  const buf = Buffer.alloc(W * H * 4);

  // cores
  const bgTop = [42, 36, 85], bgBot = [15, 14, 26];
  const goldTop = [240, 209, 131], goldBot = [201, 155, 58];
  const s = size / 512;

  // cruz (mesmas proporções do SVG)
  const vx = 226 * s, vw = 60 * s, vy = 96 * s, vh = 320 * s;
  const hx = 146 * s, hw = 220 * s, hy = 192 * s, hh = 60 * s;
  const radius = 112 * s; // cantos arredondados do fundo

  function lerp(a, b, t) { return Math.round(a + (b - a) * t); }
  function inRect(x, y, rx, ry, rw, rh) { return x >= rx && x < rx + rw && y >= ry && y < ry + rh; }
  // fundo com canto arredondado (fora do raio = transparente)
  function insideRounded(x, y) {
    const r = radius;
    const cx = Math.min(Math.max(x, r), W - r);
    const cy = Math.min(Math.max(y, r), H - r);
    const dx = x - cx, dy = y - cy;
    return dx * dx + dy * dy <= r * r;
  }

  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const i = (y * W + x) * 4;
      if (!insideRounded(x, y)) { buf[i + 3] = 0; continue; }
      const ty = y / H;
      let r = lerp(bgTop[0], bgBot[0], ty), g = lerp(bgTop[1], bgBot[1], ty), b = lerp(bgTop[2], bgBot[2], ty);
      if (inRect(x, y, vx, vy, vw, vh) || inRect(x, y, hx, hy, hw, hh)) {
        const tg = y / H;
        r = lerp(goldTop[0], goldBot[0], tg); g = lerp(goldTop[1], goldBot[1], tg); b = lerp(goldTop[2], goldBot[2], tg);
      }
      buf[i] = r; buf[i + 1] = g; buf[i + 2] = b; buf[i + 3] = 255;
    }
  }

  // monta PNG (RGBA, sem filtro por linha)
  const raw = Buffer.alloc((W * 4 + 1) * H);
  for (let y = 0; y < H; y++) {
    raw[y * (W * 4 + 1)] = 0;
    buf.copy(raw, y * (W * 4 + 1) + 1, y * W * 4, (y + 1) * W * 4);
  }
  const idat = zlib.deflateSync(raw);

  function chunk(type, data) {
    const len = Buffer.alloc(4); len.writeUInt32BE(data.length, 0);
    const t = Buffer.from(type, 'ascii');
    const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(Buffer.concat([t, data])) >>> 0, 0);
    return Buffer.concat([len, t, data, crc]);
  }
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(W, 0); ihdr.writeUInt32BE(H, 4);
  ihdr[8] = 8; ihdr[9] = 6; // 8-bit, RGBA
  const png = Buffer.concat([sig, chunk('IHDR', ihdr), chunk('IDAT', idat), chunk('IEND', Buffer.alloc(0))]);
  fs.writeFileSync(file, png);
  console.log('gerado', path.basename(file), png.length, 'bytes');
}

// CRC32 (tabela)
const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();
function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

const dir = path.join(__dirname, 'public', 'icons');
makePng(192, path.join(dir, 'icon-192.png'));
makePng(512, path.join(dir, 'icon-512.png'));

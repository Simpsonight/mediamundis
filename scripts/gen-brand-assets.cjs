/**
 * Generates brand raster assets (favicon PNGs, apple-touch-icon, manifest icons,
 * OG share image) from the vector wordmark + brand tokens. Font-free: the OG image
 * embeds the outlined wordmark SVG (all <path>, no <text>), so rendering does not
 * depend on any installed font. Run: `node scripts/gen-brand-assets.cjs`.
 */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const pub = path.join(__dirname, '..', 'public');
const INK = '#17181b';
const ORANGE = '#f59a18';
const wordmark = fs.readFileSync(path.join(pub, 'brand', 'logo-mediamundis.svg'), 'utf8');

// Extract inner markup + viewBox of the wordmark so we can place it precisely.
const viewBox = wordmark.match(/viewBox="([^"]+)"/)[1].split(/\s+/).map(Number); // [0,0,378.36,34.99]
const inner = wordmark.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');
const [, , wmW, wmH] = viewBox;

// --- Square brand mark (icon): ink rounded square + orange "m" cut from the wordmark ---
// The wordmark's first glyph group is orange; instead of relying on fonts we draw a
// clean geometric monogram "m" as vector paths (two arches on a baseline).
function squareIcon(size, { bg = INK, fg = ORANGE, radius = size * 0.22 } = {}) {
  const s = size;
  const stroke = s * 0.11;
  const y0 = s * 0.34; // top of arches
  const y1 = s * 0.68; // baseline
  const x0 = s * 0.24;
  const x2 = s * 0.76;
  const r = (x2 - x0) / 4; // arch radius
  const xa = x0 + r;
  const xb = x0 + 3 * r;
  // three verticals + two arches
  const d = [
    `M${x0} ${y1} L${x0} ${y0 + r}`,
    `A${r} ${r} 0 0 1 ${xa + r} ${y0 + r}`,
    `L${xa + r} ${y1}`,
    `M${xa + r} ${y0 + r}`,
    `A${r} ${r} 0 0 1 ${xb + r} ${y0 + r}`,
    `L${xb + r} ${y1}`,
  ].join(' ');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 ${s} ${s}">
  <rect width="${s}" height="${s}" rx="${radius}" fill="${bg}"/>
  <path d="${d}" fill="none" stroke="${fg}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
}

// --- OG share image: white canvas, embedded wordmark, orange rule, tagline ---
function ogSvg() {
  const W = 1200, H = 630;
  const scale = 640 / wmW;         // wordmark target width ~640px
  const dh = wmH * scale;
  const wx = 100, wy = 210;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="#ffffff"/>
  <rect x="0" y="0" width="14" height="${H}" fill="${ORANGE}"/>
  <g transform="translate(${wx} ${wy}) scale(${scale})">
    <svg viewBox="${viewBox.join(' ')}" width="${wmW}" height="${wmH}">${inner}</svg>
  </g>
  <rect x="${wx}" y="${wy + dh + 46}" width="132" height="8" rx="4" fill="${ORANGE}"/>
  <text x="${wx}" y="${wy + dh + 130}" font-family="Arial, Helvetica, sans-serif" font-size="40" font-weight="700" fill="${INK}">Softwareentwicklung, Consulting &amp; KI</text>
  <text x="${wx}" y="${wy + dh + 184}" font-family="Arial, Helvetica, sans-serif" font-size="28" font-weight="400" fill="#4c4e52">aus dem Rheinland &#183; Simon Kemmerling</text>
</svg>`;
}

async function render(svg, out, w, h) {
  await sharp(Buffer.from(svg)).resize(w, h).png().toFile(path.join(pub, out));
  console.log('wrote', out, `${w}x${h}`);
}

(async () => {
  // App/icon PNGs from the geometric monogram (font-free)
  await render(squareIcon(512), 'android-chrome-512x512.png', 512, 512);
  await render(squareIcon(512), 'android-chrome-192x192.png', 192, 192);
  await render(squareIcon(512, { radius: 512 * 0.16 }), 'apple-touch-icon.png', 180, 180);
  await render(squareIcon(512), 'favicon-32x32.png', 32, 32);
  await render(squareIcon(512), 'favicon-16x16.png', 16, 16);

  // OG share image — embeds the outlined wordmark (no font dependency for the logo)
  await render(ogSvg(), 'og-image.png', 1200, 630);

  // Brand-correct SVG favicon (replaces the blue placeholder): ink square + orange monogram
  fs.writeFileSync(path.join(pub, 'favicon.svg'), squareIcon(32) + '\n');
  console.log('wrote favicon.svg');
})();

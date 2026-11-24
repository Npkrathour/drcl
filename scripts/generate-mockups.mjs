// Generates DRCL branded bottle mockups (SVG) into public/images/products.
// Run: node scripts/generate-mockups.mjs
// Replace the generated files with real product photography when available —
// paths are referenced from lib/products.ts.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUT = join(process.cwd(), "public", "images", "products");
mkdirSync(OUT, { recursive: true });

const NAVY = "#102A43";
const FONT = "Poppins, 'Segoe UI', Arial, Helvetica, sans-serif";

const products = [
  { slug: "premium-floor-cleaner", shape: "jug", main: "#32B768", dark: "#1F8A4C", light: "#7FDCA5", cap: NAVY, accent: "#32B768", l1: "FLOOR", l2: "CLEANER", tag: "Fresh Citrus", vol: "1 L" },
  { slug: "strong-toilet-cleaner", shape: "duck", main: "#1D5FA8", dark: "#123E70", light: "#5B9BE0", cap: "#FFFFFF", accent: "#1D5FA8", l1: "TOILET", l2: "CLEANER", tag: "Ocean Fresh", vol: "500 ml" },
  { slug: "bathroom-cleaner", shape: "spray", main: "#19A7A0", dark: "#0F7873", light: "#6BD6D0", cap: NAVY, accent: "#19A7A0", l1: "BATHROOM", l2: "CLEANER", tag: "Aqua Mist", vol: "500 ml" },
  { slug: "kitchen-cleaner", shape: "spray", main: "#F2B33D", dark: "#C98A16", light: "#FBD889", cap: NAVY, accent: "#E09B1B", l1: "KITCHEN", l2: "CLEANER", tag: "Lemon Zest", vol: "500 ml" },
  { slug: "glass-cleaner", shape: "spray", main: "#4BA3E3", dark: "#2B78B5", light: "#9CD0F4", cap: "#FFFFFF", accent: "#2E86CC", l1: "GLASS", l2: "CLEANER", tag: "Crystal Clear", vol: "500 ml" },
  { slug: "multi-purpose-cleaner", shape: "spray", main: "#7A6BD8", dark: "#5544B0", light: "#B5AAF0", cap: NAVY, accent: "#6A5ACD", l1: "MULTI-PURPOSE", l2: "CLEANER", tag: "Lavender Fresh", vol: "500 ml" },
  { slug: "surface-disinfectant", shape: "round", main: "#F4F7FA", dark: "#C9D4DE", light: "#FFFFFF", cap: NAVY, accent: NAVY, l1: "SURFACE", l2: "DISINFECTANT", tag: "Use as directed", vol: "1 L" },
  { slug: "refill-pouch", shape: "pouch", main: "#2B4C6F", dark: NAVY, light: "#4D7299", cap: "#32B768", accent: "#32B768", l1: "REFILL", l2: "POUCH", tag: "Floor Cleaner", vol: "1 L" },
];

const shapes = {
  jug: {
    body: "M118 236 C118 192 150 172 172 168 L174 130 L226 130 L228 168 C262 172 292 192 292 238 L292 500 C292 522 280 532 260 532 L150 532 C130 532 118 522 118 500 Z M252 194 C252 184 270 184 270 196 L270 250 C270 262 252 262 252 250 Z",
    gloss: "M136 250 C136 220 146 205 160 198 L160 500 C150 500 136 494 136 480 Z",
    cap: (c) => `<rect x="164" y="84" width="72" height="50" rx="9" fill="${c}"/>${[0, 1, 2, 3, 4, 5].map((i) => `<rect x="${172 + i * 10}" y="92" width="4" height="36" rx="2" fill="#000" opacity=".12"/>`).join("")}<rect x="160" y="126" width="80" height="10" rx="4" fill="${c}"/>`,
    label: { x: 134, y: 286, w: 112, h: 196 },
  },
  duck: {
    body: "M128 300 C128 262 150 248 180 244 L182 230 L238 230 L240 244 C262 248 280 262 280 300 L280 505 C280 524 268 532 250 532 L158 532 C140 532 128 524 128 505 Z",
    gloss: "M144 310 C144 285 152 272 164 266 L164 505 C154 505 144 498 144 488 Z",
    extra: (p) => `<path d="M210 240 L210 160 C210 118 186 100 148 94" fill="none" stroke="${p.dark}" stroke-width="38" stroke-linecap="round"/><path d="M210 240 L210 160 C210 118 186 100 148 94" fill="none" stroke="${p.main}" stroke-width="30" stroke-linecap="round"/><path d="M200 230 L200 162 C200 132 186 118 162 112" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width="6" stroke-linecap="round"/>`,
    cap: (c) => `<rect x="184" y="222" width="52" height="18" rx="5" fill="${c}" stroke="#000" stroke-opacity=".08"/><path d="M146 74 L108 86 C102 88 102 100 108 102 L146 114 Z" fill="${c}" stroke="#000" stroke-opacity=".1"/>`,
    label: { x: 146, y: 302, w: 116, h: 198 },
  },
  spray: {
    body: "M140 222 C140 184 158 170 176 166 L176 150 L224 150 L224 166 C242 170 260 184 260 222 L268 505 C268 524 256 532 240 532 L160 532 C144 532 132 524 132 505 Z",
    gloss: "M150 232 C150 208 156 196 166 190 L160 505 C152 505 146 498 146 490 Z",
    extra: () => `<path d="M200 168 L204 516" stroke="#fff" stroke-opacity=".35" stroke-width="4"/>`,
    cap: (c) => `<path d="M150 150 L150 98 C150 72 170 60 200 60 L262 60 C276 60 284 68 284 78 L284 94 L250 102 L250 150 Z" fill="${c}" stroke="#000" stroke-opacity=".1"/><rect x="282" y="68" width="22" height="22" rx="5" fill="${c}" stroke="#000" stroke-opacity=".12"/><path d="M238 102 C242 118 250 130 248 146 C246 156 234 156 234 146 C234 132 228 120 222 104 Z" fill="${c}" stroke="#000" stroke-opacity=".12"/><rect x="164" y="140" width="72" height="18" rx="5" fill="${c}" stroke="#000" stroke-opacity=".1"/><path d="M160 76 C170 68 186 66 200 66" stroke="#fff" stroke-opacity=".5" stroke-width="5" fill="none" stroke-linecap="round"/>`,
    label: { x: 146, y: 296, w: 108, h: 186 },
  },
  round: {
    body: "M124 300 C124 236 160 206 182 200 L182 176 L218 176 L218 200 C240 206 276 236 276 300 L276 505 C276 524 264 532 246 532 L154 532 C136 532 124 524 124 505 Z",
    gloss: "M140 306 C140 270 152 248 166 238 L166 505 C156 505 140 498 140 488 Z",
    cap: (c) => `<rect x="170" y="128" width="60" height="52" rx="8" fill="${c}"/><rect x="166" y="120" width="68" height="16" rx="6" fill="${c}"/><rect x="174" y="146" width="52" height="4" rx="2" fill="#fff" opacity=".25"/>`,
    label: { x: 140, y: 306, w: 120, h: 194 },
  },
  pouch: {
    body: "M120 118 L280 118 L286 160 C296 260 300 400 292 500 C290 522 278 532 258 532 L142 532 C122 532 110 522 108 500 C100 400 104 260 114 160 Z",
    gloss: "M126 170 C120 260 118 400 124 496 L138 496 C134 400 134 260 140 170 Z",
    extra: () => `<path d="M118 150 L282 150" stroke="#fff" stroke-opacity=".35" stroke-width="3" stroke-dasharray="6 5"/>`,
    cap: (c) => `<rect x="232" y="78" width="38" height="44" rx="6" fill="${c}"/><rect x="228" y="112" width="46" height="10" rx="3" fill="${c}"/>`,
    label: { x: 130, y: 220, w: 140, h: 256 },
  },
};

function label(p, L, id) {
  const cx = L.x + L.w / 2;
  const s = Math.min(L.w / 112, 1.25);
  const l1Size = p.l1.length > 9 ? 11 * s : 15 * s;
  const l2Size = p.l2.length > 9 ? 11.5 * s : 15 * s;
  return `
  <clipPath id="lbl-${id}"><rect x="${L.x}" y="${L.y}" width="${L.w}" height="${L.h}" rx="14"/></clipPath>
  <g clip-path="url(#lbl-${id})">
    <rect x="${L.x}" y="${L.y}" width="${L.w}" height="${L.h}" fill="#FFFFFF"/>
    <rect x="${L.x}" y="${L.y + L.h - 34}" width="${L.w}" height="34" fill="${p.accent}"/>
    <path d="M${L.x} ${L.y + L.h - 34} Q${cx} ${L.y + L.h - 50} ${L.x + L.w} ${L.y + L.h - 34} L${L.x + L.w} ${L.y + L.h - 30} Q${cx} ${L.y + L.h - 44} ${L.x} ${L.y + L.h - 30} Z" fill="${p.accent}" opacity=".35"/>
  </g>
  <path d="M${cx} ${L.y + 16} C${cx + 7} ${L.y + 26} ${cx + 10} ${L.y + 31} ${cx + 10} ${L.y + 35} A10 10 0 0 1 ${cx - 10} ${L.y + 35} C${cx - 10} ${L.y + 31} ${cx - 7} ${L.y + 26} ${cx} ${L.y + 16} Z" fill="#32B768"/>
  <path d="M${cx - 4} ${L.y + 34} A5 5 0 0 0 ${cx + 1} ${L.y + 39}" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round"/>
  <text x="${cx}" y="${L.y + 68 * s}" text-anchor="middle" font-family="${FONT}" font-weight="800" font-size="${30 * s}" letter-spacing="${2 * s}" fill="${NAVY}">DRCL</text>
  <text x="${cx}" y="${L.y + 80 * s}" text-anchor="middle" font-family="${FONT}" font-weight="600" font-size="${6 * s}" letter-spacing="${2 * s}" fill="#5B6B7A">A CLEANER SPACE</text>
  <rect x="${cx - 16}" y="${L.y + 86 * s}" width="32" height="2" rx="1" fill="${p.accent}"/>
  <text x="${cx}" y="${L.y + 106 * s}" text-anchor="middle" font-family="${FONT}" font-weight="800" font-size="${l1Size}" fill="${NAVY}">${p.l1}</text>
  <text x="${cx}" y="${L.y + 106 * s + l2Size + 2}" text-anchor="middle" font-family="${FONT}" font-weight="800" font-size="${l2Size}" fill="${p.accent}">${p.l2}</text>
  <text x="${cx}" y="${L.y + 106 * s + l2Size + 2 + 15 * s}" text-anchor="middle" font-family="${FONT}" font-weight="500" font-size="${8 * s}" fill="#5B6B7A">${p.tag}</text>
  <text x="${cx}" y="${L.y + L.h - 12}" text-anchor="middle" font-family="${FONT}" font-weight="700" font-size="${11 * s}" fill="#FFFFFF">${p.vol}</text>`;
}

function bottle(p, id) {
  const sh = shapes[p.shape];
  return `
  <defs>
    <linearGradient id="body-${id}" x1="0" x2="1" y1="0" y2="0">
      <stop offset="0" stop-color="${p.dark}"/>
      <stop offset=".3" stop-color="${p.main}"/>
      <stop offset=".55" stop-color="${p.light}"/>
      <stop offset=".8" stop-color="${p.main}"/>
      <stop offset="1" stop-color="${p.dark}"/>
    </linearGradient>
  </defs>
  <ellipse cx="200" cy="536" rx="${p.shape === "pouch" ? 100 : 92}" ry="12" fill="#0B1F33" opacity=".14"/>
  ${sh.extra && p.shape === "duck" ? sh.extra(p) : ""}
  <path d="${sh.body}" fill="url(#body-${id})" fill-rule="evenodd"/>
  ${sh.extra && p.shape !== "duck" ? sh.extra(p) : ""}
  <path d="${sh.gloss}" fill="#fff" opacity=".28"/>
  ${sh.cap(p.cap)}
  ${label(p, sh.label, id)}`;
}

const wrap = (inner, vb = "0 0 400 560") =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" width="800" height="${Math.round((800 * Number(vb.split(" ")[3])) / Number(vb.split(" ")[2]))}">${inner}</svg>\n`;

for (const p of products) {
  // 1. Front view
  writeFileSync(join(OUT, `${p.slug}.svg`), wrap(bottle(p, "a")));

  // 2. Label close-up (cropped view of the same bottle)
  const L = shapes[p.shape].label;
  const pad = 30;
  writeFileSync(
    join(OUT, `${p.slug}-label.svg`),
    wrap(bottle(p, "b"), `${L.x - pad} ${L.y - pad} ${L.w + pad * 2} ${(L.w + pad * 2) * 1.4}`),
  );

  // 3. Size line-up (500ml / 1L / 5L)
  const scales = [0.62, 0.8, 1];
  const sizes = ["500 ml", "1 L", "5 L"];
  const lineup = scales
    .map((sc, i) => {
      const x = [190, 500, 810][i] - 200 * sc;
      const y = (1 - sc) * 560;
      return `<g transform="translate(${x} ${y}) scale(${sc})">${bottle({ ...p, vol: sizes[i] }, `c${i}`)}</g>`;
    })
    .join("");
  writeFileSync(join(OUT, `${p.slug}-sizes.svg`), wrap(lineup, "0 0 1000 580"));
}

console.log(`Generated ${products.length * 3} mockups in ${OUT}`);

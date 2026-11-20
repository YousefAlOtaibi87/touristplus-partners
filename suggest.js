// Type-ahead pickers so agencies type a few letters and pick, instead of typing whole names.
//   airlineField(input): suggests airlines (Arabic, English or IATA code); the value must be picked from the list.
//   hotelField(input, getCity): suggests hotels (platform directory first, then worldwide search); picking fills the name.
import { AIRLINES } from './airlines.js?v=1';

let cfg = { sb: null, esc: (s) => String(s), lang: () => 'ar' };
export function setupSuggest(o) { cfg = { ...cfg, ...o }; }

const norm = (s) => String(s || '').toLowerCase().replace(/[ً-ْ]/g, '').replace(/[أإآ]/g, 'ا').replace(/ة/g, 'ه').replace(/ى/g, 'ي').trim();
const airLabel = (a) => (cfg.lang() === 'ar' ? a[2] : a[1]);

function dropdown(input) {
  const wrap = input.parentElement;
  if (getComputedStyle(wrap).position === 'static') wrap.style.position = 'relative';
  const box = document.createElement('div');
  box.className = 'sug-box'; box.hidden = true;
  wrap.appendChild(box);
  input.setAttribute('autocomplete', 'off');
  input.addEventListener('blur', () => setTimeout(() => { box.hidden = true; }, 150));
  input.addEventListener('keydown', (e) => {
    const items = [...box.querySelectorAll('button')];
    if (box.hidden || !items.length) return;
    const i = items.indexOf(document.activeElement);
    if (e.key === 'ArrowDown') { e.preventDefault(); (items[i + 1] || items[0]).focus(); }
    if (e.key === 'Escape') box.hidden = true;
  });
  box.addEventListener('keydown', (e) => {
    const items = [...box.querySelectorAll('button')], i = items.indexOf(document.activeElement);
    if (e.key === 'ArrowDown') { e.preventDefault(); items[i + 1]?.focus(); }
    if (e.key === 'ArrowUp') { e.preventDefault(); (items[i - 1] || input).focus(); }
  });
  return box;
}

const show = (box, rows, onPick) => {
  const esc = cfg.esc;
  if (!rows.length) { box.hidden = true; return; }
  box.innerHTML = rows.map((r, k) => `<button type="button" data-k="${k}"><b>${esc(r.title)}</b>${r.sub ? `<span>${esc(r.sub)}</span>` : ''}</button>`).join('');
  box.hidden = false;
  box.querySelectorAll('button').forEach((b) => { b.onmousedown = (e) => { e.preventDefault(); onPick(rows[+b.dataset.k]); box.hidden = true; }; b.onkeydown = (e) => { if (e.key === 'Enter') { e.preventDefault(); onPick(rows[+b.dataset.k]); box.hidden = true; } }; });
};

export function airlineField(input) {
  if (!input || input.dataset.sug) return;
  input.dataset.sug = 'air';
  input.removeAttribute('list');
  const box = dropdown(input);
  const find = (q) => {
    const n = norm(q);
    return AIRLINES.filter((a) => a[0].toLowerCase() === n || norm(a[1]).includes(n) || norm(a[2]).includes(n)).slice(0, 8);
  };
  const isKnown = (v) => AIRLINES.some((a) => v === a[1] || v === a[2]);
  input.addEventListener('input', () => {
    const q = input.value.trim();
    input.classList.remove('invalid');
    if (!q) { box.hidden = true; return; }
    show(box, find(q).map((a) => ({ title: airLabel(a), sub: `${a[0]} · ${cfg.lang() === 'ar' ? a[1] : a[2]}`, a })), (r) => { input.value = airLabel(r.a); input.dispatchEvent(new Event('change', { bubbles: true })); });
  });
  // The airline must come from the list: an unknown name is cleared when leaving the field.
  input.addEventListener('blur', () => setTimeout(() => {
    const v = input.value.trim();
    if (!v || isKnown(v)) return;
    const m = find(v);
    if (m.length === 1) input.value = airLabel(m[0]);
    else { input.value = ''; input.classList.add('invalid'); }
  }, 200));
}

async function worldHotels(q, city) {
  try {
    const { data } = await cfg.sb.functions.invoke('hotel-search', { body: { q, city: city || '', lang: cfg.lang() } });
    if (data?.hits?.length) return data.hits;
  } catch (_) { /* fall through */ }
  // The free map service sometimes blocks our server; ask it from the browser instead.
  try {
    const r = await fetch(`https://photon.komoot.io/api/?q=${encodeURIComponent(`${q} ${city || ''}`.trim())}&limit=8&osm_tag=tourism:hotel`);
    const j = await r.json();
    return (j.features || []).map((f) => ({ name: f.properties.name, city: f.properties.city || '', country: f.properties.country || '' })).filter((h) => h.name);
  } catch (_) { return []; }
}

export function hotelField(input, getCity, onPick) {
  if (!input || input.dataset.sug) return;
  input.dataset.sug = 'hotel';
  const box = dropdown(input);
  let timer, seq = 0;
  input.addEventListener('input', () => {
    const q = input.value.trim(); clearTimeout(timer);
    if (q.length < 2) { box.hidden = true; return; }
    const my = ++seq;
    timer = setTimeout(async () => {
      const city = getCity ? getCity() : '';
      const { data: own } = await cfg.sb.rpc('catalog_search', { p_q: q, p_city: city }).catch(() => ({ data: null }));
      let rows = (own || []).map((h) => ({ title: h.name, sub: [h.stars ? '★'.repeat(h.stars) : '', h.area, h.city].filter(Boolean).join(' · '), h }));
      if (rows.length < 3) {
        const w = await worldHotels(q, city);
        const seen = new Set(rows.map((r) => norm(r.title)));
        rows = rows.concat(w.filter((h) => !seen.has(norm(h.name))).map((h) => ({ title: h.name, sub: [h.city, h.country].filter(Boolean).join(' · '), h })));
      }
      if (my !== seq) return;
      show(box, rows.slice(0, 8), (r) => { input.value = r.title; onPick?.(r.h); input.dispatchEvent(new Event('change', { bubbles: true })); });
    }, 300);
  });
}

const $ = s => document.querySelector(s);
const svg = $('#svg'), cap = $('#cap'), ui = $('#ui');

const P = (x, y, s, h, cls="") => `<g class="${cls}" transform="translate(${x} ${y}) scale(${s})">${h}</g>`;

// Initialize SVG stage structure
function initStage() {
  svg.innerHTML = `<defs>
  <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffd9a0"/><stop offset="1" stop-color="#ffb870"/></linearGradient>
  <radialGradient id="ag"><stop offset="0" stop-color="#fff6b0"/><stop offset=".5" stop-color="#ffd24a" stop-opacity=".7"/><stop offset="1" stop-color="#ffd24a" stop-opacity="0"/></radialGradient>
  <radialGradient id="vig" cx=".5" cy=".45" r=".75"><stop offset=".55" stop-color="#3a0d00" stop-opacity="0"/><stop offset="1" stop-color="#3a0d00" stop-opacity=".55"/></radialGradient>
  </defs>
  <g id="cam"><g id="bump">${bg()}
  <g id="S1">${crowd(0)}<g id="d1"></g></g>
  <g id="S2">${rays()}${dais(180,452,250)}<g id="d2">${P(180,452,1.45,baba())}</g></g>
  <g id="S3"><circle cx="255" cy="330" r="95" fill="url(#ag)" stroke="none"/>${dais(255,430,150)}<g id="d3_baba">${P(255,430,.75,baba('med'))}</g><g id="d3_disc">${P(115,520,1.5,disc())}</g></g>
  <g id="S4">${rays('#ffe08a')}${crowd(1)}<g id="d4"></g></g>
  <g id="S5">${rays()}<circle id="aura" cx="180" cy="290" r="210" fill="url(#ag)" stroke="none"/>${dais(180,452,250)}<ellipse cx="180" cy="448" rx="60" ry="8" fill="#000" opacity=".15" stroke="none"/>${pts}<g id="d5">${P(180,410,1.45,baba('float med'))}</g></g>
  <g id="StudioStage" style="display:none;">${dais(180,480,240)}<g id="studioCharNode"></g></g>
  <g id="S6"></g></g></g>
  <rect width="360" height="780" fill="url(#vig)" stroke="none" pointer-events="none"/><rect id="flash" width="360" height="780" fill="#fff" stroke="none" pointer-events="none"/>`;

  $('#lot').innerHTML = [-60,-30,30,60,0].map(a => `<ellipse cx="0" cy="-22" rx="9" ry="22" fill="#ff9ec4" transform="rotate(${a})"/>`).join('');
}

// App State & Data Store
const NM = ['Office', 'Seeker', 'Punk', 'Founder', 'Elder'];
const KEYS = 'qwert';
const KEY = 'fakeGuruDB1';
const DEF = {
  tags: true,
  emo: ['anx','anx','anx','anx','anx'],
  lb: ['OFFICE WORKER','SEEKER','PUNK','FOUNDER','ELDER'],
  q: ["Guruji, my boss books meetings that could’ve been emails. How do I find peace?", "Guruji, he left me on read for three days. How do I heal?", "Guruji, everyone says I should cut my mohawk and get a real job. Should I?", "Guruji, my startup burns cash faster than it makes it. What should I do?", "Guruji, my grandchildren never call me. Why does the silence hurt?"],
  r: ["Meeting is a goat, email is a boat. Row away, my son, and stay afloat!", "Seen is just a tick, my dear. Go eat mangoes, shed no tear!", "Cut your hair or keep your hair, the cow does not know, the cow does not care.", "Burn the cash, then burn the rice. Pivot twice, then pivot thrice!", "Phone is round and heart is slow. Plant a tree and let it grow."],
  d: ["Baba teaches: peace begins when you decline the invite and accept your own calendar.", "Baba says: what ignores you has already freed you. Silence is the loudest mantra.", "Baba says: true rebellion is knowing which battles deserve your leather jacket.", "Baba says: sustainable growth comes from within. Seek revenue, not applause.", "Baba says: love without expectation. Call first, and the silence will answer."],
  bl: 'BABA', dl: 'CHIEF DISCIPLE', s4: ['DEVOTEES', 'So deep… I understood nothing, yet everything.'], s5: ['MIRACLE', 'Baba does not hover. Baba simply declines gravity.'],
  end: ['Follow for More Divine Revelations', 'Baba knows best. Baba accepts no liability.'],
  cps: [0, 24, 24, 24, 24, 24], dly: [0, 0, 0, 0, 0, 0]
};

let DB = structuredClone(DEF);
try { Object.assign(DB, JSON.parse(localStorage.getItem(KEY) || '{}')); } catch(e) {}
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(DB)); } catch(e) {} };
const val = p => p.split('.').reduce((o, x) => o[x], DB);
const setv = (p, v) => { const a = p.split('.'), l = a.pop(); a.reduce((o, x) => o[x], DB)[l] = v; };

let cur = 1, k = 0, raf, activeAppMode = 'engine';

const SC = n => ({
  1: ['#S1 .dv', DB.lb[k], DB.q[k]],
  2: ['#S2 .baba', DB.bl, DB.r[k]],
  3: ['#S3 .dc', DB.dl, DB.d[k]],
  4: ['', DB.s4[0], DB.s4[1]],
  5: ['', DB.s5[0], DB.s5[1]]
})[n];

const applyEnd = () => { $('#end h2').textContent = DB.end[0]; $('#end p').textContent = DB.end[1]; };

// ---- Viral-retention FX helpers ----
const rs = (el, c) => { if (!el) return; el.classList.remove(c); el.getBoundingClientRect(); el.classList.add(c); };
function fx(k) {
  const b = $('#bump'); b.classList.remove('b1', 'punch'); b.getBoundingClientRect(); b.classList.add(k == 'punch' ? 'punch' : 'b1');
  if (k == 'punch') rs($('#flash'), 'on');
}
const FOC = { 1: [180, 300], 2: [180, 235], 3: [115, 250], 4: [180, 330], 5: [180, 300] };      // camera focus per scene
const EXP = { 1: ['#S1 .dv', 'anx'], 2: ['#S2 .baba', 'calm'], 3: ['#S3 .dc', 'deadpan'], 4: ['#S4 .ch', 'shock'] }; // expression per scene
const VIS = { a:'A', e:'E', i:'E', y:'E', o:'O', u:'O', w:'O', q:'O', f:'E', v:'E', s:'E', z:'E', t:'E', d:'E', n:'E', l:'E', r:'E', k:'E', g:'E', c:'E', h:'E', j:'E', x:'E' }; // b/m/p/space = closed

function say(n, sel, label, text) {
  const ch = sel ? $(sel) : null, t0 = performance.now() + DB.dly[n] * 1000;
  const words = text.split(' '), starts = []; let acc = 0;
  words.forEach(w => { starts.push(acc); acc += w.length + 1; });
  let ws = [], last = -1, cw = -2, init = false;
  cap.textContent = ''; cap.dataset.sp = n;
  const tick = now => {
    if (now < t0) { raf = requestAnimationFrame(tick); return; }
    if (!init) {
      init = true;
      if (DB.tags) { const b = document.createElement('b'); b.textContent = label; cap.append(b); }
      const p = document.createElement('p');
      ws = words.map(w => { const s = document.createElement('span'); s.className = 'w'; s.textContent = w; p.append(s, ' '); return s; });
      cap.append(p);
      if (ch) ch.classList.add('talk');
    }
    const i = Math.min(text.length, Math.floor((now - t0) / 1000 * DB.cps[n]));
    if (i != last) {
      last = i;
      let w = -1; starts.forEach((st, j) => { if (st < i) w = j; });
      if (w != cw) { cw = w; ws.forEach((s, j) => { s.className = 'w' + (j < w ? ' on' : j == w ? ' on cur' : ''); }); }
      if (ch) { const v = (text[i - 1] || '').toLowerCase();
  ch.dataset.m = ch.classList.contains('baba') ? ({ a:'A', o:'O', u:'O', e:'E', i:'E' }[v] || 'c') : (VIS[v] || 'c'); }
    }
    if (i < text.length) raf = requestAnimationFrame(tick);
    else {
      ws.forEach(s => { s.className = 'w on'; });
      if (ch) { ch.classList.remove('talk'); ch.dataset.m = 'c'; }
      if (n == 2) fx('bump');   // rhyme punchline hit
    }
  };
  raf = requestAnimationFrame(tick);
}

function go(n) {
  if (activeAppMode === 'studio') switchAppMode('engine');
  n = +n; cur = n; cancelAnimationFrame(raf);
  for (let i = 1; i <= 6; i++) $('#S' + i).style.display = (i == n ? 'inline' : 'none');
  $('#StudioStage').style.display = 'none';
  $('#end').style.display = (n == 6 ? 'flex' : 'none');
  const a = $('#aura'); a.classList.remove('on');
  if (n == 5) setTimeout(() => { a.classList.add('on'); fx('punch'); }, 100);
  document.querySelectorAll('.ch').forEach(c => { c.classList.remove('talk', 'anx', 'manic', 'deadpan', 'shock', 'calm', 'angry', 'sad'); delete c.dataset.m; });
 const ex = n == 1 ? ['#S1 .dv', DB.emo[k]] : EXP[n]; if (ex) document.querySelectorAll(ex[0]).forEach(c => c.classList.add(ex[1]));
  const cam = $('#cam'), f = FOC[n] || [180, 300];
  cam.dataset.s = n; cam.style.setProperty('--fx', f[0] + 'px'); cam.style.setProperty('--fy', f[1] + 'px'); rs(cam, 'run');
  if (n == 4) fx('punch');
  const L = SC(n);
  if (L) say(n, ...L); else cap.textContent = '';
  mark();
}

function switchAppMode(mode) {
  activeAppMode = mode;
  document.body.classList.toggle('studio-mode', mode === 'studio');
  const btnEng = $('#modeEngineBtn'), btnStd = $('#modeStudioBtn');
  if (btnEng) btnEng.classList.toggle('active-mode', mode === 'engine');
  if (btnStd) btnStd.classList.toggle('active-mode', mode === 'studio');

  if (mode === 'studio') {
    cancelAnimationFrame(raf);
    for (let i = 1; i <= 6; i++) $('#S' + i).style.display = 'none';
    $('#end').style.display = 'none';
    $('#cap').textContent = '';
    $('#StudioStage').style.display = 'inline';
    $('#cam').classList.remove('run');
    renderStudioCharacter();
  } else {
    go(cur);
  }
}

function pick(i) {
  k = i;
  $('#d1').innerHTML = P(180, 500, 1.25, dev(k, 'a'));
  $('#d4').innerHTML = P(180, 500, 1.25, dev(k, 'n', 'bow wide'));
  buildUI();
  go(cur);
}

document.addEventListener('DOMContentLoaded', () => {
  initStage();
  applyEnd();
  pick(0);
  setInterval(() => { if (activeAppMode === 'engine' && cur != 6 && !document.hidden) fx('bump'); }, 1600); // pattern interrupt
});


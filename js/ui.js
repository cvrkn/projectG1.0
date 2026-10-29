function mark() {
  ui.querySelectorAll('button[data-s], button[data-d]').forEach(b => {
    if (b.dataset.s) b.classList.toggle('on', b.dataset.s == cur);
    if (b.dataset.d) b.classList.toggle('on', b.dataset.d == k);
  });
}

const sync = n => {
  const c = DB.cps[n];
  const durEl = ui.querySelector(`[data-dur="${n}"]`);
  if (durEl) durEl.value = (SC(n)[2].length / c).toFixed(1);
  const oEl = ui.querySelector(`[data-o="${n}"]`);
  if (oEl) oEl.textContent = c + ' ch/s';
};

function buildUI() {
  const S = [
    [1, 'Scene 1: Question', 'lb.' + k, 'q.' + k],
    [2, 'Scene 2: Baba’s Rhyme', 'bl', 'r.' + k],
    [3, 'Scene 3: Disciple Wisdom', 'dl', 'd.' + k],
    [4, 'Scene 4: Crowd Reaction', 's4.0', 's4.1'],
    [5, 'Scene 5: Levitation Miracle', 's5.0', 's5.1']
  ];

  ui.innerHTML = `
  <div class="panel-sec">
    <h4><span>MODE SWITCHER</span> <span class="mode-badge">${activeAppMode}</span></h4>
    <div class="r">
      <button id="modeEngineBtn" class="active-mode" data-mode="engine">🎬 Shorts Engine</button>
      <button id="modeStudioBtn" data-mode="studio">🎨 Character Studio</button>
    </div>
  </div>

  <!-- STUDIO MODE CONTROLS -->
  <div class="studio-only panel-sec">
    <h4>CHARACTER SELECTOR</h4>
    <label>Active Character
      <select id="stCharSelect">
        <option value="baba">Baba (Guru Master)</option>
        <option value="disciple">Chief Disciple</option>
        <option value="devotee">Devotee Character</option>
        <option value="crowd">Crowd Member</option>
      </select>
    </label>
    <div id="stDevoteeRow" style="display:none;">
      <label>Devotee Preset
        <select id="stDevoteeSelect">
          ${T.map((t, i) => `<option value="${i}">${t.name}</option>`).join('')}
        </select>
      </label>
    </div>
  </div>

  <div class="studio-only panel-sec">
    <h4>EXPRESSION & RIGGING CONTROLS</h4>
    <label>Mouth Morphing (data-m)
      <div class="r">
        <button class="stMouthBtn" data-m="c">Closed (c)</button>
        <button class="stMouthBtn" data-m="s">Smile (s)</button>
        <button class="stMouthBtn" data-m="A">Ah (A)</button>
        <button class="stMouthBtn" data-m="O">Oh (O)</button>
        <button class="stMouthBtn" data-m="E">Eh (E)</button>
      </div>
    </label>

    <label>Eye State
      <div class="r">
        <button id="stEyeOpen" class="on">Open Eyes</button>
        <button id="stEyeClosed">Closed / Meditate</button>
      </div>
    </label>

    <label>Head Turn / Tilt Angle (${studioState.headRot}°)
      <input type="range" id="stHeadRot" min="-25" max="25" value="${studioState.headRot}">
    </label>

    <label>Action Speed Multiplier (${studioState.speedFactor}x)
      <input type="range" id="stActionSpeed" min="0.25" max="2" step="0.05" value="${studioState.speedFactor}">
    </label>

    <label>Pose & Gesture Animation Toggles
      <div class="r">
        <button id="stTglTalk">Talk Arms (.talk)</button>
        <button id="stTglBow">Bow Body (.bow)</button>
        <button id="stTglFloat">Levitate (.float)</button>
        <button id="stTglWide">Shock Eyes (.wide)</button>
      </div>
    </label>

    <button id="stTestLipSync" style="background:#f59a1b; color:#3b1c1c; font-weight:700; margin-top:4px;">▶ Test Auto Lip-Sync Phrase</button>
  </div>

  <!-- ENGINE MODE CONTROLS -->
  <div class="engine-only panel-sec">
    <h4>SCENE NAVIGATOR</h4>
    <div class="r">
      ${[1, 2, 3, 4, 5, 6].map(i => `<button data-s="${i}">${i}</button>`).join('')}
      <button data-a="replay">Replay</button>
      <button data-a="rec" id="recBtn" style="background:#e56b6f; color:#fff;">⏺ Rec Video</button>
    </div>
  </div>

  <div class="engine-only panel-sec">
    <h4>QUESTIONING DEVOTEE</h4>
    <div class="r">
      ${NM.map((n, i) => `<button data-d="${i}">${KEYS[i].toUpperCase()}: ${n}</button>`).join('')}
    </div>
  </div>

  <div class="engine-only">
    <label class="ck"><input type="checkbox" data-p="tags"> Show speaker tags</label>
  </div>

  ${S.map(([n, t, a, b]) => `
  <div class="engine-only panel-sec">
    <h4>${t}</h4>
    <label>Speaker label<input data-p="${a}"></label>
    <label>Dialogue text<textarea rows="2" data-p="${b}"></textarea></label>
	    ${n == 1 ? `<label>Devotee emotion<select data-p="emo.${k}"><option value="anx">Anxious</option><option value="calm">Calm</option><option value="angry">Angry</option><option value="sad">Sad</option></select></label>` : ''}
    <div class="sp">
      <label>Speed <span data-o="${n}"></span><input type="range" min="4" max="60" step="0.5" data-p="cps.${n}"></label>
      <label>Length (s)<input type="number" min="0.5" step="0.1" data-dur="${n}"></label>
      <label>Delay (s)<input type="number" min="0" step="0.1" data-p="dly.${n}"></label>
    </div>
  </div>`).join('')}

  <div class="engine-only panel-sec">
    <h4>Scene 6: End Card</h4>
    <label>Heading<input data-p="end.0"></label>
    <label>Subtext<input data-p="end.1"></label>
  </div>

  <div class="r" style="margin-top: 6px;">
    <button data-a="hide">Hide UI (H)</button>
    <button data-a="reset">Reset All</button>
  </div>
  <small>Edits save locally. Press H to toggle interface overlay.</small>
  `;

  ui.querySelectorAll('[data-p]').forEach(e => {
    const v = val(e.dataset.p);
    if (e.type === 'checkbox') e.checked = !!v;
    else e.value = v;
  });

  for (let n = 1; n < 6; n++) sync(n);
  mark();
  bindStudioEvents();
}

function bindStudioEvents() {
  const stCharSelect = $('#stCharSelect');
  if (stCharSelect) {
    stCharSelect.value = studioState.char;
    stCharSelect.onchange = e => {
      studioState.char = e.target.value;
      $('#stDevoteeRow').style.display = studioState.char === 'devotee' ? 'block' : 'none';
      renderStudioCharacter();
    };
  }

  const stDevSelect = $('#stDevoteeSelect');
  if (stDevSelect) {
    stDevSelect.value = studioState.devIdx;
    stDevSelect.onchange = e => {
      studioState.devIdx = +e.target.value;
      renderStudioCharacter();
    };
  }

  ui.querySelectorAll('.stMouthBtn').forEach(b => {
    b.onclick = () => {
      studioState.mouth = b.dataset.m;
      renderStudioCharacter();
    };
  });

  const stEyeOpen = $('#stEyeOpen'), stEyeClosed = $('#stEyeClosed');
  if (stEyeOpen && stEyeClosed) {
    stEyeOpen.onclick = () => { studioState.eyes = 'open'; stEyeOpen.classList.add('on'); stEyeClosed.classList.remove('on'); renderStudioCharacter(); };
    stEyeClosed.onclick = () => { studioState.eyes = 'closed'; stEyeClosed.classList.add('on'); stEyeOpen.classList.remove('on'); renderStudioCharacter(); };
  }

  const headRotInput = $('#stHeadRot');
  if (headRotInput) {
    headRotInput.oninput = e => {
      studioState.headRot = +e.target.value;
      renderStudioCharacter();
    };
  }

  const speedInput = $('#stActionSpeed');
  if (speedInput) {
    speedInput.oninput = e => {
      studioState.speedFactor = parseFloat(e.target.value);
      setActionSpeedMultiplier(studioState.speedFactor);
    };
  }

  const tglTalk = $('#stTglTalk'), tglBow = $('#stTglBow'), tglFloat = $('#stTglFloat'), tglWide = $('#stTglWide');
  if (tglTalk) tglTalk.onclick = () => { studioState.talk = !studioState.talk; tglTalk.classList.toggle('on', studioState.talk); renderStudioCharacter(); };
  if (tglBow) tglBow.onclick = () => { studioState.bow = !studioState.bow; tglBow.classList.toggle('on', studioState.bow); renderStudioCharacter(); };
  if (tglFloat) tglFloat.onclick = () => { studioState.float = !studioState.float; tglFloat.classList.toggle('on', studioState.float); renderStudioCharacter(); };
  if (tglWide) tglWide.onclick = () => { studioState.wide = !studioState.wide; tglWide.classList.toggle('on', studioState.wide); renderStudioCharacter(); };

  const testBtn = $('#stTestLipSync');
  if (testBtn) testBtn.onclick = testStudioLipSync;
}

ui.oninput = e => {
  const t = e.target, p = t.dataset.p;
  if (t.dataset.dur) {
    const n = +t.dataset.dur, len = SC(n)[2].length, d = +t.value;
    if (d > 0 && len) {
      DB.cps[n] = Math.min(80, Math.max(2, +(len / d).toFixed(1)));
      ui.querySelector(`[data-p="cps.${n}"]`).value = DB.cps[n];
      ui.querySelector(`[data-o="${n}"]`).textContent = DB.cps[n] + ' ch/s';
    }
  } else if (p) {
    setv(p, t.type == 'checkbox' ? t.checked : (t.type == 'range' || t.type == 'number') ? +t.value : t.value);
    for (let n = 1; n < 6; n++) sync(n);
    if (p[0] == 'e') applyEnd();
    if (p.startsWith('emo.')) go(1);   // replay scene 1 to preview the new emotion
  }
  save();
};

ui.onclick = e => {
  const b = e.target.closest('button');
  if (!b) return;

  if (b.dataset.mode) {
    switchAppMode(b.dataset.mode);
    return;
  }

  const d = b.dataset;
  if (d.s) go(d.s);
  if (d.d) pick(+d.d);
  if (d.a == 'replay') go(cur);
  if (d.a == 'hide') document.body.classList.add('noed');
  if (d.a == 'reset') {
    DB = structuredClone(DEF);
    save();
    applyEnd();
    buildUI();
    go(cur);
  }
  b.blur();
};

addEventListener('keydown', e => {
  if (/^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)) return;
  const c = e.key.toLowerCase();
  if (c.length == 1 && c >= '1' && c <= '6') go(c);
  else if (c.length == 1 && KEYS.includes(c)) pick(KEYS.indexOf(c));
  else if (c == 'h') document.body.classList.toggle('noed');
  else if (c == ' ' || c == 'arrowright') {
    if (activeAppMode === 'engine') go(cur % 6 + 1);
  } else if (c == 'arrowleft') {
    if (activeAppMode === 'engine') go((cur + 4) % 6 + 1);
  }
  if (c == ' ') e.preventDefault();
});


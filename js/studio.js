let studioState = {
  char: 'baba',
  devIdx: 0,
  mouth: 'c',
  eyes: 'open',
  talk: false,
  bow: false,
  float: false,
  wide: false,
  headRot: 0,
  speedFactor: 1
};

function renderStudioCharacter() {
  const node = $('#studioCharNode');
  if (!node) return;
  let markup = '';
  let classes = [];

  if (studioState.talk) classes.push('talk');
  if (studioState.bow) classes.push('bow');
  if (studioState.float) classes.push('float');
  if (studioState.wide) classes.push('wide');
  if (studioState.eyes === 'closed') classes.push('med');

  const classStr = classes.join(' ');

  if (studioState.char === 'baba') {
    markup = P(180, 480, 1.45, baba(classStr, studioState.headRot));
  } else if (studioState.char === 'disciple') {
    markup = P(180, 480, 1.45, disc(studioState.headRot));
  } else if (studioState.char === 'devotee') {
    markup = P(180, 480, 1.4, dev(studioState.devIdx, studioState.talk ? 'a' : 'n', classStr, studioState.headRot));
  } else if (studioState.char === 'crowd') {
    markup = P(180, 480, 1.2, `<g class="ch cw ${classStr}"><ellipse cy="-4" rx="30" ry="9" fill="#c2412d"/><path d="M-22 -8Q-24 -50 0 -54Q24 -50 22 -8Z" fill="#e56b6f"/><circle cy="-70" r="17" fill="#e9b48c"/>${E(-72,7,3.8)}${M(-55,.8,'#5a2a27')}<path d="M-17 -72Q-18 -90 0 -88Q18 -90 17 -72Q8 -80 -17 -72Z" fill="#222"/></g>`);
  }

  node.innerHTML = markup;
  const target = node.querySelector('.ch');
  if (target) {
    target.dataset.m = studioState.mouth;
  }
}

let studioLipTimer = null;
function testStudioLipSync() {
  if (studioLipTimer) clearInterval(studioLipTimer);
  const sampleText = "BABA KNOWS ALL SECRETS OF THE UNIVERSE";
  let idx = 0;
  studioState.talk = true;
  renderStudioCharacter();

  studioLipTimer = setInterval(() => {
    if (idx >= sampleText.length) {
      clearInterval(studioLipTimer);
      studioState.talk = false;
      studioState.mouth = 'c';
      renderStudioCharacter();
      return;
    }
    const char = sampleText[idx].toLowerCase();
    studioState.mouth = { a: 'A', e: 'E', i: 'E', o: 'O', u: 'O' }[char] || 'c';
    renderStudioCharacter();
    idx++;
  }, 120);
}


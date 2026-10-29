const dais = (x,y,w) => `<rect x="${x-w/2}" y="${y}" width="${w}" height="34" rx="6" fill="#b8793e"/><path d="M${x-w/2} ${y+12}h${w}" fill="none" stroke-width="2.5"/><ellipse cx="${x}" cy="${y}" rx="${w*.4}" ry="10" fill="#c2412d"/>`;
const diya = (x,y) => `<g transform="translate(${x} ${y})"><circle class="gl" cy="-14" r="30" fill="url(#ag)" stroke="none"/><path d="M-14 0h28q-2 13-14 13t-14-13z" fill="#d9a21b"/><path class="fl" d="M0 -3Q-9 -13 0 -26Q9 -13 0 -3z" fill="#ff7a1a" stroke-width="2.5"/></g>`;

const bg = () => {
  let g = '<rect width="360" height="780" fill="url(#sky)" stroke="none"/><g fill="#8fbf7a" stroke-width="3"><circle cx="55" cy="300" r="60"/><circle cx="180" cy="290" r="55"/><circle cx="305" cy="300" r="60"/></g><path fill-rule="evenodd" fill="#e8cfa6" stroke-width="3" d="M-5 140H365V412H-5Z M20 412V250Q55 190 90 250V412Z M135 412V230Q180 160 225 230V412Z M270 412V250Q305 190 340 250V412Z"/><rect x="-5" y="412" width="370" height="380" fill="#e0aa6c" stroke-width="3"/>';
  for(let i=0;i<19;i++) g += `<circle cx="${i*20}" cy="${144+6*Math.sin(i*.9)}" r="6" fill="${i%2?'#ffc83d':'#ff8a1f'}" stroke-width="2"/>`;
  return `<g id="bg">${g}${shafts}${diya(32,424)}${diya(328,424)}${[32,328].map(x=>[0,2.5].map(d=>`<circle class="sm" cx="${x}" cy="400" r="8" fill="#fff" stroke="none" style="animation-delay:${-d}s"/>`).join('')).join('')}${motes}</g>`;
};

const pts = [...Array(18)].map(() => `<circle class="pt" cx="${60+Math.random()*240}" cy="${250+Math.random()*220}" r="${2+Math.random()*2.5}" fill="#fff3a0" stroke="none" style="animation-delay:${-Math.random()*4}s;animation-duration:${3+Math.random()*3}s"/>`).join('');


// Light shafts, drifting dust motes and a rotating sunburst (rays) for punchline scenes
const shafts = `<g class="sh" fill="#fff3b0" stroke="none"><path d="M60 140L130 140L40 560L-30 560Z"/><path d="M200 140L250 140L190 560L120 560Z" opacity=".7"/></g>`;
const motes = [...Array(16)].map(() => `<circle class="mt" cx="${Math.random()*360|0}" cy="${120+Math.random()*440|0}" r="${(1.5+Math.random()*1.7).toFixed(1)}" fill="#fff7c2" stroke="none" style="animation-delay:${-Math.random()*6}s;animation-duration:${4+Math.random()*4}s"/>`).join('');
const rays = (c = '#fff3a0') => `<g class="rays" fill="${c}" stroke="none" opacity=".28">${[...Array(12)].map((_, i) => { const a = i * Math.PI / 6, b = (i + .5) * Math.PI / 6; return `<path d="M180 300L${(180+420*Math.cos(a)).toFixed(0)} ${(300+420*Math.sin(a)).toFixed(0)}L${(180+420*Math.cos(b)).toFixed(0)} ${(300+420*Math.sin(b)).toFixed(0)}Z"/>`; }).join('')}</g>`;

// Sharper visemes: teeth + tongue on "Ah", teeth bar on "Eh", wider smirk
const M = (y, s, st) => `<g class="mouth" stroke="${st}" transform="translate(0 ${y}) scale(${s})">
  <path class="mc" d="M-8 0h16" fill="none"/>
  <path class="ms" d="M-10 -2q10 13 20 0" fill="none"/>
  <g class="mA"><ellipse rx="9" ry="10" fill="#7a1230"/><path d="M-6 -6h12" stroke="#fff" stroke-width="3.5" fill="none"/><ellipse cy="6" rx="5" ry="3" fill="#ff7a8a" stroke="none"/></g>
  <g class="mO"><circle r="7" fill="#7a1230"/></g>
  <g class="mE"><ellipse rx="12" ry="5" fill="#7a1230"/><path d="M-9 -2.5h18" stroke="#fff" stroke-width="3" fill="none"/></g>
</g>`;

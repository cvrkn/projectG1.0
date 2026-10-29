const baba = (x='', headRot=0) => `<g class="ch baba ${x||''}"><circle cy="-120" r="110" fill="url(#ag)" stroke="none" opacity=".55"/>
<path d="M92 0V-140M92 -140l-12-24M92 -140l12-24" fill="none" stroke="#8a5a2b" stroke-width="6"/>
<ellipse cy="-22" rx="84" ry="30" fill="#f59a1b"/>
<path d="M-48 -30Q-58 -118 -32 -142H32Q58 -118 48 -30Z" fill="#f59a1b"/>
<path d="M-34 -140L46 -62V-32H28L-34 -106Z" fill="#fdc93f"/>
${arm('l','M-38 -128Q-72 -100 -52 -66',-52,-66,'#f59a1b')}
${arm('r','M38 -128Q80 -110 88 -76',88,-76,'#fdc93f')}
<g class="head-node" style="transform: rotate(${headRot}deg); transform-origin: 0px -170px;">
<circle cy="-218" r="16" fill="#3a2a2a"/>
${[-10,0,10].map(x=>`<circle cx="${x}" cy="${-203+Math.abs(x)/5}" r="3.5" fill="#8a5a2b" stroke-width="2"/>`).join('')}
<circle cx="-32" cy="-178" r="6" fill="#f2b38a"/><circle cx="32" cy="-178" r="6" fill="#f2b38a"/><circle cy="-178" r="32" fill="#f2b38a"/>
<path d="M-32 -184Q-30 -212 0 -212Q30 -212 32 -184Q16 -198 0 -196Q-16 -198 -32 -184Z" fill="#3a2a2a"/>
<circle cy="-196" r="3.5" fill="#e8661a" stroke="none"/>
${E(-180,13,5.5)}
<path class="br" fill="none" stroke-width="3.5" d="M-21 -192q8 -5 16 0M5 -192q8 -5 16 0"/>
<circle cy="-172" r="4" fill="#e29a72" stroke-width="2.5"/>
<path d="M-32 -170Q-34 -126 0 -122Q34 -126 32 -170Q20 -150 0 -150Q-20 -150 -32 -170Z" fill="#5b4a52"/>
<ellipse cy="-150" rx="12" ry="8" fill="#3a1520" stroke="none"/>
<g class="jaw">
  <path d="M-30 -154Q-34 -126 0 -122Q34 -126 30 -154Q18 -153 0 -153Q-18 -153 -30 -154Z" fill="#5b4a52"/>
  <path d="M-16 -136q2 8 0 12M16 -136q-2 8 0 12" stroke="#ccc" stroke-width="3" fill="none"/>
</g>
<path d="M-19 -158Q0 -170 19 -158Q0 -149 -19 -158Z" fill="#3a2f33" stroke-width="2.5"/>
</g>
</g>`;


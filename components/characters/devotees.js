const T = [
  {name:'Office Worker', sk:'#ffe7d6',top:'#ADD8E6',pn:'#3d4a6b',hair:'<path d="M-26 -170Q-28 -198 0 -196Q28 -198 26 -170Q12 -184 -26 -170Z" fill="#f0cf97"/>',fr:'<path d="M0 -140l-6 10 5 44 6-44z" fill="#d6362f"/>',fc:'<g fill="none" stroke-width="2.5"><circle cx="-11" cy="-167" r="8"/><circle cx="11" cy="-167" r="8"/><path d="M-3 -167h6"/></g>'},
  {name:'Seeker', sk:'#ffe7d6',top:'#2aa8a0',pn:'#7a5a9a',hair:'<path d="M-30 -140Q-36 -200 0 -198Q36 -200 30 -140L22 -142Q26 -180 0 -182Q-26 -180 -22 -142Z" fill="#ff7bb5"/><rect x="12" y="-190" width="12" height="6" rx="3" fill="#ffd24a" stroke-width="2.5"/>',fr:'',fc:''},
  {name:'Punk', sk:'#e8a97e',top:'#26262e',pn:'#26262e',hair:'<path d="M-6 -190l-3 -22 7 12 3 -18 4 18 6 -12 -2 22z" fill="#e63b3b"/>',fr:'<path d="M0 -144V-66" stroke="#ddd" stroke-width="3" fill="none"/>',fc:'<rect x="-21" y="-173" width="42" height="11" rx="5" fill="#111"/>'},
  {name:'Founder', sk:'#d9a27a',top:'#7f8794',pn:'#33384a',hair:'<path d="M-27 -168Q-28 -200 0 -197Q28 -200 27 -168Q10 -190 -27 -168Z" fill="#5a3a22"/>',fr:'<path d="M-20 -146Q0 -128 20 -146" fill="none" stroke-width="3"/>',fc:'<ellipse cx="-27" cy="-162" rx="3" ry="6" fill="#fff" stroke-width="2"/><ellipse cx="27" cy="-162" rx="3" ry="6" fill="#fff" stroke-width="2"/>',pr:'<rect x="0" y="-134" width="16" height="28" rx="4" fill="#5ee6ff"/>'},
  {name:'Elder', sk:'#f0c4a2',top:'#e7d8b8',pn:'#8a8f6a',hair:'<path d="M-27 -165Q-30 -196 0 -195Q30 -196 27 -165Q22 -176 14 -178Q0 -184 -14 -178Q-22 -176 -27 -165Z" fill="#e9e9e9"/>',fr:'',fc:'<path d="M-14 -157Q0 -164 14 -157Q0 -151 -14 -157Z" fill="#eee" stroke-width="2.5"/>'}
];

const dev = (k, pose, x, headRot=0) => {
  const t = T[k] || T[0];
  return `<g class="ch dv ${x||''}">
  <rect x="-24" y="-66" width="19" height="66" rx="7" fill="${t.pn}"/>
  <rect x="5" y="-66" width="19" height="66" rx="7" fill="${t.pn}"/>
  <path d="M-34 -64Q-40 -132 -20 -142H20Q40 -132 34 -64Z" fill="${t.top}"/>${t.fr}
  ${pose=='n'?arm('l','M-28 -130Q-34 -100 -4 -108',-4,-108,t.top,t.sk)+arm('r','M28 -130Q34 -100 4 -108',4,-108,t.top,t.sk):arm('l','M-28 -130Q-48 -104 -38 -76',-38,-76,t.top,t.sk)}
  <g class="head-node" style="transform: rotate(${headRot}deg); transform-origin: 0px -165px;">
    <circle cx="-26" cy="-165" r="6" fill="${t.sk}"/><circle cx="26" cy="-165" r="6" fill="${t.sk}"/><circle cy="-165" r="26" fill="${t.sk}"/>
    ${E(-168,11,5)}
    ${M(-150,.8,'#5a2a27')}
    ${t.hair}${t.fc}<path class="wb" d="M-18 -176l12 -7M6 -183l12 7" fill="none" stroke-width="3.5"/><path class="ab" d="M-18 -183l12 7M6 -176l12 -7" fill="none" stroke-width="4"/><path class="sweat" d="M31 -188q-6 9 0 12q6 -3 0 -12z" fill="#7fd6ff" stroke-width="2"/>
  </g>
  ${pose=='n'?'':(t.pr||'<rect x="4" y="-137" width="8" height="28" rx="4" fill="#444"/><circle cx="8" cy="-142" r="7" fill="#999"/>')+arm('r','M30 -128Q42 -106 8 -108',8,-108,t.top,t.sk)}
  </g>`;
};


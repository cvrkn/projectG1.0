const disc = (headRot=0) => `<g class="ch dc">
<rect x="-24" y="-66" width="48" height="66" rx="8" fill="#fff4dc"/>
<path d="M-34 -64Q-40 -132 -22 -146H22Q40 -132 34 -64Z" fill="#fff4dc"/>
<path d="M-34 -64Q-40 -132 -22 -146H-8L-4 -70Z M34 -64Q40 -132 22 -146H8L4 -70Z" fill="#f59a1b" stroke-width="3"/>
${[0,1,2,3,4,5,6].map(i=>`<circle cx="${-14+i*4.7}" cy="${-143+Math.sin(i/6*Math.PI)*14}" r="3" fill="#6b3a1e" stroke-width="1.5"/>`).join('')}
${arm('l','M-28 -132Q-52 -108 -30 -92',-30,-92,'#fff4dc','#e0a47a')}
<rect x="-50" y="-100" width="38" height="14" rx="6" fill="#f6e4b8" transform="rotate(-10 -30 -92)"/>
${arm('r','M28 -132Q58 -118 52 -86',52,-86,'#fff4dc','#e0a47a')}
<g class="head-node" style="transform: rotate(${headRot}deg); transform-origin: 0px -170px;">
<circle cx="-26" cy="-170" r="6" fill="#e0a47a"/><circle cx="26" cy="-170" r="6" fill="#e0a47a"/><circle cy="-170" r="26" fill="#e0a47a"/>
${E(-170,10,5)}<path class="flat" d="M-17 -181h12M5 -181h12" fill="none" stroke-width="3.5"/>
${M(-152,.9,'#5a2a27')}
<path d="M-26 -172Q-26 -202 0 -200Q26 -202 26 -172Q14 -186 0 -184Q-14 -186 -26 -172Z" fill="#2a1c1c"/>
</g>
</g>`;


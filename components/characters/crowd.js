const CC = ['#e56b6f','#6d9dc5','#9bc53d','#b085f5','#f2a65a','#5fc9c0','#e0698f','#8d99ae'];
const HC = ['#222','#5a3a22','#aaa','#111','#fceed7'];

const crowd = n => [[40,440,.8],[110,436,.8],[180,432,.7],[250,436,.8],[320,440,.8],[22,492,1],[104,496,1],[256,496,1],[338,492,1]].map(([x,y,s],i)=>
  P(x,y,s,`<g class="ch cw ${n?'bow wide':''}" style="animation-delay:${-i*.25}s;--bd:${-i*.37}s">
    <ellipse cy="-4" rx="30" ry="9" fill="#c2412d"/>
    <path d="M-22 -8Q-24 -50 0 -54Q24 -50 22 -8Z" fill="${CC[i%8]}"/>
    <circle cy="-70" r="17" fill="#fceed7"/>
    ${E(-72,7,3.8)}
    <path d="M-17 -72Q-18 -90 0 -88Q18 -90 17 -72Q8 -80 -17 -72Z" fill="${HC[i%4]}"/>
    <path class="nm" d="M-6 -34l6 -14 6 14z" fill="#fceed7" stroke-width="2.5"/>
  </g>`)
).join('');


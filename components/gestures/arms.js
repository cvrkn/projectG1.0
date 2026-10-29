const arm = (c, d, x, y, col, h='#fff') => `<g class="arm ${c}">
  <path d="${d}" fill="none" stroke-width="18"/>
  <path d="${d}" fill="none" stroke="${col}" stroke-width="10"/>
  <circle cx="${x}" cy="${y}" r="9" fill="${h}"/>
</g>`;


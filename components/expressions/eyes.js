// Eyes now have: blink wrapper (.bl), scalable pupils (.pp) and a catch-light for life
const E = (y, sp, r) => `<g class="eo"><g class="bl">
  ${[-sp,sp].map(x=>`<circle cx="${x}" cy="${y}" r="${r}" fill="#fff" stroke-width="2.5"/><circle class="pp" cx="${x}" cy="${y}" r="${(r/2.1).toFixed(2)}" fill="#2a1210" stroke="none"/><circle cx="${(x+r/4.5).toFixed(2)}" cy="${(y-r/4).toFixed(2)}" r="${(r/6).toFixed(2)}" fill="#fff" stroke="none"/>`).join('')}
</g></g>
<path class="ec" fill="none" d="M${-sp-6} ${y}q6 5 12 0M${sp-6} ${y}q6 5 12 0"/>`;

/**
 * CHARACTER BLUEPRINT TEMPLATE
 * Copy this file to create a new character (e.g., underground_guru.js)
 */

const newCustomCharacter = (extraClasses = '', headRot = 0) => {
  return `<g class="ch new-char ${extraClasses}">
    <!-- Body SVG Paths -->
    <rect x="-20" y="-60" width="40" height="60" rx="6" fill="#3a3a3a"/>

    <!-- Arms -->
    ${arm('l', 'M-24 -50Q-40 -30 -20 -20', -20, -20, '#3a3a3a')}
    ${arm('r', 'M24 -50Q40 -30 20 -20', 20, -20, '#3a3a3a')}

    <!-- Head Node for Rotation/Tilting -->
    <g class="head-node" style="transform: rotate(${headRot}deg); transform-origin: 0px -150px;">
      <!-- Head Base -->
      <circle cy="-150" r="24" fill="#f0c4a2"/>

      <!-- Facial Features -->
      ${E(-150, 9, 4.5)}
      ${M(-135, 0.8, '#5a2a27')}
    </g>
  </g>`;
};


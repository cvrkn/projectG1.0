# Fake Guru Animation Engine: Developer Blueprint Guide

This guide details how to extend the modular architecture by adding new characters, backgrounds, facial expressions, or gestures without breaking the core Web UI render pipeline.

---

## 1. Adding a New Character
1. Create a new JavaScript file in `components/characters/` (e.g., `components/characters/underground_guru.js`).
2. Use `components/characters/blueprint_character.js` as a template.
3. Define a vector generator function returning an SVG string containing `<g class="ch ...">`.
4. Wrap the character's facial features inside a `<g class="head-node">` with `transform-origin` aligned to the neck center.
5. Include dynamic mouth components `${M(y, scale, strokeColor)}` and eye components `${E(y, spacing, radius)}`.
6. Include your new `.js` script in `index.html`.
7. Add an entry into the character dropdown in `js/ui.js`.

---

## 2. Adding a New Background
1. Create a new JavaScript file in `components/backgrounds/` (e.g., `components/backgrounds/city_hall.js`).
2. Define a function returning an SVG string matching the 360x780 viewBox aspect ratio.
3. Replace or swap the `${bg()}` invocation in `js/app.js` with your custom background function.

---

## 3. Adding New Gestures & Actions
1. Open `css/animations.css`.
2. Add a custom class trigger (e.g., `.dance`) with keyframe transformations using `calc(duration / var(--action-speed-multiplier))` to preserve manual speed controls.
3. Toggle the class in `js/studio.js` or attach it via speech triggers in `js/app.js`.

---

## 4. Lip-Sync & Visemes Control
Characters use `data-m` attributes for lip-sync visemes:
- `c`: Closed mouth (default state)
- `s`: Smile / neutral state
- `A`: Wide open mouth ("Ah" vowel sound)
- `O`: Round open mouth ("Oh" vowel sound)
- `E`: Wide stretched mouth ("Eh" vowel sound)

Automatic speech parsing in `js/app.js` maps dialogue text characters dynamically to these visemes.


// ─────────────────────────────────────────────────────────────────────────
// SECTION IMAGE CONFIG
// Images live in public/images/sections/. To change one, replace the file and
// (if the filename differs) update its `src` below. Order matches page order.
//
// Set `src: null` for a section that should have NO background picture — the
// layer fades to the plain page background for it (used to alternate
// picture / no-picture between sections).
//
// `id` must match the corresponding <section id="…"> in the page.
// ─────────────────────────────────────────────────────────────────────────

// ── Displacement map ────────────────────────────────────────────────────
// Swapping this file = completely different distortion character.
// Try: clouds (soft), voronoi (cracked), ripple (concentric).
export const DISPLACEMENT_MAP = '/images/displacement/flow.png'

// ── Tunable WebGL background config ──────────────────────────────────────
export const BG_CONFIG = {
  displacementStrength: 0.25, // 0→1; higher = more warp
  idleRippleSpeed: 0.4, // time scale for ambient motion
  idleRippleAmplitude: 0.006, // UV offset when idle; keep subtle
  dprCap: 2, // max devicePixelRatio for canvas
  mobileDprCap: 1.5, // lower cap on viewports < 768px
  // prefers-reduced-motion behaviour: 'instant' | 'fade'
  reducedMotionMode: 'fade',
}

export const SECTION_IMAGES = [
  { id: 'hero', label: 'Home', src: '/images/sections/hero.jpg', alt: 'Hero section background' },
  { id: 'about', label: 'About', src: '/images/sections/about.jpg', alt: 'About section background' },
  { id: 'experience', label: 'Experience', src: null, alt: '' },
  { id: 'work', label: 'Work', src: null, alt: '' },
  { id: 'skills', label: 'Skills', src: null, alt: '' },
  { id: 'contact', label: 'Contact', src: null, alt: '' },
]

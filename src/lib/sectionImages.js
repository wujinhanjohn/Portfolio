// ─────────────────────────────────────────────────────────────────────────
// SECTION IMAGE CONFIG
// Drop real images in public/images/sections/ and update `src` here.
// Naming convention: NN-sectionname.jpg (section order matches page order).
// Changing an image = replace the file and (if renamed) update src below.
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
  { id: 'hero', src: '/images/sections/01-hero.jpg', alt: 'Hero section background' },
  { id: 'about', src: '/images/sections/02-about.jpg', alt: 'About section background' },
  { id: 'experience', src: '/images/sections/03-experience.jpg', alt: 'Experience section background' },
  { id: 'work', src: '/images/sections/04-work.jpg', alt: 'Work section background' },
  { id: 'skills', src: '/images/sections/05-skills.jpg', alt: 'Skills section background' },
  { id: 'contact', src: '/images/sections/06-contact.jpg', alt: 'Contact section background' },
]

# CLAUDE.md — Wu Jinhan Portfolio

Read this file completely before touching any code. It is the single source of
truth for how this project is structured, what tools to use, and what to avoid.

---

## Project overview

Personal portfolio website for Wu Jinhan (GitHub: wujinhanjohn).
Deployed to Cloudflare Pages at https://portfolio-2bh.pages.dev/
Source: https://github.com/wujinhanjohn/Portfolio

Stack: React 18 + Vite 5, hand-written CSS (no utility-class framework),
GSAP ScrollTrigger for scroll-driven animations, OGL for the WebGL background.

---

## Essential commands

```bash
npm run dev       # start dev server on http://localhost:5173
npm run build     # production build → dist/
npm run preview   # preview the production build on http://localhost:4173
```

Before every build, confirm `npm run dev` starts with zero console errors.
Before every commit, run `npm run build` and fix all errors.
Never commit the `dist/` or `node_modules/` folders.

---

## Repository layout

```
/
├── public/
│   ├── images/
│   │   ├── sections/          ← one 1920×1080 JPEG per section, named NN-sectionname.jpg
│   │   └── displacement/      ← one greyscale displacement map (flow.png)
│   └── favicon.svg
├── scripts/
│   ├── gen-placeholders.mjs   ← generates placeholder section images
│   └── gen-displacement.mjs   ← generates the WebGL displacement texture
├── src/
│   ├── components/
│   │   ├── CrossfadeBackground.jsx  ← CSS/GSAP fallback background layer
│   │   ├── WebGLBackground.jsx      ← OGL WebGL background layer (primary)
│   │   └── [section components]
│   ├── lib/
│   │   ├── sectionImages.js   ← SINGLE SOURCE OF TRUTH for bg images + config
│   │   └── observer.js        ← IntersectionObserver utility (.is-visible)
│   ├── styles/
│   │   ├── index.css          ← imports all partials in order
│   │   ├── tokens.css         ← CSS custom properties (colours, type, spacing)
│   │   ├── reset.css          ← minimal modern reset
│   │   ├── typography.css     ← base font rules
│   │   ├── layout.css         ← .container, section padding, grid helpers
│   │   ├── components.css     ← navbar, cards, buttons, tags
│   │   ├── animations.css     ← .reveal / .is-visible, reduced-motion rules
│   │   └── utilities.css      ← sr-only, text-mono, focus-visible, etc.
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── CLAUDE.md                  ← you are here
```

---

## Design tokens (reference)

All values live in `src/styles/tokens.css` as CSS custom properties.
Never hardcode colours, font names, or spacing values inline. Always use a token.

### Palette
```css
--c-bg:        #F2F0EB   /* warm off-white base */
--c-ink:       #111110   /* near-black text */
--c-mid:       #6B6B67   /* secondary / muted text */
--c-rule:      #D8D5CE   /* dividers and borders */
--c-accent:    #2D5B8E   /* navy accent, used sparingly */
--c-accent-lt: #EBF1F8   /* accent tint for hover states */
```

### Typography
```css
--font-display: 'DM Serif Display', Georgia, serif
--font-body:    'Inter', system-ui, sans-serif
--font-mono:    'Space Mono', 'Courier New', monospace
```

**Font usage rules — enforce these strictly:**
- `--font-display` → headings (`h1`–`h3`) only. Never body text. Never labels.
- `--font-body`    → all paragraphs, nav links, UI text.
- `--font-mono`    → section counters, code snippets, skill tags, metadata labels.
  Do NOT use Space Mono for running text or anything longer than ~6 words.

### Type scale
```css
--text-xs:   0.75rem
--text-sm:   0.875rem
--text-base: 1rem
--text-lg:   1.125rem
--text-xl:   1.375rem
--text-2xl:  1.75rem
--text-3xl:  clamp(1.75rem, 4vw, 2.25rem)
--text-4xl:  clamp(2rem,    5vw, 3rem)
--text-5xl:  clamp(2.5rem,  8vw, 4rem)
```

### Spacing
```css
--container-max: 1120px
--gutter:        clamp(1.5rem, 5vw, 3rem)
--section-gap:   clamp(5rem, 10vw, 8rem)
--radius-sm:     4px
--radius-md:     8px
```

---

## Dependencies

### Runtime
| Package | Purpose |
|---------|---------|
| `react`, `react-dom` | UI framework |
| `gsap` | ScrollTrigger for scroll-driven background transitions |
| `ogl` | Lightweight WebGL for the liquid displacement background |

### Dev-only
| Package | Purpose |
|---------|---------|
| `vite`, `@vitejs/plugin-react` | Build tool |
| `canvas` | Node.js canvas for generating placeholder images (scripts only) |

### Removed / do not re-add
| Package | Reason |
|---------|--------|
| `bootstrap` | Replaced by hand-written CSS |
| `aos` | Replaced by IntersectionObserver in `src/lib/observer.js` |
| `typed.js` | Removed — hero uses a plain static heading |

If you find an import for any of the above, delete it.

---

## Coding conventions

### General
- All new components go in `src/components/`.
- All utility functions (non-React) go in `src/lib/`.
- All styles go in `src/styles/` as CSS files. No inline `style={{}}` props
  except for dynamic values that cannot be expressed as CSS custom properties
  (e.g. a per-element `--progress` value set by JS).
- Use ES modules throughout. No CommonJS (`require`).
- No TypeScript. Files stay `.jsx` / `.js`.

### React
- Functional components only. No class components.
- Use `useEffect` with a cleanup return for anything that registers global
  listeners (scroll, resize, visibilitychange) or creates animation contexts.
- Do not use `useLayoutEffect` unless absolutely necessary.
- Props should be typed with JSDoc `@param` comments on complex components.

### CSS
- Write real CSS. No Tailwind, no CSS-in-JS, no Bootstrap.
- Selectors: prefer class selectors. Avoid deep nesting (max 2 levels).
- Specificity: keep it flat. Do not use `!important`.
- All colours via CSS custom properties from `tokens.css`.
- Responsive: mobile-first. Base styles target small screens; add
  `@media (min-width: 768px)` and `@media (min-width: 1024px)` for larger.
- Minimum touch target: 44×44px for all interactive elements.

### Animations
- Scroll reveals: add class `reveal` in JSX. `src/lib/observer.js` adds
  `is-visible` when the element enters the viewport. Styles live in
  `src/styles/animations.css`.
- Always include `@media (prefers-reduced-motion: reduce)` overrides.
  For the WebGL background: disable idle ripple and displacement warp,
  fall back to a plain opacity crossfade.
- GSAP is used ONLY for the ScrollTrigger background transitions.
  Do not use GSAP for anything else (CSS transitions handle everything else).

---

## Background layer rules

The background layer is a fixed, full-viewport element behind all content.

```
z-index: -1
position: fixed
inset: 0
pointer-events: none
```

**WebGL path (primary):** `src/components/WebGLBackground.jsx`
- Uses OGL. One canvas, one program, two image textures + one displacement texture.
- Transition logic is isolated in `applyTransition()` — the only function to
  touch when swapping the visual effect.
- ScrollTrigger drives `uProgress` (0→1) directly. Do not use `gsap.to()` for
  the uniform — write to `program.uniforms.uProgress.value` directly.
- Render loop pauses when `document.hidden === true`.
- Cleanup on unmount: kill ScrollTrigger instances, cancel rAF, dispose all
  OGL resources.

**CSS fallback:** `src/components/CrossfadeBackground.jsx`
- Used when WebGL is unavailable (detected via `hasWebGL()` in `App.jsx`).
- Same ScrollTrigger structure. Uses CSS opacity transitions + GSAP.

**Image config:** `src/lib/sectionImages.js`
- This is the ONLY file to edit when swapping section images.
- `SECTION_IMAGES` array: one entry per section, in page order.
- `DISPLACEMENT_MAP`: path to the greyscale warp texture.
- `BG_CONFIG`: all tunable numbers (strength, ripple, DPR cap, etc.).

---

## Section structure

Each section component must have:
1. An `id` attribute matching its entry in `SECTION_IMAGES` (e.g. `id="about"`).
2. The class `reveal` on any element that should animate in on scroll.
3. A visible heading that labels the section (for screen readers and SEO).

Section order (matches `SECTION_IMAGES` array order):
1. `#home`    — Hero
2. `#about`   — About
3. `#work`    — Projects / Work
4. `#skills`  — Skills (if present)
5. `#contact` — Contact

If you add or rename a section, update `SECTION_IMAGES` in `sectionImages.js`
to match. Add a corresponding placeholder image in `public/images/sections/`.

---

## Accessibility requirements

Every change must maintain or improve these:
- All `<img>` elements: non-empty `alt` attribute. Decorative images: `alt=""` + `aria-hidden="true"`.
- The WebGL `<canvas>`: `aria-hidden="true"` + `role="presentation"`.
- All interactive elements: visible `:focus-visible` outline (2px solid `--c-accent`).
- Navbar toggle: `aria-expanded` and `aria-controls` updated on toggle.
- Every `<section>` and `<nav>`: labelled by a heading or `aria-label`.
- Colour contrast: all text on background must meet WCAG AA (4.5:1 for normal text).

---

## Performance rules

- `loading="lazy"` on all images not in the initial viewport.
- `fetchpriority="high"` on any above-the-fold image.
- DevicePixelRatio cap: `Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2)`.
- No synchronous work on the main thread during scroll. ScrollTrigger callbacks
  must be lightweight (only update a uniform or a CSS class).
- Bundle splitting in `vite.config.js`:
  ```js
  manualChunks: {
    vendor: ['react', 'react-dom'],
    animation: ['gsap', 'ogl'],
  }
  ```

---

## Things that must never appear in this codebase

These are the patterns that make the site look AI-generated. If you find any,
remove or replace them before committing.

- Bootstrap class names (`col-`, `row`, `btn-primary`, `card`, `d-flex`, etc.)
- AOS attributes (`data-aos`, `data-aos-duration`, `AOS.init`)
- `typed.js` import or usage
- Gradient blobs / radial gradients used as decorative backgrounds
- `Section 01 / 02 / 03` numbering that isn't tied to real sequential content
- The words "passionate", "driven", "love to build", "excited about" in copy
- Generic skill badge grids (rows of coloured pills)
- Bootstrap's indigo (`#6366F1` or `#7c3aed`) as an accent colour
- Centered hero layout with a blob behind it
- `box-shadow: 0 4px 6px rgba(0,0,0,0.1)` or any near-identical generic shadow
- Any inline `style` attribute with a hardcoded hex colour

---

## Deployment

**Platform:** Cloudflare Pages
**Repo:** github.com/wujinhanjohn/Portfolio (branch: `main`)
**Build command:** `npm run build`
**Output directory:** `dist`
**Node version:** match local (`node -v`)

To deploy: push to `main`. Cloudflare auto-deploys on push.

When adding new images, always run `npm run build` locally first to confirm
the `dist/` folder includes the images from `public/`.

---

## Dropping in real photos

When you have real photographs to replace the placeholders:

1. Size them to at least 1920×1080px (landscape).
2. Export as JPEG, quality 80–85. Keep each file under 500KB.
3. Drop them in `public/images/sections/`.
4. Name them to match the existing placeholders: `01-home.jpg`, `02-about.jpg`, etc.
5. If you rename a file, update the `src` field in `SECTION_IMAGES` in
   `src/lib/sectionImages.js`.
6. Run `npm run build` and push. No other changes needed.

To swap the displacement texture (changes the distortion character):
- Drop a new greyscale 1024×1024 PNG into `public/images/displacement/`.
- Update `DISPLACEMENT_MAP` in `src/lib/sectionImages.js`.
- Ripple vs liquid vs ink drop = different displacement map, nothing else changes.
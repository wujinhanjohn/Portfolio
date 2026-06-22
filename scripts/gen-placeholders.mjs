// ─────────────────────────────────────────────────────────────────────────
// Placeholder section-background generator.
// Renders one 1920×1080 JPEG per section into public/images/sections/.
// Each image: a unique-hue gradient, the section name in bold white, and a
// subtle grain overlay. Existing files are skipped.
//
//   node scripts/gen-placeholders.mjs
// ─────────────────────────────────────────────────────────────────────────
import { createCanvas } from 'canvas'
import { mkdirSync, existsSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT_DIR = join(__dirname, '..', 'public', 'images', 'sections')

const WIDTH = 1920
const HEIGHT = 1080

// Order matches the page / SECTION_IMAGES order. Distinct hues per section so
// each background reads as a different environment.
const SECTIONS = [
  { file: '01-hero.jpg', label: 'Hero', hue: 212 },
  { file: '02-about.jpg', label: 'About', hue: 28 },
  { file: '03-experience.jpg', label: 'Experience', hue: 158 },
  { file: '04-work.jpg', label: 'Work', hue: 280 },
  { file: '05-skills.jpg', label: 'Skills', hue: 340 },
  { file: '06-contact.jpg', label: 'Contact', hue: 96 },
]

function drawGradient(ctx, hue) {
  const g = ctx.createLinearGradient(0, 0, WIDTH, HEIGHT)
  g.addColorStop(0, `hsl(${hue}, 58%, 32%)`)
  g.addColorStop(1, `hsl(${(hue + 38) % 360}, 62%, 11%)`)
  ctx.fillStyle = g
  ctx.fillRect(0, 0, WIDTH, HEIGHT)

  // Soft vignette so the edges fall off and the label stays the focal point.
  const v = ctx.createRadialGradient(
    WIDTH / 2, HEIGHT / 2, HEIGHT * 0.15,
    WIDTH / 2, HEIGHT / 2, WIDTH * 0.7
  )
  v.addColorStop(0, 'rgba(0,0,0,0)')
  v.addColorStop(1, 'rgba(0,0,0,0.45)')
  ctx.fillStyle = v
  ctx.fillRect(0, 0, WIDTH, HEIGHT)
}

function addGrain(ctx) {
  // Subtle monochrome grain applied per-pixel.
  const image = ctx.getImageData(0, 0, WIDTH, HEIGHT)
  const { data } = image
  for (let i = 0; i < data.length; i += 4) {
    const n = (Math.random() - 0.5) * 22 // ±11 brightness
    data[i] = Math.max(0, Math.min(255, data[i] + n))
    data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + n))
    data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + n))
  }
  ctx.putImageData(image, 0, 0)
}

function drawLabel(ctx, label) {
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.font = 'bold 120px sans-serif'
  ctx.shadowColor = 'rgba(0,0,0,0.45)'
  ctx.shadowBlur = 24
  ctx.shadowOffsetY = 6
  ctx.fillStyle = '#ffffff'
  ctx.fillText(label, WIDTH / 2, HEIGHT / 2)
  ctx.shadowColor = 'transparent'
}

function generate(section) {
  const outPath = join(OUT_DIR, section.file)
  if (existsSync(outPath)) {
    console.log(`skip   ${outPath} (already exists)`)
    return
  }

  const canvas = createCanvas(WIDTH, HEIGHT)
  const ctx = canvas.getContext('2d')

  drawGradient(ctx, section.hue)
  addGrain(ctx) // grain under the text so the label stays crisp
  drawLabel(ctx, section.label)

  const buffer = canvas.toBuffer('image/jpeg', { quality: 0.85 })
  writeFileSync(outPath, buffer)
  console.log(`create ${outPath}`)
}

mkdirSync(OUT_DIR, { recursive: true })
SECTIONS.forEach(generate)
console.log('Done.')

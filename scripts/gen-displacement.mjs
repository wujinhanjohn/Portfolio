// ─────────────────────────────────────────────────────────────────────────
// Displacement-map generator.
// Renders a 1024×1024 greyscale fractal-noise PNG to
// public/images/displacement/flow.png. This is the warp texture the WebGL
// background samples — swapping this file changes the distortion character.
//
//   node scripts/gen-displacement.mjs
//
// Primary path: SVG <feTurbulence> rendered through node-canvas (librsvg).
// Fallback path: procedural fBm noise in pure JS, so the file is always
// produced even if the local canvas build lacks SVG-filter support.
// ─────────────────────────────────────────────────────────────────────────
import { createCanvas, loadImage } from 'canvas'
import { mkdirSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT_DIR = join(__dirname, '..', 'public', 'images', 'displacement')
const OUT_PATH = join(OUT_DIR, 'flow.png')
const SIZE = 1024

const SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}">
  <filter id="noise" x="0" y="0" width="100%" height="100%">
    <feTurbulence type="fractalNoise" baseFrequency="0.65 0.65"
                  numOctaves="4" stitchTiles="stitch" seed="42"/>
    <feColorMatrix type="saturate" values="0"/>
  </filter>
  <rect width="${SIZE}" height="${SIZE}" filter="url(#noise)"/>
</svg>`

function desaturateInPlace(ctx) {
  const image = ctx.getImageData(0, 0, SIZE, SIZE)
  const { data } = image
  for (let i = 0; i < data.length; i += 4) {
    const lum = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]
    data[i] = data[i + 1] = data[i + 2] = lum
    data[i + 3] = 255
  }
  ctx.putImageData(image, 0, 0)
}

// Looks like noise (not a flat fill)? Used to validate the SVG render.
function hasVariation(ctx) {
  const { data } = ctx.getImageData(0, 0, SIZE, SIZE)
  let min = 255
  let max = 0
  for (let i = 0; i < data.length; i += 4) {
    if (data[i] < min) min = data[i]
    if (data[i] > max) max = data[i]
  }
  return max - min > 24
}

// ── Procedural fallback: value-noise fBm, 4 octaves, tileable-ish ──────────
function hash(x, y) {
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453
  return s - Math.floor(s)
}
function smooth(t) {
  return t * t * (3 - 2 * t)
}
function valueNoise(x, y) {
  const xi = Math.floor(x)
  const yi = Math.floor(y)
  const xf = x - xi
  const yf = y - yi
  const tl = hash(xi, yi)
  const tr = hash(xi + 1, yi)
  const bl = hash(xi, yi + 1)
  const br = hash(xi + 1, yi + 1)
  const u = smooth(xf)
  const v = smooth(yf)
  return (
    tl * (1 - u) * (1 - v) +
    tr * u * (1 - v) +
    bl * (1 - u) * v +
    br * u * v
  )
}
function fbm(x, y) {
  let value = 0
  let amplitude = 0.5
  let frequency = 1
  for (let o = 0; o < 4; o += 1) {
    value += amplitude * valueNoise(x * frequency, y * frequency)
    frequency *= 2
    amplitude *= 0.5
  }
  return value
}
function drawProceduralNoise(ctx) {
  const image = ctx.createImageData(SIZE, SIZE)
  const { data } = image
  const scale = 0.65 * 16 // echo the SVG baseFrequency feel
  for (let y = 0; y < SIZE; y += 1) {
    for (let x = 0; x < SIZE; x += 1) {
      const n = fbm((x / SIZE) * scale, (y / SIZE) * scale)
      const g = Math.max(0, Math.min(255, Math.round(n * 255)))
      const idx = (y * SIZE + x) * 4
      data[idx] = data[idx + 1] = data[idx + 2] = g
      data[idx + 3] = 255
    }
  }
  ctx.putImageData(image, 0, 0)
}

async function generate() {
  mkdirSync(OUT_DIR, { recursive: true })
  const canvas = createCanvas(SIZE, SIZE)
  const ctx = canvas.getContext('2d')

  let mode = 'svg feTurbulence'
  try {
    const img = await loadImage(`data:image/svg+xml;utf8,${encodeURIComponent(SVG)}`)
    ctx.drawImage(img, 0, 0, SIZE, SIZE)
    desaturateInPlace(ctx)
    if (!hasVariation(ctx)) throw new Error('SVG filter produced a flat image')
  } catch (err) {
    mode = `procedural fBm (SVG path unavailable: ${err.message})`
    drawProceduralNoise(ctx)
  }

  writeFileSync(OUT_PATH, canvas.toBuffer('image/png'))
  console.log(`create ${OUT_PATH}`)
  console.log(`mode   ${mode}`)
}

generate()

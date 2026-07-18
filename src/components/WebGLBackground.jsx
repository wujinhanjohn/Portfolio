import { useEffect, useRef } from 'react'
import { Renderer, Geometry, Program, Mesh, Texture, Vec2 } from 'ogl'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SECTION_IMAGES, DISPLACEMENT_MAP, BG_CONFIG } from '../lib/sectionImages'

gsap.registerPlugin(ScrollTrigger)

// Source images are all 1920×1080; the shader cover-fits against this.
const IMAGE_W = 1920
const IMAGE_H = 1080

const vertex = /* glsl */ `
  attribute vec2 position;
  attribute vec2 uv;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`

const fragment = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D uFrom;        // outgoing image
  uniform sampler2D uTo;          // incoming image
  uniform sampler2D uDisp;        // greyscale displacement map
  uniform float     uProgress;    // 0→1, driven by ScrollTrigger
  uniform float     uStrength;    // BG_CONFIG.displacementStrength
  uniform float     uTime;        // elapsed seconds, for idle ripple
  uniform float     uIdleAmp;     // BG_CONFIG.idleRippleAmplitude
  uniform float     uIdleSpeed;   // BG_CONFIG.idleRippleSpeed
  uniform vec2      uResolution;  // canvas size in pixels
  uniform vec2      uImageSize;   // source image size in pixels

  // cover-fit: scale UV so the image fills the canvas without stretching.
  vec2 coverUV(vec2 uv, vec2 imgSize, vec2 canvasSize) {
    vec2 s = canvasSize / imgSize;
    float scale = max(s.x, s.y);
    vec2 offset = (canvasSize - imgSize * scale) * 0.5 / canvasSize;
    return uv * (canvasSize / (imgSize * scale)) + offset / scale;
  }

  void main() {
    vec2 uv = vUv;

    // Idle ripple: gentle UV oscillation, fades out during transition.
    float idleGate  = 1.0 - smoothstep(0.0, 0.25, uProgress)
                           * smoothstep(1.0, 0.75, uProgress);
    float idle      = sin(uv.x * 5.0 + uTime * uIdleSpeed)
                    * cos(uv.y * 3.5 + uTime * uIdleSpeed * 0.7)
                    * uIdleAmp * idleGate;

    float d = texture2D(uDisp, uv + idle).r;

    // Cover-fit both images, then warp them in OPPOSITE directions. The idle
    // offset is added to the sample coords too so the still frame breathes.
    vec2 fromBase = coverUV(uv, uImageSize, uResolution);
    vec2 toBase   = coverUV(uv, uImageSize, uResolution);

    vec2 fromUV = fromBase + vec2(d * uStrength *        uProgress ) + idle;
    vec2 toUV   = toBase   - vec2(d * uStrength * (1.0 - uProgress)) + idle;

    vec4 from = texture2D(uFrom, fromUV);
    vec4 to   = texture2D(uTo,   toUV);

    gl_FragColor = mix(from, to, smoothstep(0.0, 1.0, uProgress));
  }
`

/**
 * The ONE image-to-image transition function. Swap this for a different
 * effect without touching anything else. It drives the morph purely through
 * uniforms - no gsap on the uniform, since ScrollTrigger scrub is already
 * smooth. The component's render loop draws the result.
 *
 * @param {import('ogl').Renderer} renderer  OGL renderer (effect contract; an
 *   effect may need it for render targets - this displacement effect doesn't).
 * @param {import('ogl').Program} program    the shared shader program
 * @param {import('ogl').Texture} fromTexture outgoing image texture
 * @param {import('ogl').Texture} toTexture   incoming image texture
 * @param {number} progress                   0→1 transition progress
 */
export function applyTransition(renderer, program, fromTexture, toTexture, progress) {
  program.uniforms.uFrom.value = fromTexture
  program.uniforms.uTo.value = toTexture
  program.uniforms.uProgress.value = progress
  void renderer
}

/**
 * WebGL liquid-displacement background. One canvas, one program, one mesh.
 * Reads SECTION_IMAGES / DISPLACEMENT_MAP / BG_CONFIG. Falls back to
 * CrossfadeBackground (chosen in App.jsx) when WebGL is unavailable.
 */
function WebGLBackground() {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return undefined

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    const instantMode =
      reduceMotion && BG_CONFIG.reducedMotionMode === 'instant'

    const dprFor = () => {
      const cap =
        window.innerWidth < 768 ? BG_CONFIG.mobileDprCap : BG_CONFIG.dprCap
      return Math.min(window.devicePixelRatio || 1, cap)
    }

    // ── Renderer / canvas ──────────────────────────────────────────────
    const renderer = new Renderer({
      alpha: false,
      dpr: dprFor(),
      powerPreference: 'high-performance',
    })
    const gl = renderer.gl
    gl.clearColor(0.949, 0.941, 0.922, 1) // #F2F0EB, matches page bg pre-load

    const canvas = gl.canvas
    canvas.setAttribute('aria-hidden', 'true')
    canvas.setAttribute('role', 'presentation')
    canvas.style.cssText =
      'position:absolute;inset:0;width:100%;height:100%;display:block;'
    container.appendChild(canvas)

    // ── Geometry: a 2-triangle fullscreen plane in clip space ──────────
    const geometry = new Geometry(gl, {
      position: { size: 2, data: new Float32Array([-1, -1, 1, -1, 1, 1, -1, 1]) },
      uv: { size: 2, data: new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]) },
      index: { data: new Uint16Array([0, 1, 2, 0, 2, 3]) },
    })

    // ── Textures (created up-front, uploaded as images load) ───────────
    const bgPlaceholder = document.createElement('canvas')
    bgPlaceholder.width = bgPlaceholder.height = 1
    const bgCtx = bgPlaceholder.getContext('2d')
    bgCtx.fillStyle = '#F2F0EB'
    bgCtx.fillRect(0, 0, 1, 1)

    const dispPlaceholder = document.createElement('canvas')
    dispPlaceholder.width = dispPlaceholder.height = 1
    const dCtx = dispPlaceholder.getContext('2d')
    dCtx.fillStyle = '#000000' // black ⇒ no warp until the real map loads
    dCtx.fillRect(0, 0, 1, 1)

    const texOpts = {
      generateMipmaps: false,
      minFilter: gl.LINEAR,
      magFilter: gl.LINEAR,
      wrapS: gl.CLAMP_TO_EDGE,
      wrapT: gl.CLAMP_TO_EDGE,
      flipY: true,
    }

    const textures = SECTION_IMAGES.map(
      () => new Texture(gl, { ...texOpts, image: bgPlaceholder })
    )
    const started = new Array(SECTION_IMAGES.length).fill(false)

    const dispTexture = new Texture(gl, {
      generateMipmaps: false,
      minFilter: gl.LINEAR,
      magFilter: gl.LINEAR,
      wrapS: gl.REPEAT,
      wrapT: gl.REPEAT,
      flipY: true,
      image: dispPlaceholder,
    })

    let needsRender = true

    // ── Program / mesh ─────────────────────────────────────────────────
    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uFrom: { value: textures[0] },
        uTo: { value: textures[1] || textures[0] },
        uDisp: { value: dispTexture },
        uProgress: { value: 0 },
        uStrength: { value: reduceMotion ? 0 : BG_CONFIG.displacementStrength },
        uTime: { value: 0 },
        uIdleAmp: { value: reduceMotion ? 0 : BG_CONFIG.idleRippleAmplitude },
        uIdleSpeed: { value: BG_CONFIG.idleRippleSpeed },
        uResolution: { value: new Vec2(1, 1) },
        uImageSize: { value: new Vec2(IMAGE_W, IMAGE_H) },
      },
    })
    const mesh = new Mesh(gl, { geometry, program })

    // ── Image loading + preload ────────────────────────────────────────
    const preloadedLinks = new Set()
    const addPreloadLink = (index) => {
      const item = SECTION_IMAGES[index]
      if (!item || !item.src || preloadedLinks.has(item.src)) return
      preloadedLinks.add(item.src)
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'image'
      link.href = item.src
      document.head.appendChild(link)
    }

    const ensureLoaded = (index) => {
      if (index < 0 || index >= SECTION_IMAGES.length || started[index]) return
      started[index] = true
      // No-picture section: leave the solid background placeholder in place.
      if (!SECTION_IMAGES[index].src) return
      const img = new Image()
      img.decoding = 'async'
      img.src = SECTION_IMAGES[index].src
      img.onload = () => {
        textures[index].image = img
        textures[index].needsUpdate = true
        needsRender = true
      }
    }

    let activeIndex = 0
    const setActive = (index) => {
      if (index === activeIndex) return
      activeIndex = index
      ensureLoaded(index + 1)
      addPreloadLink(index + 1)
    }

    ensureLoaded(0)
    ensureLoaded(1)
    addPreloadLink(1)

    const dispImg = new Image()
    dispImg.decoding = 'async'
    dispImg.src = DISPLACEMENT_MAP
    dispImg.onload = () => {
      dispTexture.image = dispImg
      dispTexture.needsUpdate = true
      needsRender = true
    }

    // ── Sizing / cover-fit ─────────────────────────────────────────────
    const resize = () => {
      renderer.dpr = dprFor()
      renderer.setSize(window.innerWidth, window.innerHeight)
      program.uniforms.uResolution.value.set(gl.canvas.width, gl.canvas.height)
      needsRender = true
    }
    resize()

    let resizeTimer = 0
    const onResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(resize, 100)
    }
    window.addEventListener('resize', onResize)

    // ── ScrollTrigger: one trigger per section boundary ────────────────
    // Crossfade as the next section rises from the bottom of the viewport and
    // finish by the time its top docks at the viewport top - so each section's
    // image is fully resolved once you're at the start of that section. The
    // final boundary ends at 'bottom bottom' (the page can't scroll the last
    // section's top to the very top), guaranteeing the last image fully loads.
    const lastIndex = SECTION_IMAGES.length - 1
    const triggers = []
    for (let i = 0; i < lastIndex; i += 1) {
      const nextSection = document.getElementById(SECTION_IMAGES[i + 1].id)
      if (!nextSection) continue
      const isFinalBoundary = i + 1 === lastIndex

      triggers.push(
        ScrollTrigger.create({
          trigger: nextSection,
          start: 'top bottom',
          end: isFinalBoundary ? 'bottom bottom' : 'top top',
          scrub: true,
          onUpdate: (self) => {
            let p = self.progress
            if (instantMode) p = p < 0.5 ? 0 : 1
            applyTransition(renderer, program, textures[i], textures[i + 1], p)
            setActive(p >= 0.5 ? i + 1 : i)
            needsRender = true
          },
        })
      )
    }

    // ── Render loop ────────────────────────────────────────────────────
    const idleEnabled = !reduceMotion && BG_CONFIG.idleRippleAmplitude > 0
    let rafId = 0
    const loop = (t) => {
      if (idleEnabled) {
        program.uniforms.uTime.value = t * 0.001
        renderer.render({ scene: mesh })
      } else if (needsRender) {
        // Reduced motion / static: only draw when something actually changed.
        renderer.render({ scene: mesh })
        needsRender = false
      }
      rafId = requestAnimationFrame(loop)
    }
    const start = () => {
      if (!rafId) rafId = requestAnimationFrame(loop)
    }
    const stop = () => {
      if (rafId) {
        cancelAnimationFrame(rafId)
        rafId = 0
      }
    }

    // ── Tab visibility: pause the GPU loop while hidden ────────────────
    const onVisibility = () => {
      if (document.hidden) {
        stop()
      } else {
        needsRender = true
        start()
      }
    }
    document.addEventListener('visibilitychange', onVisibility)

    ScrollTrigger.refresh()
    start()

    // ── Cleanup ────────────────────────────────────────────────────────
    return () => {
      stop()
      clearTimeout(resizeTimer)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVisibility)
      triggers.forEach((trigger) => trigger.kill())

      textures.forEach((tex) => gl.deleteTexture(tex.texture))
      gl.deleteTexture(dispTexture.texture)
      geometry.remove()
      program.remove()

      const lose = gl.getExtension('WEBGL_lose_context')
      if (lose) lose.loseContext()
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas)
    }
  }, [])

  return <div id="bg-layer" ref={containerRef} aria-hidden="true" />
}

export default WebGLBackground

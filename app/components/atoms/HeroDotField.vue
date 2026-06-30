<script setup lang="ts">
import {
  useRafFn, useElementSize, useDocumentVisibility,
  useWindowScroll, useMouse, useEventListener, useMediaQuery,
} from '@vueuse/core'

// Interactive "living dot field" — a canvas evolution of the hero's CSS dot grid.
// Resting dots are drawn in a single batched fill (perf); only dots near the
// cursor or a click-ripple are drawn individually (warm to orange, scale, bulge).
const props = withDefaults(defineProps<{
  spacing?: number
  radius?: number
  restAlpha?: number
  parallax?: number
  parallaxMax?: number
  interactionRadius?: number
  maxScale?: number
  displace?: number
}>(), {
  spacing: 26,
  radius: 1.1,
  restAlpha: 0.6,
  parallax: 0.12,
  parallaxMax: 64,
  interactionRadius: 120,
  maxScale: 2.6,
  displace: 10,
})

const TAU = Math.PI * 2

const root = ref<HTMLElement | null>(null)
const canvas = ref<HTMLCanvasElement | null>(null)
const ready = ref(false)
const active = ref(false)

const reduced = useReducedMotion()
const finePointer = useMediaQuery('(pointer: fine)')
const visibility = useDocumentVisibility()
const { width, height } = useElementSize(canvas)
const { y: scrollY } = useWindowScroll()
const { x: mouseX, y: mouseY } = useMouse({ type: 'client', touch: false })

let ctx: CanvasRenderingContext2D | null = null
let cssW = 0
let cssH = 0
let baseX: Float32Array | null = null
let baseY: Float32Array | null = null
let phaseX: Float32Array | null = null
let phaseY: Float32Array | null = null
let affPx: Float32Array | null = null
let affPy: Float32Array | null = null
let affIdx: Int32Array | null = null

let grey = { r: 199, g: 201, b: 203 } // --color-grey-soft #C7C9CB
let orange = { r: 245, g: 154, b: 24 } // --color-orange #F59A18

interface Ripple { x: number; y: number; start: number }
const ripples: Ripple[] = []
const RIPPLE_LIFE = 600
const RIPPLE_SPEED = 0.6
const RIPPLE_BAND = 18

function parseColor(str: string, fallback: { r: number; g: number; b: number }) {
  const s = str.trim()
  if (s.startsWith('#')) {
    let hex = s.slice(1)
    if (hex.length === 3) hex = hex.split('').map(c => c + c).join('')
    if (hex.length === 6) {
      const num = parseInt(hex, 16)
      if (!Number.isNaN(num)) return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 }
    }
  }
  const m = s.match(/(\d+)[,\s]+(\d+)[,\s]+(\d+)/)
  if (m) return { r: +m[1]!, g: +m[2]!, b: +m[3]! }
  return fallback
}

function setupCanvas() {
  const el = canvas.value
  if (!el) return
  cssW = el.clientWidth
  cssH = el.clientHeight
  if (cssW === 0 || cssH === 0) return
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  el.width = Math.round(cssW * dpr)
  el.height = Math.round(cssH * dpr)
  ctx = el.getContext('2d')
  if (!ctx) return
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0) // draw in CSS px
  buildGrid()
}

function buildGrid() {
  let sp = props.spacing
  let cols = Math.ceil(cssW / sp) + 1
  // overscan above the top by parallaxMax so the downward parallax never bares the top edge
  const yStart = -(props.parallaxMax + sp)
  let rows = Math.ceil((cssH + sp - yStart) / sp) + 1
  while (cols * rows > 4000) {
    sp += 2
    cols = Math.ceil(cssW / sp) + 1
    rows = Math.ceil((cssH + sp - yStart) / sp) + 1
  }
  const count = cols * rows
  baseX = new Float32Array(count)
  baseY = new Float32Array(count)
  phaseX = new Float32Array(count)
  phaseY = new Float32Array(count)
  affPx = new Float32Array(count)
  affPy = new Float32Array(count)
  affIdx = new Int32Array(count)
  let i = 0
  for (let ry = 0; ry < rows; ry++) {
    for (let cx = 0; cx < cols; cx++) {
      baseX[i] = cx * sp
      baseY[i] = yStart + ry * sp
      const h = cx * 12.9898 + ry * 78.233
      phaseX[i] = h % TAU
      phaseY[i] = (h * 1.3) % TAU
      i++
    }
  }
}

function draw({ timestamp }: { timestamp: number }) {
  if (!ctx || !baseX || !affIdx || !affPx || !affPy) return
  const now = timestamp
  const t = now * 0.001
  const r = props.radius
  const ir = props.interactionRadius
  const rest = props.restAlpha
  const parY = Math.min(scrollY.value * props.parallax, props.parallaxMax)

  const rect = canvas.value!.getBoundingClientRect()
  const mx = mouseX.value - rect.left
  const my = mouseY.value - rect.top
  const cursorOn = finePointer.value && mx >= 0 && mx <= cssW && my >= 0 && my <= cssH

  ctx.clearRect(0, 0, cssW, cssH)

  // expire ripples
  for (let k = ripples.length - 1; k >= 0; k--) {
    if (now - ripples[k]!.start > RIPPLE_LIFE) ripples.splice(k, 1)
  }

  const n = baseX.length
  const ir2 = ir * ir
  let affCount = 0

  // --- resting batch: one fillStyle, one path, one fill ---
  ctx.beginPath()
  ctx.fillStyle = `rgba(${grey.r},${grey.g},${grey.b},${rest})`
  for (let i = 0; i < n; i++) {
    const px = baseX[i]! + Math.sin(t * 0.6 + phaseX![i]!) * 1.0
    const py = baseY[i]! + Math.cos(t * 0.5 + phaseY![i]!) * 1.0 + parY

    let affected = false
    if (cursorOn) {
      const dx = px - mx
      const dy = py - my
      if (dx * dx + dy * dy < ir2) affected = true
    }
    if (!affected) {
      for (let k = 0; k < ripples.length; k++) {
        const rp = ripples[k]!
        const rad = (now - rp.start) * RIPPLE_SPEED
        const dx = px - rp.x
        const dy = py - rp.y
        if (Math.abs(Math.sqrt(dx * dx + dy * dy) - rad) < RIPPLE_BAND) { affected = true; break }
      }
    }

    if (affected) {
      affIdx![affCount] = i
      affPx![affCount] = px
      affPy![affCount] = py
      affCount++
    } else {
      ctx.moveTo(px + r, py)
      ctx.arc(px, py, r, 0, TAU)
    }
  }
  ctx.fill()

  // --- affected dots: cursor lens + ripple, drawn individually ---
  for (let a = 0; a < affCount; a++) {
    const px = affPx![a]!
    const py = affPy![a]!
    let f = 0
    let dispX = 0
    let dispY = 0
    if (cursorOn) {
      const dx = px - mx
      const dy = py - my
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < ir) {
        let u = 1 - dist / ir
        u = u * u * (3 - 2 * u) // smoothstep
        f = u
        if (dist > 0.001) {
          dispX = (dx / dist) * props.displace * u
          dispY = (dy / dist) * props.displace * u
        }
      }
    }
    let g = 0
    for (let k = 0; k < ripples.length; k++) {
      const rp = ripples[k]!
      const elapsed = now - rp.start
      const rad = elapsed * RIPPLE_SPEED
      const dx = px - rp.x
      const dy = py - rp.y
      const dd = Math.abs(Math.sqrt(dx * dx + dy * dy) - rad)
      if (dd < RIPPLE_BAND) {
        g = Math.max(g, (1 - dd / RIPPLE_BAND) * (1 - elapsed / RIPPLE_LIFE))
      }
    }
    const intensity = f > g ? f : g
    const rr = r * (1 + (props.maxScale - 1) * intensity)
    const cr = Math.round(grey.r + (orange.r - grey.r) * intensity)
    const cg = Math.round(grey.g + (orange.g - grey.g) * intensity)
    const cb = Math.round(grey.b + (orange.b - grey.b) * intensity)
    const alpha = rest + (1 - rest) * intensity
    ctx.beginPath()
    ctx.fillStyle = `rgba(${cr},${cg},${cb},${alpha})`
    ctx.arc(px + dispX, py + dispY, rr, 0, TAU)
    ctx.fill()
  }

  if (!ready.value) ready.value = true
  if (import.meta.dev) (window as unknown as { __heroFrames?: number }).__heroFrames = ((window as unknown as { __heroFrames?: number }).__heroFrames || 0) + 1
}

const { pause, resume } = useRafFn(draw, { immediate: false })

const shouldRun = computed(() =>
  active.value
  && !reduced.value
  && visibility.value !== 'hidden'
  && scrollY.value < (height.value || Number.POSITIVE_INFINITY),
)
watch(shouldRun, run => (run ? resume() : pause()), { immediate: true })

// rebuild grid on resize
watch([width, height], () => setupCanvas())

// click / tap ripple
useEventListener(window, 'pointerdown', (e: PointerEvent) => {
  if (reduced.value || !canvas.value) return
  if (scrollY.value >= (height.value || cssH)) return // hero covered
  const rect = canvas.value.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  if (x < 0 || x > cssW || y < 0 || y > cssH) return
  if (ripples.length >= 6) ripples.shift()
  ripples.push({ x, y, start: performance.now() })
})

onMounted(() => {
  const cs = getComputedStyle(document.documentElement)
  grey = parseColor(cs.getPropertyValue('--color-grey-soft'), grey)
  orange = parseColor(cs.getPropertyValue('--color-orange'), orange)
  setupCanvas()
  active.value = true
})

onBeforeUnmount(() => {
  pause()
  ctx = null
  baseX = baseY = phaseX = phaseY = affPx = affPy = null
  affIdx = null
})
</script>

<template>
  <div ref="root" class="dotfield" aria-hidden="true">
    <!-- SSR / no-JS baseline (also the reduced-motion resting state) -->
    <div class="dotgrid" :class="{ hidden: ready }" />
    <canvas ref="canvas" class="dot-canvas" :class="{ ready }" />
  </div>
</template>

<style scoped>
.dotfield {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}

/* baseline matches the former inline hero dotgrid exactly */
.dotgrid {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(var(--color-grey-soft) 1px, transparent 1.4px);
  background-size: 22px 22px;
  -webkit-mask-image: linear-gradient(180deg, #000 0%, #000 40%, transparent 72%);
  mask-image: linear-gradient(180deg, #000 0%, #000 40%, transparent 72%);
  opacity: 0.6;
  transition: opacity 0.25s var(--ease-brand);
}
.dotgrid.hidden { opacity: 0; }

.dot-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  -webkit-mask-image: linear-gradient(180deg, #000 0%, #000 40%, transparent 72%);
  mask-image: linear-gradient(180deg, #000 0%, #000 40%, transparent 72%);
  transition: opacity 0.25s var(--ease-brand);
}
.dot-canvas.ready { opacity: 1; }
</style>

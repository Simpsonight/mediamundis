<script setup lang="ts">
import type { Work } from '~/data/types'

const props = defineProps<{
  work: Work
}>()

// Full-coverage dot grid for the hover wave (brand halftone language: 19-unit grid).
// `d` = normalised diagonal position (0 = bottom-left → 1 = top-right); it drives the
// per-dot animation-delay so the "pop" travels diagonally across the thumbnail.
// Built once at module load and shared by every row.
const WAVE_VB = { w: 380, h: 238, step: 19 }
const waveDots = Array.from(function* () {
  const { w, h, step } = WAVE_VB
  for (let y = step / 2; y < h; y += step)
    for (let x = step / 2; x < w; x += step)
      yield {
        cx: +x.toFixed(1),
        cy: +y.toFixed(1),
        d: +((x + (h - y)) / (w + h)).toFixed(3),
      }
}())

// Each row observes its own root, so the list can hold any number of entries
// (no fixed pool of useReveal() instances in the parent). Keep the whole object:
// a destructured top-level `el` ref would auto-unwrap in `:ref` and bind null.
const reveal = useReveal()

const isShowcase = computed(() => props.work.kind === 'showcase')
</script>

<template>
  <!-- Showcase rows link out to the live site; technical rows are informational. -->
  <component
    :is="isShowcase ? 'a' : 'article'"
    :ref="reveal.el"
    :href="work.kind === 'showcase' ? work.url : undefined"
    :target="isShowcase ? '_blank' : undefined"
    :rel="isShowcase ? 'noopener noreferrer' : undefined"
    :aria-label="work.kind === 'showcase' ? `${work.title} – Website öffnet in neuem Tab` : undefined"
    class="work-row reveal"
    :class="[`work-row--${work.kind}`, { in: reveal.shown }]"
  >
    <div>
      <span class="eyebrow">
        <span v-if="!isShowcase" class="marker" aria-hidden="true" />
        {{ work.eyebrow }}
      </span>
      <h3>
        {{ work.title }}
        <IconArrow v-if="isShowcase" variant="diag" class="ar" aria-hidden="true" />
      </h3>
      <p>{{ work.description }}</p>
      <div class="meta">
        <span>{{ work.meta.join(' · ') }}</span>
        <span v-if="work.kind === 'showcase'" class="visit">
          Website ansehen
          <IconArrow variant="diag" class="visit-ar" aria-hidden="true" />
        </span>
      </div>
    </div>
    <div v-if="work.kind === 'showcase'" class="work-thumb">
      <NuxtImg
        :src="work.image.src"
        :alt="work.image.alt"
        :width="work.image.width"
        :height="work.image.height"
        format="webp"
        sizes="(max-width: 720px) 100vw, 240px"
        loading="lazy"
      />
      <!-- Hover wave: dots pop on and off, travelling bottom-left → top-right. -->
      <svg
        class="wave"
        :viewBox="`0 0 ${WAVE_VB.w} ${WAVE_VB.h}`"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <circle
          v-for="(dot, i) in waveDots"
          :key="i"
          :cx="dot.cx"
          :cy="dot.cy"
          r="6.5"
          :style="{ '--d': dot.d }"
        />
      </svg>
    </div>
  </component>
</template>

<style scoped>
.work-row {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: clamp(24px, 4vw, 64px);
  align-items: center;
  padding: var(--space-md) 0;
  border-bottom: 1px solid var(--color-line);
  text-decoration: none;
  position: relative;
  color: inherit;
}

/* Technical rows carry no media — collapse to a single, text-forward column. */
.work-row--technical {
  grid-template-columns: 1fr;
}

/* a11y focus ring (only showcase rows are focusable links) */
.work-row:focus-visible {
  outline: 2px solid var(--color-orange);
  outline-offset: 2px;
}

.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-grey-strong);
  font-weight: 600;
}

/* brand-dot marker on technical rows (repurposed dot motif) */
.marker {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--color-orange);
  flex: none;
}

/* text-work-title token */
h3 {
  font-weight: 600;
  font-size: var(--text-work-title);
  line-height: 1;
  letter-spacing: -0.03em;
  margin: 12px 0 10px;
  text-wrap: balance;
  display: flex;
  align-items: center;
  gap: 16px;
  transition: transform 0.35s cubic-bezier(0.2, 0.7, 0.2, 1);
}

/* diagonal arrow — hidden until hover */
.ar {
  width: 0.5em;
  height: 0.5em;
  opacity: 0;
  transform: translateX(-8px);
  transition: opacity 0.3s, transform 0.3s;
  color: var(--color-orange);
  flex: none;
}

p {
  font-size: clamp(15px, 1.3vw, 18px);
  color: var(--color-ink-soft);
  max-width: 70ch;
}

.meta {
  margin-top: 14px;
  font-size: 13px;
  color: var(--color-grey-strong);
  font-weight: 500;
  display: flex;
  flex-wrap: wrap;
  gap: 8px 18px;
  align-items: center;
}

/* outbound affordance on showcase rows */
.visit {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  color: var(--color-ink);
  transition: color 0.25s;
}

.visit-ar {
  width: 0.85em;
  height: 0.85em;
  color: var(--color-orange);
  transition: transform 0.3s;
}

.work-thumb {
  position: relative;
  width: clamp(150px, 18vw, 240px);
  aspect-ratio: 16 / 10;
  background: var(--color-tile);
  border: 1px solid var(--color-line);
  display: grid;
  place-items: center;
  overflow: hidden;
  transition: border-color 0.3s, transform 0.35s;
}

/* Dot veil: real halftone dots in the brand portrait's language (19-unit grid,
   radius encodes value) — solid white in the bottom-left corner, dissolving into
   dots and out to transparent toward the middle. Generated SVG in /public; fades
   out on hover to uncover the clean screenshot. */
.work-thumb::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: url('/references/dot-veil.svg') left bottom / 100% 100% no-repeat;
  z-index: 2;
  transition: opacity 0.5s var(--ease-brand);
}

/* Hover wave layer: full-coverage dot grid, invisible at rest. On hover each dot
   pops (scale 0→1→0) with a diagonal delay, so a band of dots travels bottom-left
   → top-right and clears — then the colour screenshot is revealed. */
.wave {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
}

.wave circle {
  fill: #fff;
  transform: scale(0);
  transform-box: fill-box;
  transform-origin: center;
}

.work-row:hover .wave circle {
  /* dot on-time (0.4s) is shorter than the diagonal delay spread (0.75s), so only a
     narrow band of dots is lit at once — that band travels bottom-left → top-right. */
  animation: dot-wave 0.4s var(--ease-brand) both;
  animation-delay: calc(var(--d) * 0.75s);
}

@keyframes dot-wave {
  0% { transform: scale(0); }
  42% { transform: scale(1); }
  100% { transform: scale(0); }
}

.work-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* Website screenshots: keep the top (logo + hero) in view, not the middle. */
  object-position: top;
  display: block;
  /* Desaturated at rest so the only full-colour surfaces on the page stay calm and
     monochrome; colour blooms in on hover — echoing the hero's "colour lives under
     interaction" lens. */
  filter: grayscale(1) contrast(1.02);
  transition: filter 0.5s var(--ease-brand);
}

/* hover mechanics (showcase rows) */
.work-row:hover h3 {
  transform: translateX(8px);
}

.work-row:hover .ar {
  opacity: 1;
  transform: none;
}

.work-row:hover .visit {
  color: var(--color-orange);
}

.work-row:hover .visit-ar {
  transform: translate(2px, -2px);
}

.work-row:hover .work-thumb {
  border-color: var(--color-orange);
  transform: translateY(-3px);
}

/* colour blooms in on hover — delayed so the dot wave sweeps across first,
   then the (colour) site "appears" behind it. */
.work-row:hover .work-thumb img {
  filter: grayscale(0) contrast(1);
  transition-delay: 0.45s;
}

/* rest veil clears as the wave takes over */
.work-row:hover .work-thumb::after {
  opacity: 0;
}

/* Reduced motion: still reveal colour (it carries meaning), just without the fade. */
@media (prefers-reduced-motion: reduce) {
  .work-thumb img,
  .work-thumb::after {
    transition: none;
  }

  /* no travelling wave — dots stay hidden, colour just reveals */
  .work-row:hover .wave circle {
    animation: none;
  }
}

@media (max-width: 720px) {
  .work-row--showcase {
    grid-template-columns: 1fr;
    gap: 18px;
  }

  .work-thumb {
    width: 100%;
    aspect-ratio: 16 / 9;
    order: -1;
  }
}
</style>

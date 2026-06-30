<script setup lang="ts">
import type { Service } from '~/data/types'

defineProps<{
  service: Service
}>()

const cardRef = ref<HTMLElement | null>(null)
const progress = usePinProgress(cardRef)
const reduced = useReducedMotion()
// Sticky cards plateau at a pin progress of ~0.5 (only the last card reaches
// 1.0). Hold the glyph until the card is well into view (REVEAL_START), then
// play the reveal in a tight, noticeable window that completes as it nears the
// pin point (REVEAL_END, kept under the plateau so it always finishes).
// reduced motion → show the finished glyph statically.
const REVEAL_START = 0.25
const REVEAL_END = 0.42
const display = computed(() =>
  reduced.value
    ? 1
    : Math.min(1, Math.max(0, (progress.value - REVEAL_START) / (REVEAL_END - REVEAL_START)))
)
</script>

<template>
  <!-- Root has class="group" so ArrowButton reacts to parent hover -->
  <article ref="cardRef" class="card group">
    <div class="card-top">
      <h3>{{ service.title }}</h3>
      <ArrowButton to="#kontakt" aria-label="Anfragen" />
    </div>
    <div class="card-rule" />
    <div class="card-body">
      <div>
        <p>{{ service.body }}</p>
        <div class="card-tags">
          <BaseTag
            v-for="tag in service.tags"
            :key="tag"
            :label="tag"
          />
        </div>
      </div>
      <DotMatrix :glyph="service.glyph" :reveal="service.reveal" :progress="display" />
    </div>
  </article>
</template>

<style scoped>
/* card visual styles — position:sticky + top are set by parent (ServicesSection) */
.card {
  background: var(--color-card);
  border: 1px solid var(--color-line);
  padding: clamp(28px, 4vw, 60px);
  min-height: min(560px, 82vh);
  margin-bottom: 26px;
  overflow: hidden;
  box-shadow: 0 10px 40px -24px rgba(20, 22, 26, 0.30);
  transition: border-color 0.3s var(--ease-brand), transform 0.35s var(--ease-brand), box-shadow 0.35s var(--ease-brand);
}

.card:hover {
  border-color: var(--color-ink);
  transform: translateY(-2px);
  box-shadow: 0 18px 50px -28px rgba(20, 22, 26, 0.40);
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
}

/* text-card-title token */
.card h3 {
  font-weight: 600;
  font-size: var(--text-card-title);
  line-height: 0.96;
  letter-spacing: -0.03em;
  max-width: 11ch;
  text-wrap: balance;
}

.card-rule {
  height: 1px;
  background: var(--color-line);
  margin: clamp(20px, 2.4vw, 30px) 0;
}

.card-body {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 30px;
  align-items: end;
}

/* text-card-body token */
.card-body p {
  font-size: var(--text-card-body);
  line-height: 1.32;
  color: var(--color-ink);
  max-width: 24ch;
  font-weight: 500;
}

.card-tags {
  margin-top: 22px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

@media (max-width: 820px) {
  .card-body {
    grid-template-columns: 1fr;
  }
}
</style>

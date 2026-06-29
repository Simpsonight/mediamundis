<script setup lang="ts">
import type { Service } from '~/data/types'

const props = defineProps<{
  service: Service
}>()

const cardRef = ref<HTMLElement | null>(null)
const progress = usePinProgress(cardRef)
const reduced = useReducedMotion()
const fill = computed(() =>
  reduced.value ? 0 : Math.round(progress.value * props.service.matrix.cols * props.service.matrix.rows)
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
      <DotMatrix v-bind="service.matrix" :fill="fill" />
    </div>
  </article>
</template>

<style scoped>
/* demo lines 84-109: card visual styles — position:sticky + top are set by parent (ServicesSection) */
.card {
  background: var(--color-card);
  border: 1px solid var(--color-line);
  padding: clamp(28px, 4vw, 60px);
  min-height: min(560px, 82vh);
  margin-bottom: 26px;
  overflow: hidden;
  box-shadow: 0 10px 40px -24px rgba(20, 22, 26, 0.30);
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
}

/* demo line 91: text-card-title token */
.card h3 {
  font-weight: 600;
  font-size: var(--text-card-title);
  line-height: 0.96;
  letter-spacing: -0.03em;
  max-width: 11ch;
  text-wrap: balance;
}

/* demo line 97 */
.card-rule {
  height: 1px;
  background: var(--color-line);
  margin: clamp(20px, 2.4vw, 30px) 0;
}

/* demo lines 98-100 */
.card-body {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 30px;
  align-items: end;
}

/* demo line 99: text-card-body token */
.card-body p {
  font-size: var(--text-card-body);
  line-height: 1.32;
  color: var(--color-ink);
  max-width: 24ch;
  font-weight: 500;
}

/* demo line 100-101 */
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

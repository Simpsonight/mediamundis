<script setup lang="ts">
import { site } from '~/app/data/site'
</script>

<template>
  <section class="lead wrap">
    <div class="lead-grid">
      <div class="empty" aria-hidden="true" />
      <div>
        <!-- Primary copy contains links — v-html is safe; string comes from trusted static data -->
        <!-- eslint-disable-next-line vue/no-v-html -->
        <p class="primary" v-html="site.lead.primaryHtml" />
        <p class="secondary">{{ site.lead.secondary }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* demo lines 70-76, 204-212 */
.lead {
  padding: clamp(54px, 8vw, 110px) 0 clamp(10px, 2vw, 20px);
}

.lead-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(28px, 5vw, 72px);
}

/* demo line 72: first paragraph (primary HTML) */
.primary {
  font-size: var(--text-lead);
  line-height: 1.44;
  color: var(--color-ink);
  max-width: 34ch;
}

/* demo lines 73-74: inline links inside v-html — :deep() required */
.primary :deep(a) {
  text-decoration: none;
  border-bottom: 1.5px solid var(--color-ink);
  padding-bottom: 1px;
  transition: color 0.2s, border-color 0.2s;
  color: inherit;
}

.primary :deep(a:hover) {
  color: var(--color-orange);
  border-color: var(--color-orange);
}

/* demo line 75: second paragraph (secondary plain text) */
.secondary {
  margin-top: 24px;
  color: var(--color-ink-soft);
  font-size: var(--text-lead-soft);
  line-height: 1.44;
  max-width: 34ch;
}

/* demo line 76: on mobile collapse to single column, hide empty cell */
@media (max-width: 820px) {
  .lead-grid {
    grid-template-columns: 1fr;
  }
  .empty {
    display: none;
  }
}
</style>

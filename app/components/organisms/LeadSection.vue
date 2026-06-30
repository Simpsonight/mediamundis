<script setup lang="ts">
import { site } from '~/data/site'

// Section progress (0..1) drives the portrait's develop effect.
// Measured on the section because the portrait is pinned on desktop.
const section = ref<HTMLElement | null>(null)
const progress = usePinProgress(section)
</script>

<template>
  <section id="ueber-uns" ref="section" class="lead">
    <div class="lead-grid">
      <OwnerPortrait class="lead-portrait" :progress="progress" />
      <div class="lead-text">
        <!-- Primary copy contains links — v-html is safe; string comes from trusted static data -->
        <!-- eslint-disable-next-line vue/no-v-html -->
        <p class="primary" v-html="site.lead.primaryHtml" />
        <p class="secondary">{{ site.lead.secondary }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Base = mobile: stacked, within the gutter */
.lead {
  padding-block: var(--space-xl) var(--space-2xs);
  padding-inline: var(--gutter);
}

.lead-grid {
  display: grid;
  gap: clamp(28px, 5vw, 72px);
}

/* Mobile: banner sits tighter at the top, text clearly below */
@media (max-width: 820px) {
  .lead {
    padding-top: var(--space-lg);
  }
  .lead-grid {
    gap: var(--space-md);
  }
}

/* Desktop: full-viewport stage, portrait bleeds left and is pinned,
   text right-side vertically centered, right edge on the content gutter line */
@media (min-width: 821px) {
  .lead {
    padding: 0;
    min-height: 100vh;
  }
  .lead-grid {
    min-height: 100vh;
    grid-template-columns:
      minmax(0, 1fr)                                       /* portrait, bleeds left */
      minmax(auto, 46ch)                                   /* text */
      max(var(--gutter), calc((100vw - var(--maxw)) / 2)); /* right gutter = wrap boundary */
    column-gap: clamp(32px, 5vw, 80px);
  }
  .lead-portrait {
    align-self: stretch;   /* cell full height — sticky travel */
  }
  .lead-text {
    align-self: center;    /* vertically centered */
    max-width: 46ch;
  }
}

/* first paragraph (primary HTML) — intro voice: larger + medium weight */
.primary {
  font-size: clamp(20px, 1.9vw, 28px);
  font-weight: 500;
  line-height: 1.44;
  color: var(--color-ink);
  max-width: 34ch;
}

/* inline links inside v-html — :deep() required */
.primary :deep(a) {
  text-decoration: none;
  border-bottom: 1.5px solid var(--color-ink);
  padding-bottom: 1px;
  color: inherit;
  /* soft orange wash via background-size — wrap-safe with box-decoration-break */
  background-image: linear-gradient(
    color-mix(in srgb, var(--color-orange) 12%, transparent),
    color-mix(in srgb, var(--color-orange) 12%, transparent));
  background-repeat: no-repeat;
  background-size: 0% 100%;
  -webkit-box-decoration-break: clone;
  box-decoration-break: clone;
  transition: background-size 0.35s var(--ease-brand), border-color 0.2s var(--ease-brand);
}

.primary :deep(a:hover) {
  background-size: 100% 100%;
  border-color: var(--color-orange);
}

/* second paragraph (secondary plain text) */
.secondary {
  margin-top: 24px;
  color: var(--color-ink-soft);
  font-size: var(--text-lead-soft);
  line-height: 1.44;
  max-width: 34ch;
}
</style>

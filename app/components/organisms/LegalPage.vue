<script setup lang="ts">
defineProps<{ title: string }>()
</script>

<template>
  <main class="legal">
    <article class="wrap legal-body">
      <NuxtLink to="/" class="back">
        <IconArrow variant="right" class="back-icon" aria-hidden="true" />
        Zurück zur Startseite
      </NuxtLink>
      <h1>{{ title }}</h1>
      <div class="content">
        <slot />
      </div>
    </article>
    <SiteFooter />
  </main>
</template>

<style scoped>
.legal {
  display: block;
  min-height: 100vh;
  padding-top: calc(var(--navh) + var(--space-lg));
}

.legal-body {
  padding-bottom: var(--space-lg);
}

.back {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 500;
  color: var(--color-ink-soft);
  text-decoration: none;
  transition: color 0.25s var(--ease-brand);
}
.back:hover { color: var(--color-ink); }
.back:focus-visible {
  outline: 2px solid var(--color-orange);
  outline-offset: 2px;
  border-radius: 2px;
}
.back-icon { width: 14px; height: 14px; flex: none; transform: rotate(180deg); }

h1 {
  margin-top: clamp(20px, 3vw, 32px);
  font-size: var(--text-work-intro);
  font-weight: 600;
  line-height: 1.0;
  letter-spacing: -0.03em;
}

/* slotted content carries the page scope, so reach it via :deep() */
.content {
  margin-top: clamp(28px, 4vw, 48px);
  max-width: 68ch;
  color: var(--color-ink-soft);
  font-size: var(--text-lead-soft);
  line-height: 1.6;
}
.content :deep(h2) {
  margin-top: clamp(28px, 3.5vw, 44px);
  margin-bottom: 10px;
  color: var(--color-ink);
  font-size: clamp(18px, 1.8vw, 22px);
  font-weight: 600;
  letter-spacing: -0.01em;
}

.content :deep(h3) {
  margin-top: clamp(28px, 3.5vw, 44px);
  color: var(--color-ink);
  margin-bottom: 10px;
  font-size: clamp(18px, 1.2vw, 22px);
  font-weight: 600;
  letter-spacing: -0.01em;
}

.content :deep(h4) {
  color: var(--color-ink);
  font-weight: 600;
  letter-spacing: -0.01em;
}

.content :deep(p) { margin-bottom: 14px; }
.content :deep(p:last-child) { margin-bottom: 0; }
.content :deep(a) {
  color: var(--color-ink);
  text-decoration: none;
  border-bottom: 1.5px solid var(--color-orange);
  transition: color 0.2s var(--ease-brand);
}
.content :deep(a:hover) { color: var(--color-orange); }
.content :deep(a:focus-visible) {
  outline: 2px solid var(--color-orange);
  outline-offset: 2px;
  border-radius: 2px;
}
.content :deep(.note) {
  padding: 14px 16px;
  margin-bottom: clamp(20px, 3vw, 32px);
  border-left: 3px solid var(--color-orange);
  background: var(--color-tile);
  color: var(--color-ink-soft);
  border-radius: 0 6px 6px 0;
}
</style>

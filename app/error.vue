<script setup lang="ts">
import type { NuxtError } from '#app';

const props = defineProps<{ error: NuxtError }>();

const isNotFound = computed(() => props.error?.statusCode === 404);
const heading = computed(() => (isNotFound.value ? 'Seite nicht gefunden' : 'Etwas ist schiefgelaufen'));
const message = computed(() =>
  isNotFound.value
    ? 'Die aufgerufene Seite existiert nicht oder wurde verschoben.'
    : 'Es ist ein unerwarteter Fehler aufgetreten. Bitte versuchen Sie es später erneut.',
);

useSeoMeta({
  title: heading,
  robots: 'noindex, follow',
});

function goHome() {
  clearError({ redirect: '/' });
}
</script>

<template>
  <main class="err">
    <div class="err-inner wrap">
      <img
        src="/brand/logo-mediamundis.svg"
        alt="mediamundis"
        class="err-logo"
        height="26"
      >
      <p class="err-code">{{ error?.statusCode || 500 }}</p>
      <h1 class="err-title">{{ heading }}</h1>
      <p class="err-msg">{{ message }}</p>
      <button type="button" class="err-cta" @click="goHome">
        <IconArrow variant="right" class="err-cta-icon" aria-hidden="true" />
        Zurück zur Startseite
      </button>
    </div>
  </main>
</template>

<style scoped>
.err {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: var(--space-lg) 0;
  background: var(--color-bg);
  color: var(--color-ink);
}
.err-inner {
  text-align: center;
  max-width: 640px;
}
.err-logo {
  height: 26px;
  width: auto;
  margin: 0 auto var(--space-md);
}
.err-code {
  font-size: var(--text-hero);
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.04em;
  color: var(--color-orange);
}
.err-title {
  margin-top: var(--space-xs);
  font-size: var(--text-work-intro);
  font-weight: 600;
  line-height: 1.05;
  letter-spacing: -0.03em;
}
.err-msg {
  margin-top: var(--space-sm);
  color: var(--color-ink-soft);
  font-size: var(--text-lead-soft);
  line-height: 1.6;
}
.err-cta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: var(--space-md);
  padding: 12px 20px;
  font: inherit;
  font-weight: 600;
  color: var(--color-bg);
  background: var(--color-ink);
  border: none;
  border-radius: 999px;
  cursor: pointer;
  transition: background 0.25s var(--ease-brand);
}
.err-cta:hover { background: var(--color-orange); }
.err-cta:focus-visible {
  outline: 2px solid var(--color-orange);
  outline-offset: 2px;
}
.err-cta-icon { width: 16px; height: 16px; flex: none; }
</style>

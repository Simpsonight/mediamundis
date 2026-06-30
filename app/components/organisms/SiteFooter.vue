<script setup lang="ts">
import { site } from '~/data/site'

const year = useCurrentYear()
</script>

<template>
  <footer class="wrap site-footer">
    <span class="copy">© {{ year }} mediamundis · Software Development &amp; Consulting</span>
    <div class="meta">
      <nav class="legal" aria-label="Rechtliches">
        <NuxtLink v-for="link in site.legalLinks" :key="link.href" :to="link.href">{{ link.label }}</NuxtLink>
      </nav>
      <span class="loc">{{ site.location }}</span>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: baseline;
  gap: 12px 28px;
  margin-top: var(--space-xl);
  padding-top: 26px;
  border-top: 1px solid var(--color-line);
  font-size: 13px;
  color: var(--color-grey-strong);
}

.meta {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 12px 28px;
  margin-left: auto; /* keep meta group right-aligned when copy is short */
}

.legal {
  display: flex;
  flex-wrap: wrap;
  gap: 12px 20px;
}

.legal a {
  color: var(--color-grey-strong);
  text-decoration: none;
  transition: color 0.25s var(--ease-brand);
}
.legal a:hover { color: var(--color-orange); }
.legal a:focus-visible {
  outline: 2px solid var(--color-orange);
  outline-offset: 2px;
  border-radius: 2px;
}

.loc { color: var(--color-grey-strong); }

@media (max-width: 560px) {
  .meta { margin-left: 0; }
}
</style>

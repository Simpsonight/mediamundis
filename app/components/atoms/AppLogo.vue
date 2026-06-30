<template>
  <a href="#top" aria-label="mediamundis - Startseite" class="brand">
    <img src="/brand/logo-mediamundis.svg" alt="mediamundis - Software Development, Consulting, AI by Simon Kemmerling" height="24">
  </a>
</template>

<style scoped>
.brand {
  height: 24px;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
  width: 300px;
}

/* a11y focus ring */
.brand:focus-visible {
  outline: 2px solid var(--color-orange);
  outline-offset: 2px;
  border-radius: 2px;
}
.wordmark {
  font-family: var(--font-sans);
  font-weight: 800;
  letter-spacing: -0.04em;
  font-size: 24px;
  line-height: 1;
  color: var(--color-ink);
}
</style>

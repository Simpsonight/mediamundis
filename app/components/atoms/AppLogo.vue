<template>
  <a href="#top" aria-label="mediamundis – Startseite" class="brand">
    <!--
      LOGO SWAP: when /brand/logo.svg is delivered, replace the <span> below with:
        <img src="/brand/logo.svg" alt="mediamundis" height="24">
    -->
    <span class="wordmark">mediamundis</span>
  </a>
</template>

<style scoped>
.brand {
  height: 24px;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
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

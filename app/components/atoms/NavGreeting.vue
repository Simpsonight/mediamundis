<script setup lang="ts">
const greeting = useGreeting()
</script>

<template>
  <!-- min-width reserves ~9 characters to prevent layout shift while greeting hydrates -->
  <span class="greet">{{ greeting }}</span>
</template>

<style scoped>
.greet {
  font-size: 14px;
  color: var(--color-ink-soft);
  font-weight: 500;
  min-width: 9ch;
  display: inline-block;
}
</style>

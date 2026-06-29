<script setup lang="ts">
import { site } from '~/data/site'

const year = useCurrentYear()
</script>

<template>
  <!-- demo lines 163-166, 328-331 -->
  <footer>
    <span>© {{ year }} mediamundis · Software Development &amp; Consulting</span>
    <span>{{ site.location }}</span>
  </footer>
</template>

<style scoped>
/* demo lines 163-166 */
footer {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 16px;
  margin-top: clamp(60px, 9vw, 120px);
  padding-top: 26px;
  border-top: 1px solid var(--color-line);
  font-size: 13px;
  color: var(--color-grey-strong);
}
</style>

<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <div class="seclabel">
    <h2 class="label-text">{{ title }}</h2>
    <span class="bar" />
  </div>
</template>

<style scoped>
/* demo lines 78-80 */
.seclabel {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: clamp(50px, 7vw, 90px) 0 8px;
}
.label-text {
  font-size: 13px;
  letter-spacing: 0.04em;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--color-grey-strong);
  white-space: nowrap;
}
.bar {
  flex: 1;
  height: 1px;
  background: var(--color-line);
}
</style>

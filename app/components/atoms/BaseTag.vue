<script setup lang="ts">
defineProps<{
  label?: string
}>()
</script>

<template>
  <span class="tag">
    <slot>{{ label }}</slot>
  </span>
</template>

<style scoped>
/* demo line 101 */
.tag {
  font-size: 13px;
  color: var(--color-ink-soft);
  border: 1px solid var(--color-line);
  padding: 6px 13px;
  background: #FBFBFB;
}
</style>

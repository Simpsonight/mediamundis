<script setup lang="ts">
defineProps<{
  to: string
  label: string
}>()
</script>

<template>
  <a :href="to" class="pill">
    <IconArrow variant="diag" class="pill-icon" />
    {{ label }}
  </a>
</template>

<style scoped>
/* demo lines 42-46 */
.pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--color-ink);
  color: #fff;
  padding: 9px 16px 9px 14px;
  border-radius: 100px;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  transition: background 0.25s, transform 0.25s;
  white-space: nowrap;
}
.pill-icon {
  width: 13px;
  height: 13px;
  flex: none;
}
.pill:hover {
  background: var(--color-orange);
  transform: translateY(-1px);
}

/* a11y focus ring */
.pill:focus-visible {
  outline: 2px solid var(--color-orange);
  outline-offset: 2px;
}
</style>

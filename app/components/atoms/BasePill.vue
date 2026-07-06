<script setup lang="ts">
defineProps<{
  to: string
  label: string
}>()

const { el, style: magneticStyle } = useMagnetic()

// Merge magnetic transform transition with the pill's background transition so the
// inline style (which overrides CSS) carries both transition declarations.
const pillStyle = computed(() => ({
  ...magneticStyle.value,
  transition: `background 0.25s var(--ease-brand), ${magneticStyle.value.transition}`,
}))
</script>

<template>
  <a :ref="el" :href="to" :style="pillStyle" class="pill">
    <IconArrow variant="diag" class="pill-icon" />
    {{ label }}
  </a>
</template>

<style scoped>
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
  white-space: nowrap;
}
.pill-icon {
  width: 13px;
  height: 13px;
  flex: none;
}
.pill:hover {
  background: var(--color-orange);
}

/* a11y focus ring */
.pill:focus-visible {
  outline: 2px solid var(--color-orange);
  outline-offset: 2px;
}
</style>

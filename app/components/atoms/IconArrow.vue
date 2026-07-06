<script setup lang="ts">
withDefaults(defineProps<{
  variant?: 'diag' | 'right'
}>(), {
  variant: 'right',
})
</script>

<template>
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2.5"
    stroke-linecap="round"
    stroke-linejoin="round"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path v-if="variant === 'diag'" d="M7 17 17 7M9 7h8v8" />
    <path v-else d="M5 12h14M13 6l6 6-6 6" />
  </svg>
</template>

<script setup lang="ts">
/**
 * ArrowButton — circular icon link.
 *
 * Hover state is driven by the PARENT element, not this component itself.
 * Consumers must add the Tailwind `group` class to the wrapping element so
 * that `group-hover:` utilities here activate on parent hover.
 *
 * Example:
 *   <div class="group card">
 *     <ArrowButton to="#leistungen" aria-label="Mehr erfahren" />
 *   </div>
 */
defineProps<{
  to: string
  ariaLabel: string
}>()
</script>

<template>
  <!-- group-hover:* activates when the parent with class="group" is hovered -->
  <!-- Use [transform:rotate(45deg)] arbitrary value so transition:transform picks it up in Tailwind v4 -->
  <a :href="to" :aria-label="ariaLabel" class="arrow-btn group-hover:bg-orange group-hover:[transform:rotate(45deg)]">
    <IconArrow variant="right" class="arrow-icon" />
  </a>
</template>

<style scoped>
.arrow-btn {
  flex: none;
  width: clamp(52px, 5vw, 72px);
  height: clamp(52px, 5vw, 72px);
  border-radius: 50%;
  background: var(--color-ink);
  display: grid;
  place-items: center;
  color: #fff;
  text-decoration: none;
  transition: background 0.3s var(--ease-brand), transform 0.3s var(--ease-brand);
}
.arrow-icon {
  width: 42%;
  height: 42%;
}

/* a11y focus ring */
.arrow-btn:focus-visible {
  outline: 2px solid var(--color-orange);
  outline-offset: 2px;
}
</style>

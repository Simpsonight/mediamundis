<template>
  <div class="scroll-cue" aria-hidden="true">
    <i class="bar-line" />
    <span>Scroll</span>
  </div>
</template>

<style scoped>
/* demo lines 60-65 */
.scroll-cue {
  position: absolute;
  left: clamp(20px, 4vw, 56px);
  bottom: clamp(20px, 4vh, 40px);
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 11px;
  font-size: 12px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--color-grey);
  font-weight: 600;
}
.bar-line {
  width: 1px;
  height: 34px;
  background: var(--color-grey-soft);
  position: relative;
  overflow: hidden;
  display: block;
}
.bar-line::after {
  content: "";
  position: absolute;
  inset: 0;
  background: var(--color-orange);
  animation: drop 1.8s cubic-bezier(0.7, 0, 0.3, 1) infinite;
}

/* reduced-motion is handled globally in main.css via animation: none !important */
@keyframes drop {
  0%   { transform: translateY(-100%); }
  60%, 100% { transform: translateY(100%); }
}
</style>

import { useEventListener, useMediaQuery } from '@vueuse/core';

// Pointer-follow translate within an element. No-op on coarse pointer or reduced-motion.
export function useMagnetic(strength = 0.25) {
  const el = ref<HTMLElement | null>(null);
  const tx = ref(0);
  const ty = ref(0);
  const fine = useMediaQuery('(pointer: fine)');
  const reduced = useReducedMotion();

  useEventListener(el, 'pointermove', (e: PointerEvent) => {
    if (!fine.value || reduced.value || !el.value) return;
    const r = el.value.getBoundingClientRect();
    tx.value = (e.clientX - (r.left + r.width / 2)) * strength;
    ty.value = (e.clientY - (r.top + r.height / 2)) * strength;
  });
  useEventListener(el, 'pointerleave', () => { tx.value = 0; ty.value = 0; });

  const style = computed(() => ({
    transform: `translate(${tx.value}px, ${ty.value}px)`,
    transition: 'transform 0.2s var(--ease-brand)',
  }));
  return { el, style };
}

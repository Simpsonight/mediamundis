import { useIntersectionObserver } from '@vueuse/core';

export function useReveal(threshold = 0.18) {
  const el = ref<HTMLElement | null>(null);
  const shown = ref(false);
  const { stop } = useIntersectionObserver(
    el,
    ([entry]) => {
      if (entry?.isIntersecting) { shown.value = true; stop(); }
    },
    { threshold },
  );
  return { el, shown };
}

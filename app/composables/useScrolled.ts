import { useWindowScroll } from '@vueuse/core';

export function useScrolled(threshold = 30) {
  const { y } = useWindowScroll();
  return computed(() => y.value > threshold);
}

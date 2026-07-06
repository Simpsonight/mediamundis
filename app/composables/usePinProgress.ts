import type { Ref } from 'vue'
import { useElementBounding } from '@vueuse/core'

/**
 * Returns a computed 0..1 progress value as the element scrolls through the viewport.
 * 0 = element below viewport, 1 = element fully scrolled past top.
 * SSR-safe: returns 0 on the server (typeof window === 'undefined').
 */
export function usePinProgress(el: Ref<HTMLElement | null>) {
  const { top, height } = useElementBounding(el)
  return computed(() => {
    const vh = typeof window === 'undefined' ? 0 : window.innerHeight
    if (!vh || !height.value) return 0
    const p = (vh - top.value) / (vh + height.value)
    return Math.min(1, Math.max(0, p))
  })
}

// Shared open-state for the full-screen menu overlay.
// Module-level ref = singleton: header toggle and overlay read/write the same
// state without props/emits. SSR-safe — touches no window/document at import.
const open = ref(false)

export function useMenu() {
  return {
    open: readonly(open),
    openMenu: () => { open.value = true },
    closeMenu: () => { open.value = false },
    toggle: () => { open.value = !open.value },
  }
}

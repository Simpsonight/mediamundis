<script setup lang="ts">
import { onKeyStroke, useScrollLock } from '@vueuse/core'
import { site } from '~/data/site'

const { open, closeMenu } = useMenu()

// "Kontakt" joins the section-nav links here; site.navLinks stays pure data.
const items = [...site.navLinks, { href: '#kontakt', label: 'Kontakt' }]

const dialog = ref<HTMLElement | null>(null)

// --- a11y: scroll lock (not motion — always on while open) ---
const locked = useScrollLock(import.meta.client ? document.body : null)
watch(open, (v) => { locked.value = v })

// --- a11y: Escape closes ---
onKeyStroke('Escape', () => { if (open.value) closeMenu() })

// --- a11y: focus restore + initial focus ---
let lastFocused: HTMLElement | null = null
watch(open, async (isOpen) => {
  if (!import.meta.client) return
  if (isOpen) {
    lastFocused = document.activeElement as HTMLElement
    await nextTick()
    focusables()[0]?.focus()
  } else {
    lastFocused?.focus?.()
    lastFocused = null
  }
})

// --- a11y: focus trap ---
function focusables(): HTMLElement[] {
  if (!dialog.value) return []
  return Array.from(
    dialog.value.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  )
}

function onTab(e: KeyboardEvent) {
  if (e.key !== 'Tab') return
  const f = focusables()
  if (!f.length) return
  const first = f[0]!
  const last = f[f.length - 1]!
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault()
    last.focus()
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault()
    first.focus()
  }
}
</script>

<template>
  <Transition name="overlay">
    <div
      v-if="open"
      id="menu-overlay"
      ref="dialog"
      class="overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Hauptmenü"
      @keydown="onTab"
    >
      <div class="overlay-bar">
        <span class="overlay-brand" @click="closeMenu">
          <AppLogo />
        </span>
        <MenuToggle />
      </div>

      <div class="overlay-body">
        <nav class="menu-nav" aria-label="Hauptmenü">
          <a
            v-for="(item, i) in items"
            :key="item.href"
            :href="item.href"
            class="menu-link"
            :style="{ '--i': i }"
            @click="closeMenu"
          >
            <span class="menu-link-text">{{ item.label }}</span>
            <IconArrow variant="diag" class="menu-link-icon" />
          </a>
        </nav>

        <div class="overlay-foot">
          <div class="contact">
            <span class="contact-label">Kontakt</span>
            <a :href="`mailto:${site.email}`" class="contact-mail" @click="closeMenu">{{ site.email }}</a>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  z-index: 200;
  background: var(--color-ink);
  color: #fff;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

/* top row mirrors the real header geometry (logo left, close right) */
.overlay-bar {
  flex: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--navh);
  padding: 0 var(--gutter);
}
/* AppLogo renders the dark mark — flip it white on the ink surface */
.overlay-brand { display: inline-flex; cursor: pointer; }
.overlay-brand :deep(img) { filter: brightness(0) invert(1); }

.overlay-body {
  flex: 1;
  width: 100%;
  max-width: var(--maxw);
  margin-inline: auto;
  padding: clamp(24px, 6vh, 72px) var(--gutter) clamp(28px, 5vh, 56px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: clamp(32px, 7vh, 80px);
}

.menu-nav {
  display: flex;
  flex-direction: column;
}

.menu-link {
  --pad: clamp(10px, 1.6vh, 22px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: var(--pad) 0;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  color: #fff;
  text-decoration: none;
  font-size: var(--text-menu);
  font-weight: 600;
  line-height: 1;
  letter-spacing: -0.02em;
}
.menu-link:last-child { border-bottom: 1px solid rgba(255, 255, 255, 0.12); }

.menu-link-text { transition: color 0.3s var(--ease-brand), transform 0.3s var(--ease-brand); transform-origin: left center; }
.menu-link-icon {
  width: clamp(20px, 2.4vw, 34px);
  height: clamp(20px, 2.4vw, 34px);
  flex: none;
  color: rgba(255, 255, 255, 0.35);
  transition: color 0.3s var(--ease-brand), transform 0.3s var(--ease-brand);
}

.menu-link:hover .menu-link-text,
.menu-link:focus-visible .menu-link-text { color: var(--color-orange); }
.menu-link:hover .menu-link-icon,
.menu-link:focus-visible .menu-link-icon {
  color: var(--color-orange);
  transform: translate(3px, -3px);
}
.menu-link:focus-visible {
  outline: 2px solid var(--color-orange);
  outline-offset: 4px;
  border-radius: 4px;
}

.overlay-foot {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  flex-wrap: wrap;
}
.contact { display: flex; flex-direction: column; gap: 6px; }
.contact-label {
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-grey);
}
.contact-mail {
  font-size: clamp(20px, 3vw, 34px);
  font-weight: 500;
  letter-spacing: -0.02em;
  color: #fff;
  text-decoration: none;
  transition: color 0.3s var(--ease-brand);
}
.contact-mail:hover { color: var(--color-orange); }
.contact-mail:focus-visible {
  outline: 2px solid var(--color-orange);
  outline-offset: 3px;
  border-radius: 3px;
}
.greet { font-size: 14px; color: var(--color-grey); }

/* ---- transitions ---- */
.overlay-enter-active,
.overlay-leave-active { transition: opacity 0.4s var(--ease-brand); }
.overlay-enter-from,
.overlay-leave-to { opacity: 0; }

/* staggered reveal of links during enter (children animate via root's enter classes) */
.overlay-enter-active .menu-link {
  transition: opacity 0.5s var(--ease-brand), transform 0.5s var(--ease-brand);
  transition-delay: calc(var(--i) * 60ms + 90ms);
}
.overlay-enter-from .menu-link { opacity: 0; transform: translateY(22px); }

@media (prefers-reduced-motion: reduce) {
  .overlay-enter-active .menu-link { transition-delay: 0ms !important; }
  .overlay-enter-from .menu-link { opacity: 1; transform: none; }
}

@media (max-width: 600px) {
  .menu-link-icon { width: 18px; height: 18px; }
}
</style>

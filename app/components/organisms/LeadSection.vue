<script setup lang="ts">
import { site } from '~/data/site'

// Section progress (0..1) drives the portrait's develop effect.
// Measured on the section because the portrait is pinned on desktop.
const section = ref<HTMLElement | null>(null)
const progress = usePinProgress(section)
</script>

<template>
  <section id="ueber-uns" ref="section" class="lead">
    <div class="lead-grid">
      <OwnerPortrait class="lead-portrait" :progress="progress" />
      <div class="lead-text">
        <span class="lead-id">{{ site.lead.name }} · {{ site.lead.role }}</span>
        <h2 class="lead-headline">{{ site.lead.headline }}</h2>
        <!-- Primary copy contains links — v-html is safe; string comes from trusted static data -->
        <!-- eslint-disable-next-line vue/no-v-html -->
        <p class="primary" v-html="site.lead.primaryHtml" />
        <p class="secondary">{{ site.lead.secondary }}</p>
        <p class="lead-profile">{{ site.lead.profile }}</p>
        <nav class="lead-socials" aria-label="Profile">
          <a
            v-for="s in site.lead.socials"
            :key="s.label"
            :href="s.href"
            class="lead-social"
          >{{ s.label }}</a>
        </nav>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Base = mobile: stacked, within the gutter */
.lead {
  padding-block: var(--space-xl) var(--space-2xs);
  padding-inline: var(--gutter);
}

.lead-grid {
  display: grid;
  gap: clamp(28px, 5vw, 72px);
}

/* Mobile: banner sits tighter at the top, text clearly below */
@media (max-width: 820px) {
  .lead {
    padding-top: var(--space-lg);
  }
  .lead-grid {
    gap: var(--space-md);
  }
}

/* Desktop: full-viewport stage, portrait bleeds left and is pinned,
   text right-side vertically centered, right edge on the content gutter line */
@media (min-width: 821px) {
  .lead {
    padding: 0;
    min-height: 100vh;
  }
  .lead-grid {
    min-height: 100vh;
    grid-template-columns:
      minmax(0, 1fr)                                       /* portrait, bleeds left */
      minmax(auto, 46ch)                                   /* text */
      max(var(--gutter), calc((100vw - var(--maxw)) / 2)); /* right gutter = wrap boundary */
    column-gap: clamp(32px, 5vw, 80px);
  }
  .lead-portrait {
    align-self: stretch;   /* cell full height — sticky travel */
  }
  .lead-text {
    align-self: center;    /* vertically centered */
    max-width: 46ch;
  }
}

/* identity eyebrow — name + role above the headline */
.lead-id {
  display: block;
  font-size: 13px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--color-grey-strong);
  margin-bottom: 14px;
}

/* section headline (H2) */
.lead-headline {
  font-size: clamp(22px, 2.2vw, 32px);
  font-weight: 600;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: var(--color-ink);
  text-wrap: balance;
  max-width: 24ch;
  margin-bottom: clamp(20px, 2vw, 28px);
}

/* first paragraph (primary HTML) — intro voice: larger + medium weight */
.primary {
  font-size: clamp(18px, 1.6vw, 24px);
  font-weight: 500;
  line-height: 1.44;
  color: var(--color-ink);
  max-width: 40ch;
}

/* inline links inside v-html — :deep() required */
.primary :deep(a) {
  text-decoration: none;
  border-bottom: 1.5px solid var(--color-ink);
  padding-bottom: 1px;
  color: inherit;
  /* soft orange wash via background-size — wrap-safe with box-decoration-break */
  background-image: linear-gradient(
    color-mix(in srgb, var(--color-orange) 12%, transparent),
    color-mix(in srgb, var(--color-orange) 12%, transparent));
  background-repeat: no-repeat;
  background-size: 0% 100%;
  -webkit-box-decoration-break: clone;
  box-decoration-break: clone;
  transition: background-size 0.35s var(--ease-brand), border-color 0.2s var(--ease-brand);
}

.primary :deep(a:hover) {
  background-size: 100% 100%;
  border-color: var(--color-orange);
}

/* second paragraph (secondary plain text) */
.secondary {
  margin-top: 24px;
  color: var(--color-ink-soft);
  font-size: var(--text-lead-soft);
  line-height: 1.44;
  max-width: 40ch;
}

/* compact profile line — muted, dot-separated skills/branches */
.lead-profile {
  margin-top: 24px;
  color: var(--color-grey-strong);
  font-size: 14px;
  line-height: 1.5;
  font-weight: 500;
  max-width: 46ch;
}

/* social profile links */
.lead-socials {
  margin-top: 18px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
.lead-social {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-ink);
  text-decoration: none;
  border-bottom: 1.5px solid var(--color-line);
  padding-bottom: 2px;
  transition: border-color 0.2s var(--ease-brand), color 0.2s var(--ease-brand);
}
.lead-social:hover {
  color: var(--color-orange);
  border-color: var(--color-orange);
}
.lead-social:focus-visible {
  outline: 2px solid var(--color-orange);
  outline-offset: 3px;
}
</style>

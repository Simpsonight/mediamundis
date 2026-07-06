<script setup lang="ts">
import { site } from '~/data/site'

const rH2 = useReveal()
const rRow = useReveal()
</script>

<template>
  <section id="kontakt" class="contact">
    <div class="wrap">
      <!-- Contact headline with reveal — text-contact token -->
      <h2
        :ref="rH2.el"
        :class="{ reveal: true, in: rH2.shown }"
      >
        Projekt oder Verstärkung?<br><span class="g">Sprechen wir darüber.</span>
      </h2>

      <!-- Intro line with reveal -->
      <p
        :ref="rRow.el"
        class="contact-intro"
        :class="{ reveal: true, in: rRow.shown }"
      >
        Ob konkretes Vorhaben oder erste technische Einschätzung — beschreiben Sie kurz Ihre Anforderung. Sie erhalten eine fundierte, ehrliche Rückmeldung.
      </p>

      <!-- CTA row -->
      <div
        class="row"
        :class="{ reveal: true, in: rRow.shown }"
      >
        <a class="mail" :href="`mailto:${site.email}`">
          {{ site.email }}
          <IconArrow variant="right" class="mail-icon" aria-hidden="true" />
        </a>
        <BasePill :to="`mailto:${site.email}`" label="Projekt anfragen" />
      </div>
    </div>

    <SiteFooter />
  </section>
</template>

<style scoped>
.contact {
  /* vertical only — horizontal gutter comes from the inner .wrap and SiteFooter */
  padding-block: var(--space-2xl) var(--space-lg);
}

/* text-contact token */
h2 {
  font-weight: 600;
  font-size: var(--text-contact);
  line-height: 0.94;
  letter-spacing: -0.03em;
  text-wrap: balance;
}

/* grey accent */
.g {
  color: var(--color-grey);
}

/* intro line under the headline */
.contact-intro {
  margin-top: clamp(20px, 3vw, 32px);
  max-width: 52ch;
  font-size: clamp(15px, 1.3vw, 18px);
  line-height: 1.5;
  color: var(--color-ink-soft);
  font-weight: 500;
}

/* row layout */
.row {
  display: flex;
  flex-wrap: wrap;
  gap: 22px;
  align-items: center;
  margin-top: clamp(34px, 5vw, 56px);
}

/* mail link with orange underline + gap-grows-on-hover */
.mail {
  display: inline-flex;
  align-items: center;
  gap: 14px;
  text-decoration: none;
  color: inherit;
  font-size: clamp(20px, 2.6vw, 38px);
  font-weight: 600;
  letter-spacing: -0.02em;
  border-bottom: 3px solid var(--color-orange);
  padding-bottom: 4px;
  transition: gap 0.3s var(--ease-brand);
}

.mail:hover {
  gap: 24px;
}

/* a11y focus ring */
.mail:focus-visible {
  outline: 2px solid var(--color-orange);
  outline-offset: 2px;
}

.mail-icon {
  width: 0.7em;
  height: 0.7em;
  flex: none;
}
</style>

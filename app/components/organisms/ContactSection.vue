<script setup lang="ts">
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
        Lass uns etwas<br><span class="g">bauen.</span>
      </h2>

      <!-- CTA row with reveal -->
      <div
        :ref="rRow.el"
        class="row"
        :class="{ reveal: true, in: rRow.shown }"
      >
        <a class="mail" href="mailto:hello@mediamundis.de">
          hello@mediamundis.de
          <IconArrow variant="right" class="mail-icon" aria-hidden="true" />
        </a>
        <BasePill to="mailto:hello@mediamundis.de" label="Projekt anfragen" />
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

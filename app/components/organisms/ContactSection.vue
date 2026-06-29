<script setup lang="ts">
const rH2 = useReveal()
const rRow = useReveal()
</script>

<template>
  <!-- demo lines 154-166, 320-332 -->
  <section id="kontakt" class="wrap contact">
    <!-- Contact headline with reveal — demo line 155 + text-contact token -->
    <h2
      :ref="rH2.el"
      :class="{ reveal: true, in: rH2.shown }"
    >
      Lass uns etwas<br><span class="g">bauen.</span>
    </h2>

    <!-- CTA row with reveal — demo lines 157-162 -->
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

    <SiteFooter />
  </section>
</template>

<style scoped>
/* demo lines 154-166, 320-332 */
.contact {
  padding: var(--space-2xl) 0 var(--space-lg);
}

/* demo line 155: text-contact token */
h2 {
  font-weight: 600;
  font-size: var(--text-contact);
  line-height: 0.94;
  letter-spacing: -0.03em;
  text-wrap: balance;
}

/* demo line 156: grey accent */
.g {
  color: var(--color-grey);
}

/* demo line 157: row layout */
.row {
  display: flex;
  flex-wrap: wrap;
  gap: 22px;
  align-items: center;
  margin-top: clamp(34px, 5vw, 56px);
}

/* demo lines 158-162: mail link with orange underline + gap-grows-on-hover */
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

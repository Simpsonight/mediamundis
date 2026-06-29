<script setup lang="ts">
useSeoMeta({
  titleTemplate: '%s · mediamundis',
  // Standard-Fallback-Beschreibung; wird auf Seiten mit eigener Beschreibung überschrieben
  description: 'mediamundis — Software-Manufaktur aus dem Rheinland. Development, Consulting und KI in Produktion für Unternehmen, die den Maßstab setzen.',
  ogType: 'website',
  ogSiteName: 'mediamundis',
  ogLocale: 'de_DE',
});

// Schema.org-Identität (GEO: maschinenlesbare Entität für generative Engines)
useSchemaOrg([
  defineOrganization({
    name: 'mediamundis',
    url: 'https://www.mediamundis.de',
    logo: 'https://www.mediamundis.de/brand/logo.svg',
    email: 'hello@mediamundis.de',
    areaServed: 'Rheinland',
    knowsAbout: ['Software Development', 'Consulting', 'Artificial Intelligence'],
  }),
  defineWebSite({ name: 'mediamundis' }),
  defineWebPage(),
]);
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

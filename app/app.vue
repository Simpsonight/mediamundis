<script setup lang="ts">
useSeoMeta({
  titleTemplate: '%s · mediamundis',
  ogType: 'website',
  ogSiteName: 'mediamundis',
  ogLocale: 'de_DE',
});

// Schema.org-Identität (GEO: maschinenlesbare Entität für generative Engines)
useSchemaOrg([
  defineOrganization({
    name: 'mediamundis',
    url: 'https://www.mediamundis.de',
    // logo: '/og/logo.png', // in Konzeptphase ergänzen
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

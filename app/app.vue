<script setup lang="ts">
useSeoMeta({
  titleTemplate: '%s · mediamundis',
  // Default fallback description; overridden on pages with their own description
  description: 'mediamundis — Softwareentwicklung, Consulting und Künstliche Intelligenz aus dem Rheinland. Verantwortet von Simon Kemmerling, Solution Architect mit über 20 Jahren Erfahrung — für den Mittelstand und als Verstärkung interner Teams.',
  ogType: 'website',
  ogSiteName: 'mediamundis',
  ogLocale: 'de_DE',
});

// Schema.org identity (GEO: machine-readable entities for generative engines).
// Organization = the studio brand; Person = Simon (the responsible expert behind it).
useSchemaOrg([
  defineOrganization({
    name: 'mediamundis',
    url: 'https://www.mediamundis.de',
    logo: 'https://www.mediamundis.de/brand/logo.svg',
    email: 'sk@mediamundis.de',
    areaServed: 'Rheinland',
    knowsAbout: ['Software Development', 'Consulting', 'Artificial Intelligence'],
  }),
  definePerson({
    name: 'Simon Kemmerling',
    jobTitle: 'Senior Fullstack Developer & Solution Architect',
    email: 'sk@mediamundis.de',
    url: 'https://www.mediamundis.de',
    knowsAbout: [
      'Software Development',
      'Consulting',
      'Solution Architecture',
      'Artificial Intelligence',
    ],
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

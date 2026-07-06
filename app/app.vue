<script setup lang="ts">
import { site } from '~/data/site';
import { services } from '~/data/services';

const SITE_URL = 'https://www.mediamundis.de';
const ORG_ID = `${SITE_URL}/#identity`;
const PERSON_ID = `${SITE_URL}/#simon`;
const OG_IMAGE = `${SITE_URL}/og-image.png`;

const sameAs = site.lead.socials.map((s) => s.href);
const { business } = site;

useSeoMeta({
  titleTemplate: '%s · mediamundis',
  // Default fallback description; overridden on pages with their own description
  description: 'mediamundis — Softwareentwicklung, Consulting und Künstliche Intelligenz aus dem Rheinland. Verantwortet von Simon Kemmerling, Solution Architect mit über 20 Jahren Erfahrung — für den Mittelstand und als Verstärkung interner Teams.',
  ogType: 'website',
  ogSiteName: 'mediamundis',
  ogLocale: 'de_DE',
  // Social/GEO share card (1200×630, brand wordmark + Claim)
  ogImage: OG_IMAGE,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageType: 'image/png',
  ogImageAlt: 'mediamundis — Softwareentwicklung, Consulting & KI aus dem Rheinland',
  twitterImage: OG_IMAGE,
  twitterImageAlt: 'mediamundis — Softwareentwicklung, Consulting & KI aus dem Rheinland',
});

// Schema.org identity (GEO: machine-readable entities for generative engines).
// Organization (studio, the site #identity) and Person (Simon) are DISTINCT nodes with
// their own @id and are cross-linked via founder/worksFor — so both survive as separate
// entities instead of merging on a shared #identity.
useSchemaOrg([
  defineOrganization({
    '@id': ORG_ID,
    '@type': ['Organization', 'ProfessionalService'],
    name: 'mediamundis',
    legalName: business.legalName,
    url: SITE_URL,
    logo: `${SITE_URL}/brand/logo-mediamundis.svg`,
    image: OG_IMAGE,
    email: site.email,
    telephone: business.telephone,
    vatID: business.vatID,
    areaServed: business.areaServed,
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.streetAddress,
      postalCode: business.postalCode,
      addressLocality: business.addressLocality,
      addressCountry: business.addressCountry,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: site.email,
      telephone: business.telephone,
      availableLanguage: ['German', 'English'],
    },
    sameAs,
    knowsAbout: ['Software Development', 'Consulting', 'Artificial Intelligence'],
    founder: { '@id': PERSON_ID },
    makesOffer: services.map((s) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: s.title,
        description: s.body,
      },
    })),
  }),
  definePerson({
    '@id': PERSON_ID,
    name: 'Simon Kemmerling',
    jobTitle: 'Senior Fullstack Developer & Solution Architect',
    email: site.email,
    url: SITE_URL,
    image: `${SITE_URL}/s-kemmerling-profil.jpeg`,
    worksFor: { '@id': ORG_ID },
    sameAs,
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

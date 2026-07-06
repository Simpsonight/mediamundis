import type { SiteContent } from './types';

export const site: SiteContent = {
  email: 'sk@mediamundis.de',
  location: 'Rheinland · remote überall',
  // NAP/Firmen-Identität — Single Source für Impressum und Schema.org (GEO/Local-SEO).
  business: {
    legalName: 'Simon Kemmerling',
    streetAddress: 'Auf dem Plägen 2',
    postalCode: '51491',
    addressLocality: 'Overath',
    addressCountry: 'DE',
    telephone: '+49 151 52480017',
    vatID: 'DE219418526',
    areaServed: 'Rheinland',
  },
  navLinks: [
    { href: '#leistungen', label: 'Leistungen' },
    { href: '#arbeitsweise', label: 'Arbeitsweise' },
    { href: '#work', label: 'Projekte' },
    { href: '#ueber-uns', label: 'Über mich' },
  ],
  legalLinks: [
    { href: '/impressum', label: 'Impressum' },
    { href: '/datenschutz', label: 'Datenschutz' },
  ],
  hero: {
    lead: 'Softwareentwicklung, Consulting und ',
    faded: 'KI-gestützte Prozessoptimierung',
    sub: 'Skalierbare digitale Lösungen aus dem Rheinland — mit technischer Verantwortung von der Architektur bis zum produktiven Betrieb. Für anspruchsvolle Softwareprojekte, technische Beratung und die gezielte Verstärkung interner Teams.',
  },
  lead: {
    name: 'Simon Kemmerling',
    role: 'Senior Fullstack Developer & Solution Architect',
    headline:
      'Über 20 Jahre Erfahrung in Softwareentwicklung, Architektur und technischer Beratung',
    primaryHtml:
      'Als Senior Fullstack Developer und Solution Architect unterstütze ich Unternehmen bei der Planung, Architektur und Umsetzung anspruchsvoller Software- und KI-Projekte. Meine Erfahrung reicht von vielen Jahren praktischer Web- und Softwareentwicklung über die technische Leitung komplexer Projekte für namhafte Kunden und Unternehmen bis hin zu Bereichsleitung und Vorstandstätigkeit in einer Digitalagentur. Diese Kombination aus Entwicklungspraxis, Architekturkompetenz und Führungserfahrung bringe ich gezielt in Projekte ein — für fundierte technische Entscheidungen, verlässliche Umsetzung und Beratung auf Augenhöhe. Der Fokus liegt auf skalierbaren Web-Applikationen, technischer Beratung und Künstlicher Intelligenz im produktiven Einsatz.',
    secondary:
      'Im Mittelpunkt stehen belastbare Lösungen statt Präsentationen: klare Architektur, wartbarer Code und Software, die im Betrieb zuverlässig funktioniert. Für größere Vorhaben arbeite ich mit einem festen Netzwerk erfahrener Entwickler zusammen — mit einem zentralen Ansprechpartner und voller Verantwortung.',
    profile:
      '20+ Jahre Praxis · Fullstack Development & Solution Architecture · Schwerpunkte: Web- und Softwareentwicklung, Consulting und KI · Branchenübergreifend — u. a. Industrie, Mittelstand, B2B, Media, Finanzen, Handel, Healthcare und Sport',
    socials: [
      { href: 'https://www.linkedin.com/in/simon-kemmerling/', label: 'LinkedIn' },
      { href: 'https://www.xing.com/profile/Simon_Kemmerling', label: 'Xing' },
      { href: 'https://github.com/Simpsonight', label: 'GitHub' },
    ],
  },
};

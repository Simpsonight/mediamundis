import type { SiteContent } from './types';

export const site: SiteContent = {
  email: 'sk@mediamundis.de',
  location: 'Rheinland · remote überall',
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
    sub: 'Skalierbare digitale Lösungen aus dem Rheinland — entwickelt mit über 20 Jahren Erfahrung in Architektur, Umsetzung und produktivem Betrieb. Für mittelständische Projekte und als gezielte Verstärkung interner Teams.',
  },
  lead: {
    name: 'Simon Kemmerling',
    role: 'Senior Fullstack Developer & Solution Architect',
    headline:
      'Über 20 Jahre Erfahrung in Softwareentwicklung, Architektur und technischer Beratung',
    primaryHtml:
      'Als Senior Fullstack Developer und Solution Architect unterstütze ich Unternehmen bei der Planung, Architektur und Umsetzung anspruchsvoller Software- und KI-Projekte. Meine Erfahrung reicht von vielen Jahren praktischer Web- und Softwareentwicklung über die technische Leitung komplexer Projekte für namhafte Kunden und Unternehmen bis hin zu Bereichsleitung und Vorstandstätigkeit in einer Digitalagentur. Heute arbeite ich selbstständig - mit Fokus auf skalierbare Web-Applikationen, technische Beratung und Künstliche Intelligenz im produktiven Einsatz.',
    secondary:
      'Im Mittelpunkt stehen belastbare Lösungen statt Präsentationen: klare Architektur, wartbarer Code und Software, die im Betrieb zuverlässig funktioniert. Für größere Vorhaben arbeite ich mit einem festen Netzwerk erfahrener Entwickler zusammen — mit einem zentralen Ansprechpartner und voller Verantwortung.',
    profile:
      '20+ Jahre Praxis · Fullstack Development & Solution Architecture · Schwerpunkte: Softwareentwicklung, Consulting und KI · Branchenübergreifend — u. a. Industrie, Mittelstand, B2B, Media, Finanzen, Handel, Healthcare und Sport',
    // TODO: finale Profil-URLs von Simon ergänzen (aktuell Platzhalter).
    socials: [
      { href: '#', label: 'LinkedIn' },
      { href: '#', label: 'Xing' },
      { href: '#', label: 'GitHub' },
    ],
  },
};

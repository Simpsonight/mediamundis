import type { Engagement } from './types';

export const engagements: Engagement[] = [
  {
    id: 'projekt',
    eyebrow: 'Für Projekte',
    title: 'Projektumsetzung',
    body: 'Sie planen eine individuelle Softwarelösung, eine performante Website, einen Onlineshop oder eine KI-Anwendung zur Prozessoptimierung? Ich begleite Ihr Vorhaben von der Konzeption über Architektur und Entwicklung bis zum produktiven Betrieb. Für größere Projekte greife ich auf ein eingespieltes Netzwerk erfahrener Entwickler zurück. Für Sie bleibt die Zusammenarbeit klar und effizient: ein zentraler Ansprechpartner, klare Verantwortung und keine Koordination mehrerer Dienstleister.',
    points: [
      'Individualsoftware & Web-Applikationen',
      'Websites, Performance & technische SEO',
      'KI-Anwendungen, Automatisierung & Prozessoptimierung',
    ],
    cta: { href: '#kontakt', label: 'Projekt anfragen' },
  },
  {
    id: 'verstaerkung',
    eyebrow: 'Für interne Teams',
    title: 'Senior-Verstärkung',
    body: 'Sie benötigen zusätzliche Senior-Kapazität für ein internes Softwareprojekt? Ich unterstütze Ihr Team in Entwicklung, Architektur und technischen Schlüsselentscheidungen — schnell einsatzbereit, verantwortungsvoll und mit Blick auf nachhaltige Strukturen. Qualitätssicherung, Testing und Security werden von Anfang an mitgedacht. Ideal als Freelancer, Interim Lead oder Solution Architect auf Zeit.',
    points: [
      'Senior-Kapazität auf Zeit — Frontend, Fullstack & Embedded Engineering',
      'Solution Architect für Architektur & technische Schlüsselentscheidungen',
      'Interim Tech Lead & temporäre technische Führung',
      'Sparring für Code-Reviews, Requirements Engineering & Mentoring',
    ],
    cta: { href: '#kontakt', label: 'Verstärkung anfragen' },
  },
];

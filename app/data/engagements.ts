import type { Engagement } from './types'

// Zwei gleichwertige Zusammenarbeitsmodelle (Arbeitsweise-Sektion).
export const engagements: Engagement[] = [
  {
    id: 'projekt',
    eyebrow: 'Für den Mittelstand',
    title: 'Projektumsetzung',
    body: 'Sie planen eine individuelle Softwarelösung, eine performante Website oder eine KI-Anwendung für produktive Prozesse? Ich übernehme die technische Umsetzung von der Konzeption über Architektur und Entwicklung bis zum Betrieb. Bei größeren Projekten ergänzt ein eingespieltes Netzwerk erfahrener Entwickler — ein zentraler Ansprechpartner, klare Verantwortung.',
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
    body: 'Sie benötigen zusätzliche Senior-Kapazität für ein internes Softwareprojekt? Ich unterstütze Ihr Team in Entwicklung, Architektur und technischen Schlüsselentscheidungen — schnell einsatzbereit, verantwortungsvoll und mit Blick auf nachhaltige Strukturen. Qualitätssicherung, Testing und Security denke ich von Anfang an mit. Ideal als Freelancer, Interim Lead oder Solution Architect auf Zeit.',
    points: [
      'Senior-Kapazität auf Zeit — Frontend, Fullstack & Embedded Engineering',
      'Solution Architect für Architektur & technische Schlüsselentscheidungen',
      'Interim Tech Lead & temporäre technische Führung',
      'Sparring für Code-Reviews, Requirements Engineering & Mentoring',
    ],
    cta: { href: '#kontakt', label: 'Verstärkung anfragen' },
  },
]

import type { Work } from './types'

// Anonymisierte Projekt-Karten: Branche + Projekt-Typ + Tech/Setting/Ergebnis,
// keine Kundennamen (Vertraulichkeit). Basis: reale Projekte aus dem CV.
//
// Zwei Typen in einer Liste:
//   kind: 'technical' → Software/Consulting ohne öffentliche URL; Stack/Meta ist das Visuelle.
//   kind: 'showcase'  → Live-Web-Referenz mit Screenshot, verlinkt extern auf die Seite.
export const works: Work[] = [
  {
    id: 'video-editing-plattform',
    kind: 'technical',
    eyebrow: 'Media · Broadcast',
    title: 'Browserbasierte Video-Editing-Plattform',
    description: 'Schnitt und Vertonung direkt im Browser, über ein eigens entwickeltes Streaming-Verfahren auf Basis der MediaSource API. Ereignisgesteuerte Frontend-Architektur, angebunden an ein .NET-Streaming-Backend.',
    meta: ['Frontend-Architektur', 'Video-Streaming', 'Angular'],
  },
  {
    id: 'ki-medienanalyse',
    kind: 'technical',
    eyebrow: 'Artificial Intelligence · Media',
    title: 'KI-gestützte Medienanalyse',
    description: 'Automatische Szenenerkennung, Transkription und Metadaten-Anreicherung beschleunigen Recherche und Archivierung großer Videobestände — von der Idee bis zum produktiven, evaluierten Betrieb.',
    meta: ['KI/AI', 'Automatisierung', 'Metadaten'],
  },
  {
    id: 'nocode-webinar-plattform',
    kind: 'technical',
    eyebrow: 'EdTech · No-Code/Low-Code',
    title: 'No-Code Buchungsplattform für Online-Webinare',
    description: 'Webplattform auf Bubble.io mit integriertem Shop zur Buchung und Verwaltung von Online-Webinaren. Sämtliche Prozesse dahinter laufen automatisiert — von der Zahlung über Mollie und der Rechnungsstellung via FastBill bis zu Einladungen, Erinnerungen und Bestätigungen per Zapier-Workflows, flankiert von einem integrierten Hilfesystem.',
    meta: ['No-Code/Low-Code', 'Prozess-Automatisierung', 'Bubble.io'],
  },
  {
    id: 'tarifrechner-core',
    kind: 'technical',
    eyebrow: 'Versicherung · B2B',
    title: 'Konfigurierbarer Tarifrechner-Core',
    description: 'Ein Core, aus dem sich per JSON beliebige Tarifrechner erzeugen lassen — als gekapselte Web-Component (Shadow-DOM) in ein CMS integriert und von Redaktionen selbst konfigurierbar. Automatisierte UI-Tests sichern jede Auslieferung ab.',
    meta: ['Solution Architecture', 'Web-Components', 'Testing'],
  },
  {
    id: 'shop-performance',
    kind: 'technical',
    eyebrow: 'E-Commerce · Retail',
    title: 'Performance-Optimierung im internationalen Shop',
    description: 'Core-Web-Vitals-Programm für einen mehrsprachigen Shop: Mobile-Pagespeed von 30 auf 50, Desktop von 70 auf 90 Punkte — rund 70 % Verbesserung, kontinuierlich im Monitoring überwacht.',
    meta: ['Performance', 'Core Web Vitals', 'technische SEO'],
  },
  {
    id: 'serverless-backend',
    kind: 'technical',
    eyebrow: 'Energie · B2B',
    title: 'Serverless Angebots-Backend',
    description: 'Neu aufgebaute Telesales-Angebotsstrecke auf AWS Lambda und TypeScript: REST-API mit OpenAPI-Dokumentation, automatisierte Angebots- und E-Mail-Prozesse, skalierend ohne Server-Overhead.',
    meta: ['Serverless', 'AWS Lambda', 'REST/OpenAPI'],
  },
  {
    id: 'mobile-ble-app',
    kind: 'technical',
    eyebrow: 'Mobility · IoT',
    title: 'Mobile App mit BLE-Hardwaresteuerung',
    description: 'iOS- und Android-App für ein Fahrradverleihsystem: Steuerung des Schlosses per Bluetooth Low Energy, Geolocation und kilometergenaue Abrechnung — Hardware und App eng verzahnt.',
    meta: ['Mobile', 'Embedded', 'Bluetooth LE'],
  },

  // --- Web-Referenzen (bebildert) ---------------------------------------------
  // Platzhalter-Gerüst: echte Screenshots unter public/references/ ablegen und
  // url/siteName/alt an die reale Seite anpassen. Bildmaße (width/height) auf die
  // gelieferte Datei setzen (Ratio ~16:10) — verhindert Layout-Shift.
  {
    id: 'showcase-beispiel-eins',
    kind: 'showcase',
    eyebrow: 'Web · Corporate',
    title: 'Beispiel-Referenz — Unternehmensseite',
    description: 'Platzhalter: Kurzbeschreibung der Live-Referenz in einer Zeile — was gebaut wurde und welche Wirkung sie hat.',
    meta: ['Webdesign', 'Nuxt', 'CMS'],
    url: 'https://example.com',
    siteName: 'example.com',
    image: { src: '/references/beispiel-eins.png', alt: 'Screenshot der Website Beispiel-Referenz — Unternehmensseite', width: 1280, height: 800 },
  },
  {
    id: 'showcase-beispiel-zwei',
    kind: 'showcase',
    eyebrow: 'Web · E-Commerce',
    title: 'Beispiel-Referenz — Online-Shop',
    description: 'Platzhalter: Kurzbeschreibung der zweiten Live-Referenz in einer Zeile.',
    meta: ['Shop', 'Performance', 'SEO'],
    url: 'https://example.org',
    siteName: 'example.org',
    image: { src: '/references/beispiel-zwei.png', alt: 'Screenshot der Website Beispiel-Referenz — Online-Shop', width: 1280, height: 800 },
  },
]

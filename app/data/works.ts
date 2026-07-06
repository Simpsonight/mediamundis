import type { Work } from './types';

// Anonymisierte Projekt-Karten: Branche + Projekt-Typ + Tech/Setting/Ergebnis,
// keine Kundennamen (Vertraulichkeit). Basis: reale Projekte aus dem CV.
//
// Zwei Typen in einer Liste:
//   kind: 'technical' → Software/Consulting ohne öffentliche URL; Stack/Meta ist das Visuelle.
//   kind: 'showcase'  → Live-Web-Referenz mit Screenshot, verlinkt extern auf die Seite.
//
// GEO-Optimierung: Jede description startet mit dem Kernfakt (Leistung + Tech),
// nennt Entities im Klartext und bleibt bei ~50–70 Wörtern.
export const works: Work[] = [
  {
    id: 'serverless-backend',
    kind: 'technical',
    eyebrow: 'Energie · B2B',
    title: 'Serverless Angebots-Backend',
    description:
      'Serverless-Backend für die neu aufgebaute Telesales-Angebotsstrecke eines B2B-Energieunternehmens — mit Node.js, TypeScript, PostgreSQL und AWS Lambda. Die Lösung umfasst eine dokumentierte REST-API (OpenAPI), automatisierte Angebots- und Double-Opt-In-Mails über AWS sowie sichere Verarbeitung von Nutzerdaten. Das Ergebnis ist eine skalierbare Architektur ohne klassischen Server-Overhead und mit planbaren Betriebskosten.',
    meta: ['Serverless', 'AWS Lambda', 'REST/OpenAPI'],
  },
  {
    id: 'ki-medienanalyse',
    kind: 'technical',
    eyebrow: 'Artificial Intelligence · Media',
    title: 'KI-gestützte Medienanalyse',
    description:
      'Produktionsreife KI-Videoanalyse-Pipeline in Python, umgesetzt und in den laufenden Betrieb eines Medienbetriebs integriert. Automatische Szenenerkennung, Speech-to-Text-Transkription und Metadaten-Anreicherung machen große Medienbestände durchsuchbar und beschleunigen Recherche, Archivierung und Verwertung. Der Umfang reicht von der technischen Evaluation der Modelle über die Workflow-Integration in bestehende Systeme bis zur Begleitung des produktiven Betriebs.',
    meta: ['KI/AI', 'Automatisierung', 'Python'],
  },
  {
    id: 'showcase-beispiel-eins',
    kind: 'showcase',
    eyebrow: 'Projekt · B2B',
    title:
      'Technische Relaunch- und SEO-Begleitung für ein Industrieunternehmen',
    description:
      'Consulting und technische SEO-Betreuung beim Website-Relaunch eines B2B-Industrieunternehmens. Der neue Auftritt verbindet Produktpräsentation, Shop-Funktionen und Anfrageprozesse mit klarem Fokus auf SEO, GEO und SEA-Performance. Verantwortet wurden die technischen und inhaltlichen Rahmenvorgaben — SEO-Struktur, Core Web Vitals, Performance-Anforderungen und die Abstimmung der Dienstleister. Ziel: bessere Auffindbarkeit, effiziente Leadgenerierung und eine belastbare Basis für organische und bezahlte Suche.',
    meta: ['Consulting', 'Performance', 'Core Web Vitals', 'technische SEO'],
    url: 'https://tippkemper.de',
    siteName: 'tippkemper.de',
    image: {
      src: '/references/sample-norsonic-tippkemper.png',
      alt: 'Screenshot der Startseite von tippkemper.de — B2B-Industrieunternehmen',
      width: 1600,
      height: 872,
    },
  },
  {
    id: 'performance-optimization',
    kind: 'technical',
    eyebrow: 'Handel · B2C',
    title: 'Performance-Analyse & Core-Web-Vitals-Optimierung',
    description:
      'Performance-Audit und technisch begleitete Optimierung eines internationalen Onlineshops auf Nuxt-Basis. Bewertet wurden kritische Ladepfade, Rendering, Bundle-Größen und Caching; daraus entstand ein priorisierter Maßnahmenplan. Schwerpunkte waren die Verbesserung von LCP, INP und CLS, Reduktion von JavaScript-Overhead, Code-Splitting, Lazy Loading, Asset-Optimierung und serverseitiges Caching — messbar über kontinuierliches Monitoring der Kern-Kennzahlen.',
    meta: ['Core Web Vitals', 'Optimization', 'Monitoring'],
  },
  {
    id: 'video-editing-plattform',
    kind: 'technical',
    eyebrow: 'Media · Broadcast',
    title: 'Browserbasierte Video-Editing-Plattform',
    description:
      'Professionelles, browserbasiertes Videoschnitt-Tool für den Broadcast-Bereich, konzipiert und umgesetzt mit Angular, MediaSource API und einem .NET-Streaming-Backend. Komplexe Schnitt- und Vertonungsprozesse laufen direkt im Browser — Timeline-Editing, mehrere Video- und Audiospuren, Bild- und Tonblenden sowie frame-genaue Playback-Synchronisation. Im Fokus standen eine performante Streaming-Architektur, ereignisgesteuerte Frontend-Logik, robustes State-Management und die effiziente Verarbeitung großer Mediendaten.',
    meta: ['Frontend-Architektur', 'Video-Streaming', 'Angular'],
  },
  {
    id: 'tarifrechner-core',
    kind: 'technical',
    eyebrow: 'Versicherung · B2C',
    title: 'Konfigurierbarer Tarifrechner-Core',
    description:
      'Modularer Formular- und Tarifrechner-Core für komplexe Versicherungsstrecken. Redaktionen konfigurieren Felder, Validierungen, Inhalte und Logik eigenständig im CMS-Backend; daraus entsteht eine JSON-Struktur, die eine gekapselte Vue-Web-Component auf der Website interpretiert und dynamisch zur Formularstrecke rendert. Automatisierte UI-Tests sichern Qualität und Regressionssicherheit jeder Auslieferung — ohne Entwickler-Eingriff pro Tarifänderung.',
    meta: ['Solution Architecture', 'Web-Components', 'Testing'],
  },
  {
    id: 'cplus',
    kind: 'showcase',
    eyebrow: 'Projekt · E-Commerce',
    title: 'No-Code Buchungsplattform für Online-Webinare',
    description:
      'Automatisierte Webinar-Buchungsplattform auf Bubble.io mit integriertem Shop, Zahlungsabwicklung und durchgängiger Prozessautomatisierung. Die Plattform deckt die komplette Kette ab — Buchung, Teilnehmerverwaltung, Einladungen, Erinnerungen, Bestätigungen und Nachbereitung. Mollie übernimmt Zahlungen, FastBill die automatisierte Rechnungsstellung, Zapier orchestriert die Workflows zwischen den Systemen. Ein integriertes Hilfesystem reduziert manuelle Support- und Administrationsaufwände spürbar.',
    meta: ['No-Code/Low-Code', 'Prozess-Automatisierung', 'Bubble.io'],
    url: 'https://cplus.vetworking.de/',
    siteName: 'cplus.vetworking.de',
    image: {
      src: '/references/sample-cplus.png',
      alt: 'Screenshot der Startseite von cplus.vetworking.de — Webinar-Buchungsplattform',
      width: 1600,
      height: 872,
    },
  },
  {
    id: 'mobile-ble-app',
    kind: 'technical',
    eyebrow: 'Mobility · IoT',
    title: 'Mobile App mit BLE-Hardwaresteuerung',
    description:
      'Crossplattformfähige iOS- und Android-App für ein Bikesharing-System, entwickelt mit NativeScript. Die App verbindet Mobilgerät, Fahrradcomputer und Schloss zu einem integrierten Verleihprozess — Schlosssteuerung per Bluetooth Low Energy, Geolocation und kilometerbasierte Abrechnung. Im Fokus standen die zuverlässige Verzahnung von App und Hardware, stabile BLE-Kommunikation, präzise Standortverarbeitung und eine klare Nutzerführung über den gesamten Leihvorgang.',
    meta: ['Mobile', 'App', 'Bluetooth LE'],
  },
];

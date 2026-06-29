import type { Work } from './types'

export const works: Work[] = [
  {
    id: 'produktions-plattform',
    eyebrow: 'Industrie · IoT',
    title: 'Produktions-Plattform',
    description: 'Echtzeit-Monitoring für über 40 Werke — von Grund auf neu gebaut, in Betrieb seit Tag eins.',
    year: 2024,
    meta: ['Plattform', 'Betrieb'],
    href: '#kontakt',
    mini: { cols: 6, rows: 4, onIndex: 5 },
  },
  {
    id: 'zahlungs-backend',
    eyebrow: 'FinTech',
    title: 'Zahlungs-Backend',
    description: 'Hochverfügbares Payment-System, skaliert auf Millionen Transaktionen pro Tag.',
    year: 2023,
    meta: ['Architektur', 'Development'],
    href: '#kontakt',
    mini: { cols: 6, rows: 4, onIndex: 9 },
  },
  {
    id: 'klinik-saas',
    eyebrow: 'Healthcare',
    title: 'Klinik-SaaS',
    description: 'DSGVO-konforme Patientenplattform mit feingranularem Rollen- und Rechtemodell.',
    year: 2023,
    meta: ['Consulting', 'Development'],
    href: '#kontakt',
    mini: { cols: 6, rows: 4, onIndex: 14 },
  },
  {
    id: 'dokumenten-automatisierung',
    eyebrow: 'Artificial Intelligence',
    title: 'Dokumenten-Automatisierung',
    description: 'RAG-Pipeline, die Sachbearbeitung um 70 % beschleunigt — abgesichert und evaluiert.',
    year: 2025,
    meta: ['AI', 'Automatisierung'],
    href: '#kontakt',
    mini: { cols: 6, rows: 4, onIndex: 18 },
  },
]

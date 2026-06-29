import type { Service } from './types'

const matrix = { cols: 11, rows: 8, onIndex: 57 } as const

export const services: Service[] = [
  {
    id: 'software-development',
    title: 'Software Development',
    body: 'Gute Software läuft. Großartige Software trägt Unternehmen über Jahre — von der Architektur bis zum Betrieb.',
    tags: ['Web & API', 'Cloud-native', 'CI/CD', 'Plattformen'],
    matrix,
  },
  {
    id: 'consulting',
    title: 'Consulting',
    body: 'Wachstum erzeugt Chaos. Wir bringen Strategie, Reviews und Enablement, damit Teams schneller und sicherer liefern.',
    tags: ['Architektur-Reviews', 'Tech-Due-Diligence', 'Team-Enablement'],
    matrix,
  },
  {
    id: 'artificial-intelligence',
    title: 'Artificial Intelligence',
    body: 'KI als Demo ist einfach. KI in Produktion ist die Arbeit — evaluierbar, abgesichert, im Betrieb getestet.',
    tags: ['LLM & RAG', 'Automatisierung', 'Evaluation', 'Guardrails'],
    matrix,
  },
]

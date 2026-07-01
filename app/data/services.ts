import type { Service } from './types';

/**
 * Glyphs are 17×17 dot bitmaps ('#' = icon dot), centered on the grid. Each
 * lights out of the neutral grey dot field as the card scrolls, in a direction
 * that fits the motif.
 */

// </> — code brackets, types in from the top
const codeGlyph = [
  '.................',
  '.................',
  '.................',
  '.................',
  '......#...#......',
  '.....#.....#.....',
  '....#.......#....',
  '...#.........#...',
  '..#...........#..',
  '...#.........#...',
  '....#.......#....',
  '.....#.....#.....',
  '......#...#......',
  '.................',
  '.................',
  '.................',
  '.................',
];

// ↗ — growth arrow (pointed head + bold shaft), rises from the bottom
const growthGlyph = [
  '.................',
  '.................',
  '.................',
  '.................',
  '.......######....',
  '........#####....',
  '.........####....',
  '.........####....',
  '........##.##....',
  '.......##...#....',
  '......##.........',
  '.....##..........',
  '....##...........',
  '...##............',
  '.................',
  '.................',
  '.................',
];

// ✦ — spark, ignites from the center outward
const sparkGlyph = [
  '.................',
  '.................',
  '.................',
  '........#........',
  '........#........',
  '........#........',
  '.......###.......',
  '......#####......',
  '...###########...',
  '......#####......',
  '.......###.......',
  '........#........',
  '........#........',
  '........#........',
  '.................',
  '.................',
  '.................',
];

// ⚡ — bolt (speed/performance), strikes up from the bottom
const boltGlyph = [
  '.................',
  '.................',
  '.................',
  '.........####....',
  '........####.....',
  '.......####......',
  '......####.......',
  '.....#########...',
  '.......####......',
  '......####.......',
  '.....####........',
  '....####.........',
  '...####..........',
  '.................',
  '.................',
  '.................',
  '.................',
];

// ⛨ — shield (quality/security), builds from the center outward
const shieldGlyph = [
  '.................',
  '.................',
  '.................',
  '....#########....',
  '....#########....',
  '....#########....',
  '....#########....',
  '.....#######.....',
  '.....#######.....',
  '......#####......',
  '......#####......',
  '.......###.......',
  '.......###.......',
  '........#........',
  '.................',
  '.................',
  '.................',
];

export const services: Service[] = [
  {
    id: 'software-development',
    title: 'Softwareentwicklung & Individualsoftware',
    body: 'Skalierbare Web-Applikationen, Plattformen und individuelle Softwarelösungen, die langfristig wartbar bleiben — von der Architektur über Entwicklung und Qualitätssicherung bis zum produktiven Betrieb.',
    tags: ['TypeScript', 'Vue/Nuxt', 'Angular', 'React', 'Node.js', 'APIs', 'AWS/Serverless'],
    glyph: codeGlyph,
    reveal: 'top',
  },
  {
    id: 'ki-automatisierung',
    title: 'KI, Automatisierung & Prozessoptimierung',
    body: 'KI schafft Wert, wenn sie zuverlässig in bestehende Prozesse integriert wird. Ich entwickle produktionsreife KI-Anwendungen — von LLM- und RAG-Systemen über KI-gestützte Prozessoptimierung bis zur Automatisierung wiederkehrender Aufgaben.',
    tags: ['LLM & RAG', 'KI-Automatisierung', 'Prozessoptimierung', 'Evaluation', 'Guardrails'],
    glyph: sparkGlyph,
    reveal: 'center',
  },
  {
    id: 'web-performance-seo',
    title: 'Websites, Performance & technische SEO',
    body: 'Schnelle, technisch sauber umgesetzte Websites mit Fokus auf Performance, Core Web Vitals, Barrierefreiheit und nachhaltige SEO-Strukturen — messbar gemacht durch Analysen, Audits und dokumentierte Verbesserungen.',
    tags: ['Nuxt/Next', 'Core Web Vitals', 'technische SEO', 'Performance', 'Barrierefreiheit'],
    glyph: boltGlyph,
    reveal: 'bottom',
  },
  {
    id: 'consulting',
    title: 'IT-Consulting & Solution Architecture',
    body: 'Technische Beratung für komplexe Software- und Digitalprojekte: von Requirements Engineering, Machbarkeitsprüfung und Architekturkonzept bis zu Architektur-Reviews, Tech-Due-Diligence und Team-Enablement.',
    tags: ['Requirements Engineering', 'Solution Architecture', 'Tech-Due-Diligence', 'Architektur-Reviews', 'Team-Enablement'],
    glyph: growthGlyph,
    reveal: 'bottom',
  },
  {
    id: 'qa-security',
    title: 'Qualitätssicherung, Security & Senior Engineering',
    body: 'Senior-Unterstützung für kritische Projekte, technische Schlüsselentscheidungen und nachhaltige Codequalität: Code-Reviews, Testing-Strategien, Security-Bewertungen, Refactoring, Embedded Engineering und temporäre technische Führung.',
    tags: ['Code-Reviews', 'Testing', 'Security', 'Refactoring', 'Embedded Engineering', 'Interim Lead'],
    glyph: shieldGlyph,
    reveal: 'center',
  },
];

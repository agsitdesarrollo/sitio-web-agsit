export type TechnologySolutionLink = {
  href: string;
  cta: string;
};

type TechnologySolutionLinkByLanguage = {
  es: TechnologySolutionLink;
  en: TechnologySolutionLink;
};

const technologySolutionLinks: Record<string, TechnologySolutionLinkByLanguage> = {
  AI: {
    es: {
      href: '/soluciones-tecnologicas/inteligencia-artificial/',
      cta: 'Ver servicios',
    },
    en: {
      href: '/en/technology-solutions/artificial-intelligence/',
      cta: 'View services',
    },
  },
};

export function getTechnologySolutionLink(code: string, language: 'es' | 'en') {
  return technologySolutionLinks[code]?.[language];
}

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
  CONS: {
    es: {
      href: '/soluciones-tecnologicas/consultoria-y-transformacion-tecnologica/',
      cta: 'Ver servicios',
    },
    en: {
      href: '/en/technology-solutions/technology-consulting-and-transformation/',
      cta: 'View services',
    },
  },
  CLOUD: {
    es: {
      href: '/soluciones-tecnologicas/infraestructura-cloud-y-servicios-ti/',
      cta: 'Ver servicios',
    },
    en: {
      href: '/en/technology-solutions/cloud-infrastructure-and-it-services/',
      cta: 'View services',
    },
  },
};

export function getTechnologySolutionLink(code: string, language: 'es' | 'en') {
  return technologySolutionLinks[code]?.[language];
}

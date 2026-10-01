import type { SupportedLang } from '../i18n/ui';

export type ProjectManagementChapter = {
  id: string;
  navLabel: string;
  kind: 'problem' | 'service' | 'method' | 'outcomes';
  term: string;
  title: string;
  copy: string;
  includesLabel?: string;
  includes?: string[];
  steps?: Array<{ title: string; copy: string }>;
  outcomes?: string[];
  imageAlt?: string;
};

export type ProjectManagementDetailContent = {
  slug: string;
  metadata: {
    title: string;
    description: string;
    canonicalUrl: string;
    image: string;
    imageAlt: string;
    htmlLang: string;
    locale: string;
  };
  hero: {
    title: string;
    copy: string;
    primaryCta: string;
    visualLabel: string;
  };
  story: {
    eyebrow: string;
    title: string;
    instruction: string;
    chapters: ProjectManagementChapter[];
  };
};

const origin = 'https://agsit.com.mx';

const projectManagementDetailByLang: Record<SupportedLang, ProjectManagementDetailContent> = {
  es: {
    slug: 'pmo-project-governance',
    metadata: {
      title: 'PMO y Gobierno de Proyectos | AGSIT',
      description:
        'Organiza la dirección de proyectos con una PMO y reglas claras para priorizar iniciativas, coordinar programas y dar seguimiento a los resultados.',
      canonicalUrl: `${origin}/direccion-de-proyectos/pmo-project-governance/`,
      image: '/assets/social/direccion-proyectos-es.jpg',
      imageAlt: 'Dirección de proyectos AGSIT',
      htmlLang: 'es-MX',
      locale: 'es_MX',
    },
    hero: {
      title: 'Tus proyectos necesitan reglas claras para avanzar.',
      copy:
        'Creamos una forma común de priorizar iniciativas, tomar decisiones y revisar avances, para que cada proyecto contribuya a las metas de tu empresa.',
      primaryCta: 'Hablemos de tus proyectos',
      visualLabel: 'Gobierno de proyectos',
    },
    story: {
      eyebrow: 'Un marco para decidir mejor',
      title: 'Alineamos las decisiones desde la PMO hasta cada proyecto.',
      instruction: 'Elige un tema o avanza con el scroll para conocerlo.',
      chapters: [
        {
          id: 'problem',
          navLabel: 'Reto',
          kind: 'problem',
          term: 'El reto',
          title: 'Cuando cada proyecto avanza por su cuenta, se pierde visibilidad.',
          copy:
            'Sin acuerdos compartidos, es difícil saber qué atender primero, quién puede decidir y cómo afecta un cambio a las demás iniciativas. Una dirección común ayuda a elegir mejor y actuar a tiempo.',
        },
        {
          id: 'pmo',
          navLabel: 'PMO',
          kind: 'service',
          term: 'Project Management Office',
          title: 'Una PMO que ayuda a que los proyectos avancen.',
          copy:
            'Definimos cómo se organiza la oficina de proyectos, qué responsabilidades tiene y qué información necesita cada equipo para dar seguimiento.',
          includesLabel: 'La PMO puede ordenar',
          includes: ['Responsables y acuerdos', 'Formas de trabajo comunes', 'Revisión de avances y riesgos'],
          imageAlt: 'Espacio reservado para una imagen sobre la PMO',
        },
        {
          id: 'project-governance',
          navLabel: 'Proy.',
          kind: 'service',
          term: 'Project Governance',
          title: 'Decisiones claras para cada proyecto.',
          copy:
            'Acordamos quién decide, qué debe revisarse y cómo atender bloqueos o cambios antes de que desvíen el trabajo.',
          includesLabel: 'Acordamos contigo',
          includes: ['Roles para decidir y ejecutar', 'Reglas para cambios y riesgos', 'Revisiones con información útil'],
          imageAlt: 'Espacio reservado para una imagen sobre el gobierno de proyectos',
        },
        {
          id: 'portfolio-governance',
          navLabel: 'Port.',
          kind: 'service',
          term: 'Portfolio Governance',
          title: 'Una vista común para elegir qué iniciativas impulsar.',
          copy:
            'Ponemos las iniciativas en perspectiva para compararlas por sus objetivos, valor esperado, recursos y dependencias.',
          includesLabel: 'El portafolio permite',
          includes: ['Comparar iniciativas', 'Acordar prioridades', 'Revisar capacidad y resultados'],
          imageAlt: 'Espacio reservado para una imagen sobre el gobierno de portafolios',
        },
        {
          id: 'program-governance',
          navLabel: 'Prog.',
          kind: 'service',
          term: 'Program Governance',
          title: 'Proyectos relacionados, coordinados como un conjunto.',
          copy:
            'Alineamos proyectos que comparten un objetivo para coordinar sus tiempos, dependencias y decisiones importantes.',
          includesLabel: 'Coordinamos',
          includes: ['Dependencias entre proyectos', 'Acuerdos y responsables', 'Avances hacia un objetivo compartido'],
          imageAlt: 'Espacio reservado para una imagen sobre el gobierno de programas',
        },
        {
          id: 'method',
          navLabel: 'Método',
          kind: 'method',
          term: 'Cómo trabajamos',
          title: 'Un modelo de gobierno que se usa en el trabajo diario.',
          copy:
            'Partimos de cómo se gestionan hoy tus proyectos y ajustamos el modelo a las decisiones que tu organización necesita tomar.',
          steps: [
            { title: 'Revisamos', copy: 'Identificamos iniciativas, responsables y retos.' },
            { title: 'Acordamos', copy: 'Definimos reglas, roles y revisiones.' },
            { title: 'Ponemos en marcha', copy: 'Lo aplicamos con tu equipo y herramientas actuales.' },
            { title: 'Acompañamos', copy: 'Revisamos avances y ajustamos el modelo.' },
          ],
        },
        {
          id: 'outcomes',
          navLabel: 'Result.',
          kind: 'outcomes',
          term: 'Lo que buscamos',
          title: 'Más claridad para elegir, decidir y dar seguimiento.',
          copy: 'Un mismo rumbo ayuda a que los equipos trabajen con prioridades claras y puedan anticipar lo que viene.',
          includesLabel: 'Tu organización gana',
          outcomes: [
            'Prioridades compartidas entre las áreas.',
            'Responsables y decisiones identificables.',
            'Riesgos y dependencias visibles a tiempo.',
            'Avances conectados con las metas del negocio.',
          ],
        },
      ],
    },
  },
  en: {
    slug: 'pmo-project-governance',
    metadata: {
      title: 'PMO & Project Governance | AGSIT',
      description:
        'Organize project delivery with a PMO and clear rules to prioritize initiatives, coordinate programs, and track results.',
      canonicalUrl: `${origin}/en/project-management/pmo-project-governance/`,
      image: '/assets/social/project-management-en.jpg',
      imageAlt: 'AGSIT project management',
      htmlLang: 'en',
      locale: 'en_US',
    },
    hero: {
      title: 'Your projects need clear rules to move forward.',
      copy:
        'We create a shared way to prioritize initiatives, make decisions, and review progress so every project supports your business goals.',
      primaryCta: 'Talk about your projects',
      visualLabel: 'Project governance',
    },
    story: {
      eyebrow: 'A framework for better decisions',
      title: 'We align decisions from the PMO to each project.',
      instruction: 'Choose a topic or scroll to explore it.',
      chapters: [
        {
          id: 'problem',
          navLabel: 'Need',
          kind: 'problem',
          term: 'The challenge',
          title: 'When projects move on their own, visibility gets lost.',
          copy:
            'Without shared agreements, it is hard to know what comes first, who can decide, or how a change affects other initiatives. A common direction helps teams choose well and act in time.',
        },
        {
          id: 'pmo',
          navLabel: 'PMO',
          kind: 'service',
          term: 'Project Management Office',
          title: 'A PMO that helps projects move forward.',
          copy:
            'We define how the project office is organized, what it is responsible for, and what information each team needs to follow progress.',
          includesLabel: 'A PMO can organize',
          includes: ['Owners and agreements', 'Shared ways of working', 'Progress and risk reviews'],
          imageAlt: 'Reserved space for a PMO image',
        },
        {
          id: 'project-governance',
          navLabel: 'Proj.',
          kind: 'service',
          term: 'Project Governance',
          title: 'Clear decisions for every project.',
          copy:
            'We agree on who decides, what to review, and how to handle blockers or changes before they put work off track.',
          includesLabel: 'Together, we define',
          includes: ['Roles for decisions and delivery', 'Rules for changes and risks', 'Reviews with useful information'],
          imageAlt: 'Reserved space for a project governance image',
        },
        {
          id: 'portfolio-governance',
          navLabel: 'Port.',
          kind: 'service',
          term: 'Portfolio Governance',
          title: 'A shared view to choose which initiatives to move forward.',
          copy:
            'We put initiatives into perspective so you can compare their goals, expected value, resources, and dependencies.',
          includesLabel: 'A portfolio helps you',
          includes: ['Compare initiatives', 'Agree on priorities', 'Review capacity and results'],
          imageAlt: 'Reserved space for a portfolio governance image',
        },
        {
          id: 'program-governance',
          navLabel: 'Prog.',
          kind: 'service',
          term: 'Program Governance',
          title: 'Related projects, coordinated as a whole.',
          copy:
            'We align projects that share a goal so their timelines, dependencies, and key decisions stay coordinated.',
          includesLabel: 'We coordinate',
          includes: ['Dependencies between projects', 'Agreements and owners', 'Progress toward a shared goal'],
          imageAlt: 'Reserved space for a program governance image',
        },
        {
          id: 'method',
          navLabel: 'Method',
          kind: 'method',
          term: 'How we work',
          title: 'A governance model your team can use every day.',
          copy:
            'We start with the way your projects are managed today and shape the model around the decisions your organization needs to make.',
          steps: [
            { title: 'Review', copy: 'We identify initiatives, owners, and current challenges.' },
            { title: 'Agree', copy: 'We set clear rules, roles, and reviews.' },
            { title: 'Put it in place', copy: 'We apply it with your team and current tools.' },
            { title: 'Support', copy: 'We review progress and adjust the model.' },
          ],
        },
        {
          id: 'outcomes',
          navLabel: 'Results',
          kind: 'outcomes',
          term: 'What we aim for',
          title: 'More clarity to choose, decide, and follow up.',
          copy: 'A shared direction helps teams work with clear priorities and anticipate what comes next.',
          includesLabel: 'Your organization gains',
          outcomes: [
            'Shared priorities across teams.',
            'Clear owners and decision paths.',
            'Risks and dependencies visible in time.',
            'Progress connected to business goals.',
          ],
        },
      ],
    },
  },
};

const familyPath: Record<SupportedLang, string> = {
  es: '/direccion-de-proyectos/',
  en: '/en/project-management/',
};

export function getProjectManagementDetailContent(lang: SupportedLang) {
  return projectManagementDetailByLang[lang];
}

export function getProjectManagementDetailPages(lang: SupportedLang) {
  return [projectManagementDetailByLang[lang]];
}

export function getProjectManagementDetailPath(lang: SupportedLang, slug: string) {
  return `${familyPath[lang]}${slug}/`;
}

export function getProjectManagementDetailAlternatePath(lang: SupportedLang, slug: string) {
  const otherLang: SupportedLang = lang === 'es' ? 'en' : 'es';
  const currentPage = getProjectManagementDetailPages(lang).find((page) => page.slug === slug);
  const alternatePage = currentPage ? getProjectManagementDetailPages(otherLang).find((page) => page.slug === currentPage.slug) : null;
  return getProjectManagementDetailPath(otherLang, alternatePage?.slug ?? projectManagementDetailByLang[otherLang].slug);
}

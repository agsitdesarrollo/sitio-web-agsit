import type { SupportedLang } from '../i18n/ui';

export type WordToken = {
  text: string;
  emphasis?: 'underline' | 'glow' | 'scale' | 'highlight';
};

export type AboutService = {
  number: string;
  code: string;
  label: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  poster: string;
  alt: string;
  href?: string;
};

export type ClientLogo = {
  label: string;
  src: string;
  /** true = el logo nunca rota (empresas grandes que deben quedarse fijas). */
  pinned?: boolean;
};

export type AboutContent = {
  sectionLabel: string;
  overview: {
    kicker: string;
    title: string;
    titleAccent: string;
    copy: string;
    scroll: string;
  };
  serviceLinkLabel: string;
  services: AboutService[];
  clients: {
    title: string;
    copy: string;
  };
  alliance: {
    titleLabel: string;
    titleLines: string[];
    copy: string;
    metrics: {
      scope: string;
      cost: string;
      time: string;
    };
    cta: string;
  };
};

const commonServices = {
  its: {
    number: '01',
    code: 'ITS',
    label: 'Information Technologies Solutions',
    image: '/assets/videos-servicios/Soluciones%20Tecnologicas.mp4',
    poster: '/assets/videos-servicios/poster-soluciones-tecnologicas.jpg',
  },
  bpm: {
    number: '02',
    code: 'BPM',
    label: 'Business Process Management',
    image: '/assets/videos-servicios/BPM.mp4',
    poster: '/assets/videos-servicios/poster-bpm.jpg',
  },
  dm: {
    number: '03',
    code: 'DM',
    label: 'Digital Marketing',
    image: '/assets/videos-servicios/Video%20Marketing.mp4',
    poster: '/assets/videos-servicios/poster-marketing.jpg',
  },
  pm: {
    number: '04',
    code: 'PM',
    label: 'Project Management',
    image: '/assets/videos-servicios/PMO.mp4',
    poster: '/assets/videos-servicios/poster-pmo.jpg',
  },
  qm: {
    number: '05',
    code: 'QM',
    label: 'Quality Management',
    image: '/assets/servicios.mp4',
  },
  spm: {
    number: '05',
    code: 'SPM',
    label: 'Strategic Planning & Management',
    image: '/assets/videos-servicios/Planeaci%C3%B3n%20Estrategica.mp4',
    poster: '/assets/videos-servicios/poster-planeacion-estrategica.jpg',
  },
} as const;

export const aboutContentByLang: Record<SupportedLang, AboutContent> = {
  es: {
    sectionLabel: 'Quiénes somos',
    overview: {
      kicker: 'Somos una consultoría integral para empresas.',
      title: 'Cinco áreas clave.',
      titleAccent: 'Una sola visión.',
      copy:
        'AGSIT interviene en las áreas estratégicas y tácticas que toda organización necesita para funcionar correctamente, crecer de forma sostenida y maximizar su rentabilidad.',
      scroll: 'Continúa desplazando >>>',
    },
    serviceLinkLabel: 'Ver más servicios',
    services: [
      {
        ...commonServices.its,
        title: 'Soluciones Tecnológicas',
        description:
          'Integramos tecnología, estrategia e innovación para optimizar la operación de tu empresa, acelerar su transformación digital y generar ventajas competitivas que impulsen su crecimiento.',
        tags: ['ITIL', 'Cloud', 'Desarrollo de software', 'IA & Big Data'],
        alt: 'Visual de soluciones tecnológicas',
        href: '/soluciones-tecnologicas/',
      },
      {
        ...commonServices.bpm,
        title: 'Administración de Procesos',
        description:
          'Análisis, documentación y optimización de procesos para mejorar eficiencia, control operativo y rentabilidad.',
        tags: ['AS-IS / TO-BE', 'BPMS Automation', 'KPIs operativos', 'Auditoría'],
        alt: 'Visual de administración de procesos',
        href: '/administracion-de-procesos/',
      },
      {
        ...commonServices.dm,
        title: 'Mercadotecnia Digital',
        description: 'CRM, automatización comercial, campañas, analítica y colaboración para conectar clientes, equipo y resultados.',
        tags: ['CRM', 'Marketing automation', 'Ventas', 'Analytics'],
        alt: 'Visual de mercadotecnia digital',
        href: '/mercadotecnia-digital/',
      },
      {
        ...commonServices.pm,
        title: 'Dirección de Proyectos',
        description:
          'Gestión profesional de proyectos, PMOs y metodologías ágiles o waterfall para cumplir tiempos y presupuesto.',
        tags: ['PMO', 'Scrum & Agile', 'OPM3', 'PMP'],
        alt: 'Visual de dirección de proyectos',
        href: '/direccion-de-proyectos/',
      },
      {
        ...commonServices.spm,
        title: 'Planeación Estratégica',
        description:
          'Definición de objetivos, diagnóstico empresarial, gobierno corporativo y tableros para orientar el crecimiento.',
        tags: ['Plan estratégico', 'Gobierno corporativo', 'KPIs & Dashboards', 'Franquicia'],
        alt: 'Visual de planeación estratégica',
        href: '/planeacion-estrategica/',
      },
    ],
    clients: {
      title: 'Empresas que han confiado en AGSIT.',
      copy:
        'Una muestra de clientes y organizaciones con las que hemos colaborado.',
    },
    alliance: {
      titleLabel: 'Proceso probado. Resultados reales.',
      titleLines: ['Proceso probado.', 'Resultados reales.'],
      copy:
        'Integramos las cinco áreas clave para equilibrar alcance, costo y tiempo con una visión completa de crecimiento empresarial.',
      metrics: {
        scope: 'Alcance',
        cost: 'Costo',
        time: 'Tiempo',
      },
      cta: 'Agenda una asesoría sin costo',
    },
  },
  en: {
    sectionLabel: 'About AGSIT',
    overview: {
      kicker: 'We are an integrated consulting firm for businesses.',
      title: 'Five key areas.',
      titleAccent: 'One clear vision.',
      copy:
        'AGSIT works across the strategic and tactical areas every organization needs to operate correctly, grow sustainably and maximize profitability.',
      scroll: 'Keep scrolling >>>',
    },
    serviceLinkLabel: 'View more services',
    services: [
      {
        ...commonServices.its,
        title: 'Technology Solutions',
        description:
          'We integrate technology, strategy and innovation to optimize your company’s operations, accelerate its digital transformation and generate competitive advantages that drive growth.',
        tags: ['ITIL', 'Cloud', 'Software development', 'AI & Big Data'],
        alt: 'Technology solutions visual',
        href: '/en/technology-solutions/',
      },
      {
        ...commonServices.bpm,
        title: 'Process Management',
        description:
          'Process analysis, documentation and optimization to improve efficiency, operational control and profitability.',
        tags: ['AS-IS / TO-BE', 'BPMS Automation', 'Operational KPIs', 'Auditing'],
        alt: 'Process management visual',
        href: '/en/process-management/',
      },
      {
        ...commonServices.dm,
        title: 'Digital Marketing',
        description: 'CRM, commercial automation, campaigns, analytics and collaboration to connect clients, teams and results.',
        tags: ['CRM', 'Marketing automation', 'Sales', 'Analytics'],
        alt: 'Digital marketing visual',
        href: '/en/digital-marketing/',
      },
      {
        ...commonServices.pm,
        title: 'Project Management',
        description:
          'Professional project management, PMOs and agile or waterfall methodologies to meet timelines and budgets.',
        tags: ['PMO', 'Scrum & Agile', 'OPM3', 'PMP'],
        alt: 'Project management visual',
        href: '/en/project-management/',
      },
      {
        ...commonServices.spm,
        title: 'Strategic Planning',
        description:
          'Objective definition, business diagnosis, corporate governance and dashboards to guide growth.',
        tags: ['Strategic plan', 'Corporate governance', 'KPIs & Dashboards', 'Franchise'],
        alt: 'Strategic planning visual',
        href: '/en/strategic-planning/',
      },
    ],
    clients: {
      title: 'Companies that have trusted AGSIT.',
      copy:
        'A sample of clients and organizations we have worked with.',
    },
    alliance: {
      titleLabel: 'Proven process. Real results.',
      titleLines: ['Proven process.', 'Real results.'],
      copy:
        'We integrate the five key areas to balance scope, cost and time with a complete view of business growth.',
      metrics: {
        scope: 'Scope',
        cost: 'Cost',
        time: 'Time',
      },
      cta: 'Schedule a free consultation',
    },
  },
};

export const aboutServices = aboutContentByLang.es.services;

// ── Cómo configurar la rotación de logos ────────────────────────────────────
// - La rejilla muestra los primeros 15 del array; los que están después son la
//   reserva y van entrando en rotación (un cambio cada CLIENT_LOGO_ROTATION_MS,
//   definido en AboutHorizontalSection.astro).
// - `pinned: true` en cualquiera de los primeros 15 = ese lugar nunca rota
//   (empresas grandes). Los demás lugares se van intercambiando con la reserva.
// - Para que un logo NO fijo aparezca "más tiempo", inclúyelo dos veces en la
//   reserva: pasará por la rejilla el doble de seguido.
// - Con 15 logos o menos no hay rotación (no hay reserva).
export const clientLogos: ClientLogo[] = [
  { label: '01', src: '/assets/client-logos/client-01.png' },
  { label: '02', src: '/assets/client-logos/client-02.png' },
  { label: '03', src: '/assets/client-logos/client-03.png' },
  { label: '04', src: '/assets/client-logos/client-04.png' },
  { label: '05', src: '/assets/client-logos/client-05.webp' },
  { label: '06', src: '/assets/client-logos/client-06.png' },
  { label: '07', src: '/assets/client-logos/client-07.jpg' },
  { label: '08', src: '/assets/client-logos/client-08.jpg' },
  { label: '09', src: '/assets/client-logos/client-09.jpg' },
  { label: '10', src: '/assets/client-logos/client-10.jpg' },
  { label: '11', src: '/assets/client-logos/client-11.jpg' },
  { label: '12', src: '/assets/client-logos/client-12.jpg' },
  { label: '13', src: '/assets/client-logos/client-13.jpg' },
  { label: '14', src: '/assets/client-logos/client-14.webp' },
  { label: '15', src: '/assets/client-logos/client-15.webp' },
];

export function getAboutContent(lang: SupportedLang) {
  return aboutContentByLang[lang];
}

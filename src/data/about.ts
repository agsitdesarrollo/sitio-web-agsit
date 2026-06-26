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
  alt: string;
  href?: string;
};

export type ClientLogo = {
  label: string;
  src: string;
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
    image: '/assets/soluciones-tecnologicas.webm',
  },
  bpm: {
    number: '02',
    code: 'BPM',
    label: 'Business Process Management',
    image: '/assets/BPM (1) (1) (1).mp4',
  },
  dm: {
    number: '03',
    code: 'DM',
    label: 'Digital Marketing',
    image: '/assets/servicios.webm',
  },
  pm: {
    number: '04',
    code: 'PM',
    label: 'Project Management',
    image: '/assets/servicios.webm',
  },
  qm: {
    number: '05',
    code: 'QM',
    label: 'Quality Management',
    image: '/assets/servicios.webm',
  },
  spm: {
    number: '05',
    code: 'SPM',
    label: 'Strategic Planning & Management',
    image: '/assets/servicios.webm',
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
          'Arquitectura, software, infraestructura, inteligencia artificial y ciberseguridad para acelerar la transformación digital.',
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
      },
      {
        ...commonServices.spm,
        title: 'Planeación Estratégica',
        description:
          'Definición de objetivos, diagnóstico empresarial, gobierno corporativo y tableros para orientar el crecimiento.',
        tags: ['Plan estratégico', 'Gobierno corporativo', 'KPIs & Dashboards', 'Franquicia'],
        alt: 'Visual de planeación estratégica',
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
          'Architecture, software, infrastructure, artificial intelligence and cybersecurity to accelerate digital transformation.',
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
      },
      {
        ...commonServices.spm,
        title: 'Strategic Planning',
        description:
          'Objective definition, business diagnosis, corporate governance and dashboards to guide growth.',
        tags: ['Strategic plan', 'Corporate governance', 'KPIs & Dashboards', 'Franchise'],
        alt: 'Strategic planning visual',
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

export const clientLogos: ClientLogo[] = [
  { label: '01', src: 'https://agsit.com.mx/wp-content/uploads/2023/01/imageedit_6_4472145671.png' },
  { label: '02', src: 'https://agsit.com.mx/wp-content/uploads/2023/01/imageedit_3_3365397207.png' },
  { label: '03', src: 'https://agsit.com.mx/wp-content/uploads/2023/01/imageedit_13_6856746062.png' },
  { label: '04', src: 'https://agsit.com.mx/wp-content/uploads/2023/03/Elektra.png' },
  { label: '05', src: 'https://agsit.com.mx/wp-content/uploads/2023/05/imageedit_2_7727411694-1024x527.webp' },
  { label: '06', src: 'https://agsit.com.mx/wp-content/uploads/2023/11/CarolinaHerreraLogo.png' },
  { label: '07', src: 'https://agsit.com.mx/wp-content/uploads/2020/04/Alebrije-1.jpg' },
  { label: '08', src: 'https://agsit.com.mx/wp-content/uploads/2020/04/Alsea-1.jpg' },
  { label: '09', src: 'https://agsit.com.mx/wp-content/uploads/2020/04/Gobierno_CDMX-1.jpg' },
  { label: '10', src: 'https://agsit.com.mx/wp-content/uploads/2020/04/AutomationSolutionsFactory-1.jpg' },
  {
    label: '11',
    src: 'https://agsit.com.mx/wp-content/uploads/2020/04/Seguridad-en-arrendamiento-y-adquisiciones-1.jpg',
  },
  { label: '12', src: 'https://agsit.com.mx/wp-content/uploads/2020/04/SUMA_empresarial-1.jpg' },
  { label: '13', src: 'https://agsit.com.mx/wp-content/uploads/2020/04/Tubepol-1.jpg' },
  { label: '14', src: 'https://agsit.com.mx/wp-content/uploads/2021/11/VC-Logo.webp' },
  { label: '15', src: 'https://agsit.com.mx/wp-content/uploads/2021/11/AGSIT-Aldrete-Asociados-1.webp' },
];

export function getAboutContent(lang: SupportedLang) {
  return aboutContentByLang[lang];
}

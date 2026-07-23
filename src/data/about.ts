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
  linkLabel: string;
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
    number: '03',
    code: 'BPM',
    label: 'Business Process Management',
    image: '/assets/videos-servicios/BPM.mp4',
    poster: '/assets/videos-servicios/poster-bpm.jpg',
  },
  dm: {
    number: '02',
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
      title: 'Cinco áreas estratégicas.',
      titleAccent: 'Un solo aliado para tu empresa',
      copy:
        'Diseñamos e implementamos soluciones a la medida que potencian tu empresa, garantizando un crecimiento sostenido, escalable y eficiente.',
      scroll: 'Continúa desplazando >>>',
    },
    services: [
      {
        ...commonServices.its,
        title: 'Desarrollo de Software',
        description:
          'Fusionamos visión estratégica y capacidad digital para evolucionar el modelo operativo de tu empresa, elevar su eficiencia y consolidar una ventaja competitiva sostenible.',
        tags: ['Software', 'Business Platforms', 'Automation', 'Data & Analytics', 'AI', 'Consulting', 'Cloud'],
        linkLabel: 'Explorar Servicios ITS',
        alt: 'Visual de soluciones tecnológicas',
        href: '/soluciones-tecnologicas/',
      },
      {
        ...commonServices.dm,
        title: 'Marketing Digital',
        description:
          'Diseñamos e implementamos estrategias de atracción y conversión que aceleran la generación de prospectos calificados, posicionan tu marca y potencian el crecimiento de tu empresa.',
        tags: ['Growth', 'SEO', 'Ads', 'Content', 'Ecommerce', 'Analytics'],
        linkLabel: 'Explorar Servicios DM',
        alt: 'Visual de mercadotecnia digital',
        href: '/marketing-digital/',
      },
      {
        ...commonServices.bpm,
        title: 'Gestión Estratégica de Procesos',
        description:
          'Convertimos la operación de tu empresa en un sistema ordenado, ágil y estandarizado que optimiza el uso de recursos, minimiza el margen de error y potencia el desempeño de tu organización.',
        tags: ['Process Design', 'Process Automation', 'Process Intelligence', 'Operational Excellence', 'Process Assessment'],
        linkLabel: 'Explorar Servicios BPM',
        alt: 'Visual de administración de procesos',
        href: '/gestion-estrategica-de-procesos/',
      },
      {
        ...commonServices.pm,
        title: 'Dirección de Proyectos',
        description:
          'Lideramos la dirección de tus proyectos en cualquier etapa de su ciclo de vida, integrando una estructura clara que previene retrasos, acelera la ejecución y garantiza el control de los resultados.',
        tags: ['Governance', 'Delivery', 'Agile', 'Recovery', 'Assessment'],
        linkLabel: 'Explorar Servicios PM',
        alt: 'Visual de dirección de proyectos',
        href: '/direccion-de-proyectos/',
      },
      {
        ...commonServices.spm,
        title: 'Planeación Estratégica',
        description:
          'Definimos el rumbo estratégico de la organización y alineamos a sus equipos para convertir la visión ejecutiva en un crecimiento sólido y constante.',
        tags: ['Strategy', 'Assessment', 'Governance', 'Growth', 'Transformation'],
        linkLabel: 'Explorar Servicios SPM',
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
      title: 'Five strategic areas.',
      titleAccent: 'One partner for your business',
      copy:
        'We design and implement tailored solutions that empower your business, ensuring sustainable, scalable and efficient growth.',
      scroll: 'Keep scrolling >>>',
    },
    services: [
      {
        ...commonServices.its,
        title: 'Software Development',
        description:
          'We combine strategic vision and digital capabilities to evolve your company’s operating model, increase efficiency and build a sustainable competitive advantage.',
        tags: ['Software', 'Business Platforms', 'Automation', 'Data & Analytics', 'AI', 'Consulting', 'Cloud'],
        linkLabel: 'Explore ITS Services',
        alt: 'Technology solutions visual',
        href: '/en/technology-solutions/',
      },
      {
        ...commonServices.dm,
        title: 'Digital Marketing',
        description:
          'We design and implement attraction and conversion strategies that accelerate qualified lead generation, position your brand and fuel your company’s growth.',
        tags: ['Growth', 'SEO', 'Ads', 'Content', 'Ecommerce', 'Analytics'],
        linkLabel: 'Explore DM Services',
        alt: 'Digital marketing visual',
        href: '/en/digital-marketing/',
      },
      {
        ...commonServices.bpm,
        title: 'Strategic Process Management',
        description:
          'We turn your company’s operation into an organized, agile and standardized system that optimizes resource use, minimizes the margin for error and strengthens your organization’s performance.',
        tags: ['Process Design', 'Process Automation', 'Process Intelligence', 'Operational Excellence', 'Process Assessment'],
        linkLabel: 'Explore BPM Services',
        alt: 'Process management visual',
        href: '/en/strategic-process-management/',
      },
      {
        ...commonServices.pm,
        title: 'Project Management',
        description:
          'We lead your projects at every stage of their life cycle, integrating a clear structure that prevents delays, accelerates execution and ensures control over results.',
        tags: ['Governance', 'Delivery', 'Agile', 'Recovery', 'Assessment'],
        linkLabel: 'Explore PM Services',
        alt: 'Project management visual',
        href: '/en/project-management/',
      },
      {
        ...commonServices.spm,
        title: 'Strategic Planning',
        description:
          'We define your organization’s strategic direction and align its teams to turn executive vision into solid, consistent growth.',
        tags: ['Strategy', 'Assessment', 'Governance', 'Growth', 'Transformation'],
        linkLabel: 'Explore SPM Services',
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

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
  tags: { label: string; href?: string }[];
  linkLabel: string;
  image: string;
  poster: string;
  alt: string;
  href?: string;
};

export type ClientLogoPriority = 'A' | 'M' | 'B';

export type ClientLogo = {
  label: string;
  src: string;
  priority: ClientLogoPriority;
};

export type AboutContent = {
  sectionLabel: string;
  overview: {
    kicker: string;
    title: string;
    titleAccent: string;
    copy: string;
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

type ServiceTagDefinition = {
  label: string;
  published: boolean;
  routes?: Record<SupportedLang, string>;
};

// Al publicar la terciaria en main, cambia published a true; si falta, agrega antes su par de rutas.
const serviceTagCatalog: Record<string, ServiceTagDefinition[]> = {
  its: [
    { label: 'Software', published: true, routes: { es: '/soluciones-tecnologicas/desarrollo-de-software/', en: '/en/technology-solutions/software-development/' } },
    { label: 'Business Platforms', published: true, routes: { es: '/soluciones-tecnologicas/plataforma-empresarial-inteligente/', en: '/en/technology-solutions/intelligent-enterprise-platform/' } },
    { label: 'Automation', published: true, routes: { es: '/soluciones-tecnologicas/automatizacion-inteligente-de-procesos/', en: '/en/technology-solutions/intelligent-process-automation/' } },
    { label: 'Data & Analytics', published: true, routes: { es: '/soluciones-tecnologicas/ingenieria-de-datos-y-analitica-estrategica/', en: '/en/technology-solutions/data-engineering-and-strategic-analytics/' } },
    { label: 'AI', published: true, routes: { es: '/soluciones-tecnologicas/inteligencia-artificial/', en: '/en/technology-solutions/artificial-intelligence/' } },
    { label: 'Consulting', published: true, routes: { es: '/soluciones-tecnologicas/consultoria-y-transformacion-tecnologica/', en: '/en/technology-solutions/technology-consulting-and-transformation/' } },
    { label: 'Cloud', published: true, routes: { es: '/soluciones-tecnologicas/infraestructura-cloud-y-servicios-ti/', en: '/en/technology-solutions/cloud-infrastructure-and-it-services/' } },
  ],
  dm: [
    { label: 'Growth', published: true, routes: { es: '/marketing-digital/growth-marketing-y-estrategia-digital/', en: '/en/digital-marketing/growth-marketing-and-digital-strategy/' } },
    { label: 'SEO', published: true, routes: { es: '/marketing-digital/posicionamiento-organico-seo/', en: '/en/digital-marketing/organic-search-positioning-seo/' } },
    { label: 'Ads', published: true, routes: { es: '/marketing-digital/publicidad-digital/', en: '/en/digital-marketing/digital-advertising/' } },
    { label: 'Content', published: true, routes: { es: '/marketing-digital/content-marketing-social-media/', en: '/en/digital-marketing/content-marketing-social-media/' } },
    { label: 'Ecommerce', published: true, routes: { es: '/marketing-digital/estrategia-ecommerce/', en: '/en/digital-marketing/ecommerce-strategy/' } },
    { label: 'Analytics', published: true, routes: { es: '/marketing-digital/analytics-cro/', en: '/en/digital-marketing/analytics-cro/' } },
  ],
  bpm: [
    { label: 'Process Design', published: true, routes: { es: '/administracion-de-procesos/modelado-y-optimizacion-de-procesos/', en: '/en/process-management/process-modeling-and-optimization/' } },
    { label: 'Process Automation', published: true, routes: { es: '/administracion-de-procesos/automatizacion-inteligente-de-procesos/', en: '/en/process-management/intelligent-process-automation/' } },
    { label: 'Process Intelligence', published: true, routes: { es: '/administracion-de-procesos/inteligencia-y-gobierno-de-procesos/', en: '/en/process-management/process-intelligence-and-governance/' } },
    { label: 'Operational Excellence', published: true, routes: { es: '/administracion-de-procesos/excelencia-operativa/', en: '/en/process-management/operational-excellence/' } },
    { label: 'Process Assessment', published: true, routes: { es: '/administracion-de-procesos/diagnostico-y-auditoria-de-procesos/', en: '/en/process-management/process-diagnosis-and-audit/' } },
  ],
  pm: [
    { label: 'Governance', published: false, routes: { es: '/direccion-de-proyectos/pmo-y-gobierno-de-proyectos/', en: '/en/project-management/pmo-project-governance/' } },
    { label: 'Delivery', published: false, routes: { es: '/direccion-de-proyectos/direccion-estrategica-de-proyectos/', en: '/en/project-management/strategic-project-delivery/' } },
    { label: 'Agile', published: false, routes: { es: '/direccion-de-proyectos/gestion-agil-de-proyectos/', en: '/en/project-management/agile-project-delivery/' } },
    { label: 'Recovery', published: false, routes: { es: '/direccion-de-proyectos/auditoria-y-recuperacion-de-proyectos/', en: '/en/project-management/project-audit-and-recovery/' } },
    { label: 'Assessment', published: false, routes: { es: '/direccion-de-proyectos/diagnostico-y-madurez-en-gestion-de-proyectos/', en: '/en/project-management/project-management-assessment-and-maturity/' } },
  ],
  spm: [
    { label: 'Strategy', published: true, routes: { es: '/planeacion-estrategica/planeacion-estrategica-corporativa/', en: '/en/strategic-planning/corporate-strategic-planning/' } },
    { label: 'Assessment', published: true, routes: { es: '/planeacion-estrategica/diagnostico-estrategico/', en: '/en/strategic-planning/strategic-assessment/' } },
    { label: 'Governance', published: true, routes: { es: '/planeacion-estrategica/gobierno-corporativo/', en: '/en/strategic-planning/corporate-governance/' } },
    { label: 'Growth', published: false },
    { label: 'Transformation', published: false },
  ],
};

function getServiceTags(area: string, lang: SupportedLang): AboutService['tags'] {
  return serviceTagCatalog[area].map((tag) => ({
    label: tag.label,
    href: tag.published ? tag.routes?.[lang] : undefined,
  }));
}

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
    },
    services: [
      {
        ...commonServices.its,
        title: 'Soluciones Tecnológicas',
        description:
          'Fusionamos visión estratégica y capacidad digital para evolucionar el modelo operativo de tu empresa, elevar su eficiencia y consolidar una ventaja competitiva sostenible.',
        tags: getServiceTags('its', 'es'),
        linkLabel: 'Explorar Servicios ITS',
        alt: 'Visual de soluciones tecnológicas',
        href: '/soluciones-tecnologicas/',
      },
      {
        ...commonServices.dm,
        title: 'Marketing Digital',
        description:
          'Diseñamos e implementamos estrategias de atracción y conversión que aceleran la generación de prospectos calificados, posicionan tu marca y potencian el crecimiento de tu empresa.',
        tags: getServiceTags('dm', 'es'),
        linkLabel: 'Explorar Servicios DM',
        alt: 'Visual de mercadotecnia digital',
        href: '/marketing-digital/',
      },
      {
        ...commonServices.bpm,
        title: 'Administración de Procesos',
        description:
          'Convertimos la operación de tu empresa en un sistema ordenado, ágil y estandarizado que optimiza el uso de recursos, minimiza el margen de error y potencia el desempeño de tu organización.',
        tags: getServiceTags('bpm', 'es'),
        linkLabel: 'Explorar Servicios BPM',
        alt: 'Visual de administración de procesos',
        href: '/administracion-de-procesos/',
      },
      {
        ...commonServices.pm,
        title: 'Dirección de Proyectos',
        description:
          'Lideramos la dirección de tus proyectos en cualquier etapa de su ciclo de vida, integrando una estructura clara que previene retrasos, acelera la ejecución y garantiza el control de los resultados.',
        tags: getServiceTags('pm', 'es'),
        linkLabel: 'Explorar Servicios PM',
        alt: 'Visual de dirección de proyectos',
        href: '/direccion-de-proyectos/',
      },
      {
        ...commonServices.spm,
        title: 'Planeación Estratégica',
        description:
          'Definimos el rumbo estratégico de la organización y alineamos a sus equipos para convertir la visión ejecutiva en un crecimiento sólido y constante.',
        tags: getServiceTags('spm', 'es'),
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
    },
    services: [
      {
        ...commonServices.its,
        title: 'Technology Solutions',
        description:
          'We combine strategic vision and digital capabilities to evolve your company’s operating model, increase efficiency and build a sustainable competitive advantage.',
        tags: getServiceTags('its', 'en'),
        linkLabel: 'Explore ITS Services',
        alt: 'Technology solutions visual',
        href: '/en/technology-solutions/',
      },
      {
        ...commonServices.dm,
        title: 'Digital Marketing',
        description:
          'We design and implement attraction and conversion strategies that accelerate qualified lead generation, position your brand and fuel your company’s growth.',
        tags: getServiceTags('dm', 'en'),
        linkLabel: 'Explore DM Services',
        alt: 'Digital marketing visual',
        href: '/en/digital-marketing/',
      },
      {
        ...commonServices.bpm,
        title: 'Process Management',
        description:
          'We turn your company’s operation into an organized, agile and standardized system that optimizes resource use, minimizes the margin for error and strengthens your organization’s performance.',
        tags: getServiceTags('bpm', 'en'),
        linkLabel: 'Explore BPM Services',
        alt: 'Process management visual',
        href: '/en/process-management/',
      },
      {
        ...commonServices.pm,
        title: 'Project Management',
        description:
          'We lead your projects at every stage of their life cycle, integrating a clear structure that prevents delays, accelerates execution and ensures control over results.',
        tags: getServiceTags('pm', 'en'),
        linkLabel: 'Explore PM Services',
        alt: 'Project management visual',
        href: '/en/project-management/',
      },
      {
        ...commonServices.spm,
        title: 'Strategic Planning',
        description:
          'We define your organization’s strategic direction and align its teams to turn executive vision into solid, consistent growth.',
        tags: getServiceTags('spm', 'en'),
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

// Los logos se mantienen en orden numérico dentro de cada prioridad:
// A (alta), M (media) y B (baja). La letra solo controla la rotación y no se
// muestra en la interfaz.
export const clientLogos: ClientLogo[] = [
  { label: '01', priority: 'A', src: '/assets/client-logos/Cliente 01_ A.png' },
  { label: '02', priority: 'A', src: '/assets/client-logos/Cliente 02 _ A.png' },
  { label: '03', priority: 'A', src: '/assets/client-logos/Cliente 03 _ A.png' },
  { label: '04', priority: 'A', src: '/assets/client-logos/Cliente 04 _ A.png' },
  { label: '05', priority: 'A', src: '/assets/client-logos/Cliente 05_ A.png' },
  { label: '06', priority: 'A', src: '/assets/client-logos/Cliente 06_ A.png.svg' },
  { label: '07', priority: 'A', src: '/assets/client-logos/Cliente 07_ A.png' },
  { label: '08', priority: 'A', src: '/assets/client-logos/Cliente 08 _ A.png' },
  { label: '09', priority: 'A', src: '/assets/client-logos/Cliente 09 _ A.png' },
  { label: '10', priority: 'A', src: '/assets/client-logos/Cliente 10 _ A.png' },
  { label: '11', priority: 'A', src: '/assets/client-logos/Cliente 11 _ A.png' },
  { label: '12', priority: 'A', src: '/assets/client-logos/Cliente 12 _ A.png' },
  { label: '13', priority: 'A', src: '/assets/client-logos/Cliente 13 _ A.png' },
  { label: '14', priority: 'A', src: '/assets/client-logos/Cliente 14 _ A.png.jpg' },
  { label: '15', priority: 'A', src: '/assets/client-logos/Cliente 15 _ A.png' },
  { label: '16', priority: 'A', src: '/assets/client-logos/Cliente 16 _ A.png' },
  { label: '17', priority: 'A', src: '/assets/client-logos/Cliente 17 _ A.png' },
  { label: '18', priority: 'A', src: '/assets/client-logos/Cliente 18 _ A.png.jpg' },
  { label: '19', priority: 'A', src: '/assets/client-logos/Cliente 19_ A.png' },
  { label: '20', priority: 'A', src: '/assets/client-logos/Cliente 20_ A.png' },
  { label: '21', priority: 'A', src: '/assets/client-logos/Cliente 21_ A.png' },
  { label: '22', priority: 'A', src: '/assets/client-logos/Cliente 22_ A.png.svg' },
  { label: '23', priority: 'M', src: '/assets/client-logos/Cliente 23_ M.png.svg.png' },
  { label: '24', priority: 'M', src: '/assets/client-logos/Cliente 24_ M.png.svg.png' },
  { label: '25', priority: 'M', src: '/assets/client-logos/Cliente 25_ M.png.svg.png' },
  { label: '26', priority: 'M', src: '/assets/client-logos/Cliente 26_ M.png.svg.png' },
  { label: '27', priority: 'M', src: '/assets/client-logos/Cliente 27_ M.png.svg.png.jpg' },
  { label: '28', priority: 'M', src: '/assets/client-logos/Cliente 28_ M.png.svg.png' },
  { label: '29', priority: 'M', src: '/assets/client-logos/Cliente 29_ M.png.svg.png.jpg' },
  { label: '30', priority: 'M', src: '/assets/client-logos/Cliente 30_ M.png.svg.png' },
  { label: '31', priority: 'M', src: '/assets/client-logos/Cliente 31_ M.png.svg.png' },
  { label: '32', priority: 'M', src: '/assets/client-logos/Cliente 32_ M.png.svg.png' },
  { label: '33', priority: 'M', src: '/assets/client-logos/Cliente 33_ M.png.svg.png' },
  { label: '34', priority: 'M', src: '/assets/client-logos/Cliente 34_ M.png.svg.png' },
  { label: '35', priority: 'M', src: '/assets/client-logos/Cliente 35_ M.png.svg.png' },
  { label: '36', priority: 'M', src: '/assets/client-logos/Cliente 36_ M.png.svg.png' },
  { label: '37', priority: 'M', src: '/assets/client-logos/Cliente 37_ M.png.svg.png' },
  { label: '38', priority: 'B', src: '/assets/client-logos/Cliente 38_ B.png.svg.png' },
  { label: '39', priority: 'B', src: '/assets/client-logos/Cliente 39_ B.png.svg.png' },
  { label: '40', priority: 'B', src: '/assets/client-logos/Cliente 40_ B.png.svg.png' },
  { label: '41', priority: 'B', src: '/assets/client-logos/Cliente 41_ B.png.svg.png' },
  { label: '42', priority: 'B', src: '/assets/client-logos/Cliente 42_ B.png.svg.png' },
  { label: '43', priority: 'B', src: '/assets/client-logos/Cliente 43_ B.png.svg.png' },
  { label: '44', priority: 'B', src: '/assets/client-logos/Cliente 44 _ B.png.svg.png.jpg' },
  { label: '45', priority: 'B', src: '/assets/client-logos/Cliente 45_ B.png.svg.png' },
  { label: '46', priority: 'B', src: '/assets/client-logos/Cliente 46_ B.png.svg.png' },
  { label: '47', priority: 'B', src: '/assets/client-logos/Cliente 47_ B.png.svg.png' },
  { label: '48', priority: 'B', src: '/assets/client-logos/Cliente 48_ B.png.svg.png' },
  { label: '49', priority: 'B', src: '/assets/client-logos/Cliente 49 _ B.png.svg.png.jpg' },
  { label: '50', priority: 'B', src: '/assets/client-logos/Cliente 50_ B.png.svg' },
  { label: '51', priority: 'B', src: '/assets/client-logos/Cliente 51 _ B.png.svg.png.jpg' },
  { label: '52', priority: 'B', src: '/assets/client-logos/Cliente 52_ B.png.svg.png' },
  { label: '53', priority: 'B', src: '/assets/client-logos/Cliente 53_ B.png.svg' },
  { label: '54', priority: 'B', src: '/assets/client-logos/Cliente 54_ B.png.svg.png' },
  { label: '55', priority: 'B', src: '/assets/client-logos/Cliente 55_ B.png.svg.png' },
  { label: '56', priority: 'B', src: '/assets/client-logos/Cliente 56_ B.png.svg.png' },
  { label: '57', priority: 'B', src: '/assets/client-logos/Cliente 57_ B.png.svg.png' },
  { label: '58', priority: 'B', src: '/assets/client-logos/Cliente 58_ B.png.svg.png' },
  { label: '59', priority: 'B', src: '/assets/client-logos/Cliente 59_ B.png.svg.png' },
  { label: '60', priority: 'B', src: '/assets/client-logos/Cliente 60_ B.png.svg.png' },
  { label: '61', priority: 'B', src: '/assets/client-logos/Cliente 61_ B.png.svg.png' },
  { label: '62', priority: 'B', src: '/assets/client-logos/Cliente 62_ B.png.svg.png' },
  { label: '63', priority: 'B', src: '/assets/client-logos/Cliente 63_ B.png.svg.png' },
];

export function getAboutContent(lang: SupportedLang) {
  return aboutContentByLang[lang];
}

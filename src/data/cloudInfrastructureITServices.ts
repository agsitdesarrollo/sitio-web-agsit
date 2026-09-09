import type { SupportedLang } from '../i18n/ui';
import type {
  TechnologySolutionBenefitsContent,
  TechnologySolutionHeroContent,
  TechnologySolutionJourneyContent,
} from '../components/technology-solution-detail/types';

export type CloudInfrastructureITServicesContent = {
  metadata: {
    title: string;
    description: string;
    canonicalUrl: string;
    htmlLang: string;
    locale: string;
  };
  hero: TechnologySolutionHeroContent;
  benefits: TechnologySolutionBenefitsContent;
  journey: TechnologySolutionJourneyContent;
};

export const cloudInfrastructureITServicesByLang: Record<
  SupportedLang,
  CloudInfrastructureITServicesContent
> = {
  es: {
    metadata: {
      title: 'Infraestructura Cloud y Servicios TI | AGSIT',
      description:
        'Servicios de cloud computing, servidores, bases de datos, DevOps, ITIL, soporte e infraestructura TI para empresas.',
      canonicalUrl:
        'https://agsit.com.mx/soluciones-tecnologicas/infraestructura-cloud-y-servicios-ti/',
      htmlLang: 'es-MX',
      locale: 'es_MX',
    },
    hero: {
      eyebrow: 'Infraestructura cloud y servicios TI',
      title: 'Construye una infraestructura',
      titleAccent: 'estable, segura y preparada para crecer.',
      copy:
        'Diseñamos, implementamos y administramos la base tecnológica que mantiene disponibles tus sistemas y acompaña el crecimiento de tu operación.',
      primaryCta: 'Hablar con un especialista',
      pathwaysLabel: 'Explorar servicios de infraestructura y TI',
      pathways: [],
      visualAlt:
        'Ecosistema tecnológico conectado que representa infraestructura cloud, servidores, datos y servicios empresariales de TI.',
    },
    benefits: {
      eyebrow: 'Beneficios de una infraestructura bien gestionada',
      title: 'Continuidad, control y capacidad bajo demanda.',
      copy:
        'Mantén disponibles tus servicios, protege la información y ajusta los recursos tecnológicos conforme cambian las necesidades del negocio.',
      image: '/assets/ingenieria-datos-analitica/beneficios-datos.webp',
      imageAlt:
        'Infraestructura y fuentes de información conectadas para mantener una operación tecnológica disponible y controlada.',
      items: [
        {
          icon: 'fit',
          title: 'Arquitectura adecuada',
          copy: 'Combina recursos locales, cloud o híbridos según tu operación y objetivos.',
        },
        {
          icon: 'quality',
          title: 'Mayor disponibilidad',
          copy: 'Reduce interrupciones mediante monitoreo, respaldos y atención estructurada.',
        },
        {
          icon: 'growth',
          title: 'Escalabilidad controlada',
          copy: 'Aumenta capacidad sin rediseñar toda la plataforma cada vez que el negocio crece.',
        },
        {
          icon: 'integration',
          title: 'Operación conectada',
          copy: 'Integra infraestructura, aplicaciones y datos bajo una administración consistente.',
        },
      ],
    },
    journey: {
      eyebrow: 'Nuestros servicios',
      title: 'La base tecnológica que sostiene tu operación.',
      copy:
        'Integramos infraestructura, nube, prácticas operativas y soporte para mantener tus servicios disponibles, seguros y preparados para evolucionar.',
      items: [
        {
          anchor: 'cloud-computing',
          eyebrow: '01 · Cloud Computing',
          title: 'Usa recursos cloud con una arquitectura clara y controlada.',
          copy:
            'Diseñamos entornos públicos, privados o híbridos y acompañamos la migración de cargas con seguridad y continuidad.',
          detail: 'Cloud · migración · escalabilidad · costos',
          image: '/assets/ingenieria-datos-analitica/big-data.webp',
        },
        {
          anchor: 'servidores',
          eyebrow: '02 · Servidores',
          title: 'Mantén disponibles los sistemas que sostienen tu negocio.',
          copy:
            'Implementamos y administramos servidores físicos y virtuales con monitoreo, respaldos y capacidad adecuada.',
          detail: 'Disponibilidad · rendimiento · respaldo · continuidad',
          image: '/assets/ingenieria-datos-analitica/business-intelligence.webp',
        },
        {
          anchor: 'bases-de-datos',
          eyebrow: '03 · Bases de Datos',
          title: 'Protege y organiza la información crítica de tu operación.',
          copy:
            'Configuramos, optimizamos y administramos bases de datos para asegurar integridad, rendimiento y recuperación.',
          detail: 'Datos · rendimiento · seguridad · recuperación',
          image: '/assets/ingenieria-datos-analitica/arquitectura-datos.webp',
        },
        {
          anchor: 'devops',
          eyebrow: '04 · DevOps',
          title: 'Entrega cambios con mayor velocidad y estabilidad.',
          copy:
            'Integramos automatización, ambientes y monitoreo para hacer más confiable el ciclo de construcción y despliegue.',
          detail: 'Integración · despliegue · automatización · monitoreo',
          image: '/assets/ingenieria-datos-analitica/data-analytics.webp',
        },
        {
          anchor: 'itil',
          eyebrow: '05 · ITIL',
          title: 'Ordena la atención y mejora continua de tus servicios TI.',
          copy:
            'Estructuramos procesos de incidentes, solicitudes, cambios y niveles de servicio con responsables e indicadores claros.',
          detail: 'Servicios · incidentes · cambios · mejora',
          image: '/assets/ingenieria-datos-analitica/gobernanza-datos.webp',
        },
        {
          anchor: 'soporte',
          eyebrow: '06 · Soporte',
          title: 'Resuelve incidentes con seguimiento y tiempos definidos.',
          copy:
            'Organizamos la atención, el escalamiento y la documentación para dar continuidad a usuarios y áreas de negocio.',
          detail: 'Atención · escalamiento · seguimiento · solución',
          image: '/assets/ingenieria-datos-analitica/dashboards-ejecutivos.webp',
        },
        {
          anchor: 'infraestructura-ti',
          eyebrow: '07 · Infraestructura TI',
          title: 'Integra una plataforma sólida para toda tu operación.',
          copy:
            'Diseñamos y administramos cómputo, almacenamiento, redes y componentes esenciales con una visión unificada.',
          detail: 'Cómputo · almacenamiento · redes · administración',
          image: '/assets/desarrollo-software/testing.png',
        },
      ],
    },
  },
  en: {
    metadata: {
      title: 'Cloud Infrastructure and IT Services | AGSIT',
      description:
        'Cloud computing, servers, databases, DevOps, ITIL, support and IT infrastructure services for businesses.',
      canonicalUrl:
        'https://agsit.com.mx/en/technology-solutions/cloud-infrastructure-and-it-services/',
      htmlLang: 'en',
      locale: 'en_US',
    },
    hero: {
      eyebrow: 'Cloud infrastructure and IT services',
      title: 'Build an infrastructure',
      titleAccent: 'that is stable, secure and ready to grow.',
      copy:
        'We design, implement and manage the technology foundation that keeps your systems available and supports operational growth.',
      primaryCta: 'Talk to a specialist',
      pathwaysLabel: 'Explore infrastructure and IT services',
      pathways: [],
      visualAlt:
        'Connected technology ecosystem representing cloud infrastructure, servers, data and enterprise IT services.',
    },
    benefits: {
      eyebrow: 'Benefits of well-managed infrastructure',
      title: 'Continuity, control and capacity on demand.',
      copy:
        'Keep services available, protect information and adjust technology resources as business needs change.',
      image: '/assets/ingenieria-datos-analitica/beneficios-datos.webp',
      imageAlt:
        'Connected infrastructure and information sources maintaining an available and controlled technology operation.',
      items: [
        {
          icon: 'fit',
          title: 'The right architecture',
          copy: 'Combine on-premise, cloud or hybrid resources according to your operation and goals.',
        },
        {
          icon: 'quality',
          title: 'Higher availability',
          copy: 'Reduce interruptions through monitoring, backups and structured support.',
        },
        {
          icon: 'growth',
          title: 'Controlled scalability',
          copy: 'Increase capacity without redesigning the entire platform whenever the business grows.',
        },
        {
          icon: 'integration',
          title: 'Connected operations',
          copy: 'Integrate infrastructure, applications and data under consistent management.',
        },
      ],
    },
    journey: {
      eyebrow: 'Our services',
      title: 'The technology foundation behind your operation.',
      copy:
        'We integrate infrastructure, cloud, operating practices and support to keep services available, secure and ready to evolve.',
      items: [
        {
          anchor: 'cloud-computing',
          eyebrow: '01 · Cloud Computing',
          title: 'Use cloud resources with a clear, controlled architecture.',
          copy:
            'We design public, private or hybrid environments and support secure workload migration with operational continuity.',
          detail: 'Cloud · migration · scalability · costs',
          image: '/assets/ingenieria-datos-analitica/big-data.webp',
        },
        {
          anchor: 'servers',
          eyebrow: '02 · Servers',
          title: 'Keep the systems behind your business available.',
          copy:
            'We implement and manage physical and virtual servers with monitoring, backups and the right capacity.',
          detail: 'Availability · performance · backup · continuity',
          image: '/assets/ingenieria-datos-analitica/business-intelligence.webp',
        },
        {
          anchor: 'databases',
          eyebrow: '03 · Databases',
          title: 'Protect and organize critical operational information.',
          copy:
            'We configure, optimize and manage databases to support integrity, performance and recovery.',
          detail: 'Data · performance · security · recovery',
          image: '/assets/ingenieria-datos-analitica/arquitectura-datos.webp',
        },
        {
          anchor: 'devops',
          eyebrow: '04 · DevOps',
          title: 'Deliver changes with greater speed and stability.',
          copy:
            'We integrate automation, environments and monitoring to make the build and deployment cycle more reliable.',
          detail: 'Integration · deployment · automation · monitoring',
          image: '/assets/ingenieria-datos-analitica/data-analytics.webp',
        },
        {
          anchor: 'itil',
          eyebrow: '05 · ITIL',
          title: 'Structure service delivery and continuous improvement.',
          copy:
            'We organize incident, request, change and service-level processes with clear owners and indicators.',
          detail: 'Services · incidents · changes · improvement',
          image: '/assets/ingenieria-datos-analitica/gobernanza-datos.webp',
        },
        {
          anchor: 'support',
          eyebrow: '06 · Support',
          title: 'Resolve incidents with defined tracking and response times.',
          copy:
            'We organize support, escalation and documentation to provide continuity for users and business teams.',
          detail: 'Support · escalation · tracking · resolution',
          image: '/assets/ingenieria-datos-analitica/dashboards-ejecutivos.webp',
        },
        {
          anchor: 'it-infrastructure',
          eyebrow: '07 · IT Infrastructure',
          title: 'Integrate a solid platform for your entire operation.',
          copy:
            'We design and manage computing, storage, networks and essential components through one unified vision.',
          detail: 'Computing · storage · networks · management',
          image: '/assets/desarrollo-software/testing.png',
        },
      ],
    },
  },
};

export function getCloudInfrastructureITServicesContent(lang: SupportedLang) {
  return cloudInfrastructureITServicesByLang[lang];
}

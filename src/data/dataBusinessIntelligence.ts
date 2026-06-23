import type { SupportedLang } from '../i18n/ui';

export type DataChallengeItem = {
  label: string;
  title: string;
  copy: string;
};

export type DataServiceItem = {
  code: string;
  title: string;
  copy: string;
  activities: string[];
};

export type DataBenefitItem = {
  value: string;
  title: string;
  copy: string;
};

export type DataApproachStep = {
  label: string;
  title: string;
  copy: string;
};

export type DataBusinessIntelligenceContent = {
  metadata: {
    title: string;
    description: string;
    canonicalUrl: string;
    htmlLang: string;
    locale: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    copy: string;
    primaryCta: string;
  };
  challenges: {
    eyebrow: string;
    title: string;
    copy: string;
    items: DataChallengeItem[];
  };
  services: {
    eyebrow: string;
    title: string;
    copy: string;
    activitiesLabel: string;
    items: DataServiceItem[];
  };
  benefits: {
    eyebrow: string;
    title: string;
    copy: string;
    items: DataBenefitItem[];
  };
  approach: {
    eyebrow: string;
    title: string;
    copy: string;
    steps: DataApproachStep[];
  };
  cta: {
    eyebrow: string;
    title: string;
    copy: string;
  };
};

export const dataBusinessIntelligenceByLang: Record<SupportedLang, DataBusinessIntelligenceContent> = {
  es: {
    metadata: {
      title: 'Datos e Inteligencia Empresarial | AGSIT — Del dato a la decisión estratégica',
      description:
        'Administración de bases de datos, integración de sistemas y Big Data para convertir información dispersa en control, trazabilidad y decisiones oportunas.',
      canonicalUrl: 'https://agsit.com.mx/soluciones-tecnologicas/datos-e-inteligencia-empresarial/',
      htmlLang: 'es-MX',
      locale: 'es_MX',
    },
    hero: {
      eyebrow: 'Datos e Inteligencia Empresarial',
      title: 'Convierte tus datos en decisiones estratégicas',
      copy:
        'Conectamos, ordenamos y analizamos la información de tu empresa para transformar datos dispersos en visibilidad, control y ventajas competitivas reales.',
      primaryCta: 'Solicitar diagnóstico',
    },
    challenges: {
      eyebrow: 'Retos que resolvemos',
      title: '¿Tus datos realmente trabajan para tu negocio?',
      copy:
        'Cuando la información está dispersa, desconectada o mal administrada, las decisiones se toman a ciegas y las oportunidades se pierden. Diagnosticamos tu situación antes de proponer cualquier solución.',
      items: [
        {
          label: 'Información dispersa',
          title: 'Datos en múltiples fuentes sin conexión',
          copy: 'Registros en hojas de cálculo, sistemas desconectados y bases de datos aisladas generan inconsistencias, duplicados y una visión fragmentada del negocio.',
        },
        {
          label: 'Falta de integración',
          title: 'Sistemas que no comparten información',
          copy: 'Cuando ERP, CRM, plataformas web y otros sistemas no se comunican, la información se fragmenta y el equipo pierde tiempo conciliando datos manualmente.',
        },
        {
          label: 'Baja visibilidad',
          title: 'Sin métricas para decidir a tiempo',
          copy: 'La ausencia de dashboards y reportes actualizados obliga a tomar decisiones con datos obsoletos, incrementando el riesgo de errores estratégicos y operativos.',
        },
        {
          label: 'Datos sin calidad',
          title: 'Información incorrecta que distorsiona el análisis',
          copy: 'Bases de datos con duplicados, inconsistencias y registros incompletos generan reportes poco confiables que reducen la credibilidad de cualquier análisis.',
        },
      ],
    },
    services: {
      eyebrow: 'Servicios incluidos',
      title: 'Servicios de datos e inteligencia empresarial',
      copy:
        'Administración, integración y análisis de datos para que tu empresa opere con información confiable, centralizada y útil para la toma de decisiones.',
      activitiesLabel: 'Actividades clave',
      items: [
        {
          code: 'DATA-01',
          title: 'Administración de Bases de Datos',
          copy: 'Diseñamos, optimizamos y administramos bases de datos para garantizar rendimiento, integridad, disponibilidad y seguridad de la información crítica del negocio.',
          activities: [
            'Diseño y modelado de bases de datos',
            'Optimización de consultas y rendimiento',
            'Gestión de respaldo y recuperación de datos',
            'Control de accesos y políticas de seguridad',
          ],
        },
        {
          code: 'DATA-02',
          title: 'Integración de Sistemas',
          copy: 'Conectamos plataformas, aplicaciones y fuentes de datos para que la información fluya de forma automática, consistente y en tiempo real entre tus sistemas.',
          activities: [
            'Mapeo de fuentes y flujos de información',
            'Diseño e implementación de APIs y conectores',
            'Automatización de sincronización entre sistemas',
            'Monitoreo de integridad y consistencia de datos',
          ],
        },
        {
          code: 'DATA-03',
          title: 'Big Data y Análisis de Datos',
          copy: 'Procesamos y analizamos grandes volúmenes de información para identificar patrones, tendencias y oportunidades que generan ventajas competitivas reales.',
          activities: [
            'Recopilación y procesamiento de grandes volúmenes',
            'Modelado analítico e identificación de patrones',
            'Construcción de dashboards e indicadores clave',
            'Entrega de reportes con hallazgos accionables',
          ],
        },
      ],
    },
    benefits: {
      eyebrow: 'Beneficios para tu organización',
      title: 'Información que impulsa el crecimiento',
      copy:
        'Cuando los datos están ordenados, conectados y son confiables, la toma de decisiones se vuelve más rápida, precisa y sustentada en hechos reales.',
      items: [
        {
          value: '01',
          title: 'Visibilidad completa',
          copy: 'Dashboards y reportes actualizados que muestran el estado real de tu operación para tomar decisiones con información confiable.',
        },
        {
          value: '02',
          title: 'Datos confiables',
          copy: 'Bases de datos limpias, consistentes y bien administradas que eliminan duplicados y errores que distorsionan el análisis.',
        },
        {
          value: '03',
          title: 'Sistemas conectados',
          copy: 'Integración fluida entre plataformas para que la información fluya automáticamente y elimine la conciliación manual de datos.',
        },
        {
          value: '04',
          title: 'Decisiones más rápidas',
          copy: 'Acceso a métricas e indicadores en tiempo real para responder con agilidad a cambios en el mercado y la operación.',
        },
        {
          value: '05',
          title: 'Ventaja competitiva',
          copy: 'Análisis de datos avanzados para identificar oportunidades, tendencias y áreas de mejora antes que la competencia.',
        },
      ],
    },
    approach: {
      eyebrow: 'Nuestro enfoque',
      title: 'Del dato a la acción',
      copy:
        'Un proceso estructurado que transforma datos dispersos en información confiable, integrada y lista para generar inteligencia empresarial.',
      steps: [
        {
          label: '01',
          title: 'Integración',
          copy: 'Conectamos y centralizamos fuentes de datos dispersas para crear una visión unificada y consistente de la información empresarial.',
        },
        {
          label: '02',
          title: 'Administración',
          copy: 'Estructuramos y administramos bases de datos con criterios de calidad, rendimiento, seguridad y disponibilidad continua.',
        },
        {
          label: '03',
          title: 'Análisis',
          copy: 'Procesamos y analizamos la información para extraer patrones, indicadores y tendencias relevantes para el negocio.',
        },
        {
          label: '04',
          title: 'Aprovechamiento',
          copy: 'Entregamos dashboards, reportes y modelos analíticos que convierten los datos en decisiones concretas y resultados medibles.',
        },
      ],
    },
    cta: {
      eyebrow: 'Diagnóstico inicial',
      title: 'Descubre el potencial de tu información',
      copy:
        'Cuéntanos cómo gestionas tus datos hoy y qué visibilidad necesitas de tu operación. Evaluaremos tu caso y propondremos el camino correcto.',
    },
  },
  en: {
    metadata: {
      title: 'Data & Business Intelligence | AGSIT — From data to strategic decision',
      description:
        'Database administration, system integration and Big Data to turn dispersed information into control, traceability and timely decisions.',
      canonicalUrl: 'https://agsit.com.mx/en/technology-solutions/data-and-business-intelligence/',
      htmlLang: 'en',
      locale: 'en_US',
    },
    hero: {
      eyebrow: 'Data & Business Intelligence',
      title: 'Turn your data into strategic decisions',
      copy:
        'We connect, organize and analyze your company\'s information to transform scattered data into real visibility, control and competitive advantages.',
      primaryCta: 'Request a diagnosis',
    },
    challenges: {
      eyebrow: 'Challenges we solve',
      title: 'Are your data really working for your business?',
      copy:
        'When information is scattered, disconnected or poorly managed, decisions are made blindly and opportunities are lost. We assess your situation before proposing any solution.',
      items: [
        {
          label: 'Scattered information',
          title: 'Data in multiple disconnected sources',
          copy: 'Records in spreadsheets, disconnected systems and isolated databases generate inconsistencies, duplicates and a fragmented view of the business.',
        },
        {
          label: 'Lack of integration',
          title: 'Systems that don\'t share information',
          copy: 'When ERP, CRM, web platforms and other systems don\'t communicate, information fragments and the team wastes time manually reconciling data.',
        },
        {
          label: 'Low visibility',
          title: 'No metrics for timely decisions',
          copy: 'The absence of updated dashboards and reports forces decisions with outdated data, increasing the risk of strategic and operational errors.',
        },
        {
          label: 'Poor data quality',
          title: 'Incorrect information that distorts analysis',
          copy: 'Databases with duplicates, inconsistencies and incomplete records generate unreliable reports that reduce the credibility of any analysis.',
        },
      ],
    },
    services: {
      eyebrow: 'Included services',
      title: 'Data and business intelligence services',
      copy:
        'Administration, integration and analysis of data so your company operates with reliable, centralized information useful for decision-making.',
      activitiesLabel: 'Key activities',
      items: [
        {
          code: 'DATA-01',
          title: 'Database Administration',
          copy: 'We design, optimize and manage databases to ensure performance, integrity, availability and security of critical business information.',
          activities: [
            'Database design and data modeling',
            'Query and performance optimization',
            'Backup management and data recovery',
            'Access control and security policies',
          ],
        },
        {
          code: 'DATA-02',
          title: 'System Integration',
          copy: 'We connect platforms, applications and data sources so information flows automatically, consistently and in real time between your systems.',
          activities: [
            'Mapping of data sources and information flows',
            'API and connector design and implementation',
            'Automated synchronization between systems',
            'Data integrity and consistency monitoring',
          ],
        },
        {
          code: 'DATA-03',
          title: 'Big Data & Data Analytics',
          copy: 'We process and analyze large volumes of information to identify patterns, trends and opportunities that generate real competitive advantages.',
          activities: [
            'Large-volume data collection and processing',
            'Analytical modeling and pattern identification',
            'Dashboard and key indicator development',
            'Delivery of reports with actionable insights',
          ],
        },
      ],
    },
    benefits: {
      eyebrow: 'Benefits for your organization',
      title: 'Information that drives growth',
      copy:
        'When data is organized, connected and reliable, decision-making becomes faster, more accurate and grounded in real facts.',
      items: [
        {
          value: '01',
          title: 'Complete visibility',
          copy: 'Updated dashboards and reports showing the real state of your operation so you can make decisions with reliable information.',
        },
        {
          value: '02',
          title: 'Reliable data',
          copy: 'Clean, consistent, well-managed databases that eliminate duplicates and errors that distort analysis.',
        },
        {
          value: '03',
          title: 'Connected systems',
          copy: 'Smooth integration between platforms so information flows automatically and eliminates manual data reconciliation.',
        },
        {
          value: '04',
          title: 'Faster decisions',
          copy: 'Access to real-time metrics and indicators to respond agilely to market and operational changes.',
        },
        {
          value: '05',
          title: 'Competitive advantage',
          copy: 'Advanced data analysis to identify opportunities, trends and improvement areas before the competition.',
        },
      ],
    },
    approach: {
      eyebrow: 'Our approach',
      title: 'From data to action',
      copy:
        'A structured process that transforms scattered data into reliable, integrated information ready to generate business intelligence.',
      steps: [
        {
          label: '01',
          title: 'Integration',
          copy: 'We connect and centralize scattered data sources to create a unified, consistent view of business information.',
        },
        {
          label: '02',
          title: 'Administration',
          copy: 'We structure and manage databases with quality, performance, security and continuous availability criteria.',
        },
        {
          label: '03',
          title: 'Analysis',
          copy: 'We process and analyze information to extract relevant patterns, indicators and trends for the business.',
        },
        {
          label: '04',
          title: 'Action',
          copy: 'We deliver dashboards, reports and analytical models that turn data into concrete decisions and measurable results.',
        },
      ],
    },
    cta: {
      eyebrow: 'Initial diagnosis',
      title: 'Discover the potential of your information',
      copy:
        'Tell us how you manage your data today and what visibility you need from your operation. We will evaluate your case and propose the right path.',
    },
  },
};

export function getDataBusinessIntelligenceContent(lang: SupportedLang) {
  return dataBusinessIntelligenceByLang[lang];
}

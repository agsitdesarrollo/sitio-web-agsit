import type { SupportedLang } from '../i18n/ui';
import type {
  TechnologySolutionBenefitsContent,
  TechnologySolutionHeroContent,
  TechnologySolutionJourneyContent,
} from '../components/technology-solution-detail/types';

export type DataEngineeringStrategicAnalyticsContent = {
  metadata: {
    title: string;
    description: string;
    canonicalUrl: string;
    image: string;
    imageAlt: string;
    htmlLang: string;
    locale: string;
  };
  hero: TechnologySolutionHeroContent;
  benefits: TechnologySolutionBenefitsContent;
  journey: TechnologySolutionJourneyContent;
};

export const dataEngineeringStrategicAnalyticsByLang: Record<
  SupportedLang,
  DataEngineeringStrategicAnalyticsContent
> = {
  es: {
    metadata: {
      title: 'Ingeniería de Datos y Analítica Estratégica | AGSIT',
      description:
        'Soluciones de Big Data, Business Intelligence, analítica, gobernanza, dashboards ejecutivos y arquitectura de datos para empresas.',
      canonicalUrl:
        'https://agsit.com.mx/soluciones-tecnologicas/ingenieria-de-datos-y-analitica-estrategica/',
      image: '/assets/social/ingenieria-datos-analitica-es.jpg',
      imageAlt: 'Ingeniería de datos y analítica estratégica para convertir información en decisiones.',
      htmlLang: 'es-MX',
      locale: 'es_MX',
    },
    hero: {
      eyebrow: 'Ingeniería de datos y analítica estratégica',
      title: 'Convertimos tus datos',
      titleAccent: 'en decisiones estratégicas.',
      copy:
        'Integramos, organizamos y analizamos la información de tu empresa para generar visibilidad, control y oportunidades de crecimiento.',
      primaryCta: 'Hablar con un especialista',
      pathwaysLabel: 'Explorar soluciones de datos',
      pathways: [],
      visualAlt:
        'Ecosistema empresarial que conecta fuentes, modelos de datos e indicadores para convertir información en decisiones estratégicas.',
    },
    benefits: {
      eyebrow: 'Beneficios de una estrategia de datos',
      title: 'Datos confiables para decidir mejor.',
      copy:
        'Transforma fuentes dispersas en una base conectada, gobernada y lista para responder las preguntas importantes del negocio.',
      image: '/assets/ingenieria-datos-analitica/beneficios-datos.webp',
      imageAlt:
        'Ecosistema de datos conectado que transforma distintas fuentes en indicadores confiables y decisiones estratégicas.',
      items: [
        {
          icon: 'fit',
          title: 'Visibilidad completa',
          copy: 'Reúne indicadores clave para entender el estado real de tu operación.',
        },
        {
          icon: 'quality',
          title: 'Datos confiables',
          copy: 'Establece calidad, trazabilidad y control sobre la información crítica.',
        },
        {
          icon: 'growth',
          title: 'Decisiones oportunas',
          copy: 'Detecta patrones y cambios para actuar con mayor velocidad y precisión.',
        },
        {
          icon: 'integration',
          title: 'Base para crecer',
          copy: 'Construye una arquitectura que acompaña nuevas fuentes, usuarios y análisis.',
        },
      ],
    },
    journey: {
      eyebrow: 'Nuestras soluciones',
      title: 'Todo lo que necesitas para aprovechar tus datos.',
      copy:
        'Diseñamos capacidades para procesar, gobernar, analizar y visualizar información de forma segura, útil y escalable.',
      items: [
        {
          anchor: 'big-data',
          eyebrow: '01 · Big Data',
          title: 'Procesa grandes volúmenes sin perder claridad.',
          copy:
            'Integramos y preparamos información de múltiples fuentes para analizarla con velocidad, consistencia y contexto.',
          detail: 'Volumen · velocidad · variedad · procesamiento',
          image: '/assets/ingenieria-datos-analitica/big-data.webp',
        },
        {
          anchor: 'business-intelligence',
          eyebrow: '02 · Business Intelligence (BI)',
          title: 'Convierte la operación en inteligencia de negocio.',
          copy:
            'Unificamos métricas e indicadores para que cada área consulte una versión clara y compartida de la información.',
          detail: 'Indicadores · métricas · reportes · decisiones',
          image: '/assets/ingenieria-datos-analitica/business-intelligence.webp',
        },
        {
          anchor: 'data-analytics',
          eyebrow: '03 · Data Analytics',
          title: 'Descubre patrones que anticipan mejores decisiones.',
          copy:
            'Analizamos tendencias, comportamientos y relaciones para convertir los datos históricos en hallazgos accionables.',
          detail: 'Patrones · tendencias · modelos · oportunidades',
          image: '/assets/ingenieria-datos-analitica/data-analytics.webp',
        },
        {
          anchor: 'gobernanza-de-datos',
          eyebrow: '04 · Gobernanza de datos',
          title: 'Define reglas para que cada dato sea confiable.',
          copy:
            'Establecemos responsables, estándares y controles para proteger la calidad, seguridad y trazabilidad de la información.',
          detail: 'Calidad · seguridad · responsables · trazabilidad',
          image: '/assets/ingenieria-datos-analitica/gobernanza-datos.webp',
        },
        {
          anchor: 'dashboards-ejecutivos',
          eyebrow: '05 · Dashboards ejecutivos',
          title: 'Visualiza lo importante y actúa a tiempo.',
          copy:
            'Diseñamos tableros claros y actualizados que concentran los indicadores necesarios para dirigir la operación.',
          detail: 'KPIs · visualización · monitoreo · alertas',
          image: '/assets/ingenieria-datos-analitica/dashboards-ejecutivos.webp',
        },
        {
          anchor: 'arquitectura-de-datos',
          eyebrow: '06 · Arquitectura de datos',
          title: 'Construye una base preparada para crecer.',
          copy:
            'Diseñamos la estructura, integración y almacenamiento que necesita tu empresa para escalar sus capacidades de información.',
          detail: 'Fuentes · integración · almacenamiento · escalabilidad',
          image: '/assets/ingenieria-datos-analitica/arquitectura-datos.webp',
        },
      ],
    },
  },
  en: {
    metadata: {
      title: 'Data Engineering and Strategic Analytics | AGSIT',
      description:
        'Big Data, Business Intelligence, analytics, data governance, executive dashboards and data architecture solutions for businesses.',
      canonicalUrl:
        'https://agsit.com.mx/en/technology-solutions/data-engineering-and-strategic-analytics/',
      image: '/assets/social/data-engineering-strategic-analytics-en.jpg',
      imageAlt: 'Data engineering and strategic analytics turning information into decisions.',
      htmlLang: 'en',
      locale: 'en_US',
    },
    hero: {
      eyebrow: 'Data engineering and strategic analytics',
      title: 'We turn your data',
      titleAccent: 'into strategic decisions.',
      copy:
        'We integrate, organize and analyze business information to create visibility, control and opportunities for growth.',
      primaryCta: 'Talk to a specialist',
      pathwaysLabel: 'Explore data solutions',
      pathways: [],
      visualAlt:
        'Enterprise ecosystem connecting sources, data models and indicators to turn information into strategic decisions.',
    },
    benefits: {
      eyebrow: 'Benefits of a data strategy',
      title: 'Trusted data for better decisions.',
      copy:
        'Turn scattered sources into a connected, governed foundation ready to answer the questions that matter to your business.',
      image: '/assets/ingenieria-datos-analitica/beneficios-datos.webp',
      imageAlt:
        'Connected data ecosystem turning multiple sources into reliable indicators and strategic decisions.',
      items: [
        {
          icon: 'fit',
          title: 'Complete visibility',
          copy: 'Bring key indicators together to understand the true state of your operation.',
        },
        {
          icon: 'quality',
          title: 'Reliable data',
          copy: 'Establish quality, traceability and control over critical information.',
        },
        {
          icon: 'growth',
          title: 'Timely decisions',
          copy: 'Detect patterns and changes to act with greater speed and precision.',
        },
        {
          icon: 'integration',
          title: 'Built to grow',
          copy: 'Create an architecture ready for new sources, users and analytical needs.',
        },
      ],
    },
    journey: {
      eyebrow: 'Our solutions',
      title: 'Everything you need to make the most of your data.',
      copy:
        'We design capabilities to process, govern, analyze and visualize information securely, effectively and at scale.',
      items: [
        {
          anchor: 'big-data',
          eyebrow: '01 · Big Data',
          title: 'Process large volumes without losing clarity.',
          copy:
            'We integrate and prepare information from multiple sources for fast, consistent and contextual analysis.',
          detail: 'Volume · velocity · variety · processing',
          image: '/assets/ingenieria-datos-analitica/big-data.webp',
        },
        {
          anchor: 'business-intelligence',
          eyebrow: '02 · Business Intelligence (BI)',
          title: 'Turn operations into business intelligence.',
          copy:
            'We unify metrics and indicators so every team works from one clear, shared view of information.',
          detail: 'Indicators · metrics · reports · decisions',
          image: '/assets/ingenieria-datos-analitica/business-intelligence.webp',
        },
        {
          anchor: 'data-analytics',
          eyebrow: '03 · Data Analytics',
          title: 'Discover patterns that lead to better decisions.',
          copy:
            'We analyze trends, behaviors and relationships to turn historical data into actionable findings.',
          detail: 'Patterns · trends · models · opportunities',
          image: '/assets/ingenieria-datos-analitica/data-analytics.webp',
        },
        {
          anchor: 'data-governance',
          eyebrow: '04 · Data governance',
          title: 'Set the rules that make every data point reliable.',
          copy:
            'We establish owners, standards and controls to protect information quality, security and traceability.',
          detail: 'Quality · security · ownership · traceability',
          image: '/assets/ingenieria-datos-analitica/gobernanza-datos.webp',
        },
        {
          anchor: 'executive-dashboards',
          eyebrow: '05 · Executive dashboards',
          title: 'See what matters and act in time.',
          copy:
            'We design clear, up-to-date dashboards that bring together the indicators needed to steer operations.',
          detail: 'KPIs · visualization · monitoring · alerts',
          image: '/assets/ingenieria-datos-analitica/dashboards-ejecutivos.webp',
        },
        {
          anchor: 'data-architecture',
          eyebrow: '06 · Data architecture',
          title: 'Build a foundation prepared to grow.',
          copy:
            'We design the structure, integration and storage your business needs to scale its information capabilities.',
          detail: 'Sources · integration · storage · scalability',
          image: '/assets/ingenieria-datos-analitica/arquitectura-datos.webp',
        },
      ],
    },
  },
};

export function getDataEngineeringStrategicAnalyticsContent(lang: SupportedLang) {
  return dataEngineeringStrategicAnalyticsByLang[lang];
}

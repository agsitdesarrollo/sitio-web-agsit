import type { SupportedLang } from '../i18n/ui';
import type {
  TechnologySolutionBenefitsContent,
  TechnologySolutionHeroContent,
  TechnologySolutionJourneyContent,
} from '../components/technology-solution-detail/types';

export type ArtificialIntelligenceSolutionsContent = {
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

export const artificialIntelligenceSolutionsByLang: Record<
  SupportedLang,
  ArtificialIntelligenceSolutionsContent
> = {
  es: {
    metadata: {
      title: 'Soluciones de Inteligencia Artificial | AGSIT',
      description:
        'Soluciones de inteligencia artificial, IA generativa, machine learning y agentes virtuales aplicadas a las necesidades de tu empresa.',
      canonicalUrl: 'https://agsit.com.mx/soluciones-tecnologicas/inteligencia-artificial/',
      htmlLang: 'es-MX',
      locale: 'es_MX',
    },
    hero: {
      eyebrow: 'Soluciones de inteligencia artificial',
      title: 'IA que impulsa',
      titleAccent: 'tu operación.',
      copy:
        'Diseñamos soluciones de IA que aprovechan la información de tu empresa para analizar, responder y automatizar con un propósito claro.',
      primaryCta: 'Hablar con un especialista',
      pathwaysLabel: 'Explorar soluciones de inteligencia artificial',
      pathways: [],
      visualAlt:
        'Ecosistema digital de información y análisis que representa soluciones de inteligencia artificial para empresas.',
    },
    benefits: {
      eyebrow: 'Beneficios de la inteligencia artificial',
      title: 'Analiza mejor y responde más rápido.',
      copy:
        'Convierte datos y conocimiento operativo en herramientas que apoyan a tu equipo, reducen tiempos y mejoran la experiencia de tus clientes.',
      image: '/assets/ingenieria-datos-analitica/beneficios-datos.webp',
      imageAlt:
        'Fuentes de información conectadas con indicadores que apoyan decisiones mediante inteligencia artificial.',
      items: [
        {
          icon: 'fit',
          title: 'IA para tu contexto',
          copy: 'Partimos de tus procesos, datos y objetivos para resolver necesidades concretas.',
        },
        {
          icon: 'quality',
          title: 'Resultados controlados',
          copy: 'Definimos criterios, validaciones y seguimiento para mantener respuestas confiables.',
        },
        {
          icon: 'growth',
          title: 'Equipos más ágiles',
          copy: 'Reduce tareas de análisis y consulta para dedicar más tiempo a decisiones de valor.',
        },
        {
          icon: 'integration',
          title: 'Integración práctica',
          copy: 'Conecta las capacidades de IA con las herramientas que tu empresa ya utiliza.',
        },
      ],
    },
    journey: {
      eyebrow: 'Nuestras soluciones',
      title: 'Inteligencia artificial aplicada a tu operación.',
      copy:
        'Implementamos capacidades de IA para comprender información, generar respuestas, reconocer patrones y atender solicitudes.',
      items: [
        {
          anchor: 'inteligencia-artificial',
          eyebrow: '01 · Inteligencia Artificial (IA)',
          title: 'Incorpora inteligencia en los procesos que más la necesitan.',
          copy:
            'Diseñamos soluciones que interpretan información, apoyan decisiones y ejecutan tareas de acuerdo con las reglas de tu negocio.',
          detail: 'Análisis · decisiones · automatización · control',
          image: '/assets/ingenieria-datos-analitica/big-data.webp',
        },
        {
          anchor: 'ia-generativa',
          eyebrow: '02 · Generative AI',
          title: 'Genera contenido y respuestas con el contexto de tu empresa.',
          copy:
            'Creamos asistentes capaces de consultar conocimiento interno, resumir información y producir contenido útil para cada área.',
          detail: 'Contenido · conocimiento · respuestas · productividad',
          image: '/assets/ingenieria-datos-analitica/business-intelligence.webp',
        },
        {
          anchor: 'machine-learning',
          eyebrow: '03 · Machine Learning',
          title: 'Detecta patrones para anticipar mejores decisiones.',
          copy:
            'Desarrollamos modelos que analizan datos históricos, identifican comportamientos y generan predicciones relevantes para la operación.',
          detail: 'Modelos · patrones · predicción · aprendizaje',
          image: '/assets/ingenieria-datos-analitica/data-analytics.webp',
        },
        {
          anchor: 'agentes-virtuales',
          eyebrow: '04 · Agentes Virtuales',
          title: 'Atiende solicitudes de forma ágil y consistente.',
          copy:
            'Implementamos agentes que orientan a usuarios, consultan información y coordinan acciones sin perder el contexto de cada conversación.',
          detail: 'Atención · conversación · contexto · disponibilidad',
          image: '/assets/ingenieria-datos-analitica/dashboards-ejecutivos.webp',
        },
      ],
    },
  },
  en: {
    metadata: {
      title: 'Artificial Intelligence Solutions | AGSIT',
      description:
        'Artificial intelligence, generative AI, machine learning and virtual agent solutions designed around your company’s needs.',
      canonicalUrl: 'https://agsit.com.mx/en/technology-solutions/artificial-intelligence/',
      htmlLang: 'en',
      locale: 'en_US',
    },
    hero: {
      eyebrow: 'Artificial intelligence solutions',
      title: 'AI that drives',
      titleAccent: 'your business forward.',
      copy:
        'We design AI solutions that use your business information to analyze, respond and automate with a clear purpose.',
      primaryCta: 'Talk to a specialist',
      pathwaysLabel: 'Explore artificial intelligence solutions',
      pathways: [],
      visualAlt:
        'Digital information and analytics ecosystem representing artificial intelligence solutions for businesses.',
    },
    benefits: {
      eyebrow: 'Benefits of artificial intelligence',
      title: 'Analyze better and respond faster.',
      copy:
        'Turn data and operational knowledge into tools that support your team, reduce response times and improve customer experiences.',
      image: '/assets/ingenieria-datos-analitica/beneficios-datos.webp',
      imageAlt:
        'Connected information sources and indicators supporting decisions through artificial intelligence.',
      items: [
        {
          icon: 'fit',
          title: 'AI for your context',
          copy: 'We start with your processes, data and goals to solve specific needs.',
        },
        {
          icon: 'quality',
          title: 'Controlled results',
          copy: 'We define criteria, validations and monitoring to maintain reliable responses.',
        },
        {
          icon: 'growth',
          title: 'More agile teams',
          copy: 'Reduce analysis and research tasks so your team can focus on valuable decisions.',
        },
        {
          icon: 'integration',
          title: 'Practical integration',
          copy: 'Connect AI capabilities with the tools your company already uses.',
        },
      ],
    },
    journey: {
      eyebrow: 'Our solutions',
      title: 'Artificial intelligence applied to your operation.',
      copy:
        'We implement AI capabilities to understand information, generate responses, recognize patterns and handle requests.',
      items: [
        {
          anchor: 'artificial-intelligence',
          eyebrow: '01 · Artificial Intelligence (AI)',
          title: 'Bring intelligence into the processes that need it most.',
          copy:
            'We design solutions that interpret information, support decisions and perform tasks according to your business rules.',
          detail: 'Analysis · decisions · automation · control',
          image: '/assets/ingenieria-datos-analitica/big-data.webp',
        },
        {
          anchor: 'generative-ai',
          eyebrow: '02 · Generative AI',
          title: 'Create content and answers grounded in your business context.',
          copy:
            'We build assistants that consult internal knowledge, summarize information and produce useful content for every team.',
          detail: 'Content · knowledge · answers · productivity',
          image: '/assets/ingenieria-datos-analitica/business-intelligence.webp',
        },
        {
          anchor: 'machine-learning',
          eyebrow: '03 · Machine Learning',
          title: 'Detect patterns to anticipate better decisions.',
          copy:
            'We develop models that analyze historical data, identify behaviors and generate predictions relevant to your operation.',
          detail: 'Models · patterns · prediction · learning',
          image: '/assets/ingenieria-datos-analitica/data-analytics.webp',
        },
        {
          anchor: 'virtual-agents',
          eyebrow: '04 · Virtual Agents',
          title: 'Handle requests quickly and consistently.',
          copy:
            'We implement agents that guide users, retrieve information and coordinate actions while retaining the context of each conversation.',
          detail: 'Service · conversation · context · availability',
          image: '/assets/ingenieria-datos-analitica/dashboards-ejecutivos.webp',
        },
      ],
    },
  },
};

export function getArtificialIntelligenceSolutionsContent(lang: SupportedLang) {
  return artificialIntelligenceSolutionsByLang[lang];
}

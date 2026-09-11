import type { SupportedLang } from '../i18n/ui';
import type {
  TechnologySolutionBenefitsContent,
  TechnologySolutionHeroContent,
  TechnologySolutionJourneyContent,
} from '../components/technology-solution-detail/types';

export type TechnologyConsultingTransformationContent = {
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

export const technologyConsultingTransformationByLang: Record<
  SupportedLang,
  TechnologyConsultingTransformationContent
> = {
  es: {
    metadata: {
      title: 'Consultoría y Transformación Tecnológica | AGSIT',
      description:
        'Servicios de auditoría TI, levantamiento de requerimientos, diseño de soluciones, arquitectura tecnológica y transformación digital.',
      canonicalUrl:
        'https://agsit.com.mx/soluciones-tecnologicas/consultoria-y-transformacion-tecnologica/',
      image: '/assets/social/consultoria-transformacion-tecnologica-es.jpg',
      imageAlt: 'Consultoría y transformación tecnológica para orientar la evolución de la empresa.',
      htmlLang: 'es-MX',
      locale: 'es_MX',
    },
    hero: {
      eyebrow: 'Consultoría y transformación tecnológica',
      title: 'Define el rumbo',
      titleAccent: 'de tu transformación.',
      copy:
        'Analizamos tu operación, definimos prioridades y diseñamos soluciones alineadas con los objetivos reales de tu empresa.',
      primaryCta: 'Hablar con un especialista',
      pathwaysLabel: 'Explorar servicios de consultoría tecnológica',
      pathways: [],
      visualAlt:
        'Ecosistema de información y tableros que representa el análisis y diseño de una estrategia tecnológica empresarial.',
    },
    benefits: {
      eyebrow: 'Beneficios de una visión tecnológica integral',
      title: 'Decisiones tecnológicas con dirección.',
      copy:
        'Obtén claridad sobre el estado actual, las prioridades y la arquitectura necesaria para transformar tu operación sin perder control.',
      image: '/assets/ingenieria-datos-analitica/beneficios-datos.webp',
      imageAlt:
        'Fuentes y métricas conectadas para orientar decisiones de consultoría y transformación tecnológica.',
      items: [
        {
          icon: 'fit',
          title: 'Diagnóstico preciso',
          copy: 'Identifica brechas, dependencias y oportunidades antes de invertir en una solución.',
        },
        {
          icon: 'quality',
          title: 'Menos incertidumbre',
          copy: 'Define requerimientos y criterios claros para reducir cambios, riesgos y retrabajos.',
        },
        {
          icon: 'growth',
          title: 'Ruta priorizada',
          copy: 'Organiza iniciativas por impacto, viabilidad y valor para avanzar con orden.',
        },
        {
          icon: 'integration',
          title: 'Soluciones conectadas',
          copy: 'Diseña una arquitectura que integra procesos, información y plataformas existentes.',
        },
      ],
    },
    journey: {
      eyebrow: 'Nuestros servicios',
      title: 'Consultoría que convierte necesidades en soluciones.',
      copy:
        'Acompañamos desde el diagnóstico y la definición del problema hasta el diseño de una transformación tecnológica viable.',
      items: [
        {
          anchor: 'auditoria-ti',
          eyebrow: '01 · Auditoría TI',
          title: 'Conoce el estado real de tu operación tecnológica.',
          copy:
            'Evaluamos sistemas, procesos, infraestructura y controles para identificar riesgos, dependencias y oportunidades de mejora.',
          detail: 'Diagnóstico · riesgos · controles · prioridades',
          image: '/assets/ingenieria-datos-analitica/big-data.webp',
        },
        {
          anchor: 'levantamiento-de-requerimientos',
          eyebrow: '02 · Levantamiento de Requerimientos',
          title: 'Define con claridad lo que la solución debe resolver.',
          copy:
            'Documentamos necesidades, usuarios, reglas y criterios de éxito para alinear al negocio con los equipos técnicos.',
          detail: 'Necesidades · alcance · reglas · criterios',
          image: '/assets/ingenieria-datos-analitica/business-intelligence.webp',
        },
        {
          anchor: 'diseno-de-soluciones',
          eyebrow: '03 · Diseño de Soluciones',
          title: 'Transforma requerimientos en una propuesta viable.',
          copy:
            'Diseñamos componentes, flujos e integraciones que responden al problema sin añadir complejidad innecesaria.',
          detail: 'Procesos · componentes · integración · viabilidad',
          image: '/assets/ingenieria-datos-analitica/data-analytics.webp',
        },
        {
          anchor: 'arquitectura-tecnologica',
          eyebrow: '04 · Arquitectura Tecnológica',
          title: 'Construye una base preparada para evolucionar.',
          copy:
            'Definimos la estructura de aplicaciones, datos e infraestructura para asegurar continuidad, seguridad y escalabilidad.',
          detail: 'Aplicaciones · datos · infraestructura · escalabilidad',
          image: '/assets/ingenieria-datos-analitica/arquitectura-datos.webp',
        },
        {
          anchor: 'transformacion-digital',
          eyebrow: '05 · Transformación Digital',
          title: 'Haz que la tecnología impulse una nueva forma de operar.',
          copy:
            'Priorizamos iniciativas y acompañamos su adopción para convertir cambios tecnológicos en mejoras sostenibles.',
          detail: 'Estrategia · prioridades · adopción · resultados',
          image: '/assets/ingenieria-datos-analitica/gobernanza-datos.webp',
        },
      ],
    },
  },
  en: {
    metadata: {
      title: 'Technology Consulting and Transformation | AGSIT',
      description:
        'IT audit, requirements gathering, solution design, technology architecture and digital transformation services.',
      canonicalUrl:
        'https://agsit.com.mx/en/technology-solutions/technology-consulting-and-transformation/',
      image: '/assets/social/technology-consulting-transformation-en.jpg',
      imageAlt: 'Technology consulting and transformation guiding business evolution.',
      htmlLang: 'en',
      locale: 'en_US',
    },
    hero: {
      eyebrow: 'Technology consulting and transformation',
      title: 'Define the path',
      titleAccent: 'for your transformation.',
      copy:
        'We analyze your operation, define priorities and design solutions aligned with your company’s real objectives.',
      primaryCta: 'Talk to a specialist',
      pathwaysLabel: 'Explore technology consulting services',
      pathways: [],
      visualAlt:
        'Information and dashboard ecosystem representing the analysis and design of an enterprise technology strategy.',
    },
    benefits: {
      eyebrow: 'Benefits of an integrated technology vision',
      title: 'Technology decisions with direction.',
      copy:
        'Gain clarity on your current state, priorities and the architecture required to transform operations without losing control.',
      image: '/assets/ingenieria-datos-analitica/beneficios-datos.webp',
      imageAlt:
        'Connected sources and metrics guiding technology consulting and transformation decisions.',
      items: [
        {
          icon: 'fit',
          title: 'Accurate assessment',
          copy: 'Identify gaps, dependencies and opportunities before investing in a solution.',
        },
        {
          icon: 'quality',
          title: 'Less uncertainty',
          copy: 'Define clear requirements and criteria to reduce change, risk and rework.',
        },
        {
          icon: 'growth',
          title: 'Prioritized roadmap',
          copy: 'Organize initiatives by impact, feasibility and value to move forward with order.',
        },
        {
          icon: 'integration',
          title: 'Connected solutions',
          copy: 'Design an architecture that integrates existing processes, information and platforms.',
        },
      ],
    },
    journey: {
      eyebrow: 'Our services',
      title: 'Consulting that turns needs into solutions.',
      copy:
        'We support you from assessment and problem definition through the design of a viable technology transformation.',
      items: [
        {
          anchor: 'it-audit',
          eyebrow: '01 · IT Audit',
          title: 'Understand the true state of your technology operation.',
          copy:
            'We assess systems, processes, infrastructure and controls to identify risks, dependencies and improvement opportunities.',
          detail: 'Assessment · risks · controls · priorities',
          image: '/assets/ingenieria-datos-analitica/big-data.webp',
        },
        {
          anchor: 'requirements-gathering',
          eyebrow: '02 · Requirements Gathering',
          title: 'Clearly define what the solution must accomplish.',
          copy:
            'We document needs, users, rules and success criteria to align business and technical teams.',
          detail: 'Needs · scope · rules · criteria',
          image: '/assets/ingenieria-datos-analitica/business-intelligence.webp',
        },
        {
          anchor: 'solution-design',
          eyebrow: '03 · Solution Design',
          title: 'Turn requirements into a viable proposal.',
          copy:
            'We design components, workflows and integrations that solve the problem without unnecessary complexity.',
          detail: 'Processes · components · integration · feasibility',
          image: '/assets/ingenieria-datos-analitica/data-analytics.webp',
        },
        {
          anchor: 'technology-architecture',
          eyebrow: '04 · Technology Architecture',
          title: 'Build a foundation prepared to evolve.',
          copy:
            'We define the structure of applications, data and infrastructure to support continuity, security and scalability.',
          detail: 'Applications · data · infrastructure · scalability',
          image: '/assets/ingenieria-datos-analitica/arquitectura-datos.webp',
        },
        {
          anchor: 'digital-transformation',
          eyebrow: '05 · Digital Transformation',
          title: 'Make technology drive a new way of operating.',
          copy:
            'We prioritize initiatives and support adoption to turn technology changes into sustainable improvements.',
          detail: 'Strategy · priorities · adoption · outcomes',
          image: '/assets/ingenieria-datos-analitica/gobernanza-datos.webp',
        },
      ],
    },
  },
};

export function getTechnologyConsultingTransformationContent(lang: SupportedLang) {
  return technologyConsultingTransformationByLang[lang];
}

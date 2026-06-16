import type { SupportedLang } from '../i18n/ui';

export type TechnologyMetric = {
  value: string;
  label: string;
};

export type TechnologyStep = {
  label: string;
  title: string;
  copy: string;
  outcome: string;
};

export type TechnologyCapability = {
  code: string;
  title: string;
  copy: string;
  cta: string;
  href: string;
};

export type TechnologyBenefit = {
  value: string;
  title: string;
  copy: string;
};

export type TechnologySolutionsContent = {
  metadata: {
    title: string;
    description: string;
    canonicalUrl: string;
    htmlLang: string;
    locale: string;
  };
  hero: {
    eyebrow: string;
    title: [string, string];
    copy: string;
    primaryCta: string;
    metrics: TechnologyMetric[];
  };
  method: {
    eyebrow: string;
    title: string;
    copy: string;
    steps: TechnologyStep[];
  };
  capabilities: {
    eyebrow: string;
    title: string;
    copy: string;
    items: TechnologyCapability[];
  };
  benefits: {
    eyebrow: string;
    title: string;
    copy: string;
    items: TechnologyBenefit[];
  };
  contact: {
    eyebrow: string;
    title: string;
    copy: string;
  };
};

export const technologySolutionsByLang: Record<SupportedLang, TechnologySolutionsContent> = {
  es: {
    metadata: {
      title: 'Soluciones Tecnológicas AGSIT | Tecnología para resultados de negocio',
      description:
        'Soluciones tecnológicas para empresas: auditoría de software, requerimientos, desarrollo, testing, soporte, bases de datos, servidores, ERP, nube y metodologías de desarrollo.',
      canonicalUrl: 'https://agsit.com.mx/soluciones-tecnologicas/',
      htmlLang: 'es-MX',
      locale: 'es_MX',
    },
    hero: {
      eyebrow: 'Soluciones tecnológicas ITS 360°',
      title: ['Tecnología que impulsa', 'tu crecimiento'],
      copy:
        'Diagnosticamos, diseñamos e implementamos soluciones tecnológicas alineadas a la operación real del negocio: software, infraestructura, nube, datos, testing y sistemas corporativos con trazabilidad de punta a punta.',
      primaryCta: 'Solicitar diagnóstico',
      metrics: [
        { value: '01', label: 'Menos reprocesos por fallas, sistemas aislados y requisitos poco claros.' },
        { value: '02', label: 'Mayor control sobre datos, infraestructura, calidad y continuidad operativa.' },
        { value: '03', label: 'Implementaciones por etapas, con documentación y adopción del equipo.' },
      ],
    },
    method: {
      eyebrow: 'Método AGSIT',
      title: 'De la necesidad técnica al resultado operativo medible.',
      copy:
        'No partimos de una herramienta. Partimos del problema de negocio, sus restricciones, riesgos y dependencias para definir una solución viable, escalable y administrable.',
      steps: [
        {
          label: 'Diagnosticar',
          title: 'Entendemos el punto de fricción',
          copy:
            'Levantamos procesos, sistemas actuales, requerimientos técnicos y funcionales, dependencias, riesgos y brechas de operación.',
          outcome: 'Alcance y riesgos definidos desde el inicio.',
        },
        {
          label: 'Priorizar',
          title: 'Definimos una ruta ejecutable',
          copy:
            'Ordenamos iniciativas por impacto, urgencia, complejidad y capacidad interna para evitar proyectos extensos sin retorno visible.',
          outcome: 'Decisiones con criterios de negocio.',
        },
        {
          label: 'Implementar',
          title: 'Construimos, integramos y validamos',
          copy:
            'Desarrollamos software, configuramos sistemas, automatizamos flujos, probamos entregables y documentamos cada componente crítico.',
          outcome: 'Ejecución controlada y verificable.',
        },
        {
          label: 'Evolucionar',
          title: 'Medimos adopción y continuidad',
          copy:
            'Acompañamos soporte, capacitación, indicadores, seguridad y mejoras para que la solución siga respondiendo al crecimiento.',
          outcome: 'Tecnología sostenible, no dependencia.',
        },
      ],
    },
    capabilities: {
      eyebrow: 'Catálogo de servicios',
      title: 'Explora nuestras soluciones tecnológicas',
      copy:
        'Agrupamos los servicios por objetivo operativo para que identifiques con rapidez qué frente tecnológico necesita tu empresa.',
      items: [
        {
          code: 'GTI',
          title: 'Gestión y Gobierno TI',
          copy:
            'Ordenamos la operación tecnológica con prácticas de control, soporte y mejora continua para equipos de TI.',
          cta: 'Ver servicios',
          href: '/soluciones-tecnologicas/gestion-gobierno-ti/',
        },
        {
          code: 'AUTO',
          title: 'Automatización y Optimización',
          copy:
            'Detectamos fricciones operativas y diseñamos soluciones que reducen trabajo manual, errores y tiempos de ciclo.',
          cta: 'Ver servicios',
          href: '#',
        },
        {
          code: 'DEV',
          title: 'Desarrollo de Software',
          copy:
            'Construimos aplicaciones alineadas a la operación real del negocio, con validación funcional antes de escalar.',
          cta: 'Ver servicios',
          href: '#',
        },
        {
          code: 'OPS',
          title: 'Infraestructura y nube',
          copy:
            'Diseñamos bases tecnológicas estables para operar, integrar y crecer con continuidad en entornos locales o nube.',
          cta: 'Ver servicios',
          href: '#',
        },
        {
          code: 'DATA',
          title: 'Datos e Inteligencia Empresarial',
          copy:
            'Conectamos datos y sistemas para convertir información dispersa en control, trazabilidad y decisiones oportunas.',
          cta: 'Ver servicios',
          href: '#',
        },
        {
          code: 'INN',
          title: 'Innovación Tecnológica',
          copy:
            'Aterrizamos tecnologías emergentes en casos de uso viables para modernizar procesos y habilitar nuevos modelos.',
          cta: 'Ver servicios',
          href: '#',
        },
      ],
    },
    benefits: {
      eyebrow: 'Beneficios para tu negocio',
      title: 'Resultados que generan valor para tu organización',
      copy:
        'Traducimos tecnología en mejoras visibles para la operación: más control, menos fricción y mayor capacidad para crecer.',
      items: [
        {
          value: '01',
          title: 'Productividad',
          copy: 'Equipos con procesos más claros, menos retrabajo y herramientas conectadas a su operación diaria.',
        },
        {
          value: '02',
          title: 'Reducción de costos',
          copy: 'Menos fallas, tareas manuales y dependencias técnicas que elevan el costo operativo.',
        },
        {
          value: '03',
          title: 'Continuidad operativa',
          copy: 'Infraestructura, soporte y documentación para sostener la operación sin interrupciones innecesarias.',
        },
        {
          value: '04',
          title: 'Escalabilidad y seguridad',
          copy: 'Soluciones preparadas para crecer con controles, datos protegidos y decisiones técnicas sostenibles.',
        },
      ],
    },
    contact: {
      eyebrow: 'Diagnóstico inicial',
      title: 'Hablemos de la tecnología que está frenando tu operación.',
      copy:
        'Cuéntanos qué sistema, proceso, infraestructura o flujo necesita ordenarse. Revisaremos tu caso para proponer el siguiente paso con claridad.',
    },
  },
  en: {
    metadata: {
      title: 'AGSIT Technology Solutions | Technology for business outcomes',
      description:
        'Technology solutions for companies: software audits, requirements, development, testing, support, databases, servers, ERP, cloud and development methodologies.',
      canonicalUrl: 'https://agsit.com.mx/en/technology-solutions/',
      htmlLang: 'en',
      locale: 'en_US',
    },
    hero: {
      eyebrow: 'ITS 360° technology solutions',
      title: ['Technology that powers', 'your growth'],
      copy:
        'We diagnose, design and implement technology solutions aligned with real business operations: software, infrastructure, cloud, data, testing and corporate systems with end-to-end traceability.',
      primaryCta: 'Request assessment',
      metrics: [
        { value: '01', label: 'Less rework caused by failures, disconnected systems and unclear requirements.' },
        { value: '02', label: 'More control over data, infrastructure, quality and business continuity.' },
        { value: '03', label: 'Staged implementations with documentation and team adoption.' },
      ],
    },
    method: {
      eyebrow: 'AGSIT method',
      title: 'From technical need to measurable operational outcome.',
      copy:
        'We do not start with a tool. We start with the business problem, its constraints, risks and dependencies to define a viable, scalable and manageable solution.',
      steps: [
        {
          label: 'Diagnose',
          title: 'We understand the friction point',
          copy:
            'We map processes, current systems, technical and functional requirements, dependencies, operational risks and gaps.',
          outcome: 'Scope and risks defined from the start.',
        },
        {
          label: 'Prioritize',
          title: 'We define an executable roadmap',
          copy:
            'We organize initiatives by impact, urgency, complexity and internal capacity to avoid long projects with no visible return.',
          outcome: 'Decisions based on business criteria.',
        },
        {
          label: 'Implement',
          title: 'We build, integrate and validate',
          copy:
            'We develop software, configure systems, automate workflows, test deliverables and document every critical component.',
          outcome: 'Controlled and verifiable execution.',
        },
        {
          label: 'Evolve',
          title: 'We measure adoption and continuity',
          copy:
            'We support training, indicators, security, technical support and improvements so the solution keeps responding to growth.',
          outcome: 'Sustainable technology, not dependency.',
        },
      ],
    },
    capabilities: {
      eyebrow: 'Service catalog',
      title: 'Explore our technology solutions',
      copy:
        'We group services by operational goal so you can quickly identify which technology front your company needs.',
      items: [
        {
          code: 'ITG',
          title: 'IT Management and Governance',
          copy:
            'We structure technology operations with control, support and continuous improvement practices for IT teams.',
          cta: 'View services',
          href: '/en/technology-solutions/it-management-governance/',
        },
        {
          code: 'AUTO',
          title: 'Automation and Optimization',
          copy:
            'We identify operational friction and design solutions that reduce manual work, errors and cycle times.',
          cta: 'View services',
          href: '#',
        },
        {
          code: 'DEV',
          title: 'Software Development',
          copy:
            'We build applications aligned with real business operations, with functional validation before scaling.',
          cta: 'View services',
          href: '#',
        },
        {
          code: 'OPS',
          title: 'Infrastructure and Cloud',
          copy:
            'We design stable technology foundations to operate, integrate and grow with continuity on-premise or in cloud environments.',
          cta: 'View services',
          href: '#',
        },
        {
          code: 'DATA',
          title: 'Data and Business Intelligence',
          copy:
            'We connect data and systems to turn scattered information into control, traceability and timely decisions.',
          cta: 'View services',
          href: '#',
        },
        {
          code: 'INN',
          title: 'Technology Innovation',
          copy:
            'We bring emerging technologies into viable use cases to modernize processes and enable new operating models.',
          cta: 'View services',
          href: '#',
        },
      ],
    },
    benefits: {
      eyebrow: 'Business benefits',
      title: 'Outcomes that create value for your organization',
      copy:
        'We translate technology into visible operational improvements: more control, less friction and greater capacity to grow.',
      items: [
        {
          value: '01',
          title: 'Productivity',
          copy: 'Teams work with clearer processes, less rework and tools connected to daily operations.',
        },
        {
          value: '02',
          title: 'Cost reduction',
          copy: 'Fewer failures, manual tasks and technical dependencies that increase operational cost.',
        },
        {
          value: '03',
          title: 'Operational continuity',
          copy: 'Infrastructure, support and documentation to sustain operations without unnecessary interruptions.',
        },
        {
          value: '04',
          title: 'Scalability and security',
          copy: 'Solutions prepared to grow with controls, protected data and sustainable technical decisions.',
        },
      ],
    },
    contact: {
      eyebrow: 'Initial assessment',
      title: 'Let’s discuss the technology slowing down your operation.',
      copy:
        'Tell us which system, process, infrastructure or workflow needs structure. We will review your case and propose a clear next step.',
    },
  },
};

export function getTechnologySolutionsContent(lang: SupportedLang) {
  return technologySolutionsByLang[lang];
}

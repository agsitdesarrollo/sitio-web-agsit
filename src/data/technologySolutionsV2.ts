import type { SupportedLang } from '../i18n/ui';

export type TechnologyV2Metric = {
  value: string;
  label: string;
};

export type TechnologyV2Step = {
  label: string;
  title: string;
  copy: string;
  outcome: string;
};

export type TechnologyV2Capability = {
  code: string;
  title: string;
  copy: string;
  services: string[];
};

export type TechnologySolutionsV2Content = {
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
    secondaryCta: string;
    metrics: TechnologyV2Metric[];
  };
  method: {
    eyebrow: string;
    title: string;
    copy: string;
    steps: TechnologyV2Step[];
  };
  capabilities: {
    eyebrow: string;
    title: string;
    copy: string;
    items: TechnologyV2Capability[];
  };
  contact: {
    eyebrow: string;
    title: string;
    copy: string;
  };
};

export const technologySolutionsV2ByLang: Record<SupportedLang, TechnologySolutionsV2Content> = {
  es: {
    metadata: {
      title: 'Soluciones Tecnológicas V2 AGSIT | Tecnología para resultados de negocio',
      description:
        'Soluciones tecnológicas para empresas: auditoría de software, requerimientos, desarrollo, testing, soporte, bases de datos, servidores, ERP, nube y metodologías de desarrollo.',
      canonicalUrl: 'https://agsit.com.mx/soluciones-tecnologicas-v2/',
      htmlLang: 'es-MX',
      locale: 'es_MX',
    },
    hero: {
      eyebrow: 'Soluciones tecnológicas ITS 360°',
      title: 'Tecnología que corrige fricciones, conecta procesos y acelera decisiones.',
      copy:
        'Diagnosticamos, diseñamos e implementamos soluciones tecnológicas alineadas a la operación real del negocio: software, infraestructura, nube, datos, testing y sistemas corporativos con trazabilidad de punta a punta.',
      primaryCta: 'Solicitar diagnóstico',
      secondaryCta: 'Ver capacidades',
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
          outcome: 'Claridad de alcance antes de invertir.',
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
      eyebrow: 'Capacidades tecnológicas',
      title: 'Servicios agrupados para resolver problemas completos, no tareas aisladas.',
      copy:
        'Integramos la línea de Soluciones Tecnológicas de AGSIT en pilares ejecutivos que cubren diagnóstico, construcción, operación y evolución.',
      items: [
        {
          code: 'AUD',
          title: 'Auditoría y requerimientos',
          copy:
            'Convertimos necesidades dispersas en criterios técnicos, funcionales y de control para tomar decisiones con evidencia.',
          services: ['Auditoría de software', 'Requerimientos técnicos y funcionales', 'Documentación y trazabilidad'],
        },
        {
          code: 'DEV',
          title: 'Software y aplicaciones',
          copy:
            'Diseñamos soluciones a la medida para digitalizar procesos, conectar usuarios y reducir trabajo manual.',
          services: ['Diseño de soluciones tecnológicas', 'Desarrollo de software', 'Apps móviles'],
        },
        {
          code: 'QA',
          title: 'Automatización y testing',
          copy:
            'Validamos calidad antes de escalar y automatizamos flujos críticos para sostener eficiencia operativa.',
          services: ['Testing funcional', 'Pruebas de desarrollo', 'Automatización de procesos'],
        },
        {
          code: 'OPS',
          title: 'Infraestructura y nube',
          copy:
            'Administramos bases técnicas que permiten continuidad, seguridad, escalabilidad y operación estable.',
          services: ['Servidores', 'Infraestructura cloud', 'Servicios administrados'],
        },
        {
          code: 'ERP',
          title: 'Sistemas corporativos',
          copy:
            'Implementamos e integramos plataformas empresariales para ordenar información, procesos y responsabilidades.',
          services: ['ERPs', 'Sistemas corporativos', 'Integraciones operativas'],
        },
        {
          code: 'GOV',
          title: 'Soporte, datos y metodologías',
          copy:
            'Dejamos capacidades instaladas para operar, medir, mantener y evolucionar la solución dentro del negocio.',
          services: ['Soporte técnico', 'Bases de datos', 'Capacitación en metodologías'],
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
      title: 'AGSIT Technology Solutions V2 | Technology for business outcomes',
      description:
        'Technology solutions for companies: software audits, requirements, development, testing, support, databases, servers, ERP, cloud and development methodologies.',
      canonicalUrl: 'https://agsit.com.mx/en/technology-solutions-v2/',
      htmlLang: 'en',
      locale: 'en_US',
    },
    hero: {
      eyebrow: 'ITS 360° technology solutions',
      title: 'Technology that removes friction, connects operations and accelerates decisions.',
      copy:
        'We diagnose, design and implement technology solutions aligned with real business operations: software, infrastructure, cloud, data, testing and corporate systems with end-to-end traceability.',
      primaryCta: 'Request assessment',
      secondaryCta: 'View capabilities',
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
          outcome: 'Clear scope before investing.',
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
      eyebrow: 'Technology capabilities',
      title: 'Services grouped to solve complete problems, not isolated tasks.',
      copy:
        'We organize AGSIT Technology Solutions into executive pillars that cover diagnosis, build, operation and evolution.',
      items: [
        {
          code: 'AUD',
          title: 'Audit and requirements',
          copy:
            'We turn scattered needs into technical, functional and control criteria so decisions are based on evidence.',
          services: ['Software audit', 'Technical and functional requirements', 'Documentation and traceability'],
        },
        {
          code: 'DEV',
          title: 'Software and applications',
          copy:
            'We design custom solutions to digitize processes, connect users and reduce manual work.',
          services: ['Technology solution design', 'Software development', 'Mobile applications'],
        },
        {
          code: 'QA',
          title: 'Automation and testing',
          copy:
            'We validate quality before scaling and automate critical workflows to sustain operational efficiency.',
          services: ['Functional testing', 'Development testing', 'Process automation'],
        },
        {
          code: 'OPS',
          title: 'Infrastructure and cloud',
          copy:
            'We manage the technical foundations that enable continuity, security, scalability and stable operation.',
          services: ['Servers', 'Cloud infrastructure', 'Managed services'],
        },
        {
          code: 'ERP',
          title: 'Corporate systems',
          copy:
            'We implement and integrate enterprise platforms to organize information, processes and responsibilities.',
          services: ['ERP systems', 'Corporate systems', 'Operational integrations'],
        },
        {
          code: 'GOV',
          title: 'Support, data and methods',
          copy:
            'We install capabilities to operate, measure, maintain and evolve the solution inside the business.',
          services: ['Technical support', 'Databases', 'Development methodology training'],
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

export function getTechnologySolutionsV2Content(lang: SupportedLang) {
  return technologySolutionsV2ByLang[lang];
}

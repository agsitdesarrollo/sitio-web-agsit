import type { SupportedLang } from '../i18n/ui';

export type TechnologyFeature = {
  title: string;
  copy: string;
};

export type TechnologyProcessStep = {
  label: string;
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
    title: string;
    copy: string;
    primaryCta: string;
    secondaryCta: string;
    stats: TechnologyFeature[];
  };
  suite: {
    eyebrow: string;
    title: string;
    copy: string;
    features: TechnologyFeature[];
  };
  cloud: {
    eyebrow: string;
    title: string;
    copy: string;
    capabilities: string[];
  };
  process: {
    eyebrow: string;
    title: string;
    steps: TechnologyProcessStep[];
  };
  assurance: {
    title: string;
    copy: string;
    items: TechnologyFeature[];
  };
  cta: {
    eyebrow: string;
    title: string;
    copy: string;
    action: string;
  };
};

export const technologySolutionsByLang: Record<SupportedLang, TechnologySolutionsContent> = {
  es: {
    metadata: {
      title: 'Soluciones Tecnológicas AGSIT | Tecnología, cloud y automatización',
      description:
        'Servicios integrales de tecnología y transformación digital: auditoría tecnológica, desarrollo de software, automatización, testing, infraestructura, nube y sistemas corporativos.',
      canonicalUrl: 'https://agsit.com.mx/soluciones-tecnologicas/',
      htmlLang: 'es-MX',
      locale: 'es_MX',
    },
    hero: {
      eyebrow: 'ITS 360°',
      title: 'Soluciones tecnológicas para operar con más control, velocidad y datos.',
      copy:
        'Integramos consultoría tecnológica, software a la medida, automatización, testing, infraestructura y nube para que la tecnología deje de ser un gasto aislado y se convierta en una plataforma de crecimiento.',
      primaryCta: 'Solicitar diagnóstico',
      secondaryCta: 'Ver alcance del servicio',
      stats: [
        { title: 'Software', copy: 'Diseño, desarrollo, documentación y control de calidad.' },
        { title: 'Cloud', copy: 'SaaS, PaaS, IaaS y administración segura de infraestructura.' },
        { title: 'Testing', copy: 'Pruebas, validación y aseguramiento antes de escalar.' },
        { title: 'Automatización', copy: 'Monitoreo, control y flujos que reducen carga operativa.' },
      ],
    },
    suite: {
      eyebrow: 'Plataforma corporativa',
      title: 'Arquitectura digital alineada a la operación real del negocio.',
      copy:
        'Partimos de objetivos tecnológicos claros y diseñamos soluciones que conectan áreas, procesos, usuarios e indicadores sin imponer herramientas desconectadas.',
      features: [
        {
          title: 'Consultoría y auditoría tecnológica',
          copy: 'Evaluación de sistemas, requerimientos, riesgos, brechas operativas y oportunidades de modernización.',
        },
        {
          title: 'Desarrollo de software',
          copy: 'Aplicaciones web, portales, sistemas internos y soluciones a la medida con metodologías ágiles y seguras.',
        },
        {
          title: 'ERP y sistemas corporativos',
          copy: 'Implementación, configuración, personalización e integración con procesos administrativos y operativos.',
        },
        {
          title: 'Automatización y testing',
          copy: 'Flujos automáticos, pruebas funcionales, validación de software y monitoreo para sostener calidad.',
        },
      ],
    },
    cloud: {
      eyebrow: 'Arquitectura cloud',
      title: 'Infraestructura y nube pensadas para evolucionar.',
      copy:
        'Diagnosticamos necesidades tecnológicas, seleccionamos el modelo cloud adecuado y dejamos capacidades instaladas para administrar, proteger y evolucionar la infraestructura.',
      capabilities: [
        'Selección de modelo SaaS, PaaS o IaaS.',
        'Diseño de arquitectura cloud y servicios administrados.',
        'Seguridad, protección y continuidad de infraestructura.',
        'Capacitación para administración y gobierno cloud.',
        'Soporte técnico y evolución por etapas.',
      ],
    },
    process: {
      eyebrow: 'Método AGSIT',
      title: 'De la auditoría a la adopción, con trazabilidad.',
      steps: [
        {
          label: '01',
          title: 'Diagnóstico',
          copy: 'Levantamos sistemas, procesos, objetivos tecnológicos, dependencias y puntos de fricción.',
        },
        {
          label: '02',
          title: 'Diseño',
          copy: 'Definimos arquitectura, alcance funcional, integraciones, seguridad y plan de implementación.',
        },
        {
          label: '03',
          title: 'Construcción',
          copy: 'Desarrollamos, configuramos o integramos la solución con ciclos de validación y documentación.',
        },
        {
          label: '04',
          title: 'Evolución',
          copy: 'Medimos desempeño, automatizamos controles y ajustamos la plataforma conforme crece la operación.',
        },
      ],
    },
    assurance: {
      title: 'Tecnología confiable, medible y administrable.',
      copy:
        'El valor no está solo en lanzar una herramienta. Está en que el equipo pueda operarla, medirla, protegerla y mejorarla.',
      items: [
        { title: 'Indicadores', copy: 'KPIs, tableros y reportes para evaluar adopción, calidad y eficiencia.' },
        { title: 'Seguridad', copy: 'Controles para proteger información, accesos, infraestructura y continuidad.' },
        { title: 'Documentación', copy: 'Manuales, criterios de prueba y conocimiento transferible al equipo.' },
      ],
    },
    cta: {
      eyebrow: 'Diagnóstico tecnológico',
      title: 'Agenda un diagnóstico tecnológico.',
      copy:
        'Cuéntanos qué sistemas, procesos o infraestructura están frenando la operación. Revisaremos tu solicitud para orientar el siguiente paso con claridad.',
      action: 'Agendar asesoría',
    },
  },
  en: {
    metadata: {
      title: 'AGSIT Technology Solutions | Software, cloud and automation',
      description:
        'Integrated technology and digital transformation services: technology audit, software development, automation, testing, infrastructure, cloud and corporate systems.',
      canonicalUrl: 'https://agsit.com.mx/en/technology-solutions/',
      htmlLang: 'en',
      locale: 'en_US',
    },
    hero: {
      eyebrow: 'ITS 360°',
      title: 'Technology solutions for more control, speed and business data.',
      copy:
        'We integrate technology consulting, custom software, automation, testing, infrastructure and cloud so technology becomes a growth platform instead of an isolated expense.',
      primaryCta: 'Request assessment',
      secondaryCta: 'View service scope',
      stats: [
        { title: 'Software', copy: 'Design, development, documentation and quality control.' },
        { title: 'Cloud', copy: 'SaaS, PaaS, IaaS and secure infrastructure administration.' },
        { title: 'Testing', copy: 'Testing, validation and assurance before scaling.' },
        { title: 'Automation', copy: 'Monitoring, control and workflows that reduce operational load.' },
      ],
    },
    suite: {
      eyebrow: 'Corporate platform',
      title: 'Digital architecture aligned to real business operations.',
      copy:
        'We start from clear technology objectives and design solutions that connect teams, processes, users and indicators without forcing disconnected tools.',
      features: [
        {
          title: 'Technology consulting and audit',
          copy: 'Assessment of systems, requirements, risks, operational gaps and modernization opportunities.',
        },
        {
          title: 'Software development',
          copy: 'Web applications, portals, internal systems and custom solutions with agile and secure methods.',
        },
        {
          title: 'ERP and corporate systems',
          copy: 'Implementation, configuration, customization and integration with administrative and operational processes.',
        },
        {
          title: 'Automation and testing',
          copy: 'Automated workflows, functional testing, software validation and monitoring to sustain quality.',
        },
      ],
    },
    cloud: {
      eyebrow: 'Cloud architecture',
      title: 'Infrastructure and cloud designed to evolve.',
      copy:
        'We diagnose technology needs, select the right cloud model and install capabilities to administer, protect and evolve infrastructure.',
      capabilities: [
        'SaaS, PaaS or IaaS model selection.',
        'Cloud architecture and managed services design.',
        'Security, protection and infrastructure continuity.',
        'Training for cloud administration and governance.',
        'Technical support and staged evolution.',
      ],
    },
    process: {
      eyebrow: 'AGSIT method',
      title: 'From audit to adoption, with traceability.',
      steps: [
        {
          label: '01',
          title: 'Diagnosis',
          copy: 'We map systems, processes, technology objectives, dependencies and friction points.',
        },
        {
          label: '02',
          title: 'Design',
          copy: 'We define architecture, functional scope, integrations, security and the implementation plan.',
        },
        {
          label: '03',
          title: 'Build',
          copy: 'We develop, configure or integrate the solution with validation cycles and documentation.',
        },
        {
          label: '04',
          title: 'Evolution',
          copy: 'We measure performance, automate controls and adjust the platform as operations grow.',
        },
      ],
    },
    assurance: {
      title: 'Reliable, measurable and manageable technology.',
      copy:
        'The value is not only launching a tool. It is making sure the team can operate, measure, protect and improve it.',
      items: [
        { title: 'Indicators', copy: 'KPIs, dashboards and reports to evaluate adoption, quality and efficiency.' },
        { title: 'Security', copy: 'Controls to protect information, access, infrastructure and continuity.' },
        { title: 'Documentation', copy: 'Manuals, testing criteria and transferable knowledge for the team.' },
      ],
    },
    cta: {
      eyebrow: 'Technology assessment',
      title: 'Schedule a technology assessment.',
      copy:
        'Tell us which systems, processes or infrastructure are slowing your operation down. We will review your request and guide the next step with clarity.',
      action: 'Schedule consultation',
    },
  },
};

export function getTechnologySolutionsContent(lang: SupportedLang) {
  return technologySolutionsByLang[lang];
}

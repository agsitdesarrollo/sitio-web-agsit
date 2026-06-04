import type { SupportedLang } from '../i18n/ui';

export type ProjectDirectionService = {
  code: string;
  title: string;
  copy: string;
};

export type ProjectDirectionStage = {
  label: string;
  title: string;
  copy: string;
};

export type ProjectDirectionMetric = {
  value: string;
  label: string;
  copy: string;
};

export type ProjectDirectionContent = {
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
    signals: string[];
  };
  services: {
    eyebrow: string;
    title: string;
    copy: string;
    items: ProjectDirectionService[];
  };
  governance: {
    eyebrow: string;
    title: string;
    copy: string;
    metrics: ProjectDirectionMetric[];
  };
  roadmap: {
    title: string;
    copy: string;
    stages: ProjectDirectionStage[];
  };
  outcomes: {
    title: string;
    items: string[];
  };
  cta: {
    eyebrow: string;
    title: string;
    copy: string;
  };
};

export const projectDirectionByLang: Record<SupportedLang, ProjectDirectionContent> = {
  es: {
    metadata: {
      title: 'Dirección de Proyectos AGSIT | PMO, gobierno y ejecución',
      description:
        'Dirección de proyectos con diagnóstico, auditoría, PMO, metodologías ágiles o predictivas, gobierno, capacitación y control de alcance, tiempo y costo.',
      canonicalUrl: 'https://agsit.com.mx/direccion-de-proyectos/',
      htmlLang: 'es-MX',
      locale: 'es_MX',
    },
    hero: {
      eyebrow: 'Project Management 360°',
      title: 'Dirección de proyectos para ejecutar con control.',
      copy:
        'Alineamos estrategia, alcance, equipos, riesgos y seguimiento ejecutivo para que los proyectos dejen de depender de esfuerzos aislados y avancen con gobierno real.',
      primaryCta: 'Solicitar evaluación',
      secondaryCta: 'Ver enfoque',
      signals: ['Alcance', 'Tiempo', 'Costo', 'Riesgo'],
    },
    services: {
      eyebrow: 'Servicios de dirección',
      title: 'Instalamos la disciplina necesaria para entregar proyectos.',
      copy:
        'Partimos del nivel de madurez actual, definimos el modelo operativo adecuado y acompañamos la ejecución con prácticas entendibles para negocio y equipos técnicos.',
      items: [
        {
          code: '01',
          title: 'Diagnóstico y auditoría de proyectos',
          copy: 'Evaluamos estado, desviaciones, riesgos, dependencias, entregables y capacidad real del equipo para recuperar visibilidad.',
        },
        {
          code: '02',
          title: 'Diseño e implementación de PMO',
          copy: 'Definimos estructura, roles, cadencias, tableros, lineamientos y mecanismos de seguimiento para dirigir el portafolio.',
        },
        {
          code: '03',
          title: 'Metodologías ágiles, predictivas o híbridas',
          copy: 'Seleccionamos la forma de gestión según el contexto del proyecto, no por moda: Scrum, Kanban, waterfall o modelos híbridos.',
        },
        {
          code: '04',
          title: 'Capacitación y acompañamiento',
          copy: 'Formamos líderes, sponsors y equipos en prácticas de planeación, control, gestión de riesgos y comunicación ejecutiva.',
        },
      ],
    },
    governance: {
      eyebrow: 'Gobierno y control',
      title: 'Cada proyecto necesita decisiones oportunas, no solo reportes.',
      copy:
        'Construimos un sistema de gestión donde los indicadores muestran avances reales, riesgos activos, responsables y acciones correctivas antes de que el costo se dispare.',
      metrics: [
        {
          value: 'PMO',
          label: 'Oficina de proyectos',
          copy: 'Modelo de gobierno para priorizar, dar seguimiento y escalar decisiones.',
        },
        {
          value: 'OPM3',
          label: 'Madurez organizacional',
          copy: 'Evaluación de capacidades para institucionalizar mejores prácticas.',
        },
        {
          value: 'PMP',
          label: 'Ejecución profesional',
          copy: 'Disciplina de alcance, cronograma, costos, riesgos y comunicación.',
        },
      ],
    },
    roadmap: {
      title: 'Del proyecto aislado a una operación de portafolio.',
      copy:
        'La dirección efectiva no consiste en llenar formatos. Consiste en crear claridad, sostener acuerdos y convertir la ejecución en evidencia medible.',
      stages: [
        { label: '01', title: 'Evaluar', copy: 'Revisión de madurez, proyectos activos, herramientas, roles y principales fuentes de desviación.' },
        { label: '02', title: 'Diseñar', copy: 'Definición del modelo de gobierno, metodología, tableros, rituales y reglas de escalamiento.' },
        { label: '03', title: 'Implementar', copy: 'Despliegue de prácticas con responsables, repositorios, plantillas, tableros y control de cambios.' },
        { label: '04', title: 'Acompañar', copy: 'Seguimiento ejecutivo, gestión de riesgos, capacitación y ajustes por aprendizaje operativo.' },
      ],
    },
    outcomes: {
      title: 'Lo que debe mejorar cuando existe dirección profesional.',
      items: [
        'Menos desviaciones de alcance, tiempo y presupuesto.',
        'Priorización clara entre iniciativas críticas y actividades de bajo impacto.',
        'Sponsors y responsables con visibilidad para tomar decisiones.',
        'Equipos alineados con una metodología común y aplicable.',
        'Portafolio medible con indicadores, riesgos y avances reales.',
      ],
    },
    cta: {
      eyebrow: 'Evaluación de proyectos',
      title: 'Cuéntanos qué proyecto necesita dirección.',
      copy:
        'Comparte el estado actual, el principal bloqueo o el tipo de portafolio que quieres ordenar. Revisaremos el caso para proponer el siguiente paso.',
    },
  },
  en: {
    metadata: {
      title: 'AGSIT Project Management | PMO, governance and execution',
      description:
        'Project management with diagnosis, auditing, PMO, agile or predictive methodologies, governance, training and scope, time and cost control.',
      canonicalUrl: 'https://agsit.com.mx/en/project-management/',
      htmlLang: 'en',
      locale: 'en_US',
    },
    hero: {
      eyebrow: 'Project Management 360°',
      title: 'Project direction to execute with control.',
      copy:
        'We align strategy, scope, teams, risks and executive follow-up so projects stop depending on isolated efforts and move forward with real governance.',
      primaryCta: 'Request assessment',
      secondaryCta: 'View approach',
      signals: ['Scope', 'Time', 'Cost', 'Risk'],
    },
    services: {
      eyebrow: 'Project direction services',
      title: 'We install the discipline required to deliver projects.',
      copy:
        'We start from the current maturity level, define the right operating model and support execution with practices that business and technical teams can actually use.',
      items: [
        {
          code: '01',
          title: 'Project diagnosis and auditing',
          copy: 'We assess status, deviations, risks, dependencies, deliverables and team capacity to recover visibility.',
        },
        {
          code: '02',
          title: 'PMO design and implementation',
          copy: 'We define structure, roles, cadence, dashboards, guidelines and follow-up mechanisms to manage the portfolio.',
        },
        {
          code: '03',
          title: 'Agile, predictive or hybrid methodologies',
          copy: 'We select the management approach based on project context: Scrum, Kanban, waterfall or hybrid models.',
        },
        {
          code: '04',
          title: 'Training and execution support',
          copy: 'We train leaders, sponsors and teams in planning, control, risk management and executive communication.',
        },
      ],
    },
    governance: {
      eyebrow: 'Governance and control',
      title: 'Every project needs timely decisions, not just reports.',
      copy:
        'We build a management system where indicators show real progress, active risks, owners and corrective actions before cost escalates.',
      metrics: [
        {
          value: 'PMO',
          label: 'Project office',
          copy: 'Governance model to prioritize, track and escalate decisions.',
        },
        {
          value: 'OPM3',
          label: 'Organizational maturity',
          copy: 'Capability assessment to institutionalize best practices.',
        },
        {
          value: 'PMP',
          label: 'Professional execution',
          copy: 'Discipline for scope, schedule, cost, risk and communication.',
        },
      ],
    },
    roadmap: {
      title: 'From isolated projects to portfolio operation.',
      copy:
        'Effective direction is not about filling templates. It is about creating clarity, sustaining agreements and turning execution into measurable evidence.',
      stages: [
        { label: '01', title: 'Assess', copy: 'Review maturity, active projects, tools, roles and the main sources of deviation.' },
        { label: '02', title: 'Design', copy: 'Define governance, methodology, dashboards, ceremonies and escalation rules.' },
        { label: '03', title: 'Implement', copy: 'Deploy practices with owners, repositories, templates, dashboards and change control.' },
        { label: '04', title: 'Support', copy: 'Executive follow-up, risk management, training and adjustments based on operational learning.' },
      ],
    },
    outcomes: {
      title: 'What should improve with professional project direction.',
      items: [
        'Fewer scope, time and budget deviations.',
        'Clear prioritization between critical initiatives and low-impact activities.',
        'Sponsors and owners with visibility to make decisions.',
        'Teams aligned around a common and applicable methodology.',
        'Measurable portfolio with indicators, risks and real progress.',
      ],
    },
    cta: {
      eyebrow: 'Project assessment',
      title: 'Tell us which project needs direction.',
      copy:
        'Share the current status, main blocker or type of portfolio you want to organize. We will review the case and suggest the next step.',
    },
  },
};

export function getProjectDirectionContent(lang: SupportedLang) {
  return projectDirectionByLang[lang];
}

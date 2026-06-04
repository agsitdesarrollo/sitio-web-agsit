import type { SupportedLang } from '../i18n/ui';

export type ProcessPillar = {
  code: string;
  title: string;
  copy: string;
  points: string[];
};

export type ProcessStep = {
  label: string;
  title: string;
  copy: string;
};

export type ProcessMetric = {
  value: string;
  label: string;
  copy: string;
};

export type ProcessManagementContent = {
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
    nodes: string[];
  };
  video: {
    eyebrow: string;
    title: string;
    copy: string;
    src: string;
    label: string;
  };
  pillars: {
    eyebrow: string;
    title: string;
    copy: string;
    items: ProcessPillar[];
  };
  flow: {
    title: string;
    copy: string;
    steps: ProcessStep[];
  };
  control: {
    eyebrow: string;
    title: string;
    copy: string;
    metrics: ProcessMetric[];
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

export const processManagementByLang: Record<SupportedLang, ProcessManagementContent> = {
  es: {
    metadata: {
      title: 'Administración de Procesos AGSIT | BPM 360 y mejora operativa',
      description:
        'Administración de procesos de negocio con diagnóstico AS-IS, modelado BPMN, análisis, diseño, automatización, KPIs, auditoría y mejora continua.',
      canonicalUrl: 'https://agsit.com.mx/administracion-de-procesos/',
      htmlLang: 'es-MX',
      locale: 'es_MX',
    },
    hero: {
      eyebrow: 'BPM 360°',
      title: 'Transformamos procesos en resultados medibles.',
      copy:
        'Analizamos, documentamos, rediseñamos y automatizamos la operación para reducir fricción, controlar la calidad y escalar sin perder visibilidad.',
      primaryCta: 'Solicitar diagnóstico',
      secondaryCta: 'Ver metodología',
      nodes: ['AS-IS', 'BPMN', 'KPIs', 'BPMS', 'TO-BE'],
    },
    video: {
      eyebrow: 'Video BPM 360°',
      title: 'Visualiza cómo una operación ordenada cambia los resultados.',
      copy:
        'Integramos el video original de AGSIT como apoyo visual para explicar el alcance del servicio: levantar, analizar, automatizar y medir procesos con una visión completa.',
      src: 'https://agsit.com.mx/wp-content/uploads/2025/08/AGSIT%20BPM%20360.mp4',
      label: 'Video de Administración de Procesos BPM 360 de AGSIT',
    },
    pillars: {
      eyebrow: 'Administración de procesos de negocio',
      title: 'Ordenamos cómo trabaja la empresa antes de automatizar.',
      copy:
        'Un proceso útil no vive solo en un diagrama. Debe tener responsables, reglas, métricas, controles y una forma clara de evolucionar.',
      items: [
        {
          code: 'BPM',
          title: 'Gestión de procesos',
          copy: 'Modelo de madurez, diagnóstico, capacitación, mejora continua y reingeniería con enfoque operativo.',
          points: ['PEMM / CMMI', 'Ciclo Deming', 'Six Sigma'],
        },
        {
          code: 'MAP',
          title: 'Modelado',
          copy: 'Representamos procesos, eventos y reglas con notaciones entendibles para negocio y tecnología.',
          points: ['BPMN', 'EPC', 'UML'],
        },
        {
          code: 'ANA',
          title: 'Análisis',
          copy: 'Revisamos estructura documental, controles, parámetros de calidad e indicadores de desempeño.',
          points: ['KPIs', 'Controles', 'Calidad'],
        },
        {
          code: 'DSN',
          title: 'Diseño',
          copy: 'Levantamos macroprocesos, subprocesos, estructura documental, simulación y control de cambios.',
          points: ['AS-IS / TO-BE', 'Simulación', 'Cambios'],
        },
        {
          code: 'AUTO',
          title: 'Automatización',
          copy: 'Definimos reglas de negocio, flujos administrativos y tableros para operar con seguimiento real.',
          points: ['BPMS', 'CRM / ERP', 'Tableros'],
        },
      ],
    },
    flow: {
      title: 'Del diagnóstico actual al control operativo.',
      copy:
        'Acompañamos el ciclo completo: entender cómo opera hoy la organización, diseñar el estado objetivo y dejar mecanismos para medir, auditar y mejorar.',
      steps: [
        { label: '01', title: 'AS-IS', copy: 'Mapeo del proceso actual, roles, documentos, tiempos, sistemas y puntos de fricción.' },
        { label: '02', title: 'Análisis', copy: 'Revisión de controles, métricas, calidad, redundancias y riesgos operativos.' },
        { label: '03', title: 'TO-BE', copy: 'Diseño del proceso objetivo con reglas, responsables, indicadores y estructura documental.' },
        { label: '04', title: 'Implementación', copy: 'Ajuste organizacional, automatización, capacitación y despliegue por etapas.' },
        { label: '05', title: 'Mejora', copy: 'Auditoría, monitoreo, tableros gerenciales y mejora continua basada en datos.' },
      ],
    },
    control: {
      eyebrow: 'Monitoreo y control',
      title: 'Lo que se mide, se puede mejorar.',
      copy:
        'Convertimos la operación en información accionable: rendimiento del proceso, cumplimiento, capacidad, calidad y reportes para dirección.',
      metrics: [
        { value: 'KPIs', label: 'Indicadores claros', copy: 'Métricas por proceso, responsable, tiempo, calidad y desempeño.' },
        { value: 'SPC', label: 'Control estadístico', copy: 'Parámetros para detectar variaciones y corregir antes de escalar.' },
        { value: 'BPMS', label: 'Flujo operativo', copy: 'Automatización de reglas, autorizaciones, tareas y evidencia.' },
      ],
    },
    outcomes: {
      title: 'Razones para dejar tus procesos en manos de expertos.',
      items: [
        'Reducir costos y optimizar recursos.',
        'Estandarizar la operación y mejorar la calidad.',
        'Aumentar productividad sin perder control.',
        'Mejorar la experiencia de clientes internos y externos.',
        'Expandir el negocio con procesos repetibles.',
      ],
    },
    cta: {
      eyebrow: 'Diagnóstico de procesos',
      title: 'Cuéntanos qué proceso necesita orden.',
      copy:
        'Comparte el área, flujo o problema operativo que quieres mejorar. Revisaremos tu caso para proponer el siguiente paso con enfoque BPM.',
    },
  },
  en: {
    metadata: {
      title: 'AGSIT Process Management | BPM 360 and operational improvement',
      description:
        'Business process management with AS-IS diagnosis, BPMN modeling, analysis, design, automation, KPIs, auditing and continuous improvement.',
      canonicalUrl: 'https://agsit.com.mx/en/process-management/',
      htmlLang: 'en',
      locale: 'en_US',
    },
    hero: {
      eyebrow: 'BPM 360°',
      title: 'We turn processes into measurable results.',
      copy:
        'We analyze, document, redesign and automate operations to reduce friction, control quality and scale without losing visibility.',
      primaryCta: 'Request diagnosis',
      secondaryCta: 'View methodology',
      nodes: ['AS-IS', 'BPMN', 'KPIs', 'BPMS', 'TO-BE'],
    },
    video: {
      eyebrow: 'BPM 360° video',
      title: 'See how an organized operation changes results.',
      copy:
        'We integrated AGSIT’s original video as visual support to explain the service scope: mapping, analyzing, automating and measuring processes with a complete view.',
      src: 'https://agsit.com.mx/wp-content/uploads/2025/08/AGSIT%20BPM%20360.mp4',
      label: 'AGSIT BPM 360 Process Management video',
    },
    pillars: {
      eyebrow: 'Business process management',
      title: 'We organize how the company works before automating.',
      copy:
        'A useful process does not live only in a diagram. It needs owners, rules, metrics, controls and a clear way to evolve.',
      items: [
        {
          code: 'BPM',
          title: 'Process governance',
          copy: 'Maturity model, diagnosis, training, continuous improvement and operational reengineering.',
          points: ['PEMM / CMMI', 'Deming cycle', 'Six Sigma'],
        },
        {
          code: 'MAP',
          title: 'Modeling',
          copy: 'We represent processes, events and rules with notations that business and technology teams can use.',
          points: ['BPMN', 'EPC', 'UML'],
        },
        {
          code: 'ANA',
          title: 'Analysis',
          copy: 'We review documentation structure, controls, quality parameters and performance indicators.',
          points: ['KPIs', 'Controls', 'Quality'],
        },
        {
          code: 'DSN',
          title: 'Design',
          copy: 'We map macroprocesses, subprocesses, documentation, simulation and change control.',
          points: ['AS-IS / TO-BE', 'Simulation', 'Change'],
        },
        {
          code: 'AUTO',
          title: 'Automation',
          copy: 'We define business rules, administrative flows and dashboards for traceable operation.',
          points: ['BPMS', 'CRM / ERP', 'Dashboards'],
        },
      ],
    },
    flow: {
      title: 'From current diagnosis to operational control.',
      copy:
        'We support the full cycle: understanding how the organization operates today, designing the target state and installing mechanisms to measure, audit and improve.',
      steps: [
        { label: '01', title: 'AS-IS', copy: 'Mapping the current process, roles, documents, timing, systems and friction points.' },
        { label: '02', title: 'Analysis', copy: 'Reviewing controls, metrics, quality, redundancies and operational risks.' },
        { label: '03', title: 'TO-BE', copy: 'Designing the target process with rules, owners, indicators and documentation structure.' },
        { label: '04', title: 'Implementation', copy: 'Organizational adjustment, automation, training and staged deployment.' },
        { label: '05', title: 'Improvement', copy: 'Auditing, monitoring, executive dashboards and data-based continuous improvement.' },
      ],
    },
    control: {
      eyebrow: 'Monitoring and control',
      title: 'What gets measured can be improved.',
      copy:
        'We turn operations into actionable information: process performance, compliance, capacity, quality and executive reports.',
      metrics: [
        { value: 'KPIs', label: 'Clear indicators', copy: 'Metrics by process, owner, time, quality and performance.' },
        { value: 'SPC', label: 'Statistical control', copy: 'Parameters to detect variations and correct them before scaling.' },
        { value: 'BPMS', label: 'Operational flow', copy: 'Automation of rules, approvals, tasks and evidence.' },
      ],
    },
    outcomes: {
      title: 'Why leave your processes in expert hands.',
      items: [
        'Reduce costs and optimize resources.',
        'Standardize operations and improve quality.',
        'Increase productivity without losing control.',
        'Improve the experience of internal and external clients.',
        'Expand the business with repeatable processes.',
      ],
    },
    cta: {
      eyebrow: 'Process diagnosis',
      title: 'Tell us which process needs order.',
      copy:
        'Share the area, workflow or operational problem you want to improve. We will review your case and suggest the next step with a BPM approach.',
    },
  },
};

export function getProcessManagementContent(lang: SupportedLang) {
  return processManagementByLang[lang];
}

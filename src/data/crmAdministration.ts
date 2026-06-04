import type { SupportedLang } from '../i18n/ui';

export type CrmModule = {
  code: string;
  title: string;
  copy: string;
};

export type CrmWorkflow = {
  label: string;
  title: string;
  copy: string;
};

export type CrmCapability = {
  title: string;
  points: string[];
};

export type CrmAdministrationContent = {
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
  contrast: {
    eyebrow: string;
    title: string;
    before: string[];
    after: string[];
  };
  modules: {
    eyebrow: string;
    title: string;
    copy: string;
    items: CrmModule[];
  };
  workflows: {
    title: string;
    copy: string;
    items: CrmWorkflow[];
  };
  ai: {
    eyebrow: string;
    title: string;
    copy: string;
    capabilities: CrmCapability[];
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

export const crmAdministrationByLang: Record<SupportedLang, CrmAdministrationContent> = {
  es: {
    metadata: {
      title: 'Administración CRM AGSIT | Operación comercial y colaboración 360',
      description:
        'Administración CRM para centralizar ventas, marketing, tareas, proyectos, colaboración, analítica, automatización e inteligencia artificial en una sola operación.',
      canonicalUrl: 'https://agsit.com.mx/administracion-crm/',
      htmlLang: 'es-MX',
      locale: 'es_MX',
    },
    hero: {
      eyebrow: 'Conexión Empresarial Total 360°',
      title: 'Un CRM para conectar clientes, equipo y resultados.',
      copy:
        'Centralizamos procesos comerciales, tareas, comunicación, analítica y automatización para que cada área deje de trabajar aislada y la experiencia del cliente mejore desde el primer contacto.',
      primaryCta: 'Solicitar asesoría',
      secondaryCta: 'Ver plataforma',
      signals: ['CRM', 'Tareas', 'Ventas', 'IA'],
    },
    contrast: {
      eyebrow: 'Antes y después',
      title: 'Cuando todo vive en herramientas separadas, el negocio pierde visibilidad.',
      before: [
        'Costos excesivos por múltiples plataformas.',
        'Información duplicada, aislada y sin análisis.',
        'Comunicación fragmentada entre áreas.',
        'Dificultad para medir ventas, tareas y resultados.',
      ],
      after: [
        'Herramientas centralizadas en una sola operación.',
        'Datos unificados con reportes en tiempo real.',
        'Equipos colaborando con procesos claros.',
        'Automatización para acelerar seguimiento y respuesta.',
      ],
    },
    modules: {
      eyebrow: 'Ecosistema CRM',
      title: 'Todo lo que el equipo necesita para operar con agilidad.',
      copy:
        'Integramos gestión comercial, proyectos, colaboración, pagos, firma, sitios, seguimiento de tiempo y analítica para reducir fricción y mejorar control.',
      items: [
        {
          code: 'CRM',
          title: 'Ventas y seguimiento comercial',
          copy: 'Control de leads, tablero Kanban, cotizaciones, facturas, catálogo, comunicaciones y reportes por canal.',
        },
        {
          code: 'TASK',
          title: 'Proyectos y tareas',
          copy: 'Tableros Kanban, Gantt, listas, subtareas, filtros, recordatorios, carga de trabajo y colaboración móvil.',
        },
        {
          code: 'MKT',
          title: 'Marketing y campañas',
          copy: 'Campañas por correo, SMS, WhatsApp, segmentación, automatizaciones, plantillas y medición de ROI.',
        },
        {
          code: 'HR',
          title: 'Recursos humanos',
          copy: 'Directorio, asistencia, ausencias, portal de autoservicio, onboarding y aprobaciones con trazabilidad.',
        },
        {
          code: 'OPS',
          title: 'Operación conectada',
          copy: 'Pagos, firma electrónica, videollamadas, documentos, calendario, sitios web y comunicación centralizada.',
        },
        {
          code: 'DATA',
          title: 'Analítica y control',
          copy: 'KPIs, reportes de progreso, resultados comerciales, tiempos, desempeño y métricas para dirección.',
        },
      ],
    },
    workflows: {
      title: 'De solicitud a resultado, sin perder el hilo.',
      copy:
        'Diseñamos flujos para que cada solicitud, venta o tarea avance con responsables, estados, evidencia y automatizaciones claras.',
      items: [
        { label: '01', title: 'Capturar', copy: 'Centralizar leads, solicitudes, clientes, tareas y comunicaciones desde un solo punto.' },
        { label: '02', title: 'Asignar', copy: 'Distribuir responsabilidades con roles, permisos, fechas, recordatorios y prioridades.' },
        { label: '03', title: 'Automatizar', copy: 'Configurar reglas para notificaciones, cambios de estado, seguimientos y tareas recurrentes.' },
        { label: '04', title: 'Medir', copy: 'Visualizar progreso, embudos, ROI, carga de trabajo y resultados en tiempo real.' },
      ],
    },
    ai: {
      eyebrow: 'Copilot IA',
      title: 'Más que una plataforma: inteligencia para acelerar la operación.',
      copy:
        'La IA ayuda a documentar, resumir, redactar, transcribir y convertir conversaciones en acciones para reducir trabajo manual y mejorar seguimiento.',
      capabilities: [
        {
          title: 'Productividad del equipo',
          points: ['Descripciones y checklists para tareas.', 'Resúmenes de comentarios y videollamadas.', 'Minutas convertidas en tareas accionables.'],
        },
        {
          title: 'Comunicación comercial',
          points: ['Redacción, traducción y corrección de textos.', 'Respuestas inteligentes para seguimiento.', 'Completar campos y mejorar registros CRM.'],
        },
        {
          title: 'Mejora operativa',
          points: ['Detección de ineficiencias.', 'Sugerencias para procesos.', 'Automatización de actividades repetitivas.'],
        },
      ],
    },
    outcomes: {
      title: 'Resultados que deben sentirse en clientes y equipos.',
      items: [
        'Respuestas más rápidas a solicitudes y oportunidades de venta.',
        'Menos costo y menos dispersión tecnológica.',
        'Mayor productividad en tareas y responsabilidades.',
        'Mejor experiencia para clientes internos y externos.',
        'Datos confiables para decisiones comerciales y operativas.',
      ],
    },
    cta: {
      eyebrow: 'Diagnóstico CRM',
      title: 'Cuéntanos qué operación quieres centralizar.',
      copy:
        'Comparte cómo gestionan hoy clientes, ventas, tareas y comunicación. Revisaremos tu caso para definir el flujo y la plataforma adecuada.',
    },
  },
  en: {
    metadata: {
      title: 'AGSIT CRM Administration | 360 commercial operation and collaboration',
      description:
        'CRM administration to centralize sales, marketing, tasks, projects, collaboration, analytics, automation and artificial intelligence in one operation.',
      canonicalUrl: 'https://agsit.com.mx/en/crm-administration/',
      htmlLang: 'en',
      locale: 'en_US',
    },
    hero: {
      eyebrow: 'Total Business Connection 360°',
      title: 'A CRM to connect clients, teams and results.',
      copy:
        'We centralize commercial processes, tasks, communication, analytics and automation so each area stops working in isolation and the customer experience improves from first contact.',
      primaryCta: 'Request consultation',
      secondaryCta: 'View platform',
      signals: ['CRM', 'Tasks', 'Sales', 'AI'],
    },
    contrast: {
      eyebrow: 'Before and after',
      title: 'When everything lives in separate tools, the business loses visibility.',
      before: [
        'Excessive costs from multiple platforms.',
        'Duplicated, isolated and unanalyzed information.',
        'Fragmented communication across areas.',
        'Difficulty measuring sales, tasks and results.',
      ],
      after: [
        'Tools centralized in one operation.',
        'Unified data with real-time reports.',
        'Teams collaborating with clear processes.',
        'Automation to accelerate follow-up and response.',
      ],
    },
    modules: {
      eyebrow: 'CRM ecosystem',
      title: 'Everything the team needs to operate with agility.',
      copy:
        'We integrate sales management, projects, collaboration, payments, e-signature, websites, time tracking and analytics to reduce friction and improve control.',
      items: [
        {
          code: 'CRM',
          title: 'Sales and commercial follow-up',
          copy: 'Lead control, Kanban board, quotes, invoices, catalog, communications and channel reports.',
        },
        {
          code: 'TASK',
          title: 'Projects and tasks',
          copy: 'Kanban boards, Gantt, lists, subtasks, filters, reminders, workload and mobile collaboration.',
        },
        {
          code: 'MKT',
          title: 'Marketing and campaigns',
          copy: 'Email, SMS, WhatsApp campaigns, segmentation, automations, templates and ROI measurement.',
        },
        {
          code: 'HR',
          title: 'Human resources',
          copy: 'Directory, attendance, absences, self-service portal, onboarding and approvals with traceability.',
        },
        {
          code: 'OPS',
          title: 'Connected operation',
          copy: 'Payments, e-signature, video calls, documents, calendar, websites and centralized communication.',
        },
        {
          code: 'DATA',
          title: 'Analytics and control',
          copy: 'KPIs, progress reports, commercial results, time, performance and management metrics.',
        },
      ],
    },
    workflows: {
      title: 'From request to result, without losing the thread.',
      copy:
        'We design workflows so every request, sale or task moves forward with owners, status, evidence and clear automations.',
      items: [
        { label: '01', title: 'Capture', copy: 'Centralize leads, requests, clients, tasks and communications from one point.' },
        { label: '02', title: 'Assign', copy: 'Distribute responsibilities with roles, permissions, dates, reminders and priorities.' },
        { label: '03', title: 'Automate', copy: 'Configure rules for notifications, status changes, follow-ups and recurring tasks.' },
        { label: '04', title: 'Measure', copy: 'View progress, funnels, ROI, workload and results in real time.' },
      ],
    },
    ai: {
      eyebrow: 'AI Copilot',
      title: 'More than a platform: intelligence to accelerate operations.',
      copy:
        'AI helps document, summarize, write, transcribe and turn conversations into actions to reduce manual work and improve follow-up.',
      capabilities: [
        {
          title: 'Team productivity',
          points: ['Task descriptions and checklists.', 'Comment and video-call summaries.', 'Minutes converted into actionable tasks.'],
        },
        {
          title: 'Commercial communication',
          points: ['Writing, translation and text correction.', 'Smart follow-up responses.', 'Field completion and better CRM records.'],
        },
        {
          title: 'Operational improvement',
          points: ['Inefficiency detection.', 'Process suggestions.', 'Automation of repetitive activities.'],
        },
      ],
    },
    outcomes: {
      title: 'Results that should be felt by clients and teams.',
      items: [
        'Faster responses to requests and sales opportunities.',
        'Lower cost and less technology dispersion.',
        'Higher productivity in tasks and responsibilities.',
        'Better experience for internal and external clients.',
        'Reliable data for commercial and operational decisions.',
      ],
    },
    cta: {
      eyebrow: 'CRM diagnosis',
      title: 'Tell us which operation you want to centralize.',
      copy:
        'Share how you currently manage clients, sales, tasks and communication. We will review your case to define the right workflow and platform.',
    },
  },
};

export function getCrmAdministrationContent(lang: SupportedLang) {
  return crmAdministrationByLang[lang];
}

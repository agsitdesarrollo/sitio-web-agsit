import type { SupportedLang } from '../i18n/ui';

export type PlatformCard = {
  eyebrow: string;
  title: string;
  copy: string;
  detail: string;
};

export type PlatformStep = {
  label: string;
  title: string;
  copy: string;
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
    titleAccent: string;
    copy: string;
    primaryCta: string;
    secondaryCta: string;
    visualAlt: string;
  };
  convergence: {
    eyebrow: string;
    title: string;
    copy: string;
    states: PlatformStep[];
    resultLabel: string;
    resultTitle: string;
    resultCopy: string;
  };
  pillars: {
    eyebrow: string;
    title: string;
    copy: string;
    items: PlatformCard[];
  };
  journey: {
    eyebrow: string;
    title: string;
    copy: string;
    steps: PlatformStep[];
  };
  collaboration: {
    eyebrow: string;
    title: string;
    copy: string;
    visualAlt: string;
    outcomes: string[];
  };
  integrations: {
    eyebrow: string;
    title: string;
    copy: string;
    items: string[];
  };
  implementation: {
    eyebrow: string;
    title: string;
    copy: string;
    steps: PlatformStep[];
  };
};

export const crmAdministrationByLang: Record<SupportedLang, CrmAdministrationContent> = {
  es: {
    metadata: {
      title: 'Plataforma integral para tu empresa | AGSIT',
      description:
        'Centraliza ventas, proyectos, comunicación, automatización y control operativo en una sola plataforma implementada por AGSIT.',
      canonicalUrl: 'https://agsit.com.mx/administracion-crm/',
      htmlLang: 'es-MX',
      locale: 'es_MX',
    },
    hero: {
      eyebrow: 'Plataforma integral para tu empresa',
      title: 'Toda tu operación.',
      titleAccent: 'Un solo lugar.',
      copy:
        'Conecta clientes, equipos, proyectos y procesos para que cada área avance con la misma información y sin cambiar de herramienta.',
      primaryCta: 'Hablar con un especialista',
      secondaryCta: 'Descubrir la plataforma',
      visualAlt: 'Laptop y teléfonos con una interfaz genérica de operación empresarial integrada.',
    },
    convergence: {
      eyebrow: 'Cuando todo vive separado',
      title: 'El trabajo se fragmenta antes de que tu equipo pueda avanzar.',
      copy:
        'Las conversaciones, los clientes, los archivos y las tareas pierden contexto cuando cada uno vive en una aplicación diferente.',
      states: [
        { label: '01', title: 'Clientes', copy: 'Seguimientos repartidos entre hojas, correos y notas.' },
        { label: '02', title: 'Equipos', copy: 'Mensajes que no llegan a convertirse en trabajo claro.' },
        { label: '03', title: 'Proyectos', copy: 'Responsables, fechas y archivos en lugares distintos.' },
      ],
      resultLabel: 'Una operación conectada',
      resultTitle: 'Cada conversación se convierte en una acción con contexto.',
      resultCopy: 'La información fluye desde el primer contacto hasta la entrega y el análisis.',
    },
    pillars: {
      eyebrow: 'Todo lo esencial, conectado',
      title: 'Una plataforma que acompaña a cada área.',
      copy: 'No son módulos aislados: cada capacidad comparte información con la siguiente para sostener toda la operación.',
      items: [
        {
          eyebrow: '01 · CRM y ventas',
          title: 'Convierte cada oportunidad en un seguimiento claro.',
          copy: 'Gestiona prospectos, contactos, negociaciones, cotizaciones y canales de atención desde una vista compartida.',
          detail: 'CRM · embudos · atención omnicanal · reportes',
        },
        {
          eyebrow: '02 · Proyectos y tareas',
          title: 'Del acuerdo al trabajo ejecutado, sin perder el hilo.',
          copy: 'Organiza responsables, fechas, prioridades y carga de trabajo con vistas que se adaptan a cada equipo.',
          detail: 'Kanban · Gantt · calendario · seguimiento',
        },
        {
          eyebrow: '03 · Colaboración',
          title: 'Hablen, reúnanse y documenten dentro del mismo flujo.',
          copy: 'Centraliza chats, videollamadas, archivos, documentos y calendarios para que las decisiones no se queden dispersas.',
          detail: 'chat · videollamadas · documentos · drive',
        },
        {
          eyebrow: '04 · Automatización y control',
          title: 'Haz que los procesos avancen incluso cuando nadie persigue pendientes.',
          copy: 'Crea reglas, aprobaciones, recordatorios y tableros que dan visibilidad a la operación en tiempo real.',
          detail: 'flujos · aprobaciones · permisos · analítica',
        },
      ],
    },
    journey: {
      eyebrow: 'Un flujo, de punta a punta',
      title: 'Del primer contacto al resultado medible.',
      copy: 'Una misma operación conecta comercial, ejecución y dirección sin duplicar información.',
      steps: [
        { label: '01', title: 'Captura', copy: 'Un nuevo contacto entra desde el canal que elija tu cliente.' },
        { label: '02', title: 'Seguimiento', copy: 'El equipo comercial sabe qué hacer, cuándo y con quién.' },
        { label: '03', title: 'Ejecución', copy: 'La venta se convierte en tareas, proyecto y colaboración.' },
        { label: '04', title: 'Control', copy: 'Dirección consulta avances, cuellos de botella y resultados.' },
      ],
    },
    collaboration: {
      eyebrow: 'Trabajo que mantiene el contexto',
      title: 'Tu equipo no necesita otra aplicación para avanzar.',
      copy:
        'Una conversación puede abrir una tarea, una reunión puede quedar ligada a un cliente y un documento puede vivir dentro del proyecto correcto.',
      visualAlt: 'Equipo colaborando frente a una interfaz genérica de trabajo, videollamada y calendario.',
      outcomes: ['Menos cambios de aplicación', 'Decisiones con contexto', 'Información disponible desde cualquier lugar'],
    },
    integrations: {
      eyebrow: 'Conecta lo que ya usas',
      title: 'Una plataforma abierta a tu operación.',
      copy: 'Integramos los canales y herramientas que tu empresa ya necesita para seguir trabajando sin fricción.',
      items: ['WhatsApp', 'Telefonía', 'Correo electrónico', 'Microsoft 365', 'Google Workspace', 'API e integraciones a medida'],
    },
    implementation: {
      eyebrow: 'Implementación AGSIT',
      title: 'La plataforma es solo el inicio. La adopción es el resultado.',
      copy: 'Traducimos la forma en que trabaja tu empresa a una operación clara, medible y lista para crecer.',
      steps: [
        { label: '01', title: 'Diagnóstico', copy: 'Entendemos los procesos, equipos y puntos de fricción actuales.' },
        { label: '02', title: 'Diseño y configuración', copy: 'Definimos flujos, permisos, tableros e integraciones a tu medida.' },
        { label: '03', title: 'Migración y puesta en marcha', copy: 'Preparamos la información y activamos la operación con orden.' },
        { label: '04', title: 'Adopción', copy: 'Capacitamos a tu equipo para que el sistema se vuelva parte del trabajo diario.' },
        { label: '05', title: 'Mejora continua', copy: 'Acompañamos la evolución de la plataforma conforme crece tu empresa.' },
      ],
    },
  },
  en: {
    metadata: {
      title: 'Integrated business platform | AGSIT',
      description:
        'Centralize sales, projects, communication, automation and operating control in one platform implemented by AGSIT.',
      canonicalUrl: 'https://agsit.com.mx/en/crm-administration/',
      htmlLang: 'en',
      locale: 'en_US',
    },
    hero: {
      eyebrow: 'An integrated platform for your business',
      title: 'Your entire operation.',
      titleAccent: 'One place.',
      copy:
        'Connect customers, teams, projects and processes so every area moves forward with the same information, without switching tools.',
      primaryCta: 'Talk to a specialist',
      secondaryCta: 'Discover the platform',
      visualAlt: 'Laptop and phones showing a generic integrated business operations interface.',
    },
    convergence: {
      eyebrow: 'When everything lives apart',
      title: 'Work gets fragmented before your team can move forward.',
      copy:
        'Conversations, customers, files and tasks lose context when each one lives in a different application.',
      states: [
        { label: '01', title: 'Customers', copy: 'Follow-ups scattered across spreadsheets, emails and notes.' },
        { label: '02', title: 'Teams', copy: 'Messages that never become clear, accountable work.' },
        { label: '03', title: 'Projects', copy: 'Owners, dates and files kept in separate places.' },
      ],
      resultLabel: 'One connected operation',
      resultTitle: 'Every conversation becomes an action with context.',
      resultCopy: 'Information flows from the first contact through delivery and analysis.',
    },
    pillars: {
      eyebrow: 'Everything essential, connected',
      title: 'One platform that supports every area.',
      copy: 'These are not isolated modules: every capability shares information with the next one to support the whole operation.',
      items: [
        { eyebrow: '01 · CRM and sales', title: 'Turn every opportunity into clear follow-up.', copy: 'Manage leads, contacts, deals, quotes and service channels from a shared view.', detail: 'CRM · pipelines · omnichannel service · reports' },
        { eyebrow: '02 · Projects and tasks', title: 'From agreement to execution, without losing the thread.', copy: 'Organize owners, dates, priorities and workload in views that fit every team.', detail: 'Kanban · Gantt · calendar · tracking' },
        { eyebrow: '03 · Collaboration', title: 'Talk, meet and document inside the same flow.', copy: 'Centralize chats, video calls, files, documents and calendars so decisions never stay scattered.', detail: 'chat · video calls · documents · drive' },
        { eyebrow: '04 · Automation and control', title: 'Let processes move even when nobody is chasing tasks.', copy: 'Create rules, approvals, reminders and dashboards that make operations visible in real time.', detail: 'workflows · approvals · permissions · analytics' },
      ],
    },
    journey: {
      eyebrow: 'One end-to-end flow',
      title: 'From first contact to measurable results.',
      copy: 'The same operation connects commercial work, execution and leadership without duplicating information.',
      steps: [
        { label: '01', title: 'Capture', copy: 'A new contact enters through the channel your customer chooses.' },
        { label: '02', title: 'Follow-up', copy: 'Your sales team knows what to do, when and with whom.' },
        { label: '03', title: 'Execution', copy: 'The sale becomes tasks, projects and collaboration.' },
        { label: '04', title: 'Control', copy: 'Leadership sees progress, bottlenecks and results.' },
      ],
    },
    collaboration: {
      eyebrow: 'Work that keeps its context',
      title: 'Your team does not need another app to move forward.',
      copy: 'A conversation can open a task, a meeting can remain connected to a customer and a document can live in the right project.',
      visualAlt: 'Team collaborating in front of a generic work interface with video call and calendar.',
      outcomes: ['Fewer app switches', 'Decisions with context', 'Information available from anywhere'],
    },
    integrations: {
      eyebrow: 'Connect what you already use',
      title: 'A platform open to your operation.',
      copy: 'We integrate the channels and tools your company already needs to keep work moving without friction.',
      items: ['WhatsApp', 'Telephony', 'Email', 'Microsoft 365', 'Google Workspace', 'Custom API and integrations'],
    },
    implementation: {
      eyebrow: 'AGSIT implementation',
      title: 'The platform is only the start. Adoption is the outcome.',
      copy: 'We translate the way your company works into an operation that is clear, measurable and ready to grow.',
      steps: [
        { label: '01', title: 'Assessment', copy: 'We understand current processes, teams and friction points.' },
        { label: '02', title: 'Design and configuration', copy: 'We define tailored flows, permissions, dashboards and integrations.' },
        { label: '03', title: 'Migration and launch', copy: 'We prepare the information and activate the operation in order.' },
        { label: '04', title: 'Adoption', copy: 'We train your team so the system becomes part of daily work.' },
        { label: '05', title: 'Continuous improvement', copy: 'We support the platform as your company evolves.' },
      ],
    },
  },
};

export function getCrmAdministrationContent(lang: SupportedLang) {
  return crmAdministrationByLang[lang];
}

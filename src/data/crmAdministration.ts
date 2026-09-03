import type { SupportedLang } from '../i18n/ui';

export type PlatformCard = {
  anchor?: string;
  eyebrow: string;
  title: string;
  copy: string;
  detail: string;
  image: string;
};

export type PlatformPathway = {
  label: string;
  href: string;
};

export type PlatformReplacement = {
  name: string;
  logo: string;
  tooltip: string;
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
    pathwaysLabel: string;
    pathways: PlatformPathway[];
    visualAlt: string;
  };
  convergence: {
    eyebrow: string;
    title: string;
    copy: string;
    replacementLabel: string;
    replacements: PlatformReplacement[];
  };
  pillars: {
    eyebrow: string;
    title: string;
    copy: string;
    items: PlatformCard[];
  };
};

export const crmAdministrationByLang: Record<SupportedLang, CrmAdministrationContent> = {
  es: {
    metadata: {
      title: 'Plataforma Empresarial Inteligente | AGSIT',
      description:
        'Integra clientes, ventas, proyectos, procesos, documentos, automatización y colaboración en una plataforma empresarial implementada por AGSIT.',
      canonicalUrl: 'https://agsit.com.mx/soluciones-tecnologicas/plataforma-empresarial-inteligente/',
      htmlLang: 'es-MX',
      locale: 'es_MX',
    },
    hero: {
      eyebrow: 'Plataforma Empresarial Inteligente',
      title: 'Toda tu empresa en',
      titleAccent: 'una sola plataforma.',
      copy:
        'Gestiona clientes, proyectos, tareas, procesos, documentos y recursos humanos. Automatiza actividades, crea sitios web y tiendas en línea, y centraliza la comunicación, los calendarios compartidos, el control de tiempo, el análisis de información y la colaboración en un solo lugar.',
      primaryCta: 'Hablar con un especialista',
      pathwaysLabel: 'Explorar la plataforma por área',
      pathways: [
        { label: 'Soluciones para la gestión comercial', href: '#gestion-comercial' },
        { label: 'Soluciones para la gestión operativa', href: '#gestion-operativa' },
      ],
      visualAlt: 'Tablero de operación empresarial con indicadores comerciales, analítica y seguimiento.',
    },
    convergence: {
      eyebrow: 'Una empresa, demasiadas aplicaciones',
      title: 'Cuando la información se dispersa, también se frenan las decisiones.',
      copy:
        'Haz que toda tu empresa trabaje como un solo equipo con nuestra plataforma empresarial inteligente.',
      replacementLabel: 'Reemplaza a:',
      replacements: [
        {
          name: 'Slack',
          logo: '/assets/platform-replacements/slack.jpg',
          tooltip: 'La plataforma reúne chat, canales, videollamadas y tareas en un solo contexto.',
        },
        {
          name: 'Asana',
          logo: '/assets/platform-replacements/asana.jpg',
          tooltip: 'La plataforma planifica tareas, responsables, fechas y proyectos conectados con la operación.',
        },
        {
          name: 'Microsoft Teams',
          logo: '/assets/platform-replacements/teams.jpg',
          tooltip: 'La plataforma integra mensajería, reuniones, videollamadas y archivos de cada equipo.',
        },
        {
          name: 'Google Drive',
          logo: '/assets/platform-replacements/google-drive.jpg',
          tooltip: 'La plataforma centraliza archivos y documentos con permisos, versiones y colaboración en línea.',
        },
        {
          name: 'Salesforce',
          logo: '/assets/platform-replacements/salesforce.jpg',
          tooltip: 'La plataforma gestiona prospectos, clientes, oportunidades, embudos y seguimiento comercial.',
        },
        {
          name: 'HubSpot',
          logo: '/assets/platform-replacements/hubspot.jpg',
          tooltip: 'La plataforma conecta gestión comercial, campañas, automatizaciones y atención al cliente.',
        },
        {
          name: 'ChatGPT',
          logo: '/assets/platform-replacements/chat-gpt.jpg',
          tooltip: 'La plataforma incorpora asistencia de IA para redactar, resumir y acelerar tareas dentro del trabajo.',
        },
        {
          name: 'Jira',
          logo: '/assets/platform-replacements/jira.jpg',
          tooltip: 'La plataforma coordina proyectos, incidencias, prioridades y responsables desde una vista compartida.',
        },
        {
          name: 'Clockify',
          logo: '/assets/platform-replacements/clockify.jpg',
          tooltip: 'La plataforma registra horas, controla tiempos por tarea y analiza la carga de trabajo.',
        },
        {
          name: 'Pipedrive',
          logo: '/assets/platform-replacements/pipedrive.jpg',
          tooltip: 'La plataforma administra oportunidades, etapas, actividades y pronósticos comerciales.',
        },
        {
          name: 'monday.com',
          logo: '/assets/platform-replacements/monday.jpg',
          tooltip: 'La plataforma orquesta proyectos, procesos, responsables y automatizaciones entre áreas.',
        },
        {
          name: 'Trello',
          logo: '/assets/platform-replacements/trello.jpg',
          tooltip: 'La plataforma ofrece tableros Kanban conectados con tareas, proyectos y responsables.',
        },
        {
          name: 'ClickUp',
          logo: '/assets/platform-replacements/clickup.jpg',
          tooltip: 'La plataforma reúne tareas, proyectos, documentos, objetivos y colaboración.',
        },
        {
          name: 'Zoho',
          logo: '/assets/platform-replacements/zoho.jpg',
          tooltip: 'La plataforma unifica ventas, clientes, automatización y procesos empresariales.',
        },
        {
          name: 'Wrike',
          logo: '/assets/platform-replacements/wrike.jpg',
          tooltip: 'La plataforma planifica proyectos, cargas de trabajo, plazos y aprobaciones.',
        },
        {
          name: 'Wix',
          logo: '/assets/platform-replacements/wix.jpg',
          tooltip: 'La plataforma crea sitios, páginas de destino y formularios conectados con la gestión comercial.',
        },
        {
          name: 'Miro',
          logo: '/assets/platform-replacements/miro.jpg',
          tooltip: 'La plataforma incorpora pizarras colaborativas para planear, idear y trabajar en equipo.',
        },
        {
          name: 'Calendly',
          logo: '/assets/platform-replacements/calendly.jpg',
          tooltip: 'La plataforma coordina citas y calendarios compartidos con el contexto de cada cliente.',
        },
      ],
    },
    pillars: {
      eyebrow: 'Una solución que se adapta a tu empresa',
      title: 'Tu forma de trabajar marca el punto de partida.',
      copy:
        'Comienza con las funciones que necesitas y amplía su alcance a medida que crece tu empresa.',
      items: [
        {
          anchor: 'gestion-comercial',
          eyebrow: '01 · CRM',
          title: 'Convierte cada contacto en una oportunidad bien atendida.',
          copy:
            'Organiza prospectos, clientes, ventas y seguimientos en un solo lugar para que tu equipo sepa qué hacer y cuándo hacerlo.',
          detail: 'Prospectos · clientes · ventas · seguimiento',
          image: '/assets/plataforma-empresarial/crm.png',
        },
        {
          anchor: 'gestion-operativa',
          eyebrow: '02 · Gestión de proyectos',
          title: 'Lleva cada proyecto del plan al resultado.',
          copy:
            'Coordina tareas, responsables, fechas y avances para que todos sepan qué sigue y trabajen con mayor orden.',
          detail: 'Tareas · responsables · fechas · avances',
          image: '/assets/plataforma-empresarial/gestion-proyectos.png',
        },
        {
          eyebrow: '03 · Gestión documental',
          title: 'Encuentra y comparte cada documento con facilidad.',
          copy:
            'Guarda archivos en un solo lugar, controla quién puede verlos y mantén siempre disponible la versión correcta.',
          detail: 'Archivos · permisos · versiones · colaboración',
          image: '/assets/plataforma-empresarial/gestion-documental.png',
        },
        {
          eyebrow: '04 · Automatizaciones',
          title: 'Haz que las tareas repetitivas avancen solas.',
          copy:
            'Automatiza recordatorios, asignaciones y acciones para reducir el trabajo manual y mantener cada proceso en movimiento.',
          detail: 'Recordatorios · asignaciones · alertas · acciones automáticas',
          image: '/assets/plataforma-empresarial/automatizaciones.png',
        },
        {
          eyebrow: '05 · Flujos de trabajo',
          title: 'Convierte cada proceso en una ruta clara.',
          copy:
            'Define pasos, responsables y aprobaciones para que las solicitudes avancen sin perderse entre mensajes o pendientes.',
          detail: 'Pasos · responsables · aprobaciones · seguimiento',
          image: '/assets/plataforma-empresarial/flujos-trabajo.png',
        },
        {
          eyebrow: '06 · Colaboración empresarial',
          title: 'Mantén a todo tu equipo conectado y coordinado.',
          copy:
            'Reúne conversaciones, reuniones, calendarios y archivos para que cada decisión permanezca junto al trabajo que le da contexto.',
          detail: 'Chat · reuniones · calendarios · archivos',
          image: '/assets/plataforma-empresarial/colaboracion-empresarial.png',
        },
        {
          eyebrow: '07 · Integración con aplicaciones empresariales',
          title: 'Conecta la plataforma con las herramientas que ya utilizas.',
          copy:
            'Integra correo, telefonía y aplicaciones empresariales para compartir información y evitar capturas repetidas.',
          detail: 'Correo · telefonía · aplicaciones · información compartida',
          image: '/assets/plataforma-empresarial/integraciones-empresariales.png',
        },
      ],
    },
  },
  en: {
    metadata: {
      title: 'Intelligent Enterprise Platform | AGSIT',
      description:
        'Integrate customers, sales, projects, processes, documents, automation and collaboration in one business platform implemented by AGSIT.',
      canonicalUrl: 'https://agsit.com.mx/en/technology-solutions/intelligent-enterprise-platform/',
      htmlLang: 'en',
      locale: 'en_US',
    },
    hero: {
      eyebrow: 'Intelligent Enterprise Platform',
      title: 'Your entire company on',
      titleAccent: 'one platform.',
      copy:
        'Manage customers, projects, tasks, processes, documents and human resources. Automate activities, build websites and online stores, and centralize communication, shared calendars, time tracking, data analysis and collaboration in one place.',
      primaryCta: 'Talk to a specialist',
      pathwaysLabel: 'Explore the platform by area',
      pathways: [
        { label: 'Solutions for commercial management', href: '#commercial-management' },
        { label: 'Solutions for operations management', href: '#operations-management' },
      ],
      visualAlt: 'Business operations dashboard with commercial indicators, analytics and tracking.',
    },
    convergence: {
      eyebrow: 'One company, too many applications',
      title: 'When information is scattered, decisions slow down too.',
      copy:
        'Bring your entire company together as one team with our intelligent enterprise platform.',
      replacementLabel: 'Replaces:',
      replacements: [
        {
          name: 'Slack',
          logo: '/assets/platform-replacements/slack.jpg',
          tooltip: 'The platform brings chat, channels, video calls and tasks into one context.',
        },
        {
          name: 'Asana',
          logo: '/assets/platform-replacements/asana.jpg',
          tooltip: 'The platform plans tasks, owners, dates and projects connected to the operation.',
        },
        {
          name: 'Microsoft Teams',
          logo: '/assets/platform-replacements/teams.jpg',
          tooltip: 'The platform integrates messaging, meetings, video calls and team files.',
        },
        {
          name: 'Google Drive',
          logo: '/assets/platform-replacements/google-drive.jpg',
          tooltip: 'The platform centralizes files and documents with permissions, versions and online collaboration.',
        },
        {
          name: 'Salesforce',
          logo: '/assets/platform-replacements/salesforce.jpg',
          tooltip: 'The platform manages leads, customers, opportunities, pipelines and sales follow-up.',
        },
        {
          name: 'HubSpot',
          logo: '/assets/platform-replacements/hubspot.jpg',
          tooltip: 'The platform connects sales management, campaigns, automation and customer service.',
        },
        {
          name: 'ChatGPT',
          logo: '/assets/platform-replacements/chat-gpt.jpg',
          tooltip: 'The platform adds AI assistance to write, summarize and accelerate work tasks.',
        },
        {
          name: 'Jira',
          logo: '/assets/platform-replacements/jira.jpg',
          tooltip: 'The platform coordinates projects, issues, priorities and owners in a shared view.',
        },
        {
          name: 'Clockify',
          logo: '/assets/platform-replacements/clockify.jpg',
          tooltip: 'The platform records hours, tracks task time and analyzes workload.',
        },
        {
          name: 'Pipedrive',
          logo: '/assets/platform-replacements/pipedrive.jpg',
          tooltip: 'The platform manages opportunities, stages, activities and sales forecasts.',
        },
        {
          name: 'monday.com',
          logo: '/assets/platform-replacements/monday.jpg',
          tooltip: 'The platform orchestrates projects, processes, owners and cross-team automation.',
        },
        {
          name: 'Trello',
          logo: '/assets/platform-replacements/trello.jpg',
          tooltip: 'The platform provides Kanban boards connected to tasks, projects and owners.',
        },
        {
          name: 'ClickUp',
          logo: '/assets/platform-replacements/clickup.jpg',
          tooltip: 'The platform brings tasks, projects, documents, goals and collaboration together.',
        },
        {
          name: 'Zoho',
          logo: '/assets/platform-replacements/zoho.jpg',
          tooltip: 'The platform unifies sales, customers, automation and business processes.',
        },
        {
          name: 'Wrike',
          logo: '/assets/platform-replacements/wrike.jpg',
          tooltip: 'The platform plans projects, workloads, deadlines and approvals.',
        },
        {
          name: 'Wix',
          logo: '/assets/platform-replacements/wix.jpg',
          tooltip: 'The platform creates websites, landing pages and forms connected to sales management.',
        },
        {
          name: 'Miro',
          logo: '/assets/platform-replacements/miro.jpg',
          tooltip: 'The platform includes collaborative whiteboards for planning, ideation and teamwork.',
        },
        {
          name: 'Calendly',
          logo: '/assets/platform-replacements/calendly.jpg',
          tooltip: 'The platform coordinates appointments and shared calendars with full customer context.',
        },
      ],
    },
    pillars: {
      eyebrow: 'A solution that adapts to your business',
      title: 'The way you work sets the starting point.',
      copy:
        'Start with the capabilities you need and expand its reach as your business grows.',
      items: [
        {
          anchor: 'commercial-management',
          eyebrow: '01 · CRM',
          title: 'Turn every contact into a well-managed opportunity.',
          copy:
            'Organize prospects, customers, sales and follow-ups in one place so your team knows what to do and when to do it.',
          detail: 'Prospects · customers · sales · follow-up',
          image: '/assets/plataforma-empresarial/crm.png',
        },
        {
          anchor: 'operations-management',
          eyebrow: '02 · Project management',
          title: 'Take every project from plan to result.',
          copy:
            'Coordinate tasks, owners, dates and progress so everyone knows what comes next and works with greater clarity.',
          detail: 'Tasks · owners · dates · progress',
          image: '/assets/plataforma-empresarial/gestion-proyectos.png',
        },
        {
          eyebrow: '03 · Document management',
          title: 'Find and share every document with ease.',
          copy:
            'Store files in one place, control who can view them and keep the correct version available at all times.',
          detail: 'Files · permissions · versions · collaboration',
          image: '/assets/plataforma-empresarial/gestion-documental.png',
        },
        {
          eyebrow: '04 · Automation',
          title: 'Keep repetitive tasks moving on their own.',
          copy:
            'Automate reminders, assignments and actions to reduce manual work and keep every process moving.',
          detail: 'Reminders · assignments · alerts · automated actions',
          image: '/assets/plataforma-empresarial/automatizaciones.png',
        },
        {
          eyebrow: '05 · Workflows',
          title: 'Turn every process into a clear path.',
          copy:
            'Define steps, owners and approvals so requests move forward without getting lost in messages or pending tasks.',
          detail: 'Steps · owners · approvals · tracking',
          image: '/assets/plataforma-empresarial/flujos-trabajo.png',
        },
        {
          eyebrow: '06 · Business collaboration',
          title: 'Keep your entire team connected and coordinated.',
          copy:
            'Bring conversations, meetings, calendars and files together so every decision stays with the work that gives it context.',
          detail: 'Chat · meetings · calendars · files',
          image: '/assets/plataforma-empresarial/colaboracion-empresarial.png',
        },
        {
          eyebrow: '07 · Business application integration',
          title: 'Connect the platform with the tools you already use.',
          copy:
            'Integrate email, telephony and business applications to share information and avoid duplicate data entry.',
          detail: 'Email · telephony · applications · shared information',
          image: '/assets/plataforma-empresarial/integraciones-empresariales.png',
        },
      ],
    },
  },
};

export function getCrmAdministrationContent(lang: SupportedLang) {
  return crmAdministrationByLang[lang];
}

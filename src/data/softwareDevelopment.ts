import type { SupportedLang } from '../i18n/ui';

export type DevChallengeItem = {
  label: string;
  title: string;
  copy: string;
};

export type DevServiceItem = {
  code: string;
  title: string;
  copy: string;
  activities: string[];
};

export type DevBenefitItem = {
  value: string;
  title: string;
  copy: string;
};

export type DevApproachStep = {
  label: string;
  title: string;
  copy: string;
};

export type SoftwareDevelopmentContent = {
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
  };
  challenges: {
    eyebrow: string;
    title: string;
    copy: string;
    items: DevChallengeItem[];
  };
  services: {
    eyebrow: string;
    title: string;
    copy: string;
    activitiesLabel: string;
    items: DevServiceItem[];
  };
  benefits: {
    eyebrow: string;
    title: string;
    copy: string;
    items: DevBenefitItem[];
  };
  approach: {
    eyebrow: string;
    title: string;
    copy: string;
    steps: DevApproachStep[];
  };
  cta: {
    eyebrow: string;
    title: string;
    copy: string;
  };
};

export const softwareDevelopmentByLang: Record<SupportedLang, SoftwareDevelopmentContent> = {
  es: {
    metadata: {
      title: 'Desarrollo de Software | AGSIT — Aplicaciones alineadas a tu operación',
      description:
        'Desarrollo de aplicaciones de escritorio, web y móvil, testing, metodologías de desarrollo e implementación para empresas.',
      canonicalUrl: 'https://agsit.com.mx/soluciones-tecnologicas/desarrollo-de-software/',
      htmlLang: 'es-MX',
      locale: 'es_MX',
    },
    hero: {
      eyebrow: 'Desarrollo de Software',
      title: 'Desarrollamos software que impulsa resultados reales',
      copy:
        'Construimos aplicaciones de escritorio, web y móvil alineadas a la operación real de tu negocio, con validación funcional antes de escalar y adopción asegurada del equipo.',
      primaryCta: 'Solicitar diagnóstico',
    },
    challenges: {
      eyebrow: 'Retos que resolvemos',
      title: 'Cuando el software estándar no es suficiente',
      copy:
        'Los sistemas genéricos rara vez encajan con los procesos únicos de tu empresa. Identificamos qué frena tu operación antes de escribir una sola línea de código.',
      items: [
        {
          label: 'Sistemas obsoletos',
          title: 'Tecnología que limita la operación',
          copy: 'Aplicaciones antiguas, sin soporte o difíciles de integrar obligan a procesos manuales y generan dependencias técnicas que frenan el crecimiento.',
        },
        {
          label: 'Procesos sin sistema',
          title: 'Flujos gestionados en hojas de cálculo',
          copy: 'Cuando operaciones críticas dependen de archivos de Excel o correos, la trazabilidad, el control y la escalabilidad se vuelven imposibles de mantener.',
        },
        {
          label: 'Falta de integración',
          title: 'Aplicaciones que no se conectan',
          copy: 'Sistemas desconectados obligan a captura doble, generan inconsistencias entre áreas y crean puntos ciegos que afectan la toma de decisiones.',
        },
        {
          label: 'Calidad inestable',
          title: 'Entregas con errores que afectan al usuario',
          copy: 'Sin procesos de prueba estructurados, los errores llegan a producción y generan costos de corrección, pérdida de confianza y fricción operativa.',
        },
      ],
    },
    services: {
      eyebrow: 'Servicios incluidos',
      title: 'Servicios de desarrollo y calidad de software',
      copy:
        'Cubrimos desde el análisis hasta la liberación: escritorio, web, móvil, testing y metodologías que aseguran calidad desde el inicio.',
      activitiesLabel: 'Actividades clave',
      items: [
        {
          code: 'DEV-01',
          title: 'Desarrollo de Aplicaciones de Escritorio',
          copy: 'Construimos aplicaciones de escritorio robustas y eficientes, alineadas a los procesos internos y entornos tecnológicos de tu empresa.',
          activities: [
            'Análisis de procesos internos y entorno tecnológico',
            'Diseño de interfaz y flujos de trabajo',
            'Desarrollo e integración con sistemas existentes',
            'Pruebas funcionales y liberación controlada',
          ],
        },
        {
          code: 'DEV-02',
          title: 'Desarrollo Web',
          copy: 'Desarrollamos plataformas y sistemas web funcionales, escalables y seguros, con enfoque en la experiencia de usuario y el rendimiento.',
          activities: [
            'Definición de arquitectura y tecnología web',
            'Diseño UX y estructura funcional',
            'Desarrollo frontend y backend escalable',
            'Pruebas de rendimiento y despliegue',
          ],
        },
        {
          code: 'DEV-03',
          title: 'Desarrollo de Apps Móviles',
          copy: 'Creamos aplicaciones móviles que extienden las capacidades operativas de tu empresa, con experiencias intuitivas y sincronización en tiempo real.',
          activities: [
            'Diseño de experiencia de usuario móvil',
            'Desarrollo nativo o multiplataforma',
            'Integración con APIs y sistemas corporativos',
            'Pruebas en dispositivos reales y publicación',
          ],
        },
        {
          code: 'DEV-04',
          title: 'Gestión de Pruebas (Testing)',
          copy: 'Diseñamos y ejecutamos estrategias de pruebas funcionales, de integración y de regresión para asegurar calidad antes de cada liberación.',
          activities: [
            'Diseño de estrategia y plan de pruebas',
            'Pruebas funcionales y de integración',
            'Pruebas de regresión y validación de calidad',
            'Reporte y seguimiento de defectos detectados',
          ],
        },
        {
          code: 'DEV-05',
          title: 'Metodologías de Desarrollo',
          copy: 'Implementamos y capacitamos a tu equipo en metodologías estructuradas que mejoran la planificación, el control y la entrega de software.',
          activities: [
            'Evaluación del proceso de desarrollo actual',
            'Diseño e implementación de flujos de trabajo',
            'Capacitación del equipo en la metodología',
            'Seguimiento con indicadores de mejora continua',
          ],
        },
      ],
    },
    benefits: {
      eyebrow: 'Beneficios para tu organización',
      title: 'Tecnología alineada a tus objetivos de negocio',
      copy:
        'Cada solución que construimos está orientada a resolver un problema real de operación, no a cumplir una lista de funcionalidades técnicas.',
      items: [
        {
          value: '01',
          title: 'Software a tu medida',
          copy: 'Aplicaciones diseñadas para tus procesos reales, no adaptadas con parches a software genérico que no encaja con tu operación.',
        },
        {
          value: '02',
          title: 'Calidad desde el inicio',
          copy: 'Testing integrado en cada etapa del desarrollo para reducir errores en producción y asegurar entregas confiables.',
        },
        {
          value: '03',
          title: 'Escalabilidad',
          copy: 'Arquitecturas que crecen con tu negocio sin requerir reescrituras costosas cuando cambian los volúmenes o las necesidades.',
        },
        {
          value: '04',
          title: 'Integración con tus sistemas',
          copy: 'Conexión fluida con las plataformas que ya usas para eliminar silos de información y centralizar la operación.',
        },
        {
          value: '05',
          title: 'Adopción real del equipo',
          copy: 'Capacitación y acompañamiento post-entrega para que tu equipo use la herramienta con confianza desde el primer día.',
        },
      ],
    },
    approach: {
      eyebrow: 'Nuestro enfoque',
      title: 'Desarrollo estructurado y orientado a calidad',
      copy:
        'Seguimos un ciclo que garantiza que cada entrega cumpla los requerimientos, sea probada antes de llegar a producción y sea adoptada por el equipo.',
      steps: [
        {
          label: '01',
          title: 'Requerimientos',
          copy: 'Levantamos y documentamos qué necesita tu operación: funcionalidades, integraciones, flujos y criterios de aceptación.',
        },
        {
          label: '02',
          title: 'Diseño',
          copy: 'Definimos la arquitectura, interfaz y tecnología adecuadas con criterios de escalabilidad, seguridad y experiencia de usuario.',
        },
        {
          label: '03',
          title: 'Construcción',
          copy: 'Desarrollamos por iteraciones entregando valor incremental, con revisiones frecuentes y control de cambios estructurado.',
        },
        {
          label: '04',
          title: 'Pruebas',
          copy: 'Ejecutamos pruebas funcionales, de integración y de regresión para asegurar que el software funciona correctamente en todos los escenarios.',
        },
        {
          label: '05',
          title: 'Liberación',
          copy: 'Desplegamos en producción con plan de rollout, documentación técnica y capacitación al equipo para asegurar adopción desde el inicio.',
        },
      ],
    },
    cta: {
      eyebrow: 'Diagnóstico inicial',
      title: 'Construyamos tu próxima solución tecnológica',
      copy:
        'Cuéntanos qué proceso o necesidad quieres resolver con software. Revisaremos tu caso y propondremos el enfoque correcto.',
    },
  },
  en: {
    metadata: {
      title: 'Software Development | AGSIT — Applications aligned to your operation',
      description:
        'Desktop, web and mobile application development, testing, development methodologies and implementation for businesses.',
      canonicalUrl: 'https://agsit.com.mx/en/technology-solutions/software-development/',
      htmlLang: 'en',
      locale: 'en_US',
    },
    hero: {
      eyebrow: 'Software Development',
      title: 'We develop software that drives real results',
      copy:
        'We build desktop, web and mobile applications aligned to your actual business operations, with functional validation before scaling and assured team adoption.',
      primaryCta: 'Request a diagnosis',
    },
    challenges: {
      eyebrow: 'Challenges we solve',
      title: 'When off-the-shelf software isn\'t enough',
      copy:
        'Generic systems rarely fit your company\'s unique processes. We identify what holds back your operation before writing a single line of code.',
      items: [
        {
          label: 'Outdated systems',
          title: 'Technology that limits the operation',
          copy: 'Legacy applications, unsupported or hard to integrate, force manual processes and create technical dependencies that slow growth.',
        },
        {
          label: 'Unsupported processes',
          title: 'Flows managed in spreadsheets',
          copy: 'When critical operations depend on Excel files or email, traceability, control and scalability become impossible to sustain.',
        },
        {
          label: 'Lack of integration',
          title: 'Applications that don\'t connect',
          copy: 'Disconnected systems force double entry, create inconsistencies between departments and blind spots that affect decision-making.',
        },
        {
          label: 'Unstable quality',
          title: 'Releases with errors that affect users',
          copy: 'Without structured testing processes, errors reach production generating correction costs, loss of trust and operational friction.',
        },
      ],
    },
    services: {
      eyebrow: 'Included services',
      title: 'Software development and quality services',
      copy:
        'We cover from analysis to release: desktop, web, mobile, testing and methodologies that ensure quality from the start.',
      activitiesLabel: 'Key activities',
      items: [
        {
          code: 'DEV-01',
          title: 'Desktop Application Development',
          copy: 'We build robust, efficient desktop applications aligned to your company\'s internal processes and technology environments.',
          activities: [
            'Analysis of internal processes and technology environment',
            'Interface and workflow design',
            'Development and integration with existing systems',
            'Functional testing and controlled release',
          ],
        },
        {
          code: 'DEV-02',
          title: 'Web Development',
          copy: 'We develop functional, scalable and secure web platforms and systems focused on user experience and performance.',
          activities: [
            'Web architecture and technology definition',
            'UX design and functional structure',
            'Scalable frontend and backend development',
            'Performance testing and deployment',
          ],
        },
        {
          code: 'DEV-03',
          title: 'Mobile App Development',
          copy: 'We create mobile applications that extend your company\'s operational capabilities with intuitive experiences and real-time synchronization.',
          activities: [
            'Mobile user experience design',
            'Native or cross-platform development',
            'Integration with APIs and corporate systems',
            'Testing on real devices and publication',
          ],
        },
        {
          code: 'DEV-04',
          title: 'Testing Management',
          copy: 'We design and execute functional, integration and regression testing strategies to ensure quality before every release.',
          activities: [
            'Testing strategy and plan design',
            'Functional and integration testing',
            'Regression testing and quality validation',
            'Defect reporting and tracking',
          ],
        },
        {
          code: 'DEV-05',
          title: 'Development Methodologies',
          copy: 'We implement and train your team in structured methodologies that improve planning, control and software delivery.',
          activities: [
            'Assessment of current development process',
            'Workflow design and implementation',
            'Team training in the methodology',
            'Continuous improvement tracking with indicators',
          ],
        },
      ],
    },
    benefits: {
      eyebrow: 'Benefits for your organization',
      title: 'Technology aligned to your business objectives',
      copy:
        'Every solution we build is designed to solve a real operational problem, not to fulfill a list of technical features.',
      items: [
        {
          value: '01',
          title: 'Custom-built software',
          copy: 'Applications designed for your real processes, not patched generic software that doesn\'t fit your operation.',
        },
        {
          value: '02',
          title: 'Quality from the start',
          copy: 'Testing integrated at every development stage to reduce production errors and ensure reliable deliveries.',
        },
        {
          value: '03',
          title: 'Scalability',
          copy: 'Architectures that grow with your business without costly rewrites when volumes or needs change.',
        },
        {
          value: '04',
          title: 'Integration with your systems',
          copy: 'Seamless connection with the platforms you already use to eliminate information silos and centralize operations.',
        },
        {
          value: '05',
          title: 'Real team adoption',
          copy: 'Training and post-delivery support so your team uses the tool confidently from day one.',
        },
      ],
    },
    approach: {
      eyebrow: 'Our approach',
      title: 'Structured, quality-oriented development',
      copy:
        'We follow a cycle that ensures every delivery meets requirements, is tested before reaching production and is adopted by the team.',
      steps: [
        {
          label: '01',
          title: 'Requirements',
          copy: 'We gather and document what your operation needs: features, integrations, flows and acceptance criteria.',
        },
        {
          label: '02',
          title: 'Design',
          copy: 'We define the appropriate architecture, interface and technology with scalability, security and user experience criteria.',
        },
        {
          label: '03',
          title: 'Build',
          copy: 'We develop in iterations delivering incremental value, with frequent reviews and structured change control.',
        },
        {
          label: '04',
          title: 'Testing',
          copy: 'We run functional, integration and regression tests to ensure the software works correctly in all scenarios.',
        },
        {
          label: '05',
          title: 'Release',
          copy: 'We deploy to production with a rollout plan, technical documentation and team training to ensure adoption from day one.',
        },
      ],
    },
    cta: {
      eyebrow: 'Initial diagnosis',
      title: 'Let\'s build your next technology solution',
      copy:
        'Tell us what process or need you want to solve with software. We\'ll review your case and propose the right approach.',
    },
  },
};

export function getSoftwareDevelopmentContent(lang: SupportedLang) {
  return softwareDevelopmentByLang[lang];
}

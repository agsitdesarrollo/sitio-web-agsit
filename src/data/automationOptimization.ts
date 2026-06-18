import type { SupportedLang } from '../i18n/ui';

export type AutoChallengeItem = {
  label: string;
  title: string;
  copy: string;
};

export type AutoServiceItem = {
  code: string;
  title: string;
  copy: string;
  activities: string[];
};

export type AutoBenefitItem = {
  value: string;
  title: string;
  copy: string;
};

export type AutoApproachStep = {
  label: string;
  title: string;
  copy: string;
};

export type AutomationOptimizationContent = {
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
    items: AutoChallengeItem[];
  };
  services: {
    eyebrow: string;
    title: string;
    copy: string;
    activitiesLabel: string;
    items: AutoServiceItem[];
  };
  benefits: {
    eyebrow: string;
    title: string;
    copy: string;
    items: AutoBenefitItem[];
  };
  approach: {
    eyebrow: string;
    title: string;
    copy: string;
    steps: AutoApproachStep[];
  };
  cta: {
    eyebrow: string;
    title: string;
    copy: string;
  };
};

export const automationOptimizationByLang: Record<SupportedLang, AutomationOptimizationContent> = {
  es: {
    metadata: {
      title: 'Automatización y Optimización | AGSIT — Transforma tus procesos operativos',
      description:
        'Levantamiento de requerimientos, automatización de procesos, diseño de soluciones tecnológicas y consultoría en transformación digital para empresas.',
      canonicalUrl: 'https://agsit.com.mx/soluciones-tecnologicas/automatizacion-y-optimizacion/',
      htmlLang: 'es-MX',
      locale: 'es_MX',
    },
    hero: {
      eyebrow: 'Automatización y Optimización',
      title: 'Transforma procesos complejos en operaciones eficientes',
      copy:
        'Detectamos fricciones en tu flujo de trabajo y diseñamos soluciones que eliminan el trabajo manual, reducen errores y aceleran los ciclos operativos de tu empresa.',
      primaryCta: 'Solicitar diagnóstico',
    },
    challenges: {
      eyebrow: 'Retos que resolvemos',
      title: '¿Tus procesos limitan el crecimiento de tu empresa?',
      copy:
        'Antes de proponer cualquier tecnología, identificamos los puntos de fricción que frenan tu operación y generan costos ocultos.',
      items: [
        {
          label: 'Procesos manuales',
          title: 'Operaciones lentas y propensas a error',
          copy: 'Las tareas repetitivas ejecutadas a mano generan cuellos de botella, inconsistencias y dependencia de personas que no pueden escalar con el negocio.',
        },
        {
          label: 'Retrabajo',
          title: 'Errores que se detectan demasiado tarde',
          copy: 'Cuando los flujos carecen de trazabilidad, los fallos se acumulan y obligan a rehacer trabajo, afectando tiempos de entrega y costos operativos.',
        },
        {
          label: 'Desconexión',
          title: 'Sistemas que no se comunican',
          copy: 'Las aplicaciones y bases de datos aisladas obligan a captura doble, generan inconsistencias entre áreas y reducen la visibilidad real del negocio.',
        },
        {
          label: 'Visibilidad',
          title: 'Sin información para decidir a tiempo',
          copy: 'Sin reportes claros ni métricas en tiempo real, las decisiones se toman con datos incompletos, incrementando el riesgo operativo y financiero.',
        },
      ],
    },
    services: {
      eyebrow: 'Servicios incluidos',
      title: 'Soluciones de automatización y transformación',
      copy:
        'Cubrimos el ciclo completo: desde documentar qué necesitas hasta implementar, integrar y acompañar la adopción real en tu operación.',
      activitiesLabel: 'Actividades clave',
      items: [
        {
          code: 'AUTO-01',
          title: 'Levantamiento de Requerimientos',
          copy: 'Documentamos con precisión qué necesita tu operación antes de diseñar cualquier solución, eliminando ambigüedades que generan cambios costosos en etapas avanzadas.',
          activities: [
            'Entrevistas y talleres con áreas operativas',
            'Documentación de flujos actuales y necesidades',
            'Definición de alcance funcional y criterios de aceptación',
            'Identificación de integraciones y dependencias clave',
          ],
        },
        {
          code: 'AUTO-02',
          title: 'Automatización de Procesos',
          copy: 'Reemplazamos tareas manuales repetitivas con flujos digitales que operan con consistencia, velocidad y trazabilidad completa de cada transacción.',
          activities: [
            'Análisis y mapeo de procesos manuales',
            'Diseño y configuración de flujos digitales',
            'Integración con sistemas y plataformas existentes',
            'Pruebas de validación y activación controlada',
          ],
        },
        {
          code: 'AUTO-03',
          title: 'Diseño de Soluciones Tecnológicas',
          copy: 'Definimos la arquitectura y herramientas adecuadas para tu contexto operativo con criterios de escalabilidad, integración y adopción real por parte del equipo.',
          activities: [
            'Definición de arquitectura y stack tecnológico',
            'Diseño de integraciones y flujos de datos',
            'Validación de escalabilidad y criterios de adopción',
            'Documentación técnica de la solución',
          ],
        },
        {
          code: 'AUTO-04',
          title: 'Consultoría en Transformación Digital',
          copy: 'Acompañamos la evolución tecnológica de tu empresa con una hoja de ruta clara, priorizada y alineada a los objetivos reales de negocio.',
          activities: [
            'Diagnóstico del estado tecnológico actual',
            'Diseño de hoja de ruta por prioridad e impacto',
            'Acompañamiento en implementación y gestión del cambio',
            'Seguimiento de indicadores de avance y resultados',
          ],
        },
      ],
    },
    benefits: {
      eyebrow: 'Beneficios para tu organización',
      title: 'Resultados que impulsan tu operación y rentabilidad',
      copy:
        'Cada implementación está orientada a generar un impacto tangible en la eficiencia, el control y la capacidad de crecimiento de tu empresa.',
      items: [
        {
          value: '01',
          title: 'Menos retrabajo',
          copy: 'Elimina tareas duplicadas y procesos mal definidos que consumen tiempo y generan errores en la cadena operativa.',
        },
        {
          value: '02',
          title: 'Mayor velocidad operativa',
          copy: 'Ciclos más cortos, respuestas más ágiles y operaciones que no dependen de intervención manual constante para avanzar.',
        },
        {
          value: '03',
          title: 'Trazabilidad total',
          copy: 'Registro completo de cada paso del proceso para auditoría, control de calidad y mejora continua basada en datos reales.',
        },
        {
          value: '04',
          title: 'Integración efectiva',
          copy: 'Tus herramientas y plataformas trabajan conectadas, eliminando la captura doble y los errores por información fragmentada.',
        },
        {
          value: '05',
          title: 'Escalabilidad operativa',
          copy: 'Soluciones diseñadas para crecer con tu empresa sin requerir rediseños costosos ni interrupciones en la operación.',
        },
      ],
    },
    approach: {
      eyebrow: 'Nuestro enfoque',
      title: 'Cómo impulsamos tu transformación operativa',
      copy:
        'Un proceso estructurado que garantiza que cada solución sea adoptada por tu equipo, funcione en producción y genere valor sostenible.',
      steps: [
        {
          label: '01',
          title: 'Diagnóstico',
          copy: 'Mapeamos procesos actuales, identificamos fricciones reales y definimos el alcance del problema antes de proponer cualquier tecnología.',
        },
        {
          label: '02',
          title: 'Diseño',
          copy: 'Estructuramos el flujo, la arquitectura y las herramientas adecuadas con criterios de adopción, escalabilidad y sostenibilidad operativa.',
        },
        {
          label: '03',
          title: 'Implementación',
          copy: 'Desplegamos la solución por etapas, validando en cada fase que el resultado cumple los requerimientos y es adoptado por el equipo.',
        },
        {
          label: '04',
          title: 'Optimización',
          copy: 'Monitoreamos el desempeño post-arranque, ajustamos parámetros y aseguramos que la operación continúe mejorando en el tiempo.',
        },
      ],
    },
    cta: {
      eyebrow: 'Diagnóstico inicial',
      title: 'Impulsa la evolución digital de tu negocio',
      copy:
        'Cuéntanos qué proceso necesitas optimizar o automatizar. Revisaremos tu operación y propondremos el siguiente paso con claridad.',
    },
  },
  en: {
    metadata: {
      title: 'Automation & Optimization | AGSIT — Transform your operational processes',
      description:
        'Requirements gathering, process automation, technology solution design and digital transformation consulting for businesses.',
      canonicalUrl: 'https://agsit.com.mx/en/technology-solutions/automation-and-optimization/',
      htmlLang: 'en',
      locale: 'en_US',
    },
    hero: {
      eyebrow: 'Automation & Optimization',
      title: 'Turn complex processes into efficient operations',
      copy:
        'We detect friction in your workflow and design solutions that eliminate manual work, reduce errors and accelerate your company\'s operational cycles.',
      primaryCta: 'Request a diagnosis',
    },
    challenges: {
      eyebrow: 'Challenges we solve',
      title: 'Are your processes limiting business growth?',
      copy:
        'Before proposing any technology, we identify the friction points holding back your operations and generating hidden costs.',
      items: [
        {
          label: 'Manual processes',
          title: 'Slow, error-prone operations',
          copy: 'Repetitive tasks done by hand create bottlenecks, inconsistencies and dependency on individuals who cannot scale with the business.',
        },
        {
          label: 'Rework',
          title: 'Errors detected too late',
          copy: 'When flows lack traceability, failures accumulate and force work to be redone, affecting delivery times and operational costs.',
        },
        {
          label: 'Disconnection',
          title: 'Systems that don\'t communicate',
          copy: 'Isolated applications and databases force double entry, generate inconsistencies between departments and reduce real business visibility.',
        },
        {
          label: 'Visibility',
          title: 'No information for timely decisions',
          copy: 'Without clear reports or real-time metrics, decisions are made with incomplete data, increasing operational and financial risk.',
        },
      ],
    },
    services: {
      eyebrow: 'Included services',
      title: 'Automation and transformation solutions',
      copy:
        'We cover the full cycle: from documenting what you need to implementing, integrating and supporting real adoption in your operation.',
      activitiesLabel: 'Key activities',
      items: [
        {
          code: 'AUTO-01',
          title: 'Requirements Gathering',
          copy: 'We accurately document what your operation needs before designing any solution, eliminating ambiguities that generate costly changes in advanced stages.',
          activities: [
            'Interviews and workshops with operational teams',
            'Documentation of current flows and business needs',
            'Definition of functional scope and acceptance criteria',
            'Identification of integrations and key dependencies',
          ],
        },
        {
          code: 'AUTO-02',
          title: 'Process Automation',
          copy: 'We replace repetitive manual tasks with digital flows that operate with full consistency, speed and traceability of every transaction.',
          activities: [
            'Analysis and mapping of manual processes',
            'Design and configuration of digital flows',
            'Integration with existing systems and platforms',
            'Validation testing and controlled activation',
          ],
        },
        {
          code: 'AUTO-03',
          title: 'Technology Solution Design',
          copy: 'We define the architecture and tools suited to your operational context with scalability, integration and real team adoption criteria.',
          activities: [
            'Definition of architecture and technology stack',
            'Design of integrations and data flows',
            'Scalability validation and adoption criteria',
            'Technical documentation of the solution',
          ],
        },
        {
          code: 'AUTO-04',
          title: 'Digital Transformation Consulting',
          copy: 'We accompany your company\'s technological evolution with a clear roadmap, prioritized and aligned to real business objectives.',
          activities: [
            'Assessment of current technology landscape',
            'Roadmap design by priority and impact',
            'Support in implementation and change management',
            'Tracking of progress indicators and results',
          ],
        },
      ],
    },
    benefits: {
      eyebrow: 'Benefits for your organization',
      title: 'Results that drive your operations and profitability',
      copy:
        'Every implementation is designed to generate tangible impact on the efficiency, control and growth capacity of your company.',
      items: [
        {
          value: '01',
          title: 'Less rework',
          copy: 'Eliminates duplicate tasks and poorly defined processes that consume time and generate errors in the operational chain.',
        },
        {
          value: '02',
          title: 'Greater operational speed',
          copy: 'Shorter cycles, more agile responses and operations that don\'t depend on constant manual intervention to move forward.',
        },
        {
          value: '03',
          title: 'Full traceability',
          copy: 'Complete record of every process step for auditing, quality control and continuous improvement based on real data.',
        },
        {
          value: '04',
          title: 'Effective integration',
          copy: 'Your tools and platforms work connected, eliminating double entry and errors caused by fragmented information.',
        },
        {
          value: '05',
          title: 'Operational scalability',
          copy: 'Solutions designed to grow with your company without costly redesigns or operational disruptions.',
        },
      ],
    },
    approach: {
      eyebrow: 'Our approach',
      title: 'How we drive your operational transformation',
      copy:
        'A structured process that ensures every solution is adopted by your team, works in production and generates sustainable value.',
      steps: [
        {
          label: '01',
          title: 'Diagnosis',
          copy: 'We map current processes, identify real friction points and define the problem scope before proposing any technology.',
        },
        {
          label: '02',
          title: 'Design',
          copy: 'We structure the flow, architecture and appropriate tools with adoption, scalability and operational sustainability criteria.',
        },
        {
          label: '03',
          title: 'Implementation',
          copy: 'We deploy the solution in stages, validating at each phase that the result meets requirements and is adopted by the team.',
        },
        {
          label: '04',
          title: 'Optimization',
          copy: 'We monitor post-launch performance, adjust parameters and ensure the operation continues to improve over time.',
        },
      ],
    },
    cta: {
      eyebrow: 'Initial diagnosis',
      title: 'Drive the digital evolution of your business',
      copy:
        'Tell us which process you need to optimize or automate. We will review your operation and propose the next step with clarity.',
    },
  },
};

export function getAutomationOptimizationContent(lang: SupportedLang) {
  return automationOptimizationByLang[lang];
}

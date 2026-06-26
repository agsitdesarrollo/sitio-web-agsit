import type { SupportedLang } from '../i18n/ui';

export type InnChallengeItem = {
  label: string;
  title: string;
  copy: string;
};

export type InnServiceItem = {
  code: string;
  title: string;
  copy: string;
  activities: string[];
};

export type InnBenefitItem = {
  value: string;
  title: string;
  copy: string;
};

export type InnApproachStep = {
  label: string;
  title: string;
  copy: string;
};

export type TechnologicalInnovationContent = {
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
    items: InnChallengeItem[];
  };
  services: {
    eyebrow: string;
    title: string;
    copy: string;
    activitiesLabel: string;
    items: InnServiceItem[];
  };
  benefits: {
    eyebrow: string;
    title: string;
    copy: string;
    items: InnBenefitItem[];
  };
  approach: {
    eyebrow: string;
    title: string;
    copy: string;
    steps: InnApproachStep[];
  };
  cta: {
    eyebrow: string;
    title: string;
    copy: string;
  };
};

export const technologicalInnovationByLang: Record<SupportedLang, TechnologicalInnovationContent> = {
  es: {
    metadata: {
      title: 'Innovación Tecnológica | AGSIT — IA, Machine Learning e IoT para tu empresa',
      description:
        'Inteligencia artificial, machine learning e Internet de las Cosas (IoT) aplicados a casos de uso reales para modernizar procesos y habilitar nuevos modelos de negocio.',
      canonicalUrl: 'https://agsit.com.mx/soluciones-tecnologicas/innovacion-tecnologica/',
      htmlLang: 'es-MX',
      locale: 'es_MX',
    },
    hero: {
      eyebrow: 'Innovación Tecnológica',
      title: 'Tecnologías emergentes para impulsar la innovación empresarial',
      copy:
        'Aterrizamos inteligencia artificial, machine learning e IoT en casos de uso viables para tu empresa: sin hype, con impacto real en tus procesos y modelos de negocio.',
      primaryCta: 'Explorar oportunidades',
    },
    challenges: {
      eyebrow: 'Retos que resolvemos',
      title: 'Prepárate para la siguiente generación tecnológica',
      copy:
        'Las empresas que no adoptan tecnologías emergentes a tiempo quedan expuestas a ser superadas por competidores más ágiles. Identificamos las oportunidades correctas para tu contexto.',
      items: [
        {
          label: 'Automatización avanzada',
          title: 'Procesos que aún requieren decisión humana',
          copy: 'Existen tareas complejas que van más allá de la automatización simple: clasificación, predicción y análisis de patrones que la IA puede resolver con mayor velocidad y precisión.',
        },
        {
          label: 'Información sin analizar',
          title: 'Datos que no generan inteligencia',
          copy: 'Muchas empresas acumulan grandes volúmenes de datos pero carecen de modelos analíticos que conviertan esa información en predicciones y decisiones de valor.',
        },
        {
          label: 'Operación desconectada',
          title: 'Activos físicos sin visibilidad digital',
          copy: 'Equipos, sensores y activos físicos que operan de forma aislada pierden oportunidades de optimización, mantenimiento predictivo y control en tiempo real.',
        },
        {
          label: 'Adopción incierta',
          title: 'No saber por dónde empezar con IA o IoT',
          copy: 'La abundancia de opciones tecnológicas dificulta identificar qué solución genera valor real en tu contexto específico y cuál es el punto de entrada correcto.',
        },
      ],
    },
    services: {
      eyebrow: 'Servicios incluidos',
      title: 'Soluciones de innovación tecnológica',
      copy:
        'Aplicamos inteligencia artificial e IoT en casos de uso reales y viables para tu empresa, con un enfoque práctico orientado a resultados medibles.',
      activitiesLabel: 'Actividades clave',
      items: [
        {
          code: 'INN-01',
          title: 'Inteligencia Artificial y Machine Learning',
          copy: 'Desarrollamos e implementamos modelos de IA y ML para automatizar decisiones, predecir comportamientos, clasificar información y optimizar procesos con aprendizaje continuo.',
          activities: [
            'Identificación de casos de uso viables en tu operación',
            'Desarrollo y entrenamiento de modelos de IA/ML',
            'Integración con sistemas y flujos existentes',
            'Evaluación de resultados y mejora continua del modelo',
          ],
        },
        {
          code: 'INN-02',
          title: 'Internet de las Cosas (IoT)',
          copy: 'Conectamos activos físicos, sensores y dispositivos para monitorear, controlar y optimizar la operación en tiempo real, habilitando mantenimiento predictivo y nuevos modelos operativos.',
          activities: [
            'Conexión de sensores, activos y dispositivos físicos',
            'Diseño de arquitectura de monitoreo en tiempo real',
            'Procesamiento de datos y generación de alertas',
            'Habilitación de mantenimiento predictivo',
          ],
        },
      ],
    },
    benefits: {
      eyebrow: 'Beneficios para tu organización',
      title: 'Innovación con impacto real en tu operación',
      copy:
        'Cada proyecto de innovación que desarrollamos está anclado a un problema real de negocio, no a una tendencia tecnológica sin aplicación práctica.',
      items: [
        {
          value: '01',
          title: 'Decisiones más inteligentes',
          copy: 'Modelos predictivos y analíticos que apoyan decisiones complejas con mayor velocidad, precisión y sustento en datos reales.',
        },
        {
          value: '02',
          title: 'Automatización avanzada',
          copy: 'IA que va más allá de las reglas: aprende de la operación y mejora con el tiempo para reducir errores y aumentar la eficiencia.',
        },
        {
          value: '03',
          title: 'Visibilidad en tiempo real',
          copy: 'IoT que conecta activos físicos para monitorear condiciones, anticipar fallas y tomar decisiones antes de que los problemas ocurran.',
        },
        {
          value: '04',
          title: 'Nuevos modelos operativos',
          copy: 'Capacidades tecnológicas emergentes que habilitan formas de operar más eficientes, competitivas y difíciles de replicar.',
        },
      ],
    },
    approach: {
      eyebrow: 'Nuestro enfoque',
      title: 'Innovación alineada a tus objetivos de negocio',
      copy:
        'No implementamos tecnología por tendencia. Identificamos oportunidades reales, diseñamos la solución correcta e integramos en tu operación con resultados medibles.',
      steps: [
        {
          label: '01',
          title: 'Identificación',
          copy: 'Analizamos tu operación para detectar oportunidades concretas donde IA o IoT generan valor real, descartando casos donde la tecnología no resuelve el problema de fondo.',
        },
        {
          label: '02',
          title: 'Diseño',
          copy: 'Definimos la arquitectura de la solución, los modelos necesarios y los criterios de éxito medibles antes de iniciar el desarrollo.',
        },
        {
          label: '03',
          title: 'Desarrollo',
          copy: 'Construimos e integramos la solución en iteraciones cortas, validando resultados con datos reales de tu operación en cada etapa.',
        },
        {
          label: '04',
          title: 'Integración',
          copy: 'Conectamos la solución con tus sistemas existentes y capacitamos al equipo para asegurar adopción real y mejora continua del modelo.',
        },
      ],
    },
    cta: {
      eyebrow: 'Diagnóstico inicial',
      title: 'Explora nuevas oportunidades para tu negocio',
      copy:
        'Cuéntanos qué procesos o decisiones quieres mejorar con tecnología emergente. Evaluaremos juntos qué tiene sentido para tu empresa hoy.',
    },
  },
  en: {
    metadata: {
      title: 'Technological Innovation | AGSIT — AI, Machine Learning and IoT for your business',
      description:
        'Artificial intelligence, machine learning and Internet of Things (IoT) applied to real use cases to modernize processes and enable new business models.',
      canonicalUrl: 'https://agsit.com.mx/en/technology-solutions/technological-innovation/',
      htmlLang: 'en',
      locale: 'en_US',
    },
    hero: {
      eyebrow: 'Technological Innovation',
      title: 'Emerging technologies to drive business innovation',
      copy:
        'We land artificial intelligence, machine learning and IoT in viable use cases for your company: no hype, with real impact on your processes and business models.',
      primaryCta: 'Explore opportunities',
    },
    challenges: {
      eyebrow: 'Challenges we solve',
      title: 'Prepare for the next generation of technology',
      copy:
        'Companies that don\'t adopt emerging technologies in time risk being outpaced by more agile competitors. We identify the right opportunities for your context.',
      items: [
        {
          label: 'Advanced automation',
          title: 'Processes that still require human judgment',
          copy: 'There are complex tasks beyond simple automation: classification, prediction and pattern analysis that AI can solve with greater speed and precision.',
        },
        {
          label: 'Unanalyzed information',
          title: 'Data that generates no intelligence',
          copy: 'Many companies accumulate large volumes of data but lack analytical models to turn that information into valuable predictions and decisions.',
        },
        {
          label: 'Disconnected operation',
          title: 'Physical assets without digital visibility',
          copy: 'Equipment, sensors and physical assets operating in isolation miss opportunities for optimization, predictive maintenance and real-time control.',
        },
        {
          label: 'Uncertain adoption',
          title: 'Not knowing where to start with AI or IoT',
          copy: 'The abundance of technology options makes it hard to identify what generates real value in your specific context and what the right entry point is.',
        },
      ],
    },
    services: {
      eyebrow: 'Included services',
      title: 'Technological innovation solutions',
      copy:
        'We apply artificial intelligence and IoT in real, viable use cases for your company, with a practical approach focused on measurable results.',
      activitiesLabel: 'Key activities',
      items: [
        {
          code: 'INN-01',
          title: 'Artificial Intelligence & Machine Learning',
          copy: 'We develop and implement AI and ML models to automate decisions, predict behaviors, classify information and optimize processes with continuous learning.',
          activities: [
            'Identification of viable use cases in your operation',
            'AI/ML model development and training',
            'Integration with existing systems and workflows',
            'Results evaluation and continuous model improvement',
          ],
        },
        {
          code: 'INN-02',
          title: 'Internet of Things (IoT)',
          copy: 'We connect physical assets, sensors and devices to monitor, control and optimize operations in real time, enabling predictive maintenance and new operating models.',
          activities: [
            'Connection of sensors, assets and physical devices',
            'Real-time monitoring architecture design',
            'Data processing and alert generation',
            'Predictive maintenance enablement',
          ],
        },
      ],
    },
    benefits: {
      eyebrow: 'Benefits for your organization',
      title: 'Innovation with real impact on your operation',
      copy:
        'Every innovation project we develop is anchored to a real business problem, not a technology trend without practical application.',
      items: [
        {
          value: '01',
          title: 'Smarter decisions',
          copy: 'Predictive and analytical models that support complex decisions with greater speed, accuracy and grounding in real data.',
        },
        {
          value: '02',
          title: 'Advanced automation',
          copy: 'AI that goes beyond rules: it learns from operations and improves over time to reduce errors and increase efficiency.',
        },
        {
          value: '03',
          title: 'Real-time visibility',
          copy: 'IoT that connects physical assets to monitor conditions, anticipate failures and make decisions before problems occur.',
        },
        {
          value: '04',
          title: 'New operating models',
          copy: 'Emerging technology capabilities that enable more efficient, competitive ways of operating that are hard to replicate.',
        },
      ],
    },
    approach: {
      eyebrow: 'Our approach',
      title: 'Innovation aligned to your business objectives',
      copy:
        'We don\'t implement technology by trend. We identify real opportunities, design the right solution and integrate into your operation with measurable results.',
      steps: [
        {
          label: '01',
          title: 'Identification',
          copy: 'We analyze your operation to detect concrete opportunities where AI or IoT generate real value, ruling out cases where technology doesn\'t solve the underlying problem.',
        },
        {
          label: '02',
          title: 'Design',
          copy: 'We define the solution architecture, required models and measurable success criteria before beginning development.',
        },
        {
          label: '03',
          title: 'Development',
          copy: 'We build and integrate the solution in short iterations, validating results with real data from your operation at each stage.',
        },
        {
          label: '04',
          title: 'Integration',
          copy: 'We connect the solution to your existing systems and train the team to ensure real adoption and continuous model improvement.',
        },
      ],
    },
    cta: {
      eyebrow: 'Initial diagnosis',
      title: 'Explore new opportunities for your business',
      copy:
        'Tell us which processes or decisions you want to improve with emerging technology. We\'ll evaluate together what makes sense for your company today.',
    },
  },
};

export function getTechnologicalInnovationContent(lang: SupportedLang) {
  return technologicalInnovationByLang[lang];
}

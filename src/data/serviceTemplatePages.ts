import type { SupportedLang } from '../i18n/ui';
import type { TechnologySolutionsContent } from './technologySolutions';

export const strategicPlanningTemplateByLang: Record<SupportedLang, TechnologySolutionsContent> = {
  es: {
    metadata: {
      title: 'Planeación Estratégica AGSIT | Dirección, gobierno y crecimiento',
      description:
        'Planeación estratégica empresarial con diagnóstico ADN, misión, visión, valores, análisis interno y externo, gobierno corporativo, tableros ejecutivos y modelos de crecimiento.',
      canonicalUrl: 'https://agsit.com.mx/planeacion-estrategica/',
      image: '/assets/social/planeacion-estrategica-es.jpg',
      imageAlt: 'Planeación estratégica AGSIT para crecer con dirección y control.',
      htmlLang: 'es-MX',
      locale: 'es_MX',
    },
    hero: {
      eyebrow: 'Strategic Planning & Management SPM',
      title: ['Dirección clara para', 'crecer con control'],
      copy:
        'Definimos objetivos, evaluamos el entorno interno y externo del negocio y construimos una ruta estratégica que alinea decisiones, equipos, indicadores y oportunidades de crecimiento.',
      primaryCta: 'Solicitar diagnóstico',
      metrics: [
        { value: '01', label: 'Objetivos claros para canalizar esfuerzos y priorizar oportunidades reales.' },
        { value: '02', label: 'Gobierno corporativo, tableros y seguimiento para dirigir con evidencia.' },
        { value: '03', label: 'Planes estratégicos y tácticos conectados con crecimiento, rentabilidad y expansión.' },
      ],
    },
    method: {
      eyebrow: 'Método AGSIT',
      title: 'De la realidad actual a una estrategia ejecutable.',
      copy:
        'La planeación no se queda en declaraciones. Convertimos diagnóstico, visión, riesgos y oportunidades en objetivos, responsables, tableros y decisiones que la organización puede sostener.',
      steps: [
        {
          label: 'Diagnosticar',
          title: 'Entendemos el ADN empresarial',
          copy:
            'Revisamos cultura, estructura, capacidades, fortalezas, debilidades, amenazas y oportunidades para ubicar el punto de partida real.',
          outcome: 'Mapa claro de situación, brechas y prioridades.',
        },
        {
          label: 'Definir',
          title: 'Alineamos misión, visión y objetivos',
          copy:
            'Trabajamos la dirección institucional, los valores y los objetivos de corto, mediano y largo plazo para enfocar al equipo.',
          outcome: 'Dirección compartida y criterios de decisión.',
        },
        {
          label: 'Diseñar',
          title: 'Construimos el plan estratégico y táctico',
          copy:
            'Traducimos objetivos en rutas, iniciativas, responsables, indicadores y mecanismos de gobierno para dar seguimiento.',
          outcome: 'Plan accionable con prioridades y responsables.',
        },
        {
          label: 'Evolucionar',
          title: 'Medimos, ajustamos y escalamos',
          copy:
            'Instalamos tableros ejecutivos, ciclos de revisión y ajustes para mantener el rumbo ante cambios del mercado.',
          outcome: 'Estrategia viva, medible y adaptable.',
        },
      ],
    },
    capabilities: {
      eyebrow: 'Catálogo de servicios',
      title: 'Servicios de planeación estratégica',
      copy:
        'Integramos servicios estratégicos y tácticos para que la dirección pueda tomar decisiones con visión completa del negocio.',
      items: [
        {
          code: 'STRAT',
          label: 'Strategy',
          title: 'Planeación Estratégica Corporativa',
          copy: 'Definimos el rumbo de tu empresa y lo convertimos en objetivos y acciones claras que guíen su crecimiento.',
        },
        {
          code: 'ASSESS',
          label: 'Assessment',
          title: 'Diagnóstico Estratégico',
          copy:
            'Analizamos la situación actual de tu empresa para identificar oportunidades y definir prioridades que orienten las siguientes decisiones.',
        },
        {
          code: 'GOV',
          label: 'Governance',
          title: 'Gobierno Corporativo',
          copy:
            'Fortalecemos la estructura de dirección de tu empresa para facilitar decisiones claras, responsabilidades definidas y seguimiento a los objetivos.',
        },
        {
          code: 'GROWTH',
          label: 'Growth',
          title: 'Crecimiento Empresarial',
          copy:
            'Diseñamos estrategias de crecimiento para ampliar las oportunidades de tu empresa, desarrollar nuevos mercados y fortalecer su modelo de negocio.',
        },
        {
          code: 'TRANS',
          label: 'Transformation',
          title: 'Transformación Empresarial',
          copy:
            'Acompañamos la transformación de tu empresa integrando estrategia, innovación y cambio para prepararla ante nuevas oportunidades.',
        },
      ],
    },
    benefits: {
      eyebrow: 'Beneficios para tu negocio',
      title: 'Resultados que convierten la visión en dirección',
      copy:
        'Una estrategia bien construida reduce improvisación, enfoca recursos y permite anticipar decisiones críticas para crecer con más control.',
      items: [
        {
          value: '01',
          title: 'Dirección institucional',
          copy: 'El equipo entiende hacia dónde debe enfocar sus esfuerzos y cómo medir el avance.',
        },
        {
          value: '02',
          title: 'Mejor toma de decisiones',
          copy: 'La dirección cuenta con datos, indicadores y criterios para actuar antes de que los problemas escalen.',
        },
        {
          value: '03',
          title: 'Rentabilidad y productividad',
          copy: 'Los recursos se asignan a oportunidades con mayor impacto y menor desgaste operativo.',
        },
        {
          value: '04',
          title: 'Crecimiento sostenible',
          copy: 'El negocio puede desarrollar productos, líneas de negocio, startups o franquicias con estructura.',
        },
      ],
    },
    contact: {
      eyebrow: 'Diagnóstico estratégico',
      title: 'Hablemos de la dirección que necesita tu negocio.',
      copy:
        'Cuéntanos qué meta, decisión o etapa de crecimiento quieres ordenar. Revisaremos tu caso para proponer el siguiente paso con claridad estratégica.',
    },
  },
  en: {
    metadata: {
      title: 'AGSIT Strategic Planning | Direction, governance and growth',
      description:
        'Business strategic planning with company DNA diagnosis, mission, vision, values, internal and external analysis, corporate governance, executive dashboards and growth models.',
      canonicalUrl: 'https://agsit.com.mx/en/strategic-planning/',
      image: '/assets/social/strategic-planning-en.jpg',
      imageAlt: 'AGSIT strategic planning for clear direction and controlled growth.',
      htmlLang: 'en',
      locale: 'en_US',
    },
    hero: {
      eyebrow: 'Strategic Planning & Management SPM',
      title: ['Clear direction to', 'grow with control'],
      copy:
        'We define objectives, assess the internal and external business context and build a strategic route that aligns decisions, teams, indicators and growth opportunities.',
      primaryCta: 'Request diagnosis',
      metrics: [
        { value: '01', label: 'Clear objectives to focus effort and prioritize real opportunities.' },
        { value: '02', label: 'Corporate governance, dashboards and follow-up to lead with evidence.' },
        { value: '03', label: 'Strategic and tactical plans connected to growth, profitability and expansion.' },
      ],
    },
    method: {
      eyebrow: 'AGSIT method',
      title: 'From current reality to an executable strategy.',
      copy:
        'Planning does not stop at declarations. We turn diagnosis, vision, risks and opportunities into objectives, owners, dashboards and decisions the organization can sustain.',
      steps: [
        {
          label: 'Diagnose',
          title: 'We understand the company DNA',
          copy:
            'We review culture, structure, capabilities, strengths, weaknesses, threats and opportunities to locate the real starting point.',
          outcome: 'Clear map of current state, gaps and priorities.',
        },
        {
          label: 'Define',
          title: 'We align mission, vision and objectives',
          copy:
            'We work on institutional direction, values and short-, medium- and long-term objectives to focus the team.',
          outcome: 'Shared direction and decision criteria.',
        },
        {
          label: 'Design',
          title: 'We build the strategic and tactical plan',
          copy:
            'We translate objectives into routes, initiatives, owners, indicators and governance mechanisms for follow-up.',
          outcome: 'Actionable plan with priorities and owners.',
        },
        {
          label: 'Evolve',
          title: 'We measure, adjust and scale',
          copy:
            'We install executive dashboards, review cycles and adjustments to keep direction as the market changes.',
          outcome: 'A living, measurable and adaptable strategy.',
        },
      ],
    },
    capabilities: {
      eyebrow: 'Service catalog',
      title: 'Strategic planning services',
      copy:
        'We integrate strategic and tactical services so leadership can make decisions with a complete view of the business.',
      items: [
        {
          code: 'STRAT',
          label: 'Strategy',
          title: 'Corporate Strategic Planning',
          copy: 'We define your company direction and turn it into clear objectives and actions that guide its growth.',
        },
        {
          code: 'ASSESS',
          label: 'Assessment',
          title: 'Strategic Diagnosis',
          copy:
            'We analyze your company’s current situation to identify opportunities and define priorities that guide the next decisions.',
        },
        {
          code: 'GOV',
          label: 'Governance',
          title: 'Corporate Governance',
          copy:
            'We strengthen your company’s leadership structure to enable clear decisions, defined responsibilities and follow-up on objectives.',
        },
        {
          code: 'GROWTH',
          label: 'Growth',
          title: 'Business Growth',
          copy:
            'We design growth strategies to expand your company’s opportunities, develop new markets and strengthen its business model.',
        },
        {
          code: 'TRANS',
          label: 'Transformation',
          title: 'Business Transformation',
          copy:
            'We support your company’s transformation by integrating strategy, innovation and change to prepare it for new opportunities.',
        },
      ],
    },
    benefits: {
      eyebrow: 'Business benefits',
      title: 'Outcomes that turn vision into direction',
      copy:
        'A well-built strategy reduces improvisation, focuses resources and helps anticipate critical decisions for controlled growth.',
      items: [
        {
          value: '01',
          title: 'Institutional direction',
          copy: 'The team understands where to focus effort and how progress will be measured.',
        },
        {
          value: '02',
          title: 'Better decision-making',
          copy: 'Leadership has data, indicators and criteria to act before problems escalate.',
        },
        {
          value: '03',
          title: 'Profitability and productivity',
          copy: 'Resources are assigned to opportunities with higher impact and less operational waste.',
        },
        {
          value: '04',
          title: 'Sustainable growth',
          copy: 'The business can develop products, business lines, startups or franchises with structure.',
        },
      ],
    },
    contact: {
      eyebrow: 'Strategic diagnosis',
      title: 'Let’s discuss the direction your business needs.',
      copy:
        'Tell us which goal, decision or growth stage you want to organize. We will review your case and propose the next step with strategic clarity.',
    },
  },
};

export const projectManagementTemplateByLang: Record<SupportedLang, TechnologySolutionsContent> = {
  es: {
    metadata: {
      title: 'Dirección de Proyectos AGSIT | PMO, gobierno y ejecución',
      description:
        'Dirección de proyectos con diagnóstico, auditoría, PMO, metodologías ágiles o predictivas, gobierno, capacitación y control de alcance, tiempo y costo.',
      canonicalUrl: 'https://agsit.com.mx/direccion-de-proyectos/',
      image: '/assets/social/direccion-proyectos-es.jpg',
      imageAlt: 'Dirección de proyectos AGSIT con control, ritmo y evidencia.',
      htmlLang: 'es-MX',
      locale: 'es_MX',
    },
    hero: {
      eyebrow: 'Project Management PM 360°',
      title: ['Proyectos con control,', 'ritmo y evidencia'],
      copy:
        'Optimizamos la administración de proyectos con gobierno, metodología, PMO, auditoría y seguimiento ejecutivo para ejecutar dentro de alcance, tiempo y presupuesto.',
      primaryCta: 'Solicitar evaluación',
      metrics: [
        { value: '01', label: 'Menos desviaciones de alcance, tiempo, costo y calidad.' },
        { value: '02', label: 'PMO, portafolio y gobierno para priorizar y escalar decisiones.' },
        { value: '03', label: 'Equipos alineados con prácticas ágiles, predictivas o híbridas según el contexto.' },
      ],
    },
    method: {
      eyebrow: 'Método AGSIT',
      title: 'Del proyecto aislado a una operación de portafolio.',
      copy:
        'La dirección efectiva no consiste en llenar formatos. Consiste en crear claridad, sostener acuerdos y convertir la ejecución en evidencia medible.',
      steps: [
        {
          label: 'Evaluar',
          title: 'Diagnosticamos madurez y desviaciones',
          copy:
            'Revisamos proyectos activos, herramientas, roles, entregables, riesgos, dependencias y capacidad real del equipo.',
          outcome: 'Visibilidad sobre brechas, urgencias y riesgos.',
        },
        {
          label: 'Diseñar',
          title: 'Definimos gobierno y metodología',
          copy:
            'Configuramos cadencias, tableros, roles, reglas de escalamiento y modelo de gestión adecuado al portafolio.',
          outcome: 'Modelo operativo claro para decidir y ejecutar.',
        },
        {
          label: 'Implementar',
          title: 'Instalamos PMO, prácticas y control',
          copy:
            'Desplegamos plantillas, repositorios, tableros, control de cambios, gestión de riesgos y seguimiento ejecutivo.',
          outcome: 'Ejecución controlada con responsables visibles.',
        },
        {
          label: 'Acompañar',
          title: 'Sostenemos avance y aprendizaje',
          copy:
            'Capacitamos líderes y equipos, corregimos desviaciones y ajustamos el modelo con base en evidencia operativa.',
          outcome: 'Portafolio medible y metodología adoptada.',
        },
      ],
    },
    capabilities: {
      eyebrow: 'Catálogo de servicios',
      title: 'Servicios de dirección de proyectos',
      copy:
        'Acompañamos desde el diagnóstico hasta la administración profesional de proyectos, programas, portafolios y oficinas de proyecto.',
      items: [
        {
          code: 'GOV',
          label: 'Governance',
          title: 'PMO & Project Governance',
          copy:
            'Establecemos una dirección clara para tus proyectos, alineando prioridades, responsables y objetivos para mantener el control de principio a fin.',
        },
        {
          code: 'DELIV',
          label: 'Delivery',
          title: 'Strategic Project Delivery',
          copy:
            'Dirigimos tus proyectos con una ejecución estructurada para cumplir objetivos y convertir la estrategia en resultados.',
        },
        {
          code: 'AGILE',
          label: 'Agile',
          title: 'Agile Project Delivery',
          copy:
            'Impulsamos una gestión ágil que facilita la colaboración, adaptación y entrega continua de valor durante el proyecto.',
        },
        {
          code: 'REC',
          label: 'Recovery',
          title: 'Auditoría y Recuperación de Proyectos',
          copy:
            'Evaluamos el estado de tus proyectos y definimos acciones para recuperar el control, fortalecer su ejecución y encaminarlos hacia sus objetivos.',
        },
        {
          code: 'ASSESS',
          label: 'Assessment',
          title: 'Diagnóstico y Madurez en Gestión de Proyectos',
          copy:
            'Evaluamos la forma en que tu empresa gestiona sus proyectos para identificar oportunidades y fortalecer sus capacidades de gestión.',
        },
      ],
    },
    benefits: {
      eyebrow: 'Beneficios para tu negocio',
      title: 'Resultados que deben sentirse en cada proyecto',
      copy:
        'La disciplina de proyectos ordena prioridades, reduce incertidumbre y conecta la ejecución diaria con los objetivos estratégicos del negocio.',
      items: [
        {
          value: '01',
          title: 'Cumplimiento de objetivos',
          copy: 'Los proyectos avanzan con alcance, entregables y criterios de éxito claros desde el inicio.',
        },
        {
          value: '02',
          title: 'Control de costo y tiempo',
          copy: 'Los desvíos se detectan temprano y se gestionan con decisiones oportunas.',
        },
        {
          value: '03',
          title: 'Gobierno y visibilidad',
          copy: 'Sponsors, líderes y equipos conocen avances, riesgos, bloqueos y responsables.',
        },
        {
          value: '04',
          title: 'Capacidad organizacional',
          copy: 'La organización aprende una metodología común para repetir mejores resultados.',
        },
      ],
    },
    contact: {
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
      image: '/assets/social/project-management-en.jpg',
      imageAlt: 'AGSIT project management with control, rhythm and evidence.',
      htmlLang: 'en',
      locale: 'en_US',
    },
    hero: {
      eyebrow: 'Project Management PM 360°',
      title: ['Projects with control,', 'rhythm and evidence'],
      copy:
        'We optimize project management with governance, methodology, PMO, auditing and executive follow-up to execute within scope, time and budget.',
      primaryCta: 'Request assessment',
      metrics: [
        { value: '01', label: 'Fewer deviations in scope, time, cost and quality.' },
        { value: '02', label: 'PMO, portfolio and governance to prioritize and escalate decisions.' },
        { value: '03', label: 'Teams aligned with agile, predictive or hybrid practices according to context.' },
      ],
    },
    method: {
      eyebrow: 'AGSIT method',
      title: 'From isolated projects to portfolio operation.',
      copy:
        'Effective direction is not about filling templates. It is about creating clarity, sustaining agreements and turning execution into measurable evidence.',
      steps: [
        {
          label: 'Assess',
          title: 'We diagnose maturity and deviations',
          copy:
            'We review active projects, tools, roles, deliverables, risks, dependencies and real team capacity.',
          outcome: 'Visibility into gaps, urgencies and risks.',
        },
        {
          label: 'Design',
          title: 'We define governance and methodology',
          copy:
            'We configure cadence, dashboards, roles, escalation rules and the right management model for the portfolio.',
          outcome: 'Clear operating model to decide and execute.',
        },
        {
          label: 'Implement',
          title: 'We install PMO, practices and control',
          copy:
            'We deploy templates, repositories, dashboards, change control, risk management and executive follow-up.',
          outcome: 'Controlled execution with visible owners.',
        },
        {
          label: 'Support',
          title: 'We sustain progress and learning',
          copy:
            'We train leaders and teams, correct deviations and adjust the model based on operational evidence.',
          outcome: 'Measurable portfolio and adopted methodology.',
        },
      ],
    },
    capabilities: {
      eyebrow: 'Service catalog',
      title: 'Project management services',
      copy:
        'We support everything from diagnosis to professional management of projects, programs, portfolios and project offices.',
      items: [
        {
          code: 'GOV',
          label: 'Governance',
          title: 'PMO & Project Governance',
          copy:
            'We establish clear direction for your projects, aligning priorities, owners and objectives to maintain control from start to finish.',
        },
        {
          code: 'DELIV',
          label: 'Delivery',
          title: 'Strategic Project Delivery',
          copy:
            'We lead your projects through structured execution to meet objectives and turn strategy into results.',
        },
        {
          code: 'AGILE',
          label: 'Agile',
          title: 'Agile Project Delivery',
          copy:
            'We drive agile management that enables collaboration, adaptation and continuous value delivery throughout the project.',
        },
        {
          code: 'REC',
          label: 'Recovery',
          title: 'Project Audit & Recovery',
          copy:
            'We assess your projects and define actions to regain control, strengthen execution and guide them toward their objectives.',
        },
        {
          code: 'ASSESS',
          label: 'Assessment',
          title: 'Project Management Diagnosis & Maturity',
          copy:
            'We assess how your company manages projects to identify opportunities and strengthen its management capabilities.',
        },
      ],
    },
    benefits: {
      eyebrow: 'Business benefits',
      title: 'Outcomes that should be felt in every project',
      copy:
        'Project discipline organizes priorities, reduces uncertainty and connects daily execution with strategic business objectives.',
      items: [
        {
          value: '01',
          title: 'Objective delivery',
          copy: 'Projects move with clear scope, deliverables and success criteria from the start.',
        },
        {
          value: '02',
          title: 'Cost and time control',
          copy: 'Deviations are detected early and managed with timely decisions.',
        },
        {
          value: '03',
          title: 'Governance and visibility',
          copy: 'Sponsors, leaders and teams know progress, risks, blockers and owners.',
        },
        {
          value: '04',
          title: 'Organizational capability',
          copy: 'The organization learns a common methodology to repeat better outcomes.',
        },
      ],
    },
    contact: {
      eyebrow: 'Project assessment',
      title: 'Tell us which project needs direction.',
      copy:
        'Share the current status, main blocker or type of portfolio you want to organize. We will review the case and suggest the next step.',
    },
  },
};

export const processManagementTemplateByLang: Record<SupportedLang, TechnologySolutionsContent> = {
  es: {
    metadata: {
      title: 'Administración de Procesos AGSIT | BPM 360 y mejora operativa',
      description:
        'Administración de procesos de negocio con diagnóstico AS-IS, modelado BPMN, análisis, diseño, automatización, KPIs, auditoría y mejora continua.',
      canonicalUrl: 'https://agsit.com.mx/administracion-de-procesos/',
      image: '/assets/social/administracion-procesos-es.jpg',
      imageAlt: 'Administración de procesos AGSIT para operar mejor.',
      htmlLang: 'es-MX',
      locale: 'es_MX',
    },
    hero: {
      eyebrow: 'Business Process Management BPM 360°',
      title: ['Procesos claros para', 'operar mejor'],
      copy:
        'Analizamos, documentamos, rediseñamos y automatizamos procesos para reducir fricción, optimizar recursos, controlar la calidad y sostener el crecimiento del negocio.',
      primaryCta: 'Solicitar diagnóstico',
      metrics: [
        { value: '01', label: 'Procesos AS-IS y TO-BE documentados con responsables, reglas y evidencia.' },
        { value: '02', label: 'Indicadores, controles y tableros para medir la operación con claridad.' },
        { value: '03', label: 'Automatización y mejora continua antes de escalar complejidad.' },
      ],
    },
    method: {
      eyebrow: 'Método AGSIT',
      title: 'Del diagnóstico actual al control operativo.',
      copy:
        'Acompañamos el ciclo completo: entender cómo opera hoy la organización, diseñar el estado objetivo y dejar mecanismos para medir, auditar y mejorar.',
      steps: [
        {
          label: 'AS-IS',
          title: 'Mapeamos la operación actual',
          copy:
            'Levantamos procesos, roles, documentos, tiempos, sistemas, reglas de negocio y puntos de fricción.',
          outcome: 'Visibilidad completa de cómo se trabaja hoy.',
        },
        {
          label: 'Analizar',
          title: 'Identificamos controles y brechas',
          copy:
            'Revisamos redundancias, riesgos, calidad, capacidad, indicadores y oportunidades de mejora por proceso.',
          outcome: 'Prioridades de mejora con impacto operativo.',
        },
        {
          label: 'TO-BE',
          title: 'Diseñamos el proceso objetivo',
          copy:
            'Definimos responsables, flujos, reglas, indicadores, estructura documental y criterios de desempeño.',
          outcome: 'Procesos claros, medibles y gobernables.',
        },
        {
          label: 'Mejorar',
          title: 'Implementamos y medimos evolución',
          copy:
            'Acompañamos automatización, capacitación, auditoría, tableros y mejora continua basada en datos.',
          outcome: 'Operación estandarizada y preparada para crecer.',
        },
      ],
    },
    capabilities: {
      eyebrow: 'Catálogo de servicios',
      title: 'Servicios de administración de procesos',
      copy:
        'Ordenamos la operación antes de automatizar: procesos, documentación, indicadores, controles y mecanismos de mejora.',
      items: [
        {
          code: 'DESIGN',
          label: 'Process Design',
          title: 'Modelado y Optimización de Procesos',
          copy:
            'Diseñamos procesos más claros y eficientes para fortalecer la operación y facilitar el crecimiento de tu empresa.',
        },
        {
          code: 'AUTO',
          label: 'Process Automation',
          title: 'Automatización Inteligente de Procesos',
          copy:
            'Automatizamos y conectamos procesos para agilizar la operación y aprovechar mejor el tiempo de tus equipos.',
        },
        {
          code: 'INTEL',
          label: 'Process Intelligence',
          title: 'Inteligencia y Gobierno de Procesos',
          copy:
            'Convertimos la información de tus procesos en visibilidad y control para tomar decisiones con mayor claridad.',
        },
        {
          code: 'OPS',
          label: 'Operational Excellence',
          title: 'Excelencia Operativa',
          copy:
            'Fortalecemos tu operación para aprovechar mejor los recursos, elevar la productividad y sostener mejores resultados.',
        },
        {
          code: 'ASSESS',
          label: 'Process Assessment',
          title: 'Diagnóstico y Auditoría de Procesos',
          copy:
            'Evaluamos tus procesos para descubrir oportunidades y definir acciones que impulsen la mejora de tu operación.',
        },
      ],
    },
    benefits: {
      eyebrow: 'Beneficios para tu negocio',
      title: 'Resultados que vuelven repetible la operación',
      copy:
        'Los procesos bien administrados reducen costos, mejoran la experiencia de clientes y hacen que el crecimiento sea controlable.',
      items: [
        {
          value: '01',
          title: 'Reducción de costos',
          copy: 'Menos retrabajo, errores, tiempos muertos y consumo innecesario de recursos.',
        },
        {
          value: '02',
          title: 'Productividad',
          copy: 'Equipos con responsabilidades, secuencias y reglas de ejecución más claras.',
        },
        {
          value: '03',
          title: 'Calidad operativa',
          copy: 'Procesos estandarizados con indicadores, controles y seguimiento de desviaciones.',
        },
        {
          value: '04',
          title: 'Escalabilidad',
          copy: 'La empresa puede crecer con procesos repetibles, medibles y auditables.',
        },
      ],
    },
    contact: {
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
      image: '/assets/social/process-management-en.jpg',
      imageAlt: 'AGSIT business process management for better operations.',
      htmlLang: 'en',
      locale: 'en_US',
    },
    hero: {
      eyebrow: 'Business Process Management BPM 360°',
      title: ['Clear processes to', 'operate better'],
      copy:
        'We analyze, document, redesign and automate processes to reduce friction, optimize resources, control quality and sustain business growth.',
      primaryCta: 'Request diagnosis',
      metrics: [
        { value: '01', label: 'AS-IS and TO-BE processes documented with owners, rules and evidence.' },
        { value: '02', label: 'Indicators, controls and dashboards to measure operations clearly.' },
        { value: '03', label: 'Automation and continuous improvement before scaling complexity.' },
      ],
    },
    method: {
      eyebrow: 'AGSIT method',
      title: 'From current diagnosis to operational control.',
      copy:
        'We support the full cycle: understanding how the organization operates today, designing the target state and installing mechanisms to measure, audit and improve.',
      steps: [
        {
          label: 'AS-IS',
          title: 'We map current operations',
          copy:
            'We document processes, roles, documents, timing, systems, business rules and friction points.',
          outcome: 'Complete visibility into how work happens today.',
        },
        {
          label: 'Analyze',
          title: 'We identify controls and gaps',
          copy:
            'We review redundancies, risks, quality, capacity, indicators and improvement opportunities by process.',
          outcome: 'Improvement priorities with operational impact.',
        },
        {
          label: 'TO-BE',
          title: 'We design the target process',
          copy:
            'We define owners, flows, rules, indicators, documentation structure and performance criteria.',
          outcome: 'Clear, measurable and governable processes.',
        },
        {
          label: 'Improve',
          title: 'We implement and measure evolution',
          copy:
            'We support automation, training, auditing, dashboards and data-based continuous improvement.',
          outcome: 'Standardized operations prepared to grow.',
        },
      ],
    },
    capabilities: {
      eyebrow: 'Service catalog',
      title: 'Process management services',
      copy:
        'We organize operations before automating: processes, documentation, indicators, controls and improvement mechanisms.',
      items: [
        {
          code: 'DESIGN',
          label: 'Process Design',
          title: 'Process Modeling and Optimization',
          copy:
            'We design clearer, more efficient processes to strengthen operations and facilitate your company’s growth.',
        },
        {
          code: 'AUTO',
          label: 'Process Automation',
          title: 'Intelligent Process Automation',
          copy:
            'We automate and connect processes to streamline operations and make better use of your teams’ time.',
        },
        {
          code: 'INTEL',
          label: 'Process Intelligence',
          title: 'Process Intelligence & Governance',
          copy:
            'We turn your process information into visibility and control for clearer decision-making.',
        },
        {
          code: 'OPS',
          label: 'Operational Excellence',
          title: 'Operational Excellence',
          copy:
            'We strengthen your operations to make better use of resources, improve productivity and sustain stronger results.',
        },
        {
          code: 'ASSESS',
          label: 'Process Assessment',
          title: 'Process Diagnosis & Audit',
          copy:
            'We assess your processes to uncover opportunities and define actions that drive operational improvement.',
        },
      ],
    },
    benefits: {
      eyebrow: 'Business benefits',
      title: 'Outcomes that make operations repeatable',
      copy:
        'Well-managed processes reduce costs, improve client experience and make growth controllable.',
      items: [
        {
          value: '01',
          title: 'Cost reduction',
          copy: 'Less rework, errors, idle time and unnecessary resource consumption.',
        },
        {
          value: '02',
          title: 'Productivity',
          copy: 'Teams work with clearer responsibilities, sequences and execution rules.',
        },
        {
          value: '03',
          title: 'Operational quality',
          copy: 'Standardized processes with indicators, controls and deviation tracking.',
        },
        {
          value: '04',
          title: 'Scalability',
          copy: 'The company can grow with repeatable, measurable and auditable processes.',
        },
      ],
    },
    contact: {
      eyebrow: 'Process diagnosis',
      title: 'Tell us which process needs order.',
      copy:
        'Share the area, workflow or operational problem you want to improve. We will review your case and suggest the next step with a BPM approach.',
    },
  },
};

export function getStrategicPlanningTemplateContent(lang: SupportedLang) {
  return strategicPlanningTemplateByLang[lang];
}

export function getProjectManagementTemplateContent(lang: SupportedLang) {
  return projectManagementTemplateByLang[lang];
}

export function getProcessManagementTemplateContent(lang: SupportedLang) {
  return processManagementTemplateByLang[lang];
}

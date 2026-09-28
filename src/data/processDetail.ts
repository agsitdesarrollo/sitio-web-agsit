import type { SupportedLang } from '../i18n/ui';

/*
 * Páginas terciarias de Administración de Procesos (5 servicios × es/en).
 *
 * Imágenes: cada servicio tiene un espacio reservado (`image`). Mientras esté
 * vacío, el espacio muestra el nombre técnico como tipografía tenue. Para
 * poner una imagen, guárdala en
 * `public/assets/administracion-procesos/<slug>/<n>.webp` (recomendado 4:3,
 * 1200 × 900 px) y agrega, por ejemplo:
 *   image: { src: '/assets/administracion-procesos/<slug>/1.webp', alt: 'Descripción' }
 */

export type ProcessDetailImage = {
  src: string;
  alt: string;
};

export type ProcessDetailService = {
  /** Nombre técnico tal como se busca (BPMN, KPIs, Lean…). */
  term: string;
  /** Etiqueta corta para la barra de ruta. */
  short: string;
  /** Una línea en llano para el diagrama del hero. */
  blurb: string;
  /** Titular en llano del panel. */
  title: string;
  copy: string;
  receive: string;
  image?: ProcessDetailImage;
};

export type ProcessDetailCrossLink = {
  title: string;
  copy: string;
  href: string;
};

export type ProcessDetailPageContent = {
  slug: string;
  name: string;
  summary: string;
  metadata: {
    title: string;
    description: string;
  };
  hero: {
    title: [string, string];
    copy: string;
    startLabel: string;
    endLabel: string;
  };
  today: {
    title: string;
    signs: string[];
  };
  method: {
    title: string;
    steps: Array<{ title: string; copy: string }>;
  };
  services: ProcessDetailService[];
  change: {
    title: string;
    rows: Array<{ before: string; after: string }>;
  };
  crossLink?: ProcessDetailCrossLink;
};

export type ProcessDetailUi = {
  routeLabel: string;
  heroRouteLabel: string;
  stationLabel: string;
  stations: {
    start: string;
    today: string;
    method: string;
    result: string;
    more: string;
  };
  back: string;
  cta: string;
  receive: string;
  before: string;
  after: string;
  moreTitle: string;
  moreParent: string;
  crossLabel: string;
};

const processDetailUiByLang: Record<SupportedLang, ProcessDetailUi> = {
  es: {
    routeLabel: 'Ruta de la página',
    heroRouteLabel: 'Servicios de esta página',
    stationLabel: 'Estación',
    stations: {
      start: 'Inicio',
      today: 'Hoy',
      method: 'Método',
      result: 'Resultado',
      more: 'Más servicios',
    },
    back: 'Volver a Administración de Procesos',
    cta: 'Hablar con un especialista',
    receive: 'Lo que recibes',
    before: 'Antes',
    after: 'Después',
    moreTitle: 'Otras formas de ordenar tu operación.',
    moreParent: 'Ver todos los servicios de Administración de Procesos',
    crossLabel: 'Mira también',
  },
  en: {
    routeLabel: 'Page route',
    heroRouteLabel: 'Services on this page',
    stationLabel: 'Station',
    stations: {
      start: 'Start',
      today: 'Today',
      method: 'Method',
      result: 'Result',
      more: 'More services',
    },
    back: 'Back to Process Management',
    cta: 'Talk to a specialist',
    receive: 'What you get',
    before: 'Before',
    after: 'After',
    moreTitle: 'Other ways to organize your operation.',
    moreParent: 'See all Process Management services',
    crossLabel: 'See also',
  },
};

const processDetailPagesByLang: Record<SupportedLang, ProcessDetailPageContent[]> = {
  es: [
    {
      slug: 'modelado-y-optimizacion-de-procesos',
      name: 'Modelado y Optimización de Procesos',
      summary: 'Dibujamos cómo trabajas y diseñamos una forma más clara de hacerlo.',
      metadata: {
        title: 'Modelado y Optimización de Procesos | AGSIT',
        description:
          'Dibujamos cómo trabaja tu empresa y lo mejoramos: BPMN, AS-IS, TO-BE, diseño y reingeniería de procesos explicados en lenguaje sencillo.',
      },
      hero: {
        title: ['Haz visible cómo', 'trabaja tu empresa'],
        copy:
          'Dibujamos tus procesos paso a paso, junto con tu equipo, y diseñamos una forma de trabajar más clara y ágil.',
        startLabel: 'Cada quien lo hace a su manera',
        endLabel: 'Un proceso claro para todos',
      },
      today: {
        title: 'Si nadie ve el proceso completo, los problemas se repiten.',
        signs: [
          'Solo una persona sabe cómo se hace de verdad.',
          'El mismo trabajo se hace distinto según quién lo haga.',
          'Cuando alguien falta, el trabajo se detiene.',
        ],
      },
      method: {
        title: 'Trabajamos con quienes hacen el trabajo.',
        steps: [
          { title: 'Escuchamos', copy: 'Hablamos con las personas que hacen el trabajo todos los días.' },
          { title: 'Dibujamos', copy: 'Mostramos el recorrido actual en un mapa que todos entienden.' },
          {
            title: 'Diseñamos',
            copy: 'Definimos contigo una mejor forma de trabajar y cómo llevarla a la práctica.',
          },
        ],
      },
      services: [
        {
          term: 'BPMN',
          short: 'BPMN',
          blurb: 'El mapa de tus procesos',
          title: 'Un mapa que todo tu equipo entiende.',
          copy:
            'BPMN es la forma estándar de dibujar un proceso. Usamos símbolos sencillos para que todos vean el mismo camino.',
          receive: 'Un mapa visual de cada proceso, listo para consultar y compartir.',
        },
        {
          term: 'AS-IS',
          short: 'AS-IS',
          blurb: 'Cómo trabajas hoy',
          title: 'Cómo trabajas hoy, tal como es.',
          copy:
            'AS-IS significa “cómo es hoy”. Documentamos los pasos reales, incluidas las excepciones que nadie escribió.',
          receive: 'El retrato completo de tu operación actual y de dónde se atora.',
        },
        {
          term: 'TO-BE',
          short: 'TO-BE',
          blurb: 'Cómo podrías trabajar',
          title: 'Cómo podría funcionar mejor.',
          copy:
            'TO-BE significa “cómo debería ser”. Diseñamos el recorrido futuro con pasos y responsables más claros.',
          receive: 'El proceso mejorado, con pasos, responsables y reglas definidos.',
        },
        {
          term: 'Diseño de Procesos',
          short: 'Diseño',
          blurb: 'Procesos a tu medida',
          title: 'Un proceso hecho a la medida de tu negocio.',
          copy:
            'Definimos las actividades, las decisiones y quién hace qué, para que el trabajo fluya sin depender de una persona.',
          receive: 'Procesos documentados que tu equipo puede seguir desde el primer día.',
        },
        {
          term: 'Reingeniería de Procesos',
          short: 'Reingeniería',
          blurb: 'Replantear lo que ya no sirve',
          title: 'Cuando un ajuste no basta, se replantea.',
          copy:
            'Si un proceso ya no responde a lo que tu negocio necesita, lo repensamos desde cero y lo reconstruimos.',
          receive: 'Un proceso nuevo y más simple, con un plan para ponerlo en marcha.',
        },
      ],
      change: {
        title: 'Lo que cambia en tu empresa.',
        rows: [
          { before: 'Cada quien hace el trabajo a su manera.', after: 'Todos siguen el mismo recorrido.' },
          {
            before: 'El conocimiento vive en la cabeza de unos pocos.',
            after: 'El proceso está documentado y a la vista.',
          },
          { before: 'Los problemas se repiten.', after: 'Sabes dónde mejorar y cómo hacerlo.' },
        ],
      },
    },
    {
      slug: 'automatizacion-inteligente-de-procesos',
      name: 'Automatización Inteligente de Procesos',
      summary: 'Conectamos tareas, reglas y aprobaciones para que el trabajo avance.',
      metadata: {
        title: 'Automatización Inteligente de Procesos de Negocio | AGSIT',
        description:
          'Ordena el flujo de tu trabajo con BPMS, workflows, reglas de negocio e integración de procesos para que cada tarea avance sin perseguirla.',
      },
      hero: {
        title: ['Que el trabajo avance', 'sin perseguirlo'],
        copy:
          'Conectamos tareas, reglas y aprobaciones para que cada proceso siga su camino con menos intervención manual.',
        startLabel: 'Seguimiento a mano',
        endLabel: 'Un flujo que avanza solo',
      },
      today: {
        title: 'Una solicitud no debería quedarse detenida en un correo.',
        signs: [
          'Las aprobaciones se pierden entre correos y mensajes.',
          'Se captura la misma información una y otra vez.',
          'Nadie sabe en qué paso va cada solicitud.',
        ],
      },
      method: {
        title: 'Primero ordenamos, después conectamos.',
        steps: [
          { title: 'Identificamos', copy: 'Buscamos las tareas que se repiten y las aprobaciones que se detienen.' },
          { title: 'Definimos', copy: 'Acordamos cuándo y cómo debe avanzar cada caso.' },
          { title: 'Conectamos', copy: 'Armamos el flujo, lo ponemos en marcha y le damos seguimiento.' },
        ],
      },
      services: [
        {
          term: 'BPMS',
          short: 'BPMS',
          blurb: 'Una plataforma que guía el trabajo',
          title: 'Una plataforma que lleva el trabajo de principio a fin.',
          copy:
            'Un BPMS es un sistema que guía cada proceso paso a paso y muestra en qué punto va. Sin perseguir a nadie por correo.',
          receive: 'Tus procesos organizados en un solo lugar, con el avance a la vista.',
        },
        {
          term: 'Workflows',
          short: 'Workflows',
          blurb: 'El camino de cada solicitud',
          title: 'Cada tarea llega a la persona indicada.',
          copy:
            'Un workflow es el camino que sigue una solicitud. Lo diseñamos para que cada paso llegue a quien corresponde, a tiempo.',
          receive: 'Recorridos claros, con responsables y tiempos definidos.',
        },
        {
          term: 'Automatización de Procesos',
          short: 'Automatización',
          blurb: 'Menos tareas a mano',
          title: 'Menos tareas repetidas a mano.',
          copy:
            'Automatizamos los pasos que se repiten siempre igual, para que tu equipo se dedique a lo que requiere criterio.',
          receive: 'Tareas repetitivas que se resuelven solas y menos errores de captura.',
        },
        {
          term: 'Reglas de Negocio',
          short: 'Reglas',
          blurb: 'Decisiones con el mismo criterio',
          title: 'Decisiones claras, siempre con el mismo criterio.',
          copy:
            'Definimos las condiciones que deciden qué pasa en cada caso: quién aprueba, cuándo y con qué límites.',
          receive: 'Reglas escritas y aplicadas de la misma forma cada vez.',
        },
        {
          term: 'Integración de Procesos',
          short: 'Integración',
          blurb: 'Información que pasa sola',
          title: 'Que la información no se capture dos veces.',
          copy:
            'Conectamos las etapas y las herramientas que ya usas para que la información pase sola de un paso a otro.',
          receive: 'Un flujo continuo, sin copiar y pegar entre sistemas.',
        },
      ],
      change: {
        title: 'Lo que cambia en tu día a día.',
        rows: [
          {
            before: 'Sigues cada solicitud por correo y mensajes.',
            after: 'Ves en qué paso va cada solicitud.',
          },
          {
            before: 'Se captura la misma información una y otra vez.',
            after: 'La información pasa sola de un paso a otro.',
          },
          {
            before: 'Las decisiones dependen de quién las tome.',
            after: 'Las reglas son claras y se aplican igual.',
          },
        ],
      },
      crossLink: {
        title: 'Automatización Inteligente de Procesos',
        copy: 'Desde la tecnología: RPA, APIs e integración de sistemas.',
        href: '/soluciones-tecnologicas/automatizacion-inteligente-de-procesos/',
      },
    },
    {
      slug: 'inteligencia-y-gobierno-de-procesos',
      name: 'Inteligencia y Gobierno de Procesos',
      summary: 'Te damos visibilidad para decidir con información clara.',
      metadata: {
        title: 'Inteligencia y Gobierno de Procesos | AGSIT',
        description:
          'Mide y da seguimiento a tus procesos con KPIs, dashboards, gobierno BPM, monitoreo y mejora continua para decidir con información clara.',
      },
      hero: {
        title: ['Ve lo que pasa.', 'Decide qué mejorar.'],
        copy:
          'Damos visibilidad al desempeño de tus procesos para que puedas darles seguimiento y decidir con información clara.',
        startLabel: 'Resultados dispersos',
        endLabel: 'Decisiones con información',
      },
      today: {
        title: 'Sin información clara, los problemas se descubren tarde.',
        signs: [
          'Te enteras de un retraso cuando el cliente ya se quejó.',
          'Cada área reporta sus resultados a su manera.',
          'Es difícil saber qué mejorar primero.',
        ],
      },
      method: {
        title: 'Medimos lo que importa y lo revisamos contigo.',
        steps: [
          { title: 'Definimos', copy: 'Acordamos qué conviene observar en cada proceso.' },
          { title: 'Mostramos', copy: 'Reunimos la información en tableros fáciles de leer.' },
          { title: 'Revisamos', copy: 'Vemos los resultados juntos y decidimos qué mejorar.' },
        ],
      },
      services: [
        {
          term: 'KPIs',
          short: 'KPIs',
          blurb: 'Qué medir',
          title: 'Elige qué medir para saber si vas bien.',
          copy:
            'Un KPI es un indicador que muestra si un proceso cumple su objetivo. Elegimos pocos, claros y útiles.',
          receive: 'Indicadores acordados para cada proceso.',
        },
        {
          term: 'Dashboards',
          short: 'Dashboards',
          blurb: 'Todo en una vista',
          title: 'Todo tu avance en una sola vista.',
          copy:
            'Reunimos la información importante en tableros fáciles de leer, sin que te pierdas entre hojas de cálculo.',
          receive: 'Tableros claros para revisar resultados de un vistazo.',
        },
        {
          term: 'Gobierno BPM',
          short: 'Gobierno',
          blurb: 'Responsables y seguimiento',
          title: 'Cada proceso con responsable y seguimiento.',
          copy:
            'Definimos quién cuida cada proceso, cada cuánto se revisa y cómo se aprueban los cambios.',
          receive: 'Responsables y reglas de seguimiento para tus procesos.',
        },
        {
          term: 'Monitoreo de Procesos',
          short: 'Monitoreo',
          blurb: 'Detectar dónde se atora',
          title: 'Detecta a tiempo dónde se detiene el trabajo.',
          copy:
            'Observamos el avance de los procesos para avisarte cuando algo se atora, antes de que llegue al cliente.',
          receive: 'El avance a la vista y alertas cuando algo se desvía.',
        },
        {
          term: 'Mejora Continua',
          short: 'Mejora continua',
          blurb: 'Ajustar poco a poco',
          title: 'Cada resultado abre una mejora.',
          copy:
            'Usamos lo que muestran los datos para ajustar tus procesos poco a poco, de forma constante.',
          receive: 'Un ciclo de revisión que mantiene tus procesos al día.',
        },
      ],
      change: {
        title: 'Lo que cambia en tus decisiones.',
        rows: [
          { before: 'Te enteras de los problemas tarde.', after: 'Ves los resultados a tiempo para actuar.' },
          { before: 'Cada área mide a su manera.', after: 'Todos usan los mismos indicadores.' },
          { before: 'No sabes qué mejorar primero.', after: 'Tienes claras las prioridades.' },
        ],
      },
      crossLink: {
        title: 'Ingeniería de Datos y Analítica Estratégica',
        copy: 'Si necesitas trabajar con tus datos a mayor profundidad.',
        href: '/soluciones-tecnologicas/ingenieria-de-datos-y-analitica-estrategica/',
      },
    },
    {
      slug: 'excelencia-operativa',
      name: 'Excelencia Operativa',
      summary: 'Reducimos esperas, desperdicios y trabajo repetido.',
      metadata: {
        title: 'Excelencia Operativa | AGSIT',
        description:
          'Mejora cómo trabaja tu operación con Lean, Lean Six Sigma, supply chain, inventarios y estudio de tiempos y movimientos.',
      },
      hero: {
        title: ['Una operación más simple', 'empieza en cada paso'],
        copy:
          'Revisamos cómo usas el tiempo, los materiales y el esfuerzo de tu equipo para que el trabajo diario fluya mejor.',
        startLabel: 'Esperas y repeticiones',
        endLabel: 'Trabajo que fluye',
      },
      today: {
        title: 'Los pequeños desperdicios frenan a toda la operación.',
        signs: [
          'Hay esperas entre un paso y otro.',
          'Se repite trabajo por errores que se pudieron evitar.',
          'Falta o sobra material y nadie sabe por qué.',
        ],
      },
      method: {
        title: 'Observamos el trabajo donde ocurre.',
        steps: [
          { title: 'Observamos', copy: 'Vemos cómo se realiza el trabajo en la práctica.' },
          { title: 'Priorizamos', copy: 'Elegimos los puntos que más frenan tu operación.' },
          { title: 'Ajustamos', copy: 'Probamos los cambios y les damos seguimiento para que se mantengan.' },
        ],
      },
      services: [
        {
          term: 'Lean',
          short: 'Lean',
          blurb: 'Quitar lo que sobra',
          title: 'Quita lo que no aporta valor.',
          copy:
            'Lean es una forma de trabajar que elimina esperas, repeticiones y pasos innecesarios, sin perder calidad.',
          receive: 'Un mapa de desperdicios y acciones para eliminarlos.',
        },
        {
          term: 'Lean Six Sigma',
          short: 'Six Sigma',
          blurb: 'Menos errores',
          title: 'Menos errores, resultados más constantes.',
          copy:
            'Combina Lean con el análisis de por qué ocurren los errores, para que el trabajo salga igual de bien cada vez.',
          receive: 'Las causas de tus errores identificadas y un plan para corregirlas.',
        },
        {
          term: 'Supply Chain',
          short: 'Supply Chain',
          blurb: 'Materiales a tiempo',
          title: 'Que los materiales lleguen cuando se necesitan.',
          copy:
            'Revisamos cómo fluyen los materiales y la información entre proveedores, almacén y entrega.',
          receive: 'Una cadena de suministro más ordenada y fácil de seguir.',
        },
        {
          term: 'Inventarios',
          short: 'Inventarios',
          blurb: 'Saber qué tienes',
          title: 'Saber qué tienes, cuánto y dónde.',
          copy:
            'Ordenamos los criterios para controlar existencias y evitar tanto los faltantes como lo que se acumula.',
          receive: 'Reglas claras para pedir, guardar y controlar tu inventario.',
        },
        {
          term: 'Tiempos y Movimientos',
          short: 'Tiempos',
          blurb: 'Cuánto tarda cada tarea',
          title: 'Cuánto tarda cada tarea y por qué.',
          copy:
            'Observamos cómo se realiza cada actividad y cuánto toma, para simplificar recorridos y esfuerzos.',
          receive: 'Tareas más simples y tiempos de referencia para tu equipo.',
        },
      ],
      change: {
        title: 'Lo que cambia en tu operación.',
        rows: [
          { before: 'Hay esperas entre un paso y otro.', after: 'El trabajo fluye sin interrupciones.' },
          { before: 'Faltan o sobran materiales.', after: 'Sabes qué tienes y qué necesitas.' },
          {
            before: 'Tu equipo repite tareas por errores evitables.',
            after: 'Tu equipo se concentra en lo que aporta valor.',
          },
        ],
      },
    },
    {
      slug: 'diagnostico-y-auditoria-de-procesos',
      name: 'Diagnóstico y Auditoría de Procesos',
      summary: 'Revisamos tus procesos para saber por dónde empezar.',
      metadata: {
        title: 'Diagnóstico y Auditoría de Procesos | AGSIT',
        description:
          'Revisa tus procesos a fondo con diagnóstico BPM, auditorías, evaluación de madurez y GAP analysis para saber por dónde empezar.',
      },
      hero: {
        title: ['Conoce lo que funciona.', 'Detecta lo que falta.'],
        copy:
          'Revisamos tus procesos a fondo para encontrar riesgos, brechas y oportunidades antes de decidir qué cambiar.',
        startLabel: 'Dudas sin respuesta',
        endLabel: 'Prioridades claras',
      },
      today: {
        title: 'Es difícil mejorar lo que todavía no se ha revisado a fondo.',
        signs: [
          'No sabes si tus procesos se siguen como se definieron.',
          'Sospechas que hay riesgos, pero no dónde.',
          'No tienes claro por dónde empezar a mejorar.',
        ],
      },
      method: {
        title: 'Revisamos a fondo y te decimos qué sigue.',
        steps: [
          { title: 'Reunimos', copy: 'Conocemos tus procesos y escuchamos a tu equipo.' },
          { title: 'Revisamos', copy: 'Comparamos cómo trabajas con cómo debería hacerse.' },
          { title: 'Entregamos', copy: 'Te damos hallazgos claros y las prioridades para actuar.' },
        ],
      },
      services: [
        {
          term: 'Diagnóstico BPM',
          short: 'Diagnóstico',
          blurb: 'Un primer vistazo completo',
          title: 'Un primer vistazo completo a tus procesos.',
          copy:
            'Revisamos cómo se manejan tus procesos hoy para decirte qué funciona, qué no y por dónde conviene empezar.',
          receive: 'Un diagnóstico claro, con hallazgos y prioridades.',
        },
        {
          term: 'Auditorías de Procesos',
          short: 'Auditorías',
          blurb: 'Comprobar que se cumple',
          title: 'Comprueba que el trabajo se hace como debe.',
          copy:
            'Revisamos si las actividades y los controles se cumplen como fueron definidos, y dónde hay riesgos.',
          receive: 'Un informe con lo que se cumple, lo que no y los riesgos detectados.',
        },
        {
          term: 'Evaluación de Madurez',
          short: 'Madurez',
          blurb: 'En qué nivel estás',
          title: 'Ubica en qué nivel está tu organización.',
          copy:
            'Medimos qué tan ordenados y controlados están tus procesos para saber qué tan lejos estás de tu meta.',
          receive: 'Tu nivel actual y los siguientes pasos para avanzar.',
        },
        {
          term: 'GAP Analysis',
          short: 'GAP',
          blurb: 'Lo que te falta',
          title: 'La distancia entre dónde estás y dónde quieres estar.',
          copy:
            'GAP significa “brecha”. Comparamos tu situación actual con la que quieres lograr y señalamos qué falta.',
          receive: 'La lista de brechas y un camino ordenado para cerrarlas.',
        },
      ],
      change: {
        title: 'Lo que cambia cuando tienes claridad.',
        rows: [
          { before: 'Dudas sobre riesgos y controles.', after: 'Hallazgos claros y documentados.' },
          { before: 'No sabes por dónde empezar.', after: 'Tienes una ruta con prioridades.' },
          { before: 'Decides por intuición.', after: 'Decides con evidencia.' },
        ],
      },
    },
  ],
  en: [
    {
      slug: 'process-modeling-and-optimization',
      name: 'Process Modeling and Optimization',
      summary: 'We map how you work and design a clearer way forward.',
      metadata: {
        title: 'Process Modeling and Optimization | AGSIT',
        description:
          'We map how your company works and improve it: BPMN, AS-IS, TO-BE, process design and reengineering explained in plain language.',
      },
      hero: {
        title: ['See how your company', 'really works'],
        copy:
          'We map your processes step by step with your team and design a clearer, more agile way of working.',
        startLabel: 'Everyone does it their own way',
        endLabel: 'One clear process for everyone',
      },
      today: {
        title: 'When nobody sees the whole process, problems come back.',
        signs: [
          'Only one person knows how it is really done.',
          'The same work gets done differently depending on who does it.',
          'When someone is out, work stops.',
        ],
      },
      method: {
        title: 'We work with the people who do the work.',
        steps: [
          { title: 'Listen', copy: 'We talk with the people who do the work every day.' },
          { title: 'Map', copy: 'We show the current journey in a map everyone understands.' },
          { title: 'Design', copy: 'Together we define a better way of working and how to put it into practice.' },
        ],
      },
      services: [
        {
          term: 'BPMN',
          short: 'BPMN',
          blurb: 'A map of your processes',
          title: 'A map your whole team understands.',
          copy:
            'BPMN is the standard way to draw a process. We use simple symbols so everyone sees the same path.',
          receive: 'A visual map of each process, ready to consult and share.',
        },
        {
          term: 'AS-IS',
          short: 'AS-IS',
          blurb: 'How you work today',
          title: 'How you work today, exactly as it is.',
          copy:
            'AS-IS means “how it is today”. We document the real steps, including the exceptions nobody wrote down.',
          receive: 'A full picture of your current operation and where it gets stuck.',
        },
        {
          term: 'TO-BE',
          short: 'TO-BE',
          blurb: 'How you could work',
          title: 'How it could work better.',
          copy:
            'TO-BE means “how it should be”. We design the future journey with clearer steps and owners.',
          receive: 'The improved process, with defined steps, owners and rules.',
        },
        {
          term: 'Process Design',
          short: 'Design',
          blurb: 'Processes built for you',
          title: 'A process built around your business.',
          copy:
            'We define activities, decisions and who does what, so work flows without depending on one person.',
          receive: 'Documented processes your team can follow from day one.',
        },
        {
          term: 'Process Reengineering',
          short: 'Reengineering',
          blurb: 'Rethink what no longer works',
          title: 'When a tweak is not enough, rethink it.',
          copy:
            'If a process no longer fits what your business needs, we rethink it from scratch and rebuild it.',
          receive: 'A new, simpler process with a plan to put it in place.',
        },
      ],
      change: {
        title: 'What changes in your company.',
        rows: [
          { before: 'Everyone works their own way.', after: 'Everyone follows the same journey.' },
          {
            before: 'Knowledge lives in a few people’s heads.',
            after: 'The process is documented and in plain sight.',
          },
          { before: 'Problems keep repeating.', after: 'You know where to improve and how.' },
        ],
      },
    },
    {
      slug: 'intelligent-process-automation',
      name: 'Intelligent Process Automation',
      summary: 'We connect tasks, rules and approvals so work keeps moving.',
      metadata: {
        title: 'Intelligent Business Process Automation | AGSIT',
        description:
          'Organize your workflow with BPMS, workflows, business rules and process integration so every task moves forward without chasing it.',
      },
      hero: {
        title: ['Keep work moving', 'without chasing it'],
        copy:
          'We connect tasks, rules and approvals so every process follows its path with less manual effort.',
        startLabel: 'Following up by hand',
        endLabel: 'A flow that moves on its own',
      },
      today: {
        title: 'A request should not sit stuck in an email.',
        signs: [
          'Approvals get lost between emails and messages.',
          'The same information is entered over and over.',
          'Nobody knows which step each request is in.',
        ],
      },
      method: {
        title: 'First we organize, then we connect.',
        steps: [
          { title: 'Identify', copy: 'We look for repeated tasks and approvals that get stuck.' },
          { title: 'Define', copy: 'We agree on when and how each case should move forward.' },
          { title: 'Connect', copy: 'We build the flow, put it to work and follow up.' },
        ],
      },
      services: [
        {
          term: 'BPMS',
          short: 'BPMS',
          blurb: 'A platform that guides work',
          title: 'A platform that carries work from start to finish.',
          copy:
            'A BPMS is a system that guides each process step by step and shows where it stands. No more chasing people by email.',
          receive: 'Your processes organized in one place, with progress in sight.',
        },
        {
          term: 'Workflows',
          short: 'Workflows',
          blurb: 'The path of each request',
          title: 'Every task reaches the right person.',
          copy:
            'A workflow is the path a request follows. We design it so each step reaches whoever is responsible, on time.',
          receive: 'Clear journeys with owners and deadlines.',
        },
        {
          term: 'Process Automation',
          short: 'Automation',
          blurb: 'Fewer manual tasks',
          title: 'Fewer tasks done by hand.',
          copy:
            'We automate the steps that repeat the same way every time, so your team can focus on what needs judgment.',
          receive: 'Repetitive tasks that run on their own, with fewer entry errors.',
        },
        {
          term: 'Business Rules',
          short: 'Rules',
          blurb: 'Decisions with the same criteria',
          title: 'Clear decisions, always with the same criteria.',
          copy:
            'We define the conditions that decide what happens in each case: who approves, when and within what limits.',
          receive: 'Written rules applied the same way every time.',
        },
        {
          term: 'Process Integration',
          short: 'Integration',
          blurb: 'Information that moves itself',
          title: 'Information you never enter twice.',
          copy:
            'We connect the stages and tools you already use so information moves from one step to the next on its own.',
          receive: 'A continuous flow, with no copying and pasting between systems.',
        },
      ],
      change: {
        title: 'What changes in your day to day.',
        rows: [
          {
            before: 'You follow each request by email and messages.',
            after: 'You see which step each request is in.',
          },
          {
            before: 'The same information is entered again and again.',
            after: 'Information moves on its own between steps.',
          },
          {
            before: 'Decisions depend on who happens to make them.',
            after: 'Rules are clear and applied the same way.',
          },
        ],
      },
      crossLink: {
        title: 'Intelligent Process Automation',
        copy: 'From the technology side: RPA, APIs and systems integration.',
        href: '/en/technology-solutions/intelligent-process-automation/',
      },
    },
    {
      slug: 'process-intelligence-and-governance',
      name: 'Process Intelligence & Governance',
      summary: 'We give you visibility to decide with clear information.',
      metadata: {
        title: 'Process Intelligence & Governance | AGSIT',
        description:
          'Measure and follow your processes with KPIs, dashboards, BPM governance, monitoring and continuous improvement to decide with clear information.',
      },
      hero: {
        title: ['See what happens.', 'Decide what to improve.'],
        copy:
          'We bring visibility to how your processes perform so you can follow them and decide with clear information.',
        startLabel: 'Scattered results',
        endLabel: 'Decisions with clear information',
      },
      today: {
        title: 'Without clear information, problems show up late.',
        signs: [
          'You hear about a delay when the customer has already complained.',
          'Each area reports results its own way.',
          'It is hard to know what to improve first.',
        ],
      },
      method: {
        title: 'We measure what matters and review it with you.',
        steps: [
          { title: 'Define', copy: 'We agree on what is worth watching in each process.' },
          { title: 'Show', copy: 'We gather the information into dashboards that are easy to read.' },
          { title: 'Review', copy: 'We look at the results together and decide what to improve.' },
        ],
      },
      services: [
        {
          term: 'KPIs',
          short: 'KPIs',
          blurb: 'What to measure',
          title: 'Choose what to measure to know you are on track.',
          copy:
            'A KPI is an indicator that shows whether a process meets its goal. We choose a few that are clear and useful.',
          receive: 'Agreed indicators for each process.',
        },
        {
          term: 'Dashboards',
          short: 'Dashboards',
          blurb: 'Everything in one view',
          title: 'All your progress in one view.',
          copy:
            'We gather the key information into dashboards that are easy to read, so you do not get lost in spreadsheets.',
          receive: 'Clear dashboards to review results at a glance.',
        },
        {
          term: 'BPM Governance',
          short: 'Governance',
          blurb: 'Owners and follow-up',
          title: 'Every process with an owner and follow-up.',
          copy:
            'We define who looks after each process, how often it is reviewed and how changes get approved.',
          receive: 'Owners and follow-up rules for your processes.',
        },
        {
          term: 'Process Monitoring',
          short: 'Monitoring',
          blurb: 'Spot where it gets stuck',
          title: 'Spot early where work gets stuck.',
          copy:
            'We watch how processes progress and warn you when something stalls, before it reaches the customer.',
          receive: 'Progress in sight and alerts when something drifts.',
        },
        {
          term: 'Continuous Improvement',
          short: 'Improvement',
          blurb: 'Adjust little by little',
          title: 'Every result opens an improvement.',
          copy:
            'We use what the data shows to adjust your processes little by little, consistently.',
          receive: 'A review cycle that keeps your processes up to date.',
        },
      ],
      change: {
        title: 'What changes in your decisions.',
        rows: [
          { before: 'You find out about problems late.', after: 'You see results in time to act.' },
          { before: 'Each area measures its own way.', after: 'Everyone uses the same indicators.' },
          { before: 'You are unsure what to improve first.', after: 'Priorities are clear.' },
        ],
      },
      crossLink: {
        title: 'Data Engineering and Strategic Analytics',
        copy: 'If you need to work with your data in greater depth.',
        href: '/en/technology-solutions/data-engineering-and-strategic-analytics/',
      },
    },
    {
      slug: 'operational-excellence',
      name: 'Operational Excellence',
      summary: 'We reduce waiting, waste and repeated work.',
      metadata: {
        title: 'Operational Excellence | AGSIT',
        description:
          'Improve how your operation runs with Lean, Lean Six Sigma, supply chain, inventory and time and motion studies.',
      },
      hero: {
        title: ['A simpler operation', 'starts with each step'],
        copy:
          'We review how you use time, materials and your team’s effort so daily work flows better.',
        startLabel: 'Waiting and repetition',
        endLabel: 'Work that flows',
      },
      today: {
        title: 'Small pieces of waste slow the whole operation.',
        signs: [
          'There is waiting between one step and the next.',
          'Work gets repeated because of avoidable errors.',
          'Materials run short or pile up and nobody knows why.',
        ],
      },
      method: {
        title: 'We watch the work where it happens.',
        steps: [
          { title: 'Observe', copy: 'We see how the work is done in practice.' },
          { title: 'Prioritize', copy: 'We choose the points that slow your operation most.' },
          { title: 'Adjust', copy: 'We test changes and follow up so they last.' },
        ],
      },
      services: [
        {
          term: 'Lean',
          short: 'Lean',
          blurb: 'Remove what is not needed',
          title: 'Remove what adds no value.',
          copy:
            'Lean is a way of working that removes waiting, repetition and unnecessary steps without losing quality.',
          receive: 'A map of waste and actions to remove it.',
        },
        {
          term: 'Lean Six Sigma',
          short: 'Six Sigma',
          blurb: 'Fewer errors',
          title: 'Fewer errors, steadier results.',
          copy:
            'It combines Lean with finding out why errors happen, so work comes out just as good every time.',
          receive: 'The causes of your errors identified and a plan to fix them.',
        },
        {
          term: 'Supply Chain',
          short: 'Supply Chain',
          blurb: 'Materials on time',
          title: 'Materials arrive when they are needed.',
          copy:
            'We review how materials and information flow between suppliers, warehouse and delivery.',
          receive: 'A more organized supply chain that is easy to follow.',
        },
        {
          term: 'Inventory',
          short: 'Inventory',
          blurb: 'Know what you have',
          title: 'Know what you have, how much and where.',
          copy:
            'We set clear criteria to control stock and avoid both shortages and pile-ups.',
          receive: 'Clear rules to order, store and control your inventory.',
        },
        {
          term: 'Time and Motion',
          short: 'Time & motion',
          blurb: 'How long each task takes',
          title: 'How long each task takes, and why.',
          copy:
            'We observe how each activity is done and how long it takes, to simplify routes and effort.',
          receive: 'Simpler tasks and reference times for your team.',
        },
      ],
      change: {
        title: 'What changes in your operation.',
        rows: [
          { before: 'There is waiting between steps.', after: 'Work flows without interruptions.' },
          { before: 'Materials run short or pile up.', after: 'You know what you have and what you need.' },
          {
            before: 'Your team repeats tasks because of avoidable errors.',
            after: 'Your team focuses on what adds value.',
          },
        ],
      },
    },
    {
      slug: 'process-diagnosis-and-audit',
      name: 'Process Diagnosis & Audit',
      summary: 'We review your processes so you know where to start.',
      metadata: {
        title: 'Process Diagnosis & Audit | AGSIT',
        description:
          'Review your processes in depth with BPM diagnosis, audits, maturity assessment and GAP analysis to know where to start.',
      },
      hero: {
        title: ['Know what works.', 'Find what is missing.'],
        copy:
          'We review your processes in depth to find risks, gaps and opportunities before you decide what to change.',
        startLabel: 'Unanswered questions',
        endLabel: 'Clear priorities',
      },
      today: {
        title: 'It is hard to improve what has not been reviewed in depth.',
        signs: [
          'You do not know if your processes are followed as defined.',
          'You suspect there are risks, but not where.',
          'It is unclear where to start improving.',
        ],
      },
      method: {
        title: 'We look closely and tell you what comes next.',
        steps: [
          { title: 'Gather', copy: 'We get to know your processes and listen to your team.' },
          { title: 'Review', copy: 'We compare how you work with how it should be done.' },
          { title: 'Deliver', copy: 'We give you clear findings and priorities to act on.' },
        ],
      },
      services: [
        {
          term: 'BPM Diagnosis',
          short: 'Diagnosis',
          blurb: 'A complete first look',
          title: 'A complete first look at your processes.',
          copy:
            'We review how your processes are handled today to tell you what works, what does not and where to start.',
          receive: 'A clear diagnosis with findings and priorities.',
        },
        {
          term: 'Process Audits',
          short: 'Audits',
          blurb: 'Check what is followed',
          title: 'Check that work is done as it should be.',
          copy:
            'We review whether activities and controls are followed as defined, and where the risks are.',
          receive: 'A report on what is followed, what is not and the risks found.',
        },
        {
          term: 'Maturity Assessment',
          short: 'Maturity',
          blurb: 'Which level you are at',
          title: 'Find out which level your organization is at.',
          copy:
            'We assess how organized and controlled your processes are, to show how far you are from your goal.',
          receive: 'Your current level and the next steps to move up.',
        },
        {
          term: 'GAP Analysis',
          short: 'GAP',
          blurb: 'What you are missing',
          title: 'The gap between where you are and where you want to be.',
          copy:
            'A GAP is the difference between two situations. We compare where you are with where you want to be.',
          receive: 'The list of gaps and an orderly path to close them.',
        },
      ],
      change: {
        title: 'What changes when you have clarity.',
        rows: [
          { before: 'Doubts about risks and controls.', after: 'Clear, documented findings.' },
          { before: 'You do not know where to start.', after: 'You have a route with priorities.' },
          { before: 'You decide by gut feeling.', after: 'You decide with evidence.' },
        ],
      },
    },
  ],
};

const origin = 'https://agsit.com.mx';

const processDetailFamilyPath: Record<SupportedLang, string> = {
  es: '/administracion-de-procesos/',
  en: '/en/process-management/',
};

const processDetailSocialImage: Record<SupportedLang, string> = {
  es: '/assets/social/administracion-procesos-es.jpg',
  en: '/assets/social/process-management-en.jpg',
};

export function getProcessDetailFamilyPath(lang: SupportedLang) {
  return processDetailFamilyPath[lang];
}

export function getProcessDetailPath(lang: SupportedLang, slug: string) {
  return `${processDetailFamilyPath[lang]}${slug}/`;
}

export function getProcessDetailUi(lang: SupportedLang) {
  return processDetailUiByLang[lang];
}

export function getProcessDetailPages(lang: SupportedLang) {
  return processDetailPagesByLang[lang];
}

export function getProcessDetailSlugs(lang: SupportedLang) {
  return processDetailPagesByLang[lang].map((page) => page.slug);
}

/** Ruta de la misma página en el otro idioma (las listas comparten el orden). */
export function getProcessDetailAlternatePath(lang: SupportedLang, slug: string) {
  const otherLang: SupportedLang = lang === 'es' ? 'en' : 'es';
  const index = processDetailPagesByLang[lang].findIndex((page) => page.slug === slug);
  return getProcessDetailPath(otherLang, processDetailPagesByLang[otherLang][index].slug);
}

export function getProcessDetailMetadata(lang: SupportedLang, page: ProcessDetailPageContent) {
  return {
    title: page.metadata.title,
    description: page.metadata.description,
    canonicalUrl: `${origin}${getProcessDetailPath(lang, page.slug)}`,
    image: processDetailSocialImage[lang],
    imageAlt:
      lang === 'es'
        ? `${page.name}: administración de procesos AGSIT.`
        : `${page.name}: AGSIT process management.`,
    htmlLang: lang === 'es' ? 'es-MX' : 'en',
    locale: lang === 'es' ? 'es_MX' : 'en_US',
  };
}

export function getProcessDetailRoutePaths() {
  return (['es', 'en'] as const).flatMap((lang) =>
    processDetailPagesByLang[lang].map((page) => getProcessDetailPath(lang, page.slug)),
  );
}

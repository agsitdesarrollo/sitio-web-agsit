import type { SupportedLang } from '../i18n/ui';
import type { StrategicPlanningDetailContent, StrategicPlanningMedia, StrategicPlanningServiceId } from '../types/strategicPlanningDetail.types';

const media = (name: string, alt: string, placeholder: string, ratio: StrategicPlanningMedia['ratio'] = '4/3'): StrategicPlanningMedia => ({
  src: `/assets/planeacion-estrategica/corporativa/${name}.webp`, alt, placeholder, ratio, pending: true,
});

export const strategicPlanningServiceRoutes: Record<StrategicPlanningServiceId, Record<SupportedLang, string>> = {
  'corporate-strategic-planning': {
    es: '/planeacion-estrategica/planeacion-estrategica-corporativa/',
    en: '/en/strategic-planning/corporate-strategic-planning/',
  },
  'strategic-assessment': {
  "es": "/planeacion-estrategica/diagnostico-estrategico/",
  "en": "/en/strategic-planning/strategic-assessment/"
},
  'corporate-governance': {
  "es": "/planeacion-estrategica/gobierno-corporativo/",
  "en": "/en/strategic-planning/corporate-governance/"
},
  'business-growth': {
  "es": "/planeacion-estrategica/crecimiento-empresarial/",
  "en": "/en/strategic-planning/business-growth/"
},
};

// Published entries only. Future services use this same schema and component family.
// Copy source: AGSIT corporate presentation, section A (services 2 and 4).
// The four working points below are an explanation, not a named AGSIT methodology.
export const strategicPlanningDetailCatalog: Record<StrategicPlanningServiceId, Record<SupportedLang, StrategicPlanningDetailContent>> = {
  'corporate-strategic-planning': {
    es: {
      metadata: {
        title: 'Planeación Estratégica Corporativa | AGSIT',
        description: 'Define la misión, visión, valores y objetivos de tu empresa. En AGSIT los convertimos en un plan estratégico claro que tu equipo puede seguir.',
        canonicalUrl: `https://agsit.com.mx${strategicPlanningServiceRoutes['corporate-strategic-planning'].es}`,
        image: '/assets/social/planeacion-estrategica-es.jpg',
        imageAlt: 'Planeación estratégica AGSIT para crecer con dirección y control.',
        htmlLang: 'es-MX', locale: 'es_MX',
      },
      hero: {
        eyebrow: 'Planeación Estratégica Corporativa', primary: 'Un rumbo claro', secondary: 'para tu empresa',
        copy: 'Definimos contigo para qué existe tu empresa, hacia dónde quieres llevarla y qué acciones necesitan seguir tus equipos.',
        scrollHint: 'Continuar a la siguiente sección', scrollLabel: 'DESLIZA · EXPLORA · DESLIZA · EXPLORA · ',
      },
      narrative: {
        ariaLabel: 'Cuando cada área sigue una prioridad distinta, avanzar se vuelve más difícil. Una dirección compartida ayuda a tu equipo a decidir qué importa y trabajar hacia el mismo objetivo.',
        segments: [{ text: 'Cuando cada área sigue una prioridad distinta, ' }, { accent: 'avanzar' }, { text: ' se vuelve más difícil. Una ' }, { accent: 'dirección compartida' }, { text: ' ayuda a tu equipo a decidir qué importa y trabajar hacia el mismo ' }, { accent: 'objetivo' }, { text: '.' }],
      },
      lifecycle: {
        eyebrow: 'Lo que incluye', title: 'Cinco bases para avanzar con dirección.',
        copy: 'Trabajamos contigo la misión, la visión, los valores, los objetivos estratégicos y el plan estratégico de tu empresa.',
        stages: [
          { label: 'Misión', sublabel: 'El propósito de tu empresa', copy: 'Definimos para qué existe tu empresa, a quién ayuda y qué aporta. Un propósito claro para orientar el trabajo diario.', media: media('mision', 'Equipo conversando sobre el propósito de su empresa.', 'El propósito de la empresa') },
          { label: 'Visión', sublabel: 'El futuro que quieres construir', copy: 'Acordamos hacia dónde quieres llevar tu empresa. Una idea compartida del futuro que quieres construir con tu equipo.', media: media('vision', 'Equipo definiendo el futuro que quiere construir para su empresa.', 'La visión del equipo') },
          { label: 'Valores', sublabel: 'Principios que guían el trabajo', copy: 'Definimos cómo quieres que tu equipo trabaje, trate a las personas y tome decisiones. Te ayudamos a compartir estos principios para que todos los entiendan.', media: media('valores', 'Colaboradores compartiendo los principios que guían su trabajo.', 'Los valores en el trabajo') },
          { label: 'Objetivos estratégicos', sublabel: 'Metas claras para tu equipo', copy: 'Definimos qué quieres lograr a corto, mediano y largo plazo. Así tu equipo entiende dónde concentrar sus esfuerzos y qué avance necesita alcanzar.', media: media('objetivos', 'Equipo acordando metas y prioridades de la empresa.', 'Las metas y prioridades') },
          { label: 'Plan estratégico', sublabel: 'Del rumbo a las acciones', copy: 'Ordenamos las prioridades y definimos qué hacer, cómo y quién participa. Conectamos las acciones con tus objetivos para que tu equipo pueda seguir el plan.', media: media('plan', 'Sesión de trabajo para ordenar acciones y responsabilidades del plan estratégico.', 'El plan de acción') },
        ],
      },
      method: {
        eyebrow: 'Cómo trabajamos contigo', title: 'Damos forma a tu plan.',
        copy: 'Trabajamos contigo estas bases para que el rumbo se entienda y se pueda llevar a la práctica.',
        steps: [
          { title: 'Entender tu empresa', copy: 'Partimos de tu realidad y de lo que quieres lograr.' },
          { title: 'Compartir una dirección', copy: 'Definimos misión, visión y valores que tu equipo entienda.' },
          { title: 'Acordar los objetivos', copy: 'Damos prioridad a las metas de corto, mediano y largo plazo.' },
          { title: 'Concretar las acciones', copy: 'El plan explica qué hacer, cómo y quién participa.' },
        ],
        media: media('sesion-planeacion', 'Sesión de planeación con un equipo revisando objetivos y acciones.', 'Una sesión de planeación', '4/5'),
      },
    },
    en: {
      metadata: {
        title: 'Corporate Strategic Planning | AGSIT',
        description: 'Define your company’s mission, vision, values and goals. At AGSIT we turn them into a clear strategic plan your team can follow.',
        canonicalUrl: `https://agsit.com.mx${strategicPlanningServiceRoutes['corporate-strategic-planning'].en}`,
        image: '/assets/social/planeacion-estrategica-es.jpg',
        imageAlt: 'AGSIT strategic planning for growth with direction and control.',
        htmlLang: 'en', locale: 'en_US',
      },
      hero: {
        eyebrow: 'Corporate Strategic Planning', primary: 'A clear direction', secondary: 'for your business',
        copy: 'Together we define why your company exists, where you want to take it and what actions your teams need to follow.',
        scrollHint: 'Continue to the next section', scrollLabel: 'SCROLL · EXPLORE · SCROLL · EXPLORE · ',
      },
      narrative: {
        ariaLabel: 'When each team follows a different priority, moving forward gets harder. A shared direction helps your team decide what matters and work towards the same goal.',
        segments: [{ text: 'When each team follows a different priority, ' }, { accent: 'moving forward' }, { text: ' gets harder. A ' }, { accent: 'shared direction' }, { text: ' helps your team decide what matters and work towards the same ' }, { accent: 'goal' }, { text: '.' }],
      },
      lifecycle: {
        eyebrow: 'What is included', title: 'Five foundations for moving forward.',
        copy: 'We work with you on your company’s mission, vision, values, strategic goals and strategic plan.',
        stages: [
          { label: 'Mission', sublabel: 'Your company’s purpose', copy: 'We define why your company exists, who it helps and what it contributes. A clear purpose to guide everyday work.', media: media('mision', 'Team discussing their company’s purpose.', 'The company’s purpose') },
          { label: 'Vision', sublabel: 'The future you want to build', copy: 'We agree on where you want to take your company. A shared view of the future you want to build with your team.', media: media('vision', 'Team defining the future they want to build for their company.', 'The team’s vision') },
          { label: 'Values', sublabel: 'Principles that guide work', copy: 'We define how you want your team to work, treat people and make decisions. We help you share these principles so everyone understands them.', media: media('valores', 'Colleagues sharing the principles that guide their work.', 'Values at work') },
          { label: 'Strategic goals', sublabel: 'Clear goals for your team', copy: 'We define what you want to achieve in the short, medium and long term. Your team knows where to focus its efforts and what progress to aim for.', media: media('objetivos', 'Team agreeing on company goals and priorities.', 'Goals and priorities') },
          { label: 'Strategic plan', sublabel: 'From direction to action', copy: 'We set priorities and define what to do, how and who takes part. We connect actions with your goals so your team can follow the plan.', media: media('plan', 'Working session to organise actions and responsibilities in the strategic plan.', 'The action plan') },
        ],
      },
      method: {
        eyebrow: 'How we work with you', title: 'We shape your plan.',
        copy: 'Together we work on these foundations so the direction is understood and can be put into practice.',
        steps: [
          { title: 'Understand your business', copy: 'We start with your current situation and what you want to achieve.' },
          { title: 'Share a direction', copy: 'We define a mission, vision and values your team understands.' },
          { title: 'Agree on the goals', copy: 'We prioritise short, medium and long-term goals.' },
          { title: 'Set out the actions', copy: 'The plan explains what to do, how and who takes part.' },
        ],
        media: media('sesion-planeacion', 'Planning session with a team reviewing goals and actions.', 'A planning session', '4/5'),
      },
    },
  },
  'strategic-assessment': {
  "es": {
    "metadata": {
      "title": "Diagnóstico Estratégico | AGSIT",
      "description": "Conoce qué frena a tu empresa y dónde puede avanzar. En AGSIT revisamos tu negocio contigo para definir prioridades y tomar decisiones con más claridad.",
      "canonicalUrl": "https://agsit.com.mx/planeacion-estrategica/diagnostico-estrategico/",
      "image": "/assets/social/diagnostico-estrategico-es.jpg",
      "imageAlt": "Diagnóstico estratégico AGSIT para entender tu negocio y definir prioridades.",
      "htmlLang": "es-MX",
      "locale": "es_MX"
    },
    "hero": {
      "eyebrow": "Diagnóstico Estratégico",
      "primary": "Entiende tu negocio",
      "secondary": "para decidir mejor",
      "copy": "Identificamos contigo qué funciona, qué frena a tu empresa y qué oportunidades conviene atender primero.",
      "scrollHint": "Continuar a la siguiente sección",
      "scrollLabel": "DESLIZA · EXPLORA · DESLIZA · EXPLORA · "
    },
    "narrative": {
      "ariaLabel": "Cuando los problemas del día a día ocupan toda tu atención, cuesta ver qué necesita cambiar. Una mirada completa de tu empresa ayuda a distinguir las causas y decidir dónde actuar primero.",
      "segments": [
        {
          "text": "Cuando los problemas del día a día ocupan toda tu atención, cuesta ver qué necesita cambiar. Una "
        },
        {
          "accent": "mirada completa"
        },
        {
          "text": " de tu empresa ayuda a distinguir las "
        },
        {
          "accent": "causas"
        },
        {
          "text": " y decidir dónde "
        },
        {
          "accent": "actuar primero"
        },
        {
          "text": "."
        }
      ]
    },
    "lifecycle": {
      "eyebrow": "Lo que incluye",
      "title": "Cinco puntos para entender dónde estás.",
      "copy": "Revisamos tu empresa y su entorno para que tengas una base clara al decidir qué atender y qué aprovechar.",
      "stages": [
        {
          "label": "Situación actual",
          "sublabel": "Una visión del negocio completo",
          "copy": "Revisamos cómo trabaja tu empresa y qué resultados obtiene. Así puedes ver dónde hay avances y dónde se repiten los problemas.",
          "media": {
            "src": "/assets/planeacion-estrategica/diagnostico-estrategico/punto-1.webp",
            "alt": "Equipo revisando la situación actual de su empresa.",
            "placeholder": "La situación del negocio",
            "ratio": "4/3",
            "pending": true
          }
        },
        {
          "label": "Fortalezas",
          "sublabel": "Lo que te ayuda a competir",
          "copy": "Identificamos qué hace bien tu empresa y con qué recursos cuenta. Reconocerlo te ayuda a cuidar lo que funciona y aprovecharlo mejor.",
          "media": {
            "src": "/assets/planeacion-estrategica/diagnostico-estrategico/punto-2.webp",
            "alt": "Equipo conversando sobre las fortalezas de su empresa.",
            "placeholder": "Las fortalezas de la empresa",
            "ratio": "4/3",
            "pending": true
          }
        },
        {
          "label": "Obstáculos",
          "sublabel": "Lo que frena tus resultados",
          "copy": "Revisamos dónde se atora el trabajo y qué le falta al equipo para avanzar. Distinguimos las causas de los problemas que ves todos los días.",
          "media": {
            "src": "/assets/planeacion-estrategica/diagnostico-estrategico/punto-3.webp",
            "alt": "Colaboradores identificando dónde se atora el trabajo.",
            "placeholder": "Los obstáculos del trabajo",
            "ratio": "4/3",
            "pending": true
          }
        },
        {
          "label": "Entorno",
          "sublabel": "Lo que cambia fuera de tu empresa",
          "copy": "Analizamos cambios en clientes, competencia y mercado. Identificamos oportunidades y riesgos que conviene considerar antes de decidir.",
          "media": {
            "src": "/assets/planeacion-estrategica/diagnostico-estrategico/punto-4.webp",
            "alt": "Equipo revisando información sobre clientes y mercado.",
            "placeholder": "El entorno del negocio",
            "ratio": "4/3",
            "pending": true
          }
        },
        {
          "label": "Prioridades",
          "sublabel": "Dónde actuar primero",
          "copy": "Ordenamos los hallazgos según lo que necesita tu negocio. Acordamos qué atender primero y qué decisiones requieren más información.",
          "media": {
            "src": "/assets/planeacion-estrategica/diagnostico-estrategico/punto-5.webp",
            "alt": "Directivos acordando qué asuntos atender primero.",
            "placeholder": "Las prioridades del negocio",
            "ratio": "4/3",
            "pending": true
          }
        }
      ]
    },
    "method": {
      "eyebrow": "Cómo trabajamos contigo",
      "title": "Claridad para tu siguiente decisión.",
      "copy": "Escuchamos tu perspectiva y revisamos la información de tu empresa para acordar dónde concentrar los esfuerzos.",
      "steps": [
        {
          "title": "Escuchar tus inquietudes",
          "copy": "Partimos de lo que te preocupa y de las decisiones que necesitas tomar."
        },
        {
          "title": "Revisar el negocio",
          "copy": "Contrastamos tu visión con la información disponible y la experiencia del equipo."
        },
        {
          "title": "Entender las causas",
          "copy": "Conectamos los hallazgos para explicar qué ayuda y qué frena a tu empresa."
        },
        {
          "title": "Acordar prioridades",
          "copy": "Definimos contigo qué atender primero y qué conviene revisar con más detalle."
        }
      ],
      "media": {
        "src": "/assets/planeacion-estrategica/diagnostico-estrategico/sesion-trabajo.webp",
        "alt": "Sesión de trabajo para revisar hallazgos y prioridades de la empresa.",
        "placeholder": "Una revisión del negocio",
        "ratio": "4/5",
        "pending": true
      }
    }
  },
  "en": {
    "metadata": {
      "title": "Strategic Assessment | AGSIT",
      "description": "Understand what is holding your business back and where it can move forward. AGSIT helps you set priorities and make more informed decisions.",
      "canonicalUrl": "https://agsit.com.mx/en/strategic-planning/strategic-assessment/",
      "image": "/assets/social/strategic-assessment-en.jpg",
      "imageAlt": "AGSIT strategic assessment to understand your business and set priorities.",
      "htmlLang": "en",
      "locale": "en_US"
    },
    "hero": {
      "eyebrow": "Strategic Assessment",
      "primary": "Know your business",
      "secondary": "make better decisions",
      "copy": "We help you see what works, what holds your business back and which opportunities deserve your attention first.",
      "scrollHint": "Continue to the next section",
      "scrollLabel": "SCROLL · EXPLORE · SCROLL · EXPLORE · "
    },
    "narrative": {
      "ariaLabel": "When daily problems demand all your attention, it is hard to see what needs to change. A full view of your business helps you understand the causes and decide where to act first.",
      "segments": [
        {
          "text": "When daily problems demand all your attention, it is hard to see what needs to change. A "
        },
        {
          "accent": "full view"
        },
        {
          "text": " of your business helps you understand the "
        },
        {
          "accent": "causes"
        },
        {
          "text": " and decide where to "
        },
        {
          "accent": "act first"
        },
        {
          "text": "."
        }
      ]
    },
    "lifecycle": {
      "eyebrow": "What is included",
      "title": "Five areas to understand where you stand.",
      "copy": "We review your business and its market so you have a clear basis for deciding what to address and where to find opportunities.",
      "stages": [
        {
          "label": "Current position",
          "sublabel": "A view of the whole business",
          "copy": "We review how your business works and the results it achieves. You can see where you are making progress and where problems keep returning.",
          "media": {
            "src": "/assets/planeacion-estrategica/diagnostico-estrategico/punto-1.webp",
            "alt": "Team reviewing their company’s current position.",
            "placeholder": "The business today",
            "ratio": "4/3",
            "pending": true
          }
        },
        {
          "label": "Strengths",
          "sublabel": "What helps you compete",
          "copy": "We identify what your business does well and the resources it can draw on. This helps you protect what works and make better use of it.",
          "media": {
            "src": "/assets/planeacion-estrategica/diagnostico-estrategico/punto-2.webp",
            "alt": "Team discussing their company’s strengths.",
            "placeholder": "Business strengths",
            "ratio": "4/3",
            "pending": true
          }
        },
        {
          "label": "Obstacles",
          "sublabel": "What holds you back",
          "copy": "We look at where work gets stuck and what your team needs to move forward. We separate the underlying causes from the problems you see every day.",
          "media": {
            "src": "/assets/planeacion-estrategica/diagnostico-estrategico/punto-3.webp",
            "alt": "Colleagues identifying where work gets stuck.",
            "placeholder": "Obstacles at work",
            "ratio": "4/3",
            "pending": true
          }
        },
        {
          "label": "Business environment",
          "sublabel": "What is changing around you",
          "copy": "We examine changes in customers, competitors and the market. We identify opportunities and risks to consider before making a decision.",
          "media": {
            "src": "/assets/planeacion-estrategica/diagnostico-estrategico/punto-4.webp",
            "alt": "Team reviewing information about customers and the market.",
            "placeholder": "The business environment",
            "ratio": "4/3",
            "pending": true
          }
        },
        {
          "label": "Priorities",
          "sublabel": "Where to act first",
          "copy": "We organize the findings around your business needs. Together we decide what to address first and which decisions need more information.",
          "media": {
            "src": "/assets/planeacion-estrategica/diagnostico-estrategico/punto-5.webp",
            "alt": "Business leaders agreeing on which issues to address first.",
            "placeholder": "Business priorities",
            "ratio": "4/3",
            "pending": true
          }
        }
      ]
    },
    "method": {
      "eyebrow": "How we work with you",
      "title": "Clarity for your next decision.",
      "copy": "We listen to your perspective and review your business information to agree on where to focus your efforts.",
      "steps": [
        {
          "title": "Hear your concerns",
          "copy": "We start with what matters to you and the decisions you need to make."
        },
        {
          "title": "Review the business",
          "copy": "We consider your perspective alongside the available information and your team’s experience."
        },
        {
          "title": "Understand the causes",
          "copy": "We connect the findings to explain what helps your business and what holds it back."
        },
        {
          "title": "Agree on priorities",
          "copy": "Together we decide what to address first and what needs a closer look."
        }
      ],
      "media": {
        "src": "/assets/planeacion-estrategica/diagnostico-estrategico/sesion-trabajo.webp",
        "alt": "Working session to review business findings and priorities.",
        "placeholder": "A business review",
        "ratio": "4/5",
        "pending": true
      }
    }
  }
},
  'corporate-governance': {
  "es": {
    "metadata": {
      "title": "Gobierno Corporativo | AGSIT",
      "description": "Define quién decide, quién responde y cómo revisar los avances de tu empresa. En AGSIT te ayudamos a dirigir con responsabilidades y acuerdos claros.",
      "canonicalUrl": "https://agsit.com.mx/planeacion-estrategica/gobierno-corporativo/",
      "image": "/assets/social/gobierno-corporativo-es.jpg",
      "imageAlt": "Gobierno corporativo AGSIT para dirigir con decisiones y responsabilidades claras.",
      "htmlLang": "es-MX",
      "locale": "es_MX"
    },
    "hero": {
      "eyebrow": "Gobierno Corporativo",
      "primary": "Decisiones claras",
      "secondary": "para dirigir mejor",
      "copy": "Definimos contigo quién toma cada decisión, quién responde por los acuerdos y cómo revisar el avance de tu empresa.",
      "scrollHint": "Continuar a la siguiente sección",
      "scrollLabel": "DESLIZA · EXPLORA · DESLIZA · EXPLORA · "
    },
    "narrative": {
      "ariaLabel": "Cuando las decisiones dependen siempre de la misma persona, el trabajo se detiene. Las responsabilidades claras y los acuerdos compartidos ayudan a tu equipo a actuar y a la dirección a mantener el control.",
      "segments": [
        {
          "text": "Cuando las decisiones dependen siempre de la misma persona, el trabajo se detiene. Las "
        },
        {
          "accent": "responsabilidades claras"
        },
        {
          "text": " y los "
        },
        {
          "accent": "acuerdos compartidos"
        },
        {
          "text": " ayudan a tu equipo a actuar y a la dirección a mantener el "
        },
        {
          "accent": "control"
        },
        {
          "text": "."
        }
      ]
    },
    "lifecycle": {
      "eyebrow": "Lo que incluye",
      "title": "Cinco bases para una dirección clara.",
      "copy": "Ordenamos las decisiones, las responsabilidades y la revisión de resultados para que dirigir no dependa de resolver todo personalmente.",
      "stages": [
        {
          "label": "Dirección",
          "sublabel": "Quién decide sobre cada tema",
          "copy": "Aclaramos qué decisiones corresponden a los dueños, a la dirección y a cada responsable. Así los asuntos llegan a quien puede resolverlos.",
          "media": {
            "src": "/assets/planeacion-estrategica/gobierno-corporativo/punto-1.webp",
            "alt": "Dueños y directivos conversando sobre las decisiones de la empresa.",
            "placeholder": "Las decisiones de la empresa",
            "ratio": "4/3",
            "pending": true
          }
        },
        {
          "label": "Responsabilidades",
          "sublabel": "Cada acuerdo tiene un responsable",
          "copy": "Definimos quién responde por cada compromiso y qué puede decidir. El equipo sabe qué se espera de su trabajo y cuándo pedir apoyo.",
          "media": {
            "src": "/assets/planeacion-estrategica/gobierno-corporativo/punto-2.webp",
            "alt": "Equipo revisando sus responsabilidades y compromisos.",
            "placeholder": "Las responsabilidades del equipo",
            "ratio": "4/3",
            "pending": true
          }
        },
        {
          "label": "Acuerdos",
          "sublabel": "Reglas claras para trabajar juntos",
          "copy": "Acordamos cómo presentar propuestas, tomar decisiones y dejar constancia de lo decidido. Esto ayuda a evitar confusiones y asuntos sin resolver.",
          "media": {
            "src": "/assets/planeacion-estrategica/gobierno-corporativo/punto-3.webp",
            "alt": "Participantes dejando por escrito los acuerdos de una reunión.",
            "placeholder": "Los acuerdos de trabajo",
            "ratio": "4/3",
            "pending": true
          }
        },
        {
          "label": "Resultados",
          "sublabel": "Información útil para dirigir",
          "copy": "Definimos qué resultados necesita revisar la dirección. Reunimos la información relevante para ver avances y detectar problemas a tiempo.",
          "media": {
            "src": "/assets/planeacion-estrategica/gobierno-corporativo/punto-4.webp",
            "alt": "Directivos revisando los resultados de la empresa.",
            "placeholder": "Los resultados del negocio",
            "ratio": "4/3",
            "pending": true
          }
        },
        {
          "label": "Seguimiento",
          "sublabel": "Decisiones que llegan a la acción",
          "copy": "Organizamos la revisión de compromisos y resultados. Así puedes saber qué se cumplió, qué requiere apoyo y qué necesita una nueva decisión.",
          "media": {
            "src": "/assets/planeacion-estrategica/gobierno-corporativo/punto-5.webp",
            "alt": "Equipo revisando el avance de los compromisos acordados.",
            "placeholder": "El seguimiento de acuerdos",
            "ratio": "4/3",
            "pending": true
          }
        }
      ]
    },
    "method": {
      "eyebrow": "Cómo trabajamos contigo",
      "title": "Orden para dirigir y dar seguimiento.",
      "copy": "Partimos de cómo se toman hoy las decisiones y acordamos una forma de trabajar que tu equipo pueda sostener.",
      "steps": [
        {
          "title": "Entender cómo decides",
          "copy": "Revisamos quién participa, dónde se atoran los asuntos y qué información falta."
        },
        {
          "title": "Aclarar responsabilidades",
          "copy": "Acordamos quién decide, quién participa y quién responde por cada compromiso."
        },
        {
          "title": "Definir los acuerdos",
          "copy": "Establecemos cómo documentar decisiones y compartir la información necesaria."
        },
        {
          "title": "Organizar la revisión",
          "copy": "Definimos cómo revisar resultados, atender pendientes y ajustar las decisiones."
        }
      ],
      "media": {
        "src": "/assets/planeacion-estrategica/gobierno-corporativo/sesion-trabajo.webp",
        "alt": "Sesión de dirección para acordar responsabilidades y seguimiento.",
        "placeholder": "Una sesión de dirección",
        "ratio": "4/5",
        "pending": true
      }
    }
  },
  "en": {
    "metadata": {
      "title": "Corporate Governance | AGSIT",
      "description": "Clarify who makes decisions, who is accountable and how progress is reviewed. AGSIT helps you lead with clear responsibilities and agreements.",
      "canonicalUrl": "https://agsit.com.mx/en/strategic-planning/corporate-governance/",
      "image": "/assets/social/corporate-governance-en.jpg",
      "imageAlt": "AGSIT corporate governance for clear decisions and responsibilities.",
      "htmlLang": "en",
      "locale": "en_US"
    },
    "hero": {
      "eyebrow": "Corporate Governance",
      "primary": "Clear decisions",
      "secondary": "stronger leadership",
      "copy": "We help you define who makes each decision, who is responsible for carrying it out and how to review your company’s progress.",
      "scrollHint": "Continue to the next section",
      "scrollLabel": "SCROLL · EXPLORE · SCROLL · EXPLORE · "
    },
    "narrative": {
      "ariaLabel": "When every decision depends on one person, work slows down. Clear responsibilities and shared agreements help your team act while giving leadership the oversight it needs.",
      "segments": [
        {
          "text": "When every decision depends on one person, work slows down. "
        },
        {
          "accent": "Clear responsibilities"
        },
        {
          "text": " and "
        },
        {
          "accent": "shared agreements"
        },
        {
          "text": " help your team act while giving leadership the "
        },
        {
          "accent": "oversight"
        },
        {
          "text": " it needs."
        }
      ]
    },
    "lifecycle": {
      "eyebrow": "What is included",
      "title": "Five foundations for clearer leadership.",
      "copy": "We organize decisions, responsibilities and reviews so you can lead without having to handle every issue yourself.",
      "stages": [
        {
          "label": "Leadership roles",
          "sublabel": "Who decides on each issue",
          "copy": "We clarify which decisions belong to owners, senior leaders and individual managers. Issues reach the person who can resolve them.",
          "media": {
            "src": "/assets/planeacion-estrategica/gobierno-corporativo/punto-1.webp",
            "alt": "Owners and senior leaders discussing business decisions.",
            "placeholder": "Business decisions",
            "ratio": "4/3",
            "pending": true
          }
        },
        {
          "label": "Responsibilities",
          "sublabel": "Someone accountable for each commitment",
          "copy": "We define who is responsible for each commitment and what they can decide. Your team knows what is expected and when to ask for support.",
          "media": {
            "src": "/assets/planeacion-estrategica/gobierno-corporativo/punto-2.webp",
            "alt": "Team reviewing their responsibilities and commitments.",
            "placeholder": "Team responsibilities",
            "ratio": "4/3",
            "pending": true
          }
        },
        {
          "label": "Agreements",
          "sublabel": "Clear rules for working together",
          "copy": "We agree on how to bring forward proposals, make decisions and record what was agreed. This helps prevent confusion and unresolved issues.",
          "media": {
            "src": "/assets/planeacion-estrategica/gobierno-corporativo/punto-3.webp",
            "alt": "Participants recording the agreements reached in a meeting.",
            "placeholder": "Working agreements",
            "ratio": "4/3",
            "pending": true
          }
        },
        {
          "label": "Results",
          "sublabel": "Information that supports decisions",
          "copy": "We define which results leadership needs to review. We bring together relevant information to see progress and spot problems early.",
          "media": {
            "src": "/assets/planeacion-estrategica/gobierno-corporativo/punto-4.webp",
            "alt": "Business leaders reviewing company results.",
            "placeholder": "Business results",
            "ratio": "4/3",
            "pending": true
          }
        },
        {
          "label": "Follow-through",
          "sublabel": "Turning decisions into action",
          "copy": "We organize reviews of commitments and results. You can see what has been completed, where support is needed and what calls for a new decision.",
          "media": {
            "src": "/assets/planeacion-estrategica/gobierno-corporativo/punto-5.webp",
            "alt": "Team reviewing progress on agreed commitments.",
            "placeholder": "Following through on agreements",
            "ratio": "4/3",
            "pending": true
          }
        }
      ]
    },
    "method": {
      "eyebrow": "How we work with you",
      "title": "A clearer way to lead and follow through.",
      "copy": "We start with how decisions are made today and agree on a way of working your team can maintain.",
      "steps": [
        {
          "title": "Understand how you decide",
          "copy": "We review who takes part, where issues get stuck and what information is missing."
        },
        {
          "title": "Clarify responsibilities",
          "copy": "We agree on who decides, who contributes and who is accountable for each commitment."
        },
        {
          "title": "Set out the agreements",
          "copy": "We define how to record decisions and share the information people need."
        },
        {
          "title": "Organize reviews",
          "copy": "We agree on how to review results, address outstanding issues and adjust decisions."
        }
      ],
      "media": {
        "src": "/assets/planeacion-estrategica/gobierno-corporativo/sesion-trabajo.webp",
        "alt": "Leadership session to agree on responsibilities and reviews.",
        "placeholder": "A leadership session",
        "ratio": "4/5",
        "pending": true
      }
    }
  }
},
  'business-growth': {
  "es": {
    "metadata": {
      "title": "Crecimiento Empresarial | AGSIT",
      "description": "Evalúa nuevos mercados y oportunidades para hacer crecer tu empresa. En AGSIT te ayudamos a elegir dónde invertir tus esfuerzos y qué necesitas para avanzar.",
      "canonicalUrl": "https://agsit.com.mx/planeacion-estrategica/crecimiento-empresarial/",
      "image": "/assets/social/crecimiento-empresarial-es.jpg",
      "imageAlt": "Crecimiento empresarial AGSIT para elegir oportunidades y preparar tu negocio.",
      "htmlLang": "es-MX",
      "locale": "es_MX"
    },
    "hero": {
      "eyebrow": "Crecimiento Empresarial",
      "primary": "Elige dónde crecer",
      "secondary": "con más claridad",
      "copy": "Evaluamos contigo las oportunidades de tu empresa para decidir dónde crecer y qué necesitas para hacerlo sin perder el control del negocio.",
      "scrollHint": "Continuar a la siguiente sección",
      "scrollLabel": "DESLIZA · EXPLORA · DESLIZA · EXPLORA · "
    },
    "narrative": {
      "ariaLabel": "Tener más oportunidades no siempre hace más fácil decidir. Elegir dónde crecer exige conocer a tus clientes, cuidar la rentabilidad y saber qué puede sostener tu empresa antes de dar el siguiente paso.",
      "segments": [
        {
          "text": "Tener más oportunidades no siempre hace más fácil decidir. Elegir "
        },
        {
          "accent": "dónde crecer"
        },
        {
          "text": " exige conocer a tus clientes, cuidar la "
        },
        {
          "accent": "rentabilidad"
        },
        {
          "text": " y saber qué puede sostener tu empresa antes de "
        },
        {
          "accent": "dar el siguiente paso"
        },
        {
          "text": "."
        }
      ]
    },
    "lifecycle": {
      "eyebrow": "Lo que incluye",
      "title": "Cinco decisiones para orientar tu crecimiento.",
      "copy": "Revisamos las oportunidades, los recursos y la forma en que tu empresa genera ingresos para elegir dónde concentrar el esfuerzo.",
      "stages": [
        {
          "label": "Oportunidades",
          "sublabel": "Dónde vale la pena crecer",
          "copy": "Revisamos opciones para ampliar tu negocio a partir de lo que ya sabes hacer. Distinguimos las oportunidades que encajan con tus objetivos y recursos.",
          "media": {
            "src": "/assets/planeacion-estrategica/crecimiento-empresarial/punto-1.webp",
            "alt": "Equipo evaluando oportunidades para ampliar el negocio.",
            "placeholder": "Las oportunidades del negocio",
            "ratio": "4/3",
            "pending": true
          }
        },
        {
          "label": "Mercados",
          "sublabel": "A qué clientes puedes llegar",
          "copy": "Analizamos qué clientes podrías atender y qué necesitan. Evaluamos nuevos mercados y formas de llegar a ellos con una oferta relevante.",
          "media": {
            "src": "/assets/planeacion-estrategica/crecimiento-empresarial/punto-2.webp",
            "alt": "Equipo revisando las necesidades de posibles clientes.",
            "placeholder": "Los nuevos mercados",
            "ratio": "4/3",
            "pending": true
          }
        },
        {
          "label": "Rentabilidad",
          "sublabel": "Crecer con sentido para el negocio",
          "copy": "Revisamos cómo cada opción puede generar ingresos y qué costos implica. Así puedes valorar el crecimiento más allá de vender más.",
          "media": {
            "src": "/assets/planeacion-estrategica/crecimiento-empresarial/punto-3.webp",
            "alt": "Directivos revisando ingresos y costos de una oportunidad de crecimiento.",
            "placeholder": "Los ingresos y costos",
            "ratio": "4/3",
            "pending": true
          }
        },
        {
          "label": "Capacidad",
          "sublabel": "Lo que necesitas para responder",
          "copy": "Revisamos si tu equipo, tus recursos y tu operación pueden sostener el crecimiento. Identificamos qué necesitas fortalecer antes de ampliar el negocio.",
          "media": {
            "src": "/assets/planeacion-estrategica/crecimiento-empresarial/punto-4.webp",
            "alt": "Equipo revisando los recursos necesarios para crecer.",
            "placeholder": "La capacidad de la empresa",
            "ratio": "4/3",
            "pending": true
          }
        },
        {
          "label": "Plan de crecimiento",
          "sublabel": "Una opción clara para avanzar",
          "copy": "Elegimos contigo las oportunidades prioritarias y ordenamos las acciones. Definimos responsables y qué resultados revisar para decidir si seguir o ajustar.",
          "media": {
            "src": "/assets/planeacion-estrategica/crecimiento-empresarial/punto-5.webp",
            "alt": "Equipo acordando acciones y responsabilidades para crecer.",
            "placeholder": "El plan de crecimiento",
            "ratio": "4/3",
            "pending": true
          }
        }
      ]
    },
    "method": {
      "eyebrow": "Cómo trabajamos contigo",
      "title": "Convertimos oportunidades en decisiones.",
      "copy": "Te ayudamos a comparar opciones y elegir un camino que tenga sentido para tu empresa.",
      "steps": [
        {
          "title": "Entender tu meta",
          "copy": "Aclaramos qué quieres lograr al crecer y qué necesitas cuidar del negocio actual."
        },
        {
          "title": "Comparar oportunidades",
          "copy": "Revisamos clientes, ingresos, costos y recursos necesarios para cada opción."
        },
        {
          "title": "Elegir dónde enfocarte",
          "copy": "Priorizamos contigo las opciones que mejor encajan con tu empresa."
        },
        {
          "title": "Preparar el avance",
          "copy": "Acordamos acciones, responsables y resultados que permitan revisar el crecimiento."
        }
      ],
      "media": {
        "src": "/assets/planeacion-estrategica/crecimiento-empresarial/sesion-trabajo.webp",
        "alt": "Sesión de trabajo para comparar oportunidades y acordar prioridades de crecimiento.",
        "placeholder": "Una sesión de crecimiento",
        "ratio": "4/5",
        "pending": true
      }
    }
  },
  "en": {
    "metadata": {
      "title": "Business Growth | AGSIT",
      "description": "Explore new markets and opportunities to grow your business. AGSIT helps you decide where to focus your resources and what you need to move forward.",
      "canonicalUrl": "https://agsit.com.mx/en/strategic-planning/business-growth/",
      "image": "/assets/social/business-growth-en.jpg",
      "imageAlt": "AGSIT business growth to choose opportunities and prepare your business.",
      "htmlLang": "en",
      "locale": "en_US"
    },
    "hero": {
      "eyebrow": "Business Growth",
      "primary": "Choose where to grow",
      "secondary": "with greater clarity",
      "copy": "We assess opportunities with you so you can decide where to grow and what you need to do it while staying in control of your business.",
      "scrollHint": "Continue to the next section",
      "scrollLabel": "SCROLL · EXPLORE · SCROLL · EXPLORE · "
    },
    "narrative": {
      "ariaLabel": "More opportunities do not always make decisions easier. Choosing where to grow means understanding your customers, protecting profitability and knowing what your business can support before you take the next step.",
      "segments": [
        {
          "text": "More opportunities do not always make decisions easier. Choosing "
        },
        {
          "accent": "where to grow"
        },
        {
          "text": " means understanding your customers, protecting "
        },
        {
          "accent": "profitability"
        },
        {
          "text": " and knowing what your business can support before you "
        },
        {
          "accent": "take the next step"
        },
        {
          "text": "."
        }
      ]
    },
    "lifecycle": {
      "eyebrow": "What is included",
      "title": "Five decisions to guide your growth.",
      "copy": "We review opportunities, resources and how your business earns revenue to help you choose where to focus your efforts.",
      "stages": [
        {
          "label": "Opportunities",
          "sublabel": "Where growth makes sense",
          "copy": "We explore ways to expand your business by building on what you already do well. We identify opportunities that fit your goals and resources.",
          "media": {
            "src": "/assets/planeacion-estrategica/crecimiento-empresarial/punto-1.webp",
            "alt": "Team evaluating opportunities to expand the business.",
            "placeholder": "Business opportunities",
            "ratio": "4/3",
            "pending": true
          }
        },
        {
          "label": "Markets",
          "sublabel": "Which customers you could reach",
          "copy": "We look at the customers you could serve and what they need. We assess new markets and ways to reach them with an offer that matters to them.",
          "media": {
            "src": "/assets/planeacion-estrategica/crecimiento-empresarial/punto-2.webp",
            "alt": "Team reviewing the needs of potential customers.",
            "placeholder": "New markets",
            "ratio": "4/3",
            "pending": true
          }
        },
        {
          "label": "Profitability",
          "sublabel": "Growth that makes business sense",
          "copy": "We review how each option could generate revenue and the costs involved. You can assess growth beyond an increase in sales.",
          "media": {
            "src": "/assets/planeacion-estrategica/crecimiento-empresarial/punto-3.webp",
            "alt": "Business leaders reviewing revenue and costs for a growth opportunity.",
            "placeholder": "Revenue and costs",
            "ratio": "4/3",
            "pending": true
          }
        },
        {
          "label": "Capacity",
          "sublabel": "What you need to deliver",
          "copy": "We review whether your team, resources and operations can support growth. We identify what needs strengthening before you expand.",
          "media": {
            "src": "/assets/planeacion-estrategica/crecimiento-empresarial/punto-4.webp",
            "alt": "Team reviewing the resources needed for growth.",
            "placeholder": "Business capacity",
            "ratio": "4/3",
            "pending": true
          }
        },
        {
          "label": "Growth plan",
          "sublabel": "A clear path forward",
          "copy": "Together we choose the priority opportunities and set out the actions. We agree on responsibilities and the results to review before continuing or adjusting course.",
          "media": {
            "src": "/assets/planeacion-estrategica/crecimiento-empresarial/punto-5.webp",
            "alt": "Team agreeing on actions and responsibilities for growth.",
            "placeholder": "The growth plan",
            "ratio": "4/3",
            "pending": true
          }
        }
      ]
    },
    "method": {
      "eyebrow": "How we work with you",
      "title": "Turn opportunities into decisions.",
      "copy": "We help you compare options and choose a path that makes sense for your business.",
      "steps": [
        {
          "title": "Understand your goal",
          "copy": "We clarify what you want from growth and what you need to protect in your current business."
        },
        {
          "title": "Compare opportunities",
          "copy": "We review the customers, revenue, costs and resources involved in each option."
        },
        {
          "title": "Choose your focus",
          "copy": "Together we prioritize the options that best fit your business."
        },
        {
          "title": "Prepare to move forward",
          "copy": "We agree on actions, responsibilities and results to review as the business grows."
        }
      ],
      "media": {
        "src": "/assets/planeacion-estrategica/crecimiento-empresarial/sesion-trabajo.webp",
        "alt": "Working session to compare opportunities and agree on growth priorities.",
        "placeholder": "A growth planning session",
        "ratio": "4/5",
        "pending": true
      }
    }
  }
},
};

export function getStrategicPlanningDetailContent(id: StrategicPlanningServiceId, lang: SupportedLang) {
  return strategicPlanningDetailCatalog[id][lang];
}

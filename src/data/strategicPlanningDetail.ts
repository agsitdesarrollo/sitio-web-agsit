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
};

export function getStrategicPlanningDetailContent(id: StrategicPlanningServiceId, lang: SupportedLang) {
  return strategicPlanningDetailCatalog[id][lang];
}

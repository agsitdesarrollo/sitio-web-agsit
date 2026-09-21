import type { SupportedLang } from '../i18n/ui';
import type { DigitalStrategyContent } from './digitalStrategy';

export const digitalAdvertisingByLang: Record<SupportedLang, DigitalStrategyContent> = {
  es: {
    metadata: {
      title: 'Publicidad Digital (Google Ads y Social Ads) | AGSIT',
      description: 'Haz que tu negocio llegue a las personas correctas con campañas claras que convierten atención en oportunidades y ventas.',
      canonicalUrl: 'https://agsit.com.mx/marketing-digital/publicidad-digital/',
      image: '/assets/social/publicidad-digital.jpg',
      imageAlt: 'Publicidad Digital de AGSIT para atraer clientes con campañas claras.',
      htmlLang: 'es-MX',
      locale: 'es_MX',
    },
    backLink: 'Volver a Marketing Digital',
    hero: {
      eyebrow: 'Publicidad Digital',
      primary: 'Más clientes',
      secondary: 'a tu alcance.',
      copy: 'Llevamos tu negocio frente a las personas que pueden interesarse, preguntar y comprar.',
      cta: 'Hablemos de tu negocio',
      scrollHint: 'Desliza para continuar',
      scrollLabel: 'DESLIZA · EXPLORA · DESLIZA · EXPLORA · ',
    },
    narrative: {
      ariaLabel: 'Un anuncio solo funciona cuando llega a la persona correcta con un mensaje claro. Diseñamos campañas para abrir conversaciones y convertir interés en clientes.',
      segments: [
        { text: 'Un anuncio solo funciona cuando llega a la persona ' },
        { accent: 'correcta' },
        { text: ' con un mensaje claro. Diseñamos campañas para abrir ' },
        { accent: 'conversaciones' },
        { text: ' y convertir interés en ' },
        { accent: 'clientes' },
        { text: '.' },
      ],
    },
    lifecycle: {
      eyebrow: 'Lo que hacemos para atraer clientes',
      title: 'Cuatro caminos para que tu marca llegue más lejos.',
      copy: 'Elegimos los espacios donde tus próximos clientes ya están buscando, comparando y tomando decisiones.',
      stages: [
        {
          label: 'SEM (Google Ads)',
          sublabel: 'Aparece cuando te necesitan',
          copy: 'Creamos anuncios para que tu negocio aparezca en el momento en que alguien busca una solución como la tuya.',
          image: '/assets/estrategia-digital/etapa-descubrimiento.webp',
          imageAlt: 'Persona usando un teléfono para descubrir opciones',
        },
        {
          label: 'Social Ads',
          sublabel: 'Conecta donde pasan su tiempo',
          copy: 'Llevamos tu mensaje a Facebook, Instagram, LinkedIn y YouTube con anuncios pensados para despertar interés.',
          image: '/assets/estrategia-digital/etapa-consideracion.webp',
          imageAlt: 'Persona revisando contenido en una laptop',
        },
        {
          label: 'Google Shopping',
          sublabel: 'Tus productos a la vista',
          copy: 'Mostramos tus productos con información útil para que las personas comparen, conozcan lo que ofreces y den el siguiente paso.',
          image: '/assets/estrategia-digital/etapa-ascension.webp',
          imageAlt: 'Persona realizando una compra en línea',
        },
        {
          label: 'Remarketing',
          sublabel: 'Vuelve a conectar',
          copy: 'Recordamos tu marca a las personas que ya mostraron interés para ayudarlas a retomar su decisión.',
          image: '/assets/estrategia-digital/etapa-lealtad.webp',
          imageAlt: 'Cliente usando una tableta',
        },
      ],
    },
    method: {
      eyebrow: 'Cómo trabajamos contigo',
      title: 'Tu inversión, con un plan claro.',
      copy: 'Antes de publicar anuncios, entendemos qué quieres lograr y qué necesita escuchar tu cliente.',
      steps: [
        { title: 'Definimos la meta', copy: 'Acordamos si buscas más mensajes, ventas, visitas o personas interesadas en tu negocio.' },
        { title: 'Encontramos a tu público', copy: 'Elegimos a quién conviene mostrarle tu anuncio según lo que ofreces y dónde se informa.' },
        { title: 'Creamos el mensaje', copy: 'Diseñamos anuncios claros que invitan a conocer, preguntar o comprar.' },
        { title: 'Revisamos y mejoramos', copy: 'Vemos qué está dando resultado y ajustamos para que tu inversión aproveche mejor cada oportunidad.' },
      ],
      image: '/assets/estrategia-digital/metodo-diagnostico.webp',
      imageAlt: 'Persona organizando una estrategia de campaña',
    },
    layers: { eyebrow: 'Lo que hay detrás de cada campaña', title: 'Decisiones que acercan a las personas correctas.', copy: 'Cada anuncio se construye para que tu negocio sea claro, relevante y fácil de elegir.', items: [{ title: 'Objetivos claros', copy: 'Cada campaña sabe qué resultado busca.' }, { title: 'Mensajes que conectan', copy: 'Hablamos de lo que le importa a tu cliente.' }, { title: 'Inversión cuidada', copy: 'Priorizamos lo que puede generar oportunidades.' }, { title: 'Mejoras constantes', copy: 'Aprendemos de cada resultado para avanzar.' }] },
    benefits: { eyebrow: 'Lo que obtienes', title: 'Publicidad que abre oportunidades.', copy: 'Tus anuncios trabajan para acercarte a personas con interés real.', items: [{ title: 'Más visibilidad', copy: 'Tu negocio aparece frente a nuevas personas.' }, { title: 'Mejores contactos', copy: 'Llegan personas con mayor intención de conocerte.' }, { title: 'Decisiones claras', copy: 'Sabes qué campañas están aportando.' }, { title: 'Una inversión aprovechada', copy: 'Cada ajuste busca que tu presupuesto rinda más.' }] },
    bridge: { title: 'Tu próximo cliente puede estar buscando hoy.', copy: 'Una campaña bien pensada ayuda a que te encuentre, te conozca y decida hablar contigo.', cta: 'Explora todos los servicios' },
    contact: { eyebrow: 'Hablemos', title: 'Hagamos que más personas conozcan tu negocio.', copy: 'Cuéntanos qué quieres lograr y encontraremos el mejor punto de partida. Sin compromiso.' },
  },
  en: {
    metadata: {
      title: 'Digital Advertising (Google Ads and Social Ads) | AGSIT',
      description: 'Help your business reach the right people with clear campaigns that turn attention into opportunities and sales.',
      canonicalUrl: 'https://agsit.com.mx/en/digital-marketing/digital-advertising/',
      image: '/assets/social/publicidad-digital.jpg',
      imageAlt: 'AGSIT Digital Advertising that attracts customers with clear campaigns.',
      htmlLang: 'en',
      locale: 'en_US',
    },
    backLink: 'Back to Digital Marketing',
    hero: { eyebrow: 'Digital Advertising', primary: 'More customers', secondary: 'within reach.', copy: 'We put your business in front of people who may be ready to learn more, ask questions and buy.', cta: 'Let’s talk about your business', scrollHint: 'Scroll to continue', scrollLabel: 'SCROLL · EXPLORE · SCROLL · EXPLORE · ' },
    narrative: { ariaLabel: 'An ad only works when it reaches the right person with a clear message. We design campaigns that start conversations and turn interest into customers.', segments: [{ text: 'An ad only works when it reaches the ' }, { accent: 'right person' }, { text: ' with a clear message. We design campaigns that start ' }, { accent: 'conversations' }, { text: ' and turn interest into ' }, { accent: 'customers' }, { text: '.' }] },
    lifecycle: {
      eyebrow: 'What we do to attract customers', title: 'Four ways to help your brand reach further.', copy: 'We choose the places where your next customers are already searching, comparing and deciding.', stages: [
        { label: 'SEM (Google Ads)', sublabel: 'Show up when they need you', copy: 'We create ads that help your business appear when someone searches for a solution like yours.', image: '/assets/estrategia-digital/etapa-descubrimiento.webp', imageAlt: 'Person using a phone to discover options' },
        { label: 'Social Ads', sublabel: 'Connect where they spend time', copy: 'We bring your message to Facebook, Instagram, LinkedIn and YouTube with ads designed to spark interest.', image: '/assets/estrategia-digital/etapa-consideracion.webp', imageAlt: 'Person reviewing content on a laptop' },
        { label: 'Google Shopping', sublabel: 'Put your products in view', copy: 'We show your products with useful information so people can compare, learn what you offer and take the next step.', image: '/assets/estrategia-digital/etapa-ascension.webp', imageAlt: 'Person making an online purchase' },
        { label: 'Remarketing', sublabel: 'Reconnect with interest', copy: 'We remind people who already showed interest about your brand and help them return to their decision.', image: '/assets/estrategia-digital/etapa-lealtad.webp', imageAlt: 'Customer using a tablet' },
      ],
    },
    method: { eyebrow: 'How we work with you', title: 'Your investment, guided by a clear plan.', copy: 'Before publishing ads, we understand what you want to achieve and what your customer needs to hear.', steps: [{ title: 'We define the goal', copy: 'We agree on whether you need more messages, sales, visits or interested people.' }, { title: 'We find your audience', copy: 'We choose who should see your ad based on what you offer and where they look for information.' }, { title: 'We create the message', copy: 'We design clear ads that invite people to learn more, ask or buy.' }, { title: 'We review and improve', copy: 'We see what works and refine it so your investment makes better use of every opportunity.' }], image: '/assets/estrategia-digital/metodo-diagnostico.webp', imageAlt: 'Person organizing a campaign strategy' },
    layers: { eyebrow: 'What supports every campaign', title: 'Decisions that bring the right people closer.', copy: 'Every ad is built to make your business clear, relevant and easy to choose.', items: [{ title: 'Clear goals', copy: 'Every campaign knows the result it is pursuing.' }, { title: 'Messages that connect', copy: 'We speak to what matters to your customer.' }, { title: 'Careful spending', copy: 'We prioritize what can create opportunities.' }, { title: 'Ongoing improvements', copy: 'We learn from every result to keep moving forward.' }] },
    benefits: { eyebrow: 'What you get', title: 'Advertising that opens opportunities.', copy: 'Your ads work to bring you people with real interest.', items: [{ title: 'More visibility', copy: 'Your business appears in front of new people.' }, { title: 'Better contacts', copy: 'People with stronger intent get in touch.' }, { title: 'Clear decisions', copy: 'You know which campaigns are contributing.' }, { title: 'Well-used investment', copy: 'Every adjustment helps your budget go further.' }] },
    bridge: { title: 'Your next customer may be looking today.', copy: 'A well-planned campaign helps them find you, get to know you and decide to speak with you.', cta: 'Explore all services' },
    contact: { eyebrow: 'Let’s talk', title: 'Let more people get to know your business.', copy: 'Tell us what you want to achieve and we will find the best place to start. No strings attached.' },
  },
};

export function getDigitalAdvertisingContent(lang: SupportedLang) {
  return digitalAdvertisingByLang[lang];
}

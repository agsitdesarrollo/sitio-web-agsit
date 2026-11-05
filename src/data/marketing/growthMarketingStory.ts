import type { MarketingStoryContent } from '../../types/marketingStory.types';
import type { SupportedLang } from '../../i18n/ui';

// Demo media stays local. Production renders the branded fallback until an owned asset is supplied.
const media = { src: '/_demo-local/hero-1080.mp4', pending: true, duration: 145 / 24 * 8, frameRate: 24, clips: [] as string[] };
const socialImage = '/assets/social/growth-marketing-y-estrategia-digital.jpg';
const es: MarketingStoryContent = {
  lang: 'es',
  metadata: { title: 'Growth Marketing y Estrategia Digital | AGSIT', description: 'Consigue más clientes con una estrategia que conecta tus mensajes, tus canales y el seguimiento. Conoce los servicios de Growth Marketing de AGSIT.', canonicalUrl: 'https://agsit.com.mx/marketing-digital/growth-marketing-y-estrategia-digital/', image: socialImage, imageAlt: 'Rutas luminosas que representan el crecimiento de un negocio con un plan.', htmlLang: 'es-MX', locale: 'es_MX' },
  hero: { label: 'Growth Marketing y Estrategia Digital', title: 'Haz que tu esfuerzo se convierta en clientes.', copy: 'Organizamos tus acciones para llegar a las personas adecuadas, acompañar su interés y facilitar la compra.', chapters: ['Tu negocio se anuncia.', 'Pero no sabe a quién llega.', 'El interés se pierde por el camino.', 'Primero, entendemos a tu cliente.', 'Le damos una razón para elegirte.', 'Cada contacto tiene un siguiente paso.', 'Aprendemos de lo que funciona.', 'Tu negocio avanza con un plan.'], skip: 'Saltar la secuencia', contact: 'Hablemos de tu negocio', explore: 'Explora los servicios', sequence: 'La historia, en ocho momentos', progress: 'Progreso de la secuencia', play: 'Reproducir este capítulo', media, poster: { src: '/_demo-local/hero-poster.webp', alt: 'Primer cuadro del video de Growth Marketing.', width: 1920, height: 1080 } },
  transition: { word: 'AVANZA.' },
  manifesto: { words: ['Atraer.', 'Acompañar.', 'Crecer.'], copy: 'Publicar es solo el comienzo.', from: 'Primer contacto', to: 'Compra', conclusion: 'Lo que ocurre entre ambos también necesita atención.' },
};
const en: MarketingStoryContent = {
  lang: 'en',
  metadata: { title: 'Growth Marketing and Digital Strategy | AGSIT', description: 'Win more customers with a strategy that connects your messages, channels and follow-up. Explore AGSIT’s Growth Marketing services.', canonicalUrl: 'https://agsit.com.mx/en/digital-marketing/growth-marketing-and-digital-strategy/', image: socialImage, imageAlt: 'Luminous paths representing business growth guided by a plan.', htmlLang: 'en', locale: 'en_US' },
  hero: { label: 'Growth Marketing and Digital Strategy', title: 'Turn your effort into customers.', copy: 'We organize your actions to reach the right people, support their interest and make buying easier.', chapters: ['Your business runs ads.', 'But who are they reaching?', 'Interest gets lost along the way.', 'First, we understand your customer.', 'We give them a reason to choose you.', 'Every contact has a next step.', 'We learn from what works.', 'Your business moves forward with a plan.'], skip: 'Skip the sequence', contact: 'Let’s talk about your business', explore: 'Explore the services', sequence: 'The story, in eight moments', progress: 'Sequence progress', play: 'Play this chapter', media, poster: { src: '/_demo-local/hero-poster.webp', alt: 'First frame of the Growth Marketing video.', width: 1920, height: 1080 } },
  transition: { word: 'FORWARD.' },
  manifesto: { words: ['Attract.', 'Support.', 'Grow.'], copy: 'Publishing is only the beginning.', from: 'First contact', to: 'Purchase', conclusion: 'What happens in between needs attention too.' },
};
export const getGrowthMarketingStory = (lang: SupportedLang): MarketingStoryContent => lang === 'en' ? en : es;

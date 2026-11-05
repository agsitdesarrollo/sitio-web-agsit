import type { MarketingStoryContent } from '../../types/marketingStory.types';
import type { SupportedLang } from '../../i18n/ui';

// Demo media stays local. Production renders the branded fallback until an owned asset is supplied.
const media = { src: '/_demo-local/hero-1080.mp4', pending: true, duration: 145 / 24 * 8, frameRate: 24, clips: [] as string[] };
const socialImage = '/assets/social/growth-marketing-y-estrategia-digital.jpg';
const es: MarketingStoryContent = {
  lang: 'es',
  metadata: { title: 'Growth Marketing y Estrategia Digital | AGSIT', description: 'Consigue más clientes con una estrategia que conecta tus mensajes, tus canales y el seguimiento. Conoce los servicios de Growth Marketing de AGSIT.', canonicalUrl: 'https://agsit.com.mx/marketing-digital/growth-marketing-y-estrategia-digital/', image: socialImage, imageAlt: 'Rutas luminosas que representan el crecimiento de un negocio con un plan.', htmlLang: 'es-MX', locale: 'es_MX' },
  hero: { label: 'Growth Marketing y Estrategia Digital', title: 'Haz que tu esfuerzo se convierta en clientes.', copy: 'Organizamos tus acciones para llegar a las personas adecuadas, acompañar su interés y facilitar la compra.', chapters: ['Tu negocio se anuncia.', 'Pero no sabe a quién llega.', 'El interés se pierde por el camino.', 'Primero, entendemos a tu cliente.', 'Le damos una razón para elegirte.', 'Cada contacto tiene un siguiente paso.', 'Aprendemos de lo que funciona.', 'Tu negocio avanza con un plan.'], skip: 'Saltar la secuencia', contact: 'Hablemos de tu negocio', explore: 'Explora los servicios', sequence: 'La historia, en ocho momentos', progress: 'Progreso de la secuencia', play: 'Reproducir este capítulo', media, poster: { src: '/_demo-local/hero-poster.webp', alt: 'Primer cuadro del video de Growth Marketing.', width: 1920, height: 1080 } },
  transition: { word: 'IMPULSA.' },
  services: { label: 'Servicios de Growth Marketing', previous: 'Servicio anterior', next: 'Servicio siguiente', announcement: 'Servicio {n} de 5: {name}', items: [
    { name: 'Estrategia digital', title: 'Decide dónde vale la pena concentrar tu esfuerzo.', copy: 'Revisamos tu negocio y tu mercado para elegir a quién dirigirte, qué ofrecerle y qué acciones conviene priorizar.' },
    { name: 'Recorrido del cliente', title: 'Facilita el paso de conocerte a comprarte.', copy: 'Revisamos qué encuentra una persona en cada contacto con tu negocio y dónde necesita información o ayuda para continuar.' },
    { name: 'Inteligencia artificial', title: 'Entiende mejor a tus clientes y prepara mensajes más útiles.', copy: 'Usamos herramientas de inteligencia artificial para analizar información, adaptar mensajes y apoyar la preparación de contenido.' },
    { name: 'Automatización', title: 'Da seguimiento sin depender de recordar cada pendiente.', copy: 'Organizamos mensajes y recordatorios para que tu equipo sepa cuándo retomar una conversación y pueda dedicar más tiempo a atender.' },
    { name: 'Canales conectados', title: 'Continúa la conversación aunque cambie de canal.', copy: 'Coordinamos redes sociales, sitio web, correo y WhatsApp para que tus clientes encuentren información coherente y atención con continuidad.' },
  ] },
  plan: { phrase: 'CRECER CON PLAN', cue: '[ASÍ LO HACEMOS]', particlesLabel: 'Puntos que se reúnen para presentar nuestros servicios.' },
  manifesto: { eyebrow: 'CÓMO HACEMOS CRECER TU NEGOCIO', words: ['Atraer.', 'Acompañar.', 'Crecer.'], lines: ['Llegamos a las personas que buscan lo que ofreces.', 'Respondemos sus dudas y damos seguimiento.', 'Convertimos el interés en ventas que se repiten.'], figureLabels: ['Puntos que convergen suavemente alrededor de un núcleo.', 'Un punto con su halo avanza por un recorrido.', 'Una corriente de puntos asciende y se vuelve más luminosa.'], from: 'Primer contacto', to: 'Cliente que regresa' },
};
const en: MarketingStoryContent = {
  lang: 'en',
  metadata: { title: 'Growth Marketing and Digital Strategy | AGSIT', description: 'Win more customers with a strategy that connects your messages, channels and follow-up. Explore AGSIT’s Growth Marketing services.', canonicalUrl: 'https://agsit.com.mx/en/digital-marketing/growth-marketing-and-digital-strategy/', image: socialImage, imageAlt: 'Luminous paths representing business growth guided by a plan.', htmlLang: 'en', locale: 'en_US' },
  hero: { label: 'Growth Marketing and Digital Strategy', title: 'Turn your effort into customers.', copy: 'We organize your actions to reach the right people, support their interest and make buying easier.', chapters: ['Your business runs ads.', 'But who are they reaching?', 'Interest gets lost along the way.', 'First, we understand your customer.', 'We give them a reason to choose you.', 'Every contact has a next step.', 'We learn from what works.', 'Your business moves forward with a plan.'], skip: 'Skip the sequence', contact: 'Let’s talk about your business', explore: 'Explore the services', sequence: 'The story, in eight moments', progress: 'Sequence progress', play: 'Play this chapter', media, poster: { src: '/_demo-local/hero-poster.webp', alt: 'First frame of the Growth Marketing video.', width: 1920, height: 1080 } },
  transition: { word: 'BOOST.' },
  services: { label: 'Growth Marketing services', previous: 'Previous service', next: 'Next service', announcement: 'Service {n} of 5: {name}', items: [
    { name: 'Digital strategy', title: 'Decide where your effort matters most.', copy: 'We review your business and market to choose who to reach, what to offer and which actions to prioritize.' },
    { name: 'Customer journey', title: 'Make it easier to go from discovery to purchase.', copy: 'We review what a person finds at every contact with your business and where they need information or support to continue.' },
    { name: 'Artificial intelligence', title: 'Understand your customers and prepare more useful messages.', copy: 'We use artificial intelligence tools to analyze information, adapt messages and help prepare content.' },
    { name: 'Automation', title: 'Follow up without having to remember every task.', copy: 'We organize messages and reminders so your team knows when to return to a conversation and has more time to help.' },
    { name: 'Connected channels', title: 'Keep the conversation going across channels.', copy: 'We coordinate social media, your website, email and WhatsApp so customers find consistent information and continuous support.' },
  ] },
  plan: { phrase: 'GROW WITH A PLAN', cue: '[HOW WE DO IT]', particlesLabel: 'Points gathering to introduce our services.' },
  manifesto: { eyebrow: 'HOW WE GROW YOUR BUSINESS', words: ['Attract.', 'Support.', 'Grow.'], lines: ['We reach people looking for what you offer.', 'We answer their questions and follow up.', 'We turn interest into sales that keep coming.'], figureLabels: ['Points gently converging around a bright core.', 'A point and its halo moving along a path.', 'A stream of points rising and growing brighter.'], from: 'First contact', to: 'Returning customer' },
};
export const getGrowthMarketingStory = (lang: SupportedLang): MarketingStoryContent => lang === 'en' ? en : es;

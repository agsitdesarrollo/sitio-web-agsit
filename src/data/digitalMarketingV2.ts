import type { SupportedLang } from '../i18n/ui';

export type StoryInlineVisual = 'eye' | 'flower' | 'heart' | 'magnifier';

export type StoryTextSegment = {
  text?: string;
  accent?: string;
  visual?: StoryInlineVisual;
};

export type StoryNarrative = {
  ariaLabel: string;
  segments: StoryTextSegment[];
};

export type StoryServiceCard = {
  title: string;
  eyebrow: string;
  copy: string;
  theme: 'cyan' | 'green' | 'blue' | 'paper' | 'warm' | 'sage';
  visual: StoryInlineVisual;
  srcvideo: string;
  cta?: string;
  href?: string;
};

export type DigitalMarketingV2Content = {
  metadata: {
    title: string;
    description: string;
    canonicalUrl: string;
    htmlLang: string;
    locale: string;
  };
  hero: {
    eyebrow: string;
    primary: string;
    secondary: string;
    copy: string;
    cta: string;
  };
  focus: {
    eyebrow: string;
    title: string;
    copy: string;
    hintDesktop: string;
    hintTouch: string;
  };
  narrative: StoryNarrative[];
  transitionTitle: {
    first: string;
    second: string;
  };
  cards: {
    ariaLabel: string;
    items: StoryServiceCard[];
  };
  cta: {
    eyebrow: string;
    title: string;
    copy: string;
  };
};

export const digitalMarketingV2ByLang: Record<SupportedLang, DigitalMarketingV2Content> = {
  es: {
    metadata: {
      title: 'Marketing Digital AGSIT | Estrategia, SEO, SEM y analítica para crecer',
      description:
        'Marketing digital AGSIT: estrategia, SEO, SEM, analítica, social media y e-commerce trabajando como un solo sistema para atraer, convertir y medir resultados.',
      canonicalUrl: 'https://agsit.com.mx/marketing-digital/',
      htmlLang: 'es-MX',
      locale: 'es_MX',
    },
    hero: {
      eyebrow: 'Marketing Digital',
      primary: 'Tu crecimiento digital,',
      secondary: 'diseñado con datos.',
      copy: 'Diseñamos campañas, contenido y analítica que trabajan como un solo sistema para hacer crecer tu negocio.',
      cta: 'Hablemos de tu proyecto',
    },
    focus: {
      eyebrow: 'Visibilidad digital',
      title: 'Tus próximos clientes buscan soluciones.',
      copy: 'Nosotros hacemos que te encuentren.',
      hintDesktop: 'Mueve la lupa',
      hintTouch: 'Arrastra la lupa',
    },
    narrative: [
      {
        ariaLabel:
          'Tu marca no necesita más ruido: necesita una estrategia digital diseñada para atraer a las personas correctas y una experiencia construida para convertir.',
        segments: [
          { text: 'Tu marca no necesita más ruido: necesita una estrategia digital diseñada para ' },
          { accent: 'atraer' },
          { visual: 'magnifier' },
          { text: ' a las personas correctas y una experiencia construida para ' },
          { accent: 'convertir' },
          { text: '.' },
          { visual: 'flower' },
        ],
      },
      {
        ariaLabel:
          'Con contenido relevante, campañas conectadas y datos en tiempo real, AGSIT mide y optimiza cada punto del recorrido, hasta convertir el interés en ventas.',
        segments: [
          { text: 'Con contenido relevante, campañas conectadas y datos en tiempo real, AGSIT ' },
          { accent: 'mide' },
          { text: ' y ' },
          { accent: 'optimiza' },
          { visual: 'heart' },
          { text: ' cada punto del recorrido, hasta convertir el interés en ventas.' },
        ],
      },
    ],
    transitionTitle: {
      first: 'Servicios que',
      second: 'mueven resultados',
    },
    cards: {
      ariaLabel: 'Servicios de marketing digital AGSIT',
      items: [
        {
          title: 'Growth Marketing y Estrategia Digital',
          eyebrow: 'Dirección',
          copy: 'Impulsamos el crecimiento con una estrategia digital alineada a objetivos, audiencias y métricas.',
          theme: 'sage',
          visual: 'flower',
          srcvideo: '/assets/Omnicanalidad.mp4',
          // cta: 'Conoce la estrategia',
          // href: '/marketing-digital/estrategia-digital/',
        },
        {
          title: 'Posicionamiento Orgánico (SEO)',
          eyebrow: 'Visibilidad orgánica',
          copy: 'Mejoramos tu visibilidad orgánica para atraer búsquedas relevantes y tráfico calificado.',
          theme: 'paper',
          visual: 'eye',
          srcvideo: '/assets/SEO%20T%C3%A9cnico.mp4',
        },
        {
          title: 'Publicidad Digital (Google Ads & Social Ads)',
          eyebrow: 'Captación pagada',
          copy: 'Creamos campañas en Google Ads y Social Ads orientadas a alcance, conversión y retorno.',
          theme: 'warm',
          visual: 'heart',
          srcvideo: '/assets/Omnicanalidad.mp4',
        },
        {
          title: 'Content Marketing y Social Media',
          eyebrow: 'Decisión con datos',
          copy: 'Desarrollamos contenido y comunidades que conectan tu marca con su audiencia.',
          theme: 'sage',
          visual: 'flower',
          srcvideo: '/assets/Omnicanalidad.mp4',
        },
        {
          title: 'Diseño y Estrategia de E-commerce',
          eyebrow: 'Relación digital',
          copy: 'Diseñamos experiencias de compra digitales claras, atractivas y enfocadas en conversión.',
          theme: 'paper',
          visual: 'heart',
          srcvideo: '/assets/Omnicanalidad.mp4',
        },
        {
          title: 'Analytics y CRO',
          eyebrow: 'Conversión',
          copy: 'Medimos el comportamiento y optimizamos cada punto para aumentar las conversiones.',
          theme: 'warm',
          visual: 'eye',
          srcvideo: '/assets/Omnicanalidad.mp4',
        },
      ],
    },
    cta: {
      eyebrow: 'Siguiente paso',
      title: '¿Listo para crecer? Hablemos de tu próxima campaña.',
      copy: 'Cuéntanos tus objetivos y un especialista de AGSIT te propondrá un plan de marketing digital con metas y métricas claras.',
    },
  },
  en: {
    metadata: {
      title: 'AGSIT Digital Marketing | Strategy, SEO, SEM and analytics for growth',
      description:
        'AGSIT digital marketing: strategy, SEO, SEM, analytics, social media and e-commerce working as one system to attract, convert and measure results.',
      canonicalUrl: 'https://agsit.com.mx/en/digital-marketing/',
      htmlLang: 'en',
      locale: 'en_US',
    },
    hero: {
      eyebrow: 'Digital Marketing',
      primary: 'Your digital growth,',
      secondary: 'designed with data.',
      copy: 'We design campaigns, content and analytics that work as one system to grow your business.',
      cta: "Let's talk about your project",
    },
    focus: {
      eyebrow: 'Digital visibility',
      title: 'Your next customers are looking for solutions.',
      copy: 'We make sure they find you.',
      hintDesktop: 'Move the magnifying glass',
      hintTouch: 'Drag the magnifying glass',
    },
    narrative: [
      {
        ariaLabel:
          'Your brand does not need more noise: it needs a digital strategy designed to attract the right people and an experience built to convert.',
        segments: [
          { text: 'Your brand doesn’t need more noise: it needs a digital strategy designed to ' },
          { accent: 'attract' },
          { visual: 'magnifier' },
          { text: ' the right people and an experience built to ' },
          { accent: 'convert' },
          { text: '.' },
          { visual: 'flower' },
        ],
      },
      {
        ariaLabel:
          'With relevant content, connected campaigns and real-time data, AGSIT measures and optimizes every step of the journey, turning interest into sales.',
        segments: [
          { text: 'With relevant content, connected campaigns and real-time data, AGSIT ' },
          { accent: 'measures' },
          { text: ' and ' },
          { accent: 'optimizes' },
          { visual: 'heart' },
          { text: ' every step of the journey, turning interest into sales.' },
        ],
      },
    ],
    transitionTitle: {
      first: 'Services that',
      second: 'drive results',
    },
    cards: {
      ariaLabel: 'AGSIT digital marketing services',
      items: [
        {
          title: 'Growth Marketing and Digital Strategy',
          eyebrow: 'Direction',
          copy: 'We drive growth through a digital strategy aligned with goals, audiences, and metrics.',
          theme: 'sage',
          visual: 'flower',
          srcvideo: '/assets/Omnicanalidad.mp4',
          // cta: 'Explore the strategy',
          // href: '/en/digital-marketing/digital-strategy/',
        },
        {
          title: 'Organic Search Positioning (SEO)',
          eyebrow: 'Organic visibility',
          copy: 'We improve organic visibility to capture relevant searches and qualified traffic.',
          theme: 'paper',
          visual: 'eye',
          srcvideo: '/assets/SEO%20T%C3%A9cnico.mp4',
        },
        {
          title: 'Digital Advertising (Google Ads & Social Ads)',
          eyebrow: 'Paid acquisition',
          copy: 'We create Google Ads and Social Ads campaigns focused on reach, conversion, and return.',
          theme: 'warm',
          visual: 'heart',
          srcvideo: '/assets/Omnicanalidad.mp4',
        },
        {
          title: 'Content Marketing and Social Media',
          eyebrow: 'Data decisions',
          copy: 'We create content and communities that connect your brand with its audience.',
          theme: 'sage',
          visual: 'flower',
          srcvideo: '/assets/Omnicanalidad.mp4',
        },
        {
          title: 'E-commerce Design and Strategy',
          eyebrow: 'Digital relationship',
          copy: 'We design clear, engaging digital shopping experiences focused on conversion.',
          theme: 'paper',
          visual: 'heart',
          srcvideo: '/assets/Omnicanalidad.mp4',
        },
        {
          title: 'Analytics and CRO',
          eyebrow: 'Conversion',
          copy: 'We analyze behavior and optimize every touchpoint to increase conversions.',
          theme: 'warm',
          visual: 'eye',
          srcvideo: '/assets/Omnicanalidad.mp4',
        },
      ],
    },
    cta: {
      eyebrow: 'Next step',
      title: 'Ready to grow? Let’s talk about your next campaign.',
      copy: 'Tell us your goals and an AGSIT specialist will propose a digital marketing plan with clear targets and metrics.',
    },
  },
};

export function getDigitalMarketingV2Content(lang: SupportedLang) {
  return digitalMarketingV2ByLang[lang];
}

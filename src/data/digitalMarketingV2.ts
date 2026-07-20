import type { SupportedLang } from '../i18n/ui';

export type StoryInlineVisual = 'eye' | 'flower' | 'heart';

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
      canonicalUrl: 'https://agsit.com.mx/mercadotecnia-digital/',
      htmlLang: 'es-MX',
      locale: 'es_MX',
    },
    hero: {
      eyebrow: 'Marketing Digital AGSIT',
      primary: 'Tu crecimiento digital,',
      secondary: 'diseñado con datos.',
      copy: 'Diseñamos campañas, contenido y analítica que trabajan como un solo sistema para hacer crecer tu negocio.',
      cta: 'Hablemos de tu proyecto',
    },
    narrative: [
      {
        ariaLabel:
          'Tu marca no necesita más ruido: necesita una estrategia digital diseñada para atraer a las personas correctas y una experiencia construida para convertir.',
        segments: [
          { text: 'Tu marca no necesita más ruido: necesita una estrategia digital diseñada para ' },
          { accent: 'atraer' },
          { visual: 'eye' },
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
          title: 'Estrategia Digital',
          eyebrow: 'Dirección',
          copy: 'La hoja de ruta de tu crecimiento: objetivos, audiencias, canales y KPIs alineados a tu negocio.',
          theme: 'cyan',
          visual: 'flower',
          srcvideo: '/assets/Omnicanalidad.mp4',
          cta: 'Conoce la estrategia',
          href: '/mercadotecnia-digital/estrategia-digital/',
        },
        {
          title: 'SEO',
          eyebrow: 'Visibilidad orgánica',
          copy: 'Posiciona tu marca donde tus clientes ya están buscando, con tráfico calificado que crece mes a mes.',
          theme: 'green',
          visual: 'eye',
          srcvideo: '/assets/Omnicanalidad.mp4',
        },
        {
          title: 'SEM',
          eyebrow: 'Captación pagada',
          copy: 'Campañas de pago con segmentación precisa y retorno medible desde el primer clic.',
          theme: 'blue',
          visual: 'heart',
          srcvideo: '/assets/Omnicanalidad.mp4',
        },
        {
          title: 'Analytics',
          eyebrow: 'Decisión con datos',
          copy: 'Tableros claros que convierten datos en decisiones de negocio, sin intuiciones aisladas.',
          theme: 'paper',
          visual: 'flower',
          srcvideo: '/assets/Omnicanalidad.mp4',
        },
        {
          title: 'Social Media',
          eyebrow: 'Relación digital',
          copy: 'Comunidades activas y contenido consistente que construye confianza todos los días.',
          theme: 'warm',
          visual: 'heart',
          srcvideo: '/assets/Omnicanalidad.mp4',
        },
        {
          title: 'E-Commerce',
          eyebrow: 'Conversión',
          copy: 'Menos fricción entre el interés y la compra: tu canal de ventas abierto las 24 horas.',
          theme: 'sage',
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
      eyebrow: 'AGSIT Digital Marketing',
      primary: 'Your digital growth,',
      secondary: 'designed with data.',
      copy: 'We design campaigns, content and analytics that work as one system to grow your business.',
      cta: "Let's talk about your project",
    },
    narrative: [
      {
        ariaLabel:
          'Your brand does not need more noise: it needs a digital strategy designed to attract the right people and an experience built to convert.',
        segments: [
          { text: 'Your brand doesn’t need more noise: it needs a digital strategy designed to ' },
          { accent: 'attract' },
          { visual: 'eye' },
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
          title: 'Digital Strategy',
          eyebrow: 'Direction',
          copy: 'Your growth roadmap: objectives, audiences, channels and KPIs aligned with your business.',
          theme: 'cyan',
          visual: 'flower',
          srcvideo: '/assets/Omnicanalidad.mp4',
          cta: 'Explore the strategy',
          href: '/en/digital-marketing/digital-strategy/',
        },
        {
          title: 'SEO',
          eyebrow: 'Organic visibility',
          copy: 'Position your brand where your customers are already searching, with qualified traffic that grows month after month.',
          theme: 'green',
          visual: 'eye',
          srcvideo: '/assets/Omnicanalidad.mp4',
        },
        {
          title: 'SEM',
          eyebrow: 'Paid acquisition',
          copy: 'Paid campaigns with precise targeting and measurable return from the very first click.',
          theme: 'blue',
          visual: 'heart',
          srcvideo: '/assets/Omnicanalidad.mp4',
        },
        {
          title: 'Analytics',
          eyebrow: 'Data decisions',
          copy: 'Clear dashboards that turn data into business decisions, not isolated guesses.',
          theme: 'paper',
          visual: 'flower',
          srcvideo: '/assets/Omnicanalidad.mp4',
        },
        {
          title: 'Social Media',
          eyebrow: 'Digital relationship',
          copy: 'Active communities and consistent content that builds trust every single day.',
          theme: 'warm',
          visual: 'heart',
          srcvideo: '/assets/Omnicanalidad.mp4',
        },
        {
          title: 'E-Commerce',
          eyebrow: 'Conversion',
          copy: 'Less friction between interest and purchase: your sales channel open around the clock.',
          theme: 'sage',
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

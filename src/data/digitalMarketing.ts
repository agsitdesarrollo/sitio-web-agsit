import type { SupportedLang } from '../i18n/ui';

export type MarketingSceneVisual = 'market' | 'opportunity' | 'noise' | 'control';

export type MarketingKpi = {
  label: string;
  value: string;
};

export type MarketingScene = {
  id: string;
  eyebrow: string;
  title: string;
  copy: string;
  visual: MarketingSceneVisual;
  terms?: string[];
  kpis?: MarketingKpi[];
};

export type MarketingProcessStation = {
  service: string;
  headline: string;
  title: string;
  copy: string;
  metric: string;
  visual: 'seo' | 'sem' | 'analytics' | 'social' | 'ecommerce';
};

export type MarketingCapability = {
  title: string;
  copy: string;
};

export type DigitalMarketingContent = {
  metadata: {
    title: string;
    description: string;
    canonicalUrl: string;
    htmlLang: string;
    locale: string;
  };
  floatingCta: {
    label: string;
  };
  scenes: MarketingScene[];
  process: {
    eyebrow: string;
    title: string;
    copy: string;
    stations: MarketingProcessStation[];
  };
  results: {
    eyebrow: string;
    title: string;
    copy: string;
    metrics: MarketingKpi[];
  };
  capabilities: {
    eyebrow: string;
    title: string;
    copy: string;
    items: MarketingCapability[];
  };
  cta: {
    eyebrow: string;
    title: string;
    copy: string;
  };
};

export const digitalMarketingByLang: Record<SupportedLang, DigitalMarketingContent> = {
  es: {
    metadata: {
      title: 'Marketing Digital AGSIT | Resultados medibles para ventas',
      description:
        'Marketing Digital Integral para convertir oportunidades digitales en resultados medibles con SEO, SEM, analytics, social media y e-commerce.',
      canonicalUrl: 'https://agsit.com.mx/mercadotecnia-digital/',
      htmlLang: 'es-MX',
      locale: 'es_MX',
    },
    floatingCta: {
      label: 'Solicitar asesoría',
    },
    scenes: [
      {
        id: 'mercado-digital',
        eyebrow: 'Mercado digital',
        title: 'Cada búsqueda puede ser una oportunidad.',
        copy: 'Tus clientes potenciales ya están tomando decisiones en canales digitales.',
        visual: 'market',
        terms: ['servicios', 'soluciones', 'proveedor', 'consultoria', 'marketing', 'ventas', 'e-commerce'],
      },
      {
        id: 'oportunidades-ocultas',
        eyebrow: 'Oportunidades ocultas',
        title: 'Las oportunidades ya están ahí.',
        copy: 'El reto es identificarlas, entenderlas y convertirlas en crecimiento.',
        visual: 'opportunity',
        terms: ['intención', 'demanda', 'búsqueda', 'comparación', 'decisión'],
      },
      {
        id: 'sin-estrategia',
        eyebrow: 'Falta de estrategia',
        title: 'No basta con estar presente.',
        copy: 'Sin estrategia, campañas, datos y canales trabajan por separado.',
        visual: 'noise',
        kpis: [
          { value: 'SEO', label: 'aislado' },
          { value: 'SEM', label: 'sin lectura' },
          { value: 'SMM', label: 'sin cadencia' },
        ],
      },
      {
        id: 'control-medicion',
        eyebrow: 'Control y medición',
        title: 'Lo que no se mide, no se puede optimizar.',
        copy: 'Y lo que no se optimiza difícilmente se convierte en ventas.',
        visual: 'control',
        kpis: [
          { value: 'Visibilidad', label: 'alcance calificado' },
          { value: 'Prospectos', label: 'intención comercial' },
          { value: 'Conversion', label: 'accion medible' },
          { value: 'Ventas', label: 'seguimiento' },
        ],
      },
    ],
    process: {
      eyebrow: 'Proceso AGSIT',
      title: '¿Cómo convertimos oportunidades en resultados?',
      copy:
        'Integramos capacidades de marketing digital como un proceso de negocio: encontrar, captar, medir, relacionar y convertir.',
      stations: [
        {
          service: 'SEO',
          headline: 'Te encuentran',
          title: 'Presencia preparada para la búsqueda.',
          copy: 'Optimizamos tu presencia para que tus clientes puedan encontrarte cuando buscan soluciones.',
          metric: 'Búsqueda con intención',
          visual: 'seo',
        },
        {
          service: 'SEM',
          headline: 'Te descubren',
          title: 'Campañas con dirección comercial.',
          copy: 'Activamos campañas orientadas a captar oportunidades con intención comercial.',
          metric: 'Captacion controlada',
          visual: 'sem',
        },
        {
          service: 'Analytics',
          headline: 'Te entienden',
          title: 'Datos convertidos en decisiones.',
          copy: 'Medimos el comportamiento digital para tomar decisiones con información confiable.',
          metric: 'Insights ejecutivos',
          visual: 'analytics',
        },
        {
          service: 'Social Media',
          headline: 'Conectan contigo',
          title: 'Presencia consistente y relacional.',
          copy: 'Creamos presencia digital consistente para fortalecer la relación con tus audiencias.',
          metric: 'Relación sostenida',
          visual: 'social',
        },
        {
          service: 'E-Commerce',
          headline: 'Te compran',
          title: 'Experiencias orientadas a ingreso.',
          copy: 'Diseñamos experiencias digitales orientadas a convertir interés en ingresos.',
          metric: 'Conversion a venta',
          visual: 'ecommerce',
        },
      ],
    },
    results: {
      eyebrow: 'Resultados medibles',
      title: 'Marketing que se puede medir.',
      copy: 'Visibilidad, prospectos, conversión y ventas trabajando bajo una misma estrategia.',
      metrics: [
        { value: 'Miles', label: 'de búsquedas relevantes' },
        { value: 'Cientos', label: 'de oportunidades detectables' },
        { value: 'Decenas', label: 'de decisiones comerciales' },
        { value: 'Una', label: 'estrategia de control' },
      ],
    },
    capabilities: {
      eyebrow: 'Marketing Digital AGSIT',
      title: 'Marketing Digital enfocado en resultados.',
      copy:
        'Diseñamos estrategias integrales para conectar oportunidades de mercado con objetivos comerciales medibles.',
      items: [
        { title: 'Estrategia Digital', copy: 'Objetivos, audiencia, propuesta de valor, canales e indicadores bajo una misma dirección.' },
        { title: 'SEO', copy: 'Arquitectura, contenido y optimización para capturar demanda orgánica calificada.' },
        { title: 'SEM', copy: 'Campañas pagadas con segmentación, medición y aprendizaje comercial.' },
        { title: 'Analytics', copy: 'Tableros e interpretación para decidir con evidencia y no con intuición aislada.' },
        { title: 'Social Media', copy: 'Contenido y relación digital consistente con la posición de marca.' },
        { title: 'E-Commerce', copy: 'Flujos digitales que reducen fricción entre interés, decisión y venta.' },
      ],
    },
    cta: {
      eyebrow: 'Siguiente paso',
      title: 'Hablemos de tus objetivos.',
      copy:
        'Un especialista de AGSIT puede revisar tus necesidades y ayudarte a definir el siguiente paso.',
    },
  },
  en: {
    metadata: {
      title: 'AGSIT Digital Marketing | Measurable sales outcomes',
      description:
        'Integrated Digital Marketing to turn digital opportunities into measurable outcomes through SEO, SEM, analytics, social media and e-commerce.',
      canonicalUrl: 'https://agsit.com.mx/en/digital-marketing/',
      htmlLang: 'en',
      locale: 'en_US',
    },
    floatingCta: {
      label: 'Request consultation',
    },
    scenes: [
      {
        id: 'digital-market',
        eyebrow: 'Digital market',
        title: 'Every search can become an opportunity.',
        copy: 'Your potential customers are already making decisions across digital channels.',
        visual: 'market',
        terms: ['services', 'solutions', 'provider', 'consulting', 'marketing', 'sales', 'e-commerce'],
      },
      {
        id: 'hidden-opportunities',
        eyebrow: 'Hidden opportunities',
        title: 'The opportunities are already there.',
        copy: 'The challenge is identifying them, understanding them and turning them into growth.',
        visual: 'opportunity',
        terms: ['intent', 'demand', 'search', 'comparison', 'decision'],
      },
      {
        id: 'without-strategy',
        eyebrow: 'Lack of strategy',
        title: 'Being present is not enough.',
        copy: 'Without strategy, campaigns, data and channels work separately.',
        visual: 'noise',
        kpis: [
          { value: 'SEO', label: 'isolated' },
          { value: 'SEM', label: 'without reading' },
          { value: 'SMM', label: 'without cadence' },
        ],
      },
      {
        id: 'control-measurement',
        eyebrow: 'Control and measurement',
        title: 'What is not measured cannot be optimized.',
        copy: 'And what is not optimized rarely turns into sales.',
        visual: 'control',
        kpis: [
          { value: 'Visibility', label: 'qualified reach' },
          { value: 'Prospects', label: 'commercial intent' },
          { value: 'Conversion', label: 'measurable action' },
          { value: 'Sales', label: 'follow-up' },
        ],
      },
    ],
    process: {
      eyebrow: 'AGSIT process',
      title: 'How do we turn opportunities into outcomes?',
      copy:
        'We integrate digital marketing capabilities as a business process: find, capture, measure, relate and convert.',
      stations: [
        {
          service: 'SEO',
          headline: 'They find you',
          title: 'Presence prepared for search.',
          copy: 'We optimize your presence so customers can find you when they search for solutions.',
          metric: 'Search with intent',
          visual: 'seo',
        },
        {
          service: 'SEM',
          headline: 'They discover you',
          title: 'Campaigns with commercial direction.',
          copy: 'We activate campaigns designed to capture opportunities with commercial intent.',
          metric: 'Controlled acquisition',
          visual: 'sem',
        },
        {
          service: 'Analytics',
          headline: 'They understand you',
          title: 'Data turned into decisions.',
          copy: 'We measure digital behavior to make decisions with reliable information.',
          metric: 'Executive insights',
          visual: 'analytics',
        },
        {
          service: 'Social Media',
          headline: 'They connect with you',
          title: 'Consistent relational presence.',
          copy: 'We create consistent digital presence to strengthen relationships with your audiences.',
          metric: 'Sustained relationship',
          visual: 'social',
        },
        {
          service: 'E-Commerce',
          headline: 'They buy from you',
          title: 'Experiences oriented to revenue.',
          copy: 'We design digital experiences oriented to turn interest into revenue.',
          metric: 'Sales conversion',
          visual: 'ecommerce',
        },
      ],
    },
    results: {
      eyebrow: 'Measurable outcomes',
      title: 'Marketing you can measure.',
      copy: 'Visibility, prospects, conversion and sales working under one strategy.',
      metrics: [
        { value: 'Thousands', label: 'of relevant searches' },
        { value: 'Hundreds', label: 'of detectable opportunities' },
        { value: 'Dozens', label: 'of commercial decisions' },
        { value: 'One', label: 'control strategy' },
      ],
    },
    capabilities: {
      eyebrow: 'AGSIT Digital Marketing',
      title: 'Digital Marketing focused on outcomes.',
      copy:
        'We design integrated strategies to connect market opportunities with measurable commercial objectives.',
      items: [
        { title: 'Digital Strategy', copy: 'Objectives, audience, value proposition, channels and indicators under one direction.' },
        { title: 'SEO', copy: 'Architecture, content and optimization to capture qualified organic demand.' },
        { title: 'SEM', copy: 'Paid campaigns with segmentation, measurement and commercial learning.' },
        { title: 'Analytics', copy: 'Dashboards and interpretation to decide with evidence instead of isolated intuition.' },
        { title: 'Social Media', copy: 'Content and digital relationship consistent with brand positioning.' },
        { title: 'E-Commerce', copy: 'Digital flows that reduce friction between interest, decision and sale.' },
      ],
    },
    cta: {
      eyebrow: 'Next step',
      title: 'Let us discuss your objectives.',
      copy:
        'An AGSIT specialist can review your needs and help you define the next step.',
    },
  },
};

export function getDigitalMarketingContent(lang: SupportedLang) {
  return digitalMarketingByLang[lang];
}

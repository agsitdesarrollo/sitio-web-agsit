import type { SupportedLang } from '../i18n/ui';

export type StrategySegment = {
  text?: string;
  accent?: string;
};

export type StrategyStage = {
  label: string;
  sublabel: string;
  copy: string;
  image: string;
  imageAlt: string;
};

export type StrategyStep = {
  title: string;
  copy: string;
};

export type StrategyLayer = {
  title: string;
  copy: string;
};

export type StrategyBenefit = {
  title: string;
  copy: string;
};

export type DigitalStrategyContent = {
  metadata: {
    title: string;
    description: string;
    canonicalUrl: string;
    htmlLang: string;
    locale: string;
  };
  backLink: string;
  hero: {
    eyebrow: string;
    primary: string;
    secondary: string;
    copy: string;
    cta: string;
    scrollHint: string;
  };
  narrative: {
    ariaLabel: string;
    segments: StrategySegment[];
  };
  lifecycle: {
    eyebrow: string;
    title: string;
    copy: string;
    stages: StrategyStage[];
  };
  method: {
    eyebrow: string;
    title: string;
    copy: string;
    steps: StrategyStep[];
    image: string;
    imageAlt: string;
  };
  layers: {
    eyebrow: string;
    title: string;
    copy: string;
    items: StrategyLayer[];
  };
  benefits: {
    eyebrow: string;
    title: string;
    copy: string;
    items: StrategyBenefit[];
  };
  bridge: {
    title: string;
    copy: string;
    cta: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    copy: string;
  };
};

export const digitalStrategyByLang: Record<SupportedLang, DigitalStrategyContent> = {
  es: {
    metadata: {
      title: 'Estrategia de Mercadotecnia Digital AGSIT | El plan antes de invertir',
      description:
        'Deja de invertir en publicidad sin rumbo. Diseñamos el plan estratégico que acompaña a tu cliente en cada etapa, del descubrimiento a la lealtad, con métricas para cuidar tu retorno.',
      canonicalUrl: 'https://agsit.com.mx/marketing-digital/estrategia-digital/',
      htmlLang: 'es-MX',
      locale: 'es_MX',
    },
    backLink: 'Volver a Marketing Digital',
    hero: {
      eyebrow: 'Mercadotecnia Digital · Estrategia',
      primary: 'Primero la estrategia,',
      secondary: 'después la inversión.',
      copy:
        '¿Has invertido en publicidad esperando más clientes y las ventas no llegan? No te falta presupuesto: te falta un plan. Diseñamos la ruta que conecta tus objetivos con las personas correctas, en los canales correctos.',
      cta: 'Diseñemos tu estrategia',
      scrollHint: 'Desliza para ver el recorrido',
    },
    narrative: {
      ariaLabel:
        'La publicidad amplifica lo que ya existe: sin dirección, amplifica el gasto. Una estrategia hecha por expertos define a quién atraer, qué decirle y cómo convertir su atención en ventas.',
      segments: [
        { text: 'La publicidad amplifica lo que ya existe: sin ' },
        { accent: 'dirección' },
        { text: ', amplifica el gasto. Una estrategia hecha por expertos define a quién ' },
        { accent: 'atraer' },
        { text: ', qué decirle y cómo convertir su atención en ' },
        { accent: 'ventas' },
        { text: '.' },
      ],
    },
    lifecycle: {
      eyebrow: 'El ciclo de vida de tu cliente',
      title: 'Una estrategia para cada etapa del recorrido.',
      copy:
        'Nadie se convierte en cliente de un solo clic. Por eso diseñamos acciones específicas para cada momento: desde el primer encuentro con tu marca hasta la recompra y la recomendación.',
      stages: [
        {
          label: 'Descubrimiento',
          sublabel: 'Visitantes calificados',
          copy: 'Las personas con mayor probabilidad de comprarte te encuentran donde ya están buscando: buscadores, redes sociales y contenido que les resulta útil.',
          image: '/assets/estrategia-digital/etapa-descubrimiento.webp',
          imageAlt: 'Persona descubriendo contenido en su teléfono',
        },
        {
          label: 'Consideración',
          sublabel: 'Prospectos',
          copy: 'Convertimos visitas en conversaciones: contenido y ofertas que responden lo que tu prospecto necesita resolver antes de decidir.',
          image: '/assets/estrategia-digital/etapa-consideracion.webp',
          imageAlt: 'Persona evaluando opciones frente a su laptop',
        },
        {
          label: 'Selección',
          sublabel: 'Interesados',
          copy: 'Cuando tu cliente compara opciones, tu propuesta destaca: mensajes que muestran con claridad por qué elegirte a ti.',
          image: '/assets/estrategia-digital/etapa-seleccion.webp',
          imageAlt: 'Equipo tomando una decisión frente a una pantalla',
        },
        {
          label: 'Ascensión',
          sublabel: 'Compradores',
          copy: 'La primera compra abre la relación: venta cruzada y ofertas de mayor valor que aumentan lo que cada cliente aporta a tu negocio.',
          image: '/assets/estrategia-digital/etapa-ascension.webp',
          imageAlt: 'Persona completando una compra en línea',
        },
        {
          label: 'Lealtad',
          sublabel: 'Clientes',
          copy: 'Un cliente satisfecho vuelve y te recomienda: comunicación y beneficios que convierten compradores en embajadores de tu marca.',
          image: '/assets/estrategia-digital/etapa-lealtad.webp',
          imageAlt: 'Cliente satisfecho usando su teléfono',
        },
      ],
    },
    method: {
      eyebrow: 'Cómo lo construimos',
      title: 'Del diagnóstico a un roadmap que tu equipo puede ejecutar.',
      copy:
        'Un plan estratégico serio no empieza en el anuncio: empieza en tu negocio. Esto es lo que hacemos antes de invertir un solo peso en medios.',
      steps: [
        {
          title: 'Diagnóstico',
          copy: 'Analizamos las necesidades de tu negocio, el entorno del mercado, tus productos y servicios, y a tus clientes objetivo.',
        },
        {
          title: 'Enfoque',
          copy: 'Elegimos los medios digitales y los segmentos donde tu inversión rinde más, según valor, viabilidad y urgencia.',
        },
        {
          title: 'Roadmap',
          copy: 'Trazamos las estrategias y actividades a seguir, con las métricas e indicadores que validarán la efectividad de cada campaña.',
        },
        {
          title: 'Optimización',
          copy: 'Medimos los resultados y hacemos los ajustes que el mercado va dictando, para sostener el retorno de tu inversión.',
        },
      ],
      image: '/assets/estrategia-digital/metodo-diagnostico.webp',
      imageAlt: 'Sesión de planeación estratégica con notas sobre la mesa',
    },
    layers: {
      eyebrow: 'Las capas de tu estrategia',
      title: 'Más que canales: psicología, datos y creatividad.',
      copy: 'Cada plan integra disciplinas que trabajan juntas para que tu marca conecte con personas reales y venda.',
      items: [
        {
          title: 'Marketing emocional',
          copy: 'Mensajes que conectan con lo que tu cliente siente, no solo con lo que necesita.',
        },
        {
          title: 'Mercadotecnia psicológica',
          copy: 'Principios de decisión y persuasión aplicados a cada punto de contacto.',
        },
        {
          title: 'Estrategia omnicanal',
          copy: 'Una sola conversación con tu cliente, sin importar el canal donde te encuentre.',
        },
        {
          title: 'Personalización y segmentación',
          copy: 'Mensajes a la medida de cada audiencia, en lugar de un anuncio genérico para todos.',
        },
        {
          title: 'Contenido generativo con IA',
          copy: 'Producción asistida por inteligencia artificial, curada por estrategas humanos.',
        },
        {
          title: 'Marketing de influencia',
          copy: 'Voces con credibilidad en tu sector que amplifican tu mensaje.',
        },
      ],
    },
    benefits: {
      eyebrow: 'Lo que obtienes',
      title: 'Resultados que se notan en el negocio, no solo en el reporte.',
      copy: 'Sin promesas infladas: esto es lo que una estrategia bien ejecutada cambia en tu operación.',
      items: [
        {
          title: 'Más clientes potenciales',
          copy: 'Atracción y nutrición constante de prospectos calificados para tu equipo comercial.',
        },
        {
          title: 'Marca más fuerte',
          copy: 'Reconocimiento y reputación que trabajan por ti en cada búsqueda y cada red.',
        },
        {
          title: 'Clientes que regresan',
          copy: 'Fidelización y retención que convierten ventas sueltas en relaciones duraderas.',
        },
        {
          title: 'Nuevos mercados',
          copy: 'Expansión de tu territorio de ventas sin abrir una sola sucursal.',
        },
        {
          title: 'Ventas de mayor valor',
          copy: 'Venta cruzada y ofertas superiores sobre la cartera de clientes que ya tienes.',
        },
        {
          title: 'Inversión bajo control',
          copy: 'Monitoreo en tiempo real de cada campaña y ajustes que cuidan tu retorno.',
        },
      ],
    },
    bridge: {
      title: 'La estrategia es el mapa. Estos son los caminos.',
      copy: 'SEO, SEM, analítica web, redes sociales y e-commerce: cada servicio de AGSIT ejecuta una parte del plan.',
      cta: 'Explora todos los servicios',
    },
    contact: {
      eyebrow: 'Hablemos',
      title: 'Tu próximo cliente ya te está buscando.',
      copy:
        'Cuéntanos tu meta y un especialista de AGSIT analizará tus necesidades para proponerte el punto de partida. Sin compromiso, con dirección.',
    },
  },
  en: {
    metadata: {
      title: 'AGSIT Digital Marketing Strategy | The plan before the spend',
      description:
        'Stop pouring money into aimless advertising. We design the strategic plan that guides your customer through every stage, from discovery to loyalty, with metrics that protect your return.',
      canonicalUrl: 'https://agsit.com.mx/en/digital-marketing/digital-strategy/',
      htmlLang: 'en',
      locale: 'en_US',
    },
    backLink: 'Back to Digital Marketing',
    hero: {
      eyebrow: 'Digital Marketing · Strategy',
      primary: 'Strategy first,',
      secondary: 'spending second.',
      copy:
        'Have you invested in advertising expecting more customers, and sales never came? You are not short on budget — you are short on a plan. We design the route that connects your goals with the right people, on the right channels.',
      cta: 'Design your strategy',
      scrollHint: 'Scroll to see the journey',
    },
    narrative: {
      ariaLabel:
        'Advertising amplifies what already exists: without direction, it amplifies spending. A strategy built by experts defines who to attract, what to say and how to turn attention into sales.',
      segments: [
        { text: 'Advertising amplifies what already exists: without ' },
        { accent: 'direction' },
        { text: ', it amplifies spending. A strategy built by experts defines who to ' },
        { accent: 'attract' },
        { text: ', what to say and how to turn attention into ' },
        { accent: 'sales' },
        { text: '.' },
      ],
    },
    lifecycle: {
      eyebrow: 'Your customer’s life cycle',
      title: 'A strategy for every stage of the journey.',
      copy:
        'Nobody becomes a customer in a single click. That is why we design specific actions for each moment: from the first encounter with your brand to repeat purchases and referrals.',
      stages: [
        {
          label: 'Discovery',
          sublabel: 'Qualified visitors',
          copy: 'The people most likely to buy from you find you where they are already looking: search engines, social media and content they find useful.',
          image: '/assets/estrategia-digital/etapa-descubrimiento.webp',
          imageAlt: 'Person discovering content on their phone',
        },
        {
          label: 'Consideration',
          sublabel: 'Prospects',
          copy: 'We turn visits into conversations: content and offers that answer what your prospect needs to solve before deciding.',
          image: '/assets/estrategia-digital/etapa-consideracion.webp',
          imageAlt: 'Person weighing options at their laptop',
        },
        {
          label: 'Selection',
          sublabel: 'Interested buyers',
          copy: 'When your customer compares options, your offer stands out: messages that make it clear why they should choose you.',
          image: '/assets/estrategia-digital/etapa-seleccion.webp',
          imageAlt: 'Team making a decision in front of a screen',
        },
        {
          label: 'Ascension',
          sublabel: 'Buyers',
          copy: 'The first purchase opens the relationship: cross-selling and higher-value offers that grow what each customer brings to your business.',
          image: '/assets/estrategia-digital/etapa-ascension.webp',
          imageAlt: 'Person completing an online purchase',
        },
        {
          label: 'Loyalty',
          sublabel: 'Customers',
          copy: 'A satisfied customer comes back and recommends you: communication and benefits that turn buyers into ambassadors for your brand.',
          image: '/assets/estrategia-digital/etapa-lealtad.webp',
          imageAlt: 'Happy customer using their phone',
        },
      ],
    },
    method: {
      eyebrow: 'How we build it',
      title: 'From diagnosis to a roadmap your team can execute.',
      copy:
        'A serious strategic plan does not start with the ad — it starts with your business. This is what we do before investing a single peso in media.',
      steps: [
        {
          title: 'Diagnosis',
          copy: 'We analyze your business needs, the market environment, your products and services, and your target customers.',
        },
        {
          title: 'Focus',
          copy: 'We choose the digital channels and segments where your investment performs best, based on value, feasibility and urgency.',
        },
        {
          title: 'Roadmap',
          copy: 'We lay out the strategies and activities to follow, with the metrics and indicators that will validate each campaign.',
        },
        {
          title: 'Optimization',
          copy: 'We measure results and make the adjustments the market dictates, to sustain your return on investment.',
        },
      ],
      image: '/assets/estrategia-digital/metodo-diagnostico.webp',
      imageAlt: 'Strategic planning session with notes on the table',
    },
    layers: {
      eyebrow: 'The layers of your strategy',
      title: 'More than channels: psychology, data and creativity.',
      copy: 'Every plan integrates disciplines that work together so your brand connects with real people — and sells.',
      items: [
        {
          title: 'Emotional marketing',
          copy: 'Messages that connect with what your customer feels, not just what they need.',
        },
        {
          title: 'Psychological marketing',
          copy: 'Decision and persuasion principles applied to every touchpoint.',
        },
        {
          title: 'Omnichannel strategy',
          copy: 'One single conversation with your customer, whichever channel they find you on.',
        },
        {
          title: 'Personalization & segmentation',
          copy: 'Messages tailored to each audience, instead of one generic ad for everyone.',
        },
        {
          title: 'AI-assisted content',
          copy: 'Production assisted by artificial intelligence, curated by human strategists.',
        },
        {
          title: 'Influencer marketing',
          copy: 'Credible voices in your industry that amplify your message.',
        },
      ],
    },
    benefits: {
      eyebrow: 'What you get',
      title: 'Results you notice in the business, not just in the report.',
      copy: 'No inflated promises: this is what a well-executed strategy changes in your operation.',
      items: [
        {
          title: 'More potential customers',
          copy: 'Constant attraction and nurturing of qualified prospects for your sales team.',
        },
        {
          title: 'A stronger brand',
          copy: 'Recognition and reputation working for you on every search and every network.',
        },
        {
          title: 'Customers who return',
          copy: 'Loyalty and retention that turn one-off sales into lasting relationships.',
        },
        {
          title: 'New markets',
          copy: 'Expand your sales territory without opening a single branch.',
        },
        {
          title: 'Higher-value sales',
          copy: 'Cross-selling and premium offers on the customer base you already have.',
        },
        {
          title: 'Investment under control',
          copy: 'Real-time monitoring of every campaign, with adjustments that protect your return.',
        },
      ],
    },
    bridge: {
      title: 'Strategy is the map. These are the roads.',
      copy: 'SEO, SEM, web analytics, social media and e-commerce: each AGSIT service executes one part of the plan.',
      cta: 'Explore all services',
    },
    contact: {
      eyebrow: 'Let’s talk',
      title: 'Your next customer is already looking for you.',
      copy:
        'Tell us your goal and an AGSIT specialist will analyze your needs and propose a starting point. No strings attached — just direction.',
    },
  },
};

export function getDigitalStrategyContent(lang: SupportedLang) {
  return digitalStrategyByLang[lang];
}

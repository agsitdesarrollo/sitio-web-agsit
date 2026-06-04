import type { SupportedLang } from '../i18n/ui';

export type DigitalMarketingMetric = {
  label: string;
  value: string;
};

export type DigitalMarketingStoryColumn = {
  label: string;
  title: string;
  points: string[];
};

export type DigitalMarketingService = {
  code: string;
  title: string;
  copy: string;
};

export type DigitalMarketingStep = {
  label: string;
  title: string;
  copy: string;
};

export type DigitalMarketingLifecycle = {
  stage: string;
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
  hero: {
    eyebrow: string;
    title: string;
    copy: string;
    primaryCta: string;
    secondaryCta: string;
    metrics: DigitalMarketingMetric[];
    signals: string[];
  };
  story: {
    eyebrow: string;
    title: string;
    copy: string;
    columns: DigitalMarketingStoryColumn[];
  };
  services: {
    eyebrow: string;
    title: string;
    copy: string;
    items: DigitalMarketingService[];
  };
  method: {
    title: string;
    copy: string;
    steps: DigitalMarketingStep[];
  };
  lifecycle: {
    eyebrow: string;
    title: string;
    copy: string;
    stages: DigitalMarketingLifecycle[];
  };
  caseStudy: {
    eyebrow: string;
    title: string;
    copy: string;
    beforeTitle: string;
    afterTitle: string;
    before: string[];
    after: string[];
  };
  outcomes: {
    title: string;
    items: string[];
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
      title: 'Mercadotecnia Digital AGSIT | Estrategia, SEO, SEM y analitica',
      description:
        'Mercadotecnia digital para convertir inversion dispersa en crecimiento medible con diagnostico, SEO, SEM, analitica web, social media y e-commerce.',
      canonicalUrl: 'https://agsit.com.mx/mercadotecnia-digital/',
      htmlLang: 'es-MX',
      locale: 'es_MX',
    },
    hero: {
      eyebrow: 'Mercadotecnia Digital',
      title: 'Marketing digital que convierte inversion dispersa en crecimiento medible.',
      copy:
        'Creamos planes de mercadotecnia digital con diagnostico, embudos, SEO, SEM, analitica y contenido para que cada peso invertido tenga direccion, seguimiento y aprendizaje.',
      primaryCta: 'Solicitar diagnostico',
      secondaryCta: 'Ver historia',
      metrics: [
        { label: 'Estrategia', value: 'ADN' },
        { label: 'Canales', value: 'SEO + SEM' },
        { label: 'Gestion', value: 'SMM' },
        { label: 'Control', value: 'ROI' },
      ],
      signals: ['Descubrir', 'Convertir', 'Medir', 'Fidelizar'],
    },
    story: {
      eyebrow: 'Problema resuelto',
      title: 'Una empresa invertia en marketing, pero no sabia que estaba funcionando.',
      copy:
        'El equipo tenia anuncios activos, redes sociales con contenido irregular, formularios sin seguimiento y reportes que no conectaban campanas con oportunidades reales. El problema no era falta de esfuerzo: era falta de sistema.',
      columns: [
        {
          label: 'Antes',
          title: 'Canales aislados',
          points: [
            'Campanas pagadas sin objetivos comparables.',
            'Trafico web que no se convertia en conversaciones comerciales.',
            'Leads capturados sin nutricion ni responsable claro.',
            'Reportes enfocados en actividad, no en decisiones.',
          ],
        },
        {
          label: 'Intervencion AGSIT',
          title: 'Estrategia conectada',
          points: [
            'Diagnostico ADN para entender negocio, mercado y cliente objetivo.',
            'Roadmap por ciclo de vida: descubrimiento, consideracion, seleccion, compra y lealtad.',
            'SEO, SEM, social media y analitica integrados en un mismo tablero.',
            'Indicadores y rituales de ajuste para corregir campanas con evidencia.',
          ],
        },
        {
          label: 'Despues',
          title: 'Decision con datos',
          points: [
            'Priorizacion de canales segun intencion y etapa del cliente.',
            'Contenido y landing pages alineadas a necesidades reales.',
            'Seguimiento comercial mas claro para cada prospecto.',
            'Mejora continua basada en comportamiento, costos y conversion.',
          ],
        },
      ],
    },
    services: {
      eyebrow: 'Ecosistema digital',
      title: 'Estrategia, canales y medicion trabajando como una sola operacion.',
      copy:
        'Tomamos los servicios del plan de mercadotecnia digital y los ordenamos en un sistema que puede ejecutarse, medirse y ajustarse conforme el mercado responde.',
      items: [
        {
          code: 'ADN',
          title: 'Estrategia de mercadotecnia digital',
          copy: 'Deteccion de necesidades, propuesta de valor, ciclo de vida del cliente, marketing emocional, plan tactico e indicadores.',
        },
        {
          code: 'SEO',
          title: 'Posicionamiento organico',
          copy: 'Palabras clave, arquitectura web, sitemap, contenido, experiencia de usuario, SEO mobile, on page y off page.',
        },
        {
          code: 'SEM',
          title: 'Campanas patrocinadas',
          copy: 'Objetivos, segmentacion, medios digitales, embudos, presupuestos, pruebas, links patrocinados y captacion de prospectos.',
        },
        {
          code: 'DATA',
          title: 'Web analytics',
          copy: 'Analitica cuantitativa y cualitativa, perfiles de usuario, fidelizacion, usabilidad, costos y retorno de inversion.',
        },
        {
          code: 'SMM',
          title: 'Social media marketing',
          copy: 'Gestion de contenidos, reputacion en linea, atencion a clientes, automatizacion, storytelling y copywriting.',
        },
        {
          code: 'ECOM',
          title: 'E-commerce y conversion',
          copy: 'Cadena de valor, captacion, medios de pago, plataformas tecnologicas, promociones y fidelizacion comercial.',
        },
      ],
    },
    method: {
      title: 'Del diagnostico al ajuste continuo.',
      copy:
        'No tratamos el marketing como publicaciones sueltas. Lo convertimos en una operacion con hipotesis, canales, responsables, medicion y aprendizaje.',
      steps: [
        { label: '01', title: 'Diagnosticar', copy: 'Levantamos objetivos, mercado, oferta, clientes, canales actuales, costos y puntos de fuga.' },
        { label: '02', title: 'Diseñar', copy: 'Definimos estrategia por etapa del cliente, mensajes, medios, contenido, landing pages e indicadores.' },
        { label: '03', title: 'Activar', copy: 'Implementamos SEO, SEM, social media, contenidos, automatizaciones y captacion de prospectos.' },
        { label: '04', title: 'Medir', copy: 'Conectamos trafico, comportamiento, conversion, costos y calidad del prospecto en reportes utiles.' },
        { label: '05', title: 'Optimizar', copy: 'Ajustamos inversion, anuncios, contenidos y flujos segun evidencia, no por intuicion aislada.' },
      ],
    },
    lifecycle: {
      eyebrow: 'Ciclo de vida del cliente',
      title: 'Cada mensaje debe llegar en la etapa correcta.',
      copy:
        'La estrategia se construye alrededor del recorrido del cliente para no gastar el mismo esfuerzo en visitantes, prospectos, interesados, compradores y clientes recurrentes.',
      stages: [
        { stage: 'Descubrimiento', title: 'Visitantes calificados', copy: 'Contenido, SEO y medios que acercan al publico correcto al primer contacto.' },
        { stage: 'Consideracion', title: 'Prospectos', copy: 'Mensajes, comparativos y activos digitales que responden dudas antes de vender.' },
        { stage: 'Seleccion', title: 'Interesados', copy: 'Landing pages, pruebas A/B y seguimiento para convertir interes en oportunidad.' },
        { stage: 'Ascension', title: 'Compradores', copy: 'Ofertas, cross-selling, up-selling y automatizaciones para elevar valor comercial.' },
        { stage: 'Lealtad', title: 'Clientes', copy: 'Contenido, reputacion, servicio y analitica para sostener relacion y recomendacion.' },
      ],
    },
    caseStudy: {
      eyebrow: 'Caso representativo',
      title: 'De actividad dispersa a una operacion digital con trazabilidad.',
      copy:
        'La historia se presenta como caso anonimo y representativo. No se inventan cifras: se muestra el tipo de problema, la forma de resolverlo y los cambios operativos que una empresa puede esperar.',
      beforeTitle: 'La friccion inicial',
      afterTitle: 'El sistema implementado',
      before: [
        'El presupuesto se repartia entre anuncios, redes y piezas aisladas sin una lectura comun.',
        'El sitio recibia visitas, pero no explicaba con claridad que accion debia tomar cada usuario.',
        'Los prospectos llegaban por distintos canales y se atendian con criterios diferentes.',
      ],
      after: [
        'Cada canal quedo asociado a una etapa del ciclo de vida y a un indicador de decision.',
        'Las landing pages y contenidos se reorganizaron por intencion del usuario y propuesta de valor.',
        'La direccion pudo revisar avance, calidad de prospectos y ajustes necesarios en una misma cadencia.',
      ],
    },
    outcomes: {
      title: 'Resultados que deben verse en la forma de decidir.',
      items: [
        'Inversion digital alineada a objetivos comerciales.',
        'Mejor lectura de que canal atrae, convierte y retiene.',
        'Prospectos con contexto para un seguimiento mas efectivo.',
        'Contenido conectado con necesidades reales del mercado.',
        'Campanas ajustables con indicadores, costos y comportamiento.',
        'Mayor control para escalar lo que funciona y corregir lo que no.',
      ],
    },
    cta: {
      eyebrow: 'Diagnostico de marketing digital',
      title: 'Cuentanos donde se esta dispersando tu inversion digital.',
      copy:
        'Comparte que canales usas hoy, que objetivos buscas y donde pierdes visibilidad. Revisaremos tu caso para definir el siguiente paso de estrategia, medicion y ejecucion.',
    },
  },
  en: {
    metadata: {
      title: 'AGSIT Digital Marketing | Strategy, SEO, SEM and analytics',
      description:
        'Digital marketing to turn scattered investment into measurable growth through diagnosis, SEO, SEM, web analytics, social media and e-commerce.',
      canonicalUrl: 'https://agsit.com.mx/en/digital-marketing/',
      htmlLang: 'en',
      locale: 'en_US',
    },
    hero: {
      eyebrow: 'Digital Marketing',
      title: 'Digital marketing that turns scattered investment into measurable growth.',
      copy:
        'We build digital marketing plans with diagnosis, funnels, SEO, SEM, analytics and content so every invested peso has direction, follow-up and learning.',
      primaryCta: 'Request diagnosis',
      secondaryCta: 'Read the story',
      metrics: [
        { label: 'Strategy', value: 'DNA' },
        { label: 'Channels', value: 'SEO + SEM' },
        { label: 'Management', value: 'SMM' },
        { label: 'Control', value: 'ROI' },
      ],
      signals: ['Discover', 'Convert', 'Measure', 'Retain'],
    },
    story: {
      eyebrow: 'Solved problem',
      title: 'A company was investing in marketing, but did not know what was working.',
      copy:
        'The team had active ads, inconsistent social media content, forms without follow-up and reports that did not connect campaigns with real opportunities. The problem was not lack of effort: it was lack of system.',
      columns: [
        {
          label: 'Before',
          title: 'Isolated channels',
          points: [
            'Paid campaigns without comparable objectives.',
            'Website traffic that did not turn into commercial conversations.',
            'Captured leads without nurturing or clear ownership.',
            'Reports focused on activity instead of decisions.',
          ],
        },
        {
          label: 'AGSIT intervention',
          title: 'Connected strategy',
          points: [
            'Business DNA diagnosis to understand business, market and target customer.',
            'Roadmap by lifecycle: discovery, consideration, selection, purchase and loyalty.',
            'SEO, SEM, social media and analytics integrated into one decision board.',
            'Indicators and adjustment rituals to correct campaigns with evidence.',
          ],
        },
        {
          label: 'After',
          title: 'Data-driven decisions',
          points: [
            'Channel prioritization by intent and customer stage.',
            'Content and landing pages aligned with real needs.',
            'Clearer commercial follow-up for each prospect.',
            'Continuous improvement based on behavior, costs and conversion.',
          ],
        },
      ],
    },
    services: {
      eyebrow: 'Digital ecosystem',
      title: 'Strategy, channels and measurement working as one operation.',
      copy:
        'We organize the digital marketing plan services into a system that can be executed, measured and adjusted as the market responds.',
      items: [
        {
          code: 'DNA',
          title: 'Digital marketing strategy',
          copy: 'Needs detection, value proposition, customer lifecycle, emotional marketing, tactical plan and indicators.',
        },
        {
          code: 'SEO',
          title: 'Organic positioning',
          copy: 'Keywords, web architecture, sitemap, content, user experience, mobile SEO, on page and off page.',
        },
        {
          code: 'SEM',
          title: 'Sponsored campaigns',
          copy: 'Objectives, segmentation, digital media, funnels, budgets, tests, sponsored links and lead capture.',
        },
        {
          code: 'DATA',
          title: 'Web analytics',
          copy: 'Quantitative and qualitative analytics, user profiles, loyalty, usability, costs and return on investment.',
        },
        {
          code: 'SMM',
          title: 'Social media marketing',
          copy: 'Content management, online reputation, customer service, automation, storytelling and copywriting.',
        },
        {
          code: 'ECOM',
          title: 'E-commerce and conversion',
          copy: 'Value chain, acquisition, payment methods, technology platforms, promotions and commercial loyalty.',
        },
      ],
    },
    method: {
      title: 'From diagnosis to continuous adjustment.',
      copy:
        'We do not treat marketing as disconnected posts. We turn it into an operation with hypotheses, channels, owners, measurement and learning.',
      steps: [
        { label: '01', title: 'Diagnose', copy: 'We review objectives, market, offer, customers, current channels, costs and leakage points.' },
        { label: '02', title: 'Design', copy: 'We define strategy by customer stage, messages, media, content, landing pages and indicators.' },
        { label: '03', title: 'Activate', copy: 'We implement SEO, SEM, social media, content, automations and lead capture.' },
        { label: '04', title: 'Measure', copy: 'We connect traffic, behavior, conversion, costs and lead quality in useful reports.' },
        { label: '05', title: 'Optimize', copy: 'We adjust investment, ads, content and flows based on evidence, not isolated intuition.' },
      ],
    },
    lifecycle: {
      eyebrow: 'Customer lifecycle',
      title: 'Every message should arrive at the right stage.',
      copy:
        'The strategy is built around the customer journey so the same effort is not spent on visitors, prospects, interested buyers, customers and recurring clients.',
      stages: [
        { stage: 'Discovery', title: 'Qualified visitors', copy: 'Content, SEO and media that bring the right audience closer to first contact.' },
        { stage: 'Consideration', title: 'Prospects', copy: 'Messages, comparisons and digital assets that answer questions before selling.' },
        { stage: 'Selection', title: 'Interested leads', copy: 'Landing pages, A/B tests and follow-up to turn interest into opportunity.' },
        { stage: 'Ascension', title: 'Buyers', copy: 'Offers, cross-selling, up-selling and automations to increase commercial value.' },
        { stage: 'Loyalty', title: 'Clients', copy: 'Content, reputation, service and analytics to sustain relationship and referrals.' },
      ],
    },
    caseStudy: {
      eyebrow: 'Representative case',
      title: 'From scattered activity to a traceable digital operation.',
      copy:
        'This story is presented as an anonymous representative case. No figures are invented: it shows the type of problem, the way to solve it and the operational changes a company can expect.',
      beforeTitle: 'Initial friction',
      afterTitle: 'Implemented system',
      before: [
        'The budget was split between ads, social media and isolated pieces without a common reading.',
        'The website received visits, but did not clearly explain what action each user should take.',
        'Prospects arrived through different channels and were handled with different criteria.',
      ],
      after: [
        'Each channel was tied to a lifecycle stage and a decision indicator.',
        'Landing pages and content were reorganized by user intent and value proposition.',
        'Leadership could review progress, lead quality and necessary adjustments in one cadence.',
      ],
    },
    outcomes: {
      title: 'Results that should appear in how decisions are made.',
      items: [
        'Digital investment aligned with commercial objectives.',
        'Better reading of which channel attracts, converts and retains.',
        'Prospects with context for more effective follow-up.',
        'Content connected to real market needs.',
        'Campaigns adjustable by indicators, costs and behavior.',
        'More control to scale what works and correct what does not.',
      ],
    },
    cta: {
      eyebrow: 'Digital marketing diagnosis',
      title: 'Tell us where your digital investment is getting scattered.',
      copy:
        'Share which channels you use today, what objectives you are pursuing and where visibility is lost. We will review your case to define the next step in strategy, measurement and execution.',
    },
  },
};

export function getDigitalMarketingContent(lang: SupportedLang) {
  return digitalMarketingByLang[lang];
}

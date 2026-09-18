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
    image: string;
    imageAlt: string;
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
    scrollLabel: string;
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
      title: 'Growth Marketing y Estrategia Digital | AGSIT',
      description:
        'Consigue más clientes con un plan claro. En AGSIT definimos a quién llegar, qué decirle y cómo convertir su interés en ventas para tu negocio.',
      canonicalUrl: 'https://agsit.com.mx/marketing-digital/growth-marketing-y-estrategia-digital/',
      image: '/assets/social/growth-marketing-y-estrategia-digital.jpg',
      imageAlt: 'Rutas luminosas que simbolizan crecimiento con dirección.',
      htmlLang: 'es-MX',
      locale: 'es_MX',
    },
    backLink: 'Volver a Marketing Digital',
    hero: {
      eyebrow: 'Growth Marketing + Estrategia Digital',
      primary: 'Crecimiento',
      secondary: 'con dirección',
      copy:
        'Te ayudamos a conseguir más clientes con un plan claro: a quién buscar, qué decirle y por dónde llegar a él.',
      cta: 'Hablemos de tu negocio',
      scrollHint: 'Desliza para continuar',
      scrollLabel: 'DESLIZA · EXPLORA · DESLIZA · EXPLORA · ',
    },
    narrative: {
      ariaLabel:
        'Anunciarte sin un plan es gastar más para vender lo mismo. Con Growth Marketing sabes a quién buscar, qué decirle y cómo convertir su interés en ventas.',
      segments: [
        { text: 'Anunciarte sin un ' },
        { accent: 'plan' },
        { text: ' es gastar más para vender lo mismo. Con Growth Marketing sabes a quién ' },
        { accent: 'buscar' },
        { text: ', qué decirle y cómo convertir su interés en ' },
        { accent: 'ventas' },
        { text: '.' },
      ],
    },
    lifecycle: {
      eyebrow: 'Lo que incluye Growth Marketing',
      title: 'Cinco formas de hacer crecer tu negocio.',
      copy:
        'Nadie compra en el primer clic. Por eso trabajamos cada momento: desde que alguien te conoce hasta que te compra, vuelve y te recomienda.',
      stages: [
        {
          label: 'Estrategia digital',
          sublabel: 'Un plan claro para crecer',
          copy: 'Definimos contigo a quién quieres llegar, qué decirle y en qué canales invertir. Así cada peso que pones en marketing tiene un propósito y un resultado que puedes ver.',
          image: '/assets/estrategia-digital/etapa-descubrimiento.webp',
          imageAlt: 'Persona descubriendo contenido en su teléfono',
        },
        {
          label: 'Recorrido del cliente',
          sublabel: 'Acompañamos cada paso',
          copy: 'Desde que alguien te descubre hasta que te compra y vuelve, cuidamos cada punto de contacto para que ningún interesado se pierda en el camino.',
          image: '/assets/estrategia-digital/etapa-consideracion.webp',
          imageAlt: 'Persona evaluando opciones frente a su laptop',
        },
        {
          label: 'Inteligencia artificial',
          sublabel: 'Tecnología que trabaja para ti',
          copy: 'Usamos herramientas inteligentes para conocer mejor a tus clientes, personalizar lo que les dices y detectar oportunidades antes que tu competencia.',
          image: '/assets/estrategia-digital/etapa-seleccion.webp',
          imageAlt: 'Equipo tomando una decisión frente a una pantalla',
        },
        {
          label: 'Automatización',
          sublabel: 'Seguimiento puntual, sin esfuerzo extra',
          copy: 'Los mensajes, recordatorios y seguimientos se envían solos y a tiempo. Tu equipo se concentra en cerrar ventas, no en tareas repetitivas.',
          image: '/assets/estrategia-digital/etapa-ascension.webp',
          imageAlt: 'Persona completando una compra en línea',
        },
        {
          label: 'Canales conectados',
          sublabel: 'Una sola conversación con tu cliente',
          copy: 'Redes sociales, correo, sitio web y WhatsApp trabajando juntos. Tu cliente recibe la misma atención sin importar por dónde te contacte.',
          image: '/assets/estrategia-digital/etapa-lealtad.webp',
          imageAlt: 'Cliente satisfecho usando su teléfono',
        },
      ],
    },
    method: {
      eyebrow: 'Cómo trabajamos contigo',
      title: 'Un plan hecho para tu negocio.',
      copy:
        'Antes de invertir en anuncios, entendemos tu negocio. Estos son los pasos que seguimos contigo.',
      steps: [
        {
          title: 'Diagnóstico',
          copy: 'Conocemos tu negocio, tu mercado, lo que vendes y a quién quieres venderle.',
        },
        {
          title: 'Enfoque',
          copy: 'Elegimos dónde conviene invertir primero: los canales y los clientes con más potencial.',
        },
        {
          title: 'Plan de acción',
          copy: 'Definimos qué haremos, cuándo y cómo sabremos si está funcionando.',
        },
        {
          title: 'Mejora continua',
          copy: 'Revisamos los resultados y ajustamos lo que haga falta para que tu inversión rinda más.',
        },
      ],
      image: '/assets/estrategia-digital/metodo-diagnostico.webp',
      imageAlt: 'Sesión de planeación con notas sobre la mesa',
    },
    layers: {
      eyebrow: 'Lo que hay detrás de tu plan',
      title: 'Más que anuncios: personas, datos y creatividad.',
      copy: 'Cada plan combina varias disciplinas para que tu marca conecte con personas reales y venda.',
      items: [
        {
          title: 'Mensajes que conectan',
          copy: 'Hablamos de lo que tu cliente siente y necesita, no solo de lo que vendes.',
        },
        {
          title: 'Decisiones con datos',
          copy: 'Cada ajuste se basa en lo que tus clientes hacen, no en suposiciones.',
        },
        {
          title: 'Todos tus canales juntos',
          copy: 'Una sola conversación con tu cliente, sin importar dónde te encuentre.',
        },
        {
          title: 'Mensajes a la medida',
          copy: 'Cada tipo de cliente recibe lo que le interesa, en lugar de un anuncio genérico.',
        },
        {
          title: 'Contenido con apoyo de inteligencia artificial',
          copy: 'Producimos más rápido, con revisión de personas que conocen tu negocio.',
        },
        {
          title: 'Voces que te recomiendan',
          copy: 'Personas con credibilidad en tu sector que hablan de tu marca.',
        },
      ],
    },
    benefits: {
      eyebrow: 'Lo que obtienes',
      title: 'Resultados que se notan en tu negocio.',
      copy: 'Sin promesas infladas: esto es lo que cambia cuando el plan está bien hecho.',
      items: [
        {
          title: 'Más personas interesadas',
          copy: 'Un flujo constante de posibles clientes listos para hablar con tu equipo de ventas.',
        },
        {
          title: 'Una marca que se reconoce',
          copy: 'Que te encuentren y te recuerden cuando buscan lo que ofreces.',
        },
        {
          title: 'Clientes que regresan',
          copy: 'Ventas sueltas que se convierten en relaciones de largo plazo.',
        },
        {
          title: 'Nuevos mercados',
          copy: 'Vende en más lugares sin abrir una sola sucursal.',
        },
        {
          title: 'Ventas de mayor valor',
          copy: 'Ofrece más a los clientes que ya confían en ti.',
        },
        {
          title: 'Inversión bajo control',
          copy: 'Sabes en qué se gasta cada peso y qué te está dando.',
        },
      ],
    },
    bridge: {
      title: 'El plan es el mapa. Estos son los caminos.',
      copy: 'Posicionamiento en buscadores, anuncios, contenido, redes sociales y tienda en línea: cada servicio de AGSIT ejecuta una parte del plan.',
      cta: 'Explora todos los servicios',
    },
    contact: {
      eyebrow: 'Hablemos',
      title: 'Tu próximo cliente ya te está buscando.',
      copy:
        'Cuéntanos qué quieres lograr y un especialista de AGSIT te propondrá por dónde empezar. Sin compromiso.',
    },
  },
  en: {
    metadata: {
      title: 'Growth Marketing and Digital Strategy | AGSIT',
      description:
        'Win more customers with a clear plan. At AGSIT we define who to reach, what to say and how to turn their interest into sales for your business.',
      canonicalUrl: 'https://agsit.com.mx/en/digital-marketing/growth-marketing-and-digital-strategy/',
      image: '/assets/social/growth-marketing-y-estrategia-digital.jpg',
      imageAlt: 'Luminous paths that represent growth with direction.',
      htmlLang: 'en',
      locale: 'en_US',
    },
    backLink: 'Back to Digital Marketing',
    hero: {
      eyebrow: 'Growth Marketing + Digital Strategy',
      primary: 'Growth',
      secondary: 'with direction',
      copy:
        'We help you win more customers with a clear plan: who to look for, what to say and how to reach them.',
      cta: 'Let’s talk about your business',
      scrollHint: 'Scroll to continue',
      scrollLabel: 'SCROLL · EXPLORE · SCROLL · EXPLORE · ',
    },
    narrative: {
      ariaLabel:
        'Advertising without a plan means spending more to sell the same. With Growth Marketing you know who to look for, what to say and how to turn their interest into sales.',
      segments: [
        { text: 'Advertising without a ' },
        { accent: 'plan' },
        { text: ' means spending more to sell the same. With Growth Marketing you know who to ' },
        { accent: 'look for' },
        { text: ', what to say and how to turn their interest into ' },
        { accent: 'sales' },
        { text: '.' },
      ],
    },
    lifecycle: {
      eyebrow: 'What Growth Marketing includes',
      title: 'Five ways to grow your business.',
      copy:
        'Nobody buys on the first click. That is why we work on every moment: from the day someone discovers you until they buy, come back and recommend you.',
      stages: [
        {
          label: 'Digital strategy',
          sublabel: 'A clear plan to grow',
          copy: 'Together we define who you want to reach, what to tell them and where to invest. Every dollar you put into marketing has a purpose and a result you can see.',
          image: '/assets/estrategia-digital/etapa-descubrimiento.webp',
          imageAlt: 'Person discovering content on their phone',
        },
        {
          label: 'Customer journey',
          sublabel: 'We guide every step',
          copy: 'From the moment someone discovers you until they buy and return, we take care of every touchpoint so no interested person gets lost along the way.',
          image: '/assets/estrategia-digital/etapa-consideracion.webp',
          imageAlt: 'Person weighing options at their laptop',
        },
        {
          label: 'Artificial intelligence',
          sublabel: 'Technology that works for you',
          copy: 'We use smart tools to understand your customers better, personalize what you tell them and spot opportunities before your competitors do.',
          image: '/assets/estrategia-digital/etapa-seleccion.webp',
          imageAlt: 'Team making a decision in front of a screen',
        },
        {
          label: 'Automation',
          sublabel: 'Timely follow-up, no extra effort',
          copy: 'Messages, reminders and follow-ups go out on their own and on time. Your team focuses on closing sales, not on repetitive tasks.',
          image: '/assets/estrategia-digital/etapa-ascension.webp',
          imageAlt: 'Person completing an online purchase',
        },
        {
          label: 'Connected channels',
          sublabel: 'One conversation with your customer',
          copy: 'Social media, email, website and WhatsApp working together. Your customer gets the same attention no matter where they reach you.',
          image: '/assets/estrategia-digital/etapa-lealtad.webp',
          imageAlt: 'Happy customer using their phone',
        },
      ],
    },
    method: {
      eyebrow: 'How we work with you',
      title: 'A plan built for your business.',
      copy:
        'Before spending on ads, we get to know your business. These are the steps we take with you.',
      steps: [
        {
          title: 'Diagnosis',
          copy: 'We get to know your business, your market, what you sell and who you want to sell to.',
        },
        {
          title: 'Focus',
          copy: 'We choose where to invest first: the channels and customers with the most potential.',
        },
        {
          title: 'Action plan',
          copy: 'We define what we will do, when, and how we will know it is working.',
        },
        {
          title: 'Continuous improvement',
          copy: 'We review the results and adjust whatever is needed so your investment pays off more.',
        },
      ],
      image: '/assets/estrategia-digital/metodo-diagnostico.webp',
      imageAlt: 'Planning session with notes on the table',
    },
    layers: {
      eyebrow: 'What is behind your plan',
      title: 'More than ads: people, data and creativity.',
      copy: 'Every plan combines several disciplines so your brand connects with real people and sells.',
      items: [
        {
          title: 'Messages that connect',
          copy: 'We speak to what your customer feels and needs, not only to what you sell.',
        },
        {
          title: 'Decisions based on data',
          copy: 'Every adjustment comes from what your customers actually do, not from guesses.',
        },
        {
          title: 'All your channels together',
          copy: 'One single conversation with your customer, wherever they find you.',
        },
        {
          title: 'Tailored messages',
          copy: 'Each type of customer gets what interests them, instead of one generic ad.',
        },
        {
          title: 'Content with help from artificial intelligence',
          copy: 'We produce faster, with review by people who know your business.',
        },
        {
          title: 'Voices that recommend you',
          copy: 'Credible people in your industry talking about your brand.',
        },
      ],
    },
    benefits: {
      eyebrow: 'What you get',
      title: 'Results you notice in your business.',
      copy: 'No inflated promises: this is what changes when the plan is done right.',
      items: [
        {
          title: 'More interested people',
          copy: 'A steady flow of potential customers ready to talk to your sales team.',
        },
        {
          title: 'A brand people recognize',
          copy: 'Be found and remembered when people look for what you offer.',
        },
        {
          title: 'Customers who come back',
          copy: 'One-off sales that turn into long-term relationships.',
        },
        {
          title: 'New markets',
          copy: 'Sell in more places without opening a single branch.',
        },
        {
          title: 'Higher-value sales',
          copy: 'Offer more to the customers who already trust you.',
        },
        {
          title: 'Spending under control',
          copy: 'You know where every dollar goes and what it brings back.',
        },
      ],
    },
    bridge: {
      title: 'The plan is the map. These are the roads.',
      copy: 'Search rankings, ads, content, social media and online store: each AGSIT service carries out one part of the plan.',
      cta: 'Explore all services',
    },
    contact: {
      eyebrow: 'Let’s talk',
      title: 'Your next customer is already looking for you.',
      copy:
        'Tell us what you want to achieve and an AGSIT specialist will suggest where to start. No strings attached.',
    },
  },
};

export function getDigitalStrategyContent(lang: SupportedLang) {
  return digitalStrategyByLang[lang];
}

import type { SupportedLang } from '../i18n/ui';

export type SoftwareDevelopmentContent = {
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
    titleAccent: string;
    copy: string;
    primaryCta: string;
    pathwaysLabel: string;
    pathways: Array<{
      label: string;
      href: string;
    }>;
    visualAlt: string;
  };
  benefits: {
    eyebrow: string;
    title: string;
    copy: string;
    image: string;
    imageAlt: string;
    items: Array<{
      icon: 'fit' | 'quality' | 'growth' | 'integration';
      title: string;
      copy: string;
    }>;
  };
  journey: {
    eyebrow: string;
    title: string;
    copy: string;
    items: Array<{
      anchor: string;
      eyebrow: string;
      title: string;
      copy: string;
      detail: string;
      image: string;
    }>;
  };
};

export const softwareDevelopmentByLang: Record<SupportedLang, SoftwareDevelopmentContent> = {
  es: {
    metadata: {
      title: 'Desarrollo de Software a la Medida | AGSIT',
      description:
        'Desarrollamos software a la medida, aplicaciones web, apps móviles y sistemas de escritorio con pruebas de calidad para empresas.',
      canonicalUrl: 'https://agsit.com.mx/soluciones-tecnologicas/desarrollo-de-software/',
      htmlLang: 'es-MX',
      locale: 'es_MX',
    },
    hero: {
      eyebrow: 'Desarrollo de software a la medida',
      title: 'Creamos el software',
      titleAccent: 'que tu empresa necesita.',
      copy:
        'Desarrollamos soluciones web, móviles y de escritorio pensadas para resolver necesidades reales de tu operación.',
      primaryCta: 'Hablar con un especialista',
      pathwaysLabel: 'Explorar soluciones de desarrollo',
      pathways: [
        {
          label: 'Soluciones de desarrollo',
          href: '#desarrollo-software-a-la-medida',
        },
        {
          label: 'Calidad de software',
          href: '#testing',
        },
      ],
      visualAlt: 'Animación digital que representa la creación de software para empresas.',
    },
    benefits: {
      eyebrow: 'Beneficios del desarrollo a la medida',
      title: 'Software que trabaja a favor de tu empresa.',
      copy:
        'Obtén una solución que responde a tus procesos, se integra con tus herramientas y puede crecer con tu operación.',
      image: '/assets/desarrollo-software/beneficios.png',
      imageAlt: 'Solución de software adaptable, segura e integrada para una empresa.',
      items: [
        {
          icon: 'fit',
          title: 'Hecho para tu empresa',
          copy: 'Se adapta a tu forma de trabajar y a las necesidades reales de tu equipo.',
        },
        {
          icon: 'quality',
          title: 'Calidad desde el inicio',
          copy: 'Validamos cada avance para reducir errores y entregar una solución confiable.',
        },
        {
          icon: 'growth',
          title: 'Preparado para crecer',
          copy: 'Amplía funciones y capacidades a medida que cambian tus objetivos.',
        },
        {
          icon: 'integration',
          title: 'Integración sin fricción',
          copy: 'Conecta el nuevo software con las herramientas que tu empresa ya utiliza.',
        },
      ],
    },
    journey: {
      eyebrow: 'Desarrollo para cada necesidad',
      title: 'De una idea a una solución lista para trabajar.',
      copy:
        'Construimos la solución adecuada para cada operación, desde sistemas a la medida hasta aplicaciones web, móviles y de escritorio.',
      items: [
        {
          anchor: 'desarrollo-software-a-la-medida',
          eyebrow: '01 · Desarrollo de software a la medida',
          title: 'Convierte tu forma de trabajar en una solución propia.',
          copy:
            'Diseñamos software alrededor de tus procesos, necesidades y objetivos para que tu equipo trabaje con mayor claridad y control.',
          detail: 'Análisis · diseño · desarrollo · integración',
          image: '/assets/desarrollo-software/software-a-la-medida.png',
        },
        {
          anchor: 'desarrollo-web',
          eyebrow: '02 · Desarrollo web',
          title: 'Lleva tus procesos a una experiencia web clara y accesible.',
          copy:
            'Creamos plataformas y sistemas web fáciles de usar, preparados para acompañar la operación diaria de tu empresa.',
          detail: 'Plataformas web · portales · sistemas · integraciones',
          image: '/assets/desarrollo-software/desarrollo-web.png',
        },
        {
          anchor: 'apps-moviles',
          eyebrow: '03 · Apps móviles',
          title: 'Pon las funciones clave de tu empresa al alcance de tu equipo.',
          copy:
            'Desarrollamos aplicaciones móviles intuitivas para consultar información, atender tareas y mantener la operación en movimiento.',
          detail: 'iOS · Android · experiencia móvil · información actualizada',
          image: '/assets/desarrollo-software/apps-moviles.png',
        },
        {
          anchor: 'aplicaciones-escritorio',
          eyebrow: '04 · Aplicaciones de escritorio',
          title: 'Fortalece tu operación con aplicaciones robustas.',
          copy:
            'Construimos herramientas de escritorio eficientes para organizar procesos internos y trabajar con seguridad desde cada equipo.',
          detail: 'Procesos internos · rendimiento · seguridad · integración',
          image: '/assets/desarrollo-software/aplicaciones-escritorio.png',
        },
        {
          anchor: 'testing',
          eyebrow: '05 · Testing',
          title: 'Entrega software confiable desde el primer lanzamiento.',
          copy:
            'Probamos funciones, conexiones y recorridos antes de cada entrega para detectar errores y proteger la experiencia de tus usuarios.',
          detail: 'Pruebas funcionales · integración · regresión · calidad',
          image: '/assets/desarrollo-software/testing.png',
        },
      ],
    },
  },
  en: {
    metadata: {
      title: 'Custom Software Development | AGSIT',
      description:
        'We develop custom software, web applications, mobile apps and desktop systems with quality testing for businesses.',
      canonicalUrl: 'https://agsit.com.mx/en/technology-solutions/software-development/',
      htmlLang: 'en',
      locale: 'en_US',
    },
    hero: {
      eyebrow: 'Custom software development',
      title: 'We create the software',
      titleAccent: 'your business needs.',
      copy:
        'We develop web, mobile and desktop solutions built to solve real needs across your operation.',
      primaryCta: 'Talk to a specialist',
      pathwaysLabel: 'Explore development solutions',
      pathways: [
        {
          label: 'Development solutions',
          href: '#custom-software-development',
        },
        {
          label: 'Software quality',
          href: '#testing',
        },
      ],
      visualAlt: 'Digital animation representing software creation for businesses.',
    },
    benefits: {
      eyebrow: 'Benefits of custom development',
      title: 'Software that works for your business.',
      copy:
        'Get a solution that fits your processes, connects with your tools and grows with your operation.',
      image: '/assets/desarrollo-software/beneficios.png',
      imageAlt: 'Adaptable, secure and integrated software solution for a business.',
      items: [
        {
          icon: 'fit',
          title: 'Built for your business',
          copy: 'It fits the way your team works and the real needs of your operation.',
        },
        {
          icon: 'quality',
          title: 'Quality from the start',
          copy: 'We validate every step to reduce errors and deliver a reliable solution.',
        },
        {
          icon: 'growth',
          title: 'Ready to grow',
          copy: 'Add functions and capabilities as your goals and operation change.',
        },
        {
          icon: 'integration',
          title: 'Seamless integration',
          copy: 'Connect new software with the tools your business already uses.',
        },
      ],
    },
    journey: {
      eyebrow: 'Development for every need',
      title: 'From an idea to a solution ready to work.',
      copy:
        'We build the right solution for each operation, from custom systems to web, mobile and desktop applications.',
      items: [
        {
          anchor: 'custom-software-development',
          eyebrow: '01 · Custom software development',
          title: 'Turn the way you work into a solution of your own.',
          copy:
            'We design software around your processes, needs and goals so your team can work with greater clarity and control.',
          detail: 'Analysis · design · development · integration',
          image: '/assets/desarrollo-software/software-a-la-medida.png',
        },
        {
          anchor: 'web-development',
          eyebrow: '02 · Web development',
          title: 'Bring your processes into a clear, accessible web experience.',
          copy:
            'We create easy-to-use web platforms and systems built to support your company’s daily operation.',
          detail: 'Web platforms · portals · systems · integrations',
          image: '/assets/desarrollo-software/desarrollo-web.png',
        },
        {
          anchor: 'mobile-apps',
          eyebrow: '03 · Mobile apps',
          title: 'Put key business functions within your team’s reach.',
          copy:
            'We develop intuitive mobile apps to check information, handle tasks and keep the operation moving.',
          detail: 'iOS · Android · mobile experience · updated information',
          image: '/assets/desarrollo-software/apps-moviles.png',
        },
        {
          anchor: 'desktop-applications',
          eyebrow: '04 · Desktop applications',
          title: 'Strengthen your operation with robust applications.',
          copy:
            'We build efficient desktop tools to organize internal processes and work securely from every computer.',
          detail: 'Internal processes · performance · security · integration',
          image: '/assets/desarrollo-software/aplicaciones-escritorio.png',
        },
        {
          anchor: 'testing',
          eyebrow: '05 · Testing',
          title: 'Release reliable software from day one.',
          copy:
            'We test functions, connections and user journeys before every release to detect errors and protect the user experience.',
          detail: 'Functional tests · integration · regression · quality',
          image: '/assets/desarrollo-software/testing.png',
        },
      ],
    },
  },
};

export function getSoftwareDevelopmentContent(lang: SupportedLang) {
  return softwareDevelopmentByLang[lang];
}

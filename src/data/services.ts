import type { SupportedLang } from '../i18n/ui';

export type ServiceItem = {
  title: string;
  href?: string;
};

export type ServicePoint = {
  icon: 'layers' | 'team' | 'trend' | 'root';
  title: string;
  description: string;
  mobileTitle?: string;
  mobileDescription?: string;
};

export type ServicesContent = {
  introTitle: string;
  introSubtitle: string;
  cta: string;
  services: ServiceItem[];
  servicePoints: ServicePoint[];
};

export const servicesContentByLang: Record<SupportedLang, ServicesContent> = {
  es: {
    introTitle: 'Transformamos tus oportunidades en éxitos empresariales.',
    introSubtitle: 'Una consultoría real, no una promesa de papel',
    cta: 'Agenda una asesoría sin costo',
    services: [
      { title: 'Soluciones Tecnológicas', href: '/soluciones-tecnologicas/' },
      { title: 'Planeación Estratégica' },
      { title: 'Dirección de Proyectos' },
      { title: 'Administración de Procesos' },
      { title: 'Gestión de Calidad' },
      { title: 'Mercadotecnia Digital', href: '/mercadotecnia-digital/' },
    ],
    servicePoints: [
      {
        icon: 'layers',
        title: 'Enfoque integral y multidisciplinario',
        description:
          'Reunimos equipos especializados en cada área clave: estrategia, proyectos, tecnología, procesos, calidad y marketing trabajando de manera coordinada para su empresa.',
        mobileTitle: 'Enfoque integral',
        mobileDescription:
          'Coordinamos estrategia, proyectos, tecnología, procesos, calidad y marketing con una sola dirección.',
      },
      {
        icon: 'team',
        title: 'Equipo alineado con estándares globales',
        description:
          'Nuestro equipo opera bajo los más altos estándares con metodologías de validez internacional probadas en empresas líderes.',
        mobileTitle: 'Equipo alineado',
        mobileDescription: 'Aplicamos metodologías probadas y estándares internacionales con ejecución cercana.',
      },
      {
        icon: 'trend',
        title: 'Resultados medibles',
        description:
          'Damos seguimiento continuo a cada iniciativa con indicadores claros, ajustes oportunos y acompañamiento hasta consolidar avances que su equipo pueda sostener.',
        mobileDescription: 'Medimos cada iniciativa con indicadores claros, ajustes oportunos y acompañamiento continuo.',
      },
      {
        icon: 'root',
        title: 'Soluciones de raíz, no parches temporales',
        description:
          'Identificamos la causa real de cada problema. Nuestros clientes dejan de gastar en proyectos fallidos y comienzan a ver impacto directo en su rentabilidad.',
        mobileTitle: 'Soluciones de raíz',
        mobileDescription: 'Atacamos la causa real del problema para evitar proyectos fallidos y mejorar rentabilidad.',
      },
    ],
  },
  en: {
    introTitle: 'We turn your opportunities into business wins.',
    introSubtitle: 'Real consulting, not a paper promise',
    cta: 'Schedule a free consultation',
    services: [
      { title: 'Technology Solutions', href: '/en/technology-solutions/' },
      { title: 'Strategic Planning' },
      { title: 'Project Management' },
      { title: 'Process Management' },
      { title: 'Quality Management' },
      { title: 'Digital Marketing', href: '/en/digital-marketing/' },
    ],
    servicePoints: [
      {
        icon: 'layers',
        title: 'Integrated, multidisciplinary approach',
        description:
          'We bring together specialized teams across every key area: strategy, projects, technology, processes, quality and marketing working in coordination for your company.',
        mobileTitle: 'Integrated approach',
        mobileDescription: 'We coordinate strategy, projects, technology, processes, quality and marketing under one direction.',
      },
      {
        icon: 'team',
        title: 'Team aligned with global standards',
        description:
          'Our team operates under high standards with internationally validated methodologies proven in leading companies.',
        mobileTitle: 'Aligned team',
        mobileDescription: 'We apply proven methodologies and international standards with close execution.',
      },
      {
        icon: 'trend',
        title: 'Measurable results',
        description:
          'We track every initiative with clear indicators, timely adjustments and ongoing support until progress is consolidated and your team can sustain it.',
        mobileDescription: 'We track each initiative with clear indicators, timely adjustments and ongoing support.',
      },
      {
        icon: 'root',
        title: 'Root-cause solutions, not temporary patches',
        description:
          'We identify the real cause of each problem. Our clients stop spending on failed projects and start seeing direct impact on profitability.',
        mobileTitle: 'Root-cause solutions',
        mobileDescription: 'We address the real cause to avoid failed projects and improve profitability.',
      },
    ],
  },
};

export const services = servicesContentByLang.es.services;
export const servicePoints = servicesContentByLang.es.servicePoints;

export function getServicesContent(lang: SupportedLang) {
  return servicesContentByLang[lang];
}

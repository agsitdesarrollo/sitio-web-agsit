import type { SupportedLang } from '../i18n/ui';

export type FooterCopy = {
  brand: string;
  menuTitle: string;
  nav: {
    home: string;
    services: string;
    contact: string;
  };
  servicesTitle: string;
  contactTitle: string;
  location: string;
};

export const footerCopyByLang: Record<SupportedLang, FooterCopy> = {
  es: {
    brand: 'Consultoría empresarial para transformar operaciones, procesos y crecimiento con enfoque en resultados reales.',
    menuTitle: 'Menu',
    nav: {
      home: 'Inicio',
      services: 'Servicios',
      contact: 'Contacto',
    },
    servicesTitle: 'Servicios',
    contactTitle: 'Contacto',
    location: 'CDMX, México',
  },
  en: {
    brand: 'Business consulting to transform operations, processes and growth with a focus on real results.',
    menuTitle: 'Menu',
    nav: {
      home: 'Home',
      services: 'Services',
      contact: 'Contact',
    },
    servicesTitle: 'Services',
    contactTitle: 'Contact',
    location: 'Mexico City, Mexico',
  },
};

export function getFooterCopy(lang: SupportedLang) {
  return footerCopyByLang[lang];
}

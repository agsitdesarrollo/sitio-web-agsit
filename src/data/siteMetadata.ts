import type { SupportedLang } from '../i18n/ui';

export type SiteMetadata = {
  title: string;
  description: string;
  canonicalUrl: string;
  image: string;
  locale: string;
  htmlLang: string;
  siteName: string;
};

export const siteMetadataByLang: Record<SupportedLang, SiteMetadata> = {
  es: {
    title: 'AGSIT Consultoría Empresarial | Soluciones para crecer con claridad',
    description:
      'Consultoría empresarial especializada en estrategia, proyectos, tecnología, procesos, calidad y mercadotecnia digital para organizaciones que buscan resultados medibles.',
    canonicalUrl: 'https://agsit.com.mx/',
    image: '/assets/logo-asit.webp',
    locale: 'es_MX',
    htmlLang: 'es-MX',
    siteName: 'AGSIT',
  },
  en: {
    title: 'AGSIT Business Consulting | Solutions for clear growth',
    description:
      'Business consulting specialized in strategy, project management, technology, processes, quality and digital marketing for organizations seeking measurable results.',
    canonicalUrl: 'https://agsit.com.mx/en/',
    image: '/assets/logo-asit.webp',
    locale: 'en_US',
    htmlLang: 'en',
    siteName: 'AGSIT',
  },
};

export const siteMetadata = siteMetadataByLang.es;

export function getSiteMetadata(lang: SupportedLang) {
  return siteMetadataByLang[lang];
}

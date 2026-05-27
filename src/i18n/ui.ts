export const languages = {
  es: 'Español',
  en: 'English',
} as const;

export type SupportedLang = keyof typeof languages;

export const defaultLang: SupportedLang = 'es';

export const showDefaultLang = false;

export const ui = {
  es: {
    'nav.home': 'Inicio',
    'nav.services': 'Servicios',
    'nav.contact': 'Contacto',
    'nav.brandLabel': 'Inicio AGSIT',
    'nav.openMenu': 'Abrir menú',
    'nav.closeMenu': 'Cerrar menú',
    'language.switchLabel': 'Cambiar idioma a inglés',
    'language.switchText': 'EN',
    'floatingCta.label': 'Agenda una asesoría',
    'floatingCta.tooltip': 'Agenda una asesoría',
  },
  en: {
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.contact': 'Contact',
    'nav.brandLabel': 'AGSIT home',
    'nav.openMenu': 'Open menu',
    'nav.closeMenu': 'Close menu',
    'language.switchLabel': 'Switch language to Spanish',
    'language.switchText': 'ES',
    'floatingCta.label': 'Schedule a consultation',
    'floatingCta.tooltip': 'Schedule a consultation',
  },
} as const;

export type UiKey = keyof typeof ui[typeof defaultLang];

import type { SupportedLang } from '../i18n/ui';

export const storyLinesByLang: Record<SupportedLang, string[]> = {
  es: [
    'Nuestro compromiso con resultados tangibles.',
    'Calidad garantizada con respaldo internacional.',
    '¿Listo para alcanzar el siguiente nivel?',
  ],
  en: [
    'Our commitment to tangible results.',
    'Guaranteed quality with international backing.',
    'Ready to reach the next level?',
  ],
};

export const storyLines = storyLinesByLang.es;

export function getStoryLines(lang: SupportedLang) {
  return storyLinesByLang[lang];
}

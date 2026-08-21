import type { SupportedLang } from '../i18n/ui';

export const storyLinesByLang: Record<SupportedLang, string[]> = {
  es: [
    'Transformamos estrategia en resultados.',
    'Calidad respaldada por estándares internacionales.',
    'Construyendo el futuro de las empresas.',
  ],
  en: [
    'We turn strategy into results.',
    'Quality backed by international standards.',
    'Building the future of businesses.',
  ],
};

export const storyLines = storyLinesByLang.es;

export function getStoryLines(lang: SupportedLang) {
  return storyLinesByLang[lang];
}

import { defaultLang, ui, type SupportedLang, type UiKey } from './ui';

export const locales = ['es', 'en'] as const satisfies readonly SupportedLang[];

export function isSupportedLang(lang: string | undefined): lang is SupportedLang {
  return Boolean(lang && locales.includes(lang as SupportedLang));
}

export function getLangFromUrl(url: URL): SupportedLang {
  const [, lang] = url.pathname.split('/');
  return isSupportedLang(lang) ? lang : defaultLang;
}

export function useTranslations(lang: SupportedLang) {
  return function translate(key: UiKey) {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}

export function getLocalizedPath(lang: SupportedLang, hash = '') {
  const basePath = lang === defaultLang ? '/' : `/${lang}/`;
  return `${basePath}${hash}`;
}

export function getAlternateLangPath(lang: SupportedLang) {
  return lang === 'es' ? '/en/' : '/';
}

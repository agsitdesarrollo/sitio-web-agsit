import type { SupportedLang } from '../i18n/ui';

export type HeroContent = {
  titleLabel: string;
  lineStart: string;
  emphasis: string;
  lineEnd: string;
  support: string;
  cta: string;
};

export const heroContentByLang: Record<SupportedLang, HeroContent> = {
  es: {
    titleLabel: 'Decisiones que definen el futuro de su empresa',
    lineStart: 'Decisiones que',
    emphasis: 'definen el futuro',
    lineEnd: 'de su empresa',
    support:
      'Acompañamos a organizaciones ambiciosas en sus momentos más determinantes. Estrategia, claridad y resultados medibles cuando más importan.',
    cta: 'Conversemos sobre tu empresa',
  },
  en: {
    titleLabel: 'Decisions that define the future of your company',
    lineStart: 'Decisions that',
    emphasis: 'define the future',
    lineEnd: 'of your company',
    support:
      'We support ambitious organizations in their most decisive moments. Strategy, clarity and measurable results when they matter most.',
    cta: "Let's talk about your company",
  },
};

export function getHeroContent(lang: SupportedLang) {
  return heroContentByLang[lang];
}

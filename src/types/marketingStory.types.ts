import type { SupportedLang } from '../i18n/ui';

export type StoryImage = { src: string; alt: string; width: number; height: number };
export type MarketingStoryContent = {
  lang: SupportedLang;
  metadata: { title: string; description: string; canonicalUrl: string; image: string; imageAlt: string; htmlLang: string; locale: string };
  hero: { label: string; title: string; copy: string; chapters: string[]; skip: string; contact: string; explore: string; sequence: string; progress: string; play: string; media: { src: string; pending: boolean; duration: number; frameRate: number; clips: string[] }; poster: StoryImage };
  transition: { word: string };
  plan: { phrase: string; cue: string; particlesLabel: string };
  manifesto: { eyebrow: string; words: string[]; lines: string[]; figureLabels: string[]; from: string; to: string };
};

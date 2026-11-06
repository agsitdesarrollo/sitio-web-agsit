import type { SupportedLang } from '../i18n/ui';

export type StoryImage = { src: string; alt: string; width: number; height: number };
export type ManifestoScenesCopy = {
  attract: { business: string; action: string; reach: string };
  follow: { title: string; status: [string, string, string]; steps: [string, string, string] };
  grow: { title: string; chip: string; returning: string };
};
export type MarketingStoryContent = {
  lang: SupportedLang;
  metadata: { title: string; description: string; canonicalUrl: string; image: string; imageAlt: string; htmlLang: string; locale: string };
  hero: { label: string; title: string; copy: string; chapters: string[]; skip: string; contact: string; explore: string; sequence: string; progress: string; play: string; media: { src: string; pending: boolean; duration: number; frameRate: number; clips: string[] }; poster: StoryImage };
  transition: { word: string };
  plan: { phrase: string; cue: string; particlesLabel: string };
  closing: { phrase: string; cta: string };
  services: { label: string; previous: string; next: string; announcement: string; items: { name: string; title: string; copy: string }[] };
  manifesto: { eyebrow: string; words: string[]; lines: string[]; scenes: ManifestoScenesCopy; from: string; to: string };
};

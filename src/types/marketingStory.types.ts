import type { SupportedLang } from '../i18n/ui';

export type StoryImage = { src: string; alt: string; width: number; height: number };
export type StoryService = { name: string; title: string; copy: string; includes: string[]; image: StoryImage };
export type StoryScenario = { title: string; without: string; with: string };
export type MarketingStoryContent = {
  lang: SupportedLang;
  metadata: { title: string; description: string; canonicalUrl: string; image: string; imageAlt: string; htmlLang: string; locale: string };
  hero: { label: string; title: string; copy: string; chapters: string[]; skip: string; contact: string; explore: string; sequence: string; progress: string; play: string; media: { src: string; pending: boolean; duration: number; clips: string[] }; poster: StoryImage };
  manifesto: { words: string[]; copy: string; from: string; to: string; conclusion: string };
  comparison: { title: string; copy: string; without: string; with: string; play: string; pause: string; reset: string; timeline: string; entries: string; entriesCopy: string; route: string; actions: string; result: string; channels: string[]; stages: StoryScenario[]; results: [string, string]; note: string };
  services: { title: string; copy: string; includes: string; lineLabel: string; items: StoryService[]; cta: string; panoramaAlt: string };
  integration: { title: string; copy: string; channels: string[]; center: string; outcome: string; note: string; diagram: string };
  audience: { title: string; items: { title: string; copy: string }[] };
};

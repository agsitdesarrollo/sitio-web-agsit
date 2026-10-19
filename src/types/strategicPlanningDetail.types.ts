import type { SiteMetadata } from '../data/siteMetadata';

export type StrategicPlanningMedia = {
  src: string;
  alt: string;
  placeholder: string;
  pending: boolean;
  ratio: '4/3' | '4/5';
};

export type StrategicPlanningDetailContent = {
  metadata: Omit<SiteMetadata, 'siteName'>;
  hero: {
    eyebrow: string;
    primary: string;
    secondary: string;
    copy: string;
    scrollHint: string;
    scrollLabel: string;
  };
  narrative: {
    ariaLabel: string;
    segments: Array<{ text?: string; accent?: string }>;
  };
  lifecycle: {
    eyebrow: string;
    title: string;
    copy: string;
    stages: Array<{ label: string; sublabel: string; copy: string; media: StrategicPlanningMedia }>;
  };
  method: {
    eyebrow: string;
    title: string;
    copy: string;
    steps: Array<{ title: string; copy: string }>;
    media: StrategicPlanningMedia;
  };
};

export type StrategicPlanningServiceId = 'corporate-strategic-planning';

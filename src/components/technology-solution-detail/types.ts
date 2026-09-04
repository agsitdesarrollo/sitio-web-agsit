export type TechnologySolutionPathway = {
  label: string;
  href: string;
};

export type TechnologySolutionHeroContent = {
  eyebrow: string;
  title: string;
  titleAccent: string;
  copy: string;
  primaryCta: string;
  pathwaysLabel: string;
  pathways: TechnologySolutionPathway[];
  visualAlt: string;
};

export type TechnologySolutionHeroMedia = {
  poster?: string;
  sources: Array<{
    src: string;
    type: string;
  }>;
};

export type TechnologySolutionJourneyItem = {
  anchor?: string;
  eyebrow: string;
  title: string;
  copy: string;
  detail: string;
  image: string;
};

export type TechnologySolutionJourneyContent = {
  eyebrow: string;
  title: string;
  copy: string;
  items: TechnologySolutionJourneyItem[];
};

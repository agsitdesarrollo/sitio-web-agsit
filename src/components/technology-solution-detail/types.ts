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
  visualSize?: 'large';
};

export type TechnologySolutionHeroMedia =
  | {
      kind?: 'video';
      poster?: string;
      playWhenVisible?: false;
      sources: Array<{
        src: string;
        type: string;
      }>;
    }
  | ({ kind: 'video'; playWhenVisible: true } & TechnologySolutionVideoMedia)
  | {
      kind: 'image';
      src: string;
    };

export type TechnologySolutionVideoMedia = {
  src: string;
  poster: string;
};

export type TechnologySolutionJourneyItem = {
  anchor?: string;
  eyebrow: string;
  title: string;
  copy: string;
  detail: string;
  image: string;
  video?: TechnologySolutionVideoMedia;
};

export type TechnologySolutionJourneyContent = {
  eyebrow: string;
  title: string;
  copy: string;
  items: TechnologySolutionJourneyItem[];
};

export type TechnologySolutionBenefitIcon = 'fit' | 'quality' | 'growth' | 'integration';

export type TechnologySolutionBenefitItem = {
  icon: TechnologySolutionBenefitIcon;
  title: string;
  copy: string;
};

export type TechnologySolutionBenefitsContent = {
  eyebrow: string;
  title: string;
  copy: string;
  image: string;
  imageAlt: string;
  video?: TechnologySolutionVideoMedia;
  items: TechnologySolutionBenefitItem[];
};

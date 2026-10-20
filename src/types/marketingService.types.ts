import type { SupportedLang } from '../i18n/ui';
export type MarketingMedia = {
    src: string;
    alt: Record<SupportedLang, string>;
    width: number;
    height: number;
    ratio: string;
    pending: boolean;
};
export type MarketingPhrase = {
    id: string;
    before: string;
    accent: string;
    after?: string;
};
export type MarketingProfile = {
    id: string;
    title: string;
    copy: string;
    media: MarketingMedia;
};
export type MarketingService = {
    id: string;
    title: string;
    copy: string;
    includes: string[];
    media: MarketingMedia;
};
export type MarketingServiceContent = {
    lang: SupportedLang;
    metadata: {
        title: string;
        description: string;
        canonicalUrl: string;
        image: string;
        imageAlt: string;
        htmlLang: string;
        locale: string;
    };
    hero: {
        eyebrow: string;
        lines: string[];
        seal: string;
        copy: string;
        cta: string;
        explore: string;
    };
    problems: {
        title: string;
        rows: MarketingPhrase[][];
        pause: string;
        resume: string;
    };
    solution: {
        eyebrow: string;
        title: string;
        copy: string;
        clouds: MarketingMedia[];
    };
    audience: {
        title: string;
        profiles: MarketingProfile[];
        placeholder: string;
    };
    services: {
        title: string;
        includes: string;
        items: MarketingService[];
    };
    navigation: {
        previous: string;
        next: string;
        contact: string;
        label: string;
    };
};

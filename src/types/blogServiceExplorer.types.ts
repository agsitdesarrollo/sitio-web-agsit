export type BlogServiceImage = { src: string; alt: string; width: number; height: number };
export type BlogService = { name: string; title: string; copy: string; includes: string[]; image: BlogServiceImage };
export type BlogServiceExplorerContent = {
  title: string;
  copy: string;
  includes: string;
  lineLabel: string;
  items: BlogService[];
  cta: string;
  panoramaAlt: string;
};

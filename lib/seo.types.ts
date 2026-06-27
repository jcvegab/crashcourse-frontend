export type SeoOgType = 'website' | 'product' | 'article';

export type JsonLd = Record<string, unknown>;

export type SeoTags = {
  title: string;
  description: string;
  canonical: string | null;
  image: string;
  ogType: SeoOgType;
  noindex: boolean;
  jsonLd: JsonLd[];
};

export type BuildSeoInput = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  ogType?: SeoOgType;
  noindex?: boolean;
  jsonLd?: JsonLd[];
};

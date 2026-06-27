import Head from 'next/head';

import { serializeJsonLd } from '@/lib/seo';

import type { SeoTags } from '@/lib/seo.types';

type SeoHeadProps = {
  seo: SeoTags;
  faviconHref?: string;
};

export function SeoHead({ seo, faviconHref = '/favicon.ico' }: SeoHeadProps) {
  return (
    <Head>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      {seo.noindex ? <meta name="robots" content="noindex, nofollow" /> : null}
      {seo.canonical ? <link rel="canonical" href={seo.canonical} /> : null}
      <link rel="icon" href={faviconHref} />

      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:type" content={seo.ogType} />
      <meta property="og:site_name" content="Crashcourse" />
      {seo.canonical ? (
        <meta property="og:url" content={seo.canonical} />
      ) : null}
      {seo.image ? <meta property="og:image" content={seo.image} /> : null}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      {seo.image ? <meta name="twitter:image" content={seo.image} /> : null}

      {seo.jsonLd.map((data) => {
        const type =
          typeof data['@type'] === 'string' ? data['@type'] : 'Thing';
        return (
          <script
            // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD requires raw script content
            dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
            key={`jsonld-${type}`}
            type="application/ld+json"
          />
        );
      })}
    </Head>
  );
}

export default SeoHead;

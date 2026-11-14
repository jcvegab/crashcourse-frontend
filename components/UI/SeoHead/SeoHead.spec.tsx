import { render } from '@testing-library/react';
import { HeadManagerContext } from 'next/dist/shared/lib/head-manager-context.shared-runtime';

import type React from 'react';
import type { SeoTags } from '@/lib/seo.types';

import SeoHead from '.';

const baseSeo: SeoTags = {
  title: 'Curso React | Crashcourse',
  description: 'Aprende React con ejemplos prácticos.',
  canonical: null,
  image: '',
  ogType: 'product',
  noindex: false,
  jsonLd: [],
};

type HeadElement = React.ReactElement<Record<string, unknown>>;

function renderHead(seo: SeoTags, faviconHref?: string) {
  let headElements: HeadElement[] = [];
  const updateHead = vi.fn((elements: React.ReactElement[]) => {
    headElements = elements as HeadElement[];
  });

  render(
    <HeadManagerContext.Provider
      value={{ mountedInstances: new Set(), updateHead }}
    >
      <SeoHead seo={seo} faviconHref={faviconHref} />
    </HeadManagerContext.Provider>,
  );

  return headElements;
}

function findHeadElement(
  elements: HeadElement[],
  type: string,
  property: string,
  value: string,
) {
  return elements.find(
    (element) => element.type === type && element.props[property] === value,
  );
}

describe('SeoHead', () => {
  it('renders basic metadata and the default favicon', () => {
    const elements = renderHead(baseSeo);

    expect(
      elements.find((element) => element.type === 'title')?.props.children,
    ).toBe(baseSeo.title);
    expect(
      findHeadElement(elements, 'meta', 'name', 'description')?.props.content,
    ).toBe(baseSeo.description);
    expect(findHeadElement(elements, 'link', 'rel', 'icon')?.props.href).toBe(
      '/favicon.ico',
    );
    expect(findHeadElement(elements, 'meta', 'name', 'robots')).toBeUndefined();
    expect(
      findHeadElement(elements, 'link', 'rel', 'canonical'),
    ).toBeUndefined();
    expect(
      findHeadElement(elements, 'meta', 'property', 'og:type')?.props.content,
    ).toBe('product');
    expect(
      findHeadElement(elements, 'meta', 'name', 'twitter:card')?.props.content,
    ).toBe('summary_large_image');
  });

  it('renders robots, canonical, social image, and a custom favicon when set', () => {
    const seo: SeoTags = {
      ...baseSeo,
      canonical: 'https://example.test/cursos/react',
      image: 'https://example.test/react.png',
      noindex: true,
    };
    const elements = renderHead(seo, '/brand-icon.png');

    expect(
      findHeadElement(elements, 'meta', 'name', 'robots')?.props.content,
    ).toBe('noindex, nofollow');
    expect(
      findHeadElement(elements, 'link', 'rel', 'canonical')?.props.href,
    ).toBe(seo.canonical);
    expect(
      findHeadElement(elements, 'meta', 'property', 'og:url')?.props.content,
    ).toBe(seo.canonical);
    expect(
      findHeadElement(elements, 'meta', 'property', 'og:image')?.props.content,
    ).toBe(seo.image);
    expect(
      findHeadElement(elements, 'meta', 'name', 'twitter:image')?.props.content,
    ).toBe(seo.image);
    expect(findHeadElement(elements, 'link', 'rel', 'icon')?.props.href).toBe(
      '/brand-icon.png',
    );
  });

  it('renders escaped JSON-LD with a type-derived key', () => {
    const seo: SeoTags = {
      ...baseSeo,
      jsonLd: [{ '@type': 'Course', name: '<script>' }],
    };
    const elements = renderHead(seo);
    const script = findHeadElement(
      elements,
      'script',
      'type',
      'application/ld+json',
    );

    const rawJsonLd = script?.props.dangerouslySetInnerHTML as
      | { __html: string }
      | undefined;

    expect(rawJsonLd?.__html).toContain('\\u003cscript>');
  });
});

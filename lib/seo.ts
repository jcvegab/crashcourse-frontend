import { COURSE_PRICING, formatCurrency, parsePrice } from './pricing';

import type { Course } from '@/types/course.types';
import type { BuildSeoInput, JsonLd, SeoOgType, SeoTags } from './seo.types';

const SITE_NAME = 'Crashcourse';
const DEFAULT_IMAGE = '/logo.svg';
const DEFAULT_OG_TYPE: SeoOgType = 'website';
const DESCRIPTION_MAX_LENGTH = 155;

function getSiteUrl() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (!siteUrl) {
    return null;
  }

  return siteUrl.replace(/\/+$/, '');
}

function truncate(text: string, maxLength: number) {
  if (text.length <= maxLength) {
    return text;
  }

  return `${text.slice(0, Math.max(0, maxLength - 1)).trimEnd()}…`;
}

function buildSeo(input: BuildSeoInput): SeoTags {
  const {
    title,
    description,
    path,
    image = DEFAULT_IMAGE,
    ogType = DEFAULT_OG_TYPE,
    noindex = false,
    jsonLd = [],
  } = input;

  const siteUrl = getSiteUrl();
  const canonical =
    siteUrl && path
      ? `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`
      : null;

  return {
    title: title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`,
    description: truncate(description, DESCRIPTION_MAX_LENGTH),
    canonical,
    image,
    ogType,
    noindex,
    jsonLd,
  };
}

function buildCourseJsonLd({
  course,
  url,
}: {
  course: Pick<Course, 'name' | 'tutorUsername' | 'level' | 'price'>;
  url: string | null;
}): JsonLd {
  const data: JsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.name,
    description: `Curso de ${course.name} con ${course.tutorUsername}. Nivel ${course.level}.`,
    provider: {
      '@type': 'Person',
      name: course.tutorUsername,
    },
    inLanguage: 'es',
  };

  const price = parsePrice(course.price);

  if (price !== null) {
    data.offers = {
      '@type': 'Offer',
      price,
      priceCurrency: COURSE_PRICING.currency,
    };
  }

  if (url) {
    data.url = url;
  }

  return data;
}

type CourseSeoOptions = {
  id: string;
  course: Pick<
    Course,
    'name' | 'tutorUsername' | 'level' | 'score' | 'price' | 'realPrice'
  > | null;
};

export function buildCourseSeo({ id, course }: CourseSeoOptions): SeoTags {
  if (!course) {
    return buildSeo({
      title: `Curso ${id}`,
      description:
        'Detalle del curso no disponible en este momento. Vuelve a intentarlo mas tarde.',
      path: `/cursos/${id}`,
      ogType: 'product',
      noindex: true,
    });
  }

  const normalizedPrice = parsePrice(course.price);
  const normalizedRealPrice = parsePrice(course.realPrice);
  const discountPrice =
    normalizedPrice === null ? null : formatCurrency(normalizedPrice);
  const hasDiscount =
    normalizedPrice !== null &&
    normalizedRealPrice !== null &&
    normalizedRealPrice > normalizedPrice;
  const realPrice =
    hasDiscount && normalizedRealPrice !== null
      ? formatCurrency(normalizedRealPrice)
      : null;

  const description = [
    `Curso de ${course.name} con ${course.tutorUsername}.`,
    `Nivel ${course.level}.`,
    `Puntuacion ${course.score}.`,
    `Desde ${discountPrice ?? 'Precio no disponible'}${realPrice ? ` (antes ${realPrice})` : ''}.`,
  ].join(' ');

  const siteUrl = getSiteUrl();
  const canonical = siteUrl ? `${siteUrl}/cursos/${id}` : null;

  return buildSeo({
    title: `Curso ${course.name}`,
    description,
    path: `/cursos/${id}`,
    ogType: 'product',
    jsonLd: [
      buildCourseJsonLd({
        course: {
          name: course.name,
          tutorUsername: course.tutorUsername,
          level: course.level,
          price: course.price,
        },
        url: canonical,
      }),
    ],
  });
}

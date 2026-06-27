import type { Course } from '@/types/course.types';
import type { BuildSeoInput, SeoOgType, SeoTags } from './seo.types';

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

export function truncate(text: string, maxLength: number) {
  if (text.length <= maxLength) {
    return text;
  }

  return `${text.slice(0, Math.max(0, maxLength - 1)).trimEnd()}…`;
}

function formatPrice(price: number) {
  if (!Number.isFinite(price)) {
    return '';
  }

  return `S/ ${price.toFixed(2)}`;
}

export function buildSeo(input: BuildSeoInput): SeoTags {
  const {
    title,
    description,
    path,
    image = DEFAULT_IMAGE,
    ogType = DEFAULT_OG_TYPE,
    noindex = false,
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
  };
}

export function buildHomeSeo(): SeoTags {
  return buildSeo({
    title: 'Crashcourse',
    description:
      'Aprende con cursos online en Crashcourse. Encuentra categorias, tutores y precios para cada nivel.',
    path: '/',
    ogType: 'website',
  });
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

  const discountPrice = formatPrice(course.price);
  const realPrice = formatPrice(course.realPrice);

  const description = [
    `Curso de ${course.name} con ${course.tutorUsername}.`,
    `Nivel ${course.level}.`,
    `Puntuacion ${course.score}.`,
    `Desde ${discountPrice}${realPrice && realPrice !== discountPrice ? ` (antes ${realPrice})` : ''}.`,
  ].join(' ');

  return buildSeo({
    title: `Curso ${course.name}`,
    description,
    path: `/cursos/${id}`,
    ogType: 'product',
  });
}

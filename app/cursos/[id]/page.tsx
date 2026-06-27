import { notFound } from 'next/navigation';

import { COURSE_FIELDS_FRAGMENT } from '@/lib/courseQueries';
import { gql } from '@/lib/gql';
import { buildCourseSeo } from '@/lib/seo';

import CoursePage from './CoursePage';

import type { Metadata } from 'next';
import type { Course } from '@/types/course.types';

type CourseQueryData = {
  course: Course | null;
};

const COURSE_QUERY = /* GraphQL */ `
  ${COURSE_FIELDS_FRAGMENT}

  query CourseQuery($id: ID!) {
    course(id: $id) {
      ...CourseFields
    }
  }
`;

type PageProps = {
  params: Promise<{ id: string }>;
};

async function getCourse(id: string): Promise<Course | null> {
  const data = await gql<CourseQueryData>(
    COURSE_QUERY,
    { id },
    { next: { tags: [`course-${id}`] } },
  );

  return data.course;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const course = await getCourse(id);

  const seo = buildCourseSeo({ id, course });

  return {
    title: seo.title,
    description: seo.description,
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: seo.canonical || undefined,
      siteName: 'Crashcourse',
      images: seo.image ? [{ url: seo.image }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
      images: seo.image ? [seo.image] : undefined,
    },
    alternates: {
      canonical: seo.canonical || undefined,
    },
    robots: seo.noindex ? { index: false, follow: false } : undefined,
  };
}

export default async function CursoPage({ params }: PageProps) {
  const { id } = await params;
  const course = await getCourse(id);

  if (!course) {
    notFound();
  }

  const seo = buildCourseSeo({ id, course });

  return (
    <>
      {seo.jsonLd.length > 0 && (
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD requires raw script content
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(seo.jsonLd[0]).replace(/</g, '\\u003c'),
          }}
        />
      )}
      <CoursePage course={course} />
    </>
  );
}

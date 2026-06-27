import { gql } from '@apollo/client';
import { notFound } from 'next/navigation';

import { initializeApollo } from '@/lib/apolloClient';
import { buildCourseSeo } from '@/lib/seo';

import CoursePage from './CoursePage';

import type { Metadata } from 'next';
import type { Course } from '@/types/course.types';

type CourseQueryData = {
  course: Course | null;
};

const CourseQuery = gql`
  query CourseQuery($id: ID!) {
    course(id: $id) {
      name
      tutorUsername
      level
      users
      score
      price
      realPrice
    }
  }
`;

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const apolloClient = initializeApollo();
  const { data } = await apolloClient.query<CourseQueryData>({
    query: CourseQuery,
    variables: { id },
  });

  const seo = buildCourseSeo({ id, course: data.course });

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

  try {
    const apolloClient = initializeApollo();
    const { data } = await apolloClient.query<CourseQueryData>({
      query: CourseQuery,
      variables: { id },
    });

    if (!data.course) {
      notFound();
    }

    const seo = buildCourseSeo({ id, course: data.course });

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
        <CoursePage course={data.course} />
      </>
    );
  } catch {
    return <span>Error in backend...</span>;
  }
}

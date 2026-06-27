import { gql } from '@apollo/client';

import { initializeApollo } from '@/lib/apolloClient';

import HomePage from './HomePage';

import type { Metadata } from 'next';
import type { CourseCategory, CourseSummary } from '@/types/course.types';

type ResumeQueryData = {
  categories: CourseCategory[];
  courses: CourseSummary[];
};

const ResumeQuery = gql`
  query ResumeQuery {
    categories {
      name
    }
    courses {
      id
      name
      tutorUsername
      level
      users
      score
      price
      realPrice
      category {
        name
      }
    }
  }
`;

export const metadata: Metadata = {
  title: 'Crashcourse',
  description:
    'Aprende con cursos online en Crashcourse. Encuentra categorias, tutores y precios para cada nivel.',
};

export default async function Home() {
  try {
    const apolloClient = initializeApollo();
    const { data } = await apolloClient.query<ResumeQueryData>({
      query: ResumeQuery,
    });

    return <HomePage data={data} />;
  } catch {
    return <span>Error in backend...</span>;
  }
}

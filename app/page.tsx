import { COURSE_FIELDS_FRAGMENT } from '@/lib/courseQueries';
import { gql } from '@/lib/gql';

import HomePage from './HomePage';

import type { Metadata } from 'next';
import type { CourseCategory, CourseSummary } from '@/types/course.types';

type ResumeQueryData = {
  categories: CourseCategory[];
  courses: CourseSummary[];
};

const RESUME_QUERY = /* GraphQL */ `
  ${COURSE_FIELDS_FRAGMENT}

  query ResumeQuery {
    categories {
      name
    }
    courses {
      id
      ...CourseFields
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
  const data = await gql<ResumeQueryData>(RESUME_QUERY);

  return <HomePage data={data} />;
}

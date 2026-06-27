'use client';

import Header from '@/layouts/Header';
import Main from '@/layouts/Main';

import type { CourseCategory, CourseSummary } from '@/types/course.types';

type HomePageProps = {
  data: {
    categories: CourseCategory[];
    courses: CourseSummary[];
  };
};

export default function HomePage({ data }: HomePageProps) {
  return (
    <>
      <Header />
      <Main props={data} />
    </>
  );
}

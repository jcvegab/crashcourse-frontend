import { useState } from 'react';

import CallToAction from '@/layouts/CallToAction';
import Categories from '@/layouts/Categories';
import CoursesList from '@/layouts/CoursesList';

import type { CourseCategory, CourseSummary } from '@/types/course.types';

type MainProps = {
  categories: CourseCategory[];
  courses: CourseSummary[];
};

export default function Main({ categories, courses }: MainProps) {
  const [currentCategory, setCurrentCategory] = useState('All');

  const filteredCourses = courses.filter((course) =>
    currentCategory === 'All'
      ? course
      : course.category.name === currentCategory,
  );

  return (
    <>
      <CallToAction />
      <Categories
        categories={categories}
        onSelect={(category: string) => {
          category === currentCategory
            ? setCurrentCategory('All')
            : setCurrentCategory(category);
        }}
      />
      <CoursesList courses={filteredCourses} />
    </>
  );
}

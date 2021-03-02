import { useState } from 'react';
import CallToAction from '../layouts/CallToAction';
import Categories from '../layouts/Categories';
import CoursesList from '../layouts/CoursesList';

export default function Main({ props }) {
  const [currentCategory, setCurrentCategory] = useState('All');

  const filteredCourses = props.courses.filter((course) =>
    currentCategory === 'All'
      ? course
      : course.category.name === currentCategory
  );

  return (
    <>
      <CallToAction />
      <Categories
        props={props.categories}
        onSelect={(category) => {
          category === currentCategory
            ? setCurrentCategory('All')
            : setCurrentCategory(category);
        }}
      />
      <CoursesList props={filteredCourses} />
    </>
  );
}

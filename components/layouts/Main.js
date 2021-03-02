import CallToAction from '../layouts/CallToAction';
import Categories from '../layouts/Categories';
import CoursesList from '../layouts/CoursesList';

export default function Main({ props }) {
  return (
    <>
      <CallToAction />
      <Categories props={props.categories} />
      <CoursesList props={props.courses} />
    </>
  );
}

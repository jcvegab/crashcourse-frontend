import styled from 'styled-components';

import CourseCard from '@/ui/CourseCard';
import { StyledH4 } from '@/ui/Title';

import type { CourseSummary } from '@/types/course.types';

const CoursesListTemplate = styled.div`
  display: grid;
  gap: 40px 24px;

  @media only screen and (min-width: 320px) {
    margin: 0 auto;
    max-width: max-content;
    grid-template-columns: repeat(1, 270px);
  }
  @media only screen and (min-width: 480px) {
    grid-template-columns: repeat(2, 270px);
  }
  @media only screen and (min-width: 768px) {
    grid-template-columns: repeat(2, 270px);
  }
  @media only screen and (min-width: 1024px) {
    grid-template-columns: repeat(3, 270px);
  }
  @media only screen and (min-width: 1200px) {
    grid-template-columns: repeat(4, 270px);
  }
`;

type CoursesListProps = {
  courses: CourseSummary[];
};

export default function CoursesList({ courses }: CoursesListProps) {
  return (
    <section>
      <StyledH4 margin="40px">Title H4 - Listado de cursos</StyledH4>
      <CoursesListTemplate>
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </CoursesListTemplate>
    </section>
  );
}

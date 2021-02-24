import { StyledH4 } from '../UI/Title';
import CourseCard from '../UI/CourseCard';
import styled from 'styled-components';
import Data from '../data.json';

const CoursesListTemplate = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px 24px;
`;

export default function CoursesList() {
  const courses = Data.STORE;
  return (
    <section>
      <StyledH4 margin="40px">Title H4 - Listado de cursos</StyledH4>
      <CoursesListTemplate>
        {courses.map((course) => (
          <CourseCard key={course.id} props={course} />
        ))}
      </CoursesListTemplate>
    </section>
  );
}

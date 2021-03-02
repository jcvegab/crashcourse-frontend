import { StyledH4 } from '../UI/Title';
import CourseCard from '../UI/CourseCard';
import styled from 'styled-components';

const CoursesListTemplate = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
  gap: 40px 24px;
`;

export default function CoursesList({ props }) {
  return (
    <section>
      <StyledH4 margin="40px">Title H4 - Listado de cursos</StyledH4>
      <CoursesListTemplate>
        {props.map((course) => (
          <CourseCard key={course.id} props={course} />
        ))}
      </CoursesListTemplate>
    </section>
  );
}

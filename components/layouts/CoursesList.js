import { StyledH4 } from '../UI/Title';
import CourseCard from '../UI/CourseCard';
import styled from 'styled-components';

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

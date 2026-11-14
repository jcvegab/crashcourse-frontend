import styled from 'styled-components';

import Button from '@/ui/Button';
import CourseCard from '@/ui/CourseCard';
import CourseStats from '@/ui/CourseStats';
import Price from '@/ui/Price';
import Tag from '@/ui/Tag';
import { StyledH4 } from '@/ui/Title';

import type { CoursesListProps } from './CoursesList.types';

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

export default function CoursesList({ courses }: CoursesListProps) {
  return (
    <section>
      <StyledH4 margin="40px">Title H4 - Listado de cursos</StyledH4>
      <CoursesListTemplate>
        {courses.map((course) => (
          <CourseCard.Root key={course.id}>
            <CourseCard.Media>
              <Tag>Tag venta</Tag>
            </CourseCard.Media>
            <CourseCard.Body>
              <CourseCard.Info>
                <CourseCard.Title>{course.name}</CourseCard.Title>
                <CourseCard.Tutor>{course.tutorUsername}</CourseCard.Tutor>
                <CourseStats
                  level={course.level}
                  users={course.users}
                  course_score={course.score}
                />
              </CourseCard.Info>
              <CourseCard.Actions>
                <Price
                  amount={course.price}
                  compareAtAmount={course.realPrice}
                />
                <Button href={`/cursos/${course.id}`} fullWidth>
                  Comprar ahora
                </Button>
              </CourseCard.Actions>
            </CourseCard.Body>
          </CourseCard.Root>
        ))}
      </CoursesListTemplate>
    </section>
  );
}

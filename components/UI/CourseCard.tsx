import styled from 'styled-components';

import Button from './Button';
import CourseCost from './CourseCost';
import CourseStats from './CourseStats';
import Tag from './Tag';

import type { CourseSummary } from '@/types/course.types';

type CourseCardProps = {
  course: CourseSummary;
};

const CourseCardContainer = styled.div`
  width: 270px;
`;

const CourseCardTop = styled.div`
  height: 160px;
  padding: 8px;
  border-radius: 10px 10px 0 0;
  background-color: ${({ theme }) => theme.colors.grayLight};
`;

const CourseCardBottom = styled.div`
  height: 208px;
  padding: 16px 15.5px;
  border-radius: 0 0 10px 10px;
  background-color: ${({ theme }) => theme.colors.grayLighter};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const CourseInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const CourseName = styled.h5`
  color: ${({ theme }) => theme.colors.baseMain};
  font-weight: bold;
  font-size: 16px;
  line-height: 20px;
`;

const CourseProfesor = styled.p`
  font-size: 14px;
  line-height: 20px;
`;

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <CourseCardContainer>
      <CourseCardTop>
        <Tag>Tag venta</Tag>
      </CourseCardTop>
      <CourseCardBottom>
        <CourseInfo>
          <CourseName>{course.name}</CourseName>
          <CourseProfesor>{course.tutorUsername}</CourseProfesor>
          <CourseStats
            level={course.level}
            users={course.users}
            course_score={course.score}
          />
        </CourseInfo>
        <CourseCost price={course.price} realPrice={course.realPrice} />
        <Button url={`cursos/${course.id}`} path="cursos/[id]">
          Comprar ahora
        </Button>
      </CourseCardBottom>
    </CourseCardContainer>
  );
}

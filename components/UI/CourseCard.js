import styled from 'styled-components';
import Button from './Button';
import Tag from './Tag';
import CourseStats from './CourseStats';

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

const CourseCost = styled.p``;

export default function CourseCard({ props }) {
  return (
    <CourseCardContainer>
      <CourseCardTop>
        <Tag>Tag venta</Tag>
      </CourseCardTop>
      <CourseCardBottom>
        <CourseInfo>
          <CourseName>{props.name}</CourseName>
          <CourseProfesor>{props.tutorUsername}</CourseProfesor>
          <CourseStats
            level={props.level}
            users={props.users}
            course_score={props.score}
          />
        </CourseInfo>
        <CourseCost>
          co${props.price} <span>CO${props.realPrice}</span>
        </CourseCost>
        <Button url={`cursos/${props.id}`} path={`cursos/[name]`}>
          Comprar ahora
        </Button>
      </CourseCardBottom>
    </CourseCardContainer>
  );
}

import styled from 'styled-components';
import Button from './Button';
import Tag from './Tag';
import CourseStats from './CourseStats';

const CourseCardContainer = styled.div`
  width: 270px;
  height: 368px;
`;

const CourseCardImage = styled.div`
  height: 160px;
  padding: 8px;
  border-radius: 10px 10px 0 0;
  background-color: ${({ theme }) => theme.colors.grayLight};
`;

const CourseCardInfo = styled.div`
  padding: 16px 15.5px;
  border-radius: 0 0 10px 10px;
  background-color: ${({ theme }) => theme.colors.grayLighter};
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
      <CourseCardImage>
        <Tag>Tag venta</Tag>
      </CourseCardImage>
      <CourseCardInfo>
        <CourseName>{props.course_name}</CourseName>
        <CourseProfesor>{props.username}</CourseProfesor>
        <CourseStats
          level="1"
          users={props.users}
          course_score={props.course_score}
        />
        <CourseCost>
          ${props.price} ${props.real_price}
        </CourseCost>
        <Button>Comprar ahora</Button>
      </CourseCardInfo>
    </CourseCardContainer>
  );
}

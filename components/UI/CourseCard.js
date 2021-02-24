import styled from 'styled-components';
import Button from './Button';
import Tag from './Tag';

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

export default function CourseCard() {
  return (
    <CourseCardContainer>
      <CourseCardImage>
        <Tag>Tag venta</Tag>
      </CourseCardImage>
      <CourseCardInfo>
        <p>Nombre del curso</p>
        <p>Profesor del curso</p>
        <p>Nivel 1</p>
        <p>co$349,929</p>
        <Button>Comprar ahora</Button>
      </CourseCardInfo>
    </CourseCardContainer>
  );
}

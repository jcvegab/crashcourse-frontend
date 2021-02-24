import styled from 'styled-components';
import Button from '../UI/Button';

const CourseCardContainer = styled.div`
  width: 270px;
  height: 368px;
  background-color: ${({ theme }) => theme.colors.grayLighter};
  border-radius: 10px;
`;

export default function CourseCard() {
  return (
    <CourseCardContainer>
      <p>Categoria</p>
      <Button>Comprar ahora</Button>
    </CourseCardContainer>
  );
}

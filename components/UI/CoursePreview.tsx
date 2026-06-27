import styled, { css } from 'styled-components';

import Button from '@/ui/Button';
import CourseCost from '@/ui/CourseCost';

const _TextTemplate = css`
  color: ${({ theme }) => theme.colors.baseMain};
`;

const PreviewCardContainer = styled.div`
  width: 465px;
  height: 493px;
`;

const TrailerContainer = styled.div`
  height: 274px;
  background-color: ${({ theme }) => theme.colors.black};
`;

const BuyCourseContainer = styled.div`
  padding: 29px 24px 24px;
  border-radius: 0 0 10px 10px;
  background-color: ${({ theme }) => theme.colors.grayLight};
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

type CoursePreviewProps = {
  price: number;
  realPrice: number;
};

export default function CoursePreview({
  price,
  realPrice,
}: CoursePreviewProps) {
  return (
    <PreviewCardContainer>
      <TrailerContainer>
        <span>Ver trailer del curso</span>
      </TrailerContainer>
      <BuyCourseContainer>
        <CourseCost price={price} realPrice={realPrice} />
        <ButtonsContainer>
          <Button url="checkout" path="checkout">
            Comprar ahora
          </Button>
          <Button ghost>Agregar al carrito</Button>
        </ButtonsContainer>
      </BuyCourseContainer>
    </PreviewCardContainer>
  );
}

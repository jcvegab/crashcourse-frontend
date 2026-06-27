import styled, { css } from 'styled-components';

const TextTemplate = css`
  color: ${({ theme }) => theme.colors.baseMain};
  font-weight: 800;
`;

const CostContainer = styled.div`
  display: flex;
  align-items: center;
`;
const PriceSimbol = styled.span`
  ${TextTemplate}
  font-size: 18px;
  line-height: 32px;
  letter-spacing: 0.4px;
`;
const Price = styled.p`
  ${TextTemplate}
  font-size: 24px;
  line-height: 32px;
`;
const RealPrice = styled.span`
  color: ${({ theme }) => theme.colors.grayDark};
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.1px;
  text-decoration-line: line-through;
  margin-left: 8px;
`;

type CourseCostProps = {
  price: number;
  realPrice: number;
};

export default function CourseCost({ price, realPrice }: CourseCostProps) {
  return (
    <CostContainer>
      <PriceSimbol>co</PriceSimbol>
      <Price>${price}</Price>
      <RealPrice>CO${realPrice}</RealPrice>
    </CostContainer>
  );
}

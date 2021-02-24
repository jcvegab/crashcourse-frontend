import styled from 'styled-components';
import Image from 'next/image';

const CategoryCardContainer = styled.div`
  width: 120px;
  height: 112px;
  padding: 22px 26px;
  color: ${({ theme }) => theme.colors.black};
  background-color: ${({ theme }) => theme.colors.grayLighter};
  border-radius: 10px;
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
`;

export default function CategoryCard() {
  return (
    <CategoryCardContainer>
      <Image height={40} width={40} src="/icons/category-icon.svg" />
      <p>Categoria</p>
    </CategoryCardContainer>
  );
}

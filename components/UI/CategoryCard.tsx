import Image from 'next/image';
import styled from 'styled-components';

const CategoryCardContainer = styled.button`
  width: 120px;
  height: 112px;
  padding: 10px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;

  flex: none;

  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  text-align: center;

  color: ${({ theme }) => theme.colors.black};
  background-color: ${({ theme }) => theme.colors.grayLighter};
  
  border: 0;
  border-radius: 10px;

  cursor: pointer;
`;

type CategoryCardProps = {
  category: string;
  onSelect: (category: string) => void;
};

export default function CategoryCard({
  category,
  onSelect,
}: CategoryCardProps) {
  return (
    <CategoryCardContainer type="button" onClick={() => onSelect(category)}>
      <Image
        height={40}
        width={40}
        src="/icons/category-icon.svg"
        alt={`Categoria ${category}`}
      />
      <p>{category}</p>
    </CategoryCardContainer>
  );
}

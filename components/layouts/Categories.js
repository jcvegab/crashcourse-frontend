import styled from 'styled-components';
import { StyledH4 } from '../UI/Title';
import CategoryCard from '../UI/CategoryCard';
import StyledList from '../UI/List';

const CategoriesTemplate = styled.section`
  margin-bottom: 56px;
`;

export default function Categories() {
  return (
    <CategoriesTemplate>
      <StyledH4 margin="16px">Title H4 - Categorias</StyledH4>
      <StyledList gap="24px">
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
      </StyledList>
    </CategoriesTemplate>
  );
}

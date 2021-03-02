import styled from 'styled-components';
import { StyledH4 } from '../UI/Title';
import CategoryCard from '../UI/CategoryCard';

const CategoriesTemplate = styled.section`
  margin-bottom: 56px;
`;

const CategoriesList = styled.div`
  display: flexbox;
  gap: 24px;
  overflow-x: scroll;
`;

export default function Categories({ props }) {
  return (
    <CategoriesTemplate>
      <StyledH4 margin="16px">Title H4 - Categorias</StyledH4>
      <CategoriesList>
        {props.map((category, index) => (
          <CategoryCard key={index} category={category.name} />
        ))}
      </CategoriesList>
    </CategoriesTemplate>
  );
}

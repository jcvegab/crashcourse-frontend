import styled from 'styled-components';

import CategoryCard from '../UI/CategoryCard';
import { StyledH4 } from '../UI/Title';

const CategoriesTemplate = styled.section`
  margin-bottom: 56px;
`;

const CategoriesList = styled.div`
  display: flexbox;
  gap: 24px;
  overflow-x: scroll;
`;

export default function Categories({ props, onSelect }) {
  return (
    <CategoriesTemplate>
      <StyledH4 margin="16px">Title H4 - Categorias</StyledH4>
      <CategoriesList>
        {props.map((category) => (
          <CategoryCard
            key={category.name}
            category={category.name}
            onSelect={(category) => {
              onSelect(category);
            }}
          />
        ))}
      </CategoriesList>
    </CategoriesTemplate>
  );
}

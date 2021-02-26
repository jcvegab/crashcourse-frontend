import styled from 'styled-components';
import { StyledH4 } from '../UI/Title';
import CategoryCard from '../UI/CategoryCard';
import Data from '../data.json';

const CategoriesTemplate = styled.section`
  margin-bottom: 56px;
`;

const CategoriesList = styled.div`
  display: inline-flex;
  gap: 24px;
`;

export default function Categories() {
  const categories = Data.STORE.map((course) => course.category_name);
  const filtered_categories = categories.reduce(
    (unique, category) =>
      unique.includes(category) ? unique : [...unique, category],
    []
  );
  return (
    <CategoriesTemplate>
      <StyledH4 margin="16px">Title H4 - Categorias</StyledH4>
      <CategoriesList>
        {filtered_categories.map((category, index) => (
          <CategoryCard key={index} category={category} />
        ))}
      </CategoriesList>
    </CategoriesTemplate>
  );
}

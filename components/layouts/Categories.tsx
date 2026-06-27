import styled from 'styled-components';

import CategoryCard from '@/ui/CategoryCard';
import { StyledH4 } from '@/ui/Title';

import type { CourseCategory } from '@/types/course.types';

type CategoriesProps = {
  props: CourseCategory[];
  onSelect: (category: string) => void;
};

const CategoriesTemplate = styled.section`
  margin-bottom: 56px;
`;

const CategoriesList = styled.div`
  display: flex;
  gap: 24px;
  overflow-x: scroll;
`;

export default function Categories({ props, onSelect }: CategoriesProps) {
  return (
    <CategoriesTemplate>
      <StyledH4 margin="16px">Title H4 - Categorias</StyledH4>
      <CategoriesList aria-label="Categorias de cursos">
        {props.map((category) => (
          <CategoryCard
            key={category.name}
            category={category.name}
            onSelect={onSelect}
          />
        ))}
      </CategoriesList>
    </CategoriesTemplate>
  );
}

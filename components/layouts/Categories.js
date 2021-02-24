import { StyledH4 } from '../UI/Title';
import CategoryCard from '../UI/CategoryCard';
import StyledList from '../UI/List';

export default function Categories() {
  return (
    <section>
      <StyledH4>Title H4 - Categorias</StyledH4>
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
    </section>
  );
}

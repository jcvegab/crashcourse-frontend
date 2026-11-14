import type { CourseCategory } from '@/types/course.types';

export type CategoriesProps = {
  categories: CourseCategory[];
  onSelect: (category: string) => void;
};

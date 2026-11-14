import type { CourseCategory, CourseSummary } from '@/types/course.types';

export type MainProps = {
  categories: CourseCategory[];
  courses: CourseSummary[];
};

import type { MoneyAmount } from './money.types';

export type CourseCategory = {
  name: string;
};

export type Course = {
  name: string;
  tutorUsername: string;
  level: string;
  users: number;
  score: number;
  price: MoneyAmount;
  realPrice: MoneyAmount;
};

export type CourseSummary = Course & {
  id: string;
  category: CourseCategory;
};

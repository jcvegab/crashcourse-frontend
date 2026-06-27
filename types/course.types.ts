export type CourseCategory = {
  name: string;
};

export type Course = {
  name: string;
  tutorUsername: string;
  level: string;
  users: number;
  score: number;
  price: number;
  realPrice: number;
};

export type CourseSummary = Course & {
  id: string;
  category: CourseCategory;
};

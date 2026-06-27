export type Course = {
  id?: string;
  name: string;
  tutorUsername: string;
  level: string;
  users: number;
  score: number;
  price: number;
  realPrice: number;
  category?: {
    name: string;
  };
};

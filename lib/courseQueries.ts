import { gql } from '@apollo/client';

export const COURSE_FIELDS_FRAGMENT = gql`
  fragment CourseFields on Course {
    name
    tutorUsername
    level
    users
    score
    price
    realPrice
  }
`;

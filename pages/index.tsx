import { gql, useQuery } from '@apollo/client';
import Head from 'next/head';

import Header from '../components/layouts/Header';
import Loading from '../components/layouts/LoadingPage';
import Main from '../components/layouts/Main';

import type { CourseCategory, CourseSummary } from '@/types/course.types';

type ResumeQueryData = {
  categories: CourseCategory[];
  courses: CourseSummary[];
};

const ResumeQuery = gql`
  query ResumeQuery {
    categories {
      name
    }
    courses {
      id
      name
      tutorUsername
      level
      users
      score
      price
      realPrice
      category {
        name
      }
    }
  }
`;

export default function Home() {
  const { data, error, loading } = useQuery<ResumeQueryData>(ResumeQuery);

  if (error) return <span>Error in backend...</span>;

  if (loading) return <Loading />;

  return (
    <>
      <Head>
        <title>Crashcourse</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header></Header>
      {data ? <Main props={data}></Main> : null}
    </>
  );
}

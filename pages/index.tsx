import { gql } from '@apollo/client';
import Head from 'next/head';

import Header from '../components/layouts/Header';
import Main from '../components/layouts/Main';
import { initializeApollo } from './api/apolloClient';

import type { GetServerSideProps } from 'next';
import type { CourseCategory, CourseSummary } from '@/types/course.types';

type ResumeQueryData = {
  categories: CourseCategory[];
  courses: CourseSummary[];
};

type HomeProps = {
  data: ResumeQueryData | null;
  hasError: boolean;
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

export default function Home({ data, hasError }: HomeProps) {
  if (hasError) return <span>Error in backend...</span>;

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

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  try {
    const apolloClient = initializeApollo();
    const { data } = await apolloClient.query<ResumeQueryData>({
      query: ResumeQuery,
    });

    return {
      props: {
        data,
        hasError: false,
        initialApolloState: apolloClient.cache.extract(),
      },
    };
  } catch {
    return {
      props: {
        data: null,
        hasError: true,
      },
    };
  }
};

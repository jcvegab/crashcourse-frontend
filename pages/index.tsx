import { gql } from '@apollo/client';

import { buildHomeSeo } from '@/lib/seo';

import Header from '../components/layouts/Header';
import Main from '../components/layouts/Main';
import SeoHead from '../components/UI/SeoHead';
import { initializeApollo } from './api/apolloClient';

import type { GetServerSideProps } from 'next';
import type { SeoTags } from '@/lib/seo.types';
import type { CourseCategory, CourseSummary } from '@/types/course.types';

type ResumeQueryData = {
  categories: CourseCategory[];
  courses: CourseSummary[];
};

type HomeProps = {
  data: ResumeQueryData | null;
  hasError: boolean;
  seo: SeoTags;
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

export default function Home({ data, hasError, seo }: HomeProps) {
  if (hasError) return <span>Error in backend...</span>;

  return (
    <>
      <SeoHead seo={seo} />
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
        seo: buildHomeSeo(),
        initialApolloState: apolloClient.cache.extract(),
      },
    };
  } catch {
    return {
      props: {
        data: null,
        hasError: true,
        seo: buildHomeSeo(),
      },
    };
  }
};

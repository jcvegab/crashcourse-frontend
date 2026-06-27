import { gql } from '@apollo/client';

import { buildCourseSeo } from '@/lib/seo';

import Header from '../../components/layouts/Header';
import CoursePreview from '../../components/UI/CoursePreview';
import CourseStats from '../../components/UI/CourseStats';
import SeoHead from '../../components/UI/SeoHead';
import { StyledH2 } from '../../components/UI/Title';
import { initializeApollo } from '../api/apolloClient';

import type { GetServerSideProps } from 'next';
import type { SeoTags } from '@/lib/seo.types';
import type { Course } from '@/types/course.types';

type CourseQueryData = {
  course: Course | null;
};

type CoursePageProps = {
  course: Course | null;
  hasError: boolean;
  seo: SeoTags;
};

const CourseQuery = gql`
  query CourseQuery($id: ID!) {
    course(id: $id) {
      name
      tutorUsername
      level
      users
      score
      price
      realPrice
    }
  }
`;

export default function Curso({ course, hasError, seo }: CoursePageProps) {
  if (hasError) return <span>Error in backend...</span>;
  if (!course) return null;

  return (
    <>
      <SeoHead seo={seo} />
      <Header />
      <main>
        <div>
          <StyledH2>{course.name}</StyledH2>
          <p>
            Body 3- Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id
            mi, mauris aliquam phasellus quis semper diam fringilla. Nunc nullam
            est in non. Enim sapien amet ut pharetra. Purus sagittis est felis
            sapien in. Auctor tellus, in mauris mi, facilisi arcu sedut.
          </p>
          <CourseStats
            level={course.level}
            users={course.users}
            course_score={course.score}
          />
        </div>
        <div>
          <div>Img</div>
          <p>Subtitle 3 - Nombre profesor</p>
          <p>Body 3 - Cargo profesor</p>
        </div>
        <div>
          <div>
            <span>Acción 1</span>
          </div>
          <div>
            <span>Acción 1</span>
          </div>
          <div>
            <span>Acción 1</span>
          </div>
          <CoursePreview props={course} />
        </div>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<CoursePageProps> = async ({
  params,
}) => {
  const id = params?.id;

  if (!id || Array.isArray(id)) {
    return { notFound: true };
  }

  try {
    const apolloClient = initializeApollo();
    const { data } = await apolloClient.query<CourseQueryData>({
      query: CourseQuery,
      variables: { id },
    });

    if (!data.course) {
      return { notFound: true };
    }

    return {
      props: {
        course: data.course,
        hasError: false,
        seo: buildCourseSeo({ id, course: data.course }),
        initialApolloState: apolloClient.cache.extract(),
      },
    };
  } catch {
    return {
      props: {
        course: null,
        hasError: true,
        seo: buildCourseSeo({ id, course: null }),
      },
    };
  }
};

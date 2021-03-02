import Head from 'next/head';
import { useQuery, gql } from '@apollo/client';
import { useRouter } from 'next/router';
import Header from '../../components/layouts/Header';
import { StyledH2 } from '../../components/UI/Title';
import CourseStats from '../../components/UI/CourseStats';
import Loading from '../../components/layouts/LoadingPage';
import CoursePreview from '../../components/UI/CoursePreview';

const CourseQuery = (id) => gql`
  query ResumeQuery {
    course(id: ${id}) {
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

export default function Curso() {
  const router = useRouter();
  const { id } = router.query;

  const { data, error, loading } = useQuery(CourseQuery(id));
  if (error) return <span>Error in backend...</span>;
  if (loading) return <Loading />;

  return (
    <>
      <Head>
        <title>Curso {id} | Crashcourse</title>
      </Head>
      <Header />
      <main>
        <div>
          <StyledH2>{data.course.name}</StyledH2>
          <p>
            Body 3- Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id
            mi, mauris aliquam phasellus quis semper diam fringilla. Nunc nullam
            est in non. Enim sapien amet ut pharetra. Purus sagittis est felis
            sapien in. Auctor tellus, in mauris mi, facilisi arcu sedut.
          </p>
          <CourseStats
            level={data.course.level}
            users={data.course.users}
            course_score={data.course.score}
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
          <CoursePreview props={data.course} />
        </div>
      </main>
    </>
  );
}

// export async function getStaticPaths() {
//   // Return a list of possible value for id
// }

// export async function getStaticProps({ params }) {
//   // Fetch necessary data for the blog post using params.id
// }

import Head from 'next/head';
import { useQuery, gql } from '@apollo/client';
import Header from '../../components/layouts/Header';
import { StyledH2 } from '../../components/UI/Title';
import CourseStats from '../../components/UI/CourseStats';
import Button from '../../components/UI/Button';
import Loading from '../../components/layouts/LoadingPage';
import CourseCost from '../../components/UI/CourseCost';

const CourseQuery = gql`
  query ResumeQuery {
    courses {
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
  const { data, error, loading } = useQuery(CourseQuery);

  if (error) return <span>Error in backend...</span>;

  if (loading) return <Loading />;
  return (
    <>
      <Head>
        <title>Curso | Crashcourse</title>
      </Head>
      <Header />
      <main>
        <div>
          <StyledH2>Title H2 - Nombre del curso</StyledH2>
          <p>
            Body 3- Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id
            mi, mauris aliquam phasellus quis semper diam fringilla. Nunc nullam
            est in non. Enim sapien amet ut pharetra. Purus sagittis est felis
            sapien in. Auctor tellus, in mauris mi, facilisi arcu sedut.
          </p>
          <CourseStats />
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
        </div>
        <div>
          <div>
            <span>Ver trailer del curso</span>
          </div>
          <div>
            <CourseCost />
            <Button url={`checkout`} path={`checkout`}>
              Comprar ahora
            </Button>
            <Button ghost>Agregar al carrito</Button>
          </div>
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

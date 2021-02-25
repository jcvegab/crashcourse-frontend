import Head from 'next/head';
import Header from '../../components/layouts/Header';

export default function Curso() {
  return (
    <>
      <Head>
        <title>Curso | Crashcourse</title>
      </Head>
      <Header />
    </>
  );
}

// export async function getStaticPaths() {
//   // Return a list of possible value for id
// }

// export async function getStaticProps({ params }) {
//   // Fetch necessary data for the blog post using params.id
// }

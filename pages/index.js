import Head from 'next/head';
import { useQuery, gql } from '@apollo/client';
import Header from '../components/layouts/Header';
import Main from '../components/layouts/Main';

const ResumeQuery = gql`
  query ResumeQuery {
    categories {
      name
    }
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

export default function Home() {
  const { data, error, loading } = useQuery(ResumeQuery);

  if (error) {
    return <span>Error in backend...</span>;
  }

  if (loading) {
    return (
      <header>
        <h1>Crashcourse</h1>
        <h2>Loading...</h2>
      </header>
    );
  }
  return (
    <>
      <Head>
        <title>Crashcourse</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header></Header>
      <Main></Main>
    </>
  );
}

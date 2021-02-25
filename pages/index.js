import Head from 'next/head';
import Header from '../components/layouts/Header';
import Main from '../components/layouts/Main';

export default function Home() {
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

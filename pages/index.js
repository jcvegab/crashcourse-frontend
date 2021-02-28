import Head from 'next/head';
import Header from '../components/layouts/Header';
import Main from '../components/layouts/Main';
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:8000',
  cache: new InMemoryCache(),
});

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

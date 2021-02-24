import Head from 'next/head';
import styled, { css } from 'styled-components';
import Header from '../components/layouts/Header';
import Main from '../components/layouts/Main';

const AppView = styled.div`
  margin: 0 auto;
  max-width: 1152px;
  overflow: hidden;
`;

export default function Home() {
  return (
    <AppView>
      <Head>
        <title>Crashcourse</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header></Header>
      <Main></Main>
    </AppView>
  );
}

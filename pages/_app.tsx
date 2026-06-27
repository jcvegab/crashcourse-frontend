import { ApolloProvider } from '@apollo/client';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';

import { initializeApollo } from './api/apolloClient';

import type { NormalizedCacheObject } from '@apollo/client';
import type { AppProps } from 'next/app';
import '../styles/_app.css';

type PagePropsWithApollo = {
  initialApolloState?: NormalizedCacheObject;
};

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    box-sizing: border-box;
    font-family: 'Inter';
  }
`;

const theme = {
  colors: {
    transparent: 'transparent',
    white: '#ffffff',
    grayLighter: '#f6f7f9',
    grayLight: '#e8eaf0',
    grayDark: '#8d8d9d',
    baseMain: '#181b32',
    black: '#000000',
  },
};

const AppView = styled.div`
  margin: 0 auto;
  max-width: 1152px;
  overflow: hidden;
`;

function MyApp({ Component, pageProps }: AppProps<PagePropsWithApollo>) {
  const client = initializeApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={client}>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <AppView>
          <Component {...pageProps} />
        </AppView>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default MyApp;

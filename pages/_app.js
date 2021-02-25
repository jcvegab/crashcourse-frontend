import '../styles/_app.css';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';

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

function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <AppView>
          <Component {...pageProps} />
        </AppView>
      </ThemeProvider>
    </>
  );
}

export default MyApp;

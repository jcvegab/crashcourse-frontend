import '../styles/_app.css';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Inter';
  }
`;

const theme = {
  colors: {
    white: '#ffffff',
    grayLighter: '#f6f7f9',
    grayLight: '#e8eaf0',
    grayDark: '#8d8d9d',
    baseMain: '#181b32',
    black: '#000000',
  },
};

function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default MyApp;

import { render as rtlRender } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

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

function Providers({ children }: { children: React.ReactNode }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export function render(ui: React.ReactElement) {
  return rtlRender(ui, { wrapper: Providers });
}

import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      transparent: string;
      white: string;
      grayLighter: string;
      grayLight: string;
      grayDark: string;
      baseMain: string;
      black: string;
    };
  }
}

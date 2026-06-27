import styled, { css } from 'styled-components';

type TitleProps = {
  margin?: string;
  movile?: boolean;
};

const TitlesTemplate = css<TitleProps>`
  margin-bottom: ${(props) => props.margin};
  color: ${({ theme }) => theme.colors.black};
  font-weight: 900;
`;

const StyledH1 = styled.h1<TitleProps>`
  ${TitlesTemplate}
  font-size: 20px;
  line-height: 18px;
  ${(props) =>
    props.movile &&
    css`
      font-size: 18px;
    `};
`;

const StyledH2 = styled.h2<TitleProps>`
  ${TitlesTemplate}
  font-size: 40px;
  line-height: 44px;
  ${(props) =>
    props.movile &&
    css`
      font-size: 32px;
    `};
`;

const StyledH3 = styled.h3<TitleProps>`
  ${TitlesTemplate}
  font-size: 32px;
  line-height: 44px;
  ${(props) =>
    props.movile &&
    css`
      font-size: 24px;
    `};
`;

const StyledH4 = styled.h4<TitleProps>`
  ${TitlesTemplate}
  font-size: 24px;
  line-height: 28px;
  ${(props) =>
    props.movile &&
    css`
      font-size: 20px;
    `};
`;

export { StyledH1, StyledH2, StyledH3, StyledH4 };

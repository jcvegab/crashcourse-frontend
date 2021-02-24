import styled, { css } from 'styled-components';

const TitlesTemplate = css`
  color: ${({ theme }) => theme.colors.black};
  font-weight: 900;
`;

const StyledH2 = styled.h2`
  ${TitlesTemplate}
  font-size: 40px;
  line-height: 44px;
  ${(props) =>
    props.movile &&
    css`
      font-size: 32px;
    `};
`;

const StyledH3 = styled.h3`
  ${TitlesTemplate}
  font-size: 32px;
  line-height: 44px;
  ${(props) =>
    props.movile &&
    css`
      font-size: 24px;
    `};
`;

const StyledH4 = styled.h4`
  ${TitlesTemplate}
  font-size: 24px;
  line-height: 28px;
  ${(props) =>
    props.movile &&
    css`
      font-size: 20px;
    `};
`;

export { StyledH2, StyledH3, StyledH4 };

import styled, { css } from 'styled-components';

const StyledList = styled.div`
  display: flex;
  gap: ${(props) => props.gap};
  ${(props) =>
    props.column &&
    css`
      flex-direction: column;
    `};
`;

export default StyledList;

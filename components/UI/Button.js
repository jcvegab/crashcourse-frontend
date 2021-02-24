import styled, { css } from 'styled-components';

const StyledButton = styled.button`
  padding: 14px 40px;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.baseMain};
  border: 0;
  border-radius: 10px;
  font-weight: 800;
  font-size: 18px;
  line-height: 20px;
  ${(props) =>
    props.ghost &&
    css`
      color: ${({ theme }) => theme.colors.baseMain};
      background-color: ${({ theme }) => theme.colors.white};
      border: 3px solid ${({ theme }) => theme.colors.baseMain};
    `};
`;

export default StyledButton;

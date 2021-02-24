import styled, { css } from 'styled-components';

const StyledButton = styled.button`
  height: ${(props) => props.height || '48px'};
  width: ${(props) => props.width || '100%'};
  padding: 0;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.baseMain};
  border: 0;
  border-radius: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: ${(props) => props.fontSize || '18px'};
  line-height: ${(props) => props.lineHeight || '20px'};
  cursor: pointer;
  ${(props) =>
    props.ghost &&
    css`
      color: ${({ theme }) => theme.colors.baseMain};
      background-color: ${({ theme }) => theme.colors.transparent};
      border: 3px solid ${({ theme }) => theme.colors.baseMain};
    `};
`;

const Button = ({ height, width, fontSize, lineHeight, ghost, children }) => {
  return (
    <StyledButton
      height={height}
      width={width}
      fontSize={fontSize}
      lineHeight={lineHeight}
      ghost={ghost}
    >
      {children}
    </StyledButton>
  );
};
export default Button;

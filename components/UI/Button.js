import styled, { css } from 'styled-components';
import Link from 'next/link';

const StyledButton = styled.a`
  height: ${(props) => props.height || '48px'};
  width: ${(props) => props.width || '100%'};
  padding: 0;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.baseMain};
  border-radius: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: ${(props) => props.fontSize || '18px'};
  line-height: ${(props) => props.lineHeight || '20px'};
  cursor: pointer;
  text-decoration: none;
  user-select: none;
  ${(props) =>
    props.ghost &&
    css`
      color: ${({ theme }) => theme.colors.baseMain};
      background-color: ${({ theme }) => theme.colors.transparent};
      border: 3px solid ${({ theme }) => theme.colors.baseMain};
    `};
`;

const Button = ({
  height,
  width,
  fontSize,
  lineHeight,
  ghost,
  url,
  path,
  children,
}) => {
  return (
    <Link as={url ? `/${url}` : '/'} href={path ? `/${path}` : '/'} passHref>
      <StyledButton
        height={height}
        width={width}
        fontSize={fontSize}
        lineHeight={lineHeight}
        ghost={ghost}
      >
        {children}
      </StyledButton>
    </Link>
  );
};
export default Button;

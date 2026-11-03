import Link from 'next/link';
import styled, { css } from 'styled-components';

import type { ReactNode } from 'react';

type StyledButtonProps = {
  $height?: string;
  $width?: string;
  $fontSize?: string;
  $lineHeight?: string;
  $ghost?: boolean;
};

type ButtonProps = {
  height?: string;
  width?: string;
  fontSize?: string;
  lineHeight?: string;
  ghost?: boolean;
  url?: string;
  children: ReactNode;
};

const StyledButton = styled(Link)<StyledButtonProps>`
  height: ${(props) => props.$height || '48px'};
  width: ${(props) => props.$width || '100%'};
  padding: 0;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.baseMain};
  border-radius: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: ${(props) => props.$fontSize || '18px'};
  line-height: ${(props) => props.$lineHeight || '20px'};
  cursor: pointer;
  text-decoration: none;
  user-select: none;
  ${(props) =>
    props.$ghost &&
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
  children,
}: ButtonProps) => {
  return (
    <StyledButton
      href={url ? `/${url}` : '/'}
      $height={height}
      $width={width}
      $fontSize={fontSize}
      $lineHeight={lineHeight}
      $ghost={ghost}
    >
      {children}
    </StyledButton>
  );
};
export default Button;

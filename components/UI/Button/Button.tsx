import Link from 'next/link';
import styled from 'styled-components';

import type { ButtonProps, ButtonSize, ButtonVariant } from './Button.types';

const SIZE_STYLES: Record<
  ButtonSize,
  { height: string; fontSize: string; lineHeight: string }
> = {
  sm: { height: '40px', fontSize: '16px', lineHeight: '16px' },
  md: { height: '48px', fontSize: '18px', lineHeight: '20px' },
};

type StyledButtonProps = {
  $variant: ButtonVariant;
  $size: ButtonSize;
  $fullWidth: boolean;
};

const StyledButton = styled(Link)<StyledButtonProps>`
  height: ${({ $size }) => SIZE_STYLES[$size].height};
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  padding: 0 24px;
  color: ${({ theme, $variant }) =>
    $variant === 'primary' ? theme.colors.white : theme.colors.baseMain};
  background-color: ${({ theme, $variant }) =>
    $variant === 'primary' ? theme.colors.baseMain : theme.colors.grayLight};
  border: ${({ theme, $variant }) =>
    $variant === 'secondary'
      ? `3px solid ${theme.colors.baseMain}`
      : '3px solid transparent'};
  border-radius: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: ${({ $size }) => SIZE_STYLES[$size].fontSize};
  line-height: ${({ $size }) => SIZE_STYLES[$size].lineHeight};
  cursor: pointer;
  text-decoration: none;
  user-select: none;
`;

export default function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  url,
  children,
}: ButtonProps) {
  return (
    <StyledButton
      href={url ? `/${url}` : '/'}
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
    >
      {children}
    </StyledButton>
  );
}

import Link from 'next/link';
import styled, { css } from 'styled-components';

import type { ButtonProps, ButtonSize, ButtonVariant } from './Button.types';

const SIZE_STYLES: Record<
  ButtonSize,
  { height: string; fontSize: string; lineHeight: string; padding: string }
> = {
  sm: { height: '40px', fontSize: '16px', lineHeight: '16px', padding: '24px' },
  md: { height: '48px', fontSize: '18px', lineHeight: '20px', padding: '40px' },
};

type StyledButtonProps = {
  $variant: ButtonVariant;
  $size: ButtonSize;
  $fullWidth: boolean;
};

const buttonStyles = css<StyledButtonProps>`
  box-sizing: border-box;
  height: ${({ $size }) => SIZE_STYLES[$size].height};
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  padding: 0 ${({ $size }) => SIZE_STYLES[$size].padding};
  color: ${({ theme, $variant }) =>
    $variant === 'primary' ? theme.colors.white : theme.colors.baseMain};
  background-color: ${({ theme, $variant }) =>
    $variant === 'primary' ? theme.colors.baseMain : theme.colors.transparent};
  border: 0;
  box-shadow: ${({ theme, $variant }) =>
    $variant === 'secondary'
      ? `inset 0 0 0 3px ${theme.colors.baseMain}`
      : 'none'};
  border-radius: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-family: inherit;
  letter-spacing: 0.4px;
  text-align: center;
  white-space: nowrap;
  font-size: ${({ $size }) => SIZE_STYLES[$size].fontSize};
  line-height: ${({ $size }) => SIZE_STYLES[$size].lineHeight};
  cursor: pointer;
  text-decoration: none;
  user-select: none;

  &:disabled {
    cursor: not-allowed;
  }
`;

const StyledButton = styled.button<StyledButtonProps>`${buttonStyles}`;
const StyledLink = styled(Link)<StyledButtonProps>`${buttonStyles}`;

export default function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  children,
  ...props
}: ButtonProps) {
  if (typeof props.href === 'string') {
    return (
      <StyledLink
        {...props}
        $variant={variant}
        $size={size}
        $fullWidth={fullWidth}
      >
        {children}
      </StyledLink>
    );
  }

  return (
    <StyledButton
      type="button"
      {...props}
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
    >
      {children}
    </StyledButton>
  );
}

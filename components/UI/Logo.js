import styled from 'styled-components';
import { StyledH1 } from './Title';
import Link from 'next/link';

const StyledLogo = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
`;

export default function Logo() {
  return (
    <Link prefetch href="/" passHref>
      <StyledLogo>
        <img src="/logo.svg" alt="Crashcourse"></img>
        <StyledH1>Crashcourse</StyledH1>
      </StyledLogo>
    </Link>
  );
}

import styled from 'styled-components';
import { StyledH1 } from './Title';
import Link from 'next/link';

const StyledLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export default function Logo() {
  return (
    <StyledLogo>
      <Link href="/">
        <img src="/logo.svg" alt="Crashcourse"></img>
      </Link>
      <StyledH1>Crashcourse</StyledH1>
    </StyledLogo>
  );
}

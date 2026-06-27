import Link from 'next/link';
import styled from 'styled-components';

import { StyledH1 } from './Title';

const StyledLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  cursor: pointer;
`;

export default function Logo() {
  return (
    <Link href="/">
      <StyledLogo>
        <img src="/logo.svg" alt="Crashcourse"></img>
        <StyledH1>Crashcourse</StyledH1>
      </StyledLogo>
    </Link>
  );
}

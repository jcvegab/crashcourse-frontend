import styled from 'styled-components';
import { StyledH1 } from './Title';
import Link from 'next/link';

const StyledLogo = styled.header``;

export default function Logo() {
  return (
    <div>
      <Link href="/">
        <img src="/logo.svg" alt="Crashcourse"></img>
      </Link>
      <StyledH1>Crashcourse</StyledH1>
    </div>
  );
}

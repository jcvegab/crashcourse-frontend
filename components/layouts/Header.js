import styled from 'styled-components';
import StyledButton from '../UI/Button';
import Link from 'next/link';

const HeaderTemplate = styled.header``;

export default function Header() {
  return (
    <HeaderTemplate>
      <Link href="/">
        <img src="/logo.svg" alt="Crashcourse"></img>
      </Link>
      Crashcourse
      <StyledButton ghost>Regístrate gratis</StyledButton>
    </HeaderTemplate>
  );
}

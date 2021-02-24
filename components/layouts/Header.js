import styled from 'styled-components';
import StyledButton from '../UI/Button';
import Logo from '../UI/Logo';

const HeaderTemplate = styled.header``;

export default function Header() {
  return (
    <HeaderTemplate>
      <Logo></Logo>
      <StyledButton ghost>Regístrate gratis</StyledButton>
    </HeaderTemplate>
  );
}

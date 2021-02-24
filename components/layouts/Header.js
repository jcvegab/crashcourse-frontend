import styled from 'styled-components';
import StyledButton from '../UI/Button';
import Logo from '../UI/Logo';

const HeaderTemplate = styled.header`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
`;

export default function Header() {
  return (
    <HeaderTemplate>
      <Logo />
      <StyledButton ghost>Regístrate gratis</StyledButton>
    </HeaderTemplate>
  );
}

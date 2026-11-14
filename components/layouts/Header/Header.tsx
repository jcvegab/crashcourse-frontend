import styled from 'styled-components';

import Button from '@/ui/Button';
import Logo from '@/ui/Logo';

const HeaderTemplate = styled.header`
  margin-bottom: 16px;
  padding: 16px 0;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default function Header() {
  return (
    <HeaderTemplate>
      <Logo />
      <Button variant="secondary" size="sm">
        Regístrate gratis
      </Button>
    </HeaderTemplate>
  );
}

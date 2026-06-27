import styled from 'styled-components';

import Button from '@/ui/Button';
import Logo from '@/ui/Logo';

const HeaderTemplate = styled.header`
  padding: 16px 0;
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
`;

export default function Header() {
  return (
    <HeaderTemplate>
      <Logo />
      <Button
        width="187px"
        height="40px"
        fontSize="16px"
        lineHeight="16px"
        ghost
      >
        Regístrate gratis
      </Button>
    </HeaderTemplate>
  );
}

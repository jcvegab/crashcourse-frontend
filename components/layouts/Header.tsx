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

import styled from 'styled-components';

import Spinner from '@/ui/Spinner';
import { StyledH2, StyledH3 } from '@/ui/Title';

const StyledLoading = styled.div`
  padding: 100px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 45px;
`;

export default function LoadingPage() {
  return (
    <StyledLoading aria-live="polite">
      <StyledH2>Crashcourse</StyledH2>
      <Spinner />
      <StyledH3>Cargando...</StyledH3>
    </StyledLoading>
  );
}

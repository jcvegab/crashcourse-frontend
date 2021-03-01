import styled from 'styled-components';
import { StyledH2, StyledH3 } from '../UI/Title';
import Spinner from '../UI/Spinner';

const StyledLoading = styled.div`
  padding: 100px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 45px;
`;

export default function Loading() {
  return (
    <StyledLoading>
      <StyledH2>Crashcourse</StyledH2>
      <Spinner />
      <StyledH3>Loading...</StyledH3>
    </StyledLoading>
  );
}

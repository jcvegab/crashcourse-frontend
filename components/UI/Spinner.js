import styled, { keyframes } from 'styled-components';

const SpinnerAnimation = keyframes`
  0% { transform: rotate(0deg);}
  100% { transform: rotate(360deg);}
`;

const StyledSpinner = styled.div`
  border: 10px solid rgb(0, 0, 0, 0.1);
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border-left-color: ${({ theme }) => theme.colors.baseMain};
  animation: ${SpinnerAnimation} 1s ease infinite;
`;

export default function Spinner() {
  return <StyledSpinner></StyledSpinner>;
}

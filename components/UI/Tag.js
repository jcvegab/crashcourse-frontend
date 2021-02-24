import styled from 'styled-components';

const StyledTag = styled.div`
  width: fit-content;
  padding: 4px 8px;
  color: ${({ theme }) => theme.colors.white};
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.grayDark};
  font-weight: 700;
  font-size: 12px;
  line-height: 16px;
  text-transform: uppercase;
`;

export default function Tag({ children }) {
  return <StyledTag>{children}</StyledTag>;
}

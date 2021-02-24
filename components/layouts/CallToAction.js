import styled from 'styled-components';
import { StyledH2 } from '../UI/Title';
import StyledButton from '../UI/Button';

const SectionTemplate = styled.section`
  margin-bottom: 56px;
  padding: 72px 196px;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.grayLighter};
  border-radius: 10px;
  white-space: pre-line;
`;

export default function CallToAction() {
  return (
    <SectionTemplate>
      <StyledH2>{`Title H2 - 
      banner cursos nuevos`}</StyledH2>
      <StyledButton margin="24px 0 0" width="218px">
        Comprar ahora
      </StyledButton>
    </SectionTemplate>
  );
}

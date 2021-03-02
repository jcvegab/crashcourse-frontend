import styled from 'styled-components';
import { StyledH2 } from '../UI/Title';
import Button from '../UI/Button';

const SectionTemplate = styled.section`
  margin-bottom: 56px;
  padding: 72px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.grayLighter};
  border-radius: 10px;
  white-space: pre-line;

  @media only screen and (max-width: 1024px) {
    border-radius: 0;
  }
`;

export default function CallToAction() {
  return (
    <SectionTemplate>
      <StyledH2 margin="24px">{`Title H2 - 
      banner cursos nuevos`}</StyledH2>
      <Button width="218px">Comprar ahora</Button>
    </SectionTemplate>
  );
}

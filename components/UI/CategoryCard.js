import styled from 'styled-components';

const CategoryCard = styled.div`
  width: 120px;
  height: 112px;
  padding: 22px 26px;
  color: ${({ theme }) => theme.colors.black};
  background-color: ${({ theme }) => theme.colors.grayLighter};
  border-radius: 10px;
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
`;

export default CategoryCard;

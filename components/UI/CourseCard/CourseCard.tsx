import styled from 'styled-components';

import type { CourseCardRootProps } from './CourseCard.types';

const CardContainer = styled.article`
  width: 270px;
`;

const CardMedia = styled.div`
  height: 160px;
  padding: 8px;
  border-radius: 10px 10px 0 0;
  background-color: ${({ theme }) => theme.colors.grayLight};
`;

const CardBody = styled.div`
  height: 208px;
  padding: 16px;
  border-radius: 0 0 10px 10px;
  background-color: ${({ theme }) => theme.colors.grayLighter};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const CardTitle = styled.h5`
  color: ${({ theme }) => theme.colors.baseMain};
  font-weight: bold;
  font-size: 16px;
  line-height: 20px;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const CardTutor = styled.p`
  font-size: 14px;
  line-height: 20px;
`;

const CardActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

function Root({ children, ...props }: CourseCardRootProps) {
  return <CardContainer {...props}>{children}</CardContainer>;
}

const CourseCard = Object.assign(Root, {
  Root,
  Media: CardMedia,
  Body: CardBody,
  Info: CardInfo,
  Title: CardTitle,
  Tutor: CardTutor,
  Actions: CardActions,
});

export default CourseCard;

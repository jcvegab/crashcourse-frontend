import styled from 'styled-components';

import type { CourseDetailRootProps } from './CourseDetail.types';

const DetailContainer = styled.section`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 465px;
  grid-template-areas:
    'overview media'
    'overview purchase';
  align-items: start;
  column-gap: 32px;
  max-width: 1152px;
  margin: 0 auto;

  @media only screen and (max-width: 767px) {
    grid-template-columns: minmax(0, 1fr);
    grid-template-areas:
      'media'
      'overview'
      'purchase';
    row-gap: 24px;
    width: 100%;
    max-width: none;
  }
`;

const Overview = styled.div`
  grid-area: overview;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media only screen and (max-width: 767px) {
    gap: 16px;
    box-sizing: border-box;
    padding: 0 20px;
  }
`;

const Media = styled.div`
  grid-area: media;
  width: 465px;
  height: 274px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.black};

  @media only screen and (max-width: 767px) {
    width: 100%;
    height: 190px;
  }
`;

const Heading = styled.h1`
  color: ${({ theme }) => theme.colors.baseMain};
  font-size: 40px;
  font-weight: 900;
  line-height: 44px;

  @media only screen and (max-width: 767px) {
    font-size: 32px;
  }
`;

const Summary = styled.p`
  font-size: 16px;
  line-height: 24px;
`;

const Stats = styled.div``;

const Instructor = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 16px;

  @media only screen and (max-width: 767px) {
    margin-top: 24px;
  }
`;

const InstructorAvatar = styled.div`
  width: 64px;
  height: 64px;
  flex: 0 0 64px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.grayLight};
`;

const InstructorInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const InstructorName = styled.p`
  font-size: 16px;
  font-weight: 700;
  line-height: 20px;
`;

const InstructorRole = styled.p`
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
`;

const Purchase = styled.div`
  grid-area: purchase;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 24px;
  border-radius: 0 0 10px 10px;
  background-color: ${({ theme }) => theme.colors.grayLight};
`;

const PriceSlot = styled.div`
  min-height: 54px;
  display: flex;
  align-items: center;

  @media only screen and (max-width: 767px) {
    display: none;
  }
`;

const MobilePriceSlot = styled.div`
  display: none;
  align-items: center;
  min-height: 32px;

  @media only screen and (max-width: 767px) {
    display: flex;
  }
`;

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media only screen and (max-width: 767px) {
    gap: 24px;
  }
`;

function Root({ children, ...props }: CourseDetailRootProps) {
  return <DetailContainer {...props}>{children}</DetailContainer>;
}

const CourseDetail = Object.assign(Root, {
  Root,
  Media,
  Overview,
  Heading,
  Summary,
  Stats,
  Instructor,
  InstructorAvatar,
  InstructorInfo,
  InstructorName,
  InstructorRole,
  Purchase,
  Price: PriceSlot,
  MobilePrice: MobilePriceSlot,
  Actions,
});

export default CourseDetail;

import styled from 'styled-components';

import type { CourseStatsProps } from './CourseStats.types';

const StatsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const StatsIcon = styled.img`
  width: 16px;
  height: 16px;
`;

const StatsItem = styled.div`
  display: flex;
  align-items: center;
`;

const StatsText = styled.span`
  margin-left: 4px;
  font-weight: bold;
  font-size: 12px;
  line-height: 16px;
  color: ${({ theme }) => theme.colors.grayDark};
`;

export default function CourseStats({
  level,
  users,
  course_score,
}: CourseStatsProps) {
  return (
    <StatsContainer>
      <StatsItem>
        <StatsIcon src="/icons/bar-chart.svg" alt="" aria-hidden="true" />
        <StatsText>Nivel {level}</StatsText>
      </StatsItem>
      <StatsItem>
        <StatsIcon src="/icons/people.svg" alt="" aria-hidden="true" />
        <StatsText>{users} Usuarios</StatsText>
      </StatsItem>
      <StatsItem>
        <StatsIcon src="/icons/star.svg" alt="" aria-hidden="true" />
        <StatsText>{course_score}</StatsText>
      </StatsItem>
    </StatsContainer>
  );
}

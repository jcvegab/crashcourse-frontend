import styled from 'styled-components';

const StatsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const StatsIcon = styled.img`
  width: 16px;
  height: 16px;
`;

const StatsText = styled.span`
  margin-left: 4px;
  font-weight: bold;
  font-size: 12px;
  line-height: 16px;
  color: ${({ theme }) => theme.colors.grayDark};
`;

type CourseStatsProps = {
  level: string;
  users: number;
  course_score: number;
};

export default function CourseStats({
  level,
  users,
  course_score,
}: CourseStatsProps) {
  return (
    <StatsContainer>
      <div className="flex items-center">
        <StatsIcon src="/icons/bar-chart.svg" alt="" aria-hidden="true" />
        <StatsText>Nivel {level}</StatsText>
      </div>
      <div className="flex items-center">
        <StatsIcon src="/icons/people.svg" alt="" aria-hidden="true" />
        <StatsText>{users} Usuarios</StatsText>
      </div>
      <div className="flex items-center">
        <StatsIcon src="/icons/star.svg" alt="" aria-hidden="true" />
        <StatsText>{course_score}</StatsText>
      </div>
    </StatsContainer>
  );
}

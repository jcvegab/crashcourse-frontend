import styled from 'styled-components';

const StatsContainer = styled.div`
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

export default function CourseStats({ level, users, course_score }) {
  return (
    <StatsContainer className="flex items-center">
      <div className="flex items-center">
        <StatsIcon src="/icons/bar-chart.svg" />
        <StatsText>Nivel {level}</StatsText>
      </div>
      <div className="flex items-center">
        <StatsIcon src="/icons/people.svg" />
        <StatsText>{users} Usuarios</StatsText>
      </div>
      <div className="flex items-center">
        <StatsIcon src="/icons/star.svg" />
        <StatsText>{course_score}</StatsText>
      </div>
    </StatsContainer>
  );
}

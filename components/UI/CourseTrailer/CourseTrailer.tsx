import Image from 'next/image';
import styled from 'styled-components';

const TrailerPrompt = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  color: ${({ theme }) => theme.colors.white};
  font-size: 20px;
  font-weight: 900;
  line-height: 28px;
  letter-spacing: 0.1px;
  text-align: center;
`;

const PlayIcon = styled(Image)`
  width: 33px;
  height: 33px;
`;

export default function CourseTrailer() {
  return (
    <TrailerPrompt>
      <PlayIcon
        src="/icons/play.svg"
        alt=""
        aria-hidden="true"
        width={33}
        height={33}
        unoptimized
      />
      <span>Ver Trailer del curso</span>
    </TrailerPrompt>
  );
}

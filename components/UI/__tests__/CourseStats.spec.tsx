import { screen } from '@testing-library/react';

import { render } from '../../../test/test-utils';
import CourseStats from '../CourseStats';

describe('CourseStats', () => {
  it('renders level, users and score', () => {
    render(<CourseStats level="Avanzado" users={120} course_score={4.8} />);

    expect(screen.getByText('Nivel Avanzado')).toBeInTheDocument();
    expect(screen.getByText('120 Usuarios')).toBeInTheDocument();
    expect(screen.getByText('4.8')).toBeInTheDocument();
  });

  it('renders icons with hidden aria', () => {
    const { container } = render(
      <CourseStats level="Básico" users={10} course_score={3.5} />,
    );

    const images = container.querySelectorAll('img');
    expect(images).toHaveLength(3);
  });
});

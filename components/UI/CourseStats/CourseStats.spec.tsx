import { screen } from '@testing-library/react';

import { render } from '@/test/test-utils';
import CourseStats from '.';

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
    images.forEach((image) => {
      expect(image).toHaveAttribute('alt', '');
      expect(image).toHaveAttribute('aria-hidden', 'true');
    });
  });

  it('renders zero users and score', () => {
    render(<CourseStats level="Inicial" users={0} course_score={0} />);

    expect(screen.getByText('Nivel Inicial')).toBeInTheDocument();
    expect(screen.getByText('0 Usuarios')).toBeInTheDocument();
    expect(screen.getByText('0', { exact: true })).toBeInTheDocument();
  });
});

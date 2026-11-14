import { screen } from '@testing-library/react';

import { render } from '@/test/test-utils';
import CourseCard from '.';

vi.mock('next/link', () => ({
  default: function Link({
    children,
    href,
    className,
  }: {
    children: React.ReactNode;
    href: string;
    className?: string;
  }) {
    return (
      <a className={className} href={href}>
        {children}
      </a>
    );
  },
}));

const course = {
  id: '42',
  name: 'React para equipos',
  tutorUsername: 'Ana Vega',
  level: 'Avanzado',
  users: 120,
  score: 4.8,
  price: 99,
  realPrice: 199,
  category: { name: 'Programación' },
};

describe('CourseCard', () => {
  it('renders course details, price, stats, and tag', () => {
    render(<CourseCard course={course} />);

    expect(
      screen.getByRole('heading', { level: 5, name: course.name }),
    ).toBeInTheDocument();
    expect(screen.getByText(course.tutorUsername)).toBeInTheDocument();
    expect(screen.getByText('Nivel Avanzado')).toBeInTheDocument();
    expect(screen.getByText('120 Usuarios')).toBeInTheDocument();
    expect(screen.getByText('4.8')).toBeInTheDocument();
    expect(
      screen.getByRole('group', { name: /Precio actual: COP\s+99/ }),
    ).toHaveAccessibleName(/antes COP\s+199/);
    expect(screen.getByText('Tag venta')).toBeInTheDocument();
  });

  it('links the purchase action to the course detail route', () => {
    render(<CourseCard course={course} />);

    expect(screen.getByRole('link', { name: 'Comprar ahora' })).toHaveAttribute(
      'href',
      '/cursos/42',
    );
  });
});

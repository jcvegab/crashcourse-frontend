import { screen } from '@testing-library/react';

import type React from 'react';

import { render } from '@/test/test-utils';
import CoursesList from '.';

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

const courses = [
  {
    id: 'react',
    name: 'React',
    tutorUsername: 'Ana',
    level: 'Avanzado',
    users: 120,
    score: 4.8,
    price: 99,
    realPrice: 199,
    category: { name: 'Programación' },
  },
  {
    id: 'design',
    name: 'Diseño',
    tutorUsername: 'Luis',
    level: 'Inicial',
    users: 50,
    score: 4.5,
    price: 49,
    realPrice: 99,
    category: { name: 'Diseño' },
  },
];

describe('CoursesList', () => {
  it('renders the heading and course cards in input order', () => {
    render(<CoursesList courses={courses} />);

    expect(
      screen.getByRole('heading', {
        level: 4,
        name: 'Title H4 - Listado de cursos',
      }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole('heading', { level: 5 })).toHaveLength(2);
    expect(
      screen
        .getAllByRole('heading', { level: 5 })
        .map((heading) => heading.textContent),
    ).toEqual(['React', 'Diseño']);
  });

  it('renders each course detail purchase destination', () => {
    render(<CoursesList courses={courses} />);

    const purchaseLinks = screen.getAllByRole('link', {
      name: 'Comprar ahora',
    });
    expect(purchaseLinks).toHaveLength(2);
    expect(purchaseLinks[0]).toHaveAttribute('href', '/cursos/react');
    expect(purchaseLinks[1]).toHaveAttribute('href', '/cursos/design');
  });

  it('renders the heading and an empty grid when there are no courses', () => {
    const { container } = render(<CoursesList courses={[]} />);

    expect(
      screen.getByRole('heading', {
        level: 4,
        name: 'Title H4 - Listado de cursos',
      }),
    ).toBeInTheDocument();
    expect(container.querySelector('section > div')).toBeEmptyDOMElement();
  });
});

import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { render } from '@/test/test-utils';
import Main from '.';

const mockCategories = [
  { name: 'Programación' },
  { name: 'Diseño' },
  { name: 'Ciencia' },
];

const mockCourses = [
  {
    id: '1',
    name: 'React',
    tutorUsername: 'John',
    level: 'Avanzado',
    users: 100,
    score: 4.8,
    price: 99,
    realPrice: 199,
    category: { name: 'Programación' },
  },
  {
    id: '2',
    name: 'Figma',
    tutorUsername: 'Jane',
    level: 'Básico',
    users: 50,
    score: 4.5,
    price: 49,
    realPrice: 99,
    category: { name: 'Diseño' },
  },
];

describe('Main', () => {
  it('renders all courses by default', () => {
    render(<Main categories={mockCategories} courses={mockCourses} />);

    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Figma')).toBeInTheDocument();
  });

  it('filters courses by category', async () => {
    render(<Main categories={mockCategories} courses={mockCourses} />);

    await userEvent.click(screen.getByText('Programación'));

    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.queryByText('Figma')).not.toBeInTheDocument();
  });

  it('resets filter when clicking same category', async () => {
    render(<Main categories={mockCategories} courses={mockCourses} />);

    await userEvent.click(screen.getByText('Programación'));
    await userEvent.click(screen.getByText('Programación'));

    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Figma')).toBeInTheDocument();
  });

  it('switches from one selected category to another', async () => {
    render(<Main categories={mockCategories} courses={mockCourses} />);

    await userEvent.click(screen.getByText('Programación'));
    await userEvent.click(screen.getByText('Diseño'));

    expect(screen.queryByText('React')).not.toBeInTheDocument();
    expect(screen.getByText('Figma')).toBeInTheDocument();
  });

  it('renders no course cards for a category with no matching courses', async () => {
    render(<Main categories={mockCategories} courses={mockCourses} />);

    await userEvent.click(screen.getByText('Ciencia'));

    expect(screen.queryByRole('heading', { level: 5 })).not.toBeInTheDocument();
    expect(
      screen.getByText('Title H4 - Listado de cursos'),
    ).toBeInTheDocument();
  });
});

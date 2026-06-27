import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { render } from '../../../test/test-utils';
import Main from '../Main';

const mockCategories = [{ name: 'Programación' }, { name: 'Diseño' }];

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
});

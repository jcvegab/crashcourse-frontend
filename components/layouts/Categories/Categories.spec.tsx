import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { render } from '@/test/test-utils';
import Categories from '.';

const categories = [{ name: 'Programación' }, { name: 'Diseño' }];

describe('Categories', () => {
  it('renders the heading, labeled list, and categories', () => {
    render(<Categories categories={categories} onSelect={() => {}} />);

    expect(
      screen.getByRole('heading', {
        level: 4,
        name: 'Title H4 - Categorias',
      }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText('Categorias de cursos')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Programación/ }),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Diseño/ })).toBeInTheDocument();
  });

  it('forwards the selected category to onSelect', async () => {
    const onSelect = vi.fn();
    render(<Categories categories={categories} onSelect={onSelect} />);

    await userEvent.click(screen.getByRole('button', { name: /Diseño/ }));

    expect(onSelect).toHaveBeenCalledWith('Diseño');
  });

  it('renders an empty labeled list when there are no categories', () => {
    render(<Categories categories={[]} onSelect={() => {}} />);

    expect(screen.getByLabelText('Categorias de cursos')).toBeEmptyDOMElement();
    expect(
      screen.getByRole('heading', { level: 4, name: 'Title H4 - Categorias' }),
    ).toBeInTheDocument();
  });
});

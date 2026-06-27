import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { render } from '../../../test/test-utils';
import CategoryCard from '../CategoryCard';

describe('CategoryCard', () => {
  it('renders category name', () => {
    render(<CategoryCard category="Programación" onSelect={() => {}} />);

    expect(screen.getByText('Programación')).toBeInTheDocument();
  });

  it('calls onSelect when clicked', async () => {
    const onSelect = vi.fn();
    render(<CategoryCard category="Diseño" onSelect={onSelect} />);

    await userEvent.click(screen.getByRole('button'));

    expect(onSelect).toHaveBeenCalledWith('Diseño');
  });

  it('has accessible image alt', () => {
    render(<CategoryCard category="Marketing" onSelect={() => {}} />);

    expect(screen.getByAltText('Categoria Marketing')).toBeInTheDocument();
  });
});

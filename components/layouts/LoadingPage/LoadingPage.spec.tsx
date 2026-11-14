import { screen } from '@testing-library/react';

import { render } from '@/test/test-utils';
import LoadingPage from '.';

describe('LoadingPage', () => {
  it('renders the brand and loading message in a polite live region', () => {
    render(<LoadingPage />);

    expect(
      screen.getByRole('heading', { level: 2, name: 'Crashcourse' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 3, name: 'Cargando...' }),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Cargando...').closest('[aria-live]'),
    ).toHaveAttribute('aria-live', 'polite');
  });

  it('renders an accessible loading status', () => {
    render(<LoadingPage />);

    expect(
      screen.getByRole('status', { name: 'Cargando' }),
    ).toBeInTheDocument();
  });
});

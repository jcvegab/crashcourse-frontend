import { screen } from '@testing-library/react';

import { render } from '../../../test/test-utils';
import Spinner from '../Spinner';

describe('Spinner', () => {
  it('renders with status role', () => {
    render(<Spinner />);

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('has accessible label', () => {
    render(<Spinner />);

    expect(screen.getByLabelText('Cargando')).toBeInTheDocument();
  });
});

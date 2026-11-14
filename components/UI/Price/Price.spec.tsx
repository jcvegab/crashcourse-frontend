import { screen } from '@testing-library/react';

import { render } from '@/test/test-utils';
import Price from '.';

describe('Price', () => {
  it('formats Colombian pesos using the shared locale defaults', () => {
    const { container } = render(
      <Price amount={349929} compareAtAmount={499000} />,
    );

    expect(screen.getByRole('group')).toHaveAccessibleName(
      /Precio actual: COP\s+349\.929, antes COP\s+499\.000/,
    );
    expect(container.querySelector('[aria-hidden="true"]')).toHaveTextContent(
      /COP\s+349\.929/,
    );
    expect(screen.getByText(/COP\s+499\.000/)).toBeInTheDocument();
  });

  it('preserves decimals and supports an explicit currency and locale', () => {
    render(<Price amount={14.99} currency="USD" locale="en-US" />);

    expect(screen.getByRole('group')).toHaveAccessibleName(
      /Precio: USD\s+14\.99/,
    );
  });

  it('formats decimal amounts serialized by GraphQL as strings', () => {
    render(<Price amount="14.00" compareAtAmount="53.00" />);

    expect(screen.getByRole('group')).toHaveAccessibleName(
      'Precio actual: COP 14, antes COP 53',
    );
  });

  it('keeps the currency code after the amount in locales that format it there', () => {
    render(<Price amount={14.99} currency="USD" locale="de-DE" />);

    expect(screen.getByRole('group')).toHaveAccessibleName(
      /Precio: 14,99\s+USD/,
    );
  });

  it('shows zero and does not show a comparison without a real discount', () => {
    render(<Price amount={0} compareAtAmount={0} />);

    expect(screen.getByRole('group')).toHaveAccessibleName('Precio: COP 0');
    expect(screen.queryByText(/COP.*0/)).not.toBeInTheDocument();
  });

  it('does not show an equal or lower comparison amount', () => {
    const { container, rerender } = render(
      <Price amount={99} compareAtAmount={99} />,
    );

    expect(screen.getByRole('group')).toHaveAccessibleName('Precio: COP 99');
    expect(container.querySelector('del')).not.toBeInTheDocument();

    rerender(<Price amount={99} compareAtAmount={50} />);

    expect(screen.getByRole('group')).toHaveAccessibleName('Precio: COP 99');
    expect(container.querySelector('del')).not.toBeInTheDocument();
  });

  it('supports the large visual size', () => {
    render(<Price amount={99} compareAtAmount={199} size="large" />);

    expect(screen.getByRole('group')).toHaveAccessibleName(
      'Precio actual: COP 99, antes COP 199',
    );
  });

  it.each([Number.NaN, Number.POSITIVE_INFINITY, -1, '', 'invalid'])(
    'renders invalid current price %s as unavailable without a discount',
    (amount) => {
      render(<Price amount={amount} compareAtAmount={199} />);

      expect(screen.getByText('Precio no disponible')).toBeInTheDocument();
      expect(screen.queryByRole('group')).not.toBeInTheDocument();
    },
  );
});

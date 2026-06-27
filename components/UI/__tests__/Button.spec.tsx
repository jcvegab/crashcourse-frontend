import { screen } from '@testing-library/react';
import React from 'react';

import { render } from '../../../test/test-utils';
import Button from '../Button';

vi.mock('next/link', () => ({
  default: function Link({
    children,
    as,
    href,
  }: {
    children: React.ReactElement;
    as?: string;
    href: string;
  }) {
    const resolvedHref = as && as !== '/' ? as : href;
    return React.cloneElement(children, { href: resolvedHref } as Record<
      string,
      unknown
    >);
  },
}));

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>);

    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('renders as ghost variant', () => {
    render(<Button ghost>Outline</Button>);

    expect(screen.getByText('Outline')).toBeInTheDocument();
  });

  it('links to provided path', () => {
    const { container } = render(<Button path="checkout">Checkout</Button>);

    expect(container.querySelector('a')).toHaveAttribute('href', '/checkout');
  });
});

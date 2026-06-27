import { screen } from '@testing-library/react';

import { render } from '../../../test/test-utils';
import Button from '../Button';

import type React from 'react';

vi.mock('next/link', () => ({
  default: function Link({
    children,
    as,
    href,
  }: {
    children: React.ReactNode;
    as?: string;
    href: string;
  }) {
    const resolvedHref = as && as !== '/' ? as : href;
    return <a href={resolvedHref}>{children}</a>;
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

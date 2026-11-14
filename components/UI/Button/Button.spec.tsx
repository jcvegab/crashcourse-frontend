import { screen } from '@testing-library/react';

import { render } from '../../../test/test-utils';

import Button from '.';

vi.mock('next/link', () => ({
  default: function Link({
    children,
    as,
    href,
    className,
  }: {
    children: React.ReactNode;
    as?: string;
    href: string;
    className?: string;
  }) {
    const resolvedHref = as && as !== '/' ? as : href;
    return (
      <a className={className} href={resolvedHref}>
        {children}
      </a>
    );
  },
}));

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>);

    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('renders the secondary variant', () => {
    render(<Button variant="secondary">Outline</Button>);

    expect(screen.getByRole('link', { name: 'Outline' })).toHaveStyle({
      backgroundColor: 'rgb(232, 234, 240)',
      border: '3px solid rgb(24, 27, 50)',
    });
  });

  it('renders the small size', () => {
    render(<Button size="sm">Small</Button>);

    expect(screen.getByRole('link', { name: 'Small' })).toHaveStyle({
      height: '40px',
      fontSize: '16px',
      lineHeight: '16px',
    });
  });

  it('fills its container when fullWidth is set', () => {
    render(<Button fullWidth>Full width</Button>);

    expect(screen.getByRole('link', { name: 'Full width' })).toHaveStyle({
      width: '100%',
    });
  });

  it('links to provided path', () => {
    const { container } = render(<Button url="checkout">Checkout</Button>);

    expect(container.querySelector('a')).toHaveAttribute('href', '/checkout');
  });
});

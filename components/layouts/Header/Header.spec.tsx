import { screen } from '@testing-library/react';

import type React from 'react';

import { render } from '@/test/test-utils';
import Header from '.';

vi.mock('next/link', () => ({
  default: function Link({
    children,
    href,
    className,
  }: {
    children: React.ReactNode;
    href: string;
    className?: string;
  }) {
    return (
      <a className={className} href={href}>
        {children}
      </a>
    );
  },
}));

describe('Header', () => {
  it('renders the Crashcourse brand and links it to home', () => {
    render(<Header />);

    expect(screen.getByAltText('Crashcourse')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 1, name: 'Crashcourse' }),
    ).toBeInTheDocument();
    expect(screen.getByAltText('Crashcourse').closest('a')).toHaveAttribute(
      'href',
      '/',
    );
  });

  it('renders the small secondary registration link at its current destination', () => {
    render(<Header />);

    expect(
      screen.getByRole('link', { name: 'Regístrate gratis' }),
    ).toHaveAttribute('href', '/');
    expect(screen.getAllByRole('link')).toHaveLength(2);
  });
});

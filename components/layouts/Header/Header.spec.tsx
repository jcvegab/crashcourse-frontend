import { screen } from '@testing-library/react';

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

  it('renders registration as a button without an implicit home link', () => {
    render(<Header />);

    expect(
      screen.getByRole('button', { name: 'Regístrate gratis' }),
    ).not.toHaveAttribute('href');
    expect(screen.getAllByRole('link')).toHaveLength(1);
  });
});

import { screen } from '@testing-library/react';

import { render } from '../../../test/test-utils';
import Logo from '../Logo';

import type React from 'react';

vi.mock('next/link', () => ({
  default: function Link({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) {
    return <a href={href}>{children}</a>;
  },
}));

describe('Logo', () => {
  it('renders logo image with alt text', () => {
    render(<Logo />);

    expect(screen.getByAltText('Crashcourse')).toBeInTheDocument();
  });

  it('renders brand name', () => {
    render(<Logo />);

    expect(screen.getByText('Crashcourse')).toBeInTheDocument();
  });

  it('links to home', () => {
    const { container } = render(<Logo />);

    expect(container.querySelector('a')).toHaveAttribute('href', '/');
  });
});

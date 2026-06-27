import { screen } from '@testing-library/react';
import React from 'react';

import { render } from '../../../test/test-utils';
import Logo from '../Logo';

vi.mock('next/link', () => ({
  default: function Link({
    children,
    href,
  }: {
    children: React.ReactElement;
    href: string;
  }) {
    return React.cloneElement(children, { href } as Record<string, unknown>);
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

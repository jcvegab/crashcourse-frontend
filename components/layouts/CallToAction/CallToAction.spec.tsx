import { screen } from '@testing-library/react';

import type React from 'react';

import { render } from '@/test/test-utils';
import CallToAction from '.';

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

describe('CallToAction', () => {
  it('renders the banner heading inside a section', () => {
    const { container } = render(<CallToAction />);

    expect(
      screen.getByRole('heading', {
        level: 2,
        name: 'Title H2 - banner cursos nuevos',
      }),
    ).toBeInTheDocument();
    expect(container.querySelector('section')).toBeInTheDocument();
  });

  it('links the purchase action to the current default destination', () => {
    render(<CallToAction />);

    expect(screen.getByRole('link', { name: 'Comprar ahora' })).toHaveAttribute(
      'href',
      '/',
    );
  });
});

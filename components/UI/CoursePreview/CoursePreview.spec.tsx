import { screen } from '@testing-library/react';

import { render } from '@/test/test-utils';
import CoursePreview from '.';

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

describe('CoursePreview', () => {
  it('renders course preview', () => {
    render(<CoursePreview price={99} realPrice={199} />);

    expect(screen.getByText('Ver trailer del curso')).toBeInTheDocument();
    expect(
      screen.getByRole('group', { name: /Precio actual: COP\s+99/ }),
    ).toHaveAccessibleName(/antes COP\s+199/);
    expect(screen.getByText('Comprar ahora')).toBeInTheDocument();
    expect(screen.getByText('Agregar al carrito')).toBeInTheDocument();

    expect(screen.getByRole('link', { name: 'Comprar ahora' })).toHaveAttribute(
      'href',
      '/checkout',
    );
    expect(
      screen.getByRole('button', { name: 'Agregar al carrito' }),
    ).not.toHaveAttribute('href');
  });
});

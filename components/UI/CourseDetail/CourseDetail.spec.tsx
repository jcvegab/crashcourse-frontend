import { screen } from '@testing-library/react';

import Button from '@/ui/Button';
import CourseDetail from '@/ui/CourseDetail';
import CourseTrailer from '@/ui/CourseTrailer';
import Price from '@/ui/Price';

import { render } from '@/test/test-utils';

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

describe('CourseDetail compound components', () => {
  it('renders the composed course header, trailer, and purchase panel', () => {
    render(
      <CourseDetail.Root>
        <CourseDetail.Media>
          <CourseTrailer />
        </CourseDetail.Media>
        <CourseDetail.Overview>
          <CourseDetail.Heading>React para equipos</CourseDetail.Heading>
          <CourseDetail.Summary>Descripción del curso.</CourseDetail.Summary>
          <CourseDetail.Stats>Estadísticas</CourseDetail.Stats>
          <CourseDetail.Instructor>
            <CourseDetail.InstructorAvatar aria-hidden="true" />
            <CourseDetail.InstructorInfo>
              <CourseDetail.InstructorName>
                Nombre del tutor
              </CourseDetail.InstructorName>
              <CourseDetail.InstructorRole>
                Rol del tutor
              </CourseDetail.InstructorRole>
            </CourseDetail.InstructorInfo>
          </CourseDetail.Instructor>
        </CourseDetail.Overview>
        <CourseDetail.Purchase>
          <CourseDetail.Price>
            <Price amount="99.00" compareAtAmount="199.00" size="large" />
          </CourseDetail.Price>
          <CourseDetail.Actions>
            <Button href="/checkout" fullWidth>
              Comprar ahora
            </Button>
            <Button variant="secondary" fullWidth disabled>
              Agregar a carrito
            </Button>
          </CourseDetail.Actions>
        </CourseDetail.Purchase>
      </CourseDetail.Root>,
    );

    expect(
      screen.getByRole('heading', { level: 1, name: 'React para equipos' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Descripción del curso.')).toBeInTheDocument();
    expect(screen.getByText('Nombre del tutor')).toBeInTheDocument();
    expect(screen.getByText('Rol del tutor')).toBeInTheDocument();
    expect(screen.getByText('Ver Trailer del curso')).toBeInTheDocument();
    expect(
      screen.getByRole('group', { name: /Precio actual: COP\s+99/ }),
    ).toHaveAccessibleName(/antes COP\s+199/);
    expect(screen.getByRole('link', { name: 'Comprar ahora' })).toHaveAttribute(
      'href',
      '/checkout',
    );
    expect(
      screen.getByRole('button', { name: 'Agregar a carrito' }),
    ).toBeDisabled();
  });
});

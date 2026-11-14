import { screen } from '@testing-library/react';

import Button from '@/ui/Button';
import CourseStats from '@/ui/CourseStats';
import Price from '@/ui/Price';
import Tag from '@/ui/Tag';

import { render } from '@/test/test-utils';
import CourseCard from '.';

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

const course = {
  id: '42',
  name: 'React para equipos',
  tutorUsername: 'Ana Vega',
  level: 'Avanzado',
  users: 120,
  score: 4.8,
  price: '99.00',
  realPrice: '199.00',
};

function renderCourseCard() {
  return render(
    <CourseCard.Root>
      <CourseCard.Media>
        <Tag>Tag venta</Tag>
      </CourseCard.Media>
      <CourseCard.Body>
        <CourseCard.Info>
          <CourseCard.Title>{course.name}</CourseCard.Title>
          <CourseCard.Tutor>{course.tutorUsername}</CourseCard.Tutor>
          <CourseStats
            level={course.level}
            users={course.users}
            course_score={course.score}
          />
        </CourseCard.Info>
        <CourseCard.Actions>
          <Price amount={course.price} compareAtAmount={course.realPrice} />
          <Button href={`/cursos/${course.id}`} fullWidth>
            Comprar ahora
          </Button>
        </CourseCard.Actions>
      </CourseCard.Body>
    </CourseCard.Root>,
  );
}

describe('CourseCard compound components', () => {
  it('renders composed course details, stats, localized price, and media content', () => {
    renderCourseCard();

    expect(
      screen.getByRole('heading', { level: 5, name: course.name }),
    ).toBeInTheDocument();
    expect(screen.getByText(course.tutorUsername)).toBeInTheDocument();
    expect(screen.getByText('Nivel Avanzado')).toBeInTheDocument();
    expect(screen.getByText('120 Usuarios')).toBeInTheDocument();
    expect(screen.getByText('4.8')).toBeInTheDocument();
    expect(screen.getByText('Tag venta')).toBeInTheDocument();
    expect(
      screen.getByRole('group', { name: /Precio actual: COP\s+99/ }),
    ).toHaveAccessibleName(/antes COP\s+199/);
  });

  it('renders the purchase link from the composed children', () => {
    renderCourseCard();

    expect(screen.getByRole('link', { name: 'Comprar ahora' })).toHaveAttribute(
      'href',
      '/cursos/42',
    );
  });

  it('allows media to be replaced without changing the card contract', () => {
    render(
      <CourseCard.Root aria-label="Curso personalizado">
        <CourseCard.Media>
          <span>Portada alternativa</span>
        </CourseCard.Media>
        <CourseCard.Body>
          <CourseCard.Info>
            <CourseCard.Title>Curso propio</CourseCard.Title>
          </CourseCard.Info>
          <CourseCard.Actions>
            <span>Contenido personalizado</span>
          </CourseCard.Actions>
        </CourseCard.Body>
      </CourseCard.Root>,
    );

    expect(
      screen.getByRole('article', { name: 'Curso personalizado' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Portada alternativa')).toBeInTheDocument();
    expect(screen.getByText('Contenido personalizado')).toBeInTheDocument();
  });
});

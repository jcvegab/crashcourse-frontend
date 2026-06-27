import { notFound } from 'next/navigation';

import { buildCourseSeo } from '@/lib/seo';

import CursoPage, { generateMetadata } from '../page';

import { render } from '@/test/test-utils';

vi.mock('next/navigation', () => ({
  notFound: vi.fn(),
}));

vi.mock('@/lib/gql', () => ({
  gql: vi.fn(),
}));

vi.mock('@/lib/seo', () => ({
  buildCourseSeo: vi.fn(({ id, course }) => ({
    title: course ? `Curso ${course.name}` : `Curso ${id}`,
    description: 'Desc',
    canonical: course ? `https://example.com/cursos/${id}` : null,
    image: '/logo.svg',
    ogType: 'product',
    noindex: !course,
    jsonLd: course ? [{ '@type': 'Course', name: course.name }] : [],
  })),
}));

import { gql } from '@/lib/gql';

beforeEach(() => {
  vi.clearAllMocks();
});

describe('CursoPage', () => {
  it('renders course page when course is found', async () => {
    vi.mocked(gql).mockResolvedValue({
      course: {
        name: 'React',
        tutorUsername: 'John',
        level: 'Avanzado',
        users: 100,
        score: 4.8,
        price: 99,
        realPrice: 199,
      },
    });

    const Component = await CursoPage({
      params: Promise.resolve({ id: '123' }),
    });
    const { container } = render(Component);

    expect(container.textContent).toContain('React');
    expect(gql).toHaveBeenCalledWith(
      expect.any(String),
      { id: 123 },
      { next: { revalidate: 300, tags: ['course-123'] } },
    );
  });

  it('calls notFound when course is null', async () => {
    vi.mocked(gql).mockResolvedValue({ course: null });

    await CursoPage({
      params: Promise.resolve({ id: '123' }),
    });

    expect(notFound).toHaveBeenCalled();
  });

  it('throws backend errors for the route error boundary', async () => {
    vi.mocked(gql).mockRejectedValue(new Error('Network error'));

    await expect(
      CursoPage({
        params: Promise.resolve({ id: '123' }),
      }),
    ).rejects.toThrow('Network error');
  });
});

describe('generateMetadata', () => {
  it('returns metadata for existing course', async () => {
    vi.mocked(gql).mockResolvedValue({
      course: {
        name: 'React',
        tutorUsername: 'John',
        level: 'Avanzado',
        users: 100,
        score: 4.8,
        price: 99,
        realPrice: 199,
      },
    });

    const metadata = await generateMetadata({
      params: Promise.resolve({ id: '123' }),
    });

    expect(metadata.title).toBe('Curso React');
    expect(metadata.openGraph?.url).toBe('https://example.com/cursos/123');
  });

  it('returns metadata without images when image is empty', async () => {
    vi.mocked(buildCourseSeo).mockReturnValueOnce({
      title: 'Curso React',
      description: 'Desc',
      canonical: 'https://example.com/cursos/123',
      image: '',
      ogType: 'product',
      noindex: false,
      jsonLd: [],
    });

    vi.mocked(gql).mockResolvedValue({
      course: {
        name: 'React',
        tutorUsername: 'John',
        level: 'Avanzado',
        users: 100,
        score: 4.8,
        price: 99,
        realPrice: 199,
      },
    });

    const metadata = await generateMetadata({
      params: Promise.resolve({ id: '123' }),
    });

    expect(metadata.openGraph?.images).toBeUndefined();
    expect(metadata.twitter?.images).toBeUndefined();
  });

  it('returns noindex metadata for missing course', async () => {
    vi.mocked(gql).mockResolvedValue({ course: null });

    const metadata = await generateMetadata({
      params: Promise.resolve({ id: '123' }),
    });

    expect(metadata.robots).toEqual({ index: false, follow: false });
  });
});

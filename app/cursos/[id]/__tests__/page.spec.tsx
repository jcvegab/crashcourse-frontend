import { notFound } from 'next/navigation';

import CursoPage, { generateMetadata } from '../page';

import { render } from '@/test/test-utils';

vi.mock('next/navigation', () => ({
  notFound: vi.fn(),
}));

vi.mock('@/lib/apolloClient', () => ({
  initializeApollo: vi.fn(),
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

const mockQuery = vi.fn();
const mockApolloClient = {
  query: mockQuery,
};

import { initializeApollo } from '@/lib/apolloClient';

beforeEach(() => {
  vi.clearAllMocks();
  vi.mocked(initializeApollo).mockReturnValue(mockApolloClient as never);
});

describe('CursoPage', () => {
  it('renders course page when course is found', async () => {
    mockQuery.mockResolvedValue({
      data: {
        course: {
          name: 'React',
          tutorUsername: 'John',
          level: 'Avanzado',
          users: 100,
          score: 4.8,
          price: 99,
          realPrice: 199,
        },
      },
    });

    const Component = await CursoPage({
      params: Promise.resolve({ id: '123' }),
    });
    const { container } = render(Component);

    expect(container.textContent).toContain('React');
    expect(mockQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        variables: { id: '123' },
      }),
    );
  });

  it('calls notFound when course is null', async () => {
    mockQuery.mockResolvedValue({
      data: { course: null },
    });

    await CursoPage({
      params: Promise.resolve({ id: '123' }),
    });

    expect(notFound).toHaveBeenCalled();
  });

  it('renders error fallback on backend error', async () => {
    mockQuery.mockRejectedValue(new Error('Network error'));

    const Component = await CursoPage({
      params: Promise.resolve({ id: '123' }),
    });
    const { container } = render(Component);

    expect(container.textContent).toContain('Error in backend');
  });
});

describe('generateMetadata', () => {
  it('returns metadata for existing course', async () => {
    mockQuery.mockResolvedValue({
      data: {
        course: {
          name: 'React',
          tutorUsername: 'John',
          level: 'Avanzado',
          users: 100,
          score: 4.8,
          price: 99,
          realPrice: 199,
        },
      },
    });

    const metadata = await generateMetadata({
      params: Promise.resolve({ id: '123' }),
    });

    expect(metadata.title).toBe('Curso React');
    expect(metadata.openGraph?.url).toBe('https://example.com/cursos/123');
  });

  it('returns noindex metadata for missing course', async () => {
    mockQuery.mockResolvedValue({
      data: { course: null },
    });

    const metadata = await generateMetadata({
      params: Promise.resolve({ id: '123' }),
    });

    expect(metadata.robots).toEqual({ index: false, follow: false });
  });
});

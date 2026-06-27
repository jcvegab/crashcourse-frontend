import HomePage from '../page';

import { render } from '@/test/test-utils';

vi.mock('@/lib/apolloClient', () => ({
  initializeApollo: vi.fn(),
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

describe('HomePage', () => {
  it('renders home page with data', async () => {
    mockQuery.mockResolvedValue({
      data: {
        categories: [{ name: 'Programación' }],
        courses: [
          {
            id: '1',
            name: 'React',
            tutorUsername: 'John',
            level: 'Avanzado',
            users: 100,
            score: 4.8,
            price: 99,
            realPrice: 199,
            category: { name: 'Programación' },
          },
        ],
      },
    });

    const Component = await HomePage();
    const { container } = render(Component);

    expect(container.textContent).toContain('React');
  });

  it('renders error fallback on backend error', async () => {
    mockQuery.mockRejectedValue(new Error('Network error'));

    const Component = await HomePage();
    const { container } = render(Component);

    expect(container.textContent).toContain('Error in backend');
  });
});

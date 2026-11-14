import { screen } from '@testing-library/react';

import HomePage from './page';

import { render } from '@/test/test-utils';

vi.mock('@/lib/gql', () => ({
  gql: vi.fn(),
}));

import { gql } from '@/lib/gql';

beforeEach(() => {
  vi.clearAllMocks();
});

describe('HomePage', () => {
  it('renders home page with data', async () => {
    vi.mocked(gql).mockResolvedValue({
      categories: [{ name: 'Programación' }],
      courses: [
        {
          id: '1',
          name: 'React',
          tutorUsername: 'John',
          level: 'Avanzado',
          users: 100,
          score: 4.8,
          price: '99.00',
          realPrice: '199.00',
          category: { name: 'Programación' },
        },
      ],
    });

    const Component = await HomePage();
    const { container } = render(Component);

    expect(container.textContent).toContain('React');
    expect(
      screen.getByRole('group', {
        name: /Precio actual: COP\s+99, antes COP\s+199/,
      }),
    ).toBeInTheDocument();
  });

  it('throws backend errors for the route error boundary', async () => {
    vi.mocked(gql).mockRejectedValue(new Error('Network error'));

    await expect(HomePage()).rejects.toThrow('Network error');
  });
});

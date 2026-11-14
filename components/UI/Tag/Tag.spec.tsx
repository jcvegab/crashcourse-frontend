import { screen } from '@testing-library/react';

import { render } from '@/test/test-utils';
import Tag from '.';

describe('Tag', () => {
  it('renders children text', () => {
    render(<Tag>Promoción</Tag>);

    expect(screen.getByText('Promoción')).toBeInTheDocument();
  });

  it('renders nested content', () => {
    render(
      <Tag>
        Oferta <strong>limitada</strong>
      </Tag>,
    );

    expect(screen.getByText('limitada')).toBeInTheDocument();
  });
});

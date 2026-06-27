import { screen } from '@testing-library/react';

import { render } from '../../../test/test-utils';
import Tag from '../Tag';

describe('Tag', () => {
  it('renders children text', () => {
    render(<Tag>Promoción</Tag>);

    expect(screen.getByText('Promoción')).toBeInTheDocument();
  });
});

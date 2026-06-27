import { screen } from '@testing-library/react';

import { render } from '../../../test/test-utils';
import CourseCost from '../CourseCost';

describe('CourseCost', () => {
  it('renders price and real price', () => {
    render(<CourseCost price={99} realPrice={199} />);

    expect(screen.getByText('$99')).toBeInTheDocument();
    expect(screen.getByText('CO$199')).toBeInTheDocument();
  });

  it('renders price symbol', () => {
    render(<CourseCost price={50} realPrice={100} />);

    expect(screen.getByText('co')).toBeInTheDocument();
  });
});

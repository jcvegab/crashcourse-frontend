import { screen } from '@testing-library/react';

import { render } from '@/test/test-utils';
import CourseTrailer from '.';

describe('CourseTrailer', () => {
  it('renders a local play icon and prompt without pretending to be a player', () => {
    const { container } = render(<CourseTrailer />);

    expect(screen.getByText('Ver Trailer del curso')).toBeInTheDocument();
    expect(container.querySelector('img')).toHaveAttribute(
      'src',
      '/icons/play.svg',
    );
    expect(container.querySelector('button, a')).not.toBeInTheDocument();
  });
});

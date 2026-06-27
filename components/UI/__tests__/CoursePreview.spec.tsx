import { screen } from '@testing-library/react';

import { render } from '../../../test/test-utils';
import CoursePreview from '../CoursePreview';

describe('CoursePreview', () => {
  it('renders course preview', () => {
    render(<CoursePreview price={99} realPrice={199} />);

    expect(screen.getByText('Ver trailer del curso')).toBeInTheDocument();
    expect(screen.getByText('$99')).toBeInTheDocument();
    expect(screen.getByText('CO$199')).toBeInTheDocument();
    expect(screen.getByText('Comprar ahora')).toBeInTheDocument();
    expect(screen.getByText('Agregar al carrito')).toBeInTheDocument();
  });
});

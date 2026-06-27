import { screen } from '@testing-library/react';

import { render } from '../../../test/test-utils';
import { StyledH1, StyledH2, StyledH3, StyledH4 } from '../Title';

describe('Title components', () => {
  it('StyledH1 renders children', () => {
    render(<StyledH1>Heading 1</StyledH1>);

    expect(screen.getByText('Heading 1')).toBeInTheDocument();
    expect(screen.getByText('Heading 1').tagName).toBe('H1');
  });

  it('StyledH2 renders children', () => {
    render(<StyledH2>Heading 2</StyledH2>);

    expect(screen.getByText('Heading 2').tagName).toBe('H2');
  });

  it('StyledH3 renders children', () => {
    render(<StyledH3>Heading 3</StyledH3>);

    expect(screen.getByText('Heading 3').tagName).toBe('H3');
  });

  it('StyledH4 renders children', () => {
    render(<StyledH4>Heading 4</StyledH4>);

    expect(screen.getByText('Heading 4').tagName).toBe('H4');
  });

  it('renders mobile variants without errors', () => {
    render(
      <>
        <StyledH1 movile>M1</StyledH1>
        <StyledH2 movile>M2</StyledH2>
        <StyledH3 movile>M3</StyledH3>
        <StyledH4 movile>M4</StyledH4>
      </>,
    );

    expect(screen.getByText('M1')).toBeInTheDocument();
    expect(screen.getByText('M2')).toBeInTheDocument();
    expect(screen.getByText('M3')).toBeInTheDocument();
    expect(screen.getByText('M4')).toBeInTheDocument();
  });
});

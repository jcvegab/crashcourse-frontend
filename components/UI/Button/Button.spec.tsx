import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { render } from '@/test/test-utils';
import Button from '.';

describe('Button', () => {
  it.each([
    ['primary', 'sm', '40px', '16px', '16px', '0px 24px'],
    ['primary', 'md', '48px', '18px', '20px', '0px 40px'],
    ['secondary', 'sm', '40px', '16px', '16px', '0px 24px'],
    ['secondary', 'md', '48px', '18px', '20px', '0px 40px'],
  ] as const)(
    'matches Figma for %s %s',
    (variant, size, height, fontSize, lineHeight, padding) => {
      render(
        <Button variant={variant} size={size}>
          Acción
        </Button>,
      );

      expect(screen.getByRole('button', { name: 'Acción' })).toHaveStyle({
        height,
        fontSize,
        lineHeight,
        padding,
        borderRadius: '10px',
        fontWeight: '800',
        letterSpacing: '0.4px',
        borderWidth: '0px',
        color: variant === 'primary' ? 'rgb(255, 255, 255)' : 'rgb(24, 27, 50)',
        backgroundColor:
          variant === 'primary' ? 'rgb(24, 27, 50)' : 'rgba(0, 0, 0, 0)',
        boxShadow: variant === 'secondary' ? 'inset 0 0 0 3px #181b32' : 'none',
      });
    },
  );

  it('uses a native button that does not submit its containing form by default', async () => {
    const onClick = vi.fn();
    const onSubmit = vi.fn((event: React.FormEvent<HTMLFormElement>) =>
      event.preventDefault(),
    );
    render(
      <form onSubmit={onSubmit}>
        <Button onClick={onClick}>Agregar</Button>
      </form>,
    );

    const button = screen.getByRole('button', { name: 'Agregar' });
    expect(button).toHaveAttribute('type', 'button');
    expect(button).not.toHaveAttribute('href');
    expect(button).toHaveStyle({ height: '48px', width: 'auto' });
    button.focus();
    await userEvent.keyboard('{Enter}');
    await userEvent.keyboard(' ');
    expect(onClick).toHaveBeenCalledTimes(2);
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('forwards disabled and accessibility attributes and prevents activation', async () => {
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick} aria-label="Guardar cambios">
        Guardar
      </Button>,
    );
    const button = screen.getByRole('button', { name: 'Guardar cambios' });
    expect(button).toBeDisabled();
    await userEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('supports explicit form submission', () => {
    const onSubmit = vi.fn((event: React.FormEvent<HTMLFormElement>) =>
      event.preventDefault(),
    );
    render(
      <form onSubmit={onSubmit}>
        <Button type="submit" name="action" value="save">
          Guardar
        </Button>
      </form>,
    );
    const button = screen.getByRole('button', { name: 'Guardar' });
    fireEvent.click(button);
    expect(onSubmit).toHaveBeenCalledOnce();
    expect(button).toHaveAttribute('name', 'action');
    expect(button).toHaveAttribute('value', 'save');
  });

  it('uses a link only for an explicit href and shares the visual styles', () => {
    render(
      <Button
        href="/checkout"
        variant="secondary"
        size="sm"
        fullWidth
        target="_blank"
        rel="noreferrer"
      >
        Comprar
      </Button>,
    );
    const link = screen.getByRole('link', { name: 'Comprar' });
    expect(link).toHaveAttribute('href', '/checkout');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noreferrer');
    expect(link).toHaveStyle({
      height: '40px',
      width: '100%',
      padding: '0px 24px',
      letterSpacing: '0.4px',
      backgroundColor: 'rgba(0, 0, 0, 0)',
    });
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('supports explicit home navigation', () => {
    render(<Button href="/">Inicio</Button>);
    expect(screen.getByRole('link', { name: 'Inicio' })).toHaveAttribute(
      'href',
      '/',
    );
  });
});

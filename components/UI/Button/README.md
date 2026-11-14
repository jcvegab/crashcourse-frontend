# Button

Componente visual para acciones y navegación. Sin `href` renderiza un
`<button type="button">`; con `href` renderiza un enlace de Next.js. Ambos
usan los mismos estilos del [componente Figma](https://www.figma.com/design/riBMruuvEiyrtuhg6kTr7i/Reto-Codeable---Catalog?node-id=1-826).

## API pública

```tsx
import Button from '@/ui/Button';
import type { ButtonProps, ButtonSize, ButtonVariant } from '@/ui/Button';
```

| Propiedad | Tipo | Valor predeterminado | Descripción |
| --- | --- | --- | --- |
| `children` | `React.ReactNode` | Requerido | Contenido y nombre accesible. |
| `variant` | `'primary' \| 'secondary'` | `'primary'` | Relleno oscuro o contorno con fondo transparente. |
| `size` | `'sm' \| 'md'` | `'md'` | Altura de 40 o 48 px; padding horizontal de 24 o 40 px. |
| `fullWidth` | `boolean` | `false` | Ancho completo del contenedor. |
| `href` | `string` | Sin destino | Activa el modo enlace; se utiliza tal cual, sin prefijos. |

Sin `href`, acepta atributos nativos de botón: `onClick`, `disabled`, `type`,
`name`, `value`, `form` y atributos ARIA. Con `href`, acepta
atributos de enlace como `target`, `rel` y `onClick`. Los tipos impiden usar
`disabled` en enlaces. La antigua propiedad `url` se sustituyó por `href`.

## Uso

Los manejadores de eventos deben declararse dentro de una frontera cliente:

```tsx
'use client';

import Button from '@/ui/Button';

export function PurchaseActions({ onAdd }: { onAdd: () => void }) {
  return (
    <>
      <Button onClick={onAdd}>Agregar al carrito</Button>
      <Button href="/checkout" variant="secondary">Comprar ahora</Button>
      <Button type="submit" form="purchase-form">Confirmar</Button>
    </>
  );
}
```

## Estilos y dependencias

- Usa styled-components y los colores `white`, `baseMain` y `transparent` del
  `ThemeProvider`. La fuente Inter se hereda del layout de la aplicación.
- Peso 800, espaciado entre letras de 0.4 px y radio de 10 px.
- S: tamaño/interlineado de 16/16 px; M: 18/20 px.
- El contorno secundario de 3 px se dibuja hacia dentro mediante `box-shadow`
  para conservar el tamaño y el padding de Figma sin sumar ancho al botón.
- Los estilos se comparten entre un botón nativo y un enlace, sin anidarlos.
- El componente delega la lógica de negocio en el consumidor.

La revisión en Chromium confirmó los valores CSS indicados. Con la versión
actual de Inter, los textos de ejemplo producen anchos automáticos de
175–224 px frente a los 172–219 px registrados en Figma. Las métricas de texto
requieren una revisión adicional para una coincidencia visual exacta; no se
fijan anchos dependientes del texto de ejemplo.

## Accesibilidad

El botón conserva la activación nativa con Enter y Espacio, soporte de
formularios y bloqueo mediante `disabled`. El enlace conserva la semántica de
navegación. Ambos admiten atributos ARIA y el foco nativo del navegador.
Proporciona contenido descriptivo o `aria-label` si solo se muestra un icono.

## Verificación y mantenimiento

`Button.spec.tsx` comprueba las cuatro variantes de Figma, navegación explícita,
activación con teclado, estado deshabilitado y envío de formularios.

```bash
npx vitest run components/UI/Button/Button.spec.tsx
```

Mantén este documento, la implementación, los tipos y el barrel sincronizados.

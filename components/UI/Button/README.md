# Button

Reusable navigation link styled as a primary or secondary button. Use it for
actions that navigate to a page. The component renders Next.js `Link`, so it is
not a form submit button and does not perform mutations by itself.

## Public API

Import the component and its public types from `@/ui/Button`:

```tsx
import Button from '@/ui/Button';
import type { ButtonProps, ButtonSize, ButtonVariant } from '@/ui/Button';
```

| Prop | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `children` | `React.ReactNode` | Yes | - | Visible link content. |
| `url` | `string` | No | `undefined` | Appended to `/` to form the destination. Without a value, links to `/`. |
| `variant` | `'primary' \| 'secondary'` | No | `'primary'` | Primary uses the dark theme color and white text. Secondary uses the light gray theme color, dark text, and a dark outline. |
| `size` | `'sm' \| 'md'` | No | `'md'` | Small is 40px high; medium is 48px high. |
| `fullWidth` | `boolean` | No | `false` | Uses `100%` width when true; otherwise width is automatic. |

The component prefixes `url` with `/`; pass `checkout` to navigate to `/checkout`.
It does not accept an arbitrary external `href` or forward other anchor props.

## Usage

```tsx
import Button from '@/ui/Button';

export function BuyAction() {
  return (
    <Button url="checkout" size="md" fullWidth>
      Comprar ahora
    </Button>
  );
}
```

For a secondary action, pass `variant="secondary"`. For navigation to the home
page, omit `url`.

## Behavior and dependencies

- Wraps Next.js `Link` and emits an anchor with the computed destination.
- Requires the app's styled-components `ThemeProvider` and theme colors
  `white`, `baseMain`, and `grayLight`.
- Requires a Next.js App Router client environment wherever it is rendered.
- Does not implement click handlers, form submission, disabled state, or cart
  behavior. The visible content and destination belong to the caller.

## Accessibility

Next.js `Link` renders a native anchor, which is keyboard-focusable and exposes
link semantics. Provide descriptive `children` so the link has an accessible
name. This component has no disabled state or extra ARIA attributes.

## Verification and maintenance

The colocated `Button.spec.tsx` verifies child rendering, default primary/md
styling and automatic width, the secondary and small variants, full width,
provided paths, and the home-page fallback. Run it with:

```bash
npx vitest run components/UI/Button/Button.spec.tsx
```

Keep this README synchronized with `Button.tsx`, `Button.types.ts`, and
`index.ts` when the visual styles, route behavior, props, or public exports
change.

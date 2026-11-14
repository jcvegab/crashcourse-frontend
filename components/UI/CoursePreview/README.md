# CoursePreview

Purchase panel used on the course detail page. It presents a trailer prompt,
course prices, and a full-width checkout link and a cart button.

## Public API

Import the default component and prop type from `@/ui/CoursePreview`:

```tsx
import CoursePreview from '@/ui/CoursePreview';
import type { CoursePreviewProps } from '@/ui/CoursePreview';
```

| Prop | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `price` | `number \| string` | Yes | - | Current amount passed to `Price`; the backend may return a decimal string. |
| `realPrice` | `number \| string` | Yes | - | Comparison amount passed to `Price`; displayed only when greater than `price`. |

## Usage

```tsx
import CoursePreview from '@/ui/CoursePreview';

export function CoursePurchasePanel() {
  return <CoursePreview price={99} realPrice={199} />;
}
```

## Behavior and dependencies

- Shows the text `Ver trailer del curso` in a black trailer placeholder; no
  video player is currently wired up.
- Displays prices through the reusable `Price` component, using the shared
  `COP` / `es-CO` defaults and showing the previous amount only for a real
  discount.
- `Comprar ahora` is a full-width primary link to `/checkout`.
- `Agregar al carrito` is a full-width secondary native button without a
  handler; cart behavior is not yet implemented.
- Uses `Price` and `Button`, including their styled-components theme
  requirements. The panel has no internal state or client directive.

## Accessibility

The checkout link and cart button expose their native semantics and visible
accessible names. The trailer
placeholder is plain text and does not expose video controls or media
semantics.

## Verification and maintenance

`CoursePreview.spec.tsx` verifies the trailer text, prices, action labels, and
the checkout destination and native cart button. Run it with:

```bash
npx vitest run components/UI/CoursePreview/CoursePreview.spec.tsx
```

Keep this README synchronized with `CoursePreview.tsx`,
`CoursePreview.types.ts`, and `index.ts` when prices, action behavior, or
exports change.

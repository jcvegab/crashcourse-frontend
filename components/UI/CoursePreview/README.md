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
| `price` | `number` | Yes | - | Current price passed to `CourseCost`. |
| `realPrice` | `number` | Yes | - | Original price passed to `CourseCost`. |

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
- Displays current and original prices through `CourseCost`.
- `Comprar ahora` is a full-width primary link to `/checkout`.
- `Agregar al carrito` is a full-width secondary native button without a
  handler; cart behavior is not yet implemented.
- Uses `CourseCost` and `Button`, including their styled-components theme
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

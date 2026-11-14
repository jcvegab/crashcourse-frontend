# Tag

Compact label for short status or promotional text, currently used on course
cards. It renders its content in a styled `div` and applies uppercase text
transformation.

## Public API

Import the default component and its prop type from `@/ui/Tag`:

```tsx
import Tag from '@/ui/Tag';
import type { TagProps } from '@/ui/Tag';
```

| Prop | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `children` | `React.ReactNode` | Yes | - | Text or nested React content displayed inside the label. |

## Usage

```tsx
import Tag from '@/ui/Tag';

export function CoursePromotion() {
  return <Tag>Promoción</Tag>;
}
```

## Behavior and dependencies

- Renders children as provided; CSS transforms the displayed text to uppercase.
- Uses a fit-content width, `4px 8px` padding, a 5px corner radius, and the
  theme colors `white` and `grayDark`.
- Requires the app's styled-components `ThemeProvider`.
- Does not define status meaning, interaction, or accessible state attributes.

## Accessibility

The component renders a generic `div` with no implicit status semantics. Keep
its text concise and meaningful; use a semantic element at the call site when
the information requires one.

## Verification and maintenance

`Tag.spec.tsx` verifies plain and nested content. Run it with:

```bash
npx vitest run components/UI/Tag/Tag.spec.tsx
```

Keep this README synchronized with `Tag.tsx`, `Tag.types.ts`, and `index.ts`
when the styling, child contract, semantics, or exports change.

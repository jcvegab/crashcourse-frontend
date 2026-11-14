# CourseCost

Displays a course's current and original prices in a horizontal row. It is
used by course cards and the course preview panel.

## Public API

Import the default component and its prop type from `@/ui/CourseCost`:

```tsx
import CourseCost from '@/ui/CourseCost';
import type { CourseCostProps } from '@/ui/CourseCost';
```

| Prop | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `price` | `number` | Yes | - | Current amount rendered as `$` followed by the value. |
| `realPrice` | `number` | Yes | - | Original amount rendered as `CO$` followed by the value with line-through styling. |

Values are interpolated as received. The component does not apply locale,
decimal, or currency conversion formatting.

## Usage

```tsx
import CourseCost from '@/ui/CourseCost';

export function CoursePrice() {
  return <CourseCost price={99} realPrice={199} />;
}
```

## Behavior and dependencies

- Renders a horizontal group containing the literal `co` label, current price,
  and crossed-out original price.
- Accepts numeric values including zero; it does not calculate discounts or
  validate that one price is lower than the other.
- Uses styled-components theme colors `baseMain` and `grayDark`; it requires
  the application's `ThemeProvider`.
- Has no event handlers, client directive, or internal state.

## Accessibility

The output consists of generic `div`, `span`, and `p` elements and has no
explicit accessible label or currency semantics. When context is insufficient,
provide an accessible label at the consuming UI level.

## Verification and maintenance

`CourseCost.spec.tsx` verifies both displayed amounts, the `co` label, and zero
values. Run it with:

```bash
npx vitest run components/UI/CourseCost/CourseCost.spec.tsx
```

Keep this README synchronized with `CourseCost.tsx`, `CourseCost.types.ts`, and
`index.ts` when price display, props, or exports change.

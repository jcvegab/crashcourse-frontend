# CourseStats

Displays a course's level, user count, and score in a horizontal row with a
small icon before each value. It is used on course cards and course details.

## Public API

Import the default component and prop type from `@/ui/CourseStats`:

```tsx
import CourseStats from '@/ui/CourseStats';
import type { CourseStatsProps } from '@/ui/CourseStats';
```

| Prop | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `level` | `string` | Yes | - | Appended to the visible `Nivel` label. |
| `users` | `number` | Yes | - | Rendered before the visible `Usuarios` label. |
| `course_score` | `number` | Yes | - | Rendered as the score value. Preserve this existing prop spelling. |

## Usage

```tsx
import CourseStats from '@/ui/CourseStats';

export function CourseMetadata() {
  return <CourseStats level="Avanzado" users={120} course_score={4.8} />;
}
```

## Behavior and dependencies

- Renders three values in order: level, user count, and score.
- Accepts zero for `users` and `course_score` and renders those values.
- Loads decorative icons from `/icons/bar-chart.svg`, `/icons/people.svg`,
  and `/icons/star.svg`.
- Uses styled-components theme color `grayDark` and requires the application's
  `ThemeProvider`.
- Has no event handlers, internal state, or client directive.

## Accessibility

All three images use empty alternative text and `aria-hidden="true"` because
the neighboring text provides their context. The values are plain text; the
component does not attach rating-specific accessible semantics.

## Verification and maintenance

`CourseStats.spec.tsx` verifies all displayed values, zero values, and that the
three icons remain decorative. Run it with:

```bash
npx vitest run components/UI/CourseStats/CourseStats.spec.tsx
```

Keep this README synchronized with `CourseStats.tsx`, `CourseStats.types.ts`,
and `index.ts` when props, presentation, icons, or exports change.

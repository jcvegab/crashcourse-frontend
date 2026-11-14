# CourseCard

Summary card for one course in the course listing. It combines the course
title and tutor, level and popularity statistics, current and original price,
a promotional tag, and a link to the course detail page.

## Public API

Import the default component and prop type from `@/ui/CourseCard`:

```tsx
import CourseCard from '@/ui/CourseCard';
import type { CourseCardProps } from '@/ui/CourseCard';
```

| Prop | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `course` | `CourseSummary` | Yes | - | Course data used to render the title, tutor, stats, prices, category-independent presentation, and detail URL. |

`CourseSummary` requires `id`, `name`, `tutorUsername`, `level`, `users`,
`score`, `price`, `realPrice`, and `category: { name: string }`. The current
card displays the fields listed below; `category.name` is part of the shared
type but is not rendered by this card.

## Usage

```tsx
import CourseCard from '@/ui/CourseCard';

export function CourseGridItem() {
  return (
    <CourseCard
      course={{
        id: '42',
        name: 'React para equipos',
        tutorUsername: 'Ana Vega',
        level: 'Avanzado',
        users: 120,
        score: 4.8,
        price: 99,
        realPrice: 199,
        category: { name: 'Programación' },
      }}
    />
  );
}
```

## Behavior and dependencies

- Renders the course title as an `h5` and shows its tutor, stats, prices, and
  the literal tag `Tag venta`.
- The purchase link uses `href="/cursos/{id}"` through the shared `Button`.
- Uses `CourseStats`, `CourseCost`, `Tag`, and `Button` from their UI modules.
- Requires the app's styled-components `ThemeProvider` through its child UI
  modules. It has no own state, handlers, or client directive.
- The category is accepted as part of `CourseSummary` but is not currently
  displayed here.

## Accessibility

The course name is an `h5`; the purchase action is a native link with the
accessible name `Comprar ahora`. Child stats keep their icons decorative.
Choose surrounding heading levels to fit the page's heading hierarchy.

## Verification and maintenance

`CourseCard.spec.tsx` verifies displayed course information, stats, prices,
tag text, and the course detail destination. Run it with:

```bash
npx vitest run components/UI/CourseCard/CourseCard.spec.tsx
```

Keep this README synchronized with `CourseCard.tsx`, `CourseCard.types.ts`,
`index.ts`, and `CourseSummary` when the card's displayed fields or public
contract changes.

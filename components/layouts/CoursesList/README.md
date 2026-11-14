# CoursesList

Responsive course grid used on the home page. It renders one `CourseCard` for
each course in the supplied order.

## Public API

Import the default component and props type from `@/layouts/CoursesList`:

```tsx
import CoursesList from '@/layouts/CoursesList';
import type { CoursesListProps } from '@/layouts/CoursesList';
```

| Prop | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `courses` | `CourseSummary[]` | Yes | - | Courses rendered as cards in input order. |

## Usage

```tsx
import CoursesList from '@/layouts/CoursesList';
import type { CoursesListProps } from '@/layouts/CoursesList';

export function FilteredCourses({ courses }: CoursesListProps) {
  return <CoursesList courses={courses} />;
}
```

## Behavior and dependencies

- Renders the heading `Title H4 - Listado de cursos` followed by one card per
  course. An empty array keeps the heading and renders an empty grid.
- Passes each full `CourseSummary` to `CourseCard`, which constructs the
  `/cursos/{id}` purchase destination.
- Uses a responsive CSS grid: one 270px column from 320px, two from 480px,
  three from 1024px, and four from 1200px viewport widths.
- Uses `CourseCard` and `StyledH4` from UI modules and the shared
  `CourseSummary` type.
- Has no internal state, event handlers, or client directive.

## Accessibility

The list sits in a semantic section with an `h4` heading. Each course title is
rendered as an `h5` by `CourseCard`, and each purchase action is a named link.
Choose surrounding heading levels to fit the page hierarchy.

## Verification and maintenance

`CoursesList.spec.tsx` verifies the heading, card order, course destinations,
and empty-list rendering. Run it with:

```bash
npx vitest run components/layouts/CoursesList/CoursesList.spec.tsx
```

Keep this README synchronized with `CoursesList.tsx`, `CoursesList.types.ts`,
and `index.ts` when layout, props, or child behavior changes.

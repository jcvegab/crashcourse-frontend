# Main

Client-side home page content that composes the promotional banner, category
selector, and filtered course grid.

## Public API

Import the default component and props type from `@/layouts/Main`:

```tsx
import Main from '@/layouts/Main';
import type { MainProps } from '@/layouts/Main';
```

| Prop | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `categories` | `CourseCategory[]` | Yes | - | Categories displayed as selectable controls. |
| `courses` | `CourseSummary[]` | Yes | - | Courses filtered and passed to the list. |

## Usage

```tsx
import Main from '@/layouts/Main';

export function HomeContent({ categories, courses }: MainProps) {
  return <Main categories={categories} courses={courses} />;
}
```

## Behavior and dependencies

- Composes `CallToAction`, `Categories`, and `CoursesList`.
- Initially displays all supplied courses. Selecting a category filters by
  `course.category.name`; selecting a different category switches the filter.
- Selecting the currently active category restores the unfiltered list. An
  unmatched category produces an empty course grid while preserving the grid
  heading.
- The string `All` is the current internal no-filter sentinel. Category names
  equal to `All` therefore share the unfiltered behavior.
- Uses React state and must remain within a client component boundary. The
  current `HomePage` provides that boundary.
- Has no backend or network behavior; it filters the supplied arrays locally.

## Accessibility

Interactive category controls are native buttons supplied by `Categories` and
`CategoryCard`. Course purchase actions are links inside `CourseCard`.

## Verification and maintenance

`Main.spec.tsx` verifies the initial list, category filtering, switching,
same-category reset, and empty results. Run it with:

```bash
npx vitest run components/layouts/Main/Main.spec.tsx
```

Keep this README synchronized with `Main.tsx`, `Main.types.ts`, `index.ts`, and
the filtering behavior when inputs or state transitions change.

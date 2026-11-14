# Categories

Category selector section used on the home page. It renders a horizontally
scrollable row of `CategoryCard` controls and forwards each selection to its
parent.

## Public API

Import the default component and props type from `@/layouts/Categories`:

```tsx
import Categories from '@/layouts/Categories';
import type { CategoriesProps } from '@/layouts/Categories';
```

| Prop | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `categories` | `CourseCategory[]` | Yes | - | List of category objects with a `name` string. |
| `onSelect` | `(category: string) => void` | Yes | - | Called with the selected category name. |

## Usage

```tsx
import Categories from '@/layouts/Categories';

export function CourseFilters() {
  return (
    <Categories
      categories={[{ name: 'Programación' }, { name: 'Diseño' }]}
      onSelect={(category) => console.log('Selected:', category)}
    />
  );
}
```

## Behavior and dependencies

- Renders the heading `Title H4 - Categorias` and a list labeled
  `Categorias de cursos`.
- Renders one `CategoryCard` per input category in input order. An empty list
  leaves the labeled list empty while preserving the heading.
- Selection state and filtering behavior belong to the parent; this component
  only forwards `onSelect(categoryName)`.
- Uses `CategoryCard` and `StyledH4` from UI modules, shared
  `CourseCategory` type, and styled-components theme color `grayLighter`.
- Has no local state, client directive, or event logic of its own.

## Accessibility

Each category is a native button with an image alternative provided by
`CategoryCard`. The category container has the accessible label
`Categorias de cursos`.

## Verification and maintenance

`Categories.spec.tsx` verifies the heading, list label, rendered categories,
selection forwarding, and empty-list behavior. Run it with:

```bash
npx vitest run components/layouts/Categories/Categories.spec.tsx
```

Keep this README synchronized with `Categories.tsx`, `Categories.types.ts`, and
`index.ts` when the rendered list, callback contract, or exports change.

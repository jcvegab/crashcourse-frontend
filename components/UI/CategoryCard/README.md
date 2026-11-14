# CategoryCard

Selectable category tile used in the course category list. It shows a category
icon and its name, and notifies the parent when activated.

## Public API

Import the default component and prop type from `@/ui/CategoryCard`:

```tsx
import CategoryCard from '@/ui/CategoryCard';
import type { CategoryCardProps } from '@/ui/CategoryCard';
```

| Prop | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `category` | `string` | Yes | - | Name shown on the tile and included in the image alternative text. |
| `onSelect` | `(category: string) => void` | Yes | - | Called with this card's category when activated. |

## Usage

```tsx
import CategoryCard from '@/ui/CategoryCard';

export function CategoryFilter() {
  return (
    <CategoryCard
      category="Programación"
      onSelect={(category) => console.log('Selected:', category)}
    />
  );
}
```

In the application, `Categories` passes the callback through to `Main`, which
owns the active filter state.

## Behavior and dependencies

- Renders a native `button` with `type="button"`; activating it calls
  `onSelect(category)`.
- Uses Next.js `Image` to load `/icons/category-icon.svg` at 40 by 40 pixels.
- Uses styled-components theme colors `black` and `grayLighter`; requires the
  application's `ThemeProvider`.
- Has no selected-state prop or internal filtering state; selection state is
  controlled by the parent.

## Accessibility

The native button supports keyboard activation. The image alternative is
`Categoria {category}`. The component does not expose a pressed or selected
state to assistive technology.

## Verification and maintenance

`CategoryCard.spec.tsx` checks the category text, pointer and keyboard
activation, callback value, and image alternative text. Run it with:

```bash
npx vitest run components/UI/CategoryCard/CategoryCard.spec.tsx
```

Keep this README synchronized with `CategoryCard.tsx`,
`CategoryCard.types.ts`, and `index.ts` when interaction, props, asset, or
presentation changes.

# Title

Exports four styled semantic headings for consistent typography across the
application. Use the heading level that matches the document structure; choose
the size through the component name.

## Public API

Import the heading components and their shared prop type from `@/ui/Title`:

```tsx
import { StyledH1, StyledH2, StyledH3, StyledH4 } from '@/ui/Title';
import type { TitleProps } from '@/ui/Title';
```

Each heading accepts `children` from its underlying styled HTML heading plus
these optional shared props:

| Prop | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `children` | `React.ReactNode` | No | `undefined` | Heading content. |
| `margin` | `string` | No | `undefined` | Value assigned to `margin-bottom`. |
| `movile` | `boolean` | No | `false` | Preserves the existing spelling; when true, reduces the font size for the mobile variant. |

The component exports do not add a default export. `TitleProps` describes the
custom props shared by all four headings.

## Usage

```tsx
import { StyledH2 } from '@/ui/Title';

export function SectionHeading() {
  return <StyledH2 margin="24px">Cursos disponibles</StyledH2>;
}
```

Use `StyledH1`, `StyledH2`, `StyledH3`, or `StyledH4` to render the matching
native heading level. The `movile` flag applies that heading's smaller font
size; it does not change the semantic level.

## Behavior and dependencies

- `StyledH1` through `StyledH4` render `h1` through `h4` elements.
- Base font sizes are 20px, 40px, 32px, and 24px respectively; line heights are
  18px, 44px, 44px, and 28px.
- With `movile`, the corresponding font sizes are 18px, 32px, 24px, and 20px.
- Text color and weight come from styled-components theme color `black`; the
  application must provide its `ThemeProvider`.
- This module has no client directive or browser-only behavior.

## Accessibility

The exports retain native heading semantics. Choose heading levels according
to page hierarchy rather than visual size alone. The component does not set an
accessible name; provide meaningful text as `children`.

## Verification and maintenance

`Title.spec.tsx` verifies the four semantic element levels, content rendering,
and that each mobile variant renders. Run it with:

```bash
npx vitest run components/UI/Title/Title.spec.tsx
```

Keep this README in sync with `Title.tsx`, `Title.types.ts`, and `index.ts` when
heading styles, props, or exports change.

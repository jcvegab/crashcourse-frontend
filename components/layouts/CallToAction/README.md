# CallToAction

Promotional banner rendered near the top of the home page. It contains a
placeholder course heading and a purchase button.

## Public API

Import the default component from `@/layouts/CallToAction`:

```tsx
import CallToAction from '@/layouts/CallToAction';
```

`CallToAction` accepts no custom props or children.

## Usage

```tsx
import CallToAction from '@/layouts/CallToAction';

export function HomeContent() {
  return <CallToAction />;
}
```

## Behavior and dependencies

- Renders a semantic section with the placeholder heading `Title H2 - banner
  cursos nuevos` and the button text `Comprar ahora`.
- The primary medium Button is a native button without a handler.
  No checkout or campaign behavior is implemented by this banner.
- Uses `StyledH2` from `@/ui/Title` and `Button` from `@/ui/Button`.
- Uses the styled-components theme color `grayLighter` and requires the
  application's `ThemeProvider`.
- Has no state, event handlers, or client directive.

## Accessibility

The banner uses a section and an `h2`, followed by a native button with the
accessible name `Comprar ahora`. The section has no explicit accessible name.

## Verification and maintenance

`CallToAction.spec.tsx` verifies the banner heading, section, and native purchase
button without an implicit navigation destination. Run it with:

```bash
npx vitest run components/layouts/CallToAction/CallToAction.spec.tsx
```

Keep this README synchronized with `CallToAction.tsx` and `index.ts` when the
copy, navigation, layout, or exports change.

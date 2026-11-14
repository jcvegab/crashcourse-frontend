# Logo

Crashcourse brand link used in the site header. It combines the logo image and
brand heading inside a link to the home page.

## Public API

Import the default component from `@/ui/Logo`:

```tsx
import Logo from '@/ui/Logo';
```

`Logo` accepts no custom props or children.

## Usage

```tsx
import Logo from '@/ui/Logo';

export function SiteHeader() {
  return <header><Logo /></header>;
}
```

## Behavior and dependencies

- Renders a Next.js `Link` whose destination is `/`.
- Loads `/logo.svg` as an image and renders the `Crashcourse` brand text as a
  styled `h1` from `@/ui/Title`.
- Uses styled-components for horizontal alignment; it does not read theme
  values or require the theme provider for its own styles.
- Has no props, state, click handlers, or client directive.

## Accessibility

The home link contains an image with alt text `Crashcourse` and an `h1` with
the same brand name. This is the existing accessible content; consider the
repeated brand announcement when using the component in a page with another
top-level heading.

## Verification and maintenance

`Logo.spec.tsx` verifies the image alternative, visible brand heading, and
home destination. Run it with:

```bash
npx vitest run components/UI/Logo/Logo.spec.tsx
```

Keep this README synchronized with `Logo.tsx` and `index.ts` when the brand
assets, destination, heading, or public API changes.

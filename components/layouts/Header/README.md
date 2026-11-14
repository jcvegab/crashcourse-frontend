# Header

Top-level site header shared by the home and course detail pages. It combines
the Crashcourse home link with a registration call to action.

## Public API

Import the default component from `@/layouts/Header`:

```tsx
import Header from '@/layouts/Header';
```

`Header` accepts no custom props or children.

## Usage

```tsx
import Header from '@/layouts/Header';

export function PageShell() {
  return (
    <>
      <Header />
      <main>{/* Page content */}</main>
    </>
  );
}
```

## Behavior and dependencies

- Renders the `Logo` module, which links to `/`.
- Renders `Regístrate gratis` as a small secondary `Button`.
- The button currently has no `url`, so the shared `Button` links it to `/`.
  The header does not implement a registration flow.
- Uses styled-components for spacing and layout. Its child Button requires
  the app's styled-components theme provider.
- Has no state, event handlers, or client directive.

## Accessibility

The component uses a semantic `header`. The brand link includes the logo's
image alternative and `h1`; the registration action is a native link with a
visible accessible name. The current registration destination is the home
page.

## Verification and maintenance

`Header.spec.tsx` checks brand content, the home destination, and the
registration link destination. Run it with:

```bash
npx vitest run components/layouts/Header/Header.spec.tsx
```

Keep this README synchronized with `Header.tsx` and `index.ts` when header
content, child modules, or navigation changes.

# LoadingPage

Full-page loading presentation used by the App Router `app/loading.tsx`
convention while route content is loading.

## Public API

Import the default component from `@/layouts/LoadingPage`:

```tsx
import LoadingPage from '@/layouts/LoadingPage';
```

`LoadingPage` accepts no custom props or children.

## Usage

The route loading file returns the component:

```tsx
import LoadingPage from '@/layouts/LoadingPage';

export default function Loading() {
  return <LoadingPage />;
}
```

## Behavior and dependencies

- Renders the `Crashcourse` h2, a `Spinner`, and the `Cargando...` h3 message.
- Wraps the content in a styled div with `aria-live="polite"`.
- Requires the app's styled-components setup and uses `Spinner` and heading
  components from `@/ui` modules.
- Retains the `'use client'` directive because its styling/runtime boundary
  is part of the current App Router implementation.
- Has no props, local state, or event handlers.

## Accessibility

The loading copy is announced through a polite live region. The child spinner
exposes `role="status"` and the accessible label `Cargando`.

## Verification and maintenance

`LoadingPage.spec.tsx` verifies both headings, the polite live region, and the
accessible spinner status. Run it with:

```bash
npx vitest run components/layouts/LoadingPage/LoadingPage.spec.tsx
```

Keep this README synchronized with `LoadingPage.tsx` and `index.ts` when the
loading content, client boundary, accessibility, or exports change.

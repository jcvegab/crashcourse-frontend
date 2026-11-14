# Spinner

Small animated loading indicator for content that is temporarily being
prepared. The module has no custom props; render it where a loading status
needs to be announced.

## Public API

Import the default component from `@/ui/Spinner`:

```tsx
import Spinner from '@/ui/Spinner';
```

`Spinner` accepts no custom props or children.

## Usage

```tsx
import Spinner from '@/ui/Spinner';

export function LoadingStatus() {
  return <Spinner />;
}
```

## Behavior and dependencies

- Renders an 80px circular element with a 10px border and an infinite one
  second rotation animation.
- Uses the styled-components theme color `baseMain` for the animated edge and
  requires the application's `ThemeProvider`.
- Has no data, event handlers, or client directive.

## Accessibility

The indicator exposes `role="status"` and the accessible label `Cargando` so
assistive technology can identify the loading status. It has no visible text.

## Verification and maintenance

`Spinner.spec.tsx` checks the status role and accessible label. Run it with:

```bash
npx vitest run components/UI/Spinner/Spinner.spec.tsx
```

Keep this README synchronized with `Spinner.tsx` and `index.ts` when the
animation, theme dependency, accessible name, or public API changes.

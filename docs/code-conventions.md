# Code Conventions

## Custom Paths

TypeScript path aliases are configured in `tsconfig.json` to reduce long relative imports and align the project with the portfolio conventions.

Available aliases:

- `@/components/*` maps to `components/*`.
- `@/layouts/*` maps to `components/layouts/*`.
- `@/ui/*` maps to `components/UI/*`.
- `@/lib/*` maps to `lib/*`.
- `@/types/*` maps to `types/*`.
- `@/test/*` maps to `test/*`.

Do not convert every import at once. Prefer aliases when editing a file for a focused migration or refactor.

## Component Organization

Components should keep files close to the component they describe. Use this structure when creating or migrating components:

```txt
components/ExampleComponent/
  ExampleComponent.tsx
  ExampleComponent.types.ts
  index.ts
  __tests__/
    ExampleComponent.spec.tsx
```

Expected names:

- Component implementation: `<Component>.tsx`.
- Component-only types: `<Component>.types.ts`.
- Component tests: `__tests__/<Component>.spec.tsx`.

## Props And Types

Props used by only one component should live next to that component in `<Component>.types.ts` when the type is not trivial.

Shared, domain, or API response types should live in a shared `*.types.ts` file or under `types/` when used across modules.

Prefer explicit prop type names using `<ComponentName>Props`.

Example:

```tsx
// CourseCard.types.ts
export type CourseCardProps = {
  name: string;
  tutorUsername: string;
  level: string;
  users: number;
  score: number;
  price: number;
  realPrice: number;
};
```

Avoid large inline prop types inside JSX files. Avoid `React.FC` unless there is an explicit reason.

Props are destructured in the function signature. Avoid the legacy single `props` object pattern in new or touched components.

## Tests

Unit tests should live in a `__tests__` folder inside the same module or component folder.

Correct:

```txt
components/UI/Button/
  Button.tsx
  Button.types.ts
  __tests__/
    Button.spec.tsx
```

Avoid top-level test folders for component unit tests.

## Refactor Scope

Do not mix structural refactors with functional changes.

Keep these changes in separate commits:

- File moves or folder restructuring.
- Type extraction or prop normalization.
- Visual or behavior changes.
- GraphQL query changes.
- SSR, App Router, or framework upgrade work.

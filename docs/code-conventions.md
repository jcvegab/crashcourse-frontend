# Code Conventions

## Custom Paths

TypeScript path aliases are configured in `tsconfig.json` to reduce long relative imports and align the project with the portfolio conventions.

Available aliases:

- `@/layouts/*` maps to `components/layouts/*`.
- `@/ui/*` maps to `components/UI/*`.
- `@/lib/*` maps to `lib/*`.
- `@/types/*` maps to `types/*`.
- `@/test/*` maps to `test/*`.

Use the specific `@/ui/*` and `@/layouts/*` aliases for components. Relative imports are allowed within a component module.

## Component Organization

Components should keep files close to the component they describe. Use this structure when creating or migrating components:

```txt
components/ExampleComponent/
  ExampleComponent.tsx
  ExampleComponent.types.ts   # when component-specific types exist
  ExampleComponent.spec.tsx
  index.ts
  README.md
```

Expected names:

- Component implementation: `<Component>.tsx`.
- Component-only types: `<Component>.types.ts`.
- Component tests: `<Component>.spec.tsx` beside the implementation.
- Component documentation: `README.md` beside the implementation and barrel.

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
  price: number | string;
  realPrice: number | string;
};
```

Avoid large inline prop types inside JSX files. Avoid `React.FC` unless there is an explicit reason.

The TypeScript configuration uses the automatic `react-jsx` runtime, so JSX
does not need a React import. For React types, use the project-wide namespace
(`React.ReactNode`, `React.ReactElement`) without importing the default `React`
or standalone aliases such as `ReactNode`.

Props are destructured in the function signature. Avoid the legacy single `props` object pattern in new or touched components.

## Tests

Unit tests should live beside the file they cover. Component tests use `<Component>.spec.tsx`; route and helper specs use `*.spec.ts` or `*.spec.tsx`.

Correct:

```txt
components/UI/Button/
  Button.tsx
  Button.types.ts
  Button.spec.tsx
  index.ts
  README.md
```

Each component README must document its purpose, exports and props, realistic usage, behavior, dependencies, accessibility, and verification. Document current behavior and limitations without implying unimplemented features.

During a structural migration, old and colocated test layouts may coexist temporarily. Remove old layouts when their final suite has moved.

## Refactor Scope

Do not mix structural refactors with functional changes.

Keep these changes in separate commits:

- File moves or folder restructuring.
- Type extraction or prop normalization.
- Visual or behavior changes.
- GraphQL query changes.
- SSR, App Router, or framework upgrade work.

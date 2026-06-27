# Code Conventions

## Custom Paths

TypeScript path aliases are configured in `tsconfig.json` to reduce long relative imports and align the project with the portfolio conventions.

Available aliases:

- `@/components/*` maps to `components/*`.
- `@/layouts/*` maps to `components/layouts/*`.
- `@/ui/*` maps to `components/UI/*`.
- `@/pages/*` maps to `pages/*`.
- `@/lib/*` maps to `lib/*`.
- `@/types/*` maps to `types/*`.
- `@/utils/*` maps to `utils/*`.

Do not convert every import at once. Prefer aliases when editing a file for a focused migration or refactor.

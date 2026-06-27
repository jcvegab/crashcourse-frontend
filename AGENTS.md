# AGENTS.md

## Commands

```bash
npm run dev         # dev server at localhost:3000
npm run build       # production build
npm run start       # serve production build
npm run lint        # biome check
npm run lint:fix    # biome check --write --unsafe
npm run format      # biome format --write
npm run format:check# biome format
npm run typecheck   # tsc --noEmit
npm run test        # vitest run
npm run test:watch  # vitest
npm run coverage    # vitest run --coverage
npm run e2e         # playwright test
npm run e2e:ui      # playwright test --ui
```

## Testing

- **Vitest** for unit tests, **Playwright** for E2E.
- Coverage threshold: 90% (statements, branches, functions, lines).
- Tests live in `__tests__` dir inside each component folder.
- Spec pattern: `Component.spec.tsx`.
- Vitest globals enabled — no need to import `describe`, `it`, `expect`.

## Git hooks

`husky` + `lint-staged` run `biome check --write --unsafe --no-errors-on-unmatched` on staged files before every commit. Commits must pass lint-staged checks.

## Environment

`SERVER_API_URL` + `INTERNAL_TOKEN` must be defined in `.env.local`. Without them, every GraphQL query fails.

```env
SERVER_API_URL=
INTERNAL_TOKEN=
NEXT_PUBLIC_SITE_URL=
```

## Architecture

- **Next.js 16 App Router** — NOT Pages Router.
- **GraphQL** — Custom server-only `gql<TData, TVariables>()` function at `lib/gql.ts`. Uses `fetch` with `SERVER_API_URL` + `INTERNAL_TOKEN` + optional auth cookie. Supports ISR via `next: { revalidate, tags }`. No Apollo Client.
- **styled-components SSR** — Uses `lib/registry.tsx` (Client Component wrapping `ServerStyleSheet` + `StyleSheetManager`). Theme and global styles in `app/providers.tsx`. Consumed via `${({ theme }) => theme.colors.X}`.
- **Category filtering** is client-side in `Main.tsx` — `currentCategory` state, `"All"` sentinel means no filter.
- **SEO** — `lib/seo.ts` helpers: `buildSeo`, `buildHomeSeo`, `buildCourseSeo`. JSON-LD structured data for Course schema. App Router `generateMetadata` or `metadata` export.
- **Course queries** — Fragment `COURSE_FIELDS_FRAGMENT` in `lib/courseQueries.ts` shared across pages.

## Conventions (easy to get wrong)

- Props are destructured normally (e.g. `function Main({ category, courses })`), NOT as single `props` object.
- Types live in `Component.types.ts` next to component, or shared types in `types/*.types.ts`.
- Components follow structure: `Component.tsx`, `Component.types.ts`, `index.ts`, `__tests__/Component.spec.tsx`.
- GraphQL queries use variables, NOT interpolation into template strings.
- Use `@/components/*`, `@/lib/*`, `@/types/*`, `@/ui/*`, `@/layouts/*` custom path aliases — avoid relative imports.
- `Button` always wraps Next.js `<Link>` — pass `url`/`path` for routing, `ghost` for outline variant.
- UI text is Spanish placeholder copy.
- One commit per step/change — no mixing unrelated refactors.

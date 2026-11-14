# AGENTS.md

Canonical repository guidance for coding agents. Keep project commands, architecture, workflow, and conventions centralized in this file.

## Commands

```bash
npm run dev           # dev server at localhost:3000
npm run build         # production build
npm run start         # serve production build
npm run lint          # biome check
npm run lint:fix      # biome check --write --unsafe
npm run format        # biome format --write
npm run format:check  # biome format
npm run typecheck     # tsc --noEmit
npm run test          # vitest run
npm run test:watch    # vitest
npm run test:coverage # vitest run --coverage
npm run e2e           # playwright test
npm run e2e:ui        # playwright test --ui
```

## Testing

- **Vitest** for unit tests, **Playwright** for E2E.
- Coverage threshold: 90% (statements, branches, functions, lines).
- Component tests live beside their component as `Component.spec.tsx`.
- Route and helper tests live beside the file they cover as `*.spec.ts` or `*.spec.tsx`.
- Spec pattern: `Component.spec.tsx`.
- Vitest globals enabled — no need to import `describe`, `it`, `expect`.

## Git hooks

`husky` + `lint-staged` run `biome check --write --unsafe --no-errors-on-unmatched` on staged files before every commit. Commits must pass lint-staged checks.

## Workflow

- Work one step at a time and make one focused commit per change.
- Do not mix unrelated changes in the same commit.
- Before committing, run `npm run lint`, `npm run typecheck`, `npm run test:coverage`, and `npm run build`.
- If a required check fails, resolve the failure before committing or report why it is unrelated to the change.

## Environment

`SERVER_API_URL` + `INTERNAL_TOKEN` must be defined in `.env.local`. Without them, every GraphQL query fails.

```env
SERVER_API_URL=
INTERNAL_TOKEN=
NEXT_PUBLIC_SITE_URL=
```

## Architecture

- **Next.js 16 App Router** — NOT Pages Router.
- **React 19 + TypeScript strict mode** — application code is typed strictly.
- **GraphQL** — Custom server-only `gql<TData, TVariables>()` function at `lib/gql.ts`. Uses `fetch` with `SERVER_API_URL` + `INTERNAL_TOKEN` + optional auth cookie. Supports ISR via `next: { revalidate, tags }`. No Apollo Client.
- **styled-components SSR** — Uses `lib/registry.tsx` (Client Component wrapping `ServerStyleSheet` + `StyleSheetManager`). Theme and global styles in `app/providers.tsx`. Consumed via `${({ theme }) => theme.colors.X}`.
- **Category filtering** is client-side in `Main.tsx` — `currentCategory` state, `"All"` sentinel means no filter.
- **SEO** — `buildCourseSeo` in `lib/seo.ts` supplies course metadata and Course JSON-LD to the route's App Router `generateMetadata`; site metadata is declared in `app/layout.tsx`.
- **Course queries** — Fragment `COURSE_FIELDS_FRAGMENT` in `lib/courseQueries.ts` shared across pages.

## Project structure

```text
app/
├── layout.tsx                  # Root layout with providers
├── providers.tsx               # Theme + GlobalStyle
├── page.tsx                    # Home route /
├── checkout/page.tsx           # /checkout route
└── cursos/[id]/page.tsx        # Course detail route and metadata
lib/
├── gql.ts                      # Server-only GraphQL client
├── seo.ts / seo.types.ts       # SEO helpers and types
└── courseQueries.ts            # Shared course GraphQL fragments
components/
├── UI/                         # Presentational components
└── layouts/                    # Page sections and compositions
types/
└── course.types.ts             # Shared course types
```

## Conventions (easy to get wrong)

- Props are destructured normally (e.g. `function Main({ category, courses })`), NOT as single `props` object.
- Types live in `Component.types.ts` next to component, or shared types in `types/*.types.ts`.
- TypeScript uses the automatic `react-jsx` runtime; JSX needs no React import. Use the project-wide `React` namespace for types (`React.ReactNode`, `React.ReactElement`) without importing React or standalone aliases such as `ReactNode`.
- Components follow structure: `Component/Component.tsx`, optional `Component/Component.types.ts`, `Component/index.ts`, `Component/Component.spec.tsx`, and `Component/README.md`.
- GraphQL queries use variables, NOT interpolation into template strings.
- Use `@/lib/*`, `@/types/*`, `@/ui/*`, and `@/layouts/*` custom path aliases between modules. Relative imports are allowed within a component module.
- `Button` wraps Next.js `<Link>` — pass `url` for routing, `variant="secondary"` for the outline variant, and `size` or `fullWidth` for sizing.
- UI text is Spanish placeholder copy.
- One commit per step/change — no mixing unrelated refactors.

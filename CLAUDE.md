# CLAUDE.md — Crashcourse Frontend

This file provides guidance to Claude Code when working with this repository.

## Commands

```bash
npm run dev             # Dev server at http://localhost:3000
npm run build           # Production build (must be green before commit)
npm run start           # Serve the production build
npm run lint            # Biome check (linter + formatter)
npm run lint:fix        # Auto-fix lint/format issues
npm run format          # Format all files with Biome
npm run typecheck       # TypeScript type checking (tsc --noEmit)
npm run test            # Run Vitest unit tests
npm run test:coverage   # Run unit tests with coverage (threshold: 90%)
npm run e2e             # Run Playwright E2E tests
npm run e2e:ui          # Run Playwright E2E tests in UI mode
```

## Workflow rules

- Execute one step at a time; commit after each step.
- Do not mix unrelated changes in the same commit.
- Before committing: run `npm run lint`, `npm run typecheck`, `npm run test`, `npm run build`.
- If the build fails, fix the issue before committing.

## Environment

Required `.env.local` variables:

```env
SERVER_API_URL=
INTERNAL_TOKEN=
NEXT_PUBLIC_SITE_URL=
```

`SERVER_API_URL` + `INTERNAL_TOKEN` are mandatory — without them every GraphQL query fails. Build step loads them from `.env.local` or GitHub Actions secrets.

## Architecture

- **Next.js 16 App Router** — routes live in `app/`. No Pages Router.
- **React 19** with TypeScript strict mode.
- **GraphQL** — Custom `gql<TData, TVariables>()` in `lib/gql.ts`. Server-only `fetch`-based client with ISR support (`next: { revalidate, tags }`). No Apollo Client.
- **styled-components SSR** — `lib/registry.tsx` wraps children with `ServerStyleSheet` + `StyleSheetManager`. Theme (`theme.colors`) in `app/providers.tsx`.
- **SEO** — `lib/seo.ts` helpers: `buildSeo`, `buildHomeSeo`, `buildCourseSeo`. JSON-LD structured data for Course schema. Use `generateMetadata` or `metadata` export in App Router pages.
- **Biome** — Replaces ESLint + Prettier. `biome.json` configures linter, formatter, import organizer.
- **lint-staged** — Runs Biome on staged files before every commit via husky.

## Conventions to follow

- **Types**: Props typed explicitly in `*.types.ts` next to the component. Shared domain types in `types/*.types.ts`. Avoid `any`.
- **Imports**: Use custom aliases (`@/components/*`, `@/lib/*`, `@/types/*`, `@/ui/*`) — no relative `../` imports.
- **Components**: Structure is `Component.tsx`, `Component.types.ts`, `__tests__/Component.spec.tsx`.
- **Props**: Destructure normally (`function Main({ category, courses })`), not as single `props` object.
- **GraphQL queries**: Always use variables, never interpolate values into template strings.
- **Tests**: Unit tests in `__tests__` inside the component folder. Coverage threshold is 90%.
- **SEO**: Update `generateMetadata` or `metadata` when page data changes. Use `lib/seo.ts` helpers.
- **Styled-components**: Use `${({ theme }) => theme.colors.X}` for theme access. No hardcoded color values.

## Project structure

```
app/
├── layout.tsx                  # Root layout with providers
├── providers.tsx               # Theme + GlobalStyle
├── page.tsx                    # Home route /
├── checkout/
│   └── page.tsx                # /checkout route
└── cursos/[id]/
    └── page.tsx                # /cursos/[id] route (SSR + generateMetadata)
lib/
├── gql.ts                      # GraphQL client
├── seo.ts / seo.types.ts       # SEO helpers
└── courseQueries.ts            # Shared GraphQL fragments
components/
├── UI/                         # Presentational primitives
└── layouts/                    # Page sections
types/
├── course.types.ts             # Shared course types
└── styled-components.d.ts      # Theme type augmentation
```

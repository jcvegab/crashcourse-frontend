# Crashcourse Frontend

Frontend de Crashcourse: plataforma de cursos construida con Next.js 16 App Router, React 19, TypeScript, GraphQL server-side, styled-components SSR, ISR y SEO para una UI en español.

## Project Scope

- Home con categorías y grilla de cursos.
- Detalle de curso en `/cursos/[id]` con metadata dinámica y JSON-LD Course.
- Checkout estático en `/checkout`.
- Integración server-side con `crashcourse-backend` vía GraphQL.
- Testing unitario con Vitest y E2E con Playwright.

## Requirements

- Node.js >= 24
- npm >= 11
- A running [crashcourse-backend](https://github.com/jcvegab/crashcourse-backend) instance (GraphQL endpoint + `INTERNAL_TOKEN`)

## Quick Start

```bash
# Copy environment file
cp .env.example .env.local

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Copy `.env.example` to `.env.local` and configure:

| Variable | Description |
|---|---|
| `SERVER_API_URL` | GraphQL endpoint URL of `crashcourse-backend` |
| `INTERNAL_TOKEN` | Shared secret used as `X-Internal-Token` header on every request (Cloudflare WAF bypass) |
| `NEXT_PUBLIC_SITE_URL` | Public site URL used for SEO / metadata generation |

Without `SERVER_API_URL` + `INTERNAL_TOKEN`, every GraphQL query fails.

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Dev server at `localhost:3000` |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | Biome check |
| `npm run lint:fix` | Biome check --write --unsafe |
| `npm run format` | Biome format --write |
| `npm run format:check` | Biome format |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run test` | Vitest run |
| `npm run test:watch` | Vitest watch mode |
| `npm run test:coverage` | Vitest with coverage (90% threshold) |
| `npm run e2e` | Playwright E2E tests |
| `npm run e2e:ui` | Playwright UI mode |

CI order: lint `->` typecheck `->` test `->` e2e.

## Architecture

- **Framework:** Next.js 16 App Router (NOT Pages Router).
- **UI:** React 19 + TypeScript.
- **Styling:** styled-components with SSR via `lib/registry.tsx` (`ServerStyleSheet` + `StyleSheetManager`). Theme + globals in `app/providers.tsx`. Consume via `${({ theme }) => theme.colors.X}`.
- **Data:** Custom server-only `gql<TData, TVariables>()` function at `lib/gql.ts` — `fetch` based, no Apollo Client. Supports ISR via `next: { revalidate, tags }`. Forwards `auth-token` cookie as `Authorization: Bearer` and always sends `X-Internal-Token`.
- **Course queries:** Shared fragment `COURSE_FIELDS_FRAGMENT` in `lib/courseQueries.ts`.
- **SEO:** `lib/seo.ts` helpers (`buildSeo`, `buildHomeSeo`, `buildCourseSeo`) + Course JSON-LD via `generateMetadata`.
- **Category filtering:** client-side in `Main.tsx` — `currentCategory` state, `"All"` sentinel means no filter.
- **Codebase memory:** indexed as `home-jcvegab-jcvegab-projects-crashcourse-frontend` for graph-based code discovery.

### Routing

```
app/
  page.tsx              ->  /            Home (categories + courses grid)
  cursos/[id]/page.tsx  ->  /cursos/:id  Course detail
  checkout/page.tsx     ->  /checkout    Checkout flow
  error.tsx             ->  Global error boundary
  layout.tsx            ->  Root layout (providers + registry)
```

## Conventions

- Props are destructured normally (e.g. `function Main({ category, courses })`), NOT as a single `props` object.
- Component layout: `Component.tsx`, `Component.types.ts`, `index.ts`, `__tests__/Component.spec.tsx`.
- Types live next to the component in `Component.types.ts`; shared types in `types/*.types.ts`.
- GraphQL queries use variables, NOT template-string interpolation.
- Use path aliases: `@/components/*`, `@/lib/*`, `@/types/*`, `@/ui/*`, `@/layouts/*` — avoid relative imports.
- `Button` always wraps Next.js `<Link>` — pass `url`/`path` for routing, `ghost` for outline variant.
- UI copy is Spanish placeholder text.
- One commit per step/change — no mixing unrelated refactors.

## Testing

- **Vitest** for unit tests, **Playwright** for E2E.
- Coverage threshold: 90% (statements, branches, functions, lines).
- Tests live in `__tests__/` next to each component. Spec pattern: `Component.spec.tsx`.
- Vitest globals enabled — no need to import `describe`, `it`, `expect`.

## Documentation

- `docs/documentation-update-plan.md` — plan applied for README, package metadata, docs and GitHub topics.
- `docs/code-conventions.md` — aliases, component layout and refactor boundaries.
- `docs/graphql-conventions.md` — server-side GraphQL usage, variables, caching and error handling.
- `docs/test-coverage.md` — current coverage state, thresholds and test strategy.
- `docs/final-modernization-report.md` — modernization summary and final verification notes.

## Git hooks

`husky` + `lint-staged` run `biome check --write --unsafe --no-errors-on-unmatched` on staged files before every commit. Commits must pass lint-staged checks.

## Deployment

Target: [Vercel](https://vercel.com).

Configure the env vars in the Vercel project settings, point at the production backend, and deploy.

Production URL: https://crashcourse.jcvegab.dev

## Related

- [crashcourse-backend](https://github.com/jcvegab/crashcourse-backend) — Django + GraphQL API.

## License

UNLICENSED. Private repository/package.

## Author

Joseph Vega — admin@jcvegab.dev

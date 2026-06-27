# Modernization Baseline

> Document generated: 2026-06-26
> State captures the project before any modernization work.

## Environment

| Item | Value |
|------|-------|
| Node.js | v24.16.0 |
| npm | (bundled with Node 24) |
| OS | Linux |

## Core Dependencies

| Package | Version | Notes |
|---------|---------|-------|
| next | ^12.3.7 | Pages Router (NOT App Router) |
| react | ^17.0.2 | Locked to Next 12 compatibility |
| react-dom | ^17.0.2 | |
| @apollo/client | ^3.14.0 | Uses deprecated `uri` config (no HttpLink) |
| graphql | ^15.10.1 | |
| styled-components | ^5.3.11 | SSR configured via ServerStyleSheet |
| eslint-config-next | ^12.3.7 | Tied to Next.js 12 |
| babel-plugin-styled-components | ^1.13.3 | Dev dependency |

## Project Structure

```
crashcourse-frontend/
├── components/
│   ├── UI/
│   │   ├── Button.js
│   │   ├── CategoryCard.js
│   │   ├── CourseCard.js
│   │   ├── CourseCost.js
│   │   ├── CoursePreview.js
│   │   ├── CourseStats.js
│   │   ├── Logo.js
│   │   ├── Spinner.js
│   │   ├── Tag.js
│   │   └── Title.js
│   └── layouts/
│       ├── CallToAction.js
│       ├── Categories.js
│       ├── CoursesList.js
│       ├── Header.js
│       ├── LoadingPage.js
│       └── Main.js
├── pages/
│   ├── _app.js
│   ├── _document.js
│   ├── index.js
│   ├── checkout.js
│   └── cursos/[id].js
├── public/
├── styles/
│   └── _app.css
├── next.config.js
├── package.json
└── package-lock.json
```

**No `src/` directory exists.**
**No `docs/` directory existed before baseline.**
**No test runner configured.**
**No TypeScript configured.**
**No Biome/Prettier configured.**

## Build Results

### Command: `npm run build`

**Status: Compiled successfully** — but with runtime Apollo errors during page generation.

**Warnings:**
- Browserslist: caniuse-lite is outdated (appears twice)

**Errors (Apollo Client runtime):**
Multiple occurrences of two distinct errors during static page generation:

1. `ApolloClient / uri / Please initialize an instance of HttpLink with uri instead.`
   - Source: `pages/api/apolloClient.js` passes `uri` directly to `ApolloClient` constructor
   - Apollo Client v3.14.0 deprecated this; requires explicit `HttpLink`

2. `cache.diff / canonizeResults / Please remove this option.`
   - Source: `InMemoryCache` default config uses deprecated `canonizeResults`

Both errors appear ~18 times during `Collecting page data` and `Generating static pages`.
Build completed despite errors and generated all pages.

### Generated Routes

| Route | Type | Size | First Load JS |
|-------|------|------|---------------|
| `/` | Static (CSR data) | 7.41 kB | 159 kB |
| `/_app` | - | 0 B | 138 kB |
| `/404` | Static | 193 B | 139 kB |
| `/api/apolloClient` | λ (Server) | 0 B | 138 kB |
| `/checkout` | Static | 329 B | 139 kB |
| `/cursos/[id]` | Static (CSR data) | 2.82 kB | 155 kB |

## Lint Results

### Command: `npx next lint` (strict config)

ESLint config auto-generated to `.eslintrc.json`:

```json
{
  "extends": "next/core-web-vitals"
}
```

**2 warnings, 0 errors:**

| File | Line | Warning |
|------|------|---------|
| `components/UI/CategoryCard.js` | 25 | Image elements must have an alt prop (jsx-a11y/alt-text) |
| `components/UI/Logo.js` | 16 | Do not use `<img>` element. Use `<Image />` from `next/image` (@next/next/no-img-element) |

No errors found.

## Current Scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  }
}
```

No `lint`, `typecheck`, `test`, or `format` scripts exist.

## Key Architectural Details

### Apollo Client
- Defined in `pages/api/apolloClient.js`
- Minimal setup: `new ApolloClient({ cache: new InMemoryCache(), uri: process.env.NEXT_PUBLIC_API_URL })`
- Uses deprecated `uri` option (should be `HttpLink`)
- `NEXT_PUBLIC_API_URL` env var is required for queries to work
- No SSR-compatible Apollo setup
- No separation of client/server API URLs

### styled-components SSR
- Enabled via `next.config.js`: `compiler.styledComponents: true`
- `_document.js` uses `ServerStyleSheet` pattern
- Theme defined inline in `_app.js`

### Data Fetching (CSR)
All pages use client-side data fetching:

- **`/` (index.js)**: `useQuery(ResumeQuery)` — fetches categories and courses
- **`/cursos/[id]`**: `useQuery(CourseQuery(id))` — fetches course by id from `useRouter().query`
  - Query built via template interpolation: `` gql`... course(id: ${id}) ...` ``
  - Uses `useRouter` to extract `id` param client-side
  - `getStaticPaths`/`getStaticProps` are commented out (stubbed)
- **`/checkout`**: No data fetching (static placeholder)

### Component Pattern
- Components receive data through a single prop named `props`:
  - `index.js` → `<Main props={data}>` — receives full query result (categories + courses)
  - `[id].js` → `<CoursePreview props={data.course}>` — receives course object
- `Main.js` owns `currentCategory` state and client-side filtering

### GraphQL Security
- `[id].js` interpolates route `id` directly into GraphQL template string: `` gql`query { course(id: ${id}) { ... } }` ``
- No GraphQL variables used
- Risk of injection if `id` were user-controlled (currently from URL param)

## Missing Infrastructure

- ❌ `.nvmrc` / `.node-version` (Node version not pinned)
- ❌ TypeScript
- ❌ Biome (uses ESLint with next/core-web-vitals)
- ❌ lint-staged
- ❌ Test runner (Vitest, Jest)
- ❌ E2E (Playwright)
- ❌ CI/CD (GitHub Actions)
- ❌ Dependabot
- ❌ SEO metadata beyond basic `<title>` and `<Head>`
- ❌ `AGENTS.md` / `CLAUDE.md` not updated for current architecture
- ❌ `engines` in `package.json`

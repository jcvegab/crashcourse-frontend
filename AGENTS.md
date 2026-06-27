# AGENTS.md

## Commands

```bash
npm run dev       # dev server at localhost:3000
npm run build     # production build
npm run start     # serve production build
npx next lint     # ad-hoc lint (no `lint` script in package.json)
```

No test runner exists.

## Environment

`NEXT_PUBLIC_API_URL` must be defined in `.env.local` (read by `pages/api/apolloClient.js`). Without it, every GraphQL query fails and pages render "Error in backend..." fallback.

## Architecture (non-obvious)

- **Next.js 12 Pages Router** — NOT App Router. React 17.
- **Apollo GraphQL** — `ApolloClient` at `pages/api/apolloClient.js`, provided via `ApolloProvider` in `_app.js`. Queries are defined inline with `useQuery`/`gql` per page — no separate queries module.
- **styled-components SSR** — `next.config.js` sets `compiler.styledComponents: true`. `_document.js` wires `ServerStyleSheet` — preserve that setup when editing `_document.js`. Theme is defined inline in `_app.js` (`theme.colors`), consumed via `${({ theme }) => theme.colors.X}`. Global resets in `createGlobalStyle` block in `_app.js`.
- **Category filtering** is client-side in `Main.js` — `currentCategory` state, `"All"` sentinel means no filter.

## Conventions (easy to get wrong)

- Components receive data through **a single prop named `props`** (e.g. `function Main({ props })`), not standard React destructuring. Follow this pattern when editing existing files.
- `Button` always wraps Next.js `<Link>` — pass `url`/`path` for routing, `ghost` for outline variant.
- `pages/cursos/[id].js` builds its GraphQL query by **interpolating the route `id` into the template string** (`gql\`... ${id} ...\``), not GraphQL variables. `getStaticPaths`/`getStaticProps` are stubbed out — page is client-rendered.
- UI text is Spanish placeholder copy.

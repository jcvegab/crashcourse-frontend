# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server at http://localhost:3000
npm run build    # Production build
npm run start    # Serve the production build
```

There is no test runner and no `lint` script configured. `eslint-config-next` is installed, so linting can be run ad hoc with `npx next lint`.

## Environment

The Apollo client reads the GraphQL endpoint from `NEXT_PUBLIC_API_URL` (see `pages/api/apolloClient.js`). Without a `.env.local` defining it, all data queries fail and pages render the "Error in backend..." fallback.

## Architecture

Next.js 12 **Pages Router** app (not the App Router). UI is a course marketplace ("Crashcourse"). React 17.

**Data layer — Apollo GraphQL.** A single `ApolloClient` is instantiated in `pages/api/apolloClient.js` and provided app-wide via `ApolloProvider` in `pages/_app.js`. Pages fetch with `useQuery`/`gql` inline — there is no separate queries module. The standard page pattern is: run the query, return an error `<span>` on `error`, return `<Loading />` on `loading`, otherwise render. Note `pages/cursos/[id].js` builds its query by interpolating the route `id` into the gql template string rather than using GraphQL variables.

**Styling — styled-components with SSR.** Configured via `next.config.js` (`compiler.styledComponents`). `pages/_document.js` wires up `ServerStyleSheet` so styles render server-side — preserve that setup when editing `_document.js`. The theme (color palette under `theme.colors`) is defined inline in `pages/_app.js` and consumed everywhere through `${({ theme }) => theme.colors.X}`. Global resets live in the `createGlobalStyle` block in `_app.js`; additional CSS in `styles/`.

**Component layering.**
- `components/UI/` — leaf presentational primitives (`Button`, `Title`, `CourseCard`, `Tag`, etc.). `Title.js` exports `StyledH1`–`StyledH4` sharing a common `css` template; these are the canonical typography elements.
- `components/layouts/` — page sections composed from UI primitives (`Header`, `Main`, `Categories`, `CoursesList`, `CallToAction`, `LoadingPage`).
- Composition flows: page → layout → UI.

**Conventions worth matching.**
- Components receive data through a single prop literally named `props` (e.g. `function Main({ props })`), distinct from React's conventional usage — follow the existing pattern when editing these files.
- Category filtering is client-side: `Main.js` holds `currentCategory` state; clicking a `CategoryCard` toggles it, and an `"All"` sentinel means no filter.
- `Button` always wraps a Next.js `<Link>`; pass `url`/`path` for routing and `ghost` for the outline variant.
- UI text is largely Spanish placeholder copy ("Title H2 - ...").

## Routes

- `/` (`pages/index.js`) — home; lists categories + courses.
- `/cursos/[id]` (`pages/cursos/[id].js`) — course detail. `getStaticPaths`/`getStaticProps` are stubbed out in comments; the page is currently client-rendered.
- `/checkout` (`pages/checkout.js`) — placeholder, renders only a `<Head>`.

# Next.js Upgrade Plan

## Current State

- Next.js: `12.3.7`
- React: `17.0.2`
- React DOM: `17.0.2`
- Runtime target: Node.js `24`
- Router: Pages Router only
- Styling: styled-components `5.3.11` with Next compiler support enabled in `next.config.js`
- Data layer: Apollo Client `3.14.0`
- Main quality command: Biome through `npm run lint`
- Legacy lint command: `npm run lint:legacy` runs `next lint`

## Upgrade Path

The upgrade must stay incremental to keep each commit reversible.

1. First compatibility step: `next@14.2.35`, `react@18.2.0`, `react-dom@18.2.0`.
2. Second compatibility step: `next@15.5.19`, `react@19`, `react-dom@19`.
3. Final target step: `next@16.2.9` with React 19 retained.

## Why Skip Next.js 13

Next.js 13 is the first version that introduces the App Router and requires React
18, but this project is not migrating to App Router in Phase 8. Next.js 14 keeps
Pages Router support, has a more mature App Router baseline for the later phase,
and is a safer first landing point from Next.js 12 than jumping directly to 15 or
16.

## React Impact

- Next.js 13+ requires React `18.2.0` or newer.
- The first upgrade step moves from React 17 to React 18.
- The second upgrade step moves to React 19 because Next.js 15 requires React 19.
- React 19 compatibility must be validated with current styled-components and
  Apollo usage before the final Next.js 16 step.

## styled-components Impact

- Existing SSR setup in `pages/_document.tsx` must remain unchanged while Pages
  Router is still active.
- `compiler.styledComponents: true` remains the preferred Next config path.
- The upgrade should not introduce App Router styled-components registry work;
  that belongs to Phase 9.
- If React 19 exposes styled-components 5 compatibility issues, upgrade
  styled-components in the same Next.js 15 step only if required by validation.

## Apollo Impact

- Apollo Client `3.14.0` already supports SSR-compatible cache creation from the
  previous phase.
- No GraphQL architecture change belongs in this phase.
- SSR pages must keep using server-side Apollo clients without sharing cache
  between requests.

## `next lint` Impact

- Biome is already the primary linter.
- `next lint` is legacy only and can remain during Next.js 14 and 15 if it still
  works.
- Next.js 16 removes `next lint`, so the final upgrade should remove the
  `lint:legacy` script and `eslint-config-next` if no longer needed.

## Pages Router Impact

- Pages Router remains supported through the upgrade path.
- `getServerSideProps`, `pages/_app.tsx`, and `pages/_document.tsx` stay in place
  during Phase 8.
- No `app/` routes should be introduced in Phase 8.
- App Router migration starts only in Phase 9.

## Known Risks

- React 18/19 rendering changes may surface hydration issues in styled-components
  SSR.
- Next.js 15 may require dependency updates around React 19 peer ranges.
- Next.js 16 requires Node.js `>=20.9.0`; Node.js 24 already satisfies this.
- `next lint` removal in Next.js 16 requires script cleanup.
- TypeScript and Next.js generated type behavior may change across versions.
- Existing `pages/api/apolloClient.ts` naming is API-route-like but used as a
  client module; upgrades may make this structure more confusing, but moving it
  should be handled in a separate refactor.

## Validation Per Step

Each upgrade commit must pass:

```bash
npm run lint
npm run typecheck
npm run build
```

For steps that mention tests before Vitest exists, run:

```bash
npm run test || true
```

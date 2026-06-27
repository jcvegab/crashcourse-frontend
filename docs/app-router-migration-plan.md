# App Router Migration Plan

## Routes Audit

| Route | Type | Data Fetching | Client Dependencies | `use client` Needed | Metadata | Priority | Risk |
|---|---|---|---|---|---|---|---|
| `/checkout` | static | none | `SeoHead` (`next/head`) | no | static | 1 (lowest) | very low |
| `/` | static | Apollo SSR (`getServerSideProps`) | `Header`, `Main` (uses `useState`), styled-components | yes (wrapper) | static | 2 | medium |
| `/cursos/[id]` | dynamic | Apollo SSR (`getServerSideProps`) | `Header`, `CoursePreview`, `CourseStats`, `StyledH2`, styled-components | yes (wrapper) | `generateMetadata` | 3 | medium-high |

## Migration Strategy

1. **Prepare App Router base** (`app/layout.tsx`, `app/providers.tsx`, `lib/registry.tsx`).
2. **Migrate `/checkout`** first — no data, validates App Router build.
3. **Migrate `/cursos/[id]`** — validates dynamic routes + `generateMetadata` + `notFound()`.
4. **Migrate `/`** last — homepage, highest traffic, client-side filtering (`useState`).

## Coexistence Rules

- App Router takes precedence over Pages Router for the same path.
- Remove a Pages Router file **only** when its App Router equivalent is committed and green.
- Keep `pages/_app.tsx` and `pages/_document.tsx` while any Pages Router route remains.
- `lib/apolloClient.ts` will be shared by both routers.

## Risks & Mitigations

| Risk | Mitigation |
|---|---|
| styled-components SSR in App Router | Use `StyledComponentsRegistry` with `useServerInsertedHTML` |
| Apollo cache hydration | Create fresh client per server request; browser client is singleton |
| `next/head` not available in App Router | Replace with `metadata` / `generateMetadata` |
| `params` is a Promise in Next.js 15+ | `await params` in async pages and `generateMetadata` |
| `next/link` API differences | Keep current `Button` usage unchanged during migration |

## Routes Remaining in Pages Router (initially)

- `/` (until Step 33)
- `/cursos/[id]` (until Step 32)
- `/checkout` (until Step 31)

After Phase 9, only `pages/_app.tsx` and `pages/_document.tsx` remain as Pages Router infrastructure.

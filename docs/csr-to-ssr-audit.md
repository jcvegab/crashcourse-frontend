# CSR to SSR Audit

## Scope

Audit performed for `pages/` routes that load data on the client with Apollo
`useQuery`, route params from `useRouter`/`router.query`, or dynamic inline
GraphQL queries.

## Summary

| Route | Page | CSR pattern | SSR eligible | SEO relevant | Migration risk |
| --- | --- | --- | --- | --- | --- |
| `/` | `pages/index.tsx` | `useQuery(ResumeQuery)` | Yes | Yes | Medium |
| `/cursos/[id]` | `pages/cursos/[id].tsx` | `useRouter`, `router.query`, `useQuery(CourseQuery(id))` | Yes | Yes | High |
| `/checkout` | `pages/checkout.tsx` | None | No data fetch | Low | Low |

## Route Details

### `/`

- Page: `pages/index.tsx`
- Query: `ResumeQuery`
- Current data loading: client-side Apollo `useQuery`
- Required data:
  - `categories.name`
  - `courses.id`
  - `courses.name`
  - `courses.tutorUsername`
  - `courses.level`
  - `courses.users`
  - `courses.score`
  - `courses.price`
  - `courses.realPrice`
  - `courses.category.name`
- Can be SSR: yes
- SEO need: yes, public course listing should render useful initial HTML
- Migration risks:
  - `Main` performs client-side category filtering, so SSR must preserve the
    same initial data shape.
  - Backend errors currently render `Error in backend...`; SSR should keep a
    controlled fallback.
  - Apollo cache must not be shared between requests.

### `/cursos/[id]`

- Page: `pages/cursos/[id].tsx`
- Query: `CourseQuery(id)`
- Current data loading: client-side Apollo `useQuery`
- Current route param source: `useRouter().query.id`
- Current dynamic GraphQL risk: direct interpolation in `gql` template string
- Required data:
  - `course.name`
  - `course.tutorUsername`
  - `course.level`
  - `course.users`
  - `course.score`
  - `course.price`
  - `course.realPrice`
- Can be SSR: yes
- SEO need: yes, course detail is public and route-specific
- Migration risks:
  - Must validate `id` from `context.params` before querying.
  - Must replace interpolation with GraphQL variables.
  - Must return `notFound: true` when the backend returns no course.
  - Must preserve current loading/error behavior with an SSR-safe fallback.

### `/checkout`

- Page: `pages/checkout.tsx`
- Query: none
- Current data loading: none
- Required data: none
- Can be SSR: not needed for data loading
- SEO need: low; checkout pages are usually transactional
- Migration risks:
  - No SSR migration needed in Phase 5 unless future checkout data is added.

## Recommended Phase 5 Order

1. Prepare Apollo SSR client and environment variable split.
2. Migrate `/cursos/[id]` first because it has the highest SEO and GraphQL
   security impact.
3. Migrate `/` after SSR client is stable because it is public and SEO-relevant.
4. Keep `/checkout` unchanged in Phase 5.

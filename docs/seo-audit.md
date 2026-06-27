# SEO Audit

> Document generated as part of Phase 7, Step 22.
> Source of truth for what SEO metadata can be generated from existing
> page data and GraphQL responses before introducing App Router or
> new backend fields.

## Goal

Identify the SEO metadata that can be safely added to the current
Pages Router pages using:

- The route path
- Static data available in `pages/`
- Course / category data already returned by the existing GraphQL
  `ResumeQuery` and `CourseQuery`
- Environment variables documented in `.env.example`

Constraints:

- No invented data (no fake images, no fake ratings, no fake
  availability).
- No schema changes.
- No breaking changes to existing pages.
- Keep Spanish copy where it already exists.

## Site Identity

| Field | Value | Source |
| --- | --- | --- |
| Site name | `Crashcourse` | `components/UI/Logo.tsx` |
| Locale | `es_PE` (assumed primary, Peru) | UI copy is in Spanish |
| Default title separator | ` | ` | Pattern used in current titles |
| Default image | `/logo.svg` (only existing brand asset) | `public/logo.svg` |
| Favicon | `/favicon.ico` | `public/favicon.ico` |
| Twitter site handle | _not defined_ | No data available — omit |
| Theme color | _not defined_ | No data available — omit |

## Environment

`NEXT_PUBLIC_SITE_URL` is documented in `.env.example` but is not
currently read by any code. It is the canonical source for building
absolute URLs (`og:url`, `link[rel=canonical]`).

If `NEXT_PUBLIC_SITE_URL` is missing at build time, the SEO helper
must fall back to a relative URL or omit the canonical link rather
than inventing one.

## Routes

| Route | Page file | Auth | Public | SEO priority | Current `<Head>` |
| --- | --- | --- | --- | --- | --- |
| `/` | `pages/index.tsx` | Public | Yes | High | title + favicon only |
| `/cursos/[id]` | `pages/cursos/[id].tsx` | Public | Yes | High | title using raw `id` |
| `/checkout` | `pages/checkout.tsx` | Public shell | Transactional | Low | title only |
| `/404` | Next.js default | Public | Error | n/a | default |
| `/500` | Next.js default | Public | Error | n/a | default |

### `/` — Home

- Page: `pages/index.tsx`
- SSR: yes (since Step 20)
- Data available for SEO: `Course`/`CourseSummary` list with
  `name`, `tutorUsername`, `level`, `price`, `realPrice`, `score`,
  `users` and `category.name`. Category names.
- Current `<Head>`:
  - `<title>Crashcourse</title>`
  - `<link rel="icon" href="/favicon.ico" />`
- Missing:
  - meta description
  - canonical URL
  - Open Graph
  - Twitter Card
  - lang attribute on `<html>` is set by `next/document` defaults
- Recommended SEO:
  - `title`: `Crashcourse | Aprende con cursos online`
  - `description`: short, marketing-focused, derived from category
    and course list counts. Hardcoded Spanish copy is acceptable.
  - `canonical`: `${NEXT_PUBLIC_SITE_URL}/`
  - OG type: `website`
  - OG image: `/logo.svg` (only existing asset)
  - Twitter card: `summary`
- JSON-LD: skip for `/`. The page is a listing without a single
  primary entity; a `WebSite` schema could be added later, but it
  needs an explicit `SearchAction` target which we do not have.

### `/cursos/[id]` — Course detail

- Page: `pages/cursos/[id].tsx`
- SSR: yes (since Step 19)
- Data available for SEO: `Course` object with `name`,
  `tutorUsername`, `level`, `users`, `score`, `price`, `realPrice`.
- Current `<Head>`:
  - `<title>Curso ${id} | Crashcourse</title>` — uses raw route
    `id` (e.g. `Curso 123 | Crashcourse`) instead of `course.name`.
- Missing:
  - description
  - canonical URL
  - Open Graph
  - Twitter Card
  - structured data
- Recommended SEO:
  - `title`: `Curso ${course.name} | Crashcourse`
  - `description`: built from `name`, `tutorUsername`, `level`,
    `score` and `price`. Truncated to ~155 chars.
  - `canonical`: `${NEXT_PUBLIC_SITE_URL}/cursos/${id}`
  - OG type: `product` (course) — see Step 24 for structured data
  - OG image: `/logo.svg` (only existing asset)
  - Twitter card: `summary_large_image`
- JSON-LD candidate: `Product` schema (Step 24).
- `noindex`: not required for valid public courses.
- `noindex`: required when `hasError` is true or when the course is
  missing, but those branches already return `notFound: true` in
  `getServerSideProps`, so a 404 response is the correct signal.

### `/checkout` — Checkout

- Page: `pages/checkout.tsx`
- SSR: no data fetch, static page
- Current `<Head>`: `<title>Checkout | Crashcourse</title>` (only
  renders inside `<Head>` with no body, which is a pre-existing
  quirk, not a Step 22 fix).
- Recommended SEO:
  - `title`: `Checkout | Crashcourse`
  - `meta robots`: `noindex, nofollow` — checkout flows should not
    be indexed or followed.
  - no canonical, no OG, no JSON-LD.
- JSON-LD: skip. Transactional pages gain nothing from structured
  data and may leak cart state to crawlers.

### `/404` and `/500`

- Handled by Next.js defaults.
- No SEO work planned in this phase. Revisit during the App Router
  migration if custom not-found pages are introduced.

## Data → SEO Field Mapping (Course Detail)

| SEO field | Source | Notes |
| --- | --- | --- |
| `title` | `course.name` | Falls back to `Curso ${id} \| Crashcourse` if missing |
| `description` | `name`, `tutorUsername`, `level`, `score`, `price` | Hardcoded Spanish template, ~155 chars |
| `og:title` | same as `title` | |
| `og:description` | same as `description` | |
| `og:type` | `product` | See Step 24 |
| `og:url` | `NEXT_PUBLIC_SITE_URL + /cursos/${id}` | Omit canonical if env is missing |
| `og:image` | `/logo.svg` | Only existing brand asset |
| `og:site_name` | `Crashcourse` | |
| `twitter:card` | `summary_large_image` | |
| `twitter:title` | same as `title` | |
| `twitter:description` | same as `description` | |
| `twitter:image` | same as `og:image` | |
| `link[rel=canonical]` | same as `og:url` | |
| `meta robots` | `index, follow` | Default; not emitted unless needed |

## JSON-LD Opportunities (Step 24)

| Route | Schema | Fields available |
| --- | --- | --- |
| `/cursos/[id]` | `Course` | `name`, `tutorUsername` (mapped to `provider.name`), `level` (used in description), `price` (mapped to `offers.price`) |
| `/` | none | Listing without primary entity |
| `/checkout` | none | Transactional, not indexed |

`Course` (schema.org) was chosen over `Product` because the data is
naturally a course. Mapping:

- `name` -> `Course.name`
- `tutorUsername` -> `Course.provider` (`@type: Person`)
- `level` -> embedded into the `Course.description` string
- `price` -> `Course.offers.price`
- `priceCurrency` -> constant `PEN` (Peruvian Sol, ISO 4217) tied
  to the Spanish locale assumed for the site
- `inLanguage` -> constant `es`
- `url` -> set only when `NEXT_PUBLIC_SITE_URL` is defined

Fields intentionally omitted (no safe source of truth in data):

- `image` — no course image field in the GraphQL response.
- `aggregateRating` / `reviewCount` — `score` and `users` do not map
  safely to a structured review rating. Inventing them could mislead
  crawlers and consumers.
- `availability` — there is no stock/availability signal in the
  GraphQL response. Omitted to avoid implying inventory state that
  the backend does not provide.
- `priceValidUntil` — would require a real sale window. Omitted.
- `realPrice` discount metadata — the GraphQL response does not
  expose an explicit discount date or label, so the original price
  is not emitted as a separate `priceSpecification`.

## JSON-LD Sanitization (Step 24)

JSON-LD is rendered via `dangerouslySetInnerHTML` inside
`<script type="application/ld+json">`. To prevent an injected
`</script>` from breaking out of the script tag, the serializer
in `lib/seo.ts` (`serializeJsonLd`) escapes `<` to its unicode
escape `\u003c` after `JSON.stringify`. All JSON-LD objects are
constructed from typed `Course` data, not from arbitrary user
input, so this is a defense-in-depth measure rather than a primary
input filter.

## Implementation Surface (Step 24)

- `lib/seo.ts`
  - `buildSeo(input)` — low-level builder, accepts `jsonLd[]`.
  - `buildHomeSeo()` — home page SEO tags, no JSON-LD.
  - `buildCourseSeo({ id, course })` — course SEO tags, includes
    a single `Course` JSON-LD object when the course is present.
    When the course is missing (`hasError` path), no JSON-LD is
    emitted and the page is `noindex`.
  - `serializeJsonLd(data)` — stringifies and escapes `<` for
    safe injection into `<script>`.
- `components/UI/SeoHead.tsx`
  - Renders `<title>`, meta description, robots, canonical, OG,
    Twitter Card, and JSON-LD `<script>` tags from a `SeoTags`
    object.
- `pages/cursos/[id].tsx`
  - Uses `buildCourseSeo` in both success and error paths.
- `pages/index.tsx`
  - Uses `buildHomeSeo`; no JSON-LD.
- `pages/checkout.tsx`
  - Uses `buildSeo` with `noindex: true`; no JSON-LD.

## Noindex Pages

| Route | Reason |
| --- | --- |
| `/checkout` | Transactional flow; should not be indexed |
| SSR error fallbacks | Returned through `notFound: true`, so they are 404 responses — not separate routes |

## Open Decisions Deferred

- `og:locale` and `og:locale:alternate` — needs product decision.
- `theme-color` — needs design tokens.
- `alternate` hreflang for multi-locale — not in scope.
- `WebSite` + `SearchAction` JSON-LD — needs search endpoint.
- `apple-touch-icon` — needs design assets.

## Validation

```bash
npm run lint
npm run typecheck
npm run build
```

Audit is documentation only; no runtime changes in this step.

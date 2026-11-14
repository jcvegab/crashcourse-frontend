# SeoHead

Legacy metadata component that renders document title, description, social
tags, favicon, and JSON-LD through Next.js `next/head`. No application
consumers were found in this repository when the component was reorganized.

## Public API

Import either the default or named component, and its props type, from
`@/ui/SeoHead`:

```tsx
import SeoHead, { SeoHead as NamedSeoHead } from '@/ui/SeoHead';
import type { SeoHeadProps } from '@/ui/SeoHead';
```

| Prop | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `seo` | `SeoTags` | Yes | - | Metadata values from `@/lib/seo.types`. |
| `faviconHref` | `string` | No | `'/favicon.ico'` | Favicon URL rendered in the head. |

`SeoTags` includes `title`, `description`, nullable `canonical`, `image`,
`ogType`, `noindex`, and a `jsonLd` array.

## Usage

```tsx
import SeoHead from '@/ui/SeoHead';
import { buildHomeSeo } from '@/lib/seo';

export function LegacyPageMetadata() {
  return <SeoHead seo={buildHomeSeo()} />;
}
```

## Behavior and dependencies

- Emits standard title and description tags, Open Graph and Twitter metadata,
  and a favicon.
- Emits `robots` only when `noindex` is true; emits canonical and social URL
  only when `canonical` is present; emits social images only when `image` is
  non-empty.
- Serializes each JSON-LD value with `serializeJsonLd` and renders it as a
  JSON-LD script.
- Depends on Next.js `next/head`, `SeoTags`, and `serializeJsonLd`.
- This is a legacy `next/head` component. Its colocated tests capture the
  elements sent to Next.js's head manager; they do not verify App Router
  metadata integration or server rendering.

## Accessibility

The component renders document metadata rather than visible interactive UI.
It does not add accessible controls.

## Verification and maintenance

`SeoHead.spec.tsx` checks basic tags, optional robots/canonical/image values,
favicon override, and escaped JSON-LD. Run it with:

```bash
npx vitest run components/UI/SeoHead/SeoHead.spec.tsx
```

Keep this README synchronized with `SeoHead.tsx`, `SeoHead.types.ts`, and
`index.ts` when the legacy behavior or public exports change.

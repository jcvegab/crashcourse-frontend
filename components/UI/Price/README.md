# Price

Formats and displays a course price using a currency and locale. The default
course pricing configuration is Colombian pesos (`COP`) with the `es-CO`
locale. The component can override either value when displaying another market.

## Public API

Import the component and its prop type from `@/ui/Price`:

```tsx
import Price from '@/ui/Price';
import type { PriceProps } from '@/ui/Price';
```

| Prop | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `amount` | `number \| string` | Yes | - | Current price. Decimal strings from GraphQL are parsed; zero is valid, while malformed, negative, or non-finite values render `Precio no disponible`. |
| `compareAtAmount` | `number \| string` | No | - | Previous price, shown with a strike-through only when it parses as a valid amount greater than `amount`. |
| `currency` | `string` | No | `COP` | ISO 4217 currency code accepted by `Intl.NumberFormat`. |
| `locale` | `string` | No | `es-CO` | Locale accepted by `Intl.NumberFormat`. |
| `size` | `'compact' \| 'large'` | No | `compact` | Visual scale for compact catalog cards or a larger purchase panel. |

## Usage

```tsx
import Price from '@/ui/Price';

export function CoursePrice() {
  return <Price amount="349929.00" compareAtAmount="499000.00" />;
}
```

Override the market without changing the application default:

```tsx
<Price amount={14.99} currency="USD" locale="en-US" />
```

The default Colombian formatting displays `COP 349.929`; decimal values up to
two places are preserved, for example `COP 14,99`. The component formats but
does not convert amounts between currencies.

## Behavior and dependencies

- Uses `Intl.NumberFormat` with currency-code display and the shared defaults
  from `lib/pricing.ts`.
- Displays the comparison amount only when it is finite, non-negative, and
  greater than the current amount. A valid current amount of zero is retained.
- Uses `baseMain` and `grayDark` from the styled-components theme.
- Has no state, event handlers, client directive, or data-fetching behavior.

## Accessibility

Prices are exposed as a named group in Spanish. A discount label identifies
the current amount and the amount it replaces; the visible previous amount
uses the semantic `<del>` element.

## Verification and maintenance

`Price.spec.tsx` covers locale formatting, currency overrides, decimal strings,
zero, discount visibility, and invalid current values. Run it with:

```bash
npx vitest run components/UI/Price/Price.spec.tsx
```

Keep this README synchronized with `Price.tsx`, `Price.types.ts`, `index.ts`,
and the shared defaults in `lib/pricing.ts`.

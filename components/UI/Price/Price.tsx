import styled from 'styled-components';

import {
  createCurrencyFormatter,
  formatCurrency,
  parsePrice,
} from '@/lib/pricing';

import type { CurrencyFormatOptions } from '@/lib/pricing';
import type { PriceProps } from './Price.types';

const PriceGroup = styled.div<{ $size: NonNullable<PriceProps['size']> }>`
  display: flex;
  align-items: baseline;
  white-space: nowrap;
`;

const CurrentPrice = styled.span<{ $size: NonNullable<PriceProps['size']> }>`
  color: ${({ theme }) => theme.colors.baseMain};
  font-size: ${({ $size }) => ($size === 'large' ? '40px' : '24px')};
  font-weight: ${({ $size }) => ($size === 'large' ? 900 : 800)};
  line-height: ${({ $size }) => ($size === 'large' ? '44px' : '32px')};
  letter-spacing: 0.4px;

  .currency-code {
    font-size: ${({ $size }) => ($size === 'large' ? '24px' : '18px')};
    line-height: 32px;
    font-weight: 800;
  }
`;

const PreviousPrice = styled.del<{ $size: NonNullable<PriceProps['size']> }>`
  margin-inline-start: 8px;
  color: ${({ theme }) => theme.colors.grayDark};
  font-size: ${({ $size }) => ($size === 'large' ? '24px' : '12px')};
  font-weight: 400;
  line-height: 16px;
  letter-spacing: ${({ $size }) => ($size === 'large' ? '0' : '0.1px')};
`;

function renderCurrencyParts(amount: number, options: CurrencyFormatOptions) {
  const parts = createCurrencyFormatter(options).formatToParts(amount);
  const currencyIndex = parts.findIndex((part) => part.type === 'currency');
  const currencyPart = parts[currencyIndex];

  return (
    <>
      {parts
        .slice(0, currencyIndex)
        .map((part) => part.value)
        .join('')}
      <span className="currency-code">{currencyPart.value}</span>
      {parts
        .slice(currencyIndex + 1)
        .map((part) => part.value)
        .join('')}
    </>
  );
}

export default function Price({
  amount: rawAmount,
  compareAtAmount,
  currency,
  locale,
  size = 'compact',
}: PriceProps) {
  const amount = parsePrice(rawAmount);

  if (amount === null) {
    return <span>Precio no disponible</span>;
  }

  const options = { currency, locale };
  const currentFormatted = formatCurrency(amount, options);
  const normalizedCompareAtAmount =
    compareAtAmount === undefined ? null : parsePrice(compareAtAmount);
  const previousAmount =
    normalizedCompareAtAmount !== null && normalizedCompareAtAmount > amount
      ? normalizedCompareAtAmount
      : null;
  const hasDiscount = previousAmount !== null;
  const previousFormatted =
    previousAmount !== null ? formatCurrency(previousAmount, options) : null;
  const accessibleLabel = hasDiscount
    ? `Precio actual: ${currentFormatted}, antes ${previousFormatted}`
    : `Precio: ${currentFormatted}`;

  return (
    <PriceGroup $size={size} role="group" aria-label={accessibleLabel}>
      <CurrentPrice $size={size} aria-hidden="true">
        {renderCurrencyParts(amount, options)}
      </CurrentPrice>
      {hasDiscount && previousFormatted && (
        <PreviousPrice $size={size} aria-hidden="true">
          {previousFormatted}
        </PreviousPrice>
      )}
    </PriceGroup>
  );
}

import type { MoneyAmount } from '@/types/money.types';

export const COURSE_PRICING = {
  currency: 'COP',
  locale: 'es-CO',
} as const;

export type CurrencyFormatOptions = {
  currency?: string;
  locale?: string;
};

export function createCurrencyFormatter({
  currency = COURSE_PRICING.currency,
  locale = COURSE_PRICING.locale,
}: CurrencyFormatOptions = {}) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    currencyDisplay: 'code',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
}

export function parsePrice(amount: MoneyAmount) {
  if (typeof amount === 'string') {
    const normalizedAmount = amount.trim();

    if (!/^\d+(?:\.\d+)?$/.test(normalizedAmount)) {
      return null;
    }

    amount = Number(normalizedAmount);
  }

  return Number.isFinite(amount) && amount >= 0 ? amount : null;
}

export function formatCurrency(
  amount: MoneyAmount,
  options?: CurrencyFormatOptions,
) {
  const normalizedAmount = parsePrice(amount);

  if (normalizedAmount === null) {
    return null;
  }

  return createCurrencyFormatter(options).format(normalizedAmount);
}

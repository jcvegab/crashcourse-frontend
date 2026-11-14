import type { MoneyAmount } from '@/types/money.types';

export type PriceProps = {
  amount: MoneyAmount;
  compareAtAmount?: MoneyAmount;
  currency?: string;
  locale?: string;
  size?: 'compact' | 'large';
};

import SeoHead from '@/ui/SeoHead';

import { buildSeo } from '@/lib/seo';

const checkoutSeo = buildSeo({
  title: 'Checkout',
  description: 'Finaliza la compra de tu curso en Crashcourse.',
  path: '/checkout',
  noindex: true,
});

export default function Checkout() {
  return <SeoHead seo={checkoutSeo} />;
}

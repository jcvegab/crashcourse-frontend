import { Inter } from 'next/font/google';

import StyledComponentsRegistry from '@/lib/registry';

import Providers from './providers';

import type { Metadata } from 'next';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '700', '800', '900'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Crashcourse',
  description: 'Aprende con cursos online en Crashcourse.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={inter.variable}>
      <body>
        <StyledComponentsRegistry>
          <Providers>{children}</Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}

import type { Metadata } from 'next';

import '../styles/_app.css';
import StyledComponentsRegistry from '@/lib/registry';

import Providers from './providers';

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
    <html lang="es">
      <body>
        <StyledComponentsRegistry>
          <Providers>{children}</Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}

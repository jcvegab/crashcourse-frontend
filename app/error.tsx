'use client';

export default function ErrorBoundary({ reset }: { reset: () => void }) {
  return (
    <main role="alert">
      <p>No pudimos cargar esta página. Inténtalo de nuevo.</p>
      <button onClick={reset} type="button">
        Reintentar
      </button>
    </main>
  );
}

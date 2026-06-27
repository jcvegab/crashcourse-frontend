'use client';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div>
      <p>Ocurrió un error: {error.message}</p>
      <button onClick={reset} type="button">
        Reintentar
      </button>
    </div>
  );
}

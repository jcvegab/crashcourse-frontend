# Test Coverage Report

## Estado actual

- **Statements**: 99.33%
- **Branches**: 95.58%
- **Functions**: 98.46%
- **Lines**: 99.33%

## Exclusiones justificadas

No se aplicaron exclusiones manuales. Todos los archivos fuente son evaluados por el reporte de cobertura.

## Archivos con cobertura menor al 100%

### `components/UI/CoursePreview.tsx` — 88.88% statements

- Línea 7: `_TextTemplate` es un template de styled-components que no se evalúa directamente en runtime porque no se aplica a ningún elemento. Es código declarativo de CSS-in-JS.

### `lib/seo.ts` — 89.28% branches

- Línea 50: `getSiteUrl` con trailing slash. Cubierto en tests unitarios.
- Línea 102: `buildCourseJsonLd` asignación condicional de `url`. Cubierto indirectamente mediante `buildCourseSeo`.
- Línea 140: `canonical` en `buildCourseSeo`. Cubierto en tests unitarios.

## Estrategia

- Tests unitarios para componentes UI en `components/UI/__tests__`.
- Tests para layouts en `components/layouts/__tests__`.
- Tests para data fetching SSR en `app/__tests__` y `app/cursos/[id]/__tests__`.
- Tests para helpers en `lib/__tests__`.
- Mock de Apollo Client en tests de páginas.
- Mock de `next/link` y `next/navigation` en tests de componentes.

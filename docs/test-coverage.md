# Test Coverage Report

## Estado actual

- `npm run test:coverage` ejecuta 13 archivos de test y 44 tests correctamente.
- La verificación final reportada en `docs/final-modernization-report.md` alcanzó 99.3% statements, 95.58% branches, 98.46% functions y 99.3% lines.
- El threshold activo es 90% para statements, branches, functions y lines.
- CI ejecuta `npm run test:coverage` antes de `npm run build`.

## Exclusiones justificadas

`vitest.config.ts` excluye tests, archivos declarativos y artefactos que no representan lógica de aplicación:

- `**/__tests__/**`
- `**/*.d.ts`
- `**/node_modules/**`
- `**/.next/**`
- `**/e2e/**`
- `test/**`

## Configuración actual

Vitest usa `@vitest/coverage-v8` con reporters `text`, `json` y `html`.

Exclusiones principales:

- Tests y archivos declarativos.
- `node_modules`, `.next`, `e2e` y utilidades de test.

Mantener el threshold de 90% y fallar CI si la cobertura real cae por debajo del mínimo.

## Estrategia

- Tests unitarios para componentes UI en `components/UI/__tests__`.
- Tests para layouts en `components/layouts/__tests__`.
- Tests para data fetching SSR en `app/__tests__` y `app/cursos/[id]/__tests__`.
- Tests para helpers en `lib/__tests__`.
- Mock del helper `gql()` en tests de páginas.
- Mock de `next/link` y `next/navigation` en tests de componentes.

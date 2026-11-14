# Test Coverage Report

## Current baseline

- Vitest uses colocated `*.spec.ts(x)` and `*.test.ts(x)` files. Component specs sit beside their implementation; route and helper specs sit beside the file they cover.
- Coverage excludes test files by filename pattern, along with declaration files, dependencies, build output, E2E files, and test utilities.
- Baseline at the component organization migration start: 13 spec files and 46 tests.
- Baseline coverage: 99.29% statements, 95.52% branches, 98.36% functions, and 99.29% lines.

## Estado actual

- `npm run test:coverage` ejecuta 13 archivos de test y 46 tests correctamente.
- La verificacion final de modernizacion alcanzo 99.3% statements, 95.58% branches, 98.46% functions y 99.3% lines.
- El threshold activo es 90% para statements, branches, functions y lines.
- CI ejecuta `npm run test:coverage` antes de `npm run build`.

## Exclusiones justificadas

`vitest.config.mts` excludes test files, declarations, and generated or non-application files:

- `**/*.spec.ts`, `**/*.spec.tsx`, `**/*.test.ts`, `**/*.test.tsx`
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

- Component specs colocated beside modules in `components/UI` and `components/layouts`.
- Route specs colocated beside route files in `app`.
- Helper specs colocated beside helpers in `lib`.
- Mock del helper `gql()` en tests de páginas.
- Mock de `next/link` y `next/navigation` en tests de componentes.

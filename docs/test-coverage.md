# Test Coverage Report

## Estado actual

- `npm run test:coverage` ejecuta 13 archivos de test y 44 tests correctamente.
- El reporte actual de cobertura muestra `All files | 0`.
- `coverage/coverage-final.json` queda vacío en la verificación final.
- El objetivo de 90% no queda verificable hasta corregir instrumentación.

## Exclusiones justificadas

`vitest.config.ts` excluye archivos declarativos, configuración, tests y wrappers de infraestructura que no representan lógica de aplicación:

- `**/__tests__/**`
- `**/*.spec.{ts,tsx}`
- `**/*.test.{ts,tsx}`
- `**/*.d.ts`
- `app/layout.tsx`
- `app/providers.tsx`
- `app/error.tsx`
- `components/UI/SeoHead.tsx`
- `lib/registry.tsx`
- `lib/*.types.ts`

## Hallazgo de verificación final

Vitest 4 requiere `coverage.include` explícito para incluir archivos no cargados o no reportados por defecto. Se agregó configuración explícita para:

- `app/**/*.ts`
- `app/**/*.tsx`
- `components/**/*.ts`
- `components/**/*.tsx`
- `lib/**/*.ts`
- `lib/**/*.tsx`
- `types/**/*.types.ts`

La ejecución sigue generando un reporte vacío en este entorno, por lo que la cobertura real queda como deuda pendiente.

## Próximo ajuste requerido

Investigar por qué `@vitest/coverage-v8` no instrumenta archivos fuente aunque los tests importan módulos reales. Mantener el threshold de 90% y fallar CI cuando el reporte incluya archivos reales por debajo del mínimo.

## Estrategia

- Tests unitarios para componentes UI en `components/UI/__tests__`.
- Tests para layouts en `components/layouts/__tests__`.
- Tests para data fetching SSR en `app/__tests__` y `app/cursos/[id]/__tests__`.
- Tests para helpers en `lib/__tests__`.
- Mock del helper `gql()` en tests de páginas.
- Mock de `next/link` y `next/navigation` en tests de componentes.

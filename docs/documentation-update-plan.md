# Documentation Update Plan

## Objetivo

Mantener la documentación del repositorio alineada con el estado real de Crashcourse Frontend, su metadata npm/GitHub y su arquitectura actual.

## Estado aplicado

- Repositorio indexado en codebase memory como `home-jcvegab-jcvegab-projects-crashcourse-frontend`.
- `README.md` actualizado con scope, arquitectura, rutas, comandos, testing y mapa de docs.
- `package.json` actualizado con nombre, descripción y keywords orientadas al stack real.
- `package-lock.json` sincronizado con el nombre del paquete.
- `docs/code-conventions.md` alineado con aliases reales de `tsconfig.json`.
- `docs/test-coverage.md` alineado con el reporte final de cobertura y CI.
- GitHub topics actualizados mediante GH CLI.

## Topics GitHub

Topics objetivo del repositorio:

- `nextjs`
- `nextjs-16`
- `react`
- `react-19`
- `typescript`
- `graphql`
- `styled-components`
- `app-router`
- `server-components`
- `course-platform`
- `seo`
- `isr`
- `vercel`
- `vitest`
- `playwright`

## Mantenimiento

- Actualizar `README.md` cuando cambien rutas, comandos, variables de entorno o deployment.
- Actualizar `package.json` keywords cuando el stack público cambie.
- Actualizar `docs/graphql-conventions.md` si cambia el contrato de `lib/gql.ts`.
- Actualizar `docs/test-coverage.md` cuando cambien thresholds, strategy o herramientas de test.
- Reindexar codebase memory después de cambios grandes de arquitectura.

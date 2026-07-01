# TODOs And Technical Debt

## TODOs

- Reactivar E2E en GitHub Actions cuando exista backend/mock estable para CI.
- Definir `metadataBase` en App Router para eliminar el warning de metadata social.
- Revisar `npm audit` y actualizar dependencias cuando sea seguro.

## Technical Debt

- El step E2E de CI esta documentado pero deshabilitado temporalmente en `.github/workflows/ci.yml`.

## Follow-Ups

- Actualizar `README.md` cuando cambien rutas, comandos, variables de entorno o deployment.
- Actualizar `package.json` keywords cuando el stack publico cambie.
- Actualizar `docs/graphql-conventions.md` si cambia el contrato de `lib/gql.ts`.
- Actualizar `docs/test-coverage.md` cuando cambien thresholds, strategy o herramientas de test.
- Actualizar el indice local de analisis de codigo despues de cambios grandes de arquitectura.

## Known Risks

- Los tests E2E en CI dependen de un backend o mock estable.
- Hay vulnerabilidades moderadas reportadas por `npm audit` pendientes de evaluacion.

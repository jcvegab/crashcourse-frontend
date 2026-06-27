# PLAN.md — Modernización legacy Next.js con SDD

## 0. Objetivo

Modernizar progresivamente el frontend legacy aplicando Spec-Driven Development, commits pequeños y reversibles, y una transición controlada desde Next.js 12 Pages Router hacia una arquitectura tipada, testeada, con SSR y preparada para App Router.

Objetivos principales:

1. Fijar runtime en Node.js 24.
2. Migrar el proyecto a TypeScript con tipado progresivo.
3. Adoptar Biome como formatter/linter principal.
4. Configurar lint-staged con Biome.
5. Migrar páginas CSR relevantes a SSR usando Pages Router y `getServerSideProps`.
6. Corregir seguridad GraphQL eliminando interpolación directa de variables.
7. Actualizar Next.js por saltos seguros hasta la última versión estable compatible.
8. Migrar gradualmente de Pages Router a App Router después del upgrade.
9. Adoptar convenciones de arquitectura del portfolio: custom paths, tipos junto al componente, tipos compartidos en `*.types.ts`, tests en `__tests__`.
10. Agregar SEO acorde a la data existente.
11. Instalar Vitest con coverage mínimo de 90%.
12. Agregar Playwright para E2E mínimo.
13. Agregar GitHub Actions y Dependabot tomando como referencia `jcvegab-portfolio`.
14. Actualizar `AGENTS.md` y `CLAUDE.md`.
15. Mantener un commit por cada step.

---

## 1. Contexto actual del proyecto

Según el `AGENTS.md` actual, el proyecto tiene estas características:

- Next.js 12 con Pages Router.
- React 17.
- Apollo GraphQL.
- styled-components SSR configurado mediante `next.config.js` y `_document.js` con `ServerStyleSheet`.
- Theme definido inline en `_app.js`.
- No existe test runner.
- No existe script `lint` en `package.json`; se usa `npx next lint`.
- `NEXT_PUBLIC_API_URL` es obligatorio para que GraphQL funcione.
- Algunas páginas usan CSR con `useQuery`, `useRouter` y `router.query`.
- Algunas queries GraphQL interpolan valores directamente dentro del template string.
- Varios componentes siguen el patrón legacy de recibir una única prop llamada `props`, por ejemplo `function Main({ props })`.
- El proyecto usa Pages Router, pero el objetivo final incluye migración gradual a App Router después del upgrade de Next.js.

---

## 2. Reglas obligatorias para el agente

### 2.1 Regla principal de commits

Cada step debe terminar con exactamente un commit propio.

No está permitido:

- Agrupar varios steps en un solo commit.
- Avanzar al siguiente step sin commit.
- Mezclar refactors, upgrades, tests, configuración y cambios funcionales si no pertenecen al mismo step.
- Dejar cambios sin commit al terminar un step.

### 2.2 Workflow obligatorio por cada step

Para cada step:

1. Leer objetivo, alcance y restricciones.
2. Implementar únicamente ese step.
3. Ejecutar las validaciones indicadas.
4. Revisar cambios:

```bash
git status
git diff
```

5. Corregir errores si falla alguna validación.
6. Actualizar este `PLAN.md` marcando el step como completado.
7. Hacer commit con el mensaje definido.
8. Continuar recién al siguiente step.

### 2.3 Si algo falla

Si una validación falla:

- No hacer commit todavía.
- Corregir el problema dentro del mismo step.
- Repetir validaciones.
- Documentar en el commit si hubo una corrección relevante.

### 2.4 Rollback

Cada step debe ser reversible con:

```bash
git revert <commit_sha>
```

Si un step deja el proyecto en estado inestable, revertir ese commit antes de continuar.

---

## 3. Versiones objetivo

### Node.js

Usar Node.js 24.

Archivos esperados:

```txt
.nvmrc
.node-version
```

Contenido:

```txt
24
```

### Next.js

No actualizar directamente de Next.js 12 a la última versión.

Estrategia obligatoria:

```txt
Next.js 12 -> Next.js 13/14 -> Next.js 15/16 o última estable compatible
```

Cada salto debe tener commit propio y build verde.

### React

Actualizar React solo cuando el salto de Next.js lo requiera o lo recomiende.

---

## 4. Convenciones técnicas objetivo

### 4.1 TypeScript

- Migración progresiva al inicio.
- Luego endurecimiento gradual.
- Objetivo final: `strict: true`.
- Evitar `any` salvo justificación temporal.
- Si se usa `any`, agregar TODO técnico.
- Incluir Vitest globals para specs:

```json
{
  "compilerOptions": {
    "types": ["vitest/globals"]
  }
}
```

### 4.2 Biome

Biome reemplaza a ESLint y Prettier como formatter/linter principal.

Reglas:

- No instalar Prettier como formatter principal.
- No depender de `next lint` como comando principal de calidad.
- Usar `biome check` para lint + format check.
- Usar `biome check --write --unsafe` para autofix/format.
- Mantener `biome.json` versionado.
- Organizar imports usando `assist.actions.source.organizeImports`.

### 4.3 lint-staged

Usar `.lintstagedrc.mjs` con Biome.

Patrón esperado:

```js
export default {
  '*.{js,ts,cjs,mjs,d.cts,d.mts,jsx,tsx,json,jsonc,css}': [
    'biome check --write --unsafe --no-errors-on-unmatched',
  ],
};
```

### 4.4 Custom paths

Adoptar aliases de imports inspirados en el portfolio.

Ejemplo objetivo:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/components/*": ["components/*"],
      "@/layouts/*": ["components/layouts/*"],
      "@/ui/*": ["components/UI/*"],
      "@/pages/*": ["pages/*"],
      "@/lib/*": ["lib/*"],
      "@/types/*": ["types/*"],
      "@/utils/*": ["utils/*"]
    }
  }
}
```

Si se decide mover el código a `src/`, ajustar aliases a `src/*` en un step separado.

### 4.5 Convención de tipos

Adoptar este patrón:

```txt
components/CourseCard/
  CourseCard.tsx
  CourseCard.types.ts
  index.ts
  __tests__/
    CourseCard.spec.tsx
```

Reglas:

- Los tipos de props de un componente viven junto al componente cuando son exclusivos de ese componente.
- Si el tipo es usado por más de un archivo o representa dominio/API, moverlo a `*.types.ts` o a `types/`.
- El tipo de props debe llamarse preferentemente `<ComponentName>Props`.
- Evitar tipos inline grandes dentro del JSX.
- Evitar `React.FC` salvo que haya una razón explícita.

Ejemplo:

```tsx
// CourseCard.types.ts
export type CourseCardProps = {
  name: string;
  tutorUsername: string;
  level: string;
  users: number;
  score: number;
  price: number;
  realPrice: number;
};
```

```tsx
// CourseCard.tsx
import type { CourseCardProps } from './CourseCard.types';

export function CourseCard(props: CourseCardProps) {
  return <article>{props.name}</article>;
}
```

### 4.6 Tests unitarios

Los tests unitarios deben vivir en un folder `__tests__` dentro de la misma carpeta del módulo/componente.

Correcto:

```txt
components/UI/Button/
  Button.tsx
  Button.types.ts
  __tests__/
    Button.spec.tsx
```

Incorrecto:

```txt
__tests__/Button.spec.tsx
components/UI/Button.spec.tsx
```

### 4.7 SSR y App Router

- Primero estabilizar SSR en Pages Router usando `getServerSideProps` para páginas públicas o SEO-relevantes.
- Después del upgrade de Next.js, migrar gradualmente a App Router en una fase dedicada.
- No mezclar migración SSR, upgrade de Next.js y migración App Router en el mismo commit.
- Mantener SSR de styled-components durante Pages Router.
- Al migrar a App Router, introducir `app/` de forma incremental y conservar `pages/` temporalmente para rutas no migradas.

### 4.8 Apollo GraphQL

- No interpolar variables directamente en queries.
- Usar GraphQL variables.
- Crear Apollo Client compatible con SSR.
- No compartir cache entre requests SSR.
- Separar URL pública y URL server-side cuando aplique.

Variables esperadas:

```env
NEXT_PUBLIC_API_URL=
SERVER_API_URL=
```

`SERVER_API_URL` debe usarse desde SSR si existe. `NEXT_PUBLIC_API_URL` queda para cliente.

### 4.9 App Router

- Migrar rutas de menor riesgo primero.
- Separar Server Components y Client Components explícitamente.
- Usar `use client` solo donde sea necesario.
- Reemplazar `getServerSideProps` con patrones de App Router cuando una ruta sea migrada.
- Definir `metadata` o `generateMetadata` en rutas migradas.
- Mantener Pages Router y App Router conviviendo temporalmente hasta completar la migración.
- Documentar cualquier ruta que deba permanecer en Pages Router.

### 4.10 Patrón legacy `props`

Durante la migración inicial:

- Mantener el patrón existente para reducir riesgo.

Después de estabilizar:

- Normalizar gradualmente props explícitas.
- No hacer este refactor mezclado con upgrade, SSR o App Router.

---

## 5. Scripts objetivo

`package.json` debe terminar con scripts equivalentes a:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "biome check .",
    "lint:fix": "biome check --write --unsafe .",
    "format": "biome format --write .",
    "format:check": "biome format .",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "test:watch": "vitest",
    "coverage": "vitest run --coverage",
    "e2e": "playwright test",
    "e2e:ui": "playwright test --ui"
  }
}
```

Si se requiere compatibilidad temporal con `next lint`, dejarla documentada como deprecated y removerla cuando Biome quede estable.

---

# Phase 1 — Baseline y preparación ✅

## Step 1 — Crear baseline del proyecto

Status: [x]

### Objetivo

Documentar el estado actual antes de modernizar.

### Tareas

- Ejecutar:

```bash
npm install
npm run build
npx next lint
```

- Registrar errores actuales.
- Crear `docs/modernization-baseline.md` con:
  - versión actual de Node
  - versión actual de Next
  - versión actual de React
  - versión actual de Apollo
  - versión actual de styled-components
  - errores de build
  - errores de lint
  - warnings relevantes
  - dependencias críticas
  - rutas CSR detectadas

### Validación

```bash
npm run build
npx next lint
```

### Commit

```bash
git add .
git commit -m "docs: add modernization baseline"
```

### Rollback

```bash
git revert <commit_sha>
```

---

## Step 2 — Fijar Node.js 24

Status: [x]

### Objetivo

Asegurar que desarrollo local y CI usen Node.js 24.

### Tareas

- Crear o actualizar `.nvmrc`:

```txt
24
```

- Crear o actualizar `.node-version`:

```txt
24
```

- Si existe `engines` en `package.json`, actualizarlo:

```json
{
  "engines": {
    "node": ">=24"
  }
}
```

### Validación

```bash
node --version
npm install
npm run build
```

### Commit

```bash
git add .
git commit -m "chore: set Node.js 24"
```

### Rollback

```bash
git revert <commit_sha>
```

---

## Step 3 — Normalizar scripts base temporalmente

Status: [x]

### Objetivo

Agregar scripts consistentes antes de introducir Biome, TypeScript y tests.

### Tareas

Actualizar `package.json` con scripts mínimos:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint:legacy": "next lint"
  }
}
```

No instalar aún Vitest ni Playwright.

### Validación

```bash
npm run build
npm run lint:legacy
```

### Commit

```bash
git add .
git commit -m "chore: normalize base project scripts"
```

### Rollback

```bash
git revert <commit_sha>
```

---

# Phase 2 — TypeScript, aliases y convenciones base

## Step 4 — Instalar TypeScript

Status: [x]

### Objetivo

Agregar TypeScript sin convertir todos los archivos todavía.

### Tareas

- Instalar:

```bash
npm install -D typescript @types/react @types/node
```

- Crear `tsconfig.json` con migración progresiva:

```json
{
  "compilerOptions": {
    "allowJs": true,
    "checkJs": false,
    "strict": false,
    "noEmit": true,
    "jsx": "preserve",
    "moduleResolution": "node",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "isolatedModules": true,
    "resolveJsonModule": true,
    "types": ["vitest/globals"]
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
  "exclude": ["node_modules"]
}
```

Nota: `types: ["vitest/globals"]` se deja desde el inicio para que los futuros `*.spec.ts` y `*.spec.tsx` no necesiten imports manuales de `describe`, `it`, `expect`, etc.

### Validación

```bash
npx tsc --noEmit
npm run build
```

### Commit

```bash
git add .
git commit -m "chore: add TypeScript configuration"
```

### Rollback

```bash
git revert <commit_sha>
```

---

## Step 5 — Configurar custom paths

Status: [x]

### Objetivo

Adoptar aliases de imports para reducir rutas relativas largas y alinear el proyecto con el patrón del portfolio.

### Tareas

- Actualizar `tsconfig.json`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/components/*": ["components/*"],
      "@/layouts/*": ["components/layouts/*"],
      "@/ui/*": ["components/UI/*"],
      "@/pages/*": ["pages/*"],
      "@/lib/*": ["lib/*"],
      "@/types/*": ["types/*"],
      "@/utils/*": ["utils/*"]
    }
  }
}
```

- No convertir todos los imports todavía; solo dejar el soporte listo.
- Documentar aliases en `docs/code-conventions.md`.

### Validación

```bash
npx tsc --noEmit
npm run build
```

### Commit

```bash
git add .
git commit -m "chore: configure TypeScript path aliases"
```

### Rollback

```bash
git revert <commit_sha>
```

---

## Step 6 — Documentar convenciones de componentes, tipos y tests

Status: [x]

### Objetivo

Formalizar las convenciones del proyecto antes de migrar componentes.

### Tareas

Crear `docs/code-conventions.md` con:

- Uso de custom paths.
- Tipos de props junto al componente.
- Tipos compartidos o de dominio en `*.types.ts`.
- Tests en `__tests__` dentro de la misma carpeta.
- Nombres esperados:
  - `<Component>.tsx`
  - `<Component>.types.ts`
  - `__tests__/<Component>.spec.tsx`
- Regla de no mezclar refactors estructurales con cambios funcionales.

### Validación

```bash
npm run build
```

### Commit

```bash
git add .
git commit -m "docs: add code organization conventions"
```

### Rollback

```bash
git revert <commit_sha>
```

---

# Phase 3 — Biome y lint-staged

## Step 7 — Instalar y configurar Biome

Status: [x]

### Objetivo

Reemplazar Formatter/Linter por Biome.

### Tareas

- Instalar:

```bash
npm install -D @biomejs/biome
```

- Crear `biome.json` tomando como base el portfolio:

```json
{
  "$schema": "./node_modules/@biomejs/biome/configuration_schema.json",
  "assist": {
    "enabled": true,
    "actions": {
      "source": {
        "organizeImports": {
          "level": "on",
          "options": {
            "groups": [
              {
                "type": false,
                "source": ["react", "next/**", ":PACKAGE:", ":NODE:", ":BUN:", ":URL:"]
              },
              ":BLANK_LINE:",
              {
                "type": false,
                "source": ["@/components", "@/components/**"]
              },
              ":BLANK_LINE:",
              {
                "type": false,
                "source": ["@/layouts", "@/layouts/**"]
              },
              ":BLANK_LINE:",
              {
                "type": false,
                "source": ["@/ui", "@/ui/**"]
              },
              ":BLANK_LINE:",
              {
                "type": false,
                "source": ["@/lib", "@/lib/**", "@/utils", "@/utils/**"]
              },
              ":BLANK_LINE:",
              {
                "type": false,
                "source": ["./**", "../**", "!**/*.scss", "!**/*.css"]
              },
              ":BLANK_LINE:",
              { "type": true },
              ":BLANK_LINE:",
              {
                "type": false,
                "source": ["**/*.scss", "**/*.css", "**/sass/**"]
              }
            ]
          }
        }
      }
    }
  },
  "linter": {
    "enabled": true,
    "rules": {
      "preset": "recommended",
      "a11y": {
        "noSvgWithoutTitle": "off"
      },
      "performance": {
        "noImgElement": "off"
      }
    }
  },
  "overrides": [
    {
      "includes": ["**/__tests__/**"],
      "linter": {
        "rules": {
          "suspicious": {
            "noExplicitAny": "off"
          },
          "security": {
            "noDangerouslySetInnerHtml": "off"
          }
        }
      }
    }
  ],
  "formatter": {
    "enabled": true,
    "formatWithErrors": false,
    "indentStyle": "space",
    "indentWidth": 2,
    "lineWidth": 80
  },
  "javascript": {
    "formatter": {
      "quoteStyle": "single",
      "jsxQuoteStyle": "double",
      "trailingCommas": "all"
    }
  }
}
```

### Validación

```bash
npx biome check .
npm run build
```

### Commit

```bash
git add .
git commit -m "chore: add Biome configuration"
```

### Rollback

```bash
git revert <commit_sha>
```

---

## Step 8 — Actualizar scripts para Biome

Status: [x]

### Objetivo

Hacer que Biome sea el linter/formatter principal del proyecto.

### Tareas

Actualizar `package.json`:

```json
{
  "scripts": {
    "lint": "biome check .",
    "lint:fix": "biome check --write --unsafe .",
    "format": "biome format --write .",
    "format:check": "biome format .",
    "typecheck": "tsc --noEmit"
  }
}
```

Mantener `lint:legacy` temporalmente si todavía se necesita `next lint` durante el upgrade.

### Validación

```bash
npm run lint
npm run format:check
npm run typecheck
npm run build
```

### Commit

```bash
git add .
git commit -m "chore: use Biome for linting and formatting"
```

### Rollback

```bash
git revert <commit_sha>
```

---

## Step 9 — Configurar lint-staged con Biome

Status: [x]

### Objetivo

Ejecutar Biome automáticamente sobre archivos staged.

### Tareas

- Instalar herramientas necesarias:

```bash
npm install -D lint-staged husky
```

- Crear `.lintstagedrc.mjs`:

```js
export default {
  '*.{js,ts,cjs,mjs,d.cts,d.mts,jsx,tsx,json,jsonc,css}': [
    'biome check --write --unsafe --no-errors-on-unmatched',
  ],
};
```

- Configurar Husky o el mecanismo de hooks usado por el proyecto.
- Documentar en `AGENTS.md` que los commits deben pasar por lint-staged.

### Validación

```bash
npx lint-staged --debug
npm run lint
npm run build
```

### Commit

```bash
git add .
git commit -m "chore: add lint-staged Biome checks"
```

### Rollback

```bash
git revert <commit_sha>
```

---

## Step 10 — Aplicar formato inicial con Biome

Status: [x]

### Objetivo

Normalizar formato e imports antes de seguir con migraciones grandes.

### Tareas

- Ejecutar:

```bash
npm run lint:fix
```

- Revisar que el diff sea solo formato/imports.
- No incluir cambios funcionales.

### Validación

```bash
npm run lint
npm run typecheck
npm run build
```

### Commit

```bash
git add .
git commit -m "style: format codebase with Biome"
```

### Rollback

```bash
git revert <commit_sha>
```

---

# Phase 4 — Migración a TypeScript

## Step 11 — Migrar archivos core de Next.js a TypeScript

Status: [x]

### Objetivo

Tipar archivos base sin tocar lógica funcional.

### Tareas

- Migrar `_app.js` a `_app.tsx`.
- Migrar `_document.js` a `_document.tsx`.
- Preservar SSR de styled-components con `ServerStyleSheet`.
- Preservar `ApolloProvider`.
- No cambiar todavía arquitectura GraphQL.

### Validación

```bash
npm run lint
npm run typecheck
npm run build
```

### Commit

```bash
git add .
git commit -m "chore: migrate Next core files to TypeScript"
```

### Rollback

```bash
git revert <commit_sha>
```

---

## Step 12 — Migrar componentes UI a TypeScript

Status: [x]

### Objetivo

Convertir componentes reutilizables a `.tsx` respetando la nueva convención de tipos.

### Tareas

- Migrar componentes uno por uno.
- Tipar props explícitamente.
- Crear `<Component>.types.ts` cuando el tipo sea grande o reutilizable.
- Mantener temporalmente el patrón legacy `function Component({ props })` si ya existe.
- No refactorizar comportamiento todavía.

### Validación

```bash
npm run lint
npm run typecheck
npm run build
```

### Commit

```bash
git add .
git commit -m "refactor: migrate UI components to TypeScript"
```

### Rollback

```bash
git revert <commit_sha>
```

---

## Step 13 — Migrar layouts y componentes compartidos a TypeScript

Status: [x]

### Objetivo

Migrar componentes de layout y shared components.

### Tareas

- Migrar `components/layouts/*`.
- Usar alias `@/layouts/*` cuando aplique.
- Crear tipos locales o `*.types.ts` según convención.
- Mantener styled-components sin cambios visuales.

### Validación

```bash
npm run lint
npm run typecheck
npm run build
```

### Commit

```bash
git add .
git commit -m "refactor: migrate layout components to TypeScript"
```

### Rollback

```bash
git revert <commit_sha>
```

---

## Step 14 — Migrar páginas a TypeScript

Status: [x]

### Objetivo

Convertir páginas de Next.js a `.tsx`.

### Tareas

- Migrar archivos en `pages`.
- Tipar datos recibidos desde Apollo.
- Mantener Pages Router.
- No migrar todavía a App Router.
- No cambiar queries GraphQL salvo que sea necesario para tipado.

### Validación

```bash
npm run lint
npm run typecheck
npm run build
```

### Commit

```bash
git add .
git commit -m "refactor: migrate pages to TypeScript"
```

### Rollback

```bash
git revert <commit_sha>
```

---

## Step 15 — Endurecer TypeScript gradualmente

Status: [x]

### Objetivo

Subir la calidad del tipado sin romper todo de golpe.

### Tareas

Actualizar `tsconfig.json` progresivamente:

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "types": ["vitest/globals"]
  }
}
```

Corregir errores de tipado relevantes.

### Validación

```bash
npm run lint
npm run typecheck
npm run build
```

### Commit

```bash
git add .
git commit -m "chore: enable stricter TypeScript checks"
```

### Rollback

```bash
git revert <commit_sha>
```

---

# Phase 5 — Migración CSR a SSR

## Step 16 — Auditar páginas CSR actuales

Status: [x]

### Objetivo

Identificar páginas que cargan datos en cliente usando `useQuery`, `useRouter`, `router.query` o queries GraphQL inline.

### Tareas

- Buscar páginas que usen:
  - `useQuery`
  - `useRouter`
  - `router.query`
  - `gql` inline con interpolación dinámica
- Crear `docs/csr-to-ssr-audit.md`.
- Listar por página:
  - ruta
  - query usada
  - datos requeridos
  - si puede ser SSR
  - si requiere SEO
  - riesgos de migración

### Validación

```bash
npm run lint
npm run typecheck
npm run build
```

### Commit

```bash
git add .
git commit -m "docs: audit CSR pages for SSR migration"
```

### Rollback

```bash
git revert <commit_sha>
```

---

## Step 17 — Separar variables de entorno cliente/servidor

Status: [x]

### Objetivo

Preparar configuración para Apollo SSR.

### Tareas

- Documentar en `.env.example`:

```env
NEXT_PUBLIC_API_URL=
SERVER_API_URL=
NEXT_PUBLIC_SITE_URL=
```

- `SERVER_API_URL` se usa en server-side cuando exista.
- `NEXT_PUBLIC_API_URL` se usa en cliente.
- `NEXT_PUBLIC_SITE_URL` se usa para canonical URLs y metadata SEO.

### Validación

```bash
npm run lint
npm run typecheck
npm run build
```

### Commit

```bash
git add .
git commit -m "chore: document client and server environment variables"
```

### Rollback

```bash
git revert <commit_sha>
```

---

## Step 18 — Crear Apollo Client compatible con SSR

Status: [x]

### Objetivo

Asegurar que Apollo pueda usarse tanto en cliente como en servidor.

### Tareas

- Revisar `pages/api/apolloClient.js`.
- Migrarlo a TypeScript si aplica.
- Crear función reutilizable `initializeApollo` o equivalente.
- Usar `ssrMode: typeof window === 'undefined'`.
- No compartir cache entre requests SSR.
- Usar `SERVER_API_URL` en SSR si existe.
- Mantener `ApolloProvider` en `_app`.

### Validación

```bash
npm run lint
npm run typecheck
npm run build
```

### Commit

```bash
git add .
git commit -m "refactor: make Apollo client SSR compatible"
```

### Rollback

```bash
git revert <commit_sha>
```

---

## Step 19 — Migrar detalle de curso de CSR a SSR

Status: [x]

### Objetivo

Migrar `pages/cursos/[id]` de CSR a SSR usando `getServerSideProps`.

### Problema actual

Actualmente la página obtiene `id` desde `useRouter()` y ejecuta Apollo `useQuery()` en cliente. Esto genera:

- HTML inicial sin datos del curso.
- Peor SEO.
- Loading state innecesario en primera carga.
- Query GraphQL construida con interpolación directa.
- Riesgo si `id` llega vacío o inválido.

### Tareas

- Mover carga de datos a `getServerSideProps`.
- Usar GraphQL variables en lugar de interpolar `id`.
- Pasar `course` como prop inicial.
- Mantener Pages Router.
- Mantener fallback de error controlado.
- Retornar `notFound: true` si no existe curso.

### Validación

```bash
npm run lint
npm run typecheck
npm run build
```

### Commit

```bash
git add .
git commit -m "refactor: migrate course detail page to SSR"
```

### Rollback

```bash
git revert <commit_sha>
```

---

## Step 20 — Migrar páginas SSR elegibles restantes

Status: [x]

### Objetivo

Aplicar SSR a páginas públicas y SEO-relevantes.

### Tareas

- Migrar páginas listadas en `docs/csr-to-ssr-audit.md` como elegibles.
- Mantener CSR solo cuando tenga sentido:
  - dashboards privados
  - datos no críticos para SEO
  - datos dependientes de interacción cliente

### Validación

```bash
npm run lint
npm run typecheck
npm run build
```

### Commit

```bash
git add .
git commit -m "refactor: migrate eligible pages from CSR to SSR"
```

### Rollback

```bash
git revert <commit_sha>
```

---

# Phase 6 — Seguridad GraphQL

## Step 21 — Eliminar interpolación directa en GraphQL

Status: [x]

### Objetivo

Eliminar queries GraphQL que interpolan valores directamente en template strings.

### Tareas

- Buscar patrones como:

```ts
gql`query { course(id: ${id}) { ... } }`
```

- Reemplazar por variables GraphQL:

```ts
gql`
  query CourseQuery($id: ID!) {
    course(id: $id) {
      name
    }
  }
`;
```

- Validar rutas dinámicas.
- Documentar en `docs/graphql-conventions.md`.

### Validación

```bash
npm run lint
npm run typecheck
npm run build
```

### Commit

```bash
git add .
git commit -m "refactor: use GraphQL variables for dynamic queries"
```

### Rollback

```bash
git revert <commit_sha>
```

---

# Phase 7 — SEO con data existente

## Step 22 — Auditar SEO actual

Status: [x]

### Objetivo

Identificar qué metadata puede generarse con la data existente de páginas y GraphQL.

### Tareas

Crear `docs/seo-audit.md` con:

- rutas públicas
- title actual
- description actual o ausente
- datos disponibles para SEO
- canonical URL esperada
- Open Graph esperado
- Twitter card esperado
- JSON-LD posible
- páginas que requieren `noindex`

Para cursos, usar data existente:

- `name`
- `tutorUsername`
- `level`
- `users`
- `score`
- `price`
- `realPrice`

### Validación

```bash
npm run lint
npm run typecheck
npm run build
```

### Commit

```bash
git add .
git commit -m "docs: add SEO audit"
```

### Rollback

```bash
git revert <commit_sha>
```

---

## Step 23 — Implementar SEO en Pages Router

Status: [x]

### Objetivo

Agregar metadata SEO en páginas SSR usando la data disponible.

### Tareas

- Crear helper SEO si aplica:

```txt
lib/seo.ts
```

- Para detalle de curso:
  - title: `Curso ${course.name} | Crashcourse`
  - description usando `name`, `tutorUsername`, `level`, `score` y `price`.
  - canonical usando `NEXT_PUBLIC_SITE_URL`.
  - Open Graph básico.
  - Twitter card básico.
- Mantener `Head` en Pages Router.
- No inventar imágenes si no existen en la data.
- Agregar fallback seguro si falta algún dato.

### Validación

```bash
npm run lint
npm run typecheck
npm run build
```

### Commit

```bash
git add .
git commit -m "feat: add SEO metadata for SSR pages"
```

### Rollback

```bash
git revert <commit_sha>
```

---

## Step 24 — Agregar structured data cuando aplique

Status: [x]

### Objetivo

Agregar JSON-LD para páginas donde la data sea suficiente.

### Tareas

- Evaluar `Course` o `Product` schema para detalle de curso.
- Usar únicamente datos existentes.
- No inventar ratings, imágenes o disponibilidad.
- Sanitizar contenido serializado en `<script type="application/ld+json">`.
- Documentar decisión en `docs/seo-audit.md`.

### Validación

```bash
npm run lint
npm run typecheck
npm run build
```

### Commit

```bash
git add .
git commit -m "feat: add structured data for course pages"
```

### Rollback

```bash
git revert <commit_sha>
```

---

# Phase 8 — Upgrade de Next.js por saltos

## Step 25 — Documentar estrategia de upgrade

Status: [ ]

### Objetivo

Identificar breaking changes antes de actualizar.

### Tareas

Crear `docs/next-upgrade-plan.md` con:

- versión actual
- versión objetivo del primer salto
- versión objetivo final
- impacto en React
- impacto en styled-components
- impacto en Apollo
- impacto en `next lint`
- impacto en Pages Router
- riesgos conocidos

### Validación

```bash
npm run lint
npm run typecheck
npm run build
```

### Commit

```bash
git add .
git commit -m "docs: add Next.js upgrade plan"
```

### Rollback

```bash
git revert <commit_sha>
```

---

## Step 26 — Upgrade Next.js primer salto

Status: [ ]

### Objetivo

Actualizar desde Next.js 12 a un salto intermedio estable.

### Tareas

- Actualizar Next.js y React si aplica.
- Revisar cambios requeridos en config.
- Validar styled-components SSR.
- Mantener Pages Router.
- No migrar a App Router en este step.

### Validación

```bash
npm run lint
npm run typecheck
npm run build
npm run test || true
```

### Commit

```bash
git add .
git commit -m "chore: upgrade Next.js first compatibility step"
```

### Rollback

```bash
git revert <commit_sha>
```

---

## Step 27 — Upgrade Next.js segundo salto

Status: [ ]

### Objetivo

Actualizar al siguiente salto compatible.

### Tareas

- Actualizar Next.js y React si aplica.
- Resolver breaking changes.
- Mantener Pages Router funcionando.
- Validar SSR y SEO.

### Validación

```bash
npm run lint
npm run typecheck
npm run build
npm run test || true
```

### Commit

```bash
git add .
git commit -m "chore: upgrade Next.js second compatibility step"
```

### Rollback

```bash
git revert <commit_sha>
```

---

## Step 28 — Upgrade a versión objetivo final

Status: [ ]

### Objetivo

Llegar a la versión estable final compatible.

### Tareas

- Actualizar Next.js a versión objetivo.
- Actualizar React/React DOM si aplica.
- Corregir config.
- Validar que Pages Router sigue funcionando.
- Validar que `app/` todavía no rompe rutas existentes.

### Validación

```bash
npm run lint
npm run typecheck
npm run build
```

### Commit

```bash
git add .
git commit -m "chore: upgrade Next.js to target version"
```

### Rollback

```bash
git revert <commit_sha>
```

---

# Phase 9 — Migración gradual a App Router

## Step 29 — Auditar migración de Pages Router a App Router

Status: [ ]

### Objetivo

Definir qué rutas migran primero y qué rutas permanecen temporalmente en Pages Router.

### Tareas

Crear `docs/app-router-migration-plan.md` con:

- listado de rutas actuales en `pages/`
- tipo de ruta: estática, dinámica, SSR, CSR
- dependencias cliente: `useQuery`, `useRouter`, browser APIs
- necesidad de `use client`
- metadata requerida
- prioridad de migración
- riesgo de migración

### Validación

```bash
npm run lint
npm run typecheck
npm run build
```

### Commit

```bash
git add .
git commit -m "docs: add App Router migration plan"
```

### Rollback

```bash
git revert <commit_sha>
```

---

## Step 30 — Preparar estructura base de App Router

Status: [ ]

### Objetivo

Introducir `app/` sin migrar rutas complejas todavía.

### Tareas

- Crear `app/`.
- Crear `app/layout.tsx`.
- Crear providers necesarios en un Client Component, por ejemplo:

```txt
app/providers.tsx
```

- Mantener `pages/` para rutas no migradas.
- Validar convivencia de Pages Router y App Router.
- No duplicar rutas existentes conflictivas.

### Validación

```bash
npm run lint
npm run typecheck
npm run build
```

### Commit

```bash
git add .
git commit -m "chore: prepare App Router structure"
```

### Rollback

```bash
git revert <commit_sha>
```

---

## Step 31 — Migrar rutas estáticas de bajo riesgo a App Router

Status: [ ]

### Objetivo

Validar App Router con rutas simples.

### Tareas

- Elegir una ruta estática o de bajo riesgo.
- Migrarla a `app/`.
- Definir `metadata`.
- Validar estilos globales.
- Validar navegación.

### Validación

```bash
npm run lint
npm run typecheck
npm run build
```

### Commit

```bash
git add .
git commit -m "refactor: migrate low risk route to App Router"
```

### Rollback

```bash
git revert <commit_sha>
```

---

## Step 32 — Migrar detalle de curso a App Router

Status: [ ]

### Objetivo

Migrar `pages/cursos/[id].tsx` a `app/cursos/[id]/page.tsx`.

### Tareas

- Reemplazar `getServerSideProps` por data fetching server-side en App Router.
- Usar GraphQL variables.
- Definir `generateMetadata` con data del curso.
- Mantener Client Components solo para interacción.
- Usar `notFound()` si el curso no existe.
- Mantener SEO equivalente o superior al de Pages Router.

### Validación

```bash
npm run lint
npm run typecheck
npm run build
```

### Commit

```bash
git add .
git commit -m "refactor: migrate course detail page to App Router"
```

### Rollback

```bash
git revert <commit_sha>
```

---

## Step 33 — Migrar rutas restantes elegibles a App Router

Status: [ ]

### Objetivo

Completar migración progresiva de rutas compatibles.

### Tareas

- Migrar rutas según prioridad definida.
- Mantener Pages Router para rutas que sigan teniendo riesgo alto.
- Documentar rutas pendientes.

### Validación

```bash
npm run lint
npm run typecheck
npm run build
```

### Commit

```bash
git add .
git commit -m "refactor: migrate eligible routes to App Router"
```

### Rollback

```bash
git revert <commit_sha>
```

---

# Phase 10 — Calidad de código y optimizaciones

## Step 34 — Auditoría de calidad de código

Status: [ ]

### Objetivo

Listar problemas técnicos antes de ejecutar optimizaciones.

### Tareas

Crear `docs/code-quality-audit.md` con:

- componentes difíciles de mantener
- props mal tipadas
- duplicación
- queries GraphQL repetidas
- problemas de renderizado
- problemas de accesibilidad
- problemas de performance
- deuda técnica priorizada
- imports relativos que deberían usar aliases
- tipos que deberían moverse a `*.types.ts`
- tests faltantes por carpeta

### Validación

```bash
npm run lint
npm run typecheck
npm run build
```

### Commit

```bash
git add .
git commit -m "docs: add code quality audit"
```

### Rollback

```bash
git revert <commit_sha>
```

---

## Step 35 — Ejecutar optimizaciones priorizadas

Status: [ ]

### Objetivo

Reducir deuda técnica detectada.

### Tareas

- Ejecutar optimizaciones de bajo riesgo primero.
- No mezclar cambios visuales grandes.
- Priorizar:
  - deduplicación
  - separación de responsabilidades
  - aliases
  - tipos compartidos
  - simplificación de componentes

### Validación

```bash
npm run lint
npm run typecheck
npm run build
```

### Commit

```bash
git add .
git commit -m "refactor: apply prioritized code quality improvements"
```

### Rollback

```bash
git revert <commit_sha>
```

---

# Phase 11 — Normalización del patrón props

## Step 36 — Auditar patrón legacy de props

Status: [ ]

### Objetivo

Identificar componentes que usan `function Component({ props })`.

### Tareas

Crear `docs/props-pattern-audit.md` con:

- componente
- tipo actual de props
- riesgo de refactor
- recomendación
- si requiere `Component.types.ts`

### Validación

```bash
npm run lint
npm run typecheck
npm run build
```

### Commit

```bash
git add .
git commit -m "docs: audit legacy props pattern"
```

### Rollback

```bash
git revert <commit_sha>
```

---

## Step 37 — Normalizar props en componentes de bajo riesgo

Status: [ ]

### Objetivo

Migrar gradualmente desde `props` genérico hacia props explícitas.

### Tareas

Antes:

```tsx
function Main({ props }) {
  return <div>{props.title}</div>;
}
```

Después:

```tsx
import type { MainProps } from './Main.types';

function Main({ title }: MainProps) {
  return <div>{title}</div>;
}
```

- Crear `*.types.ts` cuando corresponda.
- No cambiar comportamiento visual.

### Validación

```bash
npm run lint
npm run typecheck
npm run build
```

### Commit

```bash
git add .
git commit -m "refactor: normalize low risk component props"
```

### Rollback

```bash
git revert <commit_sha>
```

---

# Phase 12 — Vitest y cobertura

## Step 38 — Instalar Vitest y Testing Library

Status: [ ]

### Objetivo

Agregar infraestructura de testing unitario.

### Tareas

Instalar:

```bash
npm install -D vitest @vitest/coverage-v8 jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

Crear:

```txt
vitest.config.ts
test/setup.ts
```

Configurar Vitest globals:

```ts
export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      thresholds: {
        statements: 90,
        branches: 90,
        functions: 90,
        lines: 90,
      },
    },
  },
});
```

Confirmar que `tsconfig.json` conserva:

```json
{
  "compilerOptions": {
    "types": ["vitest/globals"]
  }
}
```

### Validación

```bash
npm run lint
npm run typecheck
npm run test
npm run coverage
npm run build
```

### Commit

```bash
git add .
git commit -m "test: add Vitest testing setup"
```

### Rollback

```bash
git revert <commit_sha>
```

---

## Step 39 — Agregar tests unitarios de componentes

Status: [ ]

### Objetivo

Cubrir componentes UI principales.

### Tareas

- Ubicar tests en `__tests__` dentro de la carpeta del componente.
- Usar patrón:

```txt
components/UI/Button/
  Button.tsx
  Button.types.ts
  __tests__/
    Button.spec.tsx
```

- Testear:
  - renderizado
  - props principales
  - estados condicionales
  - navegación si aplica
  - accesibilidad básica

### Validación

```bash
npm run lint
npm run typecheck
npm run test
npm run coverage
npm run build
```

### Commit

```bash
git add .
git commit -m "test: add component unit tests"
```

### Rollback

```bash
git revert <commit_sha>
```

---

## Step 40 — Agregar tests para SSR, SEO y GraphQL

Status: [ ]

### Objetivo

Cubrir data fetching SSR, estados de error, SEO y variables GraphQL.

### Tareas

- Testear `getServerSideProps` cuando aún exista Pages Router.
- Testear funciones de data fetching en App Router cuando existan.
- Testear:
  - curso encontrado
  - curso no encontrado
  - error backend
  - variables GraphQL correctas
  - metadata SEO generada desde data existente
  - canonical URL
- Mockear Apollo Client.

### Validación

```bash
npm run lint
npm run typecheck
npm run test
npm run coverage
npm run build
```

### Commit

```bash
git add .
git commit -m "test: add SSR SEO and GraphQL coverage"
```

### Rollback

```bash
git revert <commit_sha>
```

---

## Step 41 — Alcanzar 90% de cobertura

Status: [ ]

### Objetivo

Cubrir al menos 90% del código.

### Tareas

- Revisar reporte de coverage.
- Agregar tests faltantes.
- Excluir solo archivos justificables:
  - configuración
  - generated files
  - archivos puramente declarativos
- Documentar exclusiones en `docs/test-coverage.md`.

### Validación

```bash
npm run lint
npm run typecheck
npm run coverage
npm run build
```

### Commit

```bash
git add .
git commit -m "test: reach 90 percent unit test coverage"
```

### Rollback

```bash
git revert <commit_sha>
```

---

# Phase 13 — Playwright E2E mínimo

## Step 42 — Instalar Playwright

Status: [ ]

### Objetivo

Agregar infraestructura E2E mínima.

### Tareas

Instalar:

```bash
npm install -D @playwright/test
npx playwright install
```

Crear:

```txt
playwright.config.ts
e2e/
```

Agregar scripts:

```json
{
  "scripts": {
    "e2e": "playwright test",
    "e2e:ui": "playwright test --ui"
  }
}
```

### Validación

```bash
npm run lint
npm run typecheck
npm run build
npm run e2e
```

### Commit

```bash
git add .
git commit -m "test: add Playwright E2E setup"
```

### Rollback

```bash
git revert <commit_sha>
```

---

## Step 43 — Agregar E2E de rutas críticas

Status: [ ]

### Objetivo

Cubrir flujos mínimos del sitio.

### Tareas

Agregar E2E para:

- home
- listado de cursos
- detalle de curso SSR/App Router
- estado de error backend si es mockeable
- metadata visible crítica si aplica

### Validación

```bash
npm run lint
npm run typecheck
npm run build
npm run e2e
```

### Commit

```bash
git add .
git commit -m "test: add critical route E2E coverage"
```

### Rollback

```bash
git revert <commit_sha>
```

---

# Phase 14 — GitHub Actions y Dependabot

## Step 44 — Agregar GitHub Actions CI

Status: [ ]

### Objetivo

Agregar CI tomando como referencia el portfolio.

### Referencia

El portfolio usa:

- workflow `CI Pipeline`
- triggers en `push` y `pull_request` hacia `master`
- `actions/checkout`
- `actions/setup-node`
- Node.js 24
- cache de npm
- `npm ci`
- lint
- type checking
- tests

### Tareas

Crear `.github/workflows/ci.yml` adaptado:

```yaml
name: CI Pipeline

on:
  push:
    branches: [master]
  pull_request:
    branches: [master]

jobs:
  build-and-test:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout Repository
        uses: actions/checkout@v7

      - name: Setup Node.js 24
        uses: actions/setup-node@v6
        with:
          node-version: 24
          cache: 'npm'

      - name: Install Dependencies
        run: npm ci

      - name: Run Biome Check
        run: npm run lint

      - name: Run Type Checking
        run: npm run typecheck

      - name: Run Unit Tests
        run: npm run test

      - name: Run Coverage
        run: npm run coverage

      - name: Build
        run: npm run build
```

Ajustar branch si el repo usa `main` en lugar de `master`.

### Validación

```bash
npm run lint
npm run typecheck
npm run test
npm run coverage
npm run build
```

### Commit

```bash
git add .
git commit -m "ci: add GitHub Actions pipeline"
```

### Rollback

```bash
git revert <commit_sha>
```

---

## Step 45 — Agregar Playwright al CI

Status: [ ]

### Objetivo

Ejecutar E2E en CI después del build.

### Tareas

- Agregar instalación de browsers:

```yaml
- name: Install Playwright Browsers
  run: npx playwright install --with-deps
```

- Agregar:

```yaml
- name: Run E2E Tests
  run: npm run e2e
```

### Validación

```bash
npm run lint
npm run typecheck
npm run test
npm run coverage
npm run build
npm run e2e
```

### Commit

```bash
git add .
git commit -m "ci: add Playwright E2E checks"
```

### Rollback

```bash
git revert <commit_sha>
```

---

## Step 46 — Agregar Dependabot tomando referencia del portfolio

Status: [ ]

### Objetivo

Automatizar actualizaciones de dependencias.

### Tareas

Crear `.github/dependabot.yml` basado en el portfolio:

- `github-actions` semanal.
- `npm` semanal.
- timezone `America/Lima`.
- reviewer `jcvegab`.
- grupos para React, dev dependencies y production dependencies.
- cooldown para major/minor/patch.

### Validación

```bash
npm run lint
npm run typecheck
npm run build
```

### Commit

```bash
git add .
git commit -m "ci: add Dependabot configuration"
```

### Rollback

```bash
git revert <commit_sha>
```

---

# Phase 15 — Documentación para agentes

## Step 47 — Actualizar AGENTS.md

Status: [ ]

### Objetivo

Actualizar instrucciones del proyecto según la nueva arquitectura.

### Tareas

Actualizar:

- comandos disponibles
- Node.js 24
- Biome como formatter/linter
- lint-staged
- TypeScript
- custom paths
- convención `*.types.ts`
- tests en `__tests__`
- Vitest globals
- coverage mínimo 90%
- Playwright
- SSR
- App Router
- SEO
- Apollo SSR
- GraphQL variables
- variables de entorno
- workflow de commits por step

### Validación

```bash
npm run lint
npm run typecheck
npm run test
npm run coverage
npm run build
```

### Commit

```bash
git add .
git commit -m "docs: update AGENTS instructions"
```

### Rollback

```bash
git revert <commit_sha>
```

---

## Step 48 — Crear o actualizar CLAUDE.md

Status: [ ]

### Objetivo

Alinear Claude Code con el workflow real del proyecto.

### Tareas

Incluir reglas:

- ejecutar un step por vez
- hacer commit por step
- usar Biome, no Prettier/ESLint como fuente principal
- respetar TypeScript strict
- conservar `types: ["vitest/globals"]`
- crear tests en `__tests__`
- respetar custom paths
- respetar convención `Component.types.ts`
- ejecutar tests antes de commit
- mantener coverage mínimo de 90%
- actualizar SEO cuando cambie data pública
- actualizar docs si cambia arquitectura
- no mezclar Pages Router/App Router en el mismo step salvo que el step lo indique

### Validación

```bash
npm run lint
npm run typecheck
npm run test
npm run coverage
npm run build
```

### Commit

```bash
git add .
git commit -m "docs: update Claude agent instructions"
```

### Rollback

```bash
git revert <commit_sha>
```

---

# Phase 16 — Verificación final

## Step 49 — Verificación completa del proyecto

Status: [ ]

### Objetivo

Confirmar que la modernización está completa y estable.

### Tareas

Ejecutar:

```bash
npm run lint
npm run typecheck
npm run test
npm run coverage
npm run build
npm run e2e
git status
```

Crear `docs/final-modernization-report.md` con:

- resumen de cambios
- versión final de Node
- versión final de Next.js
- versión final de React
- estado de Pages Router/App Router
- rutas migradas a SSR
- rutas migradas a App Router
- cobertura final
- estado de SEO
- estado de CI
- deuda pendiente

### Commit

```bash
git add .
git commit -m "docs: add final modernization report"
```

### Rollback

```bash
git revert <commit_sha>
```

---

# Checklist final

- [ ] Node.js 24 fijado en `.nvmrc` y `.node-version`.
- [ ] TypeScript instalado.
- [ ] `tsconfig.json` contiene `types: ["vitest/globals"]`.
- [ ] Custom paths configurados.
- [ ] Biome instalado y configurado.
- [ ] lint-staged configurado con Biome.
- [ ] Convenciones de tipos documentadas.
- [ ] Tests unitarios ubicados en `__tests__`.
- [ ] Archivos principales migrados a `.ts` / `.tsx`.
- [ ] `tsconfig.json` endurecido.
- [ ] CSR relevante migrado a SSR.
- [ ] GraphQL usa variables, no interpolación directa.
- [ ] SEO implementado con data existente.
- [ ] Structured data agregado solo donde aplica.
- [ ] Next.js actualizado por saltos.
- [ ] React actualizado si aplica.
- [ ] App Router introducido gradualmente.
- [ ] Build funcionando.
- [ ] Biome funcionando.
- [ ] Vitest instalado.
- [ ] Coverage mínimo de 90%.
- [ ] Playwright instalado.
- [ ] E2E mínimo funcionando.
- [ ] GitHub Actions configurado.
- [ ] Dependabot configurado.
- [ ] `AGENTS.md` actualizado.
- [ ] `CLAUDE.md` actualizado.
- [ ] Cada step tiene su propio commit.
- [ ] No quedan cambios sin commit.

---

# Comando final de verificación

```bash
npm run lint
npm run typecheck
npm run test
npm run coverage
npm run build
npm run e2e
git status
```

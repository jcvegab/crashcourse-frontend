# Code Quality Audit

> Generated: Step 34 — Baseline antes de optimizaciones.

## HIGH priority

### 1. Invalid CSS `display: flexbox`

- **File:** `components/layouts/Categories.tsx:18`
- **Issue:** `display: flexbox` no es un valor CSS válido. Debe ser `display: flex`.
- **Impact:** El layout flex no funciona, el contenedor cae a `display: block`.

### 2. Relative imports sin alias

- **File:** `components/UI/CoursePreview.tsx:3-4`
- **Issue:** Usa `../../components/UI/Button` y `../../components/UI/CourseCost` en lugar de `@/ui/Button` y `@/ui/CourseCost`.
- **Impact:** Inconsistencia, difícil de refactorizar si se mueven archivos.
- **Other files:** No hay otros casos, pero el patrón estándar debe ser siempre alias.

### 3. Zero test coverage / Vitest no instalado

- **Issue:** No existe ni un solo `__tests__` en todo el proyecto.
- **`package.json`:** No tiene `vitest` ni `@testing-library/react` en devDependencies.
- **`tsconfig.json`:** Declara `"types": ["vitest/globals"]` pero Vitest no está instalado.
- **Impact:** Sin tests, no hay red de seguridad para refactors.

### 4. `tsconfig.json` references non-existent directories

- **Paths obsoletos:**
  - `@/pages/*` → `pages/*` — carpeta `pages/` no existe (migrada a `app/`).
  - `@/utils/*` → `utils/*` — carpeta `utils/` no existe.
- **Impact:** Aliases muertos que pueden confundir imports futuros.

### 5. Duplicated field selection in GraphQL queries

- **Files:** `app/page.tsx:15-34`, `app/cursos/[id]/page.tsx:16-28`
- **Issue:** Los fields `name, tutorUsername, level, users, score, price, realPrice` aparecen en ambas queries. No hay un fragment compartido.
- **Impact:** Si se agrega un field a una query y se olvida la otra, hay inconsistencia.

---

## MEDIUM priority

### 6. Keyboard-inaccessible `div` with `onClick`

- **File:** `components/UI/CategoryCard.tsx:32`
- **Issue:** `<CategoryCardContainer onClick={...}>` renderiza un `div` con `onClick` pero sin `role="button"`, `tabIndex`, ni manejadores de teclado.
- **Impact:** Inaccesible para navegación por teclado.

### 7. Missing `alt` text on `<img>` elements

- **File:** `components/UI/CourseStats.tsx:34,38,42`
- **Issue:** Tres `<StatsIcon>` (styled.img) sin atributo `alt`. React produce `alt=""` por defecto, pero iconos decorativos deberían tener `alt=""` explícito, e iconos informativos deberían describir el contenido.
- **File:** `components/UI/CategoryCard.tsx:33`
- **Issue:** `<Image alt="" />` — alt vacío en un icono que representa una categoría. Debe describir la categoría.

### 8. Missing aria labels

- **File:** `components/layouts/Categories.tsx:18`
- **Issue:** `<CategoriesList>` es scrollable (`overflow-x: scroll`) pero no tiene `aria-label` ni `role="list"`.
- **File:** `components/UI/Spinner.tsx`
- **Issue:** Loading spinner sin `role="status"` ni `aria-label`.

### 9. LoadingPage file/function name mismatch

- **File:** `components/layouts/LoadingPage.tsx:14`
- **Issue:** El archivo se llama `LoadingPage.tsx` pero exporta una función llamada `Loading`.
- **Fix:** Renombrar la función a `LoadingPage` o el archivo a `Loading.tsx`.

---

## LOW priority

### 10. No `.types.ts` files anywhere

- **Issue:** Todos los componentes definen sus props inline en el `.tsx`. No existe ningún `*.types.ts`.
- **Affects:** Todos los componentes UI y layouts.
- **Convention:** Según `docs/code-conventions.md`, los tipos de props deben estar en `<Component>.types.ts`.

### 11. No `index.ts` barrel files

- **Issue:** No hay ningún `index.ts` en `components/UI/`, `components/layouts/`, `lib/`, o `types/`.
- **Impact:** Los imports deben apuntar al archivo exacto en lugar de a la carpeta.

### 12. Styled-components nested theme access

- **Files:** `components/UI/Button.tsx:36-42`, `components/UI/Title.tsx:18-56`
- **Issue:** Acceso a `theme` dentro de interpolaciones anidadas (`${props => css`...${({theme}) => ...}`...}`). Funciona en la mayoría de configuraciones pero es frágil.

### 13. `StatsContainer` has `gap` without `display`

- **File:** `components/UI/CourseStats.tsx:3-5`
- **Issue:** `gap: 10px` sin `display: flex` ni `display: grid`. Funciona porque el elemento tiene `className="flex items-center"` desde el CSS global, pero el styled-component por sí solo no define el display.

### 14. Typo: `movile` → `mobile`

- **File:** `components/UI/Title.tsx:5`
- **Issue:** Prop type tiene `movile?: boolean`. Debe ser `mobile`.

### 15. `Title.tsx` named exports mismatch

- **File:** `components/UI/Title.tsx`
- **Issue:** Exporta `StyledH1`, `StyledH2`, `StyledH3`, `StyledH4` — no hay un componente llamado `Title`. El nombre del archivo no coincide con los exports.

### 16. `SeoHead` dual export

- **File:** `components/UI/SeoHead.tsx:12,51`
- **Issue:** Exporta tanto named (`SeoHead`) como default (el mismo componente). Puede causar confusión en imports.

### 17. Inline arrow functions in render

- **Files:**
  - `components/UI/CategoryCard.tsx:32` — `onClick={() => onSelect(category)}`
  - `components/layouts/Main.tsx:30-34` — `onSelect={(category: string) => { ... }}`
  - `components/layouts/Categories.tsx:32-34` — `onSelect={(c) => { onSelect(c); }}` (redundant wrapper)
- **Impact:** Nueva función en cada render. Bajo impacto en componentes simples, pero debe evitarse en componentes pesados.

### 18. Dead biome config for test directories

- **File:** `biome.json:82-94`
- **Issue:** Override que desactiva `noExplicitAny` y `noDangerouslySetInnerHtml` para `__tests__/**`, pero no existe ningún `__tests__`.

### 19. Uppercase `UI/` directory inconsistency

- **Issue:** `components/UI/` usa mayúsculas. El resto del proyecto usa minúsculas: `components/layouts/`, `lib/`, `types/`, `styles/`, `public/`, `app/`.

### 20. Empty `styles/globals.css`

- **File:** `styles/globals.css`
- **Issue:** Archivo vacío (sin contenido útil). Puede eliminarse.

### 21. `rgb()` with alpha instead of `rgba()`

- **File:** `components/UI/Spinner.tsx:9`
- **Issue:** `rgb(0, 0, 0, 0.1)` — válido en CSS moderno pero puede causar confusión. Preferir `rgba()` para claridad.

---

## Previously fixed (steps anteriores)

| Issue | Step | Fix |
|-------|------|-----|
| Interpolación directa en GraphQL | Step 21 | Reemplazado por GraphQL variables |
| CSR sin SSR | Step 19-20 | Migrado a `getServerSideProps` y luego App Router |
| Next.js 12 | Step 26-28 | Actualizado a Next.js 16 |
| Sin TypeScript | Step 4 | TypeScript configurado |
| Sin Biome | Step 7-8 | Biome como linter/formatter |
| lint-staged faltante | Step 9 | Configurado con Husky |

---

## Resumen de deuda técnica priorizada

```txt
P0 (HIGH):
  □ Fix display:flexbox → display:flex
  □ Fix relative imports in CoursePreview
  □ Install Vitest + add tests (or remove vitest/globals from tsconfig)
  □ Clean up dead tsconfig paths (@/pages, @/utils)

P1 (MEDIUM):
  □ Add keyboard accessibility to CategoryCard
  □ Add alt text to all <img>/<Image> elements
  □ Add aria-labels to scrollable containers and spinner
  □ Fix LoadingPage function name

P2 (LOW):
  □ Create .types.ts files for all components
  □ Create index.ts barrel files
  □ Fix typo movile → mobile
  □ Normalize UI/ directory casing
  □ Remove dead biome config
  □ Remove empty globals.css
  □ Create shared GraphQL fragment for course fields
```

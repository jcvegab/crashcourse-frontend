# Props Pattern Audit

## Componentes con patrón legacy `({ props })`

Los siguientes componentes reciben un objeto `props` instead of destructurar explícitamente sus atributos. Este patrón introduce indirection, dificulta el análisis de tipos y agrega verbosidad innecesaria.

---

### 1. Main (`components/layouts/Main.tsx`)

**Patrón actual:**

> Tip: function Main({ props }: MainProps) {
> console.log(props.courses);
> console.log(props.categories);
> }

**Data recibida:**

- `categories` (Object array)
- `courses` (Course array)

**Riesgo:** Medio. Componente contenedor de los componentes UX de la home.

**Recomendación:**

- Normalizar a: `({ categories, courses })`
- Crear `Main.types.ts` si se necesita compartir el tipo.

---

### 2. Categories (`components/layouts/Categories.tsx`)

**Patrón actual:**

> Tip: function Categories({ props, onSelect }: CategoriesProps) {
> console.log(props.map(...));
> }

**Data recibida:**

- `props` (Category array)

**Riesgo:** Bajo. Componente simple de listado.

**Recomendación:**

- Cambiar a: `({ categories, onSelect })`
- Usar `Category[]` en lugar de `props`

---

### 3. CoursesList (`components/layouts/CoursesList.tsx`)

**Patrón actual:**

> Tip: function CoursesList({ props }: CoursesListProps) {
> console.log(props.map(...));
> }

**Data recibida:**

- `props` (CourseSummary array)

**Riesgo:** Bajo. Componente simple de listado.

**Recomendación:**

- Cambiar a: `({ courses })`
-armado: `CourseSummary[]`

---

### 4. CourseCard (`components/UI/CourseCard.tsx`)

**Patrón actual:**

```typescript
function CourseCard({ props }: CourseCardProps) {
  console.log(props.name);
  console.log(props.price);
  console.log(props.score);
}
```

**Data recibida:**

- `name` (string)
- `tutorUsername` (string)
- `level` (string)
- `users` (number)
- `score` (number)
- `price` (number)
- `realPrice` (number)
- `id` (number/string)

**Riesgo:** Bajo. Componente presentacional.

**Recomendación:**

- Desestructurar todas las props: `({ name, tutorUsername, level, users, score, price, realPrice, id })`
- Usar `CourseCardProps` y tipar individualmente.

---

### 5. CoursePreview (`components/UI/CoursePreview.tsx`)

**Patrón actual:**

> Tip: function CoursePreview({ props }: CoursePreviewProps) {
> console.log(props.price);
> console.log(props.realPrice);
> }

**Data recibida:**

- `price` (number)
- `realPrice` (number)

**Riesgo:** Bajo. Componente presentacional pequeño.

**Recomendación:**

- Desestructurar: `({ price, realPrice })`
- Eliminar referencia a `props`

---

## Cascada del problema

La raíz del patrón `({ props })` está en `Main.tsx` que históricamente compartía interfaces y recorría la información a lo hijo a través del patrón `props`. Este diseminó el anti-patrón a lo largo de la cadena de componentes.

Reorden recomendado de migración (dependencia desde abajo hacia arriba):

1. `CourseCard` (hoja — solo recibe datos)
2. `CoursePreview` (hoja — solo recibe datos)
3. `Categories` (rama simple)
4. `CoursesList` (rama simple)
5. `Main` (raíz — propaga a todos, se normaliza al final)

---

## Componentes que YA están normalizados

- `components/UI/CourseCost.tsx` — recibe `({ price, realPrice })` correctamente
- `components/UI/CourseStats.tsx` — recibe `({ level, users, course_score })` correctamente
- `components/UI/Tag.tsx` — recibe `({ children })` correctamente
- `components/UI/SeoHead.tsx` — recibe `({ seo, faviconHref })` correctamente
- `components/layouts/CallToAction.tsx` — no recibe props
- `components/layouts/Header.tsx` — no recibe props
- `components/layouts/LoadingPage.tsx` — no recibe props
- `app/HomePage.tsx` — recibe `({ data })` correctamente
- `app/cursos/[id]/CoursePage.tsx` — recibe `({ course })` correctamente

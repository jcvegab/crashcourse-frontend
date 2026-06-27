# GraphQL Conventions

## Runtime

Este proyecto no usa Apollo Client.

GraphQL se ejecuta con el helper server-side `gql<TData, TVariables>()` en `lib/gql.ts`, basado en `fetch`.

```ts
const data = await gql<QueryData, QueryVariables>(QUERY, variables, {
  next: { revalidate: 300, tags: ['course-1'] },
});
```

## Environment

`lib/gql.ts` requiere:

- `SERVER_API_URL`: endpoint GraphQL server-side.
- `INTERNAL_TOKEN`: token interno enviado como `X-Internal-Token`.

El helper también lee la cookie `auth-token` desde `next/headers` y, si existe, la envía como `Authorization: Bearer <token>`.

## Security Rules

### No Direct Interpolation

Nunca interpolar valores dinámicos dentro del string GraphQL.

Incorrecto:

```ts
const query = /* GraphQL */ `
  query {
    course(id: ${id}) {
      name
    }
  }
`;
```

Correcto:

```ts
const COURSE_QUERY = /* GraphQL */ `
  query CourseQuery($id: Int!) {
    course(id: $id) {
      name
    }
  }
`;

const data = await gql<CourseQueryData, CourseQueryVariables>(COURSE_QUERY, {
  id,
});
```

### Use GraphQL Variables

Todo valor dinámico debe entrar por `variables`:

- `$id: Int!` para IDs numéricos usados por la API actual.
- `$name: String!` para strings requeridos.
- `$limit: Int` para enteros opcionales.

Usar `camelCase` para variables: `$courseId`, no `$course_id`.

## Query Organization

### Shared Fragments

Los fragments compartidos viven en `lib/courseQueries.ts`.

```ts
export const COURSE_FIELDS_FRAGMENT = /* GraphQL */ `
  fragment CourseFields on CourseType {
    name
    tutorUsername
    level
    users
    score
    price
    realPrice
  }
`;
```

### Page Queries

Las queries usadas por una sola ruta pueden vivir junto a la página App Router.

```tsx
const COURSE_QUERY = /* GraphQL */ `
  ${COURSE_FIELDS_FRAGMENT}

  query CourseQuery($id: Int!) {
    course(id: $id) {
      ...CourseFields
    }
  }
`;
```

Extraer a `lib/*Queries.ts` cuando una query o fragment sea compartido por más de una ruta.

## Type Safety

Tipar siempre la respuesta esperada.

```ts
type CourseQueryData = {
  course: Course | null;
};
```

Tipar variables cuando existan.

```ts
type CourseQueryVariables = {
  id: number;
};

const data = await gql<CourseQueryData, CourseQueryVariables>(COURSE_QUERY, {
  id: parseInt(id, 10),
});
```

Si la query no usa variables, pasar `undefined`.

```ts
const data = await gql<ResumeQueryData>(RESUME_QUERY, undefined, {
  next: { revalidate: 300 },
});
```

## App Router Data Fetching

Las queries públicas se ejecutan en Server Components o funciones server-side de App Router.

```tsx
export default async function Home() {
  const data = await gql<ResumeQueryData>(RESUME_QUERY, undefined, {
    next: { revalidate: 300 },
  });

  return <HomePage data={data} />;
}
```

Usar opciones `next` de `fetch` para caching e ISR:

- `next: { revalidate: 300 }` para contenido refrescable.
- `next: { tags: ['course-1'] }` cuando una ruta pueda invalidarse por tag.

## Missing Resources

Para recursos inexistentes en App Router, retornar `notFound()` desde `next/navigation`.

```tsx
const course = await getCourse(id);

if (!course) {
  notFound();
}
```

## Error Handling

`gql()` lanza error cuando:

- `SERVER_API_URL` no está definido.
- `fetch` responde con status no exitoso.
- GraphQL responde con `errors`.

Dejar que errores inesperados lleguen al boundary de App Router (`app/error.tsx`) salvo que la ruta necesite un fallback específico.

No crear cache GraphQL global ni cliente compartido por request. El cache válido es el de `fetch`/Next mediante `next.revalidate` y `next.tags`.

# GraphQL Conventions

## Security Rules

### No Direct Interpolation

Never interpolate variables directly into GraphQL template strings.

**Incorrect:**

```ts
gql`query { course(id: ${id}) { name } }`
```

**Correct:**

```ts
gql`
  query CourseQuery($id: ID!) {
    course(id: $id) {
      name
    }
  }
`;
```

### Use GraphQL Variables

All dynamic values must use GraphQL variables with proper type declarations:

- `$id: ID!` for required IDs
- `$name: String!` for required strings
- `$limit: Int` for optional integers

### Variable Naming

- Use camelCase for variable names: `$courseId`, not `$course_id`
- Match variable names to field names when possible: `course(id: $id)`

## Query Organization

### One Query Per File (when complex)

For reusable or complex queries, consider extracting to a dedicated file:

```
lib/queries/
  courseQuery.ts
  resumeQuery.ts
```

### Inline Queries (when simple)

Simple page-specific queries can stay inline in the page file:

```tsx
// pages/cursos/[id].tsx
const CourseQuery = gql`
  query CourseQuery($id: ID!) {
    course(id: $id) {
      name
      level
    }
  }
`;
```

## Type Safety

### Type Query Data

Always type the expected response shape:

```tsx
type CourseQueryData = {
  course: Course | null;
};

const { data } = await apolloClient.query<CourseQueryData>({
  query: CourseQuery,
  variables: { id },
});
```

### Type Variables (optional but recommended)

```tsx
type CourseQueryVariables = {
  id: string;
};

const { data } = await apolloClient.query<CourseQueryData, CourseQueryVariables>({
  query: CourseQuery,
  variables: { id },
});
```

## SSR Considerations

- Use `initializeApollo()` for server-side queries
- Never share cache between SSR requests
- Use `SERVER_API_URL` when available for server-side requests
- Return `notFound: true` for missing resources

## Error Handling

Always wrap Apollo queries in try/catch for SSR:

```tsx
try {
  const { data } = await apolloClient.query({
    query: MyQuery,
    variables: { id },
  });

  if (!data.resource) {
    return { notFound: true };
  }

  return { props: { data: data.resource } };
} catch {
  return { props: { hasError: true } };
}
```

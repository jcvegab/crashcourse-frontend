# CourseCard

Compound presentation component for one course in a catalog. The caller
assembles the media, course information, stats, price, and actions from the
children it supplies.

## Public API

Import the compound component from `@/ui/CourseCard`:

```tsx
import CourseCard from '@/ui/CourseCard';
```

| Slot | Purpose |
| --- | --- |
| `Root` | Semantic `article` container; accepts article attributes and requires children. |
| `Media` | Cover or media area at the top of the card. |
| `Body` | Content surface below the media. |
| `Info` | Groups title, tutor, and other course information. |
| `Title` | Course title rendered as an `h5`. |
| `Tutor` | Tutor name. |
| `Actions` | Groups the price and purchase action. |

The default export is also the root component, so both `<CourseCard.Root>` and
`<CourseCard>` can be used as the container. The named compound form is
recommended because it makes each slot explicit.

## Usage

```tsx
import Button from '@/ui/Button';
import CourseCard from '@/ui/CourseCard';
import CourseStats from '@/ui/CourseStats';
import Price from '@/ui/Price';
import Tag from '@/ui/Tag';
import type { CourseSummary } from '@/types/course.types';

export function CourseCatalogCard({ course }: { course: CourseSummary }) {
  return (
    <CourseCard.Root>
      <CourseCard.Media>
        <Tag>Tag venta</Tag>
      </CourseCard.Media>
      <CourseCard.Body>
        <CourseCard.Info>
          <CourseCard.Title>{course.name}</CourseCard.Title>
          <CourseCard.Tutor>{course.tutorUsername}</CourseCard.Tutor>
          <CourseStats
            level={course.level}
            users={course.users}
            course_score={course.score}
          />
        </CourseCard.Info>
        <CourseCard.Actions>
          <Price amount={course.price} compareAtAmount={course.realPrice} />
          <Button href={`/cursos/${course.id}`} fullWidth>
            Comprar ahora
          </Button>
        </CourseCard.Actions>
      </CourseCard.Body>
    </CourseCard.Root>
  );
}
```

`CoursesList` is the data-aware consumer that maps `CourseSummary` fields into
these slots. `CourseCard` itself does not require or inspect a course object.

## Behavior and dependencies

- Slots receive children explicitly. The component does not inspect or clone
  its child tree and does not use React context.
- Styles the `article`, media, body, information, and action slots; it does not
  choose the contents shown in those slots.
- Uses styled-components theme colors `grayLight`, `grayLighter`, and
  `baseMain` through its styled elements.
- Has no state, event handlers, navigation, data fetching, or client directive.
- The current card dimensions are fixed for the desktop reference. Responsive
  sizing is handled separately.

## Accessibility

`Root` renders an `article`; `Title` renders an `h5`. The caller provides the
heading text and accessible action names through children. Surrounding heading
levels should fit the page hierarchy.

## Verification and maintenance

`CourseCard.spec.tsx` verifies slot composition, replacing media content,
course information, stats, price, and the purchase link. Run it with:

```bash
npx vitest run components/UI/CourseCard/CourseCard.spec.tsx
```

Keep this README synchronized with `CourseCard.tsx`, `CourseCard.types.ts`,
`index.ts`, and the consumer mapping in `CoursesList`.

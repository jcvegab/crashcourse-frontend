# CourseDetail

Compound layout for the course header and purchase panel. The page supplies
course data and assembles the pieces; this component only defines their
semantic slots and visual structure.

## Public API

Import the compound component and its root prop type from `@/ui/CourseDetail`:

```tsx
import CourseDetail from '@/ui/CourseDetail';
import type { CourseDetailRootProps } from '@/ui/CourseDetail';
```

| Slot | Purpose |
| --- | --- |
| `Root` | Detail section and desktop grid container; accepts section attributes and requires children. |
| `Media` | Trailer area. Place a presentational media component such as `CourseTrailer` inside it. |
| `Overview` | Groups title, mobile price, description, stats, and instructor information. |
| `Heading` | Course title rendered as the page `h1`. |
| `Summary` | Course description content. |
| `Stats` | Slot for course level, student count, and score. |
| `Instructor` | Tutor row with avatar and text slots. |
| `InstructorAvatar` | 64 px square avatar surface with 10 px rounded corners; use the real image when it is available. |
| `InstructorInfo` | Groups instructor name and role. |
| `InstructorName` | Instructor name in bold 16 px text. |
| `InstructorRole` | Instructor role in regular 16 px text. |
| `Purchase` | Purchase surface containing price and actions. |
| `Price` | Desktop wrapper slot for the reusable `@/ui/Price` component. |
| `MobilePrice` | Mobile wrapper slot for the compact reusable `@/ui/Price` component. |
| `Actions` | Purchase controls, normally the checkout link and cart button. |

## Usage

```tsx
import Button from '@/ui/Button';
import CourseDetail from '@/ui/CourseDetail';
import CourseStats from '@/ui/CourseStats';
import Price from '@/ui/Price';
import CourseTrailer from '@/ui/CourseTrailer';
import type { Course } from '@/types/course.types';

export function CourseHeader({ course }: { course: Course }) {
  return (
    <CourseDetail.Root>
      <CourseDetail.Media>
        <CourseTrailer />
      </CourseDetail.Media>
      <CourseDetail.Overview>
        <CourseDetail.Heading>{course.name}</CourseDetail.Heading>
        <CourseDetail.MobilePrice>
          <Price
            amount={course.price}
            compareAtAmount={course.realPrice}
            size="compact"
          />
        </CourseDetail.MobilePrice>
        <CourseDetail.Summary>Descripción del curso.</CourseDetail.Summary>
        <CourseDetail.Stats>
          <CourseStats
            level={course.level}
            users={course.users}
            course_score={course.score}
          />
        </CourseDetail.Stats>
        <CourseDetail.Instructor>
          <CourseDetail.InstructorAvatar />
          <CourseDetail.InstructorInfo>
            <CourseDetail.InstructorName>Nombre del tutor</CourseDetail.InstructorName>
            <CourseDetail.InstructorRole>Rol del tutor</CourseDetail.InstructorRole>
          </CourseDetail.InstructorInfo>
        </CourseDetail.Instructor>
      </CourseDetail.Overview>
      <CourseDetail.Purchase>
        <CourseDetail.Price>
          <Price
            amount={course.price}
            compareAtAmount={course.realPrice}
            size="large"
          />
        </CourseDetail.Price>
        <CourseDetail.Actions>
          <Button href="/checkout" fullWidth>
            Comprar ahora
          </Button>
          <Button variant="secondary" fullWidth disabled>
            Agregar a carrito
          </Button>
        </CourseDetail.Actions>
      </CourseDetail.Purchase>
    </CourseDetail.Root>
  );
}
```

## Behavior and dependencies

- Slots receive children explicitly. The component does not inspect its child
  tree, clone children, fetch data, or store shared state in context.
- Desktop uses a two-column layout with the trailer and purchase panel on the
  right. Mobile stacks the trailer, overview, and purchase actions, and moves
  the compact price below the title.
- `Purchase` uses the app theme's `grayLight` surface. Its large price is
  visible on desktop; `MobilePrice` supplies the compact price on mobile.
- The overview uses a 24 px gap on desktop and 16 px on mobile. The instructor
  avatar is a 64 px square with 10 px corner rounding.
- The cart action is disabled until the page supplies working cart behavior.
- Requires the application's styled-components `ThemeProvider` for colors.

## Accessibility

`Heading` renders an `h1`. The caller should provide accessible labels or
visible names on controls through their child components.

## Verification and maintenance

`CourseDetail.spec.tsx` verifies slot composition, title and trailer output,
formatted price, checkout navigation, and disabled cart state. Run it with:

```bash
npx vitest run components/UI/CourseDetail/CourseDetail.spec.tsx
```

Keep this README synchronized with `CourseDetail.tsx`, its types, and the page
that assembles the compound slots.

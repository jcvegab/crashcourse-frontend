# CourseTrailer

Presentational prompt for the course trailer area. It shows the local Figma
play icon and the label `Ver Trailer del curso` inside a media surface provided
by its parent.

## Public API

Import the component from `@/ui/CourseTrailer`:

```tsx
import CourseTrailer from '@/ui/CourseTrailer';
```

The component accepts no props. It does not require a URL, callback, or player
configuration.

## Behavior and dependencies

- Uses the local SVG asset at `public/icons/play.svg`; it has no external
  runtime asset dependency.
- Renders a decorative icon and visible text. It does not create a button,
  link, video element, or playback behavior.
- Uses the `white` color from the application's styled-components theme.
- Has no state or client directive.

## Accessibility

The play icon has an empty alternative text and is hidden from assistive
technology. The visible label remains readable as text; the prompt is not
announced as an interactive control.

## Verification and maintenance

`CourseTrailer.spec.tsx` verifies the text, local icon path, and non-interactive
semantics. Run it with:

```bash
npx vitest run components/UI/CourseTrailer/CourseTrailer.spec.tsx
```

Keep this README synchronized with `CourseTrailer.tsx` and the SVG at
`public/icons/play.svg` if the visual or behavior changes.

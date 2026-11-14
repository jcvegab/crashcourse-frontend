export type CourseDetailRootProps = Omit<
  React.ComponentPropsWithoutRef<'section'>,
  'children'
> & {
  children: React.ReactNode;
};

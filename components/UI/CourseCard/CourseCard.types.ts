export type CourseCardRootProps = Omit<
  React.ComponentPropsWithoutRef<'article'>,
  'children'
> & {
  children: React.ReactNode;
};

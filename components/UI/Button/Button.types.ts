export type ButtonVariant = 'primary' | 'secondary';

export type ButtonSize = 'sm' | 'md';

type VisualProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  children: React.ReactNode;
};

type ActionProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: never;
};

type NavigationProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  disabled?: never;
};

export type ButtonProps = VisualProps & (ActionProps | NavigationProps);

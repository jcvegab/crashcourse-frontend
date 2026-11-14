export type ButtonVariant = 'primary' | 'secondary';

export type ButtonSize = 'sm' | 'md';

export type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  url?: string;
  children: React.ReactNode;
};

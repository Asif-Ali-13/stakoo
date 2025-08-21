import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline';

type ButtonProps = PropsWithChildren<{
  variant?: ButtonVariant;
  className?: string;
}> & ButtonHTMLAttributes<HTMLButtonElement>;

const variantToClasses: Record<ButtonVariant, string> = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  outline: 'btn-outline',
};

export function Button({ variant = 'primary', className = '', children, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={`${variantToClasses[variant]} ${className}`.trim()}
    >
      {children}
    </button>
  );
}

export default Button; 
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import type * as React from 'react';
import { forwardRef } from 'react';
import { CgSpinner } from 'react-icons/cg';

import { cn } from '@/lib/utils';
export type ButtonGradient = 'default' | 'yellow' | 'blue' | 'purple' | 'pink' | 'green' | 'violet';

export const buttonGradients: Record<ButtonGradient, string> = {
  default: '',
  yellow:
    'bg-gradient-to-r from-orange-500 to-yellow-500 text-white border-none shadow-sm active:brightness-95 shadow-orange-500/20 hover:shadow-orange-500/30',
  purple:
    'bg-gradient-to-r from-blue-600 to-purple-600 text-white border-none shadow-sm active:brightness-95 shadow-blue-600/20 hover:shadow-blue-600/30',
  violet:
    'bg-gradient-to-r from-purple-600 to-pink-600 text-white border-none shadow-sm active:brightness-95 shadow-purple-600/20 hover:shadow-purple-600/30',
  green:
    'bg-gradient-to-r from-cyan-600 to-green-600 text-white border-none shadow-sm active:brightness-95 hover:shadow-teal-600/20',
  blue: 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white border-none shadow-sm active:brightness-95 hover:shadow-cyan-400/20',
  pink: 'bg-gradient-to-r from-purple-400 to-blue-500 text-white border-none shadow-sm active:brightness-95 hover:shadow-purple-400/20'
};

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer select-none",
  {
    variants: {
      gradient: buttonGradients,
      variant: {
        default: [
          'bg-gradient-to-r text-white border-none shadow-sm active:brightness-95',
          'transition-[transform,box-shadow,scale] duration-300',
          'hover:shadow-lg active:scale-[0.99] hover:scale-[1.03] active:shadow-md'
        ],
        destructive: [
          'bg-destructive text-white shadow-sm border border-current',
          'hover:bg-destructive/90 active:bg-destructive/95',
          'focus-visible:ring-destructive/50',
          'dark:bg-destructive dark:hover:bg-destructive/90 dark:focus-visible:ring-destructive/50'
        ],
        outline: [
          'border! text-primary bg-transparent',
          'hover:bg-primary hover:text-primary-foreground active:bg-primary/90 transition-[transform,filter,box-shadow,scale,color,background-color,border-color] duration-200',
          'active:scale-[0.99]'
        ],
        ghost: [
          'bg-transparent text-foreground hover:bg-accent/80 hover:text-accent-foreground',
          'border border-transparent hover:border-primary/10',
          'focus-visible:ring-accent/50',
          'active:bg-accent/90'
        ],
        link: [
          'text-primary underline-offset-4 hover:underline hover:text-primary/90',
          'focus-visible:ring-primary/50',
          'p-0 h-auto'
        ]
      },
      size: {
        default: 'h-10 px-5 py-2',
        xs: 'h-7 gap-1 px-2.5 text-xs',
        sm: 'h-9 gap-1.5 px-4 text-sm',
        lg: 'h-11 px-6 text-base',
        xl: 'h-12 px-8 text-lg',
        icon: 'size-10 p-2',
        'icon-sm': 'size-9 p-2',
        'icon-xs': 'size-8 p-1.5',
        'icon-lg': 'size-11 p-2.5',
        'icon-xl': 'size-12 p-3'
      },
      rounded: {
        default: 'rounded-full',
        sm: 'rounded-md',
        md: 'rounded-lg',
        lg: 'rounded-xl',
        none: 'rounded-none'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      rounded: 'default',
      gradient: 'default'
    }
  }
);

export interface ButtonProps extends React.ComponentProps<'button'>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  unstyled?: boolean;
  isLoading?: boolean;
  loadingText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      rounded,
      gradient,
      asChild = false,
      isLoading,
      loadingText,
      leftIcon,
      rightIcon,
      children,
      unstyled,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        ref={ref}
        className={unstyled ? className : cn(buttonVariants({ variant, size, rounded, gradient, className }))}
        disabled={isLoading || props.disabled}
        {...props}>
        {isLoading && <CgSpinner className="animate-spin" />}
        {!isLoading && leftIcon}
        {isLoading && loadingText ? loadingText : children}
        {!isLoading && rightIcon}
      </Comp>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };

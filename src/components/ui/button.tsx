import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import type * as React from 'react';
import { forwardRef } from 'react';
import { CgSpinner } from 'react-icons/cg';

import { cn } from '@/lib/utils';

export type ButtonAccent = 'default' | 'marker' | 'muted';

export const buttonAccents: Record<ButtonAccent, string> = {
  default: '',
  marker: 'bg-marker text-[#080808] hover:bg-[#ffe04a]',
  muted: 'bg-muted text-foreground hover:bg-accent hover:text-[#080808]'
};

const buttonVariants = cva(
  "inline-flex min-h-11 min-w-11 items-center justify-center gap-2 whitespace-nowrap rounded-full border-2 border-transparent text-sm font-semibold transition-[background-color,color,border-color,transform] duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 cursor-pointer select-none",
  {
    variants: {
      accent: buttonAccents,
      variant: {
        default: 'bg-foreground text-background hover:bg-primary hover:text-primary-foreground active:translate-y-px',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/85',
        outline:
          'border-foreground bg-transparent text-foreground hover:bg-foreground hover:text-background active:translate-y-px',
        ghost: 'bg-transparent text-foreground hover:bg-accent hover:text-[#080808]',
        link: 'min-h-fit min-w-fit p-0 text-primary underline-offset-4 hover:underline'
      },
      size: {
        default: 'h-11 px-5 py-2',
        xs: 'h-11 px-3 text-xs',
        sm: 'h-11 px-4 text-sm',
        lg: 'h-12 px-6 text-base',
        xl: 'h-14 px-8 text-lg',
        icon: 'size-11 p-2',
        'icon-sm': 'size-11 p-2',
        'icon-xs': 'size-11 p-2',
        'icon-lg': 'size-12 p-2.5',
        'icon-xl': 'size-14 p-3'
      },
      rounded: {
        default: 'rounded-full',
        sm: 'rounded-full',
        md: 'rounded-full',
        lg: 'rounded-full',
        none: 'rounded-none'
      }
    },
    defaultVariants: { variant: 'default', size: 'default', rounded: 'default', accent: 'default' }
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
      accent,
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
    const classes = unstyled ? className : cn(buttonVariants({ variant, size, rounded, accent, className }));

    if (asChild) {
      return (
        <Slot ref={ref} className={classes} {...props}>
          {children}
        </Slot>
      );
    }

    return (
      <button ref={ref} className={classes} disabled={isLoading || props.disabled} {...props}>
        {isLoading && <CgSpinner className="animate-spin" />}
        {!isLoading && leftIcon}
        {isLoading && loadingText ? loadingText : children}
        {!isLoading && rightIcon}
      </button>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };

// @unocss-include

import { cva } from 'class-variance-authority';

export type ButtonColor = 'primary' | 'destructive' | 'success' | 'warning' | 'info' | 'secondary';

export type ButtonVariant = 'solid' | 'pure' | 'outline' | 'text' | 'ghost' | 'link';

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'icon';

type Variants = {
  color: Record<ButtonColor, string>;
  variant: Record<ButtonVariant, string>;
  size: Record<ButtonSize, string>;
};

type SingleOrArray<T> = T | T[];

type CompoundVariants = {
  [key in keyof Variants]?: SingleOrArray<keyof Variants[key]>;
} & {
  class: string;
};

const colorKeys: ButtonColor[] = ['primary', 'destructive', 'success', 'warning', 'info', 'secondary'];

export const buttonVariants = cva<Variants>(
  'inline-flex items-center justify-center rd-md text-sm font-medium focus-visible:(outline outline-2 outline-offset-2) disabled:(pointer-events-none opacity-50)',
  {
    variants: {
      color: {
        primary: `focus-visible:outline-primary`,
        destructive: `focus-visible:outline-destructive`,
        success: `focus-visible:outline-success`,
        warning: `focus-visible:outline-warning`,
        info: `focus-visible:outline-info`,
        secondary: `focus-visible:outline-secondary-foreground`
      },
      variant: {
        solid: '',
        pure: 'border border-border bg-background text-foreground',
        outline: 'border bg-background',
        ghost: '',
        text: 'bg-transparent',
        link: 'bg-transparent underline-offset-4 hover:underline'
      },
      size: {
        xs: 'h-6 px-1.5 text-xs gap-1',
        sm: 'h-7 px-2 gap-2',
        md: 'h-8 px-4 gap-3',
        lg: 'h-10 px-6 gap-4',
        icon: 'h-8 w-8'
      }
    },
    compoundVariants: [
      ...createSolidVariant(),
      ...createTextColorVariant(),
      ...createBgVariant(),
      ...createPureVariant(),
      ...createOutlineVariant(),
      ...createGhostVariant()
    ],
    defaultVariants: {
      color: 'primary',
      variant: 'solid',
      size: 'md'
    }
  }
);

function createSolidVariant() {
  return colorKeys.map(color => {
    const v: CompoundVariants = {
      color,
      variant: 'solid',
      class: `bg-${color} text-${color}-foreground hover:bg-${color}/80 active:bg-${color}-600`
    };

    return v;
  });
}

function createTextColorVariant() {
  return colorKeys.map(color => {
    const v: CompoundVariants = {
      color,
      variant: ['outline', 'text', 'ghost', 'link'],
      class: color === 'secondary' ? 'text-secondary-foreground' : `text-${color}`
    };

    return v;
  });
}

function createBgVariant() {
  return colorKeys.map(color => {
    const v: CompoundVariants = {
      color,
      variant: ['pure', 'outline', 'text'],
      class:
        color === 'secondary'
          ? `hover:bg-secondary-foreground/10 active:bg-secondary-foreground/20`
          : `hover:bg-${color}/10 active:bg-${color}/20`
    };

    return v;
  });
}

function createPureVariant() {
  return colorKeys.map(color => {
    const v: CompoundVariants = {
      color,
      variant: 'pure',
      class:
        color === 'secondary'
          ? 'hover:border-secondary-foreground hover:text-secondary-foreground'
          : `hover:border-${color} hover:text-${color}`
    };

    return v;
  });
}

function createOutlineVariant() {
  return colorKeys.map(color => {
    const v: CompoundVariants = {
      color,
      variant: 'outline',
      class: color === 'secondary' ? 'border-secondary-foreground' : `border-${color}`
    };

    return v;
  });
}

function createGhostVariant() {
  return colorKeys.map(color => {
    const v: CompoundVariants = {
      color,
      variant: 'ghost',
      class:
        color === 'secondary'
          ? 'bg-secondary-foreground/10 hover:bg-secondary-foreground/10 active:bg-secondary-foreground/20'
          : `bg-${color}/10 hover:bg-${color}/10 active:bg-${color}/20`
    };

    return v;
  });
}

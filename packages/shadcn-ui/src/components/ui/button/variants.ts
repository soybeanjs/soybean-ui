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

// type SingleOrArray<T> = T | T[];

// type CompoundVariants = {
//   [key in keyof Variants]?: SingleOrArray<keyof Variants[key]>;
// } & {
//   class: string;
// };

// const colorKeys: ButtonColor[] = ['primary', 'destructive', 'success', 'warning', 'info', 'secondary'];

// const compoundVariants: CompoundVariants = [
//   ...createSolidVariant(),
//   ...createTextColorVariant(),
//   ...createBgVariant(),
//   ...createPureVariant(),
//   ...createOutlineVariant(),
//   ...createGhostVariant()
// ];

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
    // compoundVariants,
    compoundVariants: [
      {
        color: 'primary',
        variant: 'solid',
        class: `bg-primary text-primary-foreground hover:bg-primary/80 active:bg-primary-600`
      },
      {
        color: 'destructive',
        variant: 'solid',
        class: `bg-destructive text-destructive-foreground hover:bg-destructive/80 active:bg-destructive-600`
      },
      {
        color: 'success',
        variant: 'solid',
        class: `bg-success text-success-foreground hover:bg-success/80 active:bg-success-600`
      },
      {
        color: 'warning',
        variant: 'solid',
        class: `bg-warning text-warning-foreground hover:bg-warning/80 active:bg-warning-600`
      },
      {
        color: 'info',
        variant: 'solid',
        class: `bg-info text-info-foreground hover:bg-info/80 active:bg-info-600`
      },
      {
        color: 'secondary',
        variant: 'solid',
        class: `bg-secondary text-secondary-foreground hover:bg-secondary/80 active:bg-secondary-600`
      },
      {
        color: 'primary',
        variant: ['outline', 'text', 'ghost', 'link'],
        class: 'text-primary'
      },
      {
        color: 'destructive',
        variant: ['outline', 'text', 'ghost', 'link'],
        class: 'text-destructive'
      },
      {
        color: 'success',
        variant: ['outline', 'text', 'ghost', 'link'],
        class: 'text-success'
      },
      {
        color: 'warning',
        variant: ['outline', 'text', 'ghost', 'link'],
        class: 'text-warning'
      },
      {
        color: 'info',
        variant: ['outline', 'text', 'ghost', 'link'],
        class: 'text-info'
      },
      {
        color: 'secondary',
        variant: ['outline', 'text', 'ghost', 'link'],
        class: 'text-secondary-foreground'
      },
      {
        color: 'primary',
        variant: ['pure', 'outline', 'text'],
        class: 'hover:bg-primary/10 active:bg-primary/20'
      },
      {
        color: 'destructive',
        variant: ['pure', 'outline', 'text'],
        class: 'hover:bg-destructive/10 active:bg-destructive/20'
      },
      {
        color: 'success',
        variant: ['pure', 'outline', 'text'],
        class: 'hover:bg-success/10 active:bg-success/20'
      },
      {
        color: 'warning',
        variant: ['pure', 'outline', 'text'],
        class: 'hover:bg-warning/10 active:bg-warning/20'
      },
      {
        color: 'info',
        variant: ['pure', 'outline', 'text'],
        class: 'hover:bg-info/10 active:bg-info/20'
      },
      {
        color: 'secondary',
        variant: ['pure', 'outline', 'text'],
        class: 'hover:bg-secondary-foreground/10 active:bg-secondary-foreground/20'
      },
      {
        color: 'primary',
        variant: 'pure',
        class: 'hover:border-primary hover:text-primary'
      },
      {
        color: 'destructive',
        variant: 'pure',
        class: 'hover:border-destructive hover:text-destructive'
      },
      {
        color: 'success',
        variant: 'pure',
        class: 'hover:border-success hover:text-success'
      },
      {
        color: 'warning',
        variant: 'pure',
        class: 'hover:border-warning hover:text-warning'
      },
      {
        color: 'info',
        variant: 'pure',
        class: 'hover:border-info hover:text-info'
      },
      {
        color: 'secondary',
        variant: 'pure',
        class: 'hover:border-secondary-foreground hover:text-secondary-foreground'
      },
      {
        color: 'primary',
        variant: 'outline',
        class: 'border-primary'
      },
      {
        color: 'destructive',
        variant: 'outline',
        class: 'border-destructive'
      },
      {
        color: 'success',
        variant: 'outline',
        class: 'border-success'
      },
      {
        color: 'warning',
        variant: 'outline',
        class: 'border-warning'
      },
      {
        color: 'info',
        variant: 'outline',
        class: 'border-info'
      },
      {
        color: 'secondary',
        variant: 'outline',
        class: 'border-secondary-foreground'
      },
      {
        color: 'primary',
        variant: 'ghost',
        class: 'bg-primary/10 hover:bg-primary/10 active:bg-primary/20'
      },
      {
        color: 'destructive',
        variant: 'ghost',
        class: 'bg-destructive/10 hover:bg-destructive/10 active:bg-destructive/20'
      },
      {
        color: 'success',
        variant: 'ghost',
        class: 'bg-success/10 hover:bg-success/10 active:bg-success/20'
      },
      {
        color: 'warning',
        variant: 'ghost',
        class: 'bg-warning/10 hover:bg-warning/10 active:bg-warning/20'
      },
      {
        color: 'info',
        variant: 'ghost',
        class: 'bg-info/10 hover:bg-info/10 active:bg-info/20'
      },
      {
        color: 'secondary',
        variant: 'ghost',
        class: 'bg-secondary-foreground/10 hover:bg-secondary-foreground/10 active:bg-secondary-foreground/20'
      }
    ],
    defaultVariants: {
      color: 'primary',
      variant: 'solid',
      size: 'md'
    }
  }
);

// function createSolidVariant() {
//   return colorKeys.map(color => {
//     const v: CompoundVariants = {
//       color,
//       variant: 'solid',
//       class: `bg-${color} text-${color}-foreground hover:bg-${color}/80 active:bg-${color}-600`
//     };

//     return v;
//   });
// }

// function createTextColorVariant() {
//   return colorKeys.map(color => {
//     const v: CompoundVariants = {
//       color,
//       variant: ['outline', 'text', 'ghost', 'link'],
//       class: color === 'secondary' ? 'text-secondary-foreground' : `text-${color}`
//     };

//     return v;
//   });
// }

// function createBgVariant() {
//   return colorKeys.map(color => {
//     const v: CompoundVariants = {
//       color,
//       variant: ['pure', 'outline', 'text'],
//       class:
//         color === 'secondary'
//           ? `hover:bg-secondary-foreground/10 active:bg-secondary-foreground/20`
//           : `hover:bg-${color}/10 active:bg-${color}/20`
//     };

//     return v;
//   });
// }

// function createPureVariant() {
//   return colorKeys.map(color => {
//     const v: CompoundVariants = {
//       color,
//       variant: 'pure',
//       class:
//         color === 'secondary'
//           ? 'hover:border-secondary-foreground hover:text-secondary-foreground'
//           : `hover:border-${color} hover:text-${color}`
//     };

//     return v;
//   });
// }

// function createOutlineVariant() {
//   return colorKeys.map(color => {
//     const v: CompoundVariants = {
//       color,
//       variant: 'outline',
//       class: color === 'secondary' ? 'border-secondary-foreground' : `border-${color}`
//     };

//     return v;
//   });
// }

// function createGhostVariant() {
//   return colorKeys.map(color => {
//     const v: CompoundVariants = {
//       color,
//       variant: 'ghost',
//       class:
//         color === 'secondary'
//           ? 'bg-secondary-foreground/10 hover:bg-secondary-foreground/10 active:bg-secondary-foreground/20'
//           : `bg-${color}/10 hover:bg-${color}/10 active:bg-${color}/20`
//     };

//     return v;
//   });
// }

// @unocss-include
import { scv } from '@soybeanjs/cva';
import { fieldChrome, fieldDisabled, fieldSize } from './field';

export const dateFieldVariants = scv({
  slots: {
    root: [
      'group inline-flex items-center w-fit lt-md:max-w-auto',
      ...fieldChrome,
      ...fieldDisabled,
      'data-[readonly]:bg-muted/40',
      'data-[invalid]:border-destructive data-[invalid]:ring-3 data-[invalid]:ring-destructive/20'
    ],
    input: [
      'inline-flex items-center justify-center rounded-sm text-center outline-none',
      'tabular-nums leading-none',
      'data-[segment=literal]:min-w-0 data-[segment=literal]:px-0 data-[segment=literal]:text-muted-foreground',
      'data-[segment=timeZoneName]:min-w-fit data-[segment=timeZoneName]:px-1 data-[segment=timeZoneName]:text-muted-foreground',
      'data-[placeholder]:text-muted-foreground',
      'focus-visible:bg-accent/60 focus-visible:ring-2 focus-visible:ring-primary/20',
      'data-[disabled]:cursor-not-allowed data-[readonly]:cursor-default'
    ]
  },
  variants: {
    size: {
      xs: {
        root: fieldSize.xs,
        input: 'min-w-4.5 p-0.5 data-[segment=timeZoneName]:px-0.5'
      },
      sm: {
        root: fieldSize.sm,
        input: 'min-w-5 p-0.5 data-[segment=timeZoneName]:px-0.75'
      },
      md: {
        root: fieldSize.md,
        input: 'min-w-5.5 p-0.625 data-[segment=timeZoneName]:px-1'
      },
      lg: {
        root: fieldSize.lg,
        input: 'min-w-6 p-0.75 data-[segment=timeZoneName]:px-1.25'
      },
      xl: {
        root: fieldSize.xl,
        input: 'min-w-6.5 p-0.875 data-[segment=timeZoneName]:px-1.5'
      },
      '2xl': {
        root: fieldSize['2xl'],
        input: 'min-w-8 p-1 data-[segment=timeZoneName]:px-2'
      }
    }
  },
  defaultVariants: {
    size: 'md'
  }
});

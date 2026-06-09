// @unocss-include
import { scv } from '@soybeanjs/cva';

export const dateFieldVariants = scv({
  slots: {
    root: [
      'group inline-flex items-center w-fit lt-md:max-w-auto rounded-md border border-input bg-background transition-all-150',
      'outline-none focus-within:ring-3 focus-within:ring-offset-background focus-within:ring-primary/30',
      'data-[disabled]:opacity-50 data-[readonly]:bg-muted/40',
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
        root: 'gap-0.5 h-6 px-1.5 text-2xs',
        input: 'min-w-4.5 p-0.5 data-[segment=timeZoneName]:px-0.5'
      },
      sm: {
        root: 'gap-0.75 h-7 px-2 text-xs',
        input: 'min-w-5 p-0.5 data-[segment=timeZoneName]:px-0.75'
      },
      md: {
        root: 'gap-1 h-8 px-2.5 text-sm',
        input: 'min-w-5.5 p-0.625 data-[segment=timeZoneName]:px-1'
      },
      lg: {
        root: 'gap-1.25 h-9 px-3 text-base',
        input: 'min-w-6 p-0.75 data-[segment=timeZoneName]:px-1.25'
      },
      xl: {
        root: 'gap-1.5 h-10 px-3.5 text-lg',
        input: 'min-w-6.5 p-0.875 data-[segment=timeZoneName]:px-1.5'
      },
      '2xl': {
        root: 'gap-2 h-12 px-4 text-xl',
        input: 'min-w-8 p-1 data-[segment=timeZoneName]:px-2'
      }
    }
  },
  defaultVariants: {
    size: 'md'
  }
});

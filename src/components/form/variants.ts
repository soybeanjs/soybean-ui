// @unocss-include
import { tv } from 'tailwind-variants';

export const formVariants = tv({
  slots: {
    form: 'grid',
    field: 'flex',
    fieldArray: 'flex',
    label: 'flex items-center',
    control: '',
    description: `text-muted-foreground m-0`,
    error: `font-medium text-destructive m-0`
  },
  variants: {
    size: {
      xs: {
        field: 'text-2xs gap-x-2.25 gap-y-1.5',
        fieldArray: 'text-2xs gap-x-2.25 gap-y-1.5',
        label: 'gap-1.5'
      },
      sm: {
        field: 'text-xs gap-x-2.5 gap-y-1.75',
        fieldArray: 'text-xs gap-x-2.5 gap-y-1.75',
        label: 'gap-1.75'
      },
      md: {
        field: 'text-sm gap-x-3 gap-y-2',
        fieldArray: 'text-sm gap-x-3 gap-y-2',
        label: 'gap-2'
      },
      lg: {
        field: 'text-base gap-x-3.75 gap-y-2.5',
        fieldArray: 'text-base gap-x-3.75 gap-y-2.5',
        label: 'gap-2.5'
      },
      xl: {
        field: 'text-lg gap-x-4.5 gap-y-3',
        fieldArray: 'text-lg gap-x-4.5 gap-y-3',
        label: 'gap-3'
      },
      '2xl': {
        field: 'text-xl gap-x-5.25 gap-y-3.5',
        fieldArray: 'text-xl gap-x-5.25 gap-y-3.5',
        label: 'gap-3.5'
      }
    },
    inline: {
      true: {
        field: 'flex-wrap justify-between items-center',
        fieldArray: 'flex-wrap justify-between items-center',
        label: 'justify-end',
        control: 'flex-1',
        description: 'w-full',
        error: 'absolute left-0 top-full w-full'
      },
      false: {
        field: 'flex-col',
        fieldArray: 'flex-col'
      }
    }
  },
  defaultVariants: {
    size: 'md',
    inline: false
  }
});

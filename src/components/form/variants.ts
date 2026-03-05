// @unocss-include
import { tv } from 'tailwind-variants';

export const formVariants = tv({
  slots: {
    form: '',
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
        form: 'space-y-3 data-[inline]:space-y-4.5',
        field: 'text-2xs gap-x-2.25 gap-y-1.5',
        fieldArray: 'text-2xs gap-x-2.25 gap-y-1.5',
        label: 'gap-1.5'
      },
      sm: {
        form: 'space-y-3.5 data-[inline]:space-y-5.5',
        field: 'text-xs gap-x-2.5 gap-y-1.75',
        fieldArray: 'text-xs gap-x-2.5 gap-y-1.75',
        label: 'gap-1.75'
      },
      md: {
        form: 'space-y-4 data-[inline]:space-y-6',
        field: 'text-sm gap-x-3 gap-y-2',
        fieldArray: 'text-sm gap-x-3 gap-y-2',
        label: 'gap-2'
      },
      lg: {
        form: 'space-y-4.5 data-[inline]:space-y-6.75',
        field: 'text-base gap-x-3.75 gap-y-2.5',
        fieldArray: 'text-base gap-x-3.75 gap-y-2.5',
        label: 'gap-2.5'
      },
      xl: {
        form: 'space-y-5 data-[inline]:space-y-7.5',
        field: 'text-lg gap-x-4.5 gap-y-3',
        fieldArray: 'text-lg gap-x-4.5 gap-y-3',
        label: 'gap-3'
      },
      '2xl': {
        form: 'space-y-6 data-[inline]:space-y-8',
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

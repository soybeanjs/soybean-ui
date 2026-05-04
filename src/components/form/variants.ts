// @unocss-include
import { tv } from 'tailwind-variants';

export const formVariants = tv({
  slots: {
    form: 'grid',
    field: [
      'group flex flex-col',
      'data-[inline]:flex-row data-[inline]:flex-wrap data-[inline]:justify-between data-[inline]:items-center'
    ],
    fieldArray: ['group flex flex-col', 'data-[inline]:flex-row data-[inline]:flex-wrap data-[inline]:justify-between'],
    label: 'flex items-center whitespace-nowrap group-data-[inline]:justify-end group-data-[inline]:shrink-0',
    control: 'group-data-[inline]:flex-1 group-data-[inline]:min-w-0',
    description: `text-muted-foreground m-0 group-data-[inline]:w-full`,
    error: `font-medium text-destructive m-0 group-data-[inline]:absolute group-data-[inline]:start-0 group-data-[inline]:top-full group-data-[inline]:w-full`
  },
  variants: {
    size: {
      xs: {
        field: 'text-2xs gap-x-2.25 gap-y-1.5',
        fieldArray: 'text-2xs gap-x-2.25 gap-y-1.5',
        label: 'gap-1.5',
        description: 'group-data-[error]:pt-1.75'
      },
      sm: {
        field: 'text-xs gap-x-2.5 gap-y-1.75',
        fieldArray: 'text-xs gap-x-2.5 gap-y-1.75',
        label: 'gap-1.75',
        description: 'group-data-[error]:pt-2'
      },
      md: {
        field: 'text-sm gap-x-3 gap-y-2',
        fieldArray: 'text-sm gap-x-3 gap-y-2',
        label: 'gap-2',
        description: 'group-data-[error]:pt-2.5'
      },
      lg: {
        field: 'text-base gap-x-3.75 gap-y-2.5',
        fieldArray: 'text-base gap-x-3.75 gap-y-2.5',
        label: 'gap-2.5',
        description: 'group-data-[error]:pt-3'
      },
      xl: {
        field: 'text-lg gap-x-4.5 gap-y-3',
        fieldArray: 'text-lg gap-x-4.5 gap-y-3',
        label: 'gap-3',
        description: 'group-data-[error]:pt-3.5'
      },
      '2xl': {
        field: 'text-xl gap-x-5.25 gap-y-3.5',
        fieldArray: 'text-xl gap-x-5.25 gap-y-3.5',
        label: 'gap-3.5',
        description: 'group-data-[error]:pt-4.5'
      }
    }
  },
  defaultVariants: {
    size: 'md'
  }
});

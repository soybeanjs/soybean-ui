// @unocss-include
import { tv } from 'tailwind-variants';

export const calendarRangeVariants = tv({
  slots: {
    root: 'inline-flex flex-col gap-4 p-3 text-sm',
    header: 'flex items-center justify-between',
    heading: 'flex items-center justify-center font-medium',
    prev: 'rtl:rotate-180',
    next: 'rtl:rotate-180',
    grid: 'inline-table border-collapse',
    gridHead: '',
    gridBody: '',
    gridRow: '',
    headCell: 'rounded-md text-center font-normal text-muted-foreground',
    cell: [
      'flex-1 text-center align-middle focus-within:relative focus-within:z-20',
      '[&:has([data-selected])]:bg-accent first:[&:has([data-selected])]:rounded-s-md last:[&:has([data-selected])]:rounded-e-md',
      '[&:has([data-selection-end])]:rounded-e-md [&:has([data-selection-start])]:rounded-s-md'
    ],
    cellTrigger: [
      'inline-flex cursor-pointer items-center justify-center w-full h-full rounded-md font-normal transition-colors',
      'focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-offset-background focus-visible:ring-ring focus-visible:ring-primary/30',
      '[&[data-today]:not([data-selected])]:bg-accent [&[data-today]:not([data-selected])]:text-accent-foreground',
      'data-[selected]:text-foreground',
      'data-[selection-start]:bg-primary data-[selection-start]:text-primary-foreground',
      'data-[selection-end]:bg-primary data-[selection-end]:text-primary-foreground',
      '[&[data-selection-start]:hover]:bg-primary data-[selection-start]:hover:text-primary-foreground data-[selection-start]:focus-visible:bg-primary data-[selection-start]:focus-visible:text-primary-foreground',
      '[&[data-selection-end]:hover]:bg-primary data-[selection-end]:hover:text-primary-foreground data-[selection-end]:focus-visible:bg-primary data-[selection-end]:focus-visible:text-primary-foreground',
      'data-[highlighted]:bg-accent/80 data-[highlighted]:text-foreground',
      'hover:bg-accent hover:text-accent-foreground data-[outside-view]:text-muted-foreground',
      'data-[disabled]:pointer-events-none data-[disabled]:text-muted-foreground data-[disabled]:opacity-50',
      'data-[unavailable]:line-through'
    ]
  },
  variants: {
    size: {
      xs: {
        root: 'gap-3 text-2xs p-2',
        header: 'gap-1.5',
        gridRow: 'mt-1.5',
        heading: 'gap-1.5',
        headCell: 'h-6 w-6 text-3xs',
        cell: 'h-6 w-6'
      },
      sm: {
        root: 'gap-3.5 text-xs p-2.5',
        header: 'gap-2',
        gridRow: 'mt-1.75',
        heading: 'gap-2',
        headCell: 'h-7 w-7 text-2xs',
        cell: 'h-7 w-7'
      },
      md: {
        root: 'gap-4 text-sm p-3',
        header: 'gap-2.5',
        gridRow: 'mt-2',
        heading: 'gap-2.5',
        headCell: 'h-8 w-8 text-xs',
        cell: 'h-8 w-8'
      },
      lg: {
        root: 'gap-4.5 text-base p-3.5',
        header: 'gap-3',
        gridRow: 'mt-2.25',
        heading: 'gap-3',
        headCell: 'h-9 w-9 text-sm',
        cell: 'h-9 w-9'
      },
      xl: {
        root: 'gap-5 text-lg p-4',
        header: 'gap-3.5',
        gridRow: 'mt-2.5',
        heading: 'gap-3.5',
        headCell: 'h-10 w-10 text-base',
        cell: 'h-10 w-10'
      },
      '2xl': {
        root: 'gap-6 text-xl p-5',
        header: 'gap-4',
        gridRow: 'mt-3',
        heading: 'gap-4',
        headCell: 'h-12 w-12 text-lg',
        cell: 'h-12 w-12'
      }
    }
  },
  defaultVariants: {
    size: 'md'
  }
});

// @unocss-include
import { tv } from 'tailwind-variants';

export const rangeCalendarVariants = tv({
  slots: {
    root: 'inline-flex flex-col gap-4 p-3 text-sm',
    header: 'grid grid-cols-[auto_1fr_auto] items-center gap-1',
    heading: 'text-center font-medium',
    prev: [
      'inline-flex h-8 w-8 items-center justify-center rounded-md border border-transparent bg-transparent text-foreground transition-colors',
      'hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30',
      'data-[disabled]:pointer-events-none data-[disabled]:opacity-50'
    ],
    next: [
      'inline-flex h-8 w-8 items-center justify-center rounded-md border border-transparent bg-transparent text-foreground transition-colors',
      'hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30',
      'data-[disabled]:pointer-events-none data-[disabled]:opacity-50'
    ],
    grid: 'inline-table border-collapse me-4 last:me-0',
    gridHead: '',
    gridBody: '',
    gridRow: '',
    headCell: 'h-9 w-9 rounded-md p-0 text-center text-xs font-normal text-muted-foreground',
    cell: [
      'h-9 w-9 p-0 text-center align-middle text-sm focus-within:relative focus-within:z-20',
      '[&:has([data-selected])]:bg-accent first:[&:has([data-selected])]:rounded-s-md last:[&:has([data-selected])]:rounded-e-md',
      '[&:has([data-selection-end])]:rounded-e-md [&:has([data-selection-start])]:rounded-s-md'
    ],
    cellTrigger: [
      'inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-md p-0 text-sm font-normal transition-colors',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30',
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
        root: 'gap-3 text-2xs',
        heading: 'text-xs',
        prev: 'h-6 w-6',
        next: 'h-6 w-6',
        headCell: 'h-7 w-7 text-3xs',
        cell: 'h-7 w-7',
        cellTrigger: 'h-7 w-7 text-2xs'
      },
      sm: {
        root: 'gap-3.5 text-xs',
        heading: 'text-sm',
        prev: 'h-7 w-7',
        next: 'h-7 w-7',
        headCell: 'h-8 w-8 text-2xs',
        cell: 'h-8 w-8',
        cellTrigger: 'h-8 w-8 text-xs'
      },
      md: {
        root: 'gap-4 text-sm',
        heading: 'text-sm',
        prev: 'h-8 w-8',
        next: 'h-8 w-8',
        headCell: 'h-9 w-9 text-xs',
        cell: 'h-9 w-9',
        cellTrigger: 'h-9 w-9 text-sm'
      },
      lg: {
        root: 'gap-4.5 text-base',
        heading: 'text-base',
        prev: 'h-9 w-9',
        next: 'h-9 w-9',
        headCell: 'h-10 w-10 text-sm',
        cell: 'h-10 w-10',
        cellTrigger: 'h-10 w-10 text-base'
      },
      xl: {
        root: 'gap-5 text-lg',
        heading: 'text-lg',
        prev: 'h-10 w-10',
        next: 'h-10 w-10',
        headCell: 'h-11 w-11 text-base',
        cell: 'h-11 w-11',
        cellTrigger: 'h-11 w-11 text-lg'
      },
      '2xl': {
        root: 'gap-6 text-xl',
        heading: 'text-xl',
        prev: 'h-12 w-12',
        next: 'h-12 w-12',
        headCell: 'h-12 w-12 text-lg',
        cell: 'h-12 w-12',
        cellTrigger: 'h-12 w-12 text-xl'
      }
    }
  },
  defaultVariants: {
    size: 'md'
  }
});

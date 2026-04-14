// @unocss-include
import { tv } from 'tailwind-variants';
import type { VariantProps } from 'tailwind-variants';

export const tableVariants = tv({
  slots: {
    root: 'relative overflow-auto rounded-md',
    content: 'min-w-full w-max border-spacing-0',
    header: 'sticky top-0 left-0 z-10 bg-accent',
    body: '',
    footer: 'bg-accent font-medium',
    row: 'bg-background data-[row]:hover:bg-accent transition-colors',
    head: 'box-border text-foreground relative font-medium whitespace-nowrap bg-accent',
    cell: 'box-border whitespace-nowrap data-[fixed]:bg-background',
    fixed: [
      'relative',
      'data-[fixed-side=left]:after:pointer-events-none data-[fixed-side=left]:after:absolute data-[fixed-side=left]:after:bottom-0 data-[fixed-side=left]:after:end-0 data-[fixed-side=left]:after:top-0 data-[fixed-side=left]:after:w-4 data-[fixed-side=left]:after:translate-x-full data-[fixed-side=left]:after:bg-gradient-to-r data-[fixed-side=left]:after:from-foreground/8 data-[fixed-side=left]:after:to-transparent data-[fixed-side=left]:after:content-[""]',
      'data-[fixed-side=right]:before:pointer-events-none data-[fixed-side=right]:before:absolute data-[fixed-side=right]:before:bottom-0 data-[fixed-side=right]:before:start-0 data-[fixed-side=right]:before:top-0 data-[fixed-side=right]:before:w-4 data-[fixed-side=right]:before:-translate-x-full data-[fixed-side=right]:before:bg-gradient-to-l data-[fixed-side=right]:before:from-foreground/8 data-[fixed-side=right]:before:to-transparent data-[fixed-side=right]:before:content-[""]'
    ],
    resizeHandle: [
      'absolute end-0 top-1/2 h-[calc(100%-0.75rem)] w-3 -translate-y-1/2 rounded bg-transparent',
      'cursor-col-resize border-none p-0 touch-none select-none',
      'after:bg-border hover:after:bg-primary data-[resizing]:after:bg-primary focus-visible:after:bg-primary',
      'focus-visible:outline-none focus-visible:ring-ring/40 focus-visible:ring-2',
      'after:absolute after:bottom-0 after:end-0 after:top-0 after:w-px after:rounded-full after:content-[""]'
    ],
    treeCell: 'flex min-w-0 items-center gap-1',
    treeToggle: '',
    treeTogglePlaceholder: 'inline-block size-5 shrink-0',
    sortTrigger: 'absolute top-1/2 -translate-y-1/2 data-[sorted]:text-primary',
    filterTrigger: 'absolute top-1/2 -translate-y-1/2 data-[filtered]:text-primary',
    filterInput: '',
    filterPopup: '',
    filterSearch: '',
    filterOptions: 'flex flex-col overflow-auto',
    filterOption: 'w-full rounded-md hover:bg-accent',
    filterOptionLabel: 'min-w-0 flex-1 truncate',
    filterFooter: 'flex items-center justify-between border-t border-border',
    filterCount: 'text-muted-foreground',
    filterAction: [
      'text-xs font-medium text-primary rounded-md border-none bg-transparent px-2 py-1',
      'transition-colors hover:bg-accent focus-visible:ring-ring focus-visible:outline-none focus-visible:ring-2'
    ],
    filterEmpty: 'text-muted-foreground py-6 text-center text-xs',
    selection: 'text-foreground',
    radioRoot: [
      'peer relative shrink-0 rounded-full border border-solid shadow cursor-pointer transition-all-150',
      'border-primary focus-visible:ring-primary/30',
      'focus-visible:outline-none focus-visible:ring-3  focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50'
    ],
    radioIndicator: 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-1/2 bg-primary rounded-full'
  },
  variants: {
    size: {
      xs: {
        root: 'text-2xs',
        caption: 'py-2',
        head: 'h-8 px-1.5',
        cell: 'p-1.5',
        radioRoot: 'w-3 h-3',
        sortTrigger: 'end-1 p-0.75',
        filterTrigger: 'end-1',
        filterPopup: 'p-1.5',
        filterOptions: 'max-h-50 gap-0.75 py-1.5',
        filterOption: 'p-0.75',
        filterFooter: 'pt-1',
        filterCount: 'text-3xs leading-4'
      },
      sm: {
        root: 'text-xs',
        caption: 'py-2.5',
        head: 'h-9 px-1.75',
        cell: 'p-1.75',
        radioRoot: 'w-3.5 h-3.5',
        sortTrigger: 'end-1.25 p-0.875',
        filterTrigger: 'end-1.25',
        filterPopup: 'p-1.75',
        filterOptions: 'max-h-55 gap-0.875 py-2',
        filterOption: 'p-0.875',
        filterFooter: 'pt-1.25',
        filterCount: 'text-2xs leading-5'
      },
      md: {
        root: 'text-sm',
        caption: 'py-3',
        head: 'h-10 px-2',
        cell: 'p-2',
        radioRoot: 'w-4 h-4',
        sortTrigger: 'end-1.5 p-1',
        filterTrigger: 'end-1.5',
        filterPopup: 'p-2',
        filterOptions: 'max-h-60 gap-1 py-2.5',
        filterOption: 'p-1',
        filterFooter: 'pt-1.5',
        filterCount: 'text-xs leading-6'
      },
      lg: {
        root: 'text-base',
        caption: 'py-3.5',
        head: 'h-12 px-2.5',
        cell: 'p-2.5',
        radioRoot: 'w-4.5 h-4.5',
        sortTrigger: 'end-1.75 p-1.25',
        filterTrigger: 'end-1.75',
        filterPopup: 'p-2.5',
        filterOptions: 'max-h-65 gap-1.25 py-3',
        filterOption: 'p-1.25',
        filterFooter: 'pt-1.75',
        filterCount: 'text-sm leading-7'
      },
      xl: {
        root: 'text-lg',
        caption: 'py-4',
        head: 'h-14 px-3',
        cell: 'p-3',
        radioRoot: 'w-5 h-5',
        sortTrigger: 'end-2 p-1.5',
        filterTrigger: 'end-2',
        filterPopup: 'p-3',
        filterOptions: 'max-h-70 gap-1.5 py-3.5',
        filterOption: 'p-1.5',
        filterFooter: 'pt-2',
        filterCount: 'text-base leading-8'
      },
      '2xl': {
        root: 'text-xl',
        caption: 'py-4.5',
        head: 'h-16 px-3.5',
        cell: 'p-3.5',
        radioRoot: 'w-6 h-6',
        sortTrigger: 'end-2.5 p-1.75',
        filterTrigger: 'end-2.5',
        filterPopup: 'p-3.5',
        filterOptions: 'max-h-75 gap-1.75 py-4',
        filterOption: 'p-1.75',
        filterFooter: 'pt-2.5',
        filterCount: 'text-lg leading-9'
      }
    },
    bordered: {
      all: {
        root: 'border border-border',
        header: '[&>tr:first-child>th]:border-t-0',
        body: '[&>tr:last-child>td]:border-b-0',
        footer: '[&>tr:last-child>td]:border-b-0',
        head: 'border border-border first:border-l-0 last:border-r-0',
        cell: 'border border-border first:border-l-0 last:border-r-0'
      },
      true: {
        root: 'border border-border',
        row: 'border-b last:border-b-0'
      },
      false: {
        footer: '[&>tr]:last:border-b-0 border-t',
        row: 'border-b'
      }
    },
    striped: {
      true: {
        row: 'data-[row]:even:bg-accent'
      }
    }
  },
  defaultVariants: {
    size: 'md',
    bordered: false,
    striped: false
  }
});

export type TableVariantProps = VariantProps<typeof tableVariants>;

// @unocss-include
import { tv } from 'tailwind-variants';

export const stepperVariants = tv({
  slots: {
    root: 'flex',
    indicator: [
      'inline-flex items-center justify-center rounded-full text-muted-foreground/50',
      'group-data-[disabled]:text-muted-foreground group-data-[disabled]:opacity-50',
      'group-data-[state=active]:bg-primary group-data-[state=active]:text-primary-foreground',
      'group-data-[state=completed]:bg-accent group-data-[state=completed]:text-accent-foreground'
    ],
    item: 'group relative flex w-full data-[disabled]:pointer-events-none',
    separator: [
      `absolute block shrink-0 rounded-full bg-muted`,
      'group-data-[disabled]:bg-muted group-data-[disabled]:opacity-50',
      'group-data-[state=completed]:bg-primary'
    ],
    titleDescWrapper: 'flex flex-col',
    title: 'font-semibold whitespace-nowrap',
    description: 'text-muted-foreground',
    trigger: `shrink-0 flex flex-col items-center text-center z-10 data-[state=active]:ring-2 data-[state=active]:ring-primary data-[state=active]:ring-offset-2 data-[state=active]:ring-offset-background`
  },
  variants: {
    size: {
      xs: {
        root: 'text-2xs',
        title: 'text-xs',
        indicator: 'size-6',
        trigger: 'gap-0.5 p-0.5'
      },
      sm: {
        root: 'text-xs',
        title: 'text-sm',
        indicator: 'size-7',
        trigger: 'gap-0.75 p-0.75'
      },
      md: {
        root: 'text-sm',
        title: 'text-base',
        indicator: 'size-8',
        trigger: 'gap-1 p-1'
      },
      lg: {
        root: 'text-base',
        title: 'text-lg',
        indicator: 'size-9',
        trigger: 'gap-1.5 p-1.5'
      },
      xl: {
        root: 'text-lg',
        title: 'text-xl',
        indicator: 'size-10',
        trigger: 'gap-2 p-2'
      },
      '2xl': {
        root: 'text-xl',
        title: 'text-2xl',
        indicator: 'size-12',
        trigger: 'gap-2.5 p-2.5'
      }
    },
    orientation: {
      horizontal: {
        root: 'items-start',
        item: 'flex-col items-center justify-center',
        titleDescWrapper: 'items-center text-center',
        separator: 'h-0.125rem'
      },
      vertical: {
        root: 'flex-col justify-start max-w-md w-full mx-auto',
        item: 'items-start',
        separator: 'w-0.125rem h-[calc(100%-8px)]'
      }
    }
  },
  compoundVariants: [
    {
      orientation: 'horizontal',
      size: 'xs',
      class: {
        root: 'gap-1.5',
        item: 'gap-1.5',
        // right: -(50% - 0.75rem + 0.375rem - 4px); top: 0.75rem - 0.0625rem
        separator: 'left-[calc(50%+0.75rem+4px)] right-[calc(-50%+0.375rem+4px)] top-0.6875rem'
      }
    },
    {
      orientation: 'horizontal',
      size: 'sm',
      class: {
        root: 'gap-1.75',
        item: 'gap-1.75',
        // right: -(50% - 0.875rem + 0.4375rem - 4px); top: 0.875rem - 0.0625rem
        separator: 'left-[calc(50%+0.875rem+4px)] right-[calc(-50%+0.4375rem+4px)] top-0.8125rem'
      }
    },
    {
      orientation: 'horizontal',
      size: 'md',
      class: {
        root: 'gap-2',
        item: 'gap-2',
        // right: -(50% - 1rem + 0.5rem - 4px); top: 1rem - 0.0625rem
        separator: 'left-[calc(50%+1rem+4px)] right-[calc(-50%+0.5rem+4px)] top-0.9375rem'
      }
    },
    {
      orientation: 'horizontal',
      size: 'lg',
      class: {
        root: 'gap-2.5',
        item: 'gap-2.5',
        // right: -(50% - 1.125rem + 0.625rem - 4px); top: 1.125rem - 0.0625rem
        separator: 'left-[calc(50%+1.125rem+4px)] right-[calc(-50%+0.5rem+4px)] top-1.0625rem'
      }
    },
    {
      orientation: 'horizontal',
      size: 'xl',
      class: {
        root: 'gap-3',
        item: 'gap-3',
        // right: -(50% - 1.25rem + 0.75rem - 4px); top: 1.25rem - 0.0625rem
        separator: 'left-[calc(50%+1.25rem+4px)] right-[calc(-50%+0.5rem+4px)] top-1.1875rem'
      }
    },
    {
      orientation: 'horizontal',
      size: '2xl',
      class: {
        root: 'gap-3.5',
        item: 'gap-3.5',
        // right: -(50% - 1.5rem + 0.875rem - 4px); top: 1.5rem - 0.0625rem
        separator: 'left-[calc(50%+1.5rem+4px)] right-[calc(-50%+0.625rem+4px)] top-1.4375rem'
      }
    },
    {
      orientation: 'vertical',
      size: 'xs',
      class: {
        root: 'gap-6',
        item: 'gap-4',
        // left: 0.75rem - 0.0625rem
        separator: 'left-0.6875rem top-[calc(1.5rem+4px)] w-0.25',
        titleDescWrapper: 'gap-0.75'
      }
    },
    {
      orientation: 'vertical',
      size: 'sm',
      class: {
        root: 'gap-7',
        item: 'gap-5',
        // left: 0.875rem - 0.0625rem
        separator: 'left-0.8125rem top-[calc(1.75rem+4px)] w-0.375',
        titleDescWrapper: 'gap-0.875'
      }
    },
    {
      orientation: 'vertical',
      size: 'md',
      class: {
        root: 'gap-8',
        item: 'gap-6',
        // left: 1rem - 0.0625rem
        separator: 'left-0.9375rem top-[calc(2rem+4px)] w-0.5',
        titleDescWrapper: 'gap-1'
      }
    },
    {
      orientation: 'vertical',
      size: 'lg',
      class: {
        root: 'gap-9',
        item: 'gap-7',
        // left: 1.125rem - 0.0625rem
        separator: 'left-1.0625rem top-[calc(2.25rem+4px)] w-0.5',
        titleDescWrapper: 'gap-1.25'
      }
    },
    {
      orientation: 'vertical',
      size: 'xl',
      class: {
        root: 'gap-10',
        item: 'gap-8',
        // left: 1.25rem - 0.0625rem
        separator: 'left-1.1875rem top-[calc(2.5rem+4px)] w-0.5',
        titleDescWrapper: 'gap-1.5'
      }
    },
    {
      orientation: 'vertical',
      size: '2xl',
      class: {
        root: 'gap-12',
        item: 'gap-10',
        // left: 1.5rem - 0.0625rem; height: 100% + 4rem - 3rem - 8px
        separator: 'left-1.4375rem top-[calc(3rem+4px)] w-0.5',
        titleDescWrapper: 'gap-1.75'
      }
    }
  ],
  defaultVariants: {
    size: 'md',
    orientation: 'horizontal'
  }
});

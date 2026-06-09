// @unocss-include
import { scv } from '@soybeanjs/cva';

export const cardVariants = scv({
  slots: {
    root: 'flex flex-col items-stretch rounded-md border bg-card text-card-foreground shadow-sm',
    header: 'flex items-center justify-between flex-wrap',
    content: [
      'grow transition will-change-auto outline-none data-[state=closed]:p-0',
      `data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up`
    ],
    footer: 'flex items-center justify-between',
    titleRoot: 'flex items-center',
    title: 'font-semibold tracking-tight m-0',
    description: 'w-full text-muted-foreground m-0'
  },
  variants: {
    size: {
      xs: {
        root: 'text-2xs',
        header: 'px-2 py-1.5',
        content: 'px-2 py-1.5',
        footer: 'px-2 py-1.5',
        titleRoot: 'gap-1.5',
        title: 'text-xs',
        description: 'text-2xs'
      },
      sm: {
        root: 'text-xs',
        header: 'px-3 py-2',
        content: 'px-3 py-2',
        footer: 'px-3 py-2',
        titleRoot: 'gap-1.75',
        title: 'text-sm',
        description: 'text-xs'
      },
      md: {
        root: 'text-sm',
        header: 'px-4 py-3',
        content: 'px-4 py-3',
        footer: 'px-4 py-3',
        titleRoot: 'gap-2',
        title: 'text-base',
        description: 'text-sm'
      },
      lg: {
        root: 'text-base',
        header: 'px-5 py-4',
        content: 'px-5 py-4',
        footer: 'px-5 py-5',
        titleRoot: 'gap-2.5',
        title: 'text-lg',
        description: 'text-base'
      },
      xl: {
        root: 'text-base',
        header: 'px-6 py-5',
        content: 'px-6 py-5',
        footer: 'px-6 py-6',
        titleRoot: 'gap-3',
        title: 'text-lg',
        description: 'text-lg'
      },
      '2xl': {
        root: 'text-lg',
        header: 'px-7 py-6',
        content: 'px-7 py-6',
        footer: 'px-7 py-6',
        titleRoot: 'gap-3.5',
        title: 'text-xl',
        description: 'text-xl'
      }
    },
    scrollable: {
      true: {
        content: 'overflow-auto'
      }
    },
    split: {
      true: {
        root: 'divide-y divide-border'
      }
    }
  },
  compoundVariants: [
    {
      size: 'xs',
      split: false,
      class: {
        content: `data-[header-visible=true]:data-[state=open]:pt-0.75 data-[footer-visible=true]:data-[state=open]:pb-0.75`
      }
    },
    {
      size: 'sm',
      split: false,
      class: {
        content: `data-[header-visible=true]:data-[state=open]:pt-1 data-[footer-visible=true]:data-[state=open]:pb-1`
      }
    },
    {
      size: 'md',
      split: false,
      class: {
        content: `data-[header-visible=true]:data-[state=open]:pt-1.5 data-[footer-visible=true]:data-[state=open]:pb-1.5`
      }
    },
    {
      size: 'lg',
      split: false,
      class: {
        content: `data-[header-visible=true]:data-[state=open]:pt-2 data-[footer-visible=true]:data-[state=open]:pb-2`
      }
    },
    {
      size: 'xl',
      split: false,
      class: {
        content: `data-[header-visible=true]:data-[state=open]:pt-2.5 data-[footer-visible=true]:data-[state=open]:pb-2.5`
      }
    },
    {
      size: '2xl',
      split: false,
      class: {
        content: `data-[header-visible=true]:data-[state=open]:pt-3 data-[footer-visible=true]:data-[state=open]:pb-3`
      }
    }
  ],
  defaultVariants: {
    size: 'md',
    scrollable: true,
    split: false
  }
});

// @unocss-include
import { scv } from '@soybeanjs/cva';

export const descriptionsVariants = scv({
  slots: {
    root: 'grid',
    item: 'min-w-0',
    label: 'text-muted-foreground',
    content: 'min-w-0'
  },
  variants: {
    layout: {
      horizontal: {},
      vertical: {
        label: 'text-xs'
      }
    },
    labelAlign: {
      start: {
        label: 'text-start'
      },
      center: {
        label: 'text-center'
      },
      end: {
        label: 'text-end'
      }
    },
    bordered: {
      true: {
        root: 'gap-px bg-border',
        item: 'bg-card p-3',
        label: 'text-muted-foreground'
      }
    }
  },
  compoundVariants: [
    {
      bordered: false,
      layout: 'horizontal',
      class: {
        item: 'flex items-baseline gap-2'
      }
    },
    {
      bordered: false,
      layout: 'vertical',
      class: {
        item: 'flex flex-col gap-0.5'
      }
    },
    {
      bordered: true,
      layout: 'horizontal',
      class: {
        item: 'grid grid-cols-2 items-center gap-0 divide-x divide-border'
      }
    },
    {
      bordered: true,
      layout: 'vertical',
      class: {
        item: 'grid grid-rows-2 gap-0 divide-y divide-border'
      }
    }
  ],
  defaultVariants: {
    layout: 'horizontal',
    labelAlign: 'start',
    bordered: false
  }
});

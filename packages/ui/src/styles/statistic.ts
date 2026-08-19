// @unocss-include
import { scv } from '@soybeanjs/cva';

export const statisticVariants = scv({
  slots: {
    root: 'flex flex-col',
    label: 'text-muted-foreground',
    valueRow: 'flex items-baseline',
    value: 'font-semibold tabular-nums tracking-tight text-foreground',
    prefix: 'text-muted-foreground',
    suffix: 'text-muted-foreground'
  },
  variants: {
    size: {
      xs: {
        root: 'gap-0.5',
        label: 'text-2xs',
        valueRow: 'gap-0.5',
        value: 'text-xl leading-none',
        prefix: 'text-xs',
        suffix: 'text-xs'
      },
      sm: {
        root: 'gap-0.75',
        label: 'text-xs',
        valueRow: 'gap-0.75',
        value: 'text-2xl leading-none',
        prefix: 'text-sm',
        suffix: 'text-sm'
      },
      md: {
        root: 'gap-1',
        label: 'text-sm',
        valueRow: 'gap-1',
        value: 'text-3xl leading-none',
        prefix: 'text-base',
        suffix: 'text-base'
      },
      lg: {
        root: 'gap-1.5',
        label: 'text-base',
        valueRow: 'gap-1.5',
        value: 'text-4xl leading-none',
        prefix: 'text-lg',
        suffix: 'text-lg'
      },
      xl: {
        root: 'gap-2',
        label: 'text-lg',
        valueRow: 'gap-2',
        value: 'text-5xl leading-none',
        prefix: 'text-xl',
        suffix: 'text-xl'
      },
      '2xl': {
        root: 'gap-2.5',
        label: 'text-xl',
        valueRow: 'gap-2.5',
        value: 'text-6xl leading-none',
        prefix: 'text-2xl',
        suffix: 'text-2xl'
      }
    },
    trend: {
      up: {
        prefix: 'text-success'
      },
      down: {
        prefix: 'text-destructive'
      }
    }
  },
  defaultVariants: {
    size: 'md'
  }
});

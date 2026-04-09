// @unocss-include
import { tv } from 'tailwind-variants';
import type { VariantProps } from 'tailwind-variants';

export const anchorVariants = tv({
  slots: {
    root: 'relative flex flex-col gap-1 text-sm',
    item: 'flex flex-col gap-1',
    link: [
      'group inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-muted-foreground outline-none transition-colors',
      'hover:bg-accent/60 hover:text-accent-foreground',
      'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
      'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      'data-[state=active]:bg-accent data-[state=active]:text-foreground'
    ],
    indicator: 'size-1.5 shrink-0 rounded-full bg-primary opacity-0 transition-opacity group-data-[state=active]:opacity-100',
    children: 'ms-4 flex flex-col gap-1 border-s border-border/60 ps-3'
  },
  variants: {
    orientation: {
      vertical: {},
      horizontal: {
        root: 'flex-row flex-wrap items-start gap-2',
        item: 'min-w-36 flex-1',
        children: 'ms-0 mt-2 border-s-0 border-t ps-0 pt-2'
      }
    },
    size: {
      xs: {
        link: 'px-2 py-1.5 text-3xs'
      },
      sm: {
        link: 'px-2.5 py-1.5 text-2xs'
      },
      md: {
        link: 'px-3 py-2 text-xs'
      },
      lg: {
        link: 'px-3.5 py-2.5 text-sm',
        indicator: 'size-2'
      },
      xl: {
        link: 'px-4 py-3 text-base',
        indicator: 'size-2'
      },
      '2xl': {
        link: 'px-4.5 py-3.5 text-lg',
        indicator: 'size-2'
      }
    },
    sticky: {
      true: {
        root: 'sticky top-[var(--soybean-anchor-offset-top,0px)] max-h-[calc(100vh-var(--soybean-anchor-offset-top,0px))] overflow-auto pe-1'
      },
      false: {}
    }
  },
  defaultVariants: {
    orientation: 'vertical',
    size: 'md',
    sticky: true
  }
});

export type AnchorVariantProps = VariantProps<typeof anchorVariants>;

// @unocss-include
import { tv } from 'tailwind-variants';
import type { VariantProps } from 'tailwind-variants';

export const selectVariants = tv({
  slots: {
    content: [
      `relative z-50 min-w-32 overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md`,
      `data-[state=open]:(animate-in fade-in-0 zoom-in-95)`,
      `data-[state=closed]:(animate-out fade-out-0 zoom-out-95)`,
      `data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2`
    ],
    trigger: [
      `flex items-center justify-between w-full rounded-md border border-input bg-background [&_span]:truncate`,
      `focus-visible:(outline outline-2 outline-primary outline-offset-2) focus:(outline outline-2 outline-primary outline-offset-2) disabled:(pointer-events-none opacity-50)`,
      `placeholder:text-muted-foreground data-[placeholder]:text-muted-foreground`
    ],
    icon: `shrink-0 text-muted-foreground opacity-70`,
    viewport: 'p-1',
    item: [
      `relative flex items-center w-full rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none cursor-pointer select-none`,
      `focus:(bg-accent text-accent-foreground)`,
      `data-[disabled]:(pointer-events-none opacity-50)`
    ],
    separator: `-mx-1 my-1 h-px bg-muted`
  },
  variants: {
    position: {
      popper: {
        content: `data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1`,
        viewport: `h-[--radix-select-trigger-height] w-full min-w-[--radix-select-trigger-width]`
      },
      'item-aligned': ''
    },
    size: {
      xs: {
        trigger: 'h-6 px-1.5 text-xs',
        icon: 'text-xs'
      },
      sm: {
        trigger: 'h-7 px-2 text-sm',
        icon: 'text-xs'
      },
      md: {
        trigger: 'h-8 px-3 text-sm',
        icon: 'text-xs'
      },
      lg: {
        trigger: 'h-9 px-4 text-base',
        icon: 'text-sm'
      },
      xl: {
        trigger: 'h-10 px-5 text-base',
        icon: 'text-sm'
      },
      xxl: {
        trigger: 'h-12 px-6 text-lg',
        icon: 'text-base'
      }
    }
  },
  defaultVariants: {
    position: 'item-aligned',
    size: 'md'
  }
});

type SelectVariants = VariantProps<typeof selectVariants>;

export type SelectPosition = NonNullable<SelectVariants['position']>;

export type SelectSize = NonNullable<SelectVariants['size']>;

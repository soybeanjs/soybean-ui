// @unocss-include
import { tv } from 'tailwind-variants';
import type { VariantProps } from 'tailwind-variants';

export const pageTabsVariants = tv({
  slots: {
    root: `flex`,
    item: [
      `group/item relative flex items-center cursor-pointer select-none outline-none`,
      `data-[active=true]:bg-primary-50 data-[active=true]:text-primary data-[active=true]:z-2`,
      `data-[active=false]:hover:bg-accent data-[active=false]:focus:bg-accent`
    ],
    itemText: 'grow truncate',
    close: [
      `rounded-full hover:text-muted group-data-[active=true]/item:hover:bg-primary/50`,
      `group-data-[active=false]/item:hover:bg-accent-foreground/20`
    ],
    pin: ``,
    chromeBgLeft: [
      `absolute right-full bottom-0 fill-transparent`,
      `group-hover/item:fill-accent group-data-[active=true]/item:fill-primary-50 group-data-[active=true]/item:z-2`
    ],
    chromeBgRight: [
      `absolute left-full bottom-0 fill-transparent`,
      `group-hover/item:fill-accent group-data-[active=true]/item:fill-primary-50 group-data-[active=true]/item:z-2`
    ],
    sliderIndicator: `absolute bottom-0 left-0 w-full h-0.5 group-data-[active=true]/item:bg-primary`
  },
  variants: {
    size: {
      xs: {
        root: 'text-2xs',
        item: 'gap-2 px-1 py-1',
        itemText: 'max-w-50'
      },
      sm: {
        root: 'text-xs',
        item: 'gap-2.5 px-1.5 py-1',
        itemText: 'max-w-55'
      },
      md: {
        root: 'text-sm',
        item: 'gap-3 px-2 py-1.5',
        itemText: 'max-w-60',
        chromeBgLeft: 'w-2 h-2',
        chromeBgRight: 'w-2 h-2'
      },
      lg: {
        root: 'text-base',
        item: 'gap-3.5 px-2.5 py-1.5',
        itemText: 'max-w-65'
      },
      xl: {
        root: 'text-lg',
        item: 'gap-4 px-3 py-2',
        itemText: 'max-w-70'
      },
      '2xl': {
        root: 'text-xl',
        item: 'gap-4.5 px-3.5 py-2.5',
        itemText: 'max-w-75'
      }
    },
    variant: {
      chrome: {
        root: 'items-end',
        item: 'rounded-t-md'
      },
      card: {
        root: 'items-center gap-2',
        item: 'rounded-md shadow-sm border border-border'
      },
      slider: {
        root: 'items-end',
        item: 'rounded-t-md'
      }
    }
  },
  defaultVariants: {
    size: 'md',
    variant: 'chrome'
  }
});

type PageTabsVariants = VariantProps<typeof pageTabsVariants>;

export type PageTabsVariant = NonNullable<PageTabsVariants['variant']>;

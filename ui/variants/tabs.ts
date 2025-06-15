// @unocss-include
import { tv } from 'tailwind-variants';
import type { VariantProps } from 'tailwind-variants';

export const tabsVariants = tv({
  slots: {
    root: `flex`,
    list: 'relative inline-flex justify-center items-center rounded-md bg-muted text-muted-foreground',
    trigger: [
      `relative z-3 inline-flex items-center justify-center flex-1 whitespace-nowrap rounded-md font-medium transition-all-200`,
      `focus-visible:(outline-none ring-2 ring-offset-2 ring-offset-background ring-primary)`,
      `disabled:(pointer-events-none opacity-50)`
    ],
    indicator: `absolute top-0 left-0 z-2 transition-[width,height,transform] duration-300`,
    indicatorContent: `size-full rounded-md bg-background shadow`,
    content: `flex-grow self-stretch overflow-hidden focus-visible:(outline-none ring-2 ring-offset-2 ring-offset-background ring-primary)`
  },
  variants: {
    size: {
      xs: {
        root: 'text-2xs',
        list: `p-0.75`,
        trigger: `gap-1 px-1.5 py-0.75`
      },
      sm: {
        root: 'text-xs',
        list: `p-0.875`,
        trigger: `gap-1.5 px-2 py-1`
      },
      md: {
        root: 'text-sm',
        list: `p-1`,
        trigger: `gap-2 px-3 py-1`
      },
      lg: {
        root: 'text-base',
        list: `p-1.125`,
        trigger: `gap-2.5 px-4 py-1.125`
      },
      xl: {
        root: 'text-lg',
        list: `p-1.25`,
        trigger: `gap-3 px-5 py-1.25`
      },
      '2xl': {
        root: 'text-xl',
        list: `p-1.5`,
        trigger: `gap-4 px-6 py-1.5`
      }
    },
    orientation: {
      horizontal: {
        root: `flex-col`,
        indicator: `h-full w-[--soybean-tabs-indicator-size] translate-x-[--soybean-tabs-indicator-position]`
      },
      vertical: {
        list: `flex-col items-stretch`,
        indicator: `w-full h-[--soybean-tabs-indicator-size] translate-y-[--soybean-tabs-indicator-position]`
      }
    },
    fill: {
      full: {
        root: `items-stretch`
      },
      auto: {
        root: `items-start`
      }
    },
    enableIndicator: {
      false: {
        trigger: `data-[state=active]:(bg-background text-foreground shadow)`
      }
    }
  },
  compoundVariants: [
    {
      size: 'xs',
      orientation: 'horizontal',
      class: {
        indicator: 'py-0.75',
        content: 'mt-1.5'
      }
    },
    {
      size: 'xs',
      orientation: 'vertical',
      class: {
        indicator: 'px-0.75',
        content: 'ml-1.5'
      }
    },
    {
      size: 'sm',
      orientation: 'horizontal',
      class: {
        indicator: 'py-1',
        content: 'mt-1.75'
      }
    },
    {
      size: 'sm',
      orientation: 'vertical',
      class: {
        indicator: 'px-1',
        content: 'ml-1.75'
      }
    },
    {
      size: 'md',
      orientation: 'horizontal',
      class: {
        indicator: 'py-1',
        content: 'mt-2'
      }
    },
    {
      size: 'md',
      orientation: 'vertical',
      class: {
        indicator: 'px-1',
        content: 'ml-2'
      }
    },
    {
      size: 'lg',
      orientation: 'horizontal',
      class: {
        indicator: 'py-1.125',
        content: 'mt-2.5'
      }
    },
    {
      size: 'lg',
      orientation: 'vertical',
      class: {
        indicator: 'px-1.125',
        content: 'ml-2.5'
      }
    },
    {
      size: 'xl',
      orientation: 'horizontal',
      class: {
        indicator: 'py-1.25',
        content: 'mt-3'
      }
    },
    {
      size: 'xl',
      orientation: 'vertical',
      class: {
        indicator: 'px-1.25',
        content: 'ml-3'
      }
    },
    {
      size: '2xl',
      orientation: 'horizontal',
      class: {
        indicator: 'py-1.5',
        content: 'mt-3.5'
      }
    },
    {
      size: '2xl',
      orientation: 'vertical',
      class: {
        indicator: 'px-1.5',
        content: 'ml-3.5'
      }
    }
  ],
  defaultVariants: {
    size: 'md',
    orientation: 'horizontal',
    fill: 'auto',
    enableIndicator: true
  }
});

type TabsProps = VariantProps<typeof tabsVariants>;

export type TabsFill = NonNullable<TabsProps['fill']>;

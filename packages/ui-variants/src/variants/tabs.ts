// @unocss-include
import { tv } from 'tailwind-variants';
import type { VariantProps } from 'tailwind-variants';

export const tabsVariants = tv({
  slots: {
    root: `flex`,
    list: 'relative inline-flex justify-center items-center rounded-md bg-muted text-muted-foreground',
    trigger: [
      `relative z-2 inline-flex items-center justify-center flex-1 whitespace-nowrap rounded-md font-medium transition-all-200`,
      `focus-visible:(outline-none ring-2 ring-offset-2 ring-offset-background ring-primary)`,
      `disabled:(pointer-events-none opacity-50)`
    ],
    indicatorRoot: `absolute top-0 left-0 z-1 transition-[width,height,transform] duration-300`,
    indicator: `size-full rounded-md bg-background shadow`,
    content: `flex-grow self-stretch overflow-hidden focus-visible:(outline-none ring-2 ring-offset-2 ring-offset-background ring-primary)`
  },
  variants: {
    size: {
      xs: {
        list: `p-0.75`,
        trigger: `px-1.5 gap-1 py-0.75 text-xs`,
        indicatorRoot: ''
      },
      sm: {
        list: `p-1`,
        trigger: `px-2 gap-1.5 py-1 text-xs`,
        indicatorRoot: ''
      },
      md: {
        list: `p-1`,
        trigger: `px-3 gap-2 py-1 text-sm`,
        indicatorRoot: ''
      },
      lg: {
        list: `p-1.125`,
        trigger: `px-4 gap-2.5 py-1.125 text-base`,
        indicatorRoot: ''
      },
      xl: {
        list: `p-1.25`,
        trigger: `px-5 gap-3 py-1.25 text-base`,
        indicatorRoot: ''
      },
      '2xl': {
        list: `p-1.5`,
        trigger: `px-6 gap-4 py-1.5 text-xl`,
        indicatorRoot: ''
      }
    },
    orientation: {
      horizontal: {
        root: `flex-col`,
        indicatorRoot: `h-full w-[--soybean-tabs-indicator-size] translate-x-[--soybean-tabs-indicator-position]`
      },
      vertical: {
        list: `flex-col`,
        indicatorRoot: `w-full h-[--soybean-tabs-indicator-size] translate-y-[--soybean-tabs-indicator-position]`
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
        indicatorRoot: 'py-0.75',
        content: 'mt-1.5'
      }
    },
    {
      size: 'xs',
      orientation: 'vertical',
      class: {
        indicatorRoot: 'px-0.75',
        content: 'ml-1.5'
      }
    },
    {
      size: 'sm',
      orientation: 'horizontal',
      class: {
        indicatorRoot: 'py-1',
        content: 'mt-1.75'
      }
    },
    {
      size: 'sm',
      orientation: 'vertical',
      class: {
        indicatorRoot: 'px-1',
        content: 'ml-1.75'
      }
    },
    {
      size: 'md',
      orientation: 'horizontal',
      class: {
        indicatorRoot: 'py-1',
        content: 'mt-2'
      }
    },
    {
      size: 'md',
      orientation: 'vertical',
      class: {
        indicatorRoot: 'px-1',
        content: 'ml-2'
      }
    },
    {
      size: 'lg',
      orientation: 'horizontal',
      class: {
        indicatorRoot: 'py-1.125',
        content: 'mt-2.5'
      }
    },
    {
      size: 'lg',
      orientation: 'vertical',
      class: {
        indicatorRoot: 'px-1.125',
        content: 'ml-2.5'
      }
    },
    {
      size: 'xl',
      orientation: 'horizontal',
      class: {
        indicatorRoot: 'py-1.25',
        content: 'mt-3'
      }
    },
    {
      size: 'xl',
      orientation: 'vertical',
      class: {
        indicatorRoot: 'px-1.25',
        content: 'ml-3'
      }
    },
    {
      size: '2xl',
      orientation: 'horizontal',
      class: {
        indicatorRoot: 'py-1.5',
        content: 'mt-3.5'
      }
    },
    {
      size: '2xl',
      orientation: 'vertical',
      class: {
        indicatorRoot: 'px-1.5',
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

export type TabsSlots = keyof typeof tabsVariants.slots;

export type TabsProps = VariantProps<typeof tabsVariants>;

export type TabsFill = NonNullable<TabsProps['fill']>;

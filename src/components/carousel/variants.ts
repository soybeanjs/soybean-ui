// @unocss-include
import { tv } from 'tailwind-variants';

export const carouselVariants = tv({
  slots: {
    root: 'group relative',
    content: 'overflow-hidden',
    container: 'flex',
    item: 'min-w-0 shrink-0 grow-0 basis-full',
    control: 'flex justify-between items-center',
    navigation: 'flex',
    previous: 'group-data-[orientation=vertical]:rotate-90 rtl:rotate-180',
    next: 'group-data-[orientation=vertical]:rotate-90 rtl:rotate-180'
  },
  variants: {
    size: {
      xs: {
        root: 'text-2xs',
        navigation: 'gap-1 py-1'
      },
      sm: {
        root: 'text-xs',
        navigation: 'gap-1.25 py-1.25'
      },
      md: {
        root: 'text-sm',
        navigation: 'gap-1.5 py-1.5'
      },
      lg: {
        root: 'text-base',
        navigation: 'gap-2 py-2'
      },
      xl: {
        root: 'text-lg',
        navigation: 'gap-2.5 py-2.5'
      },
      '2xl': {
        root: 'text-xl',
        navigation: 'gap-3 py-3'
      }
    },
    orientation: {
      horizontal: {},
      vertical: {
        container: 'flex-col h-full'
      }
    },
    floatNav: {
      true: {
        navigation: 'p-0',
        previous: 'absolute',
        next: 'absolute'
      }
    }
  },
  compoundVariants: [
    {
      orientation: 'horizontal',
      floatNav: true,
      class: {
        previous: 'top-1/2 -translate-y-1/2',
        next: 'top-1/2 -translate-y-1/2'
      }
    },
    {
      orientation: 'vertical',
      floatNav: true,
      class: {
        previous: 'start-1/2 -translate-x-1/2',
        next: 'start-1/2 -translate-x-1/2'
      }
    },
    {
      size: 'xs',
      floatNav: true,
      orientation: 'horizontal',
      class: {
        previous: '-start-9',
        next: '-end-9'
      }
    },
    {
      size: 'sm',
      floatNav: true,
      orientation: 'horizontal',
      class: {
        previous: '-start-10.5',
        next: '-end-10.5'
      }
    },
    {
      size: 'md',
      floatNav: true,
      orientation: 'horizontal',
      class: {
        previous: '-start-12',
        next: '-end-12'
      }
    },
    {
      size: 'lg',
      floatNav: true,
      orientation: 'horizontal',
      class: {
        previous: '-start-13.5',
        next: '-end-13.5'
      }
    },
    {
      size: 'xl',
      floatNav: true,
      orientation: 'horizontal',
      class: {
        previous: '-start-15',
        next: '-end-15'
      }
    },
    {
      size: '2xl',
      floatNav: true,
      orientation: 'horizontal',
      class: {
        previous: '-start-18',
        next: '-end-18'
      }
    },
    {
      size: 'xs',
      floatNav: true,
      orientation: 'vertical',
      class: {
        previous: '-top-9',
        next: '-bottom-9'
      }
    },
    {
      size: 'sm',
      floatNav: true,
      orientation: 'vertical',
      class: {
        previous: '-top-10.5',
        next: '-bottom-10.5'
      }
    },
    {
      size: 'md',
      floatNav: true,
      orientation: 'vertical',
      class: {
        previous: '-top-12',
        next: '-bottom-12'
      }
    },
    {
      size: 'lg',
      floatNav: true,
      orientation: 'vertical',
      class: {
        previous: '-top-13.5',
        next: '-bottom-13.5'
      }
    },
    {
      size: 'xl',
      floatNav: true,
      orientation: 'vertical',
      class: {
        previous: '-top-15',
        next: '-bottom-15'
      }
    },
    {
      size: '2xl',
      floatNav: true,
      orientation: 'vertical',
      class: {
        previous: '-top-18',
        next: '-bottom-18'
      }
    }
  ],
  defaultVariants: {
    size: 'md',
    orientation: 'horizontal',
    floatNav: true
  }
});

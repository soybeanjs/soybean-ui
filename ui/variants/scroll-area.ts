// @unocss-include
import { tv } from 'tailwind-variants';

export const scrollAreaVariants = tv({
  slots: {
    root: 'relative overflow-hidden',
    viewport: 'size-full rounded-inherit',
    scrollbar: 'flex touch-none select-none transition-colors-200',
    thumb: 'relative flex-1 rounded-full bg-border',
    corner: ''
  },
  variants: {
    size: {
      xs: {},
      sm: {},
      md: {},
      lg: {},
      xl: {},
      '2xl': {}
    },
    orientation: {
      horizontal: {
        scrollbar: 'flex-col p-px border-t border-t-transparent'
      },
      vertical: {
        scrollbar: 'h-full p-px border-l border-l-transparent'
      }
    }
  },
  compoundVariants: [
    {
      size: 'xs',
      orientation: 'horizontal',
      class: {
        scrollbar: 'h-1.5'
      }
    },
    {
      size: 'xs',
      orientation: 'vertical',
      class: {
        scrollbar: 'w-1.5'
      }
    },
    {
      size: 'sm',
      orientation: 'horizontal',
      class: {
        scrollbar: 'h-2'
      }
    },
    {
      size: 'sm',
      orientation: 'vertical',
      class: {
        scrollbar: 'w-2'
      }
    },
    {
      size: 'md',
      orientation: 'horizontal',
      class: {
        scrollbar: 'h-2.5'
      }
    },
    {
      size: 'md',
      orientation: 'vertical',
      class: {
        scrollbar: 'w-2.5'
      }
    },
    {
      size: 'lg',
      orientation: 'horizontal',
      class: {
        scrollbar: 'h-3'
      }
    },
    {
      size: 'lg',
      orientation: 'vertical',
      class: {
        scrollbar: 'w-3'
      }
    },
    {
      size: 'xl',
      orientation: 'horizontal',
      class: {
        scrollbar: 'h-3.5'
      }
    },
    {
      size: 'xl',
      orientation: 'vertical',
      class: {
        scrollbar: 'w-3.5'
      }
    },
    {
      size: '2xl',
      orientation: 'horizontal',
      class: {
        scrollbar: 'h-4'
      }
    },
    {
      size: '2xl',
      orientation: 'vertical',
      class: {
        scrollbar: 'w-4'
      }
    }
  ],
  defaultVariants: {
    size: 'md',
    orientation: 'vertical'
  }
});

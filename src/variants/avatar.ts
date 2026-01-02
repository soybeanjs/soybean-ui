// @unocss-include
import { tv } from 'tailwind-variants';

export const avatarVariants = tv({
  slots: {
    root: 'relative flex shrink-0 overflow-hidden rounded-full',
    fallback: 'flex justify-center items-center w-full h-full rounded-full bg-muted font-medium',
    image: 'aspect-square w-full h-full object-cover m-0'
  },
  variants: {
    size: {
      xs: {
        root: 'size-6'
      },
      sm: {
        root: 'size-8'
      },
      md: {
        root: 'size-10'
      },
      lg: {
        root: 'size-12'
      },
      xl: {
        root: 'size-14'
      },
      '2xl': {
        root: 'size-16'
      }
    }
  },
  defaultVariants: {
    size: 'md'
  }
});

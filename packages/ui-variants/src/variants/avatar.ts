// @unocss-include
import { tv } from 'tailwind-variants';

export const avatarVariants = tv({
  slots: {
    root: 'relative flex shrink-0 overflow-hidden rounded-full',
    fallback: 'flex justify-center items-center size-full rounded-full bg-muted font-medium',
    image: 'aspect-square size-full object-cover'
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
      xxl: {
        root: 'size-16'
      }
    }
  },
  defaultVariants: {
    size: 'md'
  }
});

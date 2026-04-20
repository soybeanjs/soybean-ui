// @unocss-include
import { tv } from 'tailwind-variants';

export const drawerVariants = tv({
  slots: {
    popup: [
      `fixed z-50 flex flex-col justify-between items-stretch border bg-background rounded-md outline-none transition ease-in-out`,
      `data-[state=open]:animate-in data-[state=open]:duration-500`,
      `data-[state=closed]:animate-out data-[state=closed]:duration-300`
    ]
  },
  variants: {
    size: {
      xs: {
        popup: `gap-y-1.5 px-2 py-1.5 text-2xs`
      },
      sm: {
        popup: `gap-y-2 px-3 py-2 text-xs`
      },
      md: {
        popup: `gap-y-3 px-4 py-3 text-sm`
      },
      lg: {
        popup: `gap-y-4 px-5 py-4 text-base`
      },
      xl: {
        popup: `gap-y-5 px-6 py-5 text-lg`
      },
      '2xl': {
        popup: `gap-y-6 px-7 py-6 text-xl`
      }
    },
    side: {
      top: {
        popup: `inset-x-0 top-0 border-b rounded-t-0 data-[state=open]:slide-in-from-top data-[state=closed]:slide-out-to-top`
      },
      bottom: {
        popup: `inset-x-0 bottom-0 border-t rounded-b-0 data-[state=open]:slide-in-from-bottom data-[state=closed]:slide-out-to-bottom`
      },
      left: {
        popup: `inset-y-0 left-0 h-full w-3/4 border-r rounded-l-0 data-[state=open]:slide-in-from-left data-[state=closed]:slide-out-to-left sm:max-w-sm`
      },
      right: {
        popup: `inset-y-0 right-0 h-full w-3/4 border-l rounded-r-0 data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right sm:max-w-sm`
      }
    }
  },
  defaultVariants: {
    size: 'md',
    side: 'right'
  }
});

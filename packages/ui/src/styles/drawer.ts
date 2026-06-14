// @unocss-include
import { scv } from '@soybeanjs/cva';
import { dialogVariants } from './dialog';

export const drawerVariants = scv({
  extend: [dialogVariants],
  extendIgnore: ['popup'],
  slots: {
    popup: [
      `fixed z-50 flex flex-col justify-between items-stretch border bg-background outline-none transition ease-in-out`,
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
        popup: `inset-x-0 top-0 border-b rounded-b-md data-[state=open]:slide-in-from-top data-[state=closed]:slide-out-to-top`
      },
      bottom: {
        popup: `inset-x-0 bottom-0 border-t rounded-t-md data-[state=open]:slide-in-from-bottom data-[state=closed]:slide-out-to-bottom`
      },
      left: {
        popup: [
          `inset-y-0 start-0 h-full sm:max-w-sm w-3/4 border-e rounded-e-md`,
          `data-[state=open]:slide-in-from-left data-[state=closed]:slide-out-to-left`,
          `[&[dir=rtl]]:data-[state=open]:slide-in-from-right [&[dir=rtl]]:data-[state=closed]:slide-out-to-right`
        ]
      },
      right: {
        popup: [
          `inset-y-0 end-0 h-full sm:max-w-sm w-3/4 border-s rounded-s-md`,
          `data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right`,
          `[&[dir=rtl]]:data-[state=open]:slide-in-from-left [&[dir=rtl]]:data-[state=closed]:slide-out-to-left`
        ]
      }
    }
  },
  defaultVariants: {
    size: 'md',
    side: 'right'
  }
});

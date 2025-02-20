// @unocss-include
import { tv } from 'tailwind-variants';
import type { VariantProps } from 'tailwind-variants';

export const sheetVariants = tv({
  slots: {
    content: [
      `fixed z-50 flex flex-col justify-between items-stretch border bg-background px-5 py-4 rounded-md transition ease-in-out`,
      `data-[state=open]:(animate-in duration-500)`,
      `data-[state=closed]:(animate-out duration-300)`
    ]
  },
  variants: {
    side: {
      top: {
        content: `inset-x-0 top-0 border-b rounded-t-0 data-[state=open]:slide-in-from-top data-[state=closed]:slide-out-to-top`
      },
      bottom: {
        content: `inset-x-0 bottom-0 border-t rounded-b-0 data-[state=open]:slide-in-from-bottom data-[state=closed]:slide-out-to-bottom`
      },
      left: {
        content: `inset-y-0 left-0 h-full w-3/4 border-r rounded-l-0 data-[state=open]:slide-in-from-left data-[state=closed]:slide-out-to-left sm:max-w-sm`
      },
      right: {
        content: `inset-y-0 right-0 h-full w-3/4 border-l rounded-r-0 data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right sm:max-w-sm`
      }
    }
  },
  defaultVariants: {
    side: 'right'
  }
});

type SheetVariants = VariantProps<typeof sheetVariants>;

export type SheetSide = NonNullable<SheetVariants['side']>;

export type SheetSlots = keyof typeof sheetVariants.slots;

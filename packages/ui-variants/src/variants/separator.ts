// @unocss-include
import { tv } from 'tailwind-variants';

export const separatorVariants = tv({
  slots: {
    separator: `shrink-0 relative border-border`,
    label: `text-muted-foreground bg-background  top-1/2  absolute -translate-x-1/2 -translate-y-1/2 flex justify-center items-center`
  },
  variants: {
    align: {
      start: {
        label: 'left-1/20'
      },
      center: {
        label: 'left-1/2'
      },
      end: {
        label: 'right-1/20'
      }
    },
    dashed: {
      true: {
        separator: 'border-dashed'
      },
      false: {
        separator: 'border-solid'
      }
    },
    plain: {
      true: {
        label: 'text-lg fw-500 text-#000'
      },
      false: {
        label: 'text-sm fw-400'
      }
    },
    orientation: {
      vertical: {
        separator: 'h-full border-l',
        label: 'w-[1px] px-1 py-2'
      },
      horizontal: {
        separator: 'w-full  border-t ',
        label: 'h-[1px] px-2 py-1'
      }
    }
  },
  defaultVariants: {
    orientation: 'horizontal',
    align: 'center',
    dashed: false,
    plain: false
  }
});

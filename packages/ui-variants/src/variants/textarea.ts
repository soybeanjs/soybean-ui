// @unocss-include
import { tv } from 'tailwind-variants';
import type { VariantProps } from 'tailwind-variants';

export const textareaVariants = tv({
  slots: {
    root: 'relative',
    content: [
      `flex w-full rounded-md border border-solid border-input bg-background`,
      `focus-visible:(outline-none ring-2 ring-offset-2 ring-offset-background ring-primary) disabled:(cursor-not-allowed opacity-50)`
    ],
    count: 'absolute right-2.5 bottom-2 z-1 lh-none text-muted-foreground'
  },
  variants: {
    size: {
      xs: {
        content: 'px-1.5 py-0.75 text-xs min-h-6',
        count: 'text-xs'
      },
      sm: {
        content: 'px-2 py-0.75 text-sm min-h-7',
        count: 'text-sm'
      },
      md: {
        content: 'px-2.5 py-1.25 text-sm min-h-8',
        count: 'text-sm'
      },
      lg: {
        content: 'px-3 py-1.25 text-base min-h-9',
        count: 'text-base'
      },
      xl: {
        content: 'px-3.5 py-1.75 text-base min-h-10',
        count: 'text-base'
      },
      xxl: {
        content: 'px-4 py-2.25 text-lg min-h-12',
        count: 'text-lg'
      }
    },
    resize: {
      true: {
        content: 'resize'
      },
      false: {
        content: 'resize-none'
      },
      vertical: {
        content: 'resize-y'
      },
      horizontal: {
        content: 'resize-x'
      }
    }
  },
  defaultVariants: {
    size: 'md',
    resize: 'vertical'
  }
});

type TextareaVariants = VariantProps<typeof textareaVariants>;

export type TextareaResize = NonNullable<TextareaVariants['resize']>;

export type TextareaSlots = keyof typeof textareaVariants.slots;

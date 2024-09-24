// @unocss-include
import { tv } from 'tailwind-variants';
import type { VariantProps } from 'tailwind-variants';

export const textareaVariants = tv({
  slots: {
    root: 'relative',
    content: [
      `flex w-full rounded-md border border-input bg-background`,
      `focus-visible:(outline outline-2 outline-primary outline-offset-2) disabled:(cursor-not-allowed opacity-50)`
    ],
    count: 'absolute z-1 text-muted-foreground'
  },
  variants: {
    size: {
      xs: {
        content: 'px-1.5 py-0.75 text-xs',
        count: 'right-1.5 bottom-0.75 text-xs'
      },
      sm: {
        content: 'px-2 py-0.75 text-sm',
        count: 'right-2 bottom-0.75 text-sm'
      },
      md: {
        content: 'px-2.5 py-1.25 text-sm',
        count: 'right-2.5 bottom-1.25 text-sm'
      },
      lg: {
        content: 'px-3 py-1.25 text-base',
        count: 'right-3 bottom-1.25 text-base'
      },
      xl: {
        content: 'px-3.5 py-1.75 text-base',
        count: 'right-3.5 bottom-1.75 text-base'
      },
      xxl: {
        content: 'px-4 py-2.25 text-lg',
        count: 'right-4 bottom-2.25 text-lg'
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

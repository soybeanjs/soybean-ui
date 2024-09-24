// @unocss-include
import { tv } from 'tailwind-variants';
import type { VariantProps } from 'tailwind-variants';

export const textareaVariants = tv({
  slots: {
    root: 'relative',
    textarea:
      'flex w-full rounded-md border border-input bg-background focus-visible:(outline outline-2 outline-primary outline-offset-2) disabled:(cursor-not-allowed opacity-50)',
    count: 'absolute text-slate-400'
  },
  variants: {
    size: {
      xs: {
        textarea: 'px-1.5 py-0.75 text-xs',
        count: 'bottom-1 right-3 text-xs'
      },
      sm: {
        textarea: 'px-2 py-0.75 text-sm',
        count: 'bottom-1 right-3 text-sm'
      },
      md: {
        textarea: 'px-2.5 py-1.25 text-sm',
        count: 'bottom-1 right-3 text-sm'
      },
      lg: {
        textarea: 'px-3 py-1.25 text-base',
        count: 'bottom-1 right-3 text-base'
      },
      xl: {
        textarea: 'px-3.5 py-1.75 text-base',
        count: 'bottom-1 right-3 text-base'
      },
      xxl: {
        textarea: 'px-4 py-2.25 text-lg',
        count: 'bottom-0.5 right-3 text-lg'
      }
    },
    resize: {
      true: {
        textarea: 'resize',
        count: ''
      },
      false: {
        textarea: 'resize-none',
        count: ''
      },
      vertical: {
        textarea: 'resize-y',
        count: ''
      },
      horizontal: {
        textarea: 'resize-x',
        count: ''
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

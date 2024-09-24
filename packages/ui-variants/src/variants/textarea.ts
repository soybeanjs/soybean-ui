// @unocss-include
import { tv } from 'tailwind-variants';
import type { VariantProps } from 'tailwind-variants';

export const textareaVariants = tv({
  slots: {
    root: 'relative',
    textarea:
      'flex w-full rounded-md border border-input bg-background focus-visible:(outline outline-2 outline-primary outline-offset-2) disabled:(cursor-not-allowed opacity-50)',
    count: 'absolute bottom-0 right-4 text-sm text-slate-400'
  },
  variants: {
    size: {
      xs: 'px-1.5 py-0.75 text-xs',
      sm: 'px-2 py-0.75 text-sm',
      md: 'px-2.5 py-1.25 text-sm',
      lg: 'px-3 py-1.25 text-base',
      xl: 'px-3.5 py-1.75 text-base',
      xxl: 'px-4 py-2.25 text-lg'
    },
    resize: {
      true: 'resize',
      false: 'resize-none',
      vertical: 'resize-y',
      horizontal: 'resize-x'
    }
  },
  defaultVariants: {
    size: 'md',
    resize: 'vertical'
  }
});

type TextareaVariants = VariantProps<typeof textareaVariants>;

export type TextareaResize = NonNullable<TextareaVariants['resize']>;

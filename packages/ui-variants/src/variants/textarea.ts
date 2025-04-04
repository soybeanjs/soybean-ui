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
    count: 'absolute z-1 lh-none text-muted-foreground'
  },
  variants: {
    size: {
      xs: {
        content: 'min-h-6 px-1.5 py-1 text-2xs',
        count: 'text-2xs right-1.75 bottom-1.5'
      },
      sm: {
        content: 'min-h-7 px-1.75 py-1 text-xs',
        count: 'text-xs right-2 bottom-1.75'
      },
      md: {
        content: 'min-h-8 px-2 py-1 text-sm',
        count: 'text-sm right-2.5 bottom-2'
      },
      lg: {
        content: 'min-h-9 px-2.5 py-1 text-base',
        count: 'text-base right-3 bottom-2.5'
      },
      xl: {
        content: 'min-h-10 px-3 py-1 text-lg',
        count: 'text-lg right-3.5 bottom-3'
      },
      '2xl': {
        content: 'min-h-12 px-4 py-2 text-xl',
        count: 'text-xl right-4 bottom-3.5'
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

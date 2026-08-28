// @unocss-include
import { scv } from '@soybeanjs/cva';
import type { VariantProps } from '@soybeanjs/cva';
import { miniButtonIconVariants } from './button';
import { fieldChrome, fieldClearReveal, fieldDisabled } from './field';

export const textareaVariants = scv({
  extendBase: props => ({
    clear: miniButtonIconVariants({ size: props.size, shape: 'circle' })
  }),
  slots: {
    root: ['group relative flex flex-col', ...fieldChrome, ...fieldDisabled],
    control: ['w-full bg-transparent outline-none', 'placeholder:text-muted-foreground', 'disabled:cursor-not-allowed'],
    counter: 'absolute z-2 leading-none text-muted-foreground',
    clear: [...fieldClearReveal, 'absolute']
  },
  variants: {
    size: {
      xs: {
        root: 'text-2xs',
        control: 'min-h-6 px-1.5 py-1',
        counter: 'text-2xs end-1.75 bottom-1.5',
        clear: 'end-1.5 top-1.5'
      },
      sm: {
        root: 'text-xs',
        control: 'min-h-7 px-2 py-1',
        counter: 'text-xs end-2 bottom-1.75',
        clear: 'end-1.75 top-1.75'
      },
      md: {
        root: 'text-sm',
        control: 'min-h-8 px-2.5 py-1',
        counter: 'text-sm end-2.5 bottom-2',
        clear: 'end-2 top-2'
      },
      lg: {
        root: 'text-base',
        control: 'min-h-9 px-3 py-1',
        counter: 'text-base end-3 bottom-2.5',
        clear: 'end-2.5 top-2.5'
      },
      xl: {
        root: 'text-lg',
        control: 'min-h-10 px-3.5 py-1',
        counter: 'text-lg end-3.5 bottom-3',
        clear: 'end-3 top-3'
      },
      '2xl': {
        root: 'text-xl',
        control: 'min-h-12 px-4 py-2',
        counter: 'text-xl end-4 bottom-3.5',
        clear: 'end-3.5 top-3.5'
      }
    },
    resize: {
      true: {
        control: 'resize'
      },
      false: {
        control: 'resize-none'
      },
      vertical: {
        control: 'resize-y'
      },
      horizontal: {
        control: 'resize-x'
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

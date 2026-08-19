// @unocss-include
import { cv, scv } from '@soybeanjs/cva';

export const typographyTitleVariants = cv({
  base: 'm-0 font-semibold tracking-tight text-foreground',
  variants: {
    level: {
      '1': 'text-4xl leading-10',
      '2': 'text-3xl leading-9',
      '3': 'text-2xl leading-8',
      '4': 'text-xl leading-7',
      '5': 'text-lg leading-6',
      '6': 'text-base leading-5'
    }
  },
  defaultVariants: {
    level: 1
  }
});

export const typographyParagraphVariants = scv({
  slots: {
    root: 'm-0 text-sm leading-6 text-foreground data-[copyable]:flex data-[copyable]:items-start data-[copyable]:gap-1.5',
    copyButton:
      'mt-1 inline-flex size-5 shrink-0 cursor-pointer items-center justify-center rounded-sm text-muted-foreground transition-colors-150 hover:bg-secondary hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary/30 data-[copied]:text-success'
  }
});

export const typographyTextVariants = cv({
  base: 'text-sm text-foreground',
  variants: {
    type: {
      default: '',
      secondary: 'text-muted-foreground',
      success: 'text-success',
      warning: 'text-warning',
      danger: 'text-destructive'
    },
    code: { true: 'rounded-sm bg-secondary px-1 py-0.5 font-mono text-xs' },
    mark: { true: 'rounded-sm bg-warning/30 px-0.5' },
    strong: { true: 'font-semibold' },
    italic: { true: 'italic' },
    underline: { true: 'underline underline-offset-2' },
    delete: { true: 'line-through' }
  },
  defaultVariants: {
    type: 'default'
  }
});

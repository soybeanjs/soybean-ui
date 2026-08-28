// @unocss-include
import { scv } from '@soybeanjs/cva';
import {
  fieldChrome,
  fieldClearRevealValue,
  fieldDisabled,
  fieldMinSize,
  fieldNestedAction,
  fieldWrap
} from './_field';
import { miniButtonIconVariants } from './button';

export const tagsInputVariants = scv({
  extendBase: props => ({
    itemDelete: miniButtonIconVariants({ size: props.size, shape: 'circle' }),
    clear: miniButtonIconVariants({ size: props.size, shape: 'circle' })
  }),
  slots: {
    root: ['group relative flex w-full flex-wrap items-center', ...fieldChrome, ...fieldDisabled],
    item: [
      'inline-flex items-center rounded-md bg-accent ring-offset-background transition-[box-shadow,background-color]',
      'data-[state=active]:ring-2 data-[state=active]:ring-primary/30 data-[state=active]:ring-offset-2',
      'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 group-data-[disabled]:opacity-100'
    ],
    itemText: 'rounded bg-transparent',
    itemDelete: fieldNestedAction,
    control: [
      'grow min-w-0 bg-transparent text-foreground outline-none',
      'placeholder:text-muted-foreground disabled:cursor-not-allowed'
    ],
    clear: [...fieldClearRevealValue, 'absolute']
  },
  variants: {
    size: {
      xs: {
        root: [fieldMinSize.xs, fieldWrap.xs],
        item: 'min-h-4 gap-0.5',
        itemText: 'px-1.5 py-0.5',
        itemDelete: 'me-0.5',
        control: 'min-h-5 px-0.5',
        clear: 'end-0.5 top-0.5'
      },
      sm: {
        root: [fieldMinSize.sm, fieldWrap.sm],
        item: 'min-h-4.5 gap-0.75',
        itemText: 'px-1.5 py-0.5',
        itemDelete: 'me-0.5',
        control: 'min-h-5 px-0.75',
        clear: 'end-0.75 top-0.75'
      },
      md: {
        root: [fieldMinSize.md, fieldWrap.md],
        item: 'min-h-5 gap-1',
        itemText: 'px-2 py-0.5',
        itemDelete: 'me-1',
        control: 'min-h-5 px-1',
        clear: 'end-1 top-1'
      },
      lg: {
        root: [fieldMinSize.lg, fieldWrap.lg],
        item: 'min-h-6 gap-1',
        itemText: 'px-2 py-0.5',
        itemDelete: 'me-1',
        control: 'min-h-6 px-1.25',
        clear: 'end-1.25 top-1.25'
      },
      xl: {
        root: [fieldMinSize.xl, fieldWrap.xl],
        item: 'min-h-7 gap-1.5',
        itemText: 'px-2.5 py-1',
        itemDelete: 'me-1',
        control: 'min-h-7 px-1.5',
        clear: 'end-1.5 top-1.5'
      },
      '2xl': {
        root: [fieldMinSize['2xl'], fieldWrap['2xl']],
        item: 'min-h-8 gap-1.5',
        itemText: 'px-3 py-1',
        itemDelete: 'me-1.5',
        control: 'min-h-8 px-2',
        clear: 'end-2 top-2'
      }
    }
  },
  defaultVariants: {
    size: 'md'
  }
});

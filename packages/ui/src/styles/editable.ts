// @unocss-include
import { scv } from '@soybeanjs/cva';
import { miniButtonIconVariants } from './button';
import { fieldChrome, fieldDisabled, fieldNestedAction, fieldSize } from './field';

export const editableVariants = scv({
  extendBase: props => ({
    editTrigger: miniButtonIconVariants({ size: props.size }),
    submitTrigger: miniButtonIconVariants({ size: props.size }),
    cancelTrigger: miniButtonIconVariants({ size: props.size })
  }),
  slots: {
    root: 'w-full',
    area: ['grid w-full grid-cols-[minmax(0,1fr)_auto] items-center', ...fieldChrome, ...fieldDisabled],
    preview: [
      'col-start-1 row-start-1 min-w-0 truncate text-foreground outline-none',
      'data-[placeholder-shown]:text-muted-foreground'
    ],
    input: [
      'col-start-1 row-start-1 min-w-0 w-full border-0 bg-transparent outline-none',
      'placeholder:text-muted-foreground',
      'disabled:cursor-not-allowed'
    ],
    controls: 'col-start-2 row-start-1 flex items-center',
    editTrigger: fieldNestedAction,
    submitTrigger: ['hover:text-success', fieldNestedAction],
    cancelTrigger: ['hover:text-destructive', fieldNestedAction]
  },
  variants: {
    size: {
      xs: {
        area: fieldSize.xs,
        controls: 'gap-0.5'
      },
      sm: {
        area: fieldSize.sm,
        controls: 'gap-0.5'
      },
      md: {
        area: fieldSize.md,
        controls: 'gap-1'
      },
      lg: {
        area: fieldSize.lg,
        controls: 'gap-1'
      },
      xl: {
        area: fieldSize.xl,
        controls: 'gap-1.5'
      },
      '2xl': {
        area: fieldSize['2xl'],
        controls: 'gap-1.5'
      }
    }
  },
  defaultVariants: {
    size: 'md'
  }
});

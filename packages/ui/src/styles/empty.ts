// @unocss-include
import { scv } from '@soybeanjs/cva';

export const emptyVariants = scv({
  slots: {
    root: 'flex flex-col items-center justify-center min-w-0 grow rounded-md border border-dashed text-center',
    header: 'flex flex-col items-center max-w-sm text-center',
    media: 'flex shrink-0 items-center justify-center rounded-md bg-muted text-foreground',
    title: 'font-medium tracking-tight',
    description: `leading-relaxed text-muted-foreground`,
    content: 'flex w-full min-w-0 max-w-sm flex-col items-center'
  },
  variants: {
    size: {
      xs: {
        root: 'text-2xs gap-3',
        title: 'text-xs',
        header: 'gap-1.5',
        media: 'my-1.5'
      },
      sm: {
        root: 'text-xs gap-3.5',
        title: 'text-sm',
        header: 'gap-1.75',
        media: 'my-1.75'
      },
      md: {
        root: 'text-sm gap-4',
        title: 'text-base',
        header: 'gap-2',
        media: 'my-2 size-10'
      },
      lg: {
        root: 'text-base gap-4.5',
        title: 'text-lg',
        header: 'gap-2.5',
        media: 'my-2.5'
      },
      xl: {
        root: 'text-lg gap-5',
        title: 'text-xl',
        header: 'gap-3',
        media: 'my-3'
      },
      '2xl': {
        root: 'text-xl gap-6',
        title: 'text-2xl',
        header: 'gap-3.5',
        media: 'my-3.5'
      }
    }
  },
  defaultVariants: {
    size: 'md'
  }
});

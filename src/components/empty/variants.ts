// @unocss-include
import { tv } from 'tailwind-variants';
import type { VariantProps } from 'tailwind-variants';

export const emptyVariants = tv({
  slots: {
    root: 'flex min-w-0 flex-1 flex-col items-center justify-center gap-6 rounded-lg border border-dashed p-6 text-center md:p-12',
    header: 'flex max-w-sm flex-col items-center gap-2 text-center',
    media: 'mb-2 flex shrink-0 items-center justify-center [&_svg]:pointer-events-none [&_svg]:shrink-0',
    content: 'flex w-full min-w-0 max-w-sm flex-col items-center gap-4 text-balance text-sm',
    title: 'm-0 text-lg font-medium tracking-tight',
    description: 'm-0 text-sm/relaxed text-muted-foreground [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary'
  },
  variants: {
    mediaVariant: {
      default: {
        media: 'bg-transparent'
      },
      icon: {
        media: 'size-10 rounded-lg bg-muted text-foreground [&_svg:not([class*=size-])]:size-6'
      }
    }
  },
  defaultVariants: {
    mediaVariant: 'default'
  }
});

type EmptyVariants = VariantProps<typeof emptyVariants>;

export type EmptyMediaVariant = NonNullable<EmptyVariants['mediaVariant']>;

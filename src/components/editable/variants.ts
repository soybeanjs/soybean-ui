// @unocss-include
import { tv } from 'tailwind-variants';
import type { VariantProps } from 'tailwind-variants';

export const editableVariants = tv({
  slots: {
    root: 'w-full',
    area: [
      'grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-2 rounded-md border border-solid border-input bg-background transition-all-150',
      'outline-none focus-within:ring-3 focus-within:ring-offset-background focus-within:ring-primary/30',
      'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50'
    ],
    preview: [
      'col-start-1 row-start-1 min-w-0 truncate text-foreground outline-none',
      'data-[placeholder-shown]:text-muted-foreground'
    ],
    input: [
      'col-start-1 row-start-1 min-w-0 w-full border-0 bg-transparent outline-none',
      'placeholder:text-muted-foreground',
      'disabled:cursor-not-allowed'
    ],
    controls: 'col-start-2 row-start-1 flex items-center gap-1',
    editTrigger: [
      'inline-flex items-center justify-center rounded-md text-muted-foreground transition-colors',
      'hover:bg-accent hover:text-accent-foreground',
      'outline-none focus-visible:ring-2 focus-visible:ring-primary/30'
    ],
    submitTrigger: [
      'inline-flex items-center justify-center rounded-md text-muted-foreground transition-colors',
      'hover:bg-accent hover:text-success',
      'outline-none focus-visible:ring-2 focus-visible:ring-primary/30'
    ],
    cancelTrigger: [
      'inline-flex items-center justify-center rounded-md text-muted-foreground transition-colors',
      'hover:bg-accent hover:text-destructive',
      'outline-none focus-visible:ring-2 focus-visible:ring-primary/30'
    ]
  },
  variants: {
    size: {
      xs: {
        area: 'min-h-6 px-1.5 py-1 text-2xs',
        preview: 'text-2xs',
        input: 'text-2xs',
        controls: 'gap-0.5',
        editTrigger: 'size-5 [&>svg]:size-3',
        submitTrigger: 'size-5 [&>svg]:size-3',
        cancelTrigger: 'size-5 [&>svg]:size-3'
      },
      sm: {
        area: 'min-h-7 px-2 py-1 text-xs',
        preview: 'text-xs',
        input: 'text-xs',
        editTrigger: 'size-6 [&>svg]:size-3.5',
        submitTrigger: 'size-6 [&>svg]:size-3.5',
        cancelTrigger: 'size-6 [&>svg]:size-3.5'
      },
      md: {
        area: 'min-h-8 px-2.5 py-1.5 text-sm',
        preview: 'text-sm',
        input: 'text-sm',
        editTrigger: 'size-7 [&>svg]:size-4',
        submitTrigger: 'size-7 [&>svg]:size-4',
        cancelTrigger: 'size-7 [&>svg]:size-4'
      },
      lg: {
        area: 'min-h-9 px-3 py-1.5 text-base',
        preview: 'text-base',
        input: 'text-base',
        editTrigger: 'size-8 [&>svg]:size-4',
        submitTrigger: 'size-8 [&>svg]:size-4',
        cancelTrigger: 'size-8 [&>svg]:size-4'
      },
      xl: {
        area: 'min-h-10 px-3.5 py-2 text-lg',
        preview: 'text-lg',
        input: 'text-lg',
        editTrigger: 'size-9 [&>svg]:size-5',
        submitTrigger: 'size-9 [&>svg]:size-5',
        cancelTrigger: 'size-9 [&>svg]:size-5'
      },
      '2xl': {
        area: 'min-h-12 px-4 py-2.5 text-xl',
        preview: 'text-xl',
        input: 'text-xl',
        editTrigger: 'size-10 [&>svg]:size-5',
        submitTrigger: 'size-10 [&>svg]:size-5',
        cancelTrigger: 'size-10 [&>svg]:size-5'
      }
    }
  },
  defaultVariants: {
    size: 'md'
  }
});

type EditableVariants = VariantProps<typeof editableVariants>;

export type EditableVariantSize = NonNullable<EditableVariants['size']>;

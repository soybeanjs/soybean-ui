// @unocss-include
import { scv } from '@soybeanjs/cva';

export const uploadVariants = scv({
  slots: {
    root: 'flex flex-col gap-2',
    input: 'hidden',
    trigger: [
      'inline-flex cursor-pointer items-center justify-center gap-2 rounded-md border border-dashed border-border bg-secondary/30 text-muted-foreground outline-none transition-colors-150',
      'hover:border-primary/60 hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary/30',
      'data-[drag-over]:border-primary data-[drag-over]:bg-primary/5 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50'
    ],
    fileList: 'flex flex-col gap-1.5',
    fileItem: [
      'flex items-center gap-2.5 rounded-md border border-border bg-card text-foreground',
      'data-[status=success]:border-success/40 data-[status=error]:border-destructive/40'
    ],
    filePreview: 'flex size-8 shrink-0 items-center justify-center rounded-sm bg-secondary text-muted-foreground',
    fileInfo: 'flex min-w-0 flex-1 flex-col',
    fileStatus: 'truncate text-xs text-muted-foreground data-[status=error]:text-destructive',
    fileAction:
      'inline-flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-sm text-muted-foreground transition-colors-150 hover:bg-secondary hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary/30'
  },
  variants: {
    size: {
      xs: {
        trigger: 'px-3 py-2 text-xs',
        fileItem: 'px-2 py-1.5 text-xs',
        filePreview: 'size-6',
        fileStatus: 'text-2xs'
      },
      sm: {
        trigger: 'px-3.5 py-2.5 text-xs',
        fileItem: 'px-2.5 py-2 text-xs',
        filePreview: 'size-7'
      },
      md: {
        trigger: 'px-4 py-6 text-sm',
        fileItem: 'px-3 py-2 text-sm',
        filePreview: 'size-8'
      },
      lg: {
        trigger: 'px-5 py-8 text-sm',
        fileItem: 'px-3.5 py-2.5 text-sm',
        filePreview: 'size-9'
      },
      xl: {
        trigger: 'px-6 py-10 text-base',
        fileItem: 'px-4 py-3 text-base',
        filePreview: 'size-10'
      },
      '2xl': {
        trigger: 'px-7 py-12 text-base',
        fileItem: 'px-4 py-3.5 text-base',
        filePreview: 'size-11'
      }
    }
  },
  defaultVariants: {
    size: 'md'
  }
});

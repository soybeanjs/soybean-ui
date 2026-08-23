// @unocss-include
import { scv } from '@soybeanjs/cva';

export const imageVariants = scv({
  slots: {
    root: 'group relative inline-flex',
    image: 'h-auto w-full select-none',
    placeholder: 'absolute inset-0 flex items-center justify-center bg-secondary',
    error: 'absolute inset-0 flex items-center justify-center bg-secondary text-muted-foreground',
    mask: 'pointer-events-none absolute inset-0 flex items-center justify-center bg-black/40 text-white opacity-0 transition-opacity duration-150 group-hover:opacity-100'
  },
  variants: {
    fit: {
      cover: { image: 'object-cover' },
      contain: { image: 'object-contain' },
      fill: { image: 'object-fill' },
      none: { image: 'object-none' },
      'scale-down': { image: 'object-scale-down' }
    },
    rounded: {
      true: {
        root: 'overflow-hidden rounded-md'
      }
    }
  },
  defaultVariants: {
    fit: 'cover'
  }
});

export const imagePreviewVariants = scv({
  slots: {
    root: 'fixed inset-0 z-50 flex items-center justify-center bg-black/70',
    backdrop: 'absolute inset-0',
    image: [
      'relative z-1 max-h-[85vh] max-w-[85vw] select-none object-contain transition-transform duration-150',
      '[transform:scale(var(--soybean-image-preview-zoom))_rotate(var(--soybean-image-preview-rotate))]'
    ],
    toolbar:
      'absolute bottom-4 left-1/2 z-2 flex -translate-x-1/2 items-center gap-1 rounded-full border border-white/20 bg-black/50 p-1.5 text-white backdrop-blur',
    toolbarButton: 'inline-flex size-8 items-center justify-center rounded-full transition-colors-150 hover:bg-white/15'
  }
});

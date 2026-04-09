// @unocss-include
import { tv } from 'tailwind-variants';

export const toolbarVariants = tv({
  base: [
    'inline-flex items-center gap-1 rounded-md border border-border bg-background p-1 shadow-xs',
    'data-[orientation=vertical]:h-auto data-[orientation=vertical]:w-fit data-[orientation=vertical]:flex-col',
    'data-[orientation=horizontal]:h-9'
  ]
});

export const toolbarButtonVariants = tv({
  base: [
    'inline-flex h-7 min-w-7 items-center justify-center gap-1 rounded-sm px-2 text-sm font-medium transition-colors',
    'outline-none hover:bg-accent hover:text-accent-foreground',
    'focus-visible:ring-3 focus-visible:ring-primary/30',
    'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
    'aria-disabled:pointer-events-none aria-disabled:opacity-50',
    '[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-4'
  ]
});

export const toolbarLinkVariants = tv({
  base: [
    toolbarButtonVariants(),
    'select-none no-underline'
  ]
});

export const toolbarSeparatorVariants = tv({
  base: [
    'shrink-0 bg-border data-[orientation=vertical]:mx-1 data-[orientation=vertical]:h-4 data-[orientation=vertical]:w-px',
    'data-[orientation=horizontal]:my-1 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full'
  ]
});

export const toolbarToggleGroupVariants = tv({
  base: 'inline-flex items-center gap-1 data-[orientation=vertical]:flex-col'
});

export const toolbarToggleItemVariants = tv({
  base: [
    toolbarButtonVariants(),
    'data-[state=on]:bg-accent data-[state=on]:text-accent-foreground'
  ]
});

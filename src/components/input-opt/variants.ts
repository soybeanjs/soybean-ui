// @unocss-include
import { tv } from 'tailwind-variants';

export const inputOptVariants = tv({
  slots: {
    root: 'group relative inline-flex w-fit items-center gap-2 has-[:disabled]:opacity-50',
    input: [
      'absolute inset-0 h-full w-full rounded-md border-0 bg-transparent text-transparent outline-none',
      'caret-transparent [font-variant-numeric:tabular-nums] selection:bg-transparent selection:text-transparent',
      'data-[text-align=center]:text-center data-[text-align=right]:text-right disabled:cursor-not-allowed'
    ]
  }
});

export const inputOptGroupClass = 'flex items-center';

export const inputOptSeparatorClass = 'flex items-center justify-center text-muted-foreground';

export const inputOptSeparatorLineClass = 'h-0.5 w-3 rounded-full bg-border';

export const inputOptSlotClass = [
  'relative flex size-9 items-center justify-center border-y border-r border-input bg-background text-sm shadow-xs transition-all',
  'first:rounded-l-md first:border-l last:rounded-r-md',
  'data-[active=true]:z-10 data-[active=true]:border-primary data-[active=true]:ring-3 data-[active=true]:ring-primary/30'
];

export const inputOptPlaceholderClass = 'text-muted-foreground';

export const inputOptCaretClass = 'pointer-events-none absolute inset-0 flex items-center justify-center';

export const inputOptCaretLineClass = 'h-4 w-px animate-pulse bg-foreground';

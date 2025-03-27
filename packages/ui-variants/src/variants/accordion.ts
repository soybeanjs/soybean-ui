// @unocss-include
import { tv } from 'tailwind-variants';

export const accordionVariants = tv({
  slots: {
    root: '',
    item: 'border-b',
    header: 'flex',
    content: [`overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up`],
    trigger: [
      `flex-1 flex items-center justify-start font-medium transition-all-200 bg-transparent`,
      `focus-visible:(outline-none ring-2 ring-offset-2 ring-offset-background ring-primary)`,
      `hover:underline [&[data-state=open]>.trigger-icon]:rotate-180`
    ],
    triggerLeadingIcon: `shrink-0`,
    triggerIcon: `trigger-icon ml-auto shrink-0 text-muted-foreground transition-transform-200`
  },
  variants: {
    size: {
      xs: {
        root: 'text-xs',
        content: 'data-[state=open]:pb-xs',
        trigger: 'py-xs gap-xs'
      },
      sm: {
        root: 'text-sm',
        content: 'data-[state=open]:pb-sm',
        trigger: 'py-sm gap-sm'
      },
      md: {
        root: 'text-md',
        content: 'data-[state=open]:pb-md',
        trigger: 'py-md gap-md'
      },
      lg: {
        root: 'text-lg',
        content: 'data-[state=open]:pb-lg',
        trigger: 'py-lg gap-lg'
      },
      xl: {
        root: 'text-xl',
        content: 'data-[state=open]:pb-xl',
        trigger: 'py-xl gap-xl'
      },
      '2xl': {
        root: 'text-2xl',
        content: 'data-[state=open]:pb-2xl',
        trigger: 'py-2xl gap-2xl'
      }
    }
  },
  defaultVariants: {
    size: 'md'
  }
});

export type AccordionSlots = keyof typeof accordionVariants.slots;

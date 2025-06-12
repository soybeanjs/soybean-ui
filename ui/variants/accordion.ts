// @unocss-include
import { tv } from 'tailwind-variants';

export const accordionVariants = tv({
  slots: {
    root: '',
    item: 'border-b',
    header: 'flex',
    content: [
      `overflow-hidden transition will-change-auto`,
      `data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up`
    ],
    description: '',
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
        root: 'text-2xs',
        description: 'pb-3',
        trigger: 'py-3 gap-1.5'
      },
      sm: {
        root: 'text-xs',
        description: 'pb-3.5',
        trigger: 'py-3.5 gap-1.75'
      },
      md: {
        root: 'text-sm',
        description: 'pb-4',
        trigger: 'py-4 gap-2'
      },
      lg: {
        root: 'text-base',
        description: 'pb-4.5',
        trigger: 'py-4.5 gap-2.5'
      },
      xl: {
        root: 'text-lg',
        description: 'pb-5',
        trigger: 'py-5 gap-3'
      },
      '2xl': {
        root: 'text-2xl',
        description: 'pb-6',
        trigger: 'py-6 gap-3.5'
      }
    }
  },
  defaultVariants: {
    size: 'md'
  }
});

export type AccordionSlots = keyof typeof accordionVariants.slots;

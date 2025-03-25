// @unocss-include
import { tv } from 'tailwind-variants';

export const accordionVariants = tv({
  slots: {
    root: '',
    item: 'border-b',
    header: 'flex',
    content: `overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up`,
    trigger: [
      `flex-1 flex items-center justify-between font-medium transition-all-200 bg-transparent`,
      `focus-visible:(outline-none ring-2 ring-offset-2 ring-offset-background ring-primary)`,
      `hover:underline [&[data-state=open]>svg]:rotate-180`
    ],
    triggerIcon: 'shrink-0 text-muted-foreground transition-transform-200'
  },
  variants: {
    size: {
      xs: {
        content: 'text-xs data-[state=open]:pb-3',
        trigger: 'text-xs py-3'
      },
      sm: {
        content: 'text-sm data-[state=open]:pb-3.5',
        trigger: 'text-sm py-3.5'
      },
      md: {
        content: 'text-sm data-[state=open]:pb-4',
        trigger: 'text-sm py-4'
      },
      lg: {
        content: 'text-base data-[state=open]:pb-4.5',
        trigger: 'text-base py-4.5'
      },
      xl: {
        content: 'text-base data-[state=open]:pb-5',
        trigger: 'text-base py-5'
      },
      '2xl': {
        content: 'text-lg data-[state=open]:pb-6',
        trigger: 'text-lg py-6'
      }
    }
  },
  defaultVariants: {
    size: 'md'
  }
});

export type AccordionSlots = keyof typeof accordionVariants.slots;

// @unocss-include
import { tv } from 'tailwind-variants';

export const accordionVariants = tv({
  slots: {
    item: 'border-b',
    header: 'flex',
    content: `pb-4 text-sm overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up`,
    contentBody: 'pb-4',
    trigger: `flex-1 flex items-center justify-between py-4 text-sm font-medium transition-all hover:underline bg-transparent [&[data-state=open]>svg]:rotate-180 focus-visible:(outline outline-2 outline-primary outline-offset-2)`,
    triggerIcon: 'shrink-0 text-muted-foreground transition-transform duration-200'
  }
});

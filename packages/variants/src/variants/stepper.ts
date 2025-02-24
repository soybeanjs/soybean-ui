// @unocss-include
import { tv } from 'tailwind-variants';

export const stepperVariants = tv({
  slots: {
    root: 'flex',
    indicator: [
      'inline-flex items-center justify-center rounded-full text-muted-foreground/50 w-8 h-8',
      'group-data-[disabled]:text-muted-foreground group-data-[disabled]:opacity-50',
      'group-data-[state=active]:bg-primary group-data-[state=active]:text-primary-foreground',
      'group-data-[state=completed]:bg-accent group-data-[state=completed]:text-accent-foreground'
    ],
    item: 'group relative flex w-full data-[disabled]:pointer-events-none',
    separator: [
      `absolute block shrink-0 rounded-full bg-muted`,
      'group-data-[disabled]:(bg-muted opacity-50)',
      'group-data-[state=completed]:bg-primary'
    ],
    titleDescWrapper: 'flex flex-col',
    title: 'text-md font-semibold whitespace-nowrap',
    description: 'text-xs text-muted-foreground',
    trigger: 'flex flex-col items-center gap-1 text-center p-1'
  },
  variants: {
    orientation: {
      horizontal: {
        root: 'gap-2',
        item: 'flex-col items-center justify-center gap-2',
        separator: 'left-[calc(50%+20px)] right-[calc(-50%+10px)] top-15.5px h-0.5',
        titleDescWrapper: 'items-center text-center'
      },
      vertical: {
        root: 'flex-col justify-start gap-10 max-w-md w-full mx-auto',
        item: 'items-start gap-6',
        separator: 'left-[15.5px] top-[36px] h-[105%] w-0.5',
        titleDescWrapper: 'gap-1'
      }
    }
  },
  defaultVariants: {
    orientation: 'horizontal'
  }
});

export type StepperSlots = keyof typeof stepperVariants.slots;

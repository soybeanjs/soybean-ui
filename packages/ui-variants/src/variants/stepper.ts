// @unocss-include
import { tv } from 'tailwind-variants';

export const stepperVariants = tv({
  slots: {
    root: 'flex',
    indicator: [
      'inline-flex items-center justify-center rounded-full text-muted-foreground/50',
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
    trigger: 'flex flex-col items-center text-center'
  },
  variants: {
    size: {
      xs: {
        indicator: 'size-6',
        trigger: 'gap-0.5 p-0.5'
      },
      sm: {
        indicator: 'size-7',
        trigger: 'gap-0.75 p-0.75'
      },
      md: {
        indicator: 'size-8',
        trigger: 'gap-1 p-1'
      },
      lg: {
        indicator: 'size-9',
        trigger: 'gap-1.5 p-1.5'
      },
      xl: {
        indicator: 'size-10',
        trigger: 'gap-2 p-2'
      },
      '2xl': {
        indicator: 'size-12',
        trigger: 'gap-2.5 p-2.5'
      }
    },
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
  compoundVariants: [
    {
      orientation: 'horizontal',
      size: 'xs',
      class: {
        root: 'gap-1.5',
        item: 'gap-1.5',
        separator: 'left-[calc(50%+0.75rem)] right-[calc(-50%+0.75rem)] top-0.75rem h-0.25'
      }
    },
    {
      orientation: 'horizontal',
      size: 'sm',
      class: {
        root: 'gap-1.75',
        item: 'gap-1.75',
        separator: 'left-[calc(50%+0.875rem)] right-[calc(-50%+0.875rem)] top-0.875rem h-0.375'
      }
    },
    {
      orientation: 'horizontal',
      size: 'md',
      class: {
        root: 'gap-2',
        item: 'gap-2',
        separator: 'left-[calc(50%+1rem)] right-[calc(-50%+1rem)] top-1rem h-0.5'
      }
    },
    {
      orientation: 'horizontal',
      size: 'lg',
      class: {
        root: 'gap-2.5',
        item: 'gap-2.5',
        separator: 'left-[calc(50%+1.125rem)] right-[calc(-50%+1.125rem)] top-1.125rem h-0.5'
      }
    },
    {
      orientation: 'horizontal',
      size: 'xl',
      class: {
        root: 'gap-3',
        item: 'gap-3',
        separator: 'left-[calc(50%+1.25rem)] right-[calc(-50%+1.25rem)] top-1.25rem h-0.5'
      }
    },
    {
      orientation: 'horizontal',
      size: '2xl',
      class: {
        root: 'gap-3.5',
        item: 'gap-3.5',
        separator: 'left-[calc(50%+1.5rem)] right-[calc(-50%+1.5rem)] top-1.5rem h-0.5'
      }
    }
  ],
  defaultVariants: {
    orientation: 'horizontal'
  }
});

export type StepperSlots = keyof typeof stepperVariants.slots;

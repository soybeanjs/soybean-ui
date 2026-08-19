// @unocss-include
import { scv } from '@soybeanjs/cva';

export const timelineVariants = scv({
  slots: {
    root: 'flex',
    item: [
      'relative flex items-start gap-x-2.5',
      'data-[color=primary]:[&_[data-soybean-timeline-dot]]:bg-primary',
      'data-[color=destructive]:[&_[data-soybean-timeline-dot]]:bg-destructive',
      'data-[color=success]:[&_[data-soybean-timeline-dot]]:bg-success',
      'data-[color=warning]:[&_[data-soybean-timeline-dot]]:bg-warning',
      'data-[color=info]:[&_[data-soybean-timeline-dot]]:bg-info',
      'data-[color=carbon]:[&_[data-soybean-timeline-dot]]:bg-carbon',
      'data-[color=secondary]:[&_[data-soybean-timeline-dot]]:bg-secondary',
      'data-[color=accent]:[&_[data-soybean-timeline-dot]]:bg-accent'
    ],
    label: 'order-1 mt-0.5 min-w-0 text-xs text-muted-foreground',
    separator: 'relative flex h-full items-center',
    dot: 'relative z-1 mt-0.5 size-2.5 rounded-full bg-primary',
    content: 'order-3 min-w-0 flex-1 pb-4 text-foreground'
  },
  variants: {
    orientation: {
      vertical: {
        root: 'flex-col data-[reverse]:flex-col-reverse',
        separator: [
          'flex-col self-stretch',
          'before:absolute before:left-1/2 before:-translate-x-1/2 before:top-0 before:bottom-1/2 before:w-px before:bg-border',
          'after:absolute after:left-1/2 after:-translate-x-1/2 after:top-1/2 after:bottom-0 after:w-px after:bg-border'
        ]
      },
      horizontal: {
        root: 'flex-row data-[reverse]:flex-row-reverse',
        item: 'flex-1 flex-col items-center gap-y-1',
        label: 'order-none',
        separator: [
          'h-2.5 w-full flex-row items-center',
          'before:absolute before:top-1/2 before:-translate-y-1/2 before:left-0 before:right-1/2 before:h-px before:bg-border',
          'after:absolute after:top-1/2 after:-translate-y-1/2 after:left-1/2 after:right-0 after:h-px after:bg-border'
        ],
        dot: 'mt-0',
        content: 'pb-0 text-center'
      }
    }
  },
  compoundVariants: [
    {
      orientation: 'vertical',
      class: {
        item: [
          'first:[&_[data-soybean-timeline-separator]]:before:hidden',
          'last:[&_[data-soybean-timeline-separator]]:after:hidden',
          'data-[position=right]:[&_[data-soybean-timeline-label]]:order-3',
          'data-[position=right]:[&_[data-soybean-timeline-content]]:order-1'
        ]
      }
    },
    {
      orientation: 'horizontal',
      class: {
        item: [
          'first:[&_[data-soybean-timeline-separator]]:before:hidden',
          'last:[&_[data-soybean-timeline-separator]]:after:hidden'
        ]
      }
    }
  ],
  defaultVariants: {
    orientation: 'vertical'
  }
});

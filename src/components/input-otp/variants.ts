// @unocss-include
import { tv } from 'tailwind-variants';

export const inputOtpVariants = tv({
  slots: {
    root: [
      'relative inline-flex w-full cursor-text select-none',
      'data-[disabled]:cursor-default data-[disabled]:opacity-50'
    ],
    positioner: 'absolute inset-0',
    group: 'grid w-full gap-2 grid-cols-[repeat(var(--columns),minmax(0,1fr))]',
    input: [
      'absolute inset-0 h-full w-full border-0 bg-transparent p-0 outline-none shadow-none opacity-0',
      'pointer-events-auto text-transparent caret-transparent font-mono leading-none',
      '[font-variant-numeric:tabular-nums] [letter-spacing:-0.5em]',
      'selection:bg-transparent selection:text-transparent',
      'data-[password-manager-badge]:w-[calc(100%+40px)] data-[password-manager-badge]:[clip-path:inset(0_40px_0_0)]'
    ],
    slot: [
      'relative inline-flex items-center justify-center overflow-hidden rounded-md border border-input bg-background font-medium text-foreground shadow-xs transition-[border-color,box-shadow,transform]',
      'data-[state=active]:border-ring data-[state=active]:ring-3 data-[state=active]:ring-ring/40',
      'data-[state=filled]:border-foreground/20'
    ],
    char: 'leading-none',
    placeholder: 'leading-none text-muted-foreground/60',
    caret: 'h-[60%] w-px animate-pulse bg-foreground'
  },
  variants: {
    size: {
      xs: {
        group: 'gap-1.5',
        slot: 'h-8 text-sm',
        caret: 'h-4'
      },
      sm: {
        group: 'gap-2',
        slot: 'h-9 text-base',
        caret: 'h-4.5'
      },
      md: {
        group: 'gap-2',
        slot: 'h-10 text-lg',
        caret: 'h-5'
      },
      lg: {
        group: 'gap-2.5',
        slot: 'h-11 text-xl',
        caret: 'h-5.5'
      },
      xl: {
        group: 'gap-3',
        slot: 'h-12 text-2xl',
        caret: 'h-6'
      },
      '2xl': {
        group: 'gap-3',
        slot: 'h-14 text-3xl',
        caret: 'h-7'
      }
    },
    align: {
      start: {
        input: 'text-start'
      },
      center: {
        input: 'text-center'
      },
      end: {
        input: 'text-end'
      }
    }
  },
  defaultVariants: {
    size: 'md',
    align: 'start'
  }
});

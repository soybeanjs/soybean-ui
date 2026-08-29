// @unocss-include
import { scv } from '@soybeanjs/cva';
import {
  fieldAffordanceIcon,
  fieldChrome,
  fieldClearReveal,
  fieldDisabled,
  fieldMultiple,
  fieldSize,
  fieldTriggerFocus
} from './_field';
import { overlayArrow, overlayMotion, overlayShadow, overlaySurface } from './_overlay';
import { miniButtonIconVariants } from './button';

export const cascaderVariants = scv({
  extendBase: props => ({
    clear: miniButtonIconVariants({ size: props.size, shape: 'circle' })
  }),
  slots: {
    trigger: [
      'group flex items-center w-full data-[multiple]:relative data-[multiple]:flex-wrap',
      ...fieldChrome,
      ...fieldTriggerFocus,
      ...fieldDisabled,
      'placeholder:text-muted-foreground data-[placeholder]:text-muted-foreground'
    ],
    triggerIcon: [
      fieldAffordanceIcon,
      'group-data-[multiple]:absolute group-data-[multiple]:top-1/2 group-data-[multiple]:-translate-y-1/2'
    ],
    value: 'grow truncate text-start',
    tag: [
      'inline-flex shrink-0 items-center rounded-sm bg-accent text-accent-foreground',
      'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50'
    ],
    clear: [
      ...fieldClearReveal,
      'group-data-[multiple]:absolute group-data-[multiple]:top-1/2 group-data-[multiple]:-translate-y-1/2'
    ],
    searchInput: 'w-full grow bg-transparent outline-none placeholder:text-muted-foreground',
    positioner: '',
    popup: ['relative z-50', overlaySurface, overlayShadow, ...overlayMotion],
    panel: 'flex items-stretch',
    menu: ['overflow-y-auto overflow-x-hidden', 'scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-muted'],
    option: [
      'relative flex items-center w-full outline-none cursor-pointer select-none',
      'rounded-sm focus:bg-accent focus:text-accent-foreground data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground',
      'data-[child-selected]:text-primary data-[state=indeterminate]:not-data-[highlighted]:text-primary data-[selected]:text-primary data-[selected]:font-medium data-[selected]:bg-primary/10',
      'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50'
    ],
    optionText: 'grow truncate text-start',
    optionCheck: 'shrink-0 text-primary',
    optionArrow:
      'shrink-0 rounded-sm p-0.5 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground',
    empty: 'flex items-center justify-center w-full text-muted-foreground',
    arrow: overlayArrow
  },
  variants: {
    size: {
      xs: {
        popup: 'text-2xs',
        trigger: [fieldSize.xs, fieldMultiple.xs],
        triggerIcon: 'group-data-[multiple]:end-1.5',
        searchInput: 'min-h-6 text-2xs',
        tag: 'gap-0.5 h-4 px-1 text-2xs',
        clear: 'group-data-[multiple]:end-5.5',
        panel: 'gap-0.75 p-0.75 text-2xs',
        menu: 'max-h-80 w-32',
        option: 'gap-1.5 px-1.5 py-0.875',
        empty: 'min-w-32 py-2.5 text-2xs'
      },
      sm: {
        popup: 'text-xs',
        trigger: [fieldSize.sm, fieldMultiple.sm],
        triggerIcon: 'group-data-[multiple]:end-2',
        searchInput: 'min-h-7 text-xs',
        tag: 'gap-1 h-4.5 px-1.5 text-xs',
        clear: 'group-data-[multiple]:end-7.5',
        panel: 'gap-0.875 p-0.875 text-xs',
        menu: 'max-h-80 w-36',
        option: 'gap-1.75 px-1.75 py-1',
        empty: 'min-w-36 py-3 text-xs'
      },
      md: {
        popup: 'text-sm',
        trigger: [fieldSize.md, fieldMultiple.md],
        triggerIcon: 'group-data-[multiple]:end-2.5',
        searchInput: 'min-h-8 text-sm',
        tag: 'gap-1 h-5 px-2 text-sm',
        clear: 'group-data-[multiple]:end-9',
        panel: 'gap-1 p-1 text-sm',
        menu: 'max-h-80 w-40',
        option: 'gap-2 px-2 py-1.25',
        empty: 'min-w-40 py-4 text-sm'
      },
      lg: {
        popup: 'text-base',
        trigger: [fieldSize.lg, fieldMultiple.lg],
        triggerIcon: 'group-data-[multiple]:end-3',
        searchInput: 'min-h-9 text-base',
        tag: 'gap-1 h-5.5 px-2 text-base',
        clear: 'group-data-[multiple]:end-11',
        panel: 'gap-1.25 p-1.25 text-base',
        menu: 'max-h-80 w-44',
        option: 'gap-2.5 px-2.5 py-1.5',
        empty: 'min-w-44 py-4.5 text-base'
      },
      xl: {
        popup: 'text-lg',
        trigger: [fieldSize.xl, fieldMultiple.xl],
        triggerIcon: 'group-data-[multiple]:end-3.5',
        searchInput: 'min-h-10 text-lg',
        tag: 'gap-1 h-6 px-2.5 text-lg',
        clear: 'group-data-[multiple]:end-12.5',
        panel: 'gap-1.5 p-1.5 text-lg',
        menu: 'max-h-80 w-48',
        option: 'gap-3 px-3 py-1.75',
        empty: 'min-w-48 py-5 text-lg'
      },
      '2xl': {
        popup: 'text-xl',
        trigger: [fieldSize['2xl'], fieldMultiple['2xl']],
        triggerIcon: 'group-data-[multiple]:end-4',
        searchInput: 'min-h-12 text-xl',
        tag: 'gap-1 h-7 px-3 text-xl',
        clear: 'group-data-[multiple]:end-14.5',
        panel: 'gap-1.75 p-1.75 text-xl',
        menu: 'max-h-80 w-52',
        option: 'gap-3.5 px-3.5 py-2',
        empty: 'min-w-52 py-6 text-xl'
      }
    },
    virtual: {
      true: {},
      false: {}
    }
  },
  compoundVariants: [
    {
      size: 'xs',
      virtual: false,
      class: {
        option: '[&+&]:mt-0.75'
      }
    },
    {
      size: 'sm',
      virtual: false,
      class: {
        option: '[&+&]:mt-0.875'
      }
    },
    {
      size: 'md',
      virtual: false,
      class: {
        option: '[&+&]:mt-1'
      }
    },
    {
      size: 'lg',
      virtual: false,
      class: {
        option: '[&+&]:mt-1.25'
      }
    },
    {
      size: 'xl',
      virtual: false,
      class: {
        option: '[&+&]:mt-1.5'
      }
    },
    {
      size: '2xl',
      virtual: false,
      class: {
        option: '[&+&]:mt-1.75'
      }
    }
  ],
  defaultVariants: {
    size: 'md'
  }
});

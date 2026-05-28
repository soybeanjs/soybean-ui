// @unocss-include
import { scv } from '@soybeanjs/cva';
import { buttonVariants } from './button';

export const colorPickerVariants = scv({
  extendBase: props => ({
    trigger: buttonVariants({
      size: props.size,
      variant: 'pure'
    })
  }),
  slots: {
    popup: '',
    content: 'flex flex-col',
    trigger: '',
    triggerSwatch: '',
    triggerValue: 'min-w-0 flex-1 truncate text-start font-mono text-xs',
    segment: '',
    area: '',
    sliderSwatch: 'flex items-center',
    sliderRoot: 'flex-1',
    swatch: '',
    fields: 'grid grid-cols-[2fr_1fr]',
    field: '',
    alphaField: '',
    swatchPicker: ''
  },
  variants: {
    size: {
      xs: {
        popup: 'p-1.5',
        content: 'w-45 gap-1.5',
        area: 'h-30',
        sliderSwatch: 'gap-1.5',
        fields: 'gap-1.5',
        alphaField: 'w-12'
      },
      sm: {
        popup: 'p-1.75',
        content: 'w-52.5 gap-1.75',
        area: 'h-35',
        sliderSwatch: 'gap-1.75',
        fields: 'gap-1.75',
        alphaField: 'w-15'
      },
      md: {
        popup: 'p-2',
        content: 'w-60 gap-2',
        area: 'h-40',
        sliderSwatch: 'gap-2',
        fields: 'gap-2',
        alphaField: 'w-16'
      },
      lg: {
        popup: 'p-2.5',
        content: 'w-63.75 gap-2.5',
        area: 'h-42.5',
        sliderSwatch: 'gap-2.5',
        fields: 'gap-2.5',
        alphaField: 'w-18'
      },
      xl: {
        popup: 'p-3',
        content: 'w-67.5 gap-3',
        area: 'h-45',
        sliderSwatch: 'gap-3',
        fields: 'gap-3',
        alphaField: 'w-20'
      },
      '2xl': {
        popup: 'p-4',
        content: 'w-80 gap-4',
        area: 'h-50',
        sliderSwatch: 'gap-4',
        fields: 'gap-4',
        alphaField: 'w-25'
      }
    }
  },
  defaultVariants: {
    size: 'md'
  }
});

// @unocss-include
import { tv } from 'tailwind-variants';

export const colorPickerVariants = tv({
  slots: {
    popup: '',
    content: 'flex flex-col',
    triggerButton: '',
    triggerSwatch: 'shrink-0',
    triggerValue: 'min-w-0 flex-1 truncate text-left font-mono text-xs',
    segment: '',
    area: 'w-full',
    sliderSwatch: 'flex items-center',
    sliderRoot: 'flex-1',
    swatch: 'shrink-0',
    fields: 'flex items-center',
    field: 'min-w-0 flex-1 truncate',
    alphaField: 'shrink-0',
    swatches: ''
  },
  variants: {
    size: {
      xs: {
        popup: 'p-1.5',
        content: 'gap-1.5',
        area: 'h-35',
        sliderSwatch: 'gap-1.5',
        fields: 'gap-1.5',
        alphaField: 'w-13'
      },
      sm: {
        popup: 'p-1.75',
        content: 'gap-1.75',
        area: 'h-37.5',
        sliderSwatch: 'gap-1.75',
        fields: 'gap-1.75',
        alphaField: 'w-15'
      },
      md: {
        popup: 'p-2',
        content: 'gap-2',
        area: 'h-40',
        sliderSwatch: 'gap-2',
        fields: 'gap-2',
        alphaField: 'w-16'
      },
      lg: {
        popup: 'p-2.5',
        content: 'gap-2.5',
        area: 'h-42.5',
        sliderSwatch: 'gap-2.5',
        fields: 'gap-2.5',
        alphaField: 'w-17'
      },
      xl: {
        popup: 'p-3',
        content: 'gap-3',
        area: 'h-45',
        sliderSwatch: 'gap-3',
        fields: 'gap-3',
        alphaField: 'w-18'
      },
      '2xl': {
        popup: 'p-4',
        content: 'gap-4',
        area: 'h-50',
        sliderSwatch: 'gap-4',
        fields: 'gap-4',
        alphaField: 'w-20'
      }
    }
  },
  defaultVariants: {
    size: 'md'
  }
});

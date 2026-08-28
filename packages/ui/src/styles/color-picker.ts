// @unocss-include
import { alias, scv } from '@soybeanjs/cva';
import { buttonVariants } from './button';
import { colorAreaVariants } from './color-area';
import { colorFieldVariants } from './color-field';
import { colorSwatchVariants } from './color-swatch';
import { colorSwatchPickerVariants } from './color-swatch-picker';
import { popoverVariants } from './popover';
import { sliderVariants } from './slider';
import { tabsVariants } from './tabs';

export const colorPickerVariants = scv({
  extend: [
    popoverVariants,
    alias(colorAreaVariants, {
      root: 'areaRoot',
      area: 'areaSurface',
      thumb: 'areaThumb'
    }),
    alias(colorFieldVariants, {
      root: 'fieldRoot',
      input: 'fieldInput'
    })
  ],
  extendIgnore: ['popup'],
  extendBase: props => {
    const slider = sliderVariants({ size: props.size });
    const segment = tabsVariants({
      size: props.size,
      orientation: 'horizontal',
      shape: 'square',
      fill: 'auto',
      enableIndicator: true
    });
    const swatch = colorSwatchVariants({ size: props.size, shape: 'circle' });
    const swatchPicker = colorSwatchPickerVariants({ size: props.size, shape: 'circle' });

    return {
      trigger: buttonVariants({
        size: props.size,
        variant: 'pure'
      }),
      sliderControl: slider.root,
      sliderTrack: slider.track,
      sliderThumb: slider.thumb,
      segmentRoot: segment.root,
      segmentList: segment.list,
      segmentTrigger: segment.trigger,
      segmentIndicator: segment.indicator,
      segmentIndicatorContent: segment.indicatorContent,
      swatchRoot: swatch.root,
      swatchChecker: swatch.checker,
      swatchFill: swatch.fill,
      swatchPickerRoot: swatchPicker.root,
      swatchPickerItem: swatchPicker.item,
      swatchPickerItemIndicator: swatchPicker.itemIndicator,
      swatchPickerSwatchRoot: swatchPicker.swatchRoot,
      swatchPickerSwatchChecker: swatchPicker.swatchChecker,
      swatchPickerSwatchFill: swatchPicker.swatchFill
    };
  },
  slots: {
    popup: [
      `w-auto rounded-md border bg-popover text-popover-foreground shadow-md outline-none z-50 will-change-transform`,
      `data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95`,
      `data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95`,
      `data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2`
    ],
    content: 'flex flex-col',
    trigger: '',
    triggerSwatch: '',
    triggerValue: 'min-w-0 flex-1 truncate text-start font-mono text-xs',
    popoverTrigger: '',
    sliderSwatch: 'flex items-center',
    sliderRoot: 'flex-1',
    sliderControl: '',
    sliderTrack: '',
    sliderThumb: '',
    swatchRoot: '',
    swatchChecker: '',
    swatchFill: '',
    swatch: '',
    fields: 'grid grid-cols-[2fr_1fr]',
    alphaField: '',
    segmentRoot: '',
    segmentList: '',
    segmentTrigger: '',
    segmentIndicator: '',
    segmentIndicatorContent: '',
    swatchPickerRoot: '',
    swatchPickerItem: '',
    swatchPickerItemIndicator: '',
    swatchPickerSwatchRoot: '',
    swatchPickerSwatchChecker: '',
    swatchPickerSwatchFill: ''
  },
  variants: {
    size: {
      xs: {
        popup: 'p-1.5 text-2xs',
        content: 'w-45 gap-1.5',
        areaRoot: 'h-30',
        sliderSwatch: 'gap-1.5',
        fields: 'gap-1.5',
        alphaField: 'w-12'
      },
      sm: {
        popup: 'p-1.75 text-xs',
        content: 'w-52.5 gap-1.75',
        areaRoot: 'h-35',
        sliderSwatch: 'gap-1.75',
        fields: 'gap-1.75',
        alphaField: 'w-15'
      },
      md: {
        popup: 'p-2 text-sm',
        content: 'w-60 gap-2',
        areaRoot: 'h-40',
        sliderSwatch: 'gap-2',
        fields: 'gap-2',
        alphaField: 'w-16'
      },
      lg: {
        popup: 'p-2.5 text-base',
        content: 'w-63.75 gap-2.5',
        areaRoot: 'h-42.5',
        sliderSwatch: 'gap-2.5',
        fields: 'gap-2.5',
        alphaField: 'w-18'
      },
      xl: {
        popup: 'p-3 text-lg',
        content: 'w-67.5 gap-3',
        areaRoot: 'h-45',
        sliderSwatch: 'gap-3',
        fields: 'gap-3',
        alphaField: 'w-20'
      },
      '2xl': {
        popup: 'p-4 text-xl',
        content: 'w-80 gap-4',
        areaRoot: 'h-50',
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

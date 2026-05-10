<script setup lang="ts">
import { computed } from 'vue';
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import { ColorPickerCompact, provideColorPickerUi } from '@soybeanjs/headless/color-picker';
import { provideColorAreaUi } from '@soybeanjs/headless/color-area';
import { provideColorFieldUi } from '@soybeanjs/headless/color-field';
import { provideColorSwatchUi } from '@soybeanjs/headless/color-swatch';
import { provideColorSwatchPickerUi } from '@soybeanjs/headless/color-swatch-picker';
import { provideColorSliderUi } from '@soybeanjs/headless/color-slider';
import { providePopoverUi } from '@soybeanjs/headless/popover';
import { provideTabsUi } from '@soybeanjs/headless/tabs';
import { mergeVariants, miniSizeMap } from '@/theme';
import { buttonIconVariants, buttonVariants } from '../button/variants';
import { popoverVariants } from '../popover/variants';
import { colorAreaVariants } from '../color-area/variants';
import { colorFieldVariants } from '../color-field/variants';
import { colorSwatchVariants } from '../color-swatch/variants';
import { colorSwatchPickerVariants } from '../color-swatch-picker/variants';
import { sliderVariants } from '../slider/variants';
import { tabsVariants } from '../tabs/variants';
import { colorPickerVariants } from './variants';
import type { ColorPickerProps, ColorPickerEmits } from './types';

defineOptions({
  name: 'SColorPicker'
});

const props = withDefaults(defineProps<ColorPickerProps>(), {
  open: undefined,
  showArrow: true,
  showAlpha: true,
  showFields: true,
  showSwatches: true
});

const emit = defineEmits<ColorPickerEmits>();

const forwardedProps = useOmitProps(props, ['class', 'size', 'ui']);

const listeners = useForwardListeners(emit);

const miniSize = computed(() => miniSizeMap[props.size ?? 'md']);

const ui = computed(() => {
  const baseVariants = colorPickerVariants({ size: props.size });

  const variants = Object.assign(baseVariants, {
    $base: {
      trigger: buttonVariants({
        size: props.size,
        variant: 'pure'
      }),
      close: buttonIconVariants({ size: miniSize.value })
    }
  });

  return mergeVariants(variants, props.ui, { trigger: props.class });
});

const popoverUi = computed(() => {
  const variants = Object.assign(popoverVariants({ size: props.size }), {
    $base: {
      close: buttonIconVariants({ size: miniSize.value })
    }
  });

  return mergeVariants(variants, props.ui);
});

const colorAreaUi = computed(() => {
  const variants = colorAreaVariants({ size: props.size });
  return mergeVariants(variants);
});
const colorFieldUi = computed(() => {
  const variants = colorFieldVariants({ size: props.size });
  return mergeVariants(variants);
});
const colorSwatchUi = computed(() => {
  const variants = colorSwatchVariants({ size: props.size, shape: 'square' });
  return mergeVariants(variants);
});
const colorSwatchPickerUi = computed(() => {
  const variants = colorSwatchPickerVariants({ size: props.size, shape: 'square' });
  return mergeVariants(variants);
});
const colorSliderUi = computed(() => {
  const variants = sliderVariants({ size: props.size });
  return mergeVariants(variants);
});
const segmentUi = computed(() => {
  const variants = tabsVariants({
    size: props.size,
    orientation: 'horizontal',
    shape: 'square',
    fill: 'auto',
    enableIndicator: true
  });

  return mergeVariants(variants);
});

provideColorPickerUi(ui);
providePopoverUi(popoverUi);
provideColorAreaUi(colorAreaUi);
provideColorFieldUi(colorFieldUi);
provideColorSwatchPickerUi(colorSwatchPickerUi);
provideColorSliderUi(colorSliderUi);
provideColorSwatchUi(colorSwatchUi);
provideTabsUi(segmentUi);
</script>

<template>
  <ColorPickerCompact v-bind="forwardedProps" v-on="listeners" />
</template>

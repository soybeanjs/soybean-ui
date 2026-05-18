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
import { popoverVariants } from '@/styles/popover';
import { colorAreaVariants } from '@/styles/color-area';
import { colorFieldVariants } from '@/styles/color-field';
import { colorSwatchVariants } from '@/styles/color-swatch';
import { colorSwatchPickerVariants } from '@/styles/color-swatch-picker';
import { sliderVariants } from '@/styles/slider';
import { tabsVariants } from '@/styles/tabs';
import { colorPickerVariants } from '@/styles/color-picker';
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

const ui = computed(() => colorPickerVariants({ size: props.size }, props.ui, { trigger: props.class }));
const popoverUi = computed(() => popoverVariants({ size: props.size }, { popup: props.ui?.popup }));
const colorAreaUi = computed(() => colorAreaVariants({ size: props.size }));
const colorFieldUi = computed(() => colorFieldVariants({ size: props.size }));
const colorSwatchUi = computed(() => colorSwatchVariants({ size: props.size, shape: 'square' }));
const colorSwatchPickerUi = computed(() => colorSwatchPickerVariants({ size: props.size, shape: 'square' }));
const colorSliderUi = computed(() => sliderVariants({ size: props.size }));
const segmentUi = computed(() =>
  tabsVariants({
    size: props.size,
    orientation: 'horizontal',
    shape: 'square',
    fill: 'auto',
    enableIndicator: true
  })
);

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

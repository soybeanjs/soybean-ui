<script setup lang="ts">
import { computed } from 'vue';
import {
  ColorSwatchPickerCompact,
  provideColorSwatchPickerUi
} from '@soybeanjs/headless/color-swatch-picker';
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import { mergeSlotVariants } from '@/theme';
import { colorSwatchPickerVariants } from './variants';
import type { ColorSwatchPickerEmits, ColorSwatchPickerProps } from './types';

defineOptions({
  name: 'SColorSwatchPicker'
});

const props = withDefaults(defineProps<ColorSwatchPickerProps>(), {
  shape: 'square'
});

const emit = defineEmits<ColorSwatchPickerEmits>();

const slots = defineSlots<{
  default?: (props: { modelValue: string | string[] }) => any;
  indicator?: (props: { color: string }) => any;
}>();

const listeners = useForwardListeners(emit);

const forwardedProps = useOmitProps(props, [
  'class',
  'size',
  'ui',
  'colors',
  'shape',
  'itemProps',
  'indicatorProps',
  'swatchProps'
]);

const ui = computed(() => {
  const variants = colorSwatchPickerVariants({ size: props.size, shape: props.shape });

  return mergeSlotVariants(variants, props.ui, { root: props.class });
});

provideColorSwatchPickerUi(ui);
</script>

<template>
  <ColorSwatchPickerCompact v-bind="forwardedProps" v-on="listeners">
    <template #swatch>
      <span :class="ui.checker" />
      <span :class="ui.fill" />
    </template>
    <template v-if="slots.indicator" #indicator="slotProps">
      <slot name="indicator" v-bind="slotProps" />
    </template>
    <template v-if="slots.default" #default="slotProps">
      <slot v-bind="slotProps" />
    </template>
  </ColorSwatchPickerCompact>
</template>

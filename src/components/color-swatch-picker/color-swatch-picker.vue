<script setup lang="ts">
import { computed } from 'vue';
import { ColorSwatchPickerCompact, provideColorSwatchPickerUi } from '@soybeanjs/headless/color-swatch-picker';
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import { mergeVariants } from '@/theme';
import { colorSwatchVariants } from '../color-swatch/variants';
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

const forwardedProps = useOmitProps(props, ['class', 'size', 'ui', 'shape']);

const ui = computed(() => {
  const variants = Object.assign(colorSwatchPickerVariants({ size: props.size, shape: props.shape }), {
    $alias: {
      variants: colorSwatchVariants({ size: props.size }),
      map: {
        root: 'swatchRoot',
        checker: 'swatchChecker',
        fill: 'swatchFill'
      }
    }
  });

  return mergeVariants(variants, props.ui, { root: props.class });
});

provideColorSwatchPickerUi(ui);
</script>

<template>
  <ColorSwatchPickerCompact v-bind="forwardedProps" v-on="listeners">
    <template v-if="slots.indicator" #indicator="slotProps">
      <slot name="indicator" v-bind="slotProps" />
    </template>
    <template v-if="slots.default" #default="slotProps">
      <slot v-bind="slotProps" />
    </template>
  </ColorSwatchPickerCompact>
</template>

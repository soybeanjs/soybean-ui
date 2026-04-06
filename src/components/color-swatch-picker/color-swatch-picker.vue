<script setup lang="ts">
import { computed } from 'vue';
import {
  ColorSwatchPickerItem,
  ColorSwatchPickerItemIndicator,
  ColorSwatchPickerItemSwatch,
  ColorSwatchPickerRoot,
  provideColorSwatchPickerUi
} from '@soybeanjs/headless';
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import { mergeSlotVariants } from '@/theme';
import Icon from '../icon/icon.vue';
import { colorSwatchPickerVariants } from './variants';
import type { ColorSwatchPickerEmits, ColorSwatchPickerProps } from './types';

defineOptions({
  name: 'SColorSwatchPicker'
});

const props = withDefaults(defineProps<ColorSwatchPickerProps>(), {
  shape: 'square'
});

const emit = defineEmits<ColorSwatchPickerEmits>();

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
  <ColorSwatchPickerRoot v-bind="forwardedProps" v-on="listeners">
    <template v-if="colors?.length">
      <ColorSwatchPickerItem v-for="color in colors" :key="color" :value="color" v-bind="itemProps">
        <ColorSwatchPickerItemSwatch v-bind="swatchProps">
          <span :class="ui.checker" />
          <span :class="ui.fill" />
        </ColorSwatchPickerItemSwatch>
        <ColorSwatchPickerItemIndicator v-bind="indicatorProps">
          <slot name="indicator" :color="color">
            <Icon icon="lucide:check" />
          </slot>
        </ColorSwatchPickerItemIndicator>
      </ColorSwatchPickerItem>
    </template>
    <slot v-else />
  </ColorSwatchPickerRoot>
</template>

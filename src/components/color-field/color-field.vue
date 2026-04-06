<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import { ColorFieldInput, ColorFieldRoot, provideColorFieldUi } from '@soybeanjs/headless';
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import { mergeSlotVariants } from '@/theme';
import { colorFieldVariants } from './variants';
import type { ColorFieldEmits, ColorFieldProps } from './types';

defineOptions({
  name: 'SColorField',
  inheritAttrs: false
});

const props = defineProps<ColorFieldProps>();

const emit = defineEmits<ColorFieldEmits>();

const attrs = useAttrs();

const listeners = useForwardListeners(emit);

const forwardedProps = useOmitProps(props, ['class', 'size', 'ui', 'inputProps']);

const ui = computed(() => {
  const variants = colorFieldVariants({ size: props.size });

  return mergeSlotVariants(variants, props.ui, { root: props.class });
});

provideColorFieldUi(ui);
</script>

<template>
  <ColorFieldRoot v-bind="forwardedProps" v-on="listeners">
    <ColorFieldInput v-bind="{ ...inputProps, ...attrs }" />
  </ColorFieldRoot>
</template>

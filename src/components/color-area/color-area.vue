<script setup lang="ts">
import { computed } from 'vue';
import { ColorAreaArea, ColorAreaRoot, ColorAreaThumb, provideColorAreaUi } from '@soybeanjs/headless/color-area';
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import type { ColorAreaEmits, ColorAreaProps } from '@/components/color-area/types';
import { mergeSlotVariants } from '@/theme';
import { colorAreaVariants } from './variants';

defineOptions({
  name: 'SColorArea'
});

const props = defineProps<ColorAreaProps>();

const emit = defineEmits<ColorAreaEmits>();

const listeners = useForwardListeners(emit);

const forwardedProps = useOmitProps(props, ['class', 'size', 'ui', 'areaProps', 'thumbProps', 'onChange']);

const ui = computed(() => {
  const variants = colorAreaVariants({ size: props.size });

  return mergeSlotVariants(variants, props.ui, { root: props.class });
});

provideColorAreaUi(ui);
</script>

<template>
  <ColorAreaRoot v-bind="forwardedProps" v-on="listeners">
    <ColorAreaArea v-bind="areaProps">
      <ColorAreaThumb v-bind="thumbProps" />
    </ColorAreaArea>
  </ColorAreaRoot>
</template>

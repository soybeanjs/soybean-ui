<script setup lang="ts">
import { computed } from 'vue';
import { ProgressIndicator, ProgressRoot, provideProgressUi } from '@soybeanjs/headless';
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import { mergeSlotVariants } from '@/theme';
import { getProgressIndicatorStyle } from './shared';
import { progressVariants } from './variants';
import type { ProgressEmits, ProgressProps } from './types';

defineOptions({
  name: 'SProgress'
});

const props = defineProps<ProgressProps>();

const emit = defineEmits<ProgressEmits>();

const forwardedProps = useOmitProps(props, ['class', 'color', 'size', 'ui', 'indicatorProps']);

const listeners = useForwardListeners(emit);

const ui = computed(() => {
  const variants = progressVariants({
    color: props.color,
    size: props.size
  });

  return mergeSlotVariants(variants, props.ui, { root: props.class });
});

provideProgressUi(ui);
</script>

<template>
  <ProgressRoot v-slot="slotProps" v-bind="forwardedProps" v-on="listeners">
    <ProgressIndicator v-bind="indicatorProps" :style="getProgressIndicatorStyle(slotProps.valuePercent)">
      <slot v-bind="slotProps" />
    </ProgressIndicator>
  </ProgressRoot>
</template>

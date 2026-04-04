<script setup lang="ts">
import { computed } from 'vue';
import { ProgressCircle, ProgressRoot, provideProgressUi } from '@soybeanjs/headless';
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import { mergeSlotVariants } from '@/theme';
import { circleProgressVariants } from './variants';
import type { ProgressCircleEmits, ProgressCircleProps, ProgressState } from './types';

defineOptions({
  name: 'SProgressCircle'
});

const props = defineProps<ProgressCircleProps>();

const emit = defineEmits<ProgressCircleEmits>();

type Slots = {
  default?: (props: {
    modelValue: ProgressCircleProps['modelValue'];
    max: number;
    progressState: ProgressState;
    valuePercent: number | null;
  }) => any;
};

defineSlots<Slots>();

const forwardedProps = useOmitProps(props, ['class', 'color', 'size', 'ui', 'strokeWidth']);

const listeners = useForwardListeners(emit);

const ui = computed(() => {
  const variants = circleProgressVariants({
    color: props.color,
    size: props.size
  });

  return mergeSlotVariants(variants, props.ui, { root: props.class });
});

provideProgressUi(ui);
</script>

<template>
  <ProgressRoot v-bind="forwardedProps" v-on="listeners">
    <ProgressCircle v-slot="slotProps" :stroke-width="strokeWidth">
      <slot v-bind="slotProps" />
    </ProgressCircle>
  </ProgressRoot>
</template>

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

type Slots = {
  default?: (props: {
    modelValue: ProgressCircleProps['modelValue'];
    max: number;
    progressState: ProgressState;
    valuePercent: number | null;
  }) => any;
};

const emit = defineEmits<ProgressCircleEmits>();

const slots = defineSlots<Slots>();

const forwardedProps = useOmitProps(props, ['class', 'color', 'size', 'ui', 'strokeWidth']);

const listeners = useForwardListeners(emit);

const ui = computed(() => {
  const variants = circleProgressVariants({
    color: props.color,
    size: props.size
  });

  return mergeSlotVariants(variants, props.ui, { root: props.class });
});

const hasDefaultSlot = computed(() => Boolean(slots.default));

provideProgressUi(ui);
</script>

<template>
  <ProgressRoot v-bind="forwardedProps" v-on="listeners">
    <ProgressCircle v-slot="slotProps" :stroke-width="strokeWidth">
      <div v-if="hasDefaultSlot" :class="ui.label">
        <slot v-bind="slotProps" />
      </div>
    </ProgressCircle>
  </ProgressRoot>
</template>

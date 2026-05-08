<script setup lang="ts">
import { computed } from 'vue';
import { ProgressCircleCompact, provideProgressUi } from '@soybeanjs/headless/progress';
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import { mergeSlotVariants } from '@/theme';
import { progressCircleVariants } from './variants';
import type { ProgressCircleEmits, ProgressCircleProps, ProgressCircleSlots } from './types';

defineOptions({
  name: 'SProgressCircle'
});

const props = defineProps<ProgressCircleProps>();

const emit = defineEmits<ProgressCircleEmits>();

const slots = defineSlots<ProgressCircleSlots>();

const forwardedProps = useOmitProps(props, ['class', 'color', 'size', 'ui', 'strokeWidth']);

const listeners = useForwardListeners(emit);

const ui = computed(() => {
  const variants = progressCircleVariants({
    color: props.color,
    size: props.size
  });

  return mergeSlotVariants(variants, props.ui, { root: props.class });
});

const hasDefaultSlot = computed(() => Boolean(slots.default));

provideProgressUi(ui);
</script>

<template>
  <ProgressCircleCompact v-bind="forwardedProps" v-on="listeners">
    <template v-if="hasDefaultSlot" #default="slotProps">
      <slot v-bind="slotProps" />
    </template>
  </ProgressCircleCompact>
</template>

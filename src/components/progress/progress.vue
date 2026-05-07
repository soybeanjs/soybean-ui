<script setup lang="ts">
import { computed } from 'vue';
import { ProgressCompact, provideProgressUi } from '@soybeanjs/headless/progress';
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import { mergeSlotVariants } from '@/theme';
import { progressVariants } from './variants';
import type { ProgressEmits, ProgressProps, ProgressSlots } from './types';

defineOptions({
  name: 'SProgress'
});

const props = defineProps<ProgressProps>();

const emit = defineEmits<ProgressEmits>();

defineSlots<ProgressSlots>();

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
  <ProgressCompact v-slot="slotProps" v-bind="forwardedProps" v-on="listeners">
    <slot v-bind="slotProps" />
  </ProgressCompact>
</template>

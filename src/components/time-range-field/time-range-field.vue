<script setup lang="ts">
import { computed } from 'vue';

import { TimeRangeFieldCompact, provideTimeRangeFieldUi } from '@soybeanjs/headless/time-range-field';
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';

import { mergeSlotVariants } from '@/theme';

import { timeRangeFieldVariants } from './variants';
import type { TimeRangeFieldEmits, TimeRangeFieldProps, TimeRangeFieldSlots } from './types';

defineOptions({
  name: 'STimeRangeField'
});

const props = withDefaults(defineProps<TimeRangeFieldProps>(), {
  separator: '–'
});

const emit = defineEmits<TimeRangeFieldEmits>();

defineSlots<TimeRangeFieldSlots>();

const listeners = useForwardListeners(emit);

const forwardedProps = useOmitProps(props, ['class', 'size', 'ui', 'inputProps', 'separator']);

const ui = computed(() => {
  const variants = timeRangeFieldVariants({ size: props.size });

  return mergeSlotVariants(variants, props.ui, { root: props.class });
});

provideTimeRangeFieldUi(ui);
</script>

<template>
  <TimeRangeFieldCompact
    v-bind="{
      ...forwardedProps,
      inputProps,
      separator
    }"
    v-on="listeners"
  >
    <template v-if="$slots.default" #default="slotProps">
      <slot v-bind="slotProps" />
    </template>
    <template v-if="$slots.separator" #separator>
      <slot name="separator" />
    </template>
  </TimeRangeFieldCompact>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { TimeRangeFieldCompact, provideTimeRangeFieldUi } from '@soybeanjs/headless/time-range-field';
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import { keysOf } from '@soybeanjs/utils';
import { mergeSlotVariants } from '@/theme';
import { dateFieldVariants } from '../date-field/variants';
import { dateRangeFieldVariants } from '../date-range-field/variants';
import type { TimeRangeFieldProps, TimeRangeFieldEmits, TimeRangeFieldSlots } from './types';

defineOptions({
  name: 'STimeRangeField'
});

const props = defineProps<TimeRangeFieldProps>();

const emit = defineEmits<TimeRangeFieldEmits>();

const slots = defineSlots<TimeRangeFieldSlots>();

const listeners = useForwardListeners(emit);

const forwardedProps = useOmitProps(props, ['class', 'size', 'ui']);

const slotNames = computed(() => keysOf(slots));

const ui = computed(() => {
  const variants = dateRangeFieldVariants({ size: props.size });
  const dateField = dateFieldVariants({ size: props.size });

  return mergeSlotVariants(Object.assign(variants, dateField), props.ui, { root: props.class });
});
provideTimeRangeFieldUi(ui);
</script>

<template>
  <TimeRangeFieldCompact v-bind="forwardedProps" v-on="listeners">
    <template v-for="slotName in slotNames" :key="slotName" #[slotName]>
      <slot :name="slotName" />
    </template>
  </TimeRangeFieldCompact>
</template>

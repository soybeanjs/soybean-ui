<script setup lang="ts">
import { computed } from 'vue';
import { DateRangeFieldCompact, provideDateRangeFieldUi } from '@soybeanjs/headless/date-range-field';
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import { keysOf } from '@soybeanjs/utils';
import { mergeVariants } from '@/theme';
import { dateFieldVariants } from '../date-field/variants';
import { dateRangeFieldVariants } from './variants';
import type { DateRangeFieldEmits, DateRangeFieldProps, DateRangeFieldSlots } from './types';

defineOptions({
  name: 'SDateRangeField'
});

const props = defineProps<DateRangeFieldProps>();

const emit = defineEmits<DateRangeFieldEmits>();

const slots = defineSlots<DateRangeFieldSlots>();

const listeners = useForwardListeners(emit);

const forwardedProps = useOmitProps(props, ['class', 'size', 'ui']);

const slotNames = computed(() => keysOf(slots));

const ui = computed(() => {
  const variants = dateRangeFieldVariants({ size: props.size });
  const dateField = dateFieldVariants({ size: props.size });

  return mergeVariants(Object.assign(variants, dateField), props.ui, { root: props.class });
});

provideDateRangeFieldUi(ui);
</script>

<template>
  <DateRangeFieldCompact v-bind="forwardedProps" v-on="listeners">
    <template v-for="slotName in slotNames" :key="slotName" #[slotName]>
      <slot :name="slotName" />
    </template>
  </DateRangeFieldCompact>
</template>

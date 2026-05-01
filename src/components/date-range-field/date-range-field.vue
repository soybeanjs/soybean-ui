<script setup lang="ts">
import { computed } from 'vue';
import { DateRangeFieldCompact, provideDateRangeFieldUi } from '@soybeanjs/headless/date-range-field';
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import { mergeSlotVariants } from '@/theme';

import { dateRangeFieldVariants } from './variants';
import type { DateRangeFieldEmits, DateRangeFieldProps, DateRangeFieldSlots } from './types';

defineOptions({
  name: 'SDateRangeField'
});

const props = withDefaults(defineProps<DateRangeFieldProps>(), {
  separator: '–'
});

const emit = defineEmits<DateRangeFieldEmits>();

defineSlots<DateRangeFieldSlots>();

const listeners = useForwardListeners(emit);

const forwardedProps = useOmitProps(props, ['class', 'size', 'ui', 'inputProps', 'separator']);

const ui = computed(() => {
  const variants = dateRangeFieldVariants({ size: props.size });

  return mergeSlotVariants(variants, props.ui, { root: props.class });
});

provideDateRangeFieldUi(ui);
</script>

<template>
  <DateRangeFieldCompact v-bind="{ ...forwardedProps, inputProps, separator }" v-on="listeners">
    <template v-if="$slots.default" #default="slotProps">
      <slot v-bind="slotProps" />
    </template>
    <template #separator>
      <slot name="separator">{{ separator }}</slot>
    </template>
  </DateRangeFieldCompact>
</template>

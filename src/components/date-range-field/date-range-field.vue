<script setup lang="ts">
import { computed } from 'vue';
import { DateRangeFieldInput, DateRangeFieldRoot, provideDateRangeFieldUi } from '@soybeanjs/headless/date-range-field';
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
  <DateRangeFieldRoot v-slot="slotProps" v-bind="forwardedProps" v-on="listeners">
    <slot v-if="$slots.default" v-bind="slotProps" />
    <template v-else>
      <div data-date-range-field-part="start">
        <DateRangeFieldInput
          v-for="(segment, index) in slotProps.startSegments"
          :key="`start-${segment.part}-${index}`"
          :part="segment.part"
          type="start"
          v-bind="inputProps"
        >
          {{ segment.value }}
        </DateRangeFieldInput>
      </div>
      <div :class="ui.separator">
        <slot name="separator">
          {{ separator }}
        </slot>
      </div>
      <div data-date-range-field-part="end">
        <DateRangeFieldInput
          v-for="(segment, index) in slotProps.endSegments"
          :key="`end-${segment.part}-${index}`"
          :part="segment.part"
          type="end"
          v-bind="inputProps"
        >
          {{ segment.value }}
        </DateRangeFieldInput>
      </div>
    </template>
  </DateRangeFieldRoot>
</template>

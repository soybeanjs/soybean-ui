<script setup lang="ts">
import { useForwardListeners, useOmitProps } from '../../composables';
import { useDateRangeFieldUi } from './context';
import DateRangeFieldRoot from './date-range-field-root.vue';
import DateRangeFieldInput from './date-range-field-input.vue';
import type { DateRangeFieldCompactEmits, DateRangeFieldCompactProps, DateRangeFieldCompactSlots } from './types';

defineOptions({
  name: 'DateRangeFieldCompact'
});

const props = withDefaults(defineProps<DateRangeFieldCompactProps>(), {
  separator: '–'
});

const emit = defineEmits<DateRangeFieldCompactEmits>();

defineSlots<DateRangeFieldCompactSlots>();

const forwardedProps = useOmitProps(props, ['inputProps', 'separator']);

const listeners = useForwardListeners(emit);

const ui = useDateRangeFieldUi();
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

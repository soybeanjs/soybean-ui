<script setup lang="ts">
import { computed } from 'vue';

import { TimeRangeFieldInput, TimeRangeFieldRoot, provideTimeRangeFieldUi } from '@soybeanjs/headless/time-range-field';
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
  <TimeRangeFieldRoot v-slot="slotProps" v-bind="forwardedProps" v-on="listeners">
    <slot v-if="$slots.default" v-bind="slotProps" />
    <template v-else>
      <div data-time-range-field-part="start">
        <TimeRangeFieldInput
          v-for="(segment, index) in slotProps.startSegments"
          :key="`start-${segment.part}-${index}`"
          :part="segment.part"
          type="start"
          v-bind="inputProps"
        >
          {{ segment.value }}
        </TimeRangeFieldInput>
      </div>
      <div :class="ui.separator">
        <slot name="separator">
          {{ separator }}
        </slot>
      </div>
      <div data-time-range-field-part="end">
        <TimeRangeFieldInput
          v-for="(segment, index) in slotProps.endSegments"
          :key="`end-${segment.part}-${index}`"
          :part="segment.part"
          type="end"
          v-bind="inputProps"
        >
          {{ segment.value }}
        </TimeRangeFieldInput>
      </div>
    </template>
  </TimeRangeFieldRoot>
</template>

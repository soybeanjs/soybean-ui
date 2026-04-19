<script setup lang="ts">
import { computed } from 'vue';

import { TimeFieldInput, TimeFieldRoot, provideTimeFieldUi } from '@soybeanjs/headless/time-field';
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';

import { mergeSlotVariants } from '@/theme';

import { timeFieldVariants } from './variants';
import type { TimeFieldEmits, TimeFieldProps, TimeFieldSlots } from './types';

defineOptions({
  name: 'STimeField'
});

const props = defineProps<TimeFieldProps>();

const emit = defineEmits<TimeFieldEmits>();

defineSlots<TimeFieldSlots>();

const listeners = useForwardListeners(emit);

const forwardedProps = useOmitProps(props, ['class', 'size', 'ui', 'inputProps']);

const ui = computed(() => {
  const variants = timeFieldVariants({ size: props.size });

  return mergeSlotVariants(variants, props.ui, { root: props.class });
});

provideTimeFieldUi(ui);
</script>

<template>
  <TimeFieldRoot v-slot="slotProps" v-bind="forwardedProps" v-on="listeners">
    <slot v-if="$slots.default" v-bind="slotProps" />
    <template v-else>
      <TimeFieldInput
        v-for="(segment, index) in slotProps.segments"
        :key="`${segment.part}-${index}`"
        :part="segment.part"
        v-bind="inputProps"
      >
        {{ segment.value }}
      </TimeFieldInput>
    </template>
  </TimeFieldRoot>
</template>

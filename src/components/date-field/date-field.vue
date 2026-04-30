<script setup lang="ts">
import { computed } from 'vue';
import { DateFieldInput, DateFieldRoot, provideDateFieldUi } from '@soybeanjs/headless/date-field';
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import { mergeSlotVariants } from '@/theme';

import { dateFieldVariants } from './variants';
import type { DateFieldEmits, DateFieldProps, DateFieldSlots } from './types';

defineOptions({
  name: 'SDateField'
});

const props = defineProps<DateFieldProps>();

const emit = defineEmits<DateFieldEmits>();

defineSlots<DateFieldSlots>();

const listeners = useForwardListeners(emit);

const forwardedProps = useOmitProps(props, ['class', 'size', 'ui', 'inputProps']);

const ui = computed(() => {
  const variants = dateFieldVariants({ size: props.size });

  return mergeSlotVariants(variants, props.ui, { root: props.class });
});

provideDateFieldUi(ui);
</script>

<template>
  <DateFieldRoot v-slot="slotProps" v-bind="forwardedProps" v-on="listeners">
    <slot v-if="$slots.default" v-bind="slotProps" />
    <template v-else>
      <DateFieldInput
        v-for="(segment, index) in slotProps.segments"
        :key="`${segment.part}-${index}`"
        :part="segment.part"
        v-bind="inputProps"
      >
        {{ segment.value }}
      </DateFieldInput>
    </template>
  </DateFieldRoot>
</template>

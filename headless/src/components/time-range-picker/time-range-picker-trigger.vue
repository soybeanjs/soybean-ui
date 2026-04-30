<script setup lang="ts">
import { Primitive } from '../primitive';

import { useTimeRangePickerRootContext, useTimeRangePickerUi } from './context';
import type { TimeRangePickerTriggerProps } from './types';

defineOptions({
  name: 'TimeRangePickerTrigger'
});

withDefaults(defineProps<TimeRangePickerTriggerProps>(), {
  as: 'button'
});

const cls = useTimeRangePickerUi('trigger');
const rootContext = useTimeRangePickerRootContext('TimeRangePickerTrigger');

const handleClick = () => {
  if (rootContext.disabled.value || rootContext.readonly.value) {
    return;
  }

  rootContext.setOpen(!rootContext.open.value);
};
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :aria-controls="rootContext.popupId"
    :aria-disabled="rootContext.disabled.value ? true : undefined"
    :aria-expanded="rootContext.open.value ? true : false"
    :class="cls"
    :data-disabled="rootContext.disabled.value ? '' : undefined"
    :data-state="rootContext.open.value ? 'open' : 'closed'"
    data-slot="trigger"
    type="button"
    @click="handleClick"
  >
    <slot />
  </Primitive>
</template>

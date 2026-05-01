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
const { disabled, readonly, open, setOpen, popupId } = useTimeRangePickerRootContext('TimeRangePickerTrigger');

const handleClick = () => {
  if (disabled.value || readonly.value) {
    return;
  }

  setOpen(!open.value);
};
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :aria-controls="popupId"
    :aria-disabled="disabled ? true : undefined"
    :aria-expanded="open ? true : false"
    :class="cls"
    :data-disabled="disabled ? '' : undefined"
    :data-state="open ? 'open' : 'closed'"
    data-slot="trigger"
    type="button"
    @click="handleClick"
  >
    <slot />
  </Primitive>
</template>

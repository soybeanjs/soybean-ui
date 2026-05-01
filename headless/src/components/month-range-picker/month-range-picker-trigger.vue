<script setup lang="ts">
import { Primitive } from '../primitive';
import { useMonthRangePickerRootContext, useMonthRangePickerUi } from './context';
import type { MonthRangePickerTriggerProps } from './types';

defineOptions({
  name: 'MonthRangePickerTrigger'
});

withDefaults(defineProps<MonthRangePickerTriggerProps>(), {
  as: 'button'
});

const cls = useMonthRangePickerUi('trigger');
const { disabled, readonly, open, setOpen, popupId } = useMonthRangePickerRootContext('MonthRangePickerTrigger');

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

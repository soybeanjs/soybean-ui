<script setup lang="ts">
import { Primitive } from '../primitive';
import { useDateRangePickerRootContext, useDateRangePickerUi } from './context';
import type { DateRangePickerTriggerProps } from './types';

defineOptions({
  name: 'DateRangePickerTrigger'
});

withDefaults(defineProps<DateRangePickerTriggerProps>(), {
  as: 'button'
});

const cls = useDateRangePickerUi('trigger');
const { disabled, readonly, open, setOpen } = useDateRangePickerRootContext('DateRangePickerTrigger');

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

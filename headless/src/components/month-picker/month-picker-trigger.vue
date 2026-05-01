<script setup lang="ts">
import { Primitive } from '../primitive';
import { useMonthPickerRootContext, useMonthPickerUi } from './context';
import type { MonthPickerTriggerProps } from './types';

defineOptions({
  name: 'MonthPickerTrigger'
});

withDefaults(defineProps<MonthPickerTriggerProps>(), {
  as: 'button'
});

const cls = useMonthPickerUi('trigger');
const { disabled, readonly, open, setOpen, popupId } = useMonthPickerRootContext('MonthPickerTrigger');

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

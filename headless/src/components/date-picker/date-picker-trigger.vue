<script setup lang="ts">
import { Primitive } from '../primitive';
import { useDatePickerRootContext, useDatePickerUi } from './context';
import type { DatePickerTriggerProps } from './types';

defineOptions({
  name: 'DatePickerTrigger'
});

withDefaults(defineProps<DatePickerTriggerProps>(), {
  as: 'button'
});

const cls = useDatePickerUi('trigger');
const { disabled, readonly, open, setOpen } = useDatePickerRootContext('DatePickerTrigger');

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

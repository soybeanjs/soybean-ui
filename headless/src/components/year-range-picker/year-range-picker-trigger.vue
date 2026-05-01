<script setup lang="ts">
import { Primitive } from '../primitive';
import { useYearRangePickerRootContext, useYearRangePickerUi } from './context';
import type { YearRangePickerTriggerProps } from './types';

defineOptions({
  name: 'YearRangePickerTrigger'
});

withDefaults(defineProps<YearRangePickerTriggerProps>(), {
  as: 'button'
});

const cls = useYearRangePickerUi('trigger');
const { disabled, readonly, open, setOpen, popupId } = useYearRangePickerRootContext('YearRangePickerTrigger');

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

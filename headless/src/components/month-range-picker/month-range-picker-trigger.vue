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
const rootContext = useMonthRangePickerRootContext('MonthRangePickerTrigger');

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

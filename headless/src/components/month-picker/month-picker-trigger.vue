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
const rootContext = useMonthPickerRootContext('MonthPickerTrigger');

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
